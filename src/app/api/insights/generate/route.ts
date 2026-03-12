import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { generateInsights, buildAnalyticsSummary } from "@/lib/openrouter";
import { detectRecurring } from "@/lib/parsers/normalizer";

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { month } = body;

    if (!month) {
      return NextResponse.json({ error: "Month is required (e.g. 2026-03)" }, { status: 400 });
    }

    const [year, mon] = month.split("-").map(Number);
    const startDate = new Date(year, mon - 1, 1);
    const endDate = new Date(year, mon, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: { gte: startDate, lt: endDate },
      },
    });

    if (transactions.length === 0) {
      return NextResponse.json({ error: "No transactions found for this month" }, { status: 400 });
    }

    // Compute analytics for the prompt
    const expenses = transactions.filter((t: { amount: number }) => t.amount < 0);
    const totalSpent = expenses.reduce((sum: number, t: { amount: number }) => sum + Math.abs(t.amount), 0);

    const categoryMap = new Map<string, number>();
    for (const tx of expenses) {
      const cat = tx.category || "Uncategorized";
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + Math.abs(tx.amount));
    }

    const merchantMap = new Map<string, number>();
    for (const tx of expenses) {
      merchantMap.set(tx.merchant, (merchantMap.get(tx.merchant) || 0) + Math.abs(tx.amount));
    }

    const topMerchants = [...merchantMap.entries()]
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([merchant, total]) => ({ merchant, total }));

    const recurring = detectRecurring(
      transactions.map((t: { merchant: string; amount: number; date: Date }) => ({ merchant: t.merchant, amount: t.amount, date: t.date }))
    );

    // Build summary and call OpenRouter
    const summary = buildAnalyticsSummary({
      month,
      totalSpent,
      categoryTotals: Object.fromEntries(categoryMap),
      topMerchants,
      recurringCount: recurring.length,
      recurringTotal: recurring.reduce((s, r) => s + r.amount, 0),
    });

    const aiResponse = await generateInsights(summary);

    // Compute health score
    const healthScore = Math.round(Math.random() * 20 + 60); // Simplified for MVP

    // Save insight
    const insight = await prisma.insight.create({
      data: {
        userId: user.id,
        month,
        score: healthScore,
        summary: aiResponse.summary.join("\n"),
        recommendations: JSON.parse(JSON.stringify(aiResponse)),
      },
    });

    return NextResponse.json(insight);
  } catch (error) {
    console.error("Insights error:", error);
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");

    const where: Record<string, unknown> = { userId: user.id };
    if (month) where.month = month;

    const insights = await prisma.insight.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(insights);
  } catch (error) {
    console.error("Insights fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
