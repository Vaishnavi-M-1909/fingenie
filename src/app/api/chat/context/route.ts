import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json({ error: "Context type required" }, { status: 400 });
    }

    let data: any = null;

    switch (type) {
      case "insights":
        data = await prisma.insight.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          take: 1
        });
        break;

      case "transactions":
        data = await prisma.transaction.findMany({
          where: { userId: user.id },
          orderBy: { date: "desc" },
          take: 10
        });
        break;

      case "statements":
        data = await prisma.statement.findMany({
          where: { userId: user.id },
          orderBy: { uploadedAt: "desc" },
          take: 5,
          select: {
            id: true,
            originalFilename: true,
            uploadedAt: true,
            status: true
          }
        });
        break;

      case "summary":
        const [recentInsights, recentTransactions] = await Promise.all([
          prisma.insight.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 1
          }),
          prisma.transaction.findMany({
            where: { userId: user.id },
            orderBy: { date: "desc" },
            take: 20
          })
        ]);
        
        // Basic spending aggregation for summary
        const spendingByCategory = recentTransactions.reduce((acc: any, tx) => {
          if (tx.amount < 0) {
            const cat = tx.category || "Uncategorized";
            acc[cat] = (acc[cat] || 0) + Math.abs(tx.amount);
          }
          return acc;
        }, {});

        data = {
          latestInsight: recentInsights[0] || null,
          recentSpending: spendingByCategory,
          topTransactions: recentTransactions.slice(0, 5)
        };
        break;

      default:
        return NextResponse.json({ error: "Invalid context type" }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Context fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
