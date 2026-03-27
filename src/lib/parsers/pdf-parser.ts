import type { ParseResult, ParsedTransaction, ParserError, BankAccountMeta } from "./types";
import { normalizeMerchant, categorizeTransaction } from "./normalizer";
import { parseImage } from "./image-parser";

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
      "referenceNumber": "extracted ref/UTR number or null",
      "category": "Food & Dining | Shopping | Transport | Subscriptions | Utilities | Healthcare | Education | Entertainment | Investment | Tax | Salary | Transfer | Other"
    }
  ]
}

EXTRACTION RULES:
1. Extract EVERY transaction row. Do NOT skip any.
2. For UPI transactions like "UPI/519586976126/DR/ASHUTO/PUNB/964889700/Paid v", extract:
   - counterparty = "ASHUTO" (the person name after DR/ or CR/)
   - transactionType = "UPI"
   - referenceNumber = "519586976126"
3. Categorization logic: 
   - "Food & Dining": Swiggy, Zomato, Restaurants, Cafes.
   - "Healthcare": Pharmacy, Hospitals, Diagnostic centers (e.g., Apollo, Medplus).
   - "Shopping": Amazon, Flipkart, Retail stores.
   - "Transport": Uber, Ola, Petrol/Fuel, Metro.
   - "Utilities": Electricity, Water, Gas, Mobile/Internet bills.
   - "Salary": Any incoming salary credit.
   - "Investment": Mutual funds, Stocks, RD/FD transfers.
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
const MIN_TEXT_WARNING_THRESHOLD = 20;
const MAX_PDF_OCR_PAGES = 8;

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

function sanitizeJsonCandidate(value: string): string {
  return value
    .replace(/^\uFEFF/, "")
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/,\s*([}\]])/g, "$1")
    .trim();
}

function extractJsonPayload(content: string): string {
  let jsonStr = content.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  const jsonStart = jsonStr.indexOf("{");
  const jsonEnd = jsonStr.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    jsonStr = jsonStr.substring(jsonStart, jsonEnd + 1);
  }

  return sanitizeJsonCandidate(jsonStr);
}

function extractJsonSection(
  source: string,
  key: string,
  openChar: "{" | "[",
  closeChar: "}" | "]",
  allowUnterminated = false
): string | null {
  const keyPattern = new RegExp(`["']?${key}["']?\\s*:`, "i");
  const keyMatch = keyPattern.exec(source);
  const keyIndex = keyMatch?.index ?? -1;
  if (keyIndex === -1) return null;

  const start = source.indexOf(openChar, keyIndex);
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < source.length; i++) {
    const ch = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
      continue;
    }

    if (ch === openChar) {
      depth++;
      continue;
    }

    if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }

  if (allowUnterminated) {
    return source.slice(start);
  }

  return null;
}

function recoverPartialTransactions(arraySource: string | null): Array<Record<string, unknown>> {
  if (!arraySource) return [];

  const recovered: Array<Record<string, unknown>> = [];
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectStart = -1;

  for (let i = 0; i < arraySource.length; i++) {
    const ch = arraySource[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
      continue;
    }

    if (ch === "{") {
      if (depth === 0) {
        objectStart = i;
      }
      depth++;
      continue;
    }

    if (ch === "}") {
      depth--;
      if (depth === 0 && objectStart !== -1) {
        const candidate = sanitizeJsonCandidate(arraySource.slice(objectStart, i + 1));
        try {
          const parsed = JSON.parse(candidate);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            recovered.push(parsed as Record<string, unknown>);
          }
        } catch {
          objectStart = -1;
          continue;
        }
        objectStart = -1;
      }
    }
  }

  return recovered;
}

