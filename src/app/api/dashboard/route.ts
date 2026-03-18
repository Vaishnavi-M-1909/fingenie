import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { detectRecurring } from "@/lib/parsers/normalizer";

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const bankAccountId = searchParams.get("bankAccountId");

    // Default to current month
    const now = new Date();
    const targetMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const [year, mon] = targetMonth.split("-").map(Number);

    const startDate = new Date(year, mon - 1, 1);
    const endDate = new Date(year, mon, 1);

    const where: any = {
      userId: user.id,
      date: { gte: startDate, lt: endDate },
    };

    if (bankAccountId) {
      where.statement = {
        bankAccountId: bankAccountId,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: "asc" },
    });

    // Fetch user's bank accounts
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { userId: user.id },
      select: { id: true, bankName: true, accountNumber: true, accountHolderName: true },
    });

    // Find the latest statement month for auto-navigation
    const latestTransaction = await prisma.transaction.findFirst({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      select: { date: true },
    });
    const latestStatementMonth = latestTransaction
      ? `${latestTransaction.date.getFullYear()}-${String(latestTransaction.date.getMonth() + 1).padStart(2, "0")}`
      : null;

    // Get the account holder name for the specific selection if possible
    let accountHolderName = user.name || null;
    if (bankAccountId) {
      const activeAccount = bankAccounts.find(a => a.id === bankAccountId);
      if (activeAccount) {
        accountHolderName = activeAccount.accountHolderName;
      }
    } else if (bankAccounts.length > 0) {
      accountHolderName = bankAccounts[0].accountHolderName;
    }

    if (transactions.length === 0) {
      return NextResponse.json({
        month: targetMonth,
        accountHolderName,
        latestStatementMonth,
        bankAccounts,
        totalSpent: 0,
        categoryTotals: {},
        dailyTotals: [],
        topMerchants: [],
        recurring: [],
        healthScore: null,
        transactionCount: 0,
      });
    }

    // Compute analytics
    const EXPENSE_CATEGORIES = [
      "Food & Dining", "Shopping", "Transport", "Subscriptions", "Utilities",
      "Healthcare", "Education", "Entertainment", "Other", "Uncategorized"
    ];

    const expenses = transactions.filter((t: { amount: number; category: string | null }) => {
      // If it's already negative, it's definitely an expense
      if (t.amount < 0) return true;
      // If it's positive but in an expense category, treat it as an expense (legacy data or mis-signed)
      if (t.amount > 0 && t.category && EXPENSE_CATEGORIES.includes(t.category)) return true;
      return false;
    });

    const totalSpent = expenses.reduce((sum: number, t: { amount: number; category: string | null }) => {
      return sum + Math.abs(t.amount);
    }, 0);

    // Category totals
    const categoryMap = new Map<string, number>();
    for (const tx of expenses) {
      const cat = tx.category || "Uncategorized";
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + Math.abs(tx.amount));
    }
    const categoryTotals = Object.fromEntries(
      [...categoryMap.entries()].sort(([, a], [, b]) => b - a)
    );

    // Daily totals for timeline chart
    const dailyMap = new Map<string, number>();
    for (const tx of expenses) {
      const day = tx.date.toISOString().split("T")[0];
      dailyMap.set(day, (dailyMap.get(day) || 0) + Math.abs(tx.amount));
    }
    const dailyTotals = [...dailyMap.entries()]
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Top merchants
    const merchantMap = new Map<string, number>();
    for (const tx of expenses) {
      merchantMap.set(tx.merchant, (merchantMap.get(tx.merchant) || 0) + Math.abs(tx.amount));
    }
    const topMerchants = [...merchantMap.entries()]
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([merchant, total]) => ({ merchant, total }));

    // Recurring payments
    const recurring = detectRecurring(
      transactions.map((t: { merchant: string; amount: number; date: Date }) => ({
        merchant: t.merchant,
        amount: t.amount,
        date: t.date,
      }))
    );

    // Financial health score (0-100)
    const subscriptionBurden = recurring.reduce((s, r) => s + r.amount, 0);
    const dailyAmounts = [...dailyMap.values()];
    const avgDaily = dailyAmounts.reduce((s, a) => s + a, 0) / (dailyAmounts.length || 1);
    const variance =
      dailyAmounts.reduce((s, a) => s + Math.pow(a - avgDaily, 2), 0) / (dailyAmounts.length || 1);
    const stdDev = Math.sqrt(variance);
    const variabilityScore = Math.max(0, 100 - (stdDev / avgDaily) * 100);

    const categoryCount = categoryMap.size;
    const diversityScore = Math.min(100, categoryCount * 15); // More categories = more diverse spending

    const subscriptionScore = subscriptionBurden > 0
      ? Math.max(0, 100 - (subscriptionBurden / totalSpent) * 100 * 3)
      : 100;

    const healthScore = Math.round(
      variabilityScore * 0.3 + diversityScore * 0.3 + subscriptionScore * 0.4
    );

    // Fetch recommendations based on top category or general finance
    const topCategory = Object.keys(categoryTotals)[0] || "Finance";
    
    // Get watched resources to deprioritize them
    const watchedIds = await prisma.resourceInteraction.findMany({
      where: { userId: user.id, type: { in: ["VIEW", "COMPLETE"] } },
      select: { resourceId: true },
      distinct: ["resourceId"],
    });
    const watchedSet = new Set(watchedIds.map((w: { resourceId: string }) => w.resourceId));

    const resources = await prisma.learningResource.findMany({
      where: {
        OR: [
          { category: topCategory },
          { category: "Finance" }
        ]
      },
      take: 6,
      orderBy: { createdAt: "desc" },
    });

    // Prioritize unwatched
    const recommendedResources = resources
      .sort((a, b) => (watchedSet.has(a.id) ? 1 : 0) - (watchedSet.has(b.id) ? 1 : 0))
      .slice(0, 3);

    // Fetch user's interaction history (last 6 unique items)
    const interactionHistory = await prisma.resourceInteraction.findMany({
      where: { userId: user.id },
      orderBy: { interactedAt: "desc" },
      include: {
        resource: true
      }
    });

    // Deduplicate resources in the interaction history
    const uniqueInteractionHistory = interactionHistory
      .reduce((acc: any[], current) => {
        const x = acc.find(item => item.id === current.resourceId);
        if (!x) {
          return acc.concat([current.resource]);
        } else {
          return acc;
        }
      }, [])
      .slice(0, 6);

    return NextResponse.json({
      month: targetMonth,
      accountHolderName,
      latestStatementMonth,
      bankAccounts,
      totalSpent,
      categoryTotals,
      dailyTotals,
      topMerchants,
      recurring,
      healthScore: Math.max(0, Math.min(100, healthScore)),
      transactionCount: transactions.length,
      recommendations: recommendedResources,
      interactionHistory: uniqueInteractionHistory,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
