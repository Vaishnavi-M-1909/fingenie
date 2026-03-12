import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { category } = body;

    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    // Verify ownership
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId: user.id },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Update transaction
    const updated = await prisma.transaction.update({
      where: { id },
      data: { category },
    });

    // Upsert merchant map for future categorization
    const normalizedMerchant = transaction.merchant.toUpperCase().trim();
    await prisma.merchantMap.upsert({
      where: { normalizedName: normalizedMerchant },
      update: { category, createdBy: user.id },
      create: {
        normalizedName: normalizedMerchant,
        category,
        createdBy: user.id,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
