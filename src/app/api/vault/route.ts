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
    const bankAccountId = searchParams.get("bankAccountId");

    const where: any = { userId: user.id };
    if (bankAccountId) {
      where.bankAccountId = bankAccountId;
    }

    const statements = await prisma.statement.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
      include: {
        _count: {
          select: { transactions: true }
        }
      }
    });

    return NextResponse.json({ statements });
  } catch (error) {
    console.error("[VAULT_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
