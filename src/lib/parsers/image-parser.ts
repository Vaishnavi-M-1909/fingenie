import { parseCSV } from "./csv-parser";

export async function parseImage(base64Image: string, mimeType: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set. Contact administrator.");

  // We use google/gemini-2.5-flash as a fast reliable vision model via OpenRouter
  // Or meta-llama/llama-3.2-11b-vision-instruct:free
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000",
      "X-Title": "FinGenie",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash", // High quality vision model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all visible line-item transaction details from this receipt or statement image. Respond with a valid CSV format containing exactly the following columns, and no other text: Date, Merchant, Amount, Category, Description. Date should be YYYY-MM-DD. Category should be a short 1-word generic category (like Food, Travel, Utilities, Software). If the file is clearly not a receipt or statement, output an empty CSV."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ]
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter Vision API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  
  // Clean up content to just be CSV (remove markdown fences if present)
  let csvContent = content.trim();
  if (csvContent.startsWith("```")) {
    csvContent = csvContent.replace(/```(?:csv)?/i, "");
    csvContent = csvContent.replace(/```$/, "");
    csvContent = csvContent.trim();
  }
  
  // If it's an empty output or doesn't have the header, provide a basic structure
  if (!csvContent || csvContent.length < 15) {
      csvContent = "Date,Merchant,Amount,Category,Description";
  }

  return parseCSV(csvContent);
}
