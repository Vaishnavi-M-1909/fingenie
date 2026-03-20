import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMonthlyReminder } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only run on the 1st of the month (optional check if handled by external cron)
    const today = new Date();
    if (today.getDate() !== 1 && process.env.NODE_ENV === "production") {
      return NextResponse.json({ message: "Not the first day of the month. Skipping." });
    }

    const users = await prisma.user.findMany({
      where: { monthlyReminder: true },
      select: { email: true, name: true },
    });

    const results = await Promise.allSettled(
      users.map(user => sendMonthlyReminder(user.email, user.name))
    );

    return NextResponse.json({
      message: `Processed ${users.length} reminders.`,
      results: results.map(r => r.status),
    });
  } catch (error) {
    console.error("[CRON_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
