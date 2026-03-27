import Papa from "papaparse";
import { parseCSV } from "./csv-parser";
import type { BankAccountMeta, ParseResult, ParsedTransaction, ParserError } from "./types";
import { categorizeTransaction, normalizeMerchant } from "./normalizer";

const RECEIPT_HEADER = "Date,Merchant,Amount,Category,Description";
const BANK_STATEMENT_HEADER = "Date,Description,Debit,Credit,Balance,Counterparty,TransactionType,ReferenceNumber,Category";
const VISION_REQUEST_TIMEOUT_MS = 45_000;
const VISION_MAX_RETRIES = 2;

type OCRBankCandidate = {
  line: number;
  rawText: string;
  tx: ParsedTransaction;
  balance: number | null;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientVisionFailure(status: number, errorText: string): boolean {
  if ([408, 409, 425, 429, 500, 502, 503, 504].includes(status)) return true;

  const normalized = errorText.toLowerCase();
  return normalized.includes("aborted") || normalized.includes("timeout") || normalized.includes("temporar");
}

function parseDate(value: string): Date | null {
  if (!value) return null;

  const cleaned = value
    .trim()
    .replace(/[Oo]/g, "0")
    .replace(/[Il|]/g, "1");

  const dmyMatch = cleaned.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    let year = parseInt(dmyMatch[3], 10);
    if (year < 100) year += 2000;
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) return date;
  }

  const isoMatch = cleaned.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);
  if (isoMatch) {
    const date = new Date(
      parseInt(isoMatch[1], 10),
      parseInt(isoMatch[2], 10) - 1,
      parseInt(isoMatch[3], 10)
    );
    if (!isNaN(date.getTime())) return date;
  }

  const fallback = new Date(cleaned);
  return isNaN(fallback.getTime()) ? null : fallback;
}

function normalizeNumericString(value: string): string {
  let cleaned = value
    .trim()
    .replace(/[\u20B9,\s]/g, "")
    .replace(/(?:rs\.?|inr)/gi, "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[OoQqDd]/g, "0")
    .replace(/[Il|]/g, "1")
    .replace(/[Ss]/g, "5")
    .replace(/[Bb]/g, "8");

  cleaned = cleaned.replace(/(\.)(?=.*\.)/g, "");
  cleaned = cleaned.replace(/[^0-9().+-]/g, "");

  return cleaned;
}

function parseNumber(value: string): number | null {
  if (!value) return null;

  const cleaned = normalizeNumericString(value);
  if (!cleaned) return null;

  const normalized = cleaned.replace(/\(([^)]+)\)/, "-$1");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function cleanModelOutput(content: string): string {
  let cleaned = content.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```(?:csv|json)?/i, "");
    cleaned = cleaned.replace(/```$/, "");
    cleaned = cleaned.trim();
  }
  return cleaned;
}

function extractBankMetadata(content: string): {
  csvContent: string;
  bankMeta: Record<string, string> | null;
  pageKind: "TRANSACTION" | "NON_TRANSACTION";
} {
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  const metaLine = lines.find((line) => line.startsWith("#BANK_STATEMENT"));

  if (!metaLine) {
    return {
      csvContent: content,
      bankMeta: null,
      pageKind: "TRANSACTION",
    };
  }

  const bankMeta: Record<string, string> = {};
  const parts = metaLine.split("|").slice(1);

  for (const part of parts) {
    const [key, ...valueParts] = part.split("=");
    if (key && valueParts.length > 0) {
      bankMeta[key.trim()] = valueParts.join("=").trim();
    }
  }

  return {
    csvContent: lines.filter((line) => !line.startsWith("#")).join("\n"),
    bankMeta,
    pageKind: bankMeta.PageKind === "NON_TRANSACTION" ? "NON_TRANSACTION" : "TRANSACTION",
  };
}

function buildBankAccountMeta(bankMeta: Record<string, string> | null): BankAccountMeta | undefined {
  if (!bankMeta) return undefined;

  return {
    accountHolderName: bankMeta.AccountHolder || undefined,
    accountNumber: bankMeta.AccountNumber || undefined,
    ifscCode: bankMeta.IFSC || undefined,
    bankName: bankMeta.BankName || undefined,
  };
}

function isRepeatedHeaderRow(row: Record<string, string>): boolean {
  const date = (row.Date || "").trim().toLowerCase();
  const description = (row.Description || "").trim().toLowerCase();
  return date === "date" || description === "description";
}

function isNearlyEqual(a: number, b: number, tolerance: number): boolean {
  return Math.abs(a - b) <= tolerance;
}

function amountTolerance(amount: number): number {
  return Math.max(2, Math.abs(amount) * 0.02);
}

