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
        id: true,
        role: true,
        content: true,
        imageUrl: true,
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

    const { message, history = [], image } = await req.json();

    if (!message && !image) {
      return NextResponse.json({ error: "Message or image is required" }, { status: 400 });
    }

    // 1. Prepare contents for OpenRouter
    const userContent: any[] = [{ type: "text", text: message || "Analyze this image" }];
    if (image) {
      userContent.push({
        type: "image_url",
        image_url: { url: image } // Already expected to be data:image/...;base64,...
      });
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

    // 3. Handle Image Persistence if present
    let savedImageUrl: string | undefined;
    if (image && image.startsWith("data:image")) {
      try {
        const base64Data = image.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        const mimeType = image.split(";")[0].split(":")[1];
        const fileName = `chat_${Date.now()}.${mimeType.split("/")[1]}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("finGenie-bucket")
          .upload(filePath, buffer, { contentType: mimeType });

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from("finGenie-bucket")
            .getPublicUrl(filePath);
          savedImageUrl = publicUrl;
        }
      } catch (err) {
        console.error("[CHAT_IMAGE_UPLOAD_ERROR]", err);
      }
    }

    // 4. Generate response using OpenRouter
    const aiResponse = await generateChatResponse([
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userContent }
    ]);

    // 5. Save messages to DB
    const userMsg = await prisma.chat.create({
      data: {
        userId: user.id,
        role: "user",
        content: message || "Sent an image",
        imageUrl: savedImageUrl
      }
    });

    const aiMsg = await prisma.chat.create({
      data: {
        userId: user.id,
        role: "assistant",
        content: aiResponse
      }
    });

    return NextResponse.json({ 
      message: aiResponse,
      userMessageId: userMsg.id,
      aiMessageId: aiMsg.id
    });
  } catch (error) {
    console.error("[CHAT_POST_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
