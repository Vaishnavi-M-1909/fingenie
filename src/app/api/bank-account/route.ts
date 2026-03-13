import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bankAccounts = await prisma.bankAccount.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bankAccounts });
  } catch (error) {
    console.error("Bank account fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { accountHolderName, accountNumber, ifscCode, bankName, branch } = body;

    if (!accountHolderName || !accountNumber || !bankName) {
      return NextResponse.json(
        { error: "Account holder name, account number, and bank name are required" },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = await prisma.bankAccount.findUnique({
      where: {
        userId_accountNumber: {
          userId: user.id,
          accountNumber: String(accountNumber),
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This account is already registered" },
        { status: 409 }
      );
    }

    const bankAccount = await prisma.bankAccount.create({
      data: {
        userId: user.id,
        accountHolderName: String(accountHolderName).trim(),
        accountNumber: String(accountNumber).trim(),
        ifscCode: ifscCode ? String(ifscCode).trim() : null,
        bankName: String(bankName).trim(),
        branch: branch ? String(branch).trim() : null,
      },
    });

    return NextResponse.json({ bankAccount }, { status: 201 });
  } catch (error) {
    console.error("Bank account creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
