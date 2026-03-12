import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { parseCSV } from "@/lib/parsers/csv-parser";
import { parsePDF } from "@/lib/parsers/pdf-parser";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["csv", "pdf"].includes(ext || "")) {
      return NextResponse.json({ error: "Only CSV and PDF files are supported" }, { status: 400 });
    }

    // Upload to Supabase Storage
    const supabase = await createSupabaseServerClient();
    const storagePath = `${user.id}/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("statements")
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

    // Parse synchronously (MVP approach)
    try {
      const arrayBuffer = await file.arrayBuffer();
      let parseResult;

      if (ext === "csv") {
        const text = new TextDecoder().decode(arrayBuffer);
        parseResult = parseCSV(text);
      } else {
        parseResult = await parsePDF(Buffer.from(arrayBuffer));
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

      // Update statement status
      await prisma.statement.update({
        where: { id: statement.id },
        data: {
          status: parseResult.transactions.length > 0 ? "done" : "failed",
          meta: JSON.parse(JSON.stringify({
            totalRows: parseResult.metadata.totalRows,
            parsedRows: parseResult.metadata.parsedRows,
            failedRows: parseResult.metadata.failedRows,
            errors: parseResult.errors.slice(0, 10),
          })),
        },
      });

      return NextResponse.json({
        statementId: statement.id,
        status: parseResult.transactions.length > 0 ? "done" : "failed",
        parsed: parseResult.metadata.parsedRows,
        failed: parseResult.metadata.failedRows,
        total: parseResult.metadata.totalRows,
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
