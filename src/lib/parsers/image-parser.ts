import { parseCSV } from "./csv-parser";

export async function parseImage(base64Image: string, mimeType: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set. Contact administrator.");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000",
      "X-Title": "FinGenie",
    },
    body: JSON.stringify({
      model: "qwen/qwen2.5-vl-72b-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a financial document parser. Analyze this image carefully. It could be either a BANK STATEMENT or a RECEIPT/BILL.

STEP 1: Determine if this is a BANK STATEMENT or a RECEIPT.
- Bank statements have: account number, multiple transaction rows with dates, debit/credit columns, running balance, bank header/logo.
- Receipts have: single merchant, itemized list of purchases, total amount.

STEP 2: Extract data based on the document type.

OUTPUT FORMAT: Respond with ONLY a valid CSV. No other text.

=== IF BANK STATEMENT ===
First line must be a METADATA comment line starting with #:
#BANK_STATEMENT|AccountHolder=<name>|AccountNumber=<number>|IFSC=<code>|BankName=<bank>

Then the CSV header and data rows:
Date,Merchant,Amount,Category,Description

Rules for bank statement extraction:
- Date: MUST be in YYYY-MM-DD format.
- For each transaction row, create one CSV line.
- Merchant: Extract the counterparty name from the remarks/narration.
  * For UPI like "UPI/519586/DR/ASHUTO/PUNB/964889/Paid v" → Merchant = "ASHUTO"
  * For NEFT/IMPS like "NEFT/CR/RAHUL/BKID/rahulraj/UPI" → Merchant = "RAHUL"
  * For SOL/internal transfers → Merchant = "Bank Transfer"
- Amount: MUST be negative for debits (outflow), positive for credits (inflow).
- Category: Assign ONE of: Transfer, Cash Withdrawal, Groceries, Food & Dining, Shopping, Transport, Subscriptions, Utilities, Healthcare, Entertainment, Education, Personal Care, Travel, Other.
  * UPI/NEFT/IMPS payments to people → "Transfer"
  * ATM withdrawals → "Cash Withdrawal"
- Description: Include the full narration/remarks text from the statement AND the transaction type (UPI/NEFT/IMPS/RTGS/etc).

=== IF RECEIPT/BILL ===
Output CSV with header:
Date,Merchant,Amount,Category,Description

Rules:
- Date: MUST be in YYYY-MM-DD format. Assume current year if missing.
- Merchant: Extract the store or service name.
- Amount: MUST be negative for expenditures.
- Category: Assign ONE of: Groceries, Food & Dining, Shopping, Transport, Subscriptions, Utilities, Healthcare, Entertainment, Education, Personal Care, Travel, Other.
- Description: Brief detail (e.g., "Grocery items", "Monthly Internet"). DO NOT just repeat Merchant name.

=== IF NOT A FINANCIAL DOCUMENT ===
Output just the header: Date,Merchant,Amount,Category,Description`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 4096,
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

  // Extract bank statement metadata from the #BANK_STATEMENT comment line
  let bankMeta: Record<string, string> | null = null;
  const lines = csvContent.split("\n");
  const metaLine = lines.find((l: string) => l.startsWith("#BANK_STATEMENT"));
  if (metaLine) {
    bankMeta = {};
    const parts = metaLine.split("|").slice(1); // skip the #BANK_STATEMENT part
    for (const part of parts) {
      const [key, ...valueParts] = part.split("=");
      if (key && valueParts.length > 0) {
        bankMeta[key.trim()] = valueParts.join("=").trim();
      }
    }
    // Remove the meta line from CSV content
    csvContent = lines.filter((l: string) => !l.startsWith("#")).join("\n");
  }
  
  // If it's an empty output or doesn't have the header, provide a basic structure
  if (!csvContent || csvContent.length < 15) {
      csvContent = "Date,Merchant,Amount,Category,Description";
  }

  const result = parseCSV(csvContent);

  // Attach bank metadata if found
  if (bankMeta) {
    result.metadata.bankAccountMeta = {
      accountHolderName: bankMeta["AccountHolder"] || undefined,
      accountNumber: bankMeta["AccountNumber"] || undefined,
      ifscCode: bankMeta["IFSC"] || undefined,
      bankName: bankMeta["BankName"] || undefined,
    };
    result.metadata.bankName = bankMeta["BankName"];
  }

  return result;
}
