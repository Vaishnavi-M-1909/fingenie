import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Upsert user in Prisma
      await prisma.user.upsert({
        where: { email: data.user.email! },
        update: {
          name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
          avatarUrl: data.user.user_metadata?.avatar_url,
        },
        create: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
          avatarUrl: data.user.user_metadata?.avatar_url,
        },
      });

      // Check if user has any registered bank accounts
      const bankAccountCount = await prisma.bankAccount.count({
        where: { userId: data.user.id },
      });

      if (bankAccountCount === 0) {
        // First-time user or no bank accounts — redirect to setup
        return NextResponse.redirect(`${origin}/setup-bank`);
      }

      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  // Return to login page on error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
