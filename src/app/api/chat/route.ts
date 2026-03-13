import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { generateChatResponse } from "@/lib/openrouter";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.chat.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      select: {
        role: true,
        content: true,
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("[CHAT_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Fetch recent transactions for context
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 50,
      select: {
        date: true,
        merchant: true,
        amount: true,
        category: true,
        description: true,
      }
    });

    // 2. Prepare context string
    const context = transactions.length > 0 
      ? `User's recent transactions:\n${transactions.map(t => 
          `- ${t.date.toISOString().split('T')[0]}: ${t.merchant} (₹${t.amount}) in ${t.category}`
        ).join('\n')}`
      : "No transactions found for this user yet.";

    const systemPrompt = `
      You are FinGenie, a professional and helpful financial assistant for users aged 18-24.
      Your goal is to help them understand their spending, save better, and learn about finance.
      
      ${context}

      Be concise, insightful, and friendly. If they ask about specific spending, refer to the transaction data provided above.
      Always format currency as ₹ (INR).
    `;

    // 3. Generate response using OpenRouter
    const aiResponse = await generateChatResponse([
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ]);

    // 4. Save messages to DB
    await prisma.chat.createMany({
      data: [
        { userId: user.id, role: "user", content: message },
        { userId: user.id, role: "assistant", content: aiResponse },
      ]
    });

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error("[CHAT_POST_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
