import type { ParseResult, ParsedTransaction, ParserError, BankAccountMeta } from "./types";
import { normalizeMerchant, categorizeTransaction } from "./normalizer";

const BANK_STATEMENT_PROMPT = `You are a financial document parser. Analyze this bank statement text and extract ALL information into a structured JSON object.

CRITICAL: Return ONLY valid JSON, no markdown fences, no explanation text.

Expected JSON schema:
{
  "accountInfo": {
    "accountHolderName": "string or null",
    "accountNumber": "string or null",
    "ifscCode": "string or null",
    "bankName": "string or null",
    "branch": "string or null",
    "customerId": "string or null",
    "statementPeriodFrom": "DD-MM-YYYY or null",
    "statementPeriodTo": "DD-MM-YYYY or null"
  },
  "transactions": [
    {
      "srNo": "number or null",
      "date": "DD-MM-YYYY",
      "description": "full narration/remarks text exactly as shown",
      "debit": "number or null (amount debited)",
      "credit": "number or null (amount credited)",
      "balance": "number or null (running balance)",
      "counterparty": "extracted person/entity name from description or null",
      "transactionType": "UPI|NEFT|IMPS|RTGS|ATM|CASH|CHEQUE|OTHER",
      "referenceNumber": "extracted ref/UTR number or null"
    }
  ]
}

EXTRACTION RULES:
1. Extract EVERY transaction row. Do NOT skip any.
2. For UPI transactions like "UPI/519586976126/DR/ASHUTO/PUNB/964889700/Paid v", extract:
   - counterparty = "ASHUTO" (the person name after DR/ or CR/)
   - transactionType = "UPI"
   - referenceNumber = "519586976126"
3. For NEFT/IMPS/RTGS, extract counterparty from the narration.
4. Amounts must be plain numbers without commas (e.g., 3200.00 not 3,200.00).
5. If a row has a debit amount, set debit to that number and credit to null.
6. If a row has a credit amount, set credit to that number and debit to null.
7. Balance should be the running balance shown in the statement.
8. Date format MUST be DD-MM-YYYY.
9. Look for account info in the header area: "Account Number", "Customer ID", "Account holder", "IFSC", etc.
10. bankName can be inferred from the logo/header text (e.g., "Bank of India", "SBI", "HDFC Bank").
11. For SOL/internal transfers, set transactionType to "OTHER".
12. Preserve the FULL description text as-is from the statement.

Here is the bank statement text to parse:
`;

// Fallback regex-based parsing
const DATE_PATTERNS = [
  /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/, // DD/MM/YYYY or DD-MM-YYYY
  /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{2,4})/i, // 01 Jan 2026
];

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

const AMOUNT_PATTERN = /[\d,]+\.\d{2}/g;

function parseDateFromLine(line: string): Date | null {
  for (const pattern of DATE_PATTERNS) {
    const match = line.match(pattern);
    if (match) {
      if (match[2] && MONTH_MAP[match[2].toLowerCase().substring(0, 3)] !== undefined) {
        const day = parseInt(match[1]);
        const month = MONTH_MAP[match[2].toLowerCase().substring(0, 3)];
        let year = parseInt(match[3]);
        if (year < 100) year += 2000;
        return new Date(year, month, day);
      } else {
        const day = parseInt(match[1]);
        const month = parseInt(match[2]) - 1;
        let year = parseInt(match[3]);
        if (year < 100) year += 2000;
        const date = new Date(year, month, day);
        if (!isNaN(date.getTime()) && day <= 31 && month <= 11) return date;
      }
    }
  }
  return null;
}

function extractAmounts(line: string): number[] {
  const matches = line.match(AMOUNT_PATTERN);
  if (!matches) return [];
  return matches.map((m) => parseFloat(m.replace(/,/g, ""))).filter((n) => !isNaN(n));
}

function isHeaderOrFooter(line: string): boolean {
  const lowerLine = line.toLowerCase();
  const skipPatterns = [
    "opening balance", "closing balance", "statement of account",
    "page no", "date.*particular", "date.*description",
    "branch name", "account number", "customer id",
    "ifsc code", "-------", "=======",
  ];
  return skipPatterns.some((p) => new RegExp(p, "i").test(lowerLine));
}

function parseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;
  // Try DD-MM-YYYY
  const dmy = dateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (dmy) {
    const d = new Date(parseInt(dmy[3]), parseInt(dmy[2]) - 1, parseInt(dmy[1]));
    if (!isNaN(d.getTime())) return d;
  }
  // Try DD/MM/YYYY
  const dmy2 = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy2) {
    const d = new Date(parseInt(dmy2[3]), parseInt(dmy2[2]) - 1, parseInt(dmy2[1]));
    if (!isNaN(d.getTime())) return d;
  }
  // Fallback
  const fallback = new Date(dateStr);
  return isNaN(fallback.getTime()) ? null : fallback;
}

async function parseWithAI(pdfText: string): Promise<ParseResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000",
      "X-Title": "FinGenie",
    },
    body: JSON.stringify({
      model: "arcee-ai/trinity-large-preview:free",
      messages: [
        {
          role: "user",
          content: BANK_STATEMENT_PROMPT + pdfText,
        },
      ],
      max_tokens: 4096,
      temperature: 0.1, // Low temperature for structured extraction
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from AI model");
  }

  // Extract JSON from response (handle markdown fences)
  let jsonStr = content.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // Try to find JSON object in the response
  const jsonStart = jsonStr.indexOf("{");
  const jsonEnd = jsonStr.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    jsonStr = jsonStr.substring(jsonStart, jsonEnd + 1);
  }

  const parsed = JSON.parse(jsonStr);

  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];

  const bankAccountMeta: BankAccountMeta = {};
  if (parsed.accountInfo) {
    const info = parsed.accountInfo;
    bankAccountMeta.accountHolderName = info.accountHolderName || undefined;
    bankAccountMeta.accountNumber = info.accountNumber || undefined;
    bankAccountMeta.ifscCode = info.ifscCode || undefined;
    bankAccountMeta.bankName = info.bankName || undefined;
    bankAccountMeta.branch = info.branch || undefined;
    bankAccountMeta.customerId = info.customerId || undefined;
    if (info.statementPeriodFrom || info.statementPeriodTo) {
      bankAccountMeta.statementPeriod = {
        from: info.statementPeriodFrom || undefined,
        to: info.statementPeriodTo || undefined,
      };
    }
  }

  if (Array.isArray(parsed.transactions)) {
    for (let i = 0; i < parsed.transactions.length; i++) {
      const tx = parsed.transactions[i];
      try {
        const date = parseDateString(tx.date);
        if (!date) {
          errors.push({
            line: i + 1,
            rawText: JSON.stringify(tx),
            reason: `Invalid date: ${tx.date}`,
          });
          continue;
        }

        const debit = typeof tx.debit === "number" ? tx.debit : parseFloat(tx.debit);
        const credit = typeof tx.credit === "number" ? tx.credit : parseFloat(tx.credit);

        let amount: number;
        if (!isNaN(debit) && debit > 0) {
          amount = -Math.abs(debit); // Debits are negative (outflow)
        } else if (!isNaN(credit) && credit > 0) {
          amount = Math.abs(credit); // Credits are positive (inflow)
        } else {
          errors.push({
            line: i + 1,
            rawText: JSON.stringify(tx),
            reason: "No valid debit or credit amount",
          });
          continue;
        }

        // Build description from available fields
        const description = tx.description || tx.remarks || "";
        const counterparty = tx.counterparty || "";
        const txType = tx.transactionType || "";

        // Use counterparty as merchant if available, otherwise normalize description
        const rawMerchant = counterparty || description;
        const merchant = normalizeMerchant(rawMerchant);
        const category = categorizeTransaction(merchant);

        // Build a rich description
        const richDescription = [
          txType && `[${txType}]`,
          description,
          tx.referenceNumber && `Ref: ${tx.referenceNumber}`,
        ]
          .filter(Boolean)
          .join(" ");

        transactions.push({
          date,
          merchant: merchant || "Unknown",
          amount,
          currency: "INR",
          category: category || undefined,
          description: richDescription || description || undefined,
          rawLine: JSON.stringify(tx),
          confidence: 0.85,
        });
      } catch {
        errors.push({
          line: i + 1,
          rawText: JSON.stringify(tx),
          reason: "Failed to parse transaction",
        });
      }
    }
  }

  return {
    transactions,
    errors,
    metadata: {
      totalRows: parsed.transactions?.length || 0,
      parsedRows: transactions.length,
      failedRows: errors.length,
      bankName: bankAccountMeta.bankName,
      bankAccountMeta,
    },
  };
}

