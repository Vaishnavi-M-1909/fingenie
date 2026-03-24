import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function extractStoragePathFromPublicUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    const marker = "/storage/v1/object/public/finGenie-bucket/";
    const markerIndex = url.pathname.indexOf(marker);
    if (markerIndex === -1) return null;

    const encodedPath = url.pathname.slice(markerIndex + marker.length);
    return decodeURIComponent(encodedPath);
  } catch {
    return null;
  }
}

export async function DELETE() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();

    // 1. Get all storage file paths to delete
    const [statements, chatImages] = await Promise.all([
      prisma.statement.findMany({
        where: { userId: user.id },
        select: { filePath: true },
      }),
      prisma.chat.findMany({
        where: { userId: user.id, imageUrl: { not: null } },
        select: { imageUrl: true },
      }),
    ]);

    const filePaths = [
      ...statements.map((s) => s.filePath),
      ...chatImages
        .map((chat) => extractStoragePathFromPublicUrl(chat.imageUrl))
        .filter((path): path is string => Boolean(path)),
    ];

    // 2. Clear storage if there are files
    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("finGenie-bucket")
        .remove([...new Set(filePaths)]);

      if (storageError) {
        console.error("[VAULT_WIPE_STORAGE_ERROR]", storageError);
      }
    }

    // 3. Clear all user data tied to vault + intelligence history
    await prisma.$transaction(async (tx) => {
      await tx.chat.deleteMany({
        where: { userId: user.id },
      });

      await tx.statement.deleteMany({
        where: { userId: user.id },
      });

      // Also clear orphaned transactions/insights not linked to a statement if any
      await tx.transaction.deleteMany({
        where: { userId: user.id },
      });

      await tx.insight.deleteMany({
        where: { userId: user.id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[VAULT_WIPE_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
