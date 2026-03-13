import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const statement = await prisma.statement.findUnique({
      where: { id },
    });

    if (!statement || statement.userId !== user.id) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const supabase = await createSupabaseServerClient();
    console.log("[VAULT_DEBUG] Downloading path:", statement.filePath);
    const { data, error } = await supabase.storage
      .from("finGenie-bucket")
      .download(statement.filePath);

    if (error || !data) {
      console.error("[VAULT_FILE_ERROR] Supabase error:", error);
      return NextResponse.json({ 
        error: "Failed to retrieve file", 
        debug_path: statement.filePath,
        supabase_error: error 
      }, { status: 500 });
    }

    // Determine content type based on filename extension
    const ext = statement.originalFilename.split(".").pop()?.toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === "pdf") contentType = "application/pdf";
    else if (ext === "csv") contentType = "text/csv";
    else if (["jpg", "jpeg"].includes(ext || "")) contentType = "image/jpeg";
    else if (ext === "png") contentType = "image/png";

    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${statement.originalFilename}"`,
      },
    });
  } catch (error) {
    console.error("[VAULT_FILE_PROXY_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
