import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();

    // Get all user statements for file paths
    const statements = await prisma.statement.findMany({
      where: { userId: user.id },
      select: { filePath: true },
    });

    // Delete storage files
    if (statements.length > 0) {
      const filePaths = statements.map((s: { filePath: string }) => s.filePath);
      await supabase.storage.from("statements").remove(filePaths);
    }

    // Delete all user data in order (respect foreign keys)
    await prisma.insight.deleteMany({ where: { userId: user.id } });
    await prisma.transaction.deleteMany({ where: { userId: user.id } });
    await prisma.statement.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });

    // Sign out
    await supabase.auth.signOut();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
