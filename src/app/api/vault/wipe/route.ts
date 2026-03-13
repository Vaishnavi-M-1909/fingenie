import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function DELETE() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get all file paths to delete from storage
    const statements = await prisma.statement.findMany({
      where: { userId: user.id },
      select: { filePath: true },
    });

    const filePaths = statements.map((s) => s.filePath);

    // 2. Clear storage if there are files
    if (filePaths.length > 0) {
      const supabase = await createSupabaseServerClient();
      const { error: storageError } = await supabase.storage
        .from("finGenie-bucket")
        .remove(filePaths);

      if (storageError) {
        console.error("[VAULT_WIPE_STORAGE_ERROR]", storageError);
      }
    }

    // 3. Clear all user data from DB
    // Cascade delete on Transaction and Insight is handled by Statement delete,
    // but better to be explicit or use a transaction if needed.
    // Deleting the user's statements will cascade to transactions/insights.
    await prisma.statement.deleteMany({
      where: { userId: user.id },
    });

    // Also clear orphaned transactions/insights not linked to a statement if any
    await prisma.transaction.deleteMany({
      where: { userId: user.id },
    });
    
    await prisma.insight.deleteMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[VAULT_WIPE_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