function regexFallback(pdfText: string): ParseResult {
  const lines = pdfText
    .split("\n")
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0);

  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];
  let totalRows = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isHeaderOrFooter(line)) continue;

    const date = parseDateFromLine(line);
    if (!date) continue;

    totalRows++;
    const amounts = extractAmounts(line);

    if (amounts.length === 0) {
      errors.push({ line: i + 1, rawText: line, reason: "No amount found" });
      continue;
    }

    const dateMatch = line.match(DATE_PATTERNS[0]) || line.match(DATE_PATTERNS[1]);
    let description = line;
    if (dateMatch) {
      const afterDate = line.substring(line.indexOf(dateMatch[0]) + dateMatch[0].length);
      const amountMatch = afterDate.match(AMOUNT_PATTERN);
      if (amountMatch) {
        description = afterDate.substring(0, afterDate.indexOf(amountMatch[0])).trim();
      } else {
        description = afterDate.trim();
      }
    }

    const merchant = normalizeMerchant(description || "Unknown");
    const category = categorizeTransaction(merchant);

    let amount = amounts[amounts.length > 1 ? amounts.length - 2 : 0];
    if (/\bDR\b|debit/i.test(line)) {
      amount = -Math.abs(amount);
    } else if (/\bCR\b|credit/i.test(line)) {
      amount = Math.abs(amount);
    } else {
      amount = -Math.abs(amount);
    }

    transactions.push({
      date,
      merchant,
      amount,
      currency: "INR",
      category,
      description: description || undefined,
      rawLine: line,
      confidence: 0.5,
    });
  }

  return {
    transactions,
    errors,
    metadata: {
      totalRows,
      parsedRows: transactions.length,
      failedRows: errors.length,
    },
  };
}

export async function parsePDF(buffer: Buffer): Promise<ParseResult> {
  // Polyfill browser APIs for Node environments (required by pdfjs-dist used in pdf-parse)
  if (typeof global !== "undefined") {
    if (!(global as any).DOMMatrix) {
      (global as any).DOMMatrix = class DOMMatrix {
        constructor() {}
      };
    }
    if (!(global as any).ImageData) {
      (global as any).ImageData = class ImageData {
        constructor() {}
      };
    }
    if (!(global as any).Path2D) {
      (global as any).Path2D = class Path2D {
        constructor() {}
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParseMod = require("pdf-parse");
  let pdfText = "";

  // Handle pdf-parse v2 (Class-based API) vs v1 (Function-based API)
  const PDFParseClass = pdfParseMod.PDFParse || pdfParseMod.default?.PDFParse;

  if (PDFParseClass) {
    const parser = new PDFParseClass({ data: buffer });
    const data = await parser.getText();
    pdfText = data.text;
    await parser.destroy();
  } else if (typeof pdfParseMod === "function" || typeof pdfParseMod.default === "function") {
    const parseFn = typeof pdfParseMod === "function" ? pdfParseMod : pdfParseMod.default;
    const data = await parseFn(buffer);
    pdfText = data.text;
  } else {
    throw new Error("Could not initialize pdf-parse module. Export not recognized.");
  }

  if (!pdfText || pdfText.trim().length < 20) {
    return {
      transactions: [],
      errors: [{ line: 0, rawText: "", reason: "No text extracted from PDF" }],
      metadata: { totalRows: 0, parsedRows: 0, failedRows: 0 },
    };
  }

  // Try AI-powered extraction first, fallback to regex
  try {
    console.log("[PDF Parser] Attempting AI-powered extraction...");
    const result = await parseWithAI(pdfText);

    // If AI extraction got at least some transactions, use it
    if (result.transactions.length > 0) {
      console.log(`[PDF Parser] AI extraction successful: ${result.transactions.length} transactions`);
      return result;
    }

    // If AI returned 0 transactions, try regex fallback
    console.log("[PDF Parser] AI returned 0 transactions, falling back to regex...");
  } catch (aiError) {
    console.error("[PDF Parser] AI extraction failed, using regex fallback:", aiError);
  }

  // Regex fallback
  console.log("[PDF Parser] Using regex fallback parser...");
  return regexFallback(pdfText);
}
