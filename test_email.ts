import { PrismaClient } from "./prisma/generated-client";
import { sendMonthlyReminder } from "./src/lib/email";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const prisma = new PrismaClient();

async function test() {
  console.log("🔍 Checking database for users with reminders enabled...");
  
  const users = await prisma.user.findMany({
    where: { monthlyReminder: true },
    select: { email: true, name: true, monthlyReminder: true }
  });

  if (users.length === 0) {
    console.log(" No users found with monthly reminders ENABLED.");
    console.log("   Please enable it in Settings > Notifications in the app first.");
  } else {
    console.log(` Found ${users.length} user(s) with reminders enabled:`);
    users.forEach(u => console.log(`   - ${u.email} (${u.name || "No name"})`));
    
    const targetUser = users[0];
    console.log(`\nAttempting to send test email to: ${targetUser.email}...`);
    
    // NOTE: This will only work for gearai1234@gmail.com on the unverified Resend account
    const result = await sendMonthlyReminder(targetUser.email, targetUser.name);
    
    if (result.success) {
      console.log(" Email sent successfully!");
      console.log("   Result:", JSON.stringify(result.data, null, 2));
    } else {
      console.log(" Failed to send email.");
      console.error("   Error:", JSON.stringify(result.error, null, 2));
    }
  }
}

test()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
