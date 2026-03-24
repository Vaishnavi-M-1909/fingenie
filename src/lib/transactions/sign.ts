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
  /\b(debit|withdrawal|withdrawn|atm|cash withdrawal|purchase|pos|spent|paid|bill(?:pay)?|charge|fee|emi|autodebit|auto debit|debit card|withdrawal\s*\(dr\.?\)|upi\/.*\/dr\b|neft\/?.*\/dr\b|imps\/?.*\/dr\b|ach[- ]?dr|sent to|transfer to)\b/i;

const CREDIT_PATTERN =
  /\b(credit|credited|deposit|cash deposit|refund|reversal|salary|interest|cashback|reward|received|deposit\s*\(cr\.?\)|upi\/.*\/cr\b|neft\/?.*\/cr\b|imps\/?.*\/cr\b|ach[- ]?cr|transfer from|received from)\b/i;

const EXPLICIT_DEBIT_FIELD_PATTERN =
  /"debit"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?|"withdrawal"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?|\bwithdrawal\s*\(dr\.?\)\b/i;

const EXPLICIT_CREDIT_FIELD_PATTERN =
  /"credit"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?|"deposit"\s*:\s*"?([1-9][\d,]*(?:\.\d+)?)"?|\bdeposit\s*\(cr\.?\)\b/i;

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

  const text = [tx.description, tx.rawLine, tx.merchant]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const hasExpenseSignal = EXPENSE_PATTERN.test(text);
  const hasCreditSignal = CREDIT_PATTERN.test(text);
  const hasExplicitDebitField = EXPLICIT_DEBIT_FIELD_PATTERN.test(text);
  const hasExplicitCreditField = EXPLICIT_CREDIT_FIELD_PATTERN.test(text);
  const isExpenseCategory = !!tx.category && EXPENSE_CATEGORIES.has(tx.category);

  if (tx.amount > 0) {
    if ((hasExplicitDebitField || isExpenseCategory || hasExpenseSignal) && !hasExplicitCreditField && !hasCreditSignal) {
      return { ...tx, amount: -baseAmount };
    }
    return tx;
  }

  if (tx.amount < 0) {
    if ((hasExplicitCreditField || hasCreditSignal) && !hasExplicitDebitField && !hasExpenseSignal && !isExpenseCategory) {
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