function applyBalanceValidation(candidates: OCRBankCandidate[]): {
  transactions: ParsedTransaction[];
  errors: ParserError[];
} {
  const suspicionCounts = new Array(candidates.length).fill(0);
  let ascendingMatches = 0;
  let descendingMatches = 0;

  for (let i = 0; i < candidates.length - 1; i++) {
    const current = candidates[i];
    const next = candidates[i + 1];

    if (current.balance === null || next.balance === null) continue;

    const delta = next.balance - current.balance;
    if (isNearlyEqual(delta, next.tx.amount, amountTolerance(next.tx.amount))) {
      ascendingMatches++;
    }
    if (isNearlyEqual(-delta, current.tx.amount, amountTolerance(current.tx.amount))) {
      descendingMatches++;
    }
  }

  const direction =
    ascendingMatches === 0 && descendingMatches === 0
      ? null
      : ascendingMatches >= descendingMatches
        ? "ascending"
        : "descending";

  if (direction) {
    for (let i = 0; i < candidates.length - 1; i++) {
      const current = candidates[i];
      const next = candidates[i + 1];

      if (current.balance === null || next.balance === null) continue;

      const delta = next.balance - current.balance;
      if (direction === "ascending") {
        if (!isNearlyEqual(delta, next.tx.amount, amountTolerance(next.tx.amount))) {
          suspicionCounts[i + 1]++;
        }
      } else if (!isNearlyEqual(-delta, current.tx.amount, amountTolerance(current.tx.amount))) {
        suspicionCounts[i]++;
      }
    }
  }

  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const suspicion = suspicionCounts[i];

    if (suspicion >= 2) {
      errors.push({
        line: candidate.line,
        rawText: candidate.rawText,
        reason: "Row rejected because amount does not match running balance progression",
      });
      continue;
    }

    if (suspicion === 1) {
      candidate.tx.confidence = Math.min(candidate.tx.confidence, 0.55);
    }

    transactions.push(candidate.tx);
  }

  return { transactions, errors };
}

function parseBankStatementCsv(
  csvContent: string,
  bankMeta: Record<string, string> | null,
  pageKind: "TRANSACTION" | "NON_TRANSACTION"
): ParseResult {
  const bankAccountMeta = buildBankAccountMeta(bankMeta);
  const bankName = bankAccountMeta?.bankName;

  if (pageKind === "NON_TRANSACTION") {
    return {
      transactions: [],
      errors: [],
      metadata: {
        totalRows: 0,
        parsedRows: 0,
        failedRows: 0,
        bankName,
        bankAccountMeta,
      },
    };
  }

  const parsed = Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  const rows = parsed.data || [];
  const candidates: OCRBankCandidate[] = [];
  const errors: ParserError[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] || {};
    if (isRepeatedHeaderRow(row)) continue;

    const rawLine = [
      row.Date,
      row.Description,
      row.Debit,
      row.Credit,
      row.Balance,
      row.Counterparty,
      row.TransactionType,
      row.ReferenceNumber,
    ]
      .filter(Boolean)
      .join(" | ");

    const description = (row.Description || "").trim();
    const counterparty = (row.Counterparty || "").trim();
    const txType = (row.TransactionType || "").trim().toUpperCase();
    const referenceNumber = (row.ReferenceNumber || "").trim();
    const aiCategory = (row.Category || "").trim();

    const debit = parseNumber(row.Debit || "");
    const credit = parseNumber(row.Credit || "");
    const balance = parseNumber(row.Balance || "");

    if (!description && !counterparty && debit === null && credit === null) {
      continue;
    }

    const date = parseDate(row.Date || "");
    if (!date) {
      errors.push({ line: i + 2, rawText: rawLine, reason: "Invalid transaction date" });
      continue;
    }

    if (debit !== null && credit !== null) {
      errors.push({ line: i + 2, rawText: rawLine, reason: "Both debit and credit were present" });
      continue;
    }

    if (debit === null && credit === null) {
      errors.push({ line: i + 2, rawText: rawLine, reason: "No debit or credit amount found" });
      continue;
    }

    const amount = debit !== null ? -Math.abs(debit) : Math.abs(credit!);
    if (!Number.isFinite(amount) || Math.abs(amount) > 1_00_00_00_000) {
      errors.push({ line: i + 2, rawText: rawLine, reason: "Amount looks invalid" });
      continue;
    }

    const merchantSeed = counterparty || description || "Unknown";
    const merchant = normalizeMerchant(merchantSeed) || "Unknown";

    // Prioritize AI category, fallback to keyword map
    let category = aiCategory;
    if (!category || category.toLowerCase() === "other" || category.toLowerCase() === "uncategorized") {
      category = 
        categorizeTransaction(merchant) ||
        categorizeTransaction(description) ||
        (txType === "ATM" ? "Cash Withdrawal" : undefined) ||
        "Uncategorized";
    }

    const richDescription = [
      txType && `[${txType}]`,
      description,
      referenceNumber && `Ref: ${referenceNumber}`,
      balance !== null && `Bal: ${balance.toFixed(2)}`,
    ]
      .filter(Boolean)
      .join(" ");

    candidates.push({
      line: i + 2,
      rawText: rawLine,
      balance,
      tx: {
        date,
        merchant,
        amount,
        currency: "INR",
        category,
        description: richDescription || description || undefined,
        rawLine,
        confidence: balance !== null ? 0.82 : 0.72,
      },
    });
  }

  const validated = applyBalanceValidation(candidates);

  return {
    transactions: validated.transactions,
    errors: [...errors, ...validated.errors],
    metadata: {
      totalRows: rows.length,
      parsedRows: validated.transactions.length,
      failedRows: errors.length + validated.errors.length,
      bankName,
      bankAccountMeta,
    },
  };
}

