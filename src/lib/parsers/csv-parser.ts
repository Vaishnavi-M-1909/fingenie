import Papa from "papaparse";
import type { ParseResult, ParsedTransaction, ParserError } from "./types";
import { normalizeMerchant, categorizeTransaction } from "./normalizer";

// Common column name variants
const DATE_COLUMNS = ["date", "transaction date", "txn date", "value date", "posting date", "trans date"];
const DESCRIPTION_COLUMNS = ["description", "narration", "particulars", "details", "remarks", "transaction details", "merchant"];
const AMOUNT_COLUMNS = ["amount", "transaction amount", "txn amount"];
const DEBIT_COLUMNS = ["debit", "withdrawal", "debit amount", "dr", "withdrawal amount"];
const CREDIT_COLUMNS = ["credit", "deposit", "credit amount", "cr", "deposit amount"];

function findColumn(headers: string[], candidates: string[]): string | null {
  const normalizedHeaders = headers.map((h) => h.toLowerCase().trim());
  for (const candidate of candidates) {
    const idx = normalizedHeaders.indexOf(candidate);
    if (idx !== -1) return headers[idx];
  }
  // Partial match
  for (const candidate of candidates) {
    const idx = normalizedHeaders.findIndex((h) => h.includes(candidate));
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const cleaned = value.trim();

  // Common Indian formats: DD/MM/YYYY, DD-MM-YYYY, DD/MM/YY
  const dmyMatch = cleaned.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1]);
    const month = parseInt(dmyMatch[2]) - 1;
    let year = parseInt(dmyMatch[3]);
    if (year < 100) year += 2000;
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) return date;
  }

  // ISO: YYYY-MM-DD
  const isoMatch = cleaned.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);
  if (isoMatch) {
    const date = new Date(parseInt(isoMatch[1]), parseInt(isoMatch[2]) - 1, parseInt(isoMatch[3]));
    if (!isNaN(date.getTime())) return date;
  }

  // Fallback to Date.parse
  const fallback = new Date(cleaned);
  if (!isNaN(fallback.getTime())) return fallback;

  return null;
}

function parseAmount(value: string): number | null {
  if (!value) return null;
  const cleaned = value
    .replace(/[₹$€£,\s]/g, "")
    .replace(/\(([^)]+)\)/, "-$1") // (100) → -100
    .trim();
  if (!cleaned) return null;
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export function parseCSV(content: string): ParseResult {
  const transactions: ParsedTransaction[] = [];
  const errors: ParserError[] = [];

  const parsed = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
  });

  if (!parsed.meta.fields || parsed.meta.fields.length === 0) {
    return {
      transactions: [],
      errors: [{ line: 0, rawText: "", reason: "No headers found in CSV" }],
      metadata: { totalRows: 0, parsedRows: 0, failedRows: 0 },
    };
  }

  const headers = parsed.meta.fields;
  const dateCol = findColumn(headers, DATE_COLUMNS);
  const descCol = findColumn(headers, DESCRIPTION_COLUMNS);
  const amountCol = findColumn(headers, AMOUNT_COLUMNS);
  const debitCol = findColumn(headers, DEBIT_COLUMNS);
  const creditCol = findColumn(headers, CREDIT_COLUMNS);
  const categoryCol = findColumn(headers, ["category", "type", "group"]);

  if (!dateCol) {
    return {
      transactions: [],
      errors: [{ line: 0, rawText: headers.join(","), reason: "Could not identify date column" }],
      metadata: { totalRows: parsed.data.length, parsedRows: 0, failedRows: parsed.data.length },
    };
  }

  const rows = parsed.data as Record<string, string>[];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rawLine = Object.values(row).join(" | ");

    try {
      const date = parseDate(row[dateCol!]);
      if (!date) {
        errors.push({ line: i + 2, rawText: rawLine, reason: "Invalid date" });
        continue;
      }

      let amount: number | null = null;
      if (amountCol) {
        amount = parseAmount(row[amountCol]);
      } else if (debitCol || creditCol) {
        const debit = debitCol ? parseAmount(row[debitCol]) : null;
        const credit = creditCol ? parseAmount(row[creditCol]) : null;
        if (debit && debit > 0) amount = -debit;
        else if (credit && credit > 0) amount = credit;
        else if (debit !== null) amount = -Math.abs(debit);
        else if (credit !== null) amount = Math.abs(credit);
      }

      if (amount === null) {
        errors.push({ line: i + 2, rawText: rawLine, reason: "Could not parse amount" });
        continue;
      }

      const merchant = descCol ? (row[descCol] || "Unknown").trim() : "Unknown";
      const normalizedMerchant = normalizeMerchant(merchant);
      
      // Use CSV category if available, otherwise fallback to rules
      let category = categoryCol ? row[categoryCol] : undefined;
      if (!category || category.toLowerCase() === "uncategorized") {
        category = categorizeTransaction(normalizedMerchant);
      }

      transactions.push({
        date,
        merchant: normalizedMerchant,
        amount,
        currency: "INR",
        category: category || "Uncategorized",
        description: merchant,
        rawLine,
        confidence: 0.9,
      });
    } catch {
      errors.push({ line: i + 2, rawText: rawLine, reason: "Unexpected error" });
    }
  }

  return {
    transactions,
    errors,
    metadata: {
      totalRows: rows.length,
      parsedRows: transactions.length,
      failedRows: errors.length,
    },
  };
}
