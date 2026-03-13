import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { generateChatResponse } from "@/lib/openrouter";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const messageId = resolvedParams.id;
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Verify ownership
    const existingMessage = await prisma.chat.findUnique({
      where: { id: messageId }
    });

    if (!existingMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    if (existingMessage.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update message
    const updatedMessage = await prisma.chat.update({
      where: { id: messageId },
      data: { content }
    });

    // Delete all subsequent messages to branch the chat
    await prisma.chat.deleteMany({
      where: {
        userId: user.id,
        createdAt: {
          gt: existingMessage.createdAt
        }
      }
    });

    // Fetch previous history for context
    const historyMessages = await prisma.chat.findMany({
      where: {
        userId: user.id,
        createdAt: {
          lt: existingMessage.createdAt
        }
      },
      orderBy: { createdAt: "asc" }
    });

    const previousHistory = historyMessages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content
    }));

    // Fetch transactions for context
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

    const contextStr = transactions.length > 0 
      ? `User's recent transactions:\n${transactions.map(t => 
          `- ${t.date.toISOString().split('T')[0]}: ${t.merchant} (₹${t.amount}) in ${t.category}`
        ).join('\n')}`
      : "No transactions found for this user yet.";

    const systemPrompt = `
      You are FinGenie, a professional and helpful financial assistant for users aged 18-24.
      Your goal is to help them understand their spending, save better, and learn about finance.
      
      ${contextStr}

      Be concise, insightful, and friendly. If they ask about specific spending, refer to the transaction data provided above.
      Always format currency as ₹ (INR).
    `;

    // Construct user content block
    const userContent: any[] = [{ type: "text", text: content }];
    if (updatedMessage.imageUrl) {
      userContent.push({
        type: "image_url",
        image_url: { url: updatedMessage.imageUrl }
      });
    }

    // Generate new AI response based on branched history
    const aiResponse = await generateChatResponse([
      { role: "system", content: systemPrompt },
      ...previousHistory,
      { role: "user", content: userContent }
    ]);

    // Save AI response
    const aiMsg = await prisma.chat.create({
      data: {
        userId: user.id,
        role: "assistant",
        content: aiResponse
      }
    });

    return NextResponse.json({ 
      message: aiResponse,
      aiMessageId: aiMsg.id
    });
  } catch (error) {
    console.error("[CHAT_PUT_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
