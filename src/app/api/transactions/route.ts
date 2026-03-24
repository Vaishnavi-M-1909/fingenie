import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { extractTransactionBalance, normalizeTransactionSign } from "@/lib/transactions/sign";

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); // format: "2026-03"
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const bankAccountId = searchParams.get("bankAccountId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = { userId: user.id };

    if (bankAccountId) {
      where.statement = {
        bankAccountId: bankAccountId,
      };
    }

    if (month) {
      const [year, mon] = month.split("-").map(Number);
      where.date = {
        gte: new Date(year, mon - 1, 1),
        lt: new Date(year, mon, 1),
      };
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { merchant: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ]);

    const normalizedTransactions = transactions.map((tx) => {
      const normalized = normalizeTransactionSign(tx);
      return {
        ...normalized,
        balance: extractTransactionBalance(normalized),
      };
    });

    return NextResponse.json({
      transactions: normalizedTransactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Transactions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
