import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { parseCSV } from "@/lib/parsers/csv-parser";
import { parsePDF } from "@/lib/parsers/pdf-parser";
import { parseImage } from "@/lib/parsers/image-parser";
import type { ParsedTransaction } from "@/lib/parsers/types";
import { normalizeTransactionSign } from "@/lib/transactions/sign";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function normalizeSignaturePart(value: string | null | undefined): string {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function buildTransactionSignature(tx: {
  date: Date;
  merchant: string;
  amount: number;
  currency: string;
  description?: string | null;
  rawLine: string;
}): string {
  return [
    tx.date.toISOString().slice(0, 10),
    normalizeSignaturePart(tx.merchant),
    tx.amount.toFixed(2),
    normalizeSignaturePart(tx.currency),
    normalizeSignaturePart(tx.description),
    normalizeSignaturePart(tx.rawLine),
  ].join("|");
}

async function dedupeTransactionsForUser(userId: string, transactions: ParsedTransaction[]) {
  if (transactions.length === 0) {
    return { uniqueTransactions: [], duplicateCount: 0 };
  }

  const uniqueMerchants = [...new Set(transactions.map((tx) => tx.merchant))];
  const uniqueAmounts = [...new Set(transactions.map((tx) => tx.amount))];

  const minDate = new Date(Math.min(...transactions.map((tx) => tx.date.getTime())));
  const maxDate = new Date(Math.max(...transactions.map((tx) => tx.date.getTime())));
  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(23, 59, 59, 999);

  const existingTransactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: minDate,
        lte: maxDate,
      },
      merchant: {
        in: uniqueMerchants,
      },
      amount: {
        in: uniqueAmounts,
      },
    },
    select: {
      date: true,
      merchant: true,
      amount: true,
      currency: true,
      description: true,
      rawLine: true,
    },
  });

  const existingSignatures = new Set(existingTransactions.map((tx) => buildTransactionSignature(tx)));
  const uploadSeenSignatures = new Set<string>();
  const uniqueTransactions: ParsedTransaction[] = [];
  let duplicateCount = 0;

  for (const tx of transactions) {
    const signature = buildTransactionSignature(tx);

    if (existingSignatures.has(signature) || uploadSeenSignatures.has(signature)) {
      duplicateCount++;
      continue;
    }

    uploadSeenSignatures.add(signature);
    uniqueTransactions.push(tx);
  }

  return { uniqueTransactions, duplicateCount };
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const manualBankAccountId = formData.get("bankAccountId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["csv", "pdf", "jpg", "jpeg", "png"].includes(ext || "")) {
      return NextResponse.json({ error: "Only CSV, PDF, and Images are supported" }, { status: 400 });
    }

    // Upload to Supabase Storage (Vault)
    const supabase = await createSupabaseServerClient();
    const storagePath = `${user.id}/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("finGenie-bucket")
      .upload(storagePath, file, { contentType: file.type });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Create statement record
    const statement = await prisma.statement.create({
      data: {
        userId: user.id,
        filePath: storagePath,
        originalFilename: file.name,
        status: "parsing",
      },
    });

    // Parse synchronously
    try {
      const arrayBuffer = await file.arrayBuffer();
      let parseResult;

      if (ext === "csv") {
        const text = new TextDecoder().decode(arrayBuffer);
        parseResult = parseCSV(text);
      } else if (ext === "pdf") {
        parseResult = await parsePDF(Buffer.from(arrayBuffer));
      } else {
        // Use Vision OCR for images
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        parseResult = await parseImage(base64, file.type);
      }

      parseResult.transactions = parseResult.transactions.map((tx) => normalizeTransactionSign(tx));

      const { uniqueTransactions, duplicateCount } = await dedupeTransactionsForUser(user.id, parseResult.transactions);
      parseResult.transactions = uniqueTransactions;
      parseResult.metadata.parsedRows = uniqueTransactions.length;
      parseResult.metadata.failedRows += duplicateCount;

      // Cross-check bank account if metadata was extracted
      let bankAccountId: string | null = manualBankAccountId;

      if (parseResult.metadata.bankAccountMeta?.accountNumber) {
        const extractedAccountNumber = parseResult.metadata.bankAccountMeta.accountNumber;

        // Look for matching registered bank account
        const matchingAccount = await prisma.bankAccount.findFirst({
          where: {
            userId: user.id,
            accountNumber: extractedAccountNumber,
          },
        });

        if (matchingAccount) {
          bankAccountId = matchingAccount.id;
          console.log(`[Upload] Statement matched to bank account: ${matchingAccount.bankName} (${extractedAccountNumber})`);
        } else {
          // REJECT: extracted account does not belong to this user
          const registeredAccounts = await prisma.bankAccount.findMany({
            where: { userId: user.id },
            select: { accountNumber: true, bankName: true, accountHolderName: true },
          });

          // Mark statement as failed
          await prisma.statement.update({
            where: { id: statement.id },
            data: {
              status: "failed",
              meta: JSON.parse(JSON.stringify({
                error: "Account mismatch",
                extractedAccount: extractedAccountNumber,
                bankAccountMeta: parseResult.metadata.bankAccountMeta,
              })),
            },
          });

          const registeredInfo = registeredAccounts.length > 0
            ? ` Your registered account: ${registeredAccounts.map((a: { bankName: string; accountNumber: string }) => `${a.bankName} (${a.accountNumber})`).join(", ")}.`
            : "";

          return NextResponse.json({
            statementId: statement.id,
            status: "rejected",
            error: `This statement belongs to account ${extractedAccountNumber}, which does not match your registered bank account.${registeredInfo} Only statements for your own registered account are accepted.`,
          }, { status: 400 });
        }
      }

      // Save transactions
      if (parseResult.transactions.length > 0) {
        await prisma.transaction.createMany({
          data: parseResult.transactions.map((tx) => ({
            userId: user.id,
            statementId: statement.id,
            date: tx.date,
            merchant: tx.merchant,
            amount: tx.amount,
            currency: tx.currency,
            category: tx.category || "Uncategorized",
            description: tx.description,
            rawLine: tx.rawLine,
          })),
        });
      }

      // Update statement status and link bank account
      await prisma.statement.update({
        where: { id: statement.id },
        data: {
          status: parseResult.transactions.length > 0 || duplicateCount > 0 ? "done" : "failed",
          bankAccountId: bankAccountId,
          meta: JSON.parse(JSON.stringify({
            totalRows: parseResult.metadata.totalRows,
            parsedRows: parseResult.metadata.parsedRows,
            failedRows: parseResult.metadata.failedRows,
            duplicateRows: duplicateCount,
            bankName: parseResult.metadata.bankName,
            bankAccountMeta: parseResult.metadata.bankAccountMeta,
            errors: parseResult.errors.slice(0, 10),
          })),
        },
      });

      return NextResponse.json({
        statementId: statement.id,
        status: parseResult.transactions.length > 0 || duplicateCount > 0 ? "done" : "failed",
        parsed: parseResult.metadata.parsedRows,
        failed: parseResult.metadata.failedRows,
        duplicates: duplicateCount,
        total: parseResult.metadata.totalRows,
        bankName: parseResult.metadata.bankName,
      });
    } catch (parseError) {
      console.error("Parse error:", parseError);
      await prisma.statement.update({
        where: { id: statement.id },
        data: { status: "failed", meta: { error: String(parseError) } },
      });

      return NextResponse.json({
        statementId: statement.id,
        status: "failed",
        error: "Failed to parse file. Please check the format and try again.",
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