export async function parseImage(base64Image: string, mimeType: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set. Contact administrator.");

  const requestBody = JSON.stringify({
    model: "qwen/qwen2.5-vl-72b-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `You are a financial document parser. Analyze this image carefully. It could be either a BANK STATEMENT page or a RECEIPT/BILL.

OUTPUT FORMAT: Respond with ONLY valid CSV text. No markdown fences. No explanation.

=== IF BANK STATEMENT ===
First line must be:
#BANK_STATEMENT|PageKind=<TRANSACTION or NON_TRANSACTION>|AccountHolder=<name>|AccountNumber=<number>|IFSC=<code>|BankName=<bank>

Then output this CSV header exactly:
${BANK_STATEMENT_HEADER}

Rules for BANK STATEMENT pages:
- Extract ONLY transaction-table rows. Ignore welcome pages, account summaries, branch info, profile blocks, ads, totals, cards, charts, and dashboard balances.
- If this page has no transaction table, set PageKind=NON_TRANSACTION and return only the metadata line plus the header, with no data rows.
- Copy digits exactly as visible. Do NOT estimate, normalize, sum, or invent numbers. If a number is unclear, leave that field blank.
- Put money only in Debit or Credit, never both.
- Preserve the running Balance exactly as shown when present.
- Keep one CSV row per actual transaction row.
- If a narration wraps across lines, append it to the same transaction row instead of creating a new one.
- Date must be DD-MM-YYYY or YYYY-MM-DD.
- Counterparty should be the extracted payee/payer name when visible, otherwise blank.
- TransactionType should be one of UPI, NEFT, IMPS, RTGS, ATM, CASH, CHEQUE, OTHER when visible, otherwise blank.
- ReferenceNumber should contain UTR/ref/id when visible, otherwise blank.
- Category should be an intelligent guess from: Food & Dining, Shopping, Transport, Subscriptions, Utilities, Healthcare, Entertainment, Education, Investment, Tax, Salary, Transfer, Other.

=== IF RECEIPT/BILL ===
Output this header exactly:
${RECEIPT_HEADER}

Rules for RECEIPT/BILL:
- Date must be YYYY-MM-DD.
- Merchant is the store/service name.
- Amount must be negative for spend.
- Category must be an intelligent guess (e.g., Food & Dining, Shopping, Healthcare).
- Description should be short and useful.

=== IF NOT A FINANCIAL DOCUMENT ===
Return only:
${RECEIPT_HEADER}`
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 4096,
    temperature: 0.1,
  });

  let successfulResponse: Response | null = null;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= VISION_MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), VISION_REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000",
          "X-Title": "FinGenie",
        },
        body: requestBody,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        if (attempt < VISION_MAX_RETRIES && isTransientVisionFailure(response.status, errorText)) {
          console.warn(
            `[Image Parser] Vision request failed with ${response.status} on attempt ${attempt + 1}; retrying...`
          );
          await sleep(750 * (attempt + 1));
          continue;
        }
        lastError = new Error(`OpenRouter Vision API error: ${response.status} - ${errorText}`);
        throw new Error(`OpenRouter Vision API error: ${response.status} - ${errorText}`);
      }

      successfulResponse = response;
      lastError = null;
      break;
    } catch (error) {
      clearTimeout(timeout);
      const message = error instanceof Error ? error.message : String(error);
      const isAbort = message.toLowerCase().includes("abort");

      if (attempt < VISION_MAX_RETRIES && isAbort) {
        console.warn(`[Image Parser] Vision request timed out on attempt ${attempt + 1}; retrying...`);
        await sleep(750 * (attempt + 1));
        continue;
      }

      lastError = error instanceof Error ? error : new Error(message);
      break;
    }
  }

  if (!successfulResponse) {
    throw lastError || new Error("Vision request failed before receiving a response");
  }

  const data = await successfulResponse.json();
  const content = data.choices?.[0]?.message?.content || "";
  let csvContent = cleanModelOutput(content);

  if (!csvContent || csvContent.length < 10) {
    csvContent = RECEIPT_HEADER;
  }

  const { csvContent: bodyContent, bankMeta, pageKind } = extractBankMetadata(csvContent);

  if (bankMeta || bodyContent.includes(BANK_STATEMENT_HEADER)) {
    return parseBankStatementCsv(bodyContent, bankMeta, pageKind);
  }

  if (!bodyContent.includes(RECEIPT_HEADER)) {
    csvContent = RECEIPT_HEADER;
  } else {
    csvContent = bodyContent;
  }

  const result = parseCSV(csvContent);
  return result;
}
