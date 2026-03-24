const EXPENSE_CATEGORIES = new Set([
  "Food & Dining",
  "Shopping",
  "Transport",
  "Subscriptions",
  "Utilities",
  "Healthcare",
  "Education",
  "Entertainment",
  "Other",
  "Uncategorized",
  "Cash Withdrawal",
]);

const EXPENSE_PATTERN =
  /\b(debit|withdrawal|withdrawn|atm|cash withdrawal|purchase|pos|spent|paid|bill(?:pay)?|charge|fee|emi|autodebit|auto debit|debit card|withdrawal\s*\(dr\.?\)|upi\/.*\/dr\b|neft\/?.*\/dr\b|imps\/?.*\/dr\b|ach[- ]?dr|sent to|transfer to|to transfer|wdl(?:\s+tfr|\s+trf|\s+transfer)?|\bdr\b)\b/i;

const CREDIT_PATTERN =
  /\b(credit|credited|deposit|cash deposit|refund|reversal|salary|interest|cashback|reward|received|deposit\s*\(cr\.?\)|upi\/.*\/cr\b|neft\/?.*\/cr\b|imps\/?.*\/cr\b|ach[- ]?cr|transfer from|received from|by transfer|by cash|by cheque|dep(?:\s+tfr|\s+trf|\s+transfer)?|\bcr\b)\b/i;

const EXPLICIT_DEBIT_AMOUNT_PATTERNS = [
  /"debit"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?/gi,
  /"withdrawal"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?/gi,
  /\bwithdrawal\s*\(dr\.?\)\b[^0-9-]*([1-9][\d,]*(?:\.\d+)?)/gi,
];

const EXPLICIT_CREDIT_AMOUNT_PATTERNS = [
  /"credit"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?/gi,
  /"deposit"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?/gi,
  /\bdeposit\s*\(cr\.?\)\b[^0-9-]*([1-9][\d,]*(?:\.\d+)?)/gi,
];

const EXPLICIT_DEBIT_TAG_PATTERN = /(?:^|[\s|:/(-])(?:dr|debit|withdrawal|wdl(?:\s+tfr|\s+trf|\s+transfer)?)(?:$|[\s|:/).-])/i;
const EXPLICIT_CREDIT_TAG_PATTERN = /(?:^|[\s|:/(-])(?:cr|credit|credited|deposit|dep(?:\s+tfr|\s+trf|\s+transfer)?)(?:$|[\s|:/).-])/i;

export interface TransactionSignLike {
  amount: number;
  category?: string | null;
  description?: string | null;
  rawLine?: string | null;
  merchant?: string | null;
}

export interface TransactionBalanceLike {
  description?: string | null;
  rawLine?: string | null;
}

function parseLooseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) return null;
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function amountMatches(a: number, b: number): boolean {
  return Math.abs(a - b) <= 0.01;
}

function hasMatchingAmountField(text: string, patterns: RegExp[], baseAmount: number): boolean {
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const value = parseLooseNumber(match[1] || "");
      if (value !== null && amountMatches(Math.abs(value), baseAmount)) {
        return true;
      }
    }
  }
  return false;
}

function looksStructured(rawLine: string | null | undefined): boolean {
  const text = (rawLine || "").trim();
  return text.startsWith("{") || text.startsWith("[") || /"(?:debit|credit|withdrawal|deposit|balance)"/i.test(text);
}

export function extractTransactionBalance(tx: TransactionBalanceLike): number | null {
  const descriptionMatch = tx.description?.match(/\bBal:\s*([0-9,]+(?:\.\d{1,2})?)\b/i);
  if (descriptionMatch) {
    return parseLooseNumber(descriptionMatch[1]);
  }

  const rawLineMatch = tx.rawLine?.match(/"balance"\s*:\s*"?(null|[0-9,]+(?:\.\d{1,2})?)"?/i);
  if (rawLineMatch) {
    if (rawLineMatch[1]?.toLowerCase() === "null") return null;
    return parseLooseNumber(rawLineMatch[1]);
  }

  const labelMatch = tx.rawLine?.match(/\bbalance\b[^0-9-]*([0-9,]+(?:\.\d{1,2})?)/i);
  if (labelMatch) {
    return parseLooseNumber(labelMatch[1]);
  }

  return null;
}

export function normalizeTransactionSign<T extends TransactionSignLike>(tx: T): T {
  const baseAmount = Math.abs(tx.amount);
  if (!Number.isFinite(baseAmount) || baseAmount === 0) {
    return tx;
  }

  const narrativeText = [tx.description, tx.merchant]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const rawLineText = (tx.rawLine || "").toLowerCase();
  const signalText = [narrativeText, looksStructured(tx.rawLine) ? null : rawLineText]
    .filter(Boolean)
    .join(" ");

  const hasExplicitDebitField =
    hasMatchingAmountField(rawLineText, EXPLICIT_DEBIT_AMOUNT_PATTERNS, baseAmount) ||
    EXPLICIT_DEBIT_TAG_PATTERN.test(signalText);
  const hasExplicitCreditField =
    hasMatchingAmountField(rawLineText, EXPLICIT_CREDIT_AMOUNT_PATTERNS, baseAmount) ||
    EXPLICIT_CREDIT_TAG_PATTERN.test(signalText);
  const hasExpenseSignal = EXPENSE_PATTERN.test(signalText);
  const hasCreditSignal = CREDIT_PATTERN.test(signalText);
  const isExpenseCategory = !!tx.category && EXPENSE_CATEGORIES.has(tx.category);

  if (hasExplicitCreditField && !hasExplicitDebitField) {
    return tx.amount < 0 ? { ...tx, amount: baseAmount } : tx;
  }

  if (hasExplicitDebitField && !hasExplicitCreditField) {
    return tx.amount > 0 ? { ...tx, amount: -baseAmount } : tx;
  }

  if (tx.amount > 0) {
    if ((hasExpenseSignal || isExpenseCategory) && !hasCreditSignal) {
      return { ...tx, amount: -baseAmount };
    }
    return tx;
  }

  if (tx.amount < 0) {
    if (hasCreditSignal && !hasExpenseSignal) {
      return { ...tx, amount: baseAmount };
    }
  }

  return tx;
}

export function isExpenseTransaction(tx: TransactionSignLike): boolean {
  const normalized = normalizeTransactionSign(tx);
  if (normalized.amount < 0) return true;
  return !!normalized.category && EXPENSE_CATEGORIES.has(normalized.category);
}
