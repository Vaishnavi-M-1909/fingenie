import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "FinGenie — Smart Financial Insights for Young Adults",
  description:
    "Upload your bank statements, get AI-powered spending analysis, and learn healthier financial habits. Built for ages 18-24.",
  keywords: ["finance", "budgeting", "AI", "bank statement", "spending analysis"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
