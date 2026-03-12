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

    // Default to current month
    const now = new Date();
    const targetMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const [year, mon] = targetMonth.split("-").map(Number);

    const startDate = new Date(year, mon - 1, 1);
    const endDate = new Date(year, mon, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: { gte: startDate, lt: endDate },
      },
      orderBy: { date: "asc" },
    });

    if (transactions.length === 0) {
      return NextResponse.json({
        month: targetMonth,
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
    const expenses = transactions.filter((t: { amount: number }) => t.amount < 0);
    const totalSpent = expenses.reduce((sum: number, t: { amount: number }) => sum + Math.abs(t.amount), 0);

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

    return NextResponse.json({
      month: targetMonth,
      totalSpent,
      categoryTotals,
      dailyTotals,
      topMerchants,
      recurring,
      healthScore: Math.max(0, Math.min(100, healthScore)),
      transactionCount: transactions.length,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