function recoverPartialAiPayload(jsonStr: string): { accountInfo?: Record<string, unknown>; transactions?: Array<Record<string, unknown>> } | null {
  const accountInfoSource = extractJsonSection(jsonStr, "accountInfo", "{", "}");
  const transactionsSource = extractJsonSection(jsonStr, "transactions", "[", "]", true);

  let accountInfo: Record<string, unknown> | undefined;
  if (accountInfoSource) {
    try {
      accountInfo = JSON.parse(sanitizeJsonCandidate(accountInfoSource));
    } catch {
      accountInfo = undefined;
    }
  }

  const transactions = recoverPartialTransactions(transactionsSource);
  if (!accountInfo && transactions.length === 0) {
    return null;
  }

  return {
    accountInfo,
    transactions,
  };
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function parseLooseAmount(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value);
  return NaN;
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

  const jsonStr = extractJsonPayload(content);

  let parsed: { accountInfo?: Record<string, unknown>; transactions?: Array<Record<string, unknown>> };
  try {
    parsed = JSON.parse(jsonStr);
  } catch (error) {
    const recovered = recoverPartialAiPayload(jsonStr);
    if (!recovered) {
      throw error;
    }
    console.warn(
      `[PDF Parser] Recovered ${recovered.transactions?.length || 0} transactions from malformed AI JSON`
    );
    parsed = recovered;
  }

  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];

  const bankAccountMeta: BankAccountMeta = {};
  if (parsed.accountInfo) {
    const info = parsed.accountInfo;
    bankAccountMeta.accountHolderName = asOptionalString(info.accountHolderName);
    bankAccountMeta.accountNumber = asOptionalString(info.accountNumber);
    bankAccountMeta.ifscCode = asOptionalString(info.ifscCode);
    bankAccountMeta.bankName = asOptionalString(info.bankName);
    bankAccountMeta.branch = asOptionalString(info.branch);
    bankAccountMeta.customerId = asOptionalString(info.customerId);
    const statementPeriodFrom = asOptionalString(info.statementPeriodFrom);
    const statementPeriodTo = asOptionalString(info.statementPeriodTo);
    if (statementPeriodFrom || statementPeriodTo) {
      bankAccountMeta.statementPeriod = {
        from: statementPeriodFrom,
        to: statementPeriodTo,
      };
    }
  }

  if (Array.isArray(parsed.transactions)) {
    for (let i = 0; i < parsed.transactions.length; i++) {
      const tx = parsed.transactions[i];
      try {
        const dateValue = asOptionalString(tx.date);
        const date = parseDateString(dateValue || "");
        if (!date) {
          errors.push({
            line: i + 1,
            rawText: JSON.stringify(tx),
            reason: `Invalid date: ${dateValue || "unknown"}`,
          });
          continue;
        }

        const debit = parseLooseAmount(tx.debit);
        const credit = parseLooseAmount(tx.credit);

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
        const description = asOptionalString(tx.description) || asOptionalString(tx.remarks) || "";
        const counterparty = asOptionalString(tx.counterparty) || "";
        const txType = asOptionalString(tx.transactionType) || "";
        const aiCategory = asOptionalString(tx.category);

        // Use counterparty as merchant if available, otherwise normalize description
        const rawMerchant = counterparty || description;
        const merchant = normalizeMerchant(rawMerchant);
        
        // Prioritize AI category, fallback to keyword map
        let category = aiCategory;
        if (!category || category === "Other" || category === "Uncategorized") {
          category = categorizeTransaction(merchant);
        }

        // Build a rich description
        const richDescription = [
          txType && `[${txType}]`,
          description,
          asOptionalString(tx.referenceNumber) && `Ref: ${asOptionalString(tx.referenceNumber)}`,
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

function mergeBankAccountMeta(
  current: BankAccountMeta | undefined,
  next: BankAccountMeta | undefined
): BankAccountMeta | undefined {
  if (!current && !next) return undefined;

  return {
    accountHolderName: current?.accountHolderName || next?.accountHolderName,
    accountNumber: current?.accountNumber || next?.accountNumber,
    ifscCode: current?.ifscCode || next?.ifscCode,
    bankName: current?.bankName || next?.bankName,
    branch: current?.branch || next?.branch,
    customerId: current?.customerId || next?.customerId,
    statementPeriod: current?.statementPeriod || next?.statementPeriod,
  };
}

function mergeParseResults(results: Array<{ pageNumber: number; result: ParseResult }>): ParseResult {
  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];
  let bankName: string | undefined;
  let bankAccountMeta: BankAccountMeta | undefined;
  let totalRows = 0;
  let parsedRows = 0;
  let failedRows = 0;

  for (const { pageNumber, result } of results) {
    transactions.push(...result.transactions);
    totalRows += result.metadata.totalRows;
    parsedRows += result.metadata.parsedRows;
    failedRows += result.metadata.failedRows;

    if (!bankName) {
      bankName = result.metadata.bankName;
    }
    bankAccountMeta = mergeBankAccountMeta(bankAccountMeta, result.metadata.bankAccountMeta);

    for (const error of result.errors) {
      errors.push({
        ...error,
        rawText: `[Page ${pageNumber}] ${error.rawText}`,
      });
    }
  }

  return {
    transactions,
    errors,
    metadata: {
      totalRows,
      parsedRows,
      failedRows,
      bankName,
      bankAccountMeta,
    },
  };
}

async function parseRenderedPdfPagesWithAI(parser: {
  getScreenshot: (params?: Record<string, unknown>) => Promise<{
    total: number;
    pages: Array<{ pageNumber: number; data: Uint8Array }>;
  }>;
}): Promise<ParseResult> {
  console.log("[PDF Parser] Attempting OCR fallback via rendered PDF pages...");

  const screenshotResult = await parser.getScreenshot({
    first: MAX_PDF_OCR_PAGES,
    scale: 2,
    imageBuffer: true,
    imageDataUrl: false,
  });

  if (!screenshotResult.pages || screenshotResult.pages.length === 0) {
    console.warn("[PDF Parser] OCR fallback could not render any pages");
    return {
      transactions: [],
      errors: [{ line: 0, rawText: "", reason: "Could not render PDF pages for OCR fallback" }],
      metadata: { totalRows: 0, parsedRows: 0, failedRows: 0 },
    };
  }

  if (screenshotResult.total > screenshotResult.pages.length) {
    console.warn(
      `[PDF Parser] OCR fallback limited to first ${screenshotResult.pages.length} of ${screenshotResult.total} pages`
    );
  }

  const pageResults: Array<{ pageNumber: number; result: ParseResult }> = [];
  const pageErrors: ParserError[] = [];

  for (const page of screenshotResult.pages) {
    if (!page.data || page.data.length === 0) {
      continue;
    }

    console.log(`[PDF Parser] OCR parsing rendered page ${page.pageNumber}...`);
    try {
      const pageResult = await parseImage(Buffer.from(page.data).toString("base64"), "image/png");
      pageResults.push({ pageNumber: page.pageNumber, result: pageResult });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[PDF Parser] OCR failed for rendered page ${page.pageNumber}: ${message}`);
      pageErrors.push({
        line: page.pageNumber,
        rawText: `rendered-page-${page.pageNumber}`,
        reason: `OCR failed for rendered page ${page.pageNumber}: ${message}`,
      });
    }
  }

  if (pageResults.length === 0) {
    return {
      transactions: [],
      errors: pageErrors.length > 0
        ? pageErrors
        : [{ line: 0, rawText: "", reason: "OCR fallback did not yield any successfully parsed pages" }],
      metadata: { totalRows: 0, parsedRows: 0, failedRows: pageErrors.length },
    };
  }

  const combined = mergeParseResults(pageResults);
  combined.errors.push(...pageErrors);
  combined.metadata.failedRows += pageErrors.length;
  console.log(`[PDF Parser] OCR fallback parsed ${combined.transactions.length} transactions`);
  return combined;
}

export async function parsePDF(buffer: Buffer): Promise<ParseResult> {
  console.log("[PDF Parser] Starting PDF parsing...");

  // Polyfill browser APIs for Node environments (required by pdfjs-dist used in pdf-parse)
  if (typeof global !== "undefined") {
    if (!(global as any).DOMMatrix) {
      console.log("[PDF Parser] Polyfilling DOMMatrix");
      (global as any).DOMMatrix = class DOMMatrix {
        constructor() {}
      };
    }
    if (!(global as any).ImageData) {
      console.log("[PDF Parser] Polyfilling ImageData");
      (global as any).ImageData = class ImageData {
        constructor() {}
      };
    }
    if (!(global as any).Path2D) {
      console.log("[PDF Parser] Polyfilling Path2D");
      (global as any).Path2D = class Path2D {
        constructor() {}
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParseMod = require("pdf-parse");
  console.log("[PDF Parser] Loaded pdf-parse module");

  // Fix for Vercel: pdf-parse v2 uses a path that fails in serverless environments.
  // We use the bundled worker Data URL to bypass file system issues.
  let workerData: string | undefined;
  try {
    console.log("[PDF Parser] Attempting to initialize worker...");
    // Use the direct worker entry point which bundles the worker as a Data URL
    // @typescript-eslint/no-require-imports
    const worker = require("pdf-parse/worker");
    if (typeof worker.getData === "function") {
      workerData = worker.getData();
      console.log(`[PDF Parser] Extracted Data URL from pdf-parse/worker (length: ${workerData?.length})`);
    }
  } catch (e) {
    console.warn("[PDF Parser] Failed to load Data URL from pdf-parse/worker", e);
  }

  let pdfText = "";
  let parserInstance:
    | {
        destroy: () => Promise<void>;
        getText: (params?: Record<string, unknown>) => Promise<{ text: string }>;
        getScreenshot?: (params?: Record<string, unknown>) => Promise<{
          total: number;
          pages: Array<{ pageNumber: number; data: Uint8Array }>;
        }>;
      }
    | undefined;

  try {
    // Handle pdf-parse v2 (Class-based API) vs v1 (Function-based API)
    const PDFParseClass = pdfParseMod.PDFParse || pdfParseMod.default?.PDFParse;

    if (PDFParseClass) {
      if (typeof PDFParseClass.setWorker === "function" && workerData) {
        console.log("[PDF Parser] Initializing worker via PDFParse.setWorker(Data URL)");
        PDFParseClass.setWorker(workerData);
      }

      console.log("[PDF Parser] Using Class-based API (v2)");
      const classParser = new PDFParseClass({ data: buffer });
      parserInstance = classParser;
      const data = await classParser.getText();
      pdfText = data.text;
    } else if (typeof pdfParseMod === "function" || typeof pdfParseMod.default === "function") {
      console.log("[PDF Parser] Using Function-based API (v1)");
      const parseFn = typeof pdfParseMod === "function" ? pdfParseMod : pdfParseMod.default;
      const data = await parseFn(buffer);
      pdfText = data.text;
    } else {
      console.error("[PDF Parser] Export structure:", Object.keys(pdfParseMod));
      throw new Error("Could not initialize pdf-parse module. Export not recognized.");
    }

    console.log(`[PDF Parser] Extracted ${pdfText?.length || 0} characters of text`);

    const rawTextLength = pdfText?.length || 0;
    const normalizedTextLength = pdfText?.replace(/\s+/g, " ").trim().length || 0;

    if (rawTextLength > 0) {
      if (normalizedTextLength === 0) {
        console.warn("[PDF Parser] Extracted text is mostly whitespace/control characters, attempting hybrid text parsing first");
      } else if (normalizedTextLength < MIN_TEXT_WARNING_THRESHOLD) {
        console.warn("[PDF Parser] Extracted text is short, but attempting hybrid text parsing first");
      }

      try {
        console.log("[PDF Parser] Attempting AI-powered extraction...");
        const result = await parseWithAI(pdfText);

        if (result.transactions.length > 0) {
          console.log(`[PDF Parser] AI extraction successful: ${result.transactions.length} transactions`);
          return result;
        }

        console.log("[PDF Parser] AI returned 0 transactions, falling back to regex...");
      } catch (aiError) {
        console.error("[PDF Parser] AI extraction failed, using regex fallback:", aiError);
      }

      console.log("[PDF Parser] Using regex fallback parser...");
      const regexResult = regexFallback(pdfText);
      if (regexResult.transactions.length > 0) {
        return regexResult;
      }

      console.log("[PDF Parser] Text extraction produced no transactions, trying OCR fallback...");
    } else {
      console.warn("[PDF Parser] No text extracted from PDF, trying OCR fallback...");
    }

    if (parserInstance?.getScreenshot) {
      try {
        const getScreenshot = parserInstance.getScreenshot.bind(parserInstance);
        const imageResult = await parseRenderedPdfPagesWithAI({
          getScreenshot,
        });
        if (imageResult.transactions.length > 0 || imageResult.metadata.bankAccountMeta) {
          return imageResult;
        }
      } catch (ocrError) {
        console.error("[PDF Parser] OCR fallback failed:", ocrError);
      }
    }

    if (!pdfText || pdfText.trim().length < 20) {
      console.warn("[PDF Parser] No usable text extracted from PDF");
      return {
        transactions: [],
        errors: [{ line: 0, rawText: "", reason: "No text extracted from PDF and OCR fallback found no transactions" }],
        metadata: { totalRows: 0, parsedRows: 0, failedRows: 0 },
      };
    }

    console.log("[PDF Parser] Returning regex fallback result after OCR fallback produced no transactions...");
    return regexFallback(pdfText);
  } finally {
    await parserInstance?.destroy?.();
  }
}
