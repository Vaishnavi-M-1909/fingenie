import "dotenv/config";
import { sendMonthlyReminder } from "./src/lib/email";

async function test() {
  const testEmail = "[EMAIL_ADDRESS]";
  console.log(`Triggering test email to: ${testEmail}`);
  
  const result = await sendMonthlyReminder(testEmail, "Test User");
  
  if (result.success) {
    console.log("Email sent successfully!", result.data);
  } else {
    console.error("Failed to send email:", result.error);
  }
}

test().catch(console.error);
