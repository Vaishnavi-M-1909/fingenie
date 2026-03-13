interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;
}

interface InsightResponse {
  summary: string[];
  actions: string[];
  resources: { title: string; url: string }[];
}

const SYSTEM_PROMPT = `You are a friendly financial coach for young adults (age 18-24) in India. Keep your tone casual, concise, and actionable. You help them understand their spending and make smarter financial decisions.

IMPORTANT: Always respond with valid JSON matching this exact schema:
{
  "summary": ["point 1", "point 2", "point 3"],
  "actions": ["action 1", "action 2", "action 3"],
  "resources": [{"title": "Resource Title", "url": "https://..."}]
}

Do NOT include any text outside the JSON object.`;

export async function generateInsights(analyticsSummary: string): Promise<InsightResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const messages: OpenRouterMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: analyticsSummary },
  ];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000",
      "X-Title": "FinGenie",
    },
    body: JSON.stringify({
      model: "arcee-ai/trinity-large-preview:free",
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from OpenRouter");
  }

  // Try to parse JSON from the response
  try {
    // Extract JSON if wrapped in markdown code blocks
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
    const parsed = JSON.parse(jsonMatch[1].trim());

    return {
      summary: Array.isArray(parsed.summary) ? parsed.summary : [String(parsed.summary)],
      actions: Array.isArray(parsed.actions) ? parsed.actions : [String(parsed.actions)],
      resources: Array.isArray(parsed.resources)
        ? parsed.resources.map((r: { title?: string; url?: string }) => ({
            title: r.title || "Financial Resource",
            url: r.url || "https://www.investopedia.com",
          }))
        : [],
    };
  } catch {
    // Fallback: create a basic response from the text
    return {
      summary: [content.substring(0, 200)],
      actions: ["Review your spending categories", "Set a monthly budget", "Track daily expenses"],
      resources: [
        { title: "Budgeting Basics", url: "https://www.investopedia.com/budgeting-4689726" },
        { title: "Money Management for Young Adults", url: "https://www.nerdwallet.com/article/finance/money-management" },
      ],
    };
  }
}

export function buildAnalyticsSummary(data: {
  month: string;
  totalSpent: number;
  categoryTotals: Record<string, number>;
  topMerchants: { merchant: string; total: number }[];
  recurringCount: number;
  recurringTotal: number;
}): string {
  const categoryBreakdown = Object.entries(data.categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([cat, amount]) => {
      const pct = ((amount / data.totalSpent) * 100).toFixed(1);
      return `${cat}: ₹${amount.toLocaleString("en-IN")} (${pct}%)`;
    })
    .join(", ");

  const topMerchantsStr = data.topMerchants
    .slice(0, 5)
    .map((m) => `${m.merchant}: ₹${m.total.toLocaleString("en-IN")}`)
    .join(", ");

  return `Month: ${data.month}
Total Spent: ₹${Math.abs(data.totalSpent).toLocaleString("en-IN")}
Category Breakdown: ${categoryBreakdown}
Top Merchants: ${topMerchantsStr}
Recurring Subscriptions: ${data.recurringCount} (total: ₹${data.recurringTotal.toLocaleString("en-IN")}/month)
Ask: produce (1) 3-point plain English summary of spending, (2) 3 concrete actions to reduce spending, (3) 2-3 learning resources with title + url targeted at this user's top spending categories.
Provide output as JSON with keys: summary, actions[], resources[{title, url}].`;
}
export async function generateChatResponse(messages: OpenRouterMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000",
      "X-Title": "FinGenie",
    },
    body: JSON.stringify({
      model: "arcee-ai/trinity-large-preview:free",
      messages,
      max_tokens: 1024, // Increased for vision responses
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from OpenRouter");
  }

  return content;
}
