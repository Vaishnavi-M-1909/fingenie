import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // 1. Get the statement to find the filePath
    const statement = await prisma.statement.findUnique({
      where: { id },
    });

    if (!statement || statement.userId !== user.id) {
      return NextResponse.json({ error: "Statement not found" }, { status: 404 });
    }

    // 2. Delete from Supabase Storage
    const supabase = await createSupabaseServerClient();
    const { error: storageError } = await supabase.storage
      .from("finGenie-bucket")
      .remove([statement.filePath]);

    if (storageError) {
      console.error("[VAULT_DELETE_STORAGE_ERROR]", storageError);
      // We continue even if storage delete fails to ensure DB consistency,
      // but log it for investigation.
    }

    // 3. Delete from Database
    // Note: Prisma schema has onDelete: Cascade for transactions and insights linked to statements
    await prisma.statement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[VAULT_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
