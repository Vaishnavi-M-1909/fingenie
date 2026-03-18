import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { accountHolderName, accountNumber, ifscCode, bankName, branch } = body;

    const bankAccount = await prisma.bankAccount.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        accountHolderName: accountHolderName?.trim(),
        accountNumber: accountNumber?.trim(),
        ifscCode: ifscCode?.trim(),
        bankName: bankName?.trim(),
        branch: branch?.trim(),
      },
    });

    return NextResponse.json({ bankAccount });
  } catch (error) {
    console.error("Bank account update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Manually nullify bankAccountId on all related statements first
    // to avoid potential FK constraints depending on DB settings.
    await prisma.statement.updateMany({
      where: { bankAccountId: id, userId: user.id },
      data: { bankAccountId: null },
    });

    await prisma.bankAccount.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bank account deletion error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
