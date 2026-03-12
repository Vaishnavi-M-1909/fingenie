import type { ParseResult, ParsedTransaction, ParserError } from "./types";
import { normalizeMerchant, categorizeTransaction } from "./normalizer";

// Date patterns for Indian bank statements
const DATE_PATTERNS = [
  /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/, // DD/MM/YYYY or DD-MM-YYYY
  /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{2,4})/i, // 01 Jan 2026
];

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// Amount pattern: comma-separated with optional decimals
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
    "opening balance",
    "closing balance",
    "statement of account",
    "page no",
    "date.*particular",
    "date.*description",
    "branch name",
    "account number",
    "customer id",
    "ifsc code",
    "-------",
    "=======",
  ];
  return skipPatterns.some((p) => new RegExp(p, "i").test(lowerLine));
}

export async function parsePDF(buffer: Buffer): Promise<ParseResult> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require("pdf-parse");
  const data = await pdfParse(buffer);

  const lines = data.text
    .split("\n")
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0);

  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];
  let totalRows = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip headers/footers
    if (isHeaderOrFooter(line)) continue;

    const date = parseDateFromLine(line);
    if (!date) continue; // No date = not a transaction line

    totalRows++;
    const amounts = extractAmounts(line);

    if (amounts.length === 0) {
      errors.push({ line: i + 1, rawText: line, reason: "No amount found" });
      continue;
    }

    // Extract description: text between date and first amount
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

    // Use last amount (typically debit/credit column), negate if it looks like a debit
    let amount = amounts[amounts.length > 1 ? amounts.length - 2 : 0];
    // If there's a "DR" or "Debit" nearby, make negative
    if (/\bDR\b|debit/i.test(line)) {
      amount = -Math.abs(amount);
    } else if (/\bCR\b|credit/i.test(line)) {
      amount = Math.abs(amount);
    } else {
      // Default: treat as expense (negative)
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
      confidence: description ? 0.7 : 0.5,
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
