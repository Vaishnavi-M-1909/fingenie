import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMonthlyReminder(email: string, name: string | null) {
  try {
    const { data, error } = await resend.emails.send({
      from: "FinGenie <onboarding@resend.dev>",
      to: [email],
      subject: " Monthly Statement Reminder",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; background: #fff;">
          <h1 style="font-size: 24px; font-weight: 800; text-transform: uppercase;">Time for Audit.</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Hello ${name || "User"}, it's the first of the month! Ready to reconcile your financial vectors?
          </p>
          <div style="margin: 30px 0; padding: 20px; background: #f0f0f0;">
            <p style="margin: 0; font-weight: 700; font-size: 14px; text-transform: uppercase; color: #666;">Action Required</p>
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: 800;">Upload your bank statements for the previous month to maintain diagnostic accuracy.</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/upload" 
             style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; font-weight: 800; text-transform: uppercase;">
            INITIALIZE UPLOAD &rarr;
          </a>
          <p style="margin-top: 40px; font-size: 12px; color: #999;">
            This is an automated system notification from FinGenie. You can disable these reminders in your settings.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[EMAIL_SEND_ERROR]", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("[EMAIL_UTILITY_CRASH]", err);
    return { success: false, error: err };
  }
}
