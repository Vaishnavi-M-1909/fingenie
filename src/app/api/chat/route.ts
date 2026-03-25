import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateChatResponse } from "@/lib/openrouter";
import { getUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOrSyncYouTubeResources } from "@/lib/youtube";

export async function GET() {
  try {
    const user = await getUser();

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
        recommendations: true,
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
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, history = [], image, injectedContext = "" } = await req.json();

    if (!message && !image) {
      return NextResponse.json({ error: "Message or image is required" }, { status: 400 });
    }

    // 1. Prepare contents for OpenRouter
    const userContent: any[] = [{ type: "text", text: message || "Analyze this image" }];
    if (image) {
      userContent.push({
        type: "image_url",
        image_url: { url: image }
      });
    }

    // 2. Detect @flags in the message for recommendations
    const flagPattern = /@(tax|finance|spending|investing|budgeting|savings|insurance|money|mutual[-\s]?funds?|stocks?|budget|save|invest)/gi;
    const detectedFlags = [...(message || "").matchAll(flagPattern)].map((m: RegExpMatchArray) => m[1].toLowerCase());

    // Map common synonyms to database categories
    const categoryMap: Record<string, string> = {
      tax: "Tax",
      finance: "Finance",
      money: "Finance",
      spending: "Spending",
      investing: "Investing",
      invest: "Investing",
      stocks: "Investing",
      stock: "Investing",
      "mutual-funds": "Investing",
      "mutual funds": "Investing",
      "mutualfunds": "Investing",
      budgeting: "Budgeting",
      budget: "Budgeting",
      savings: "Savings",
      save: "Savings",
      insurance: "Insurance",
    };

    const categories = [...new Set(detectedFlags.map((f: string) => categoryMap[f] || "Finance"))];
    const firstCategory = categories[0] || "Finance";

    // 3. Query recommendations if @flags detected
    let recommendations: Array<{ id: string; title: string; type: string; url: string; author: string | null; description: string; thumbnailUrl: string | null }> = [];
    let recommendationContext = "";

    if (categories.length > 0) {
      // 3.1 Fetch fresh YouTube suggestions
      try {
        const youtubeResources = await getOrSyncYouTubeResources(prisma, detectedFlags.join(" "), firstCategory, 4);
        
        // Get user's watch history to avoid repeats
        const watchedIds = await prisma.resourceInteraction.findMany({
          where: { userId: user.id, type: { in: ["VIEW", "COMPLETE"] } },
          select: { resourceId: true },
          distinct: ["resourceId"],
        });
        const watchedSet = new Set(watchedIds.map((w: { resourceId: string }) => w.resourceId));

        // Prioritize unwatched content
        const sorted = youtubeResources.sort((a: any, b: any) => {
          const aWatched = watchedSet.has(a.id) ? 1 : 0;
          const bWatched = watchedSet.has(b.id) ? 1 : 0;
          return aWatched - bWatched;
        });

        recommendations = sorted.slice(0, 4).map((r: any) => ({
          id: r.id,
          title: r.title,
          type: r.type,
          url: r.url,
          author: r.author,
          description: r.description,
          thumbnailUrl: r.thumbnailUrl,
        }));
      } catch (err) {
        console.error("[YOUTUBE_RECO_ERROR]", err);
        // Fallback to existing DB resources if YouTube fails
        const resources = await prisma.learningResource.findMany({
          where: { category: { in: categories } },
          take: 4,
          orderBy: { createdAt: "desc" },
        });
        recommendations = resources.map(r => ({
          id: r.id, title: r.title, type: r.type, url: r.url,
          author: r.author, description: r.description, thumbnailUrl: r.thumbnailUrl
        }));
      }

      if (recommendations.length > 0) {
        recommendationContext = `\n\n--- Curated Learning Resources (MUST include in your response) ---\nThe user asked about ${categories.join(", ")}. Here are verified resources from our library. You MUST recommend 1-3 of these in your response with their exact titles. Format each recommendation clearly.\n${recommendations.map((r, i) => `${i + 1}. [${r.type}] "${r.title}" by ${r.author || "Unknown"} — ${r.description}`).join("\n")}`;
      }
    }

    // 4. Fetch recent transactions for context
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

    // 5. Prepare context string
    const context = transactions.length > 0 
      ? `User's recent transactions:\n${transactions.map(t => 
          `- ${t.date.toISOString().split('T')[0]}: ${t.merchant} (₹${t.amount}) in ${t.category}`
        ).join('\n')}`
      : "No transactions found for this user yet.";

    const systemPrompt = `
      You are FinGenie, a professional and helpful financial assistant for users aged 18-24.
      Your goal is to help them understand their spending, save better, and learn about finance.
      
      --- General Context ---
      ${context}

      --- Specifically Requested Context (@mentions) ---
      ${injectedContext || "No specific entities mentioned."}
      ${recommendationContext}

      Be concise, insightful, and friendly. If they ask about specific spending, refer to the transaction data provided above.
      
      --- RECOMMENDATION GUIDELINES ---
      1. When recommending resources (videos/articles/books), mention them naturally in your response (e.g., "You might find this video on tax saving helpful...").
      2. DO NOT create a numbered list or use rigid "[VIDEO]" prefixes in your text response, as interactive cards will be shown separately.
      3. Your tone should be that of a helpful coach, not a search engine.
      4. Always format currency as ₹ (INR).
    `;

    // 3. Handle Image Persistence if present
    let savedImageUrl: string | undefined;
    if (image && image.startsWith("data:image")) {
      try {
        const supabase = await createSupabaseServerClient();
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
        content: aiResponse,
        recommendations: recommendations.length > 0 ? recommendations : undefined,
      }
    });

    return NextResponse.json({ 
      message: aiResponse,
      userMessageId: userMsg.id,
      aiMessageId: aiMsg.id,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
    });
  } catch (error: any) {
    console.error("[CHAT_POST_ERROR] Full details:");
    console.dir(error, { depth: null });
    return NextResponse.json({ 
      error: "Internal server error",
      code: error.code,
      meta: error.meta
    }, { status: 500 });
  }
}
