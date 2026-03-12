// Rule-based merchant → category mapping
const MERCHANT_CATEGORY_MAP: Record<string, string> = {
  // Food & Dining
  swiggy: "Food & Dining",
  zomato: "Food & Dining",
  "uber eats": "Food & Dining",
  dominos: "Food & Dining",
  mcdonalds: "Food & Dining",
  starbucks: "Food & Dining",
  kfc: "Food & Dining",
  "pizza hut": "Food & Dining",
  "burger king": "Food & Dining",
  "dunkin donuts": "Food & Dining",
  "cafe coffee day": "Food & Dining",
  restaurant: "Food & Dining",

  // Shopping
  amazon: "Shopping",
  flipkart: "Shopping",
  myntra: "Shopping",
  ajio: "Shopping",
  meesho: "Shopping",
  nykaa: "Shopping",
  "big bazaar": "Shopping",
  dmart: "Shopping",

  // Transport
  uber: "Transport",
  ola: "Transport",
  rapido: "Transport",
  metro: "Transport",
  irctc: "Transport",
  petrol: "Transport",
  fuel: "Transport",
  "indian oil": "Transport",
  "bharat petroleum": "Transport",
  "hp petrol": "Transport",

  // Subscriptions
  netflix: "Subscriptions",
  spotify: "Subscriptions",
  hotstar: "Subscriptions",
  "disney+": "Subscriptions",
  "amazon prime": "Subscriptions",
  youtube: "Subscriptions",
  "apple music": "Subscriptions",
  "google one": "Subscriptions",
  jio: "Subscriptions",
  airtel: "Subscriptions",

  // Utilities
  electricity: "Utilities",
  water: "Utilities",
  gas: "Utilities",
  broadband: "Utilities",
  wifi: "Utilities",
  "act fibernet": "Utilities",

  // Healthcare
  pharmacy: "Healthcare",
  hospital: "Healthcare",
  medplus: "Healthcare",
  "apollo pharmacy": "Healthcare",
  practo: "Healthcare",

  // Education
  udemy: "Education",
  coursera: "Education",
  unacademy: "Education",
  "byjus": "Education",

  // Entertainment
  "book my show": "Entertainment",
  bookmyshow: "Entertainment",
  pvr: "Entertainment",
  inox: "Entertainment",
  gaming: "Entertainment",

  // Transfers
  upi: "Transfer",
  neft: "Transfer",
  imps: "Transfer",
  rtgs: "Transfer",

  // Cash
  atm: "Cash Withdrawal",
  "cash withdrawal": "Cash Withdrawal",
};

export function normalizeMerchant(raw: string): string {
  let cleaned = raw
    .toUpperCase()
    .replace(/UPI\/[A-Z0-9]+\//gi, "")
    .replace(/UPI-/gi, "")
    .replace(/NEFT[- ]*[A-Z0-9]*/gi, "")
    .replace(/IMPS[- ]*[A-Z0-9]*/gi, "")
    .replace(/\d{6,}/g, "") // Remove long numbers (ref IDs)
    .replace(/[\/\-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Remove common suffixes
  cleaned = cleaned
    .replace(/\s*(PVT|LTD|LIMITED|PRIVATE|INDIA|TECHNOLOGIES|TECH|SERVICES)\s*/g, " ")
    .trim();

  return cleaned || raw.trim();
}

export function categorizeTransaction(merchant: string): string | undefined {
  const normalized = merchant.toLowerCase();

  for (const [keyword, category] of Object.entries(MERCHANT_CATEGORY_MAP)) {
    if (normalized.includes(keyword)) {
      return category;
    }
  }

  return undefined;
}

export function detectRecurring(
  transactions: { merchant: string; amount: number; date: Date }[]
): { merchant: string; amount: number; count: number; isRecurring: boolean }[] {
  const merchantGroups = new Map<string, { amounts: number[]; dates: Date[] }>();

  for (const tx of transactions) {
    const key = normalizeMerchant(tx.merchant);
    if (!merchantGroups.has(key)) {
      merchantGroups.set(key, { amounts: [], dates: [] });
    }
    const group = merchantGroups.get(key)!;
    group.amounts.push(Math.abs(tx.amount));
    group.dates.push(tx.date);
  }

  const results: { merchant: string; amount: number; count: number; isRecurring: boolean }[] = [];

  for (const [merchant, { amounts, dates }] of merchantGroups) {
    if (amounts.length < 2) continue;

    // Check if amounts are similar (within 10%)
    const avgAmount = amounts.reduce((s, a) => s + a, 0) / amounts.length;
    const amountsSimilar = amounts.every(
      (a) => Math.abs(a - avgAmount) / avgAmount < 0.1
    );

    // Check if dates are roughly monthly (25-35 day intervals)
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
    let isMonthly = true;
    for (let i = 1; i < sortedDates.length; i++) {
      const diffDays =
        (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) /
        (1000 * 60 * 60 * 24);
      if (diffDays < 25 || diffDays > 35) {
        isMonthly = false;
        break;
      }
    }

    if (amountsSimilar && (isMonthly || amounts.length >= 3)) {
      results.push({
        merchant,
        amount: avgAmount,
        count: amounts.length,
        isRecurring: true,
      });
    }
  }

  return results;
}
