import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const resources = [
  // ===== VIDEOS: TAX =====
  {
    id: "tax-saving-2025-ranade",
    title: "Tax Saving Tips in 2025 | Clubbing of Income Explained",
    description: "CA Rachana Ranade explains sophisticated tax planning strategies for 2025, including the concept of clubbing of income to optimize family tax burden.",
    type: "VIDEO",
    category: "Tax",
    url: "https://www.youtube.com/watch?v=jEQdXUXX0hs",
    thumbnailUrl: "https://img.youtube.com/vi/jEQdXUXX0hs/hqdefault.jpg",
    author: "CA Rachana Ranade",
    tags: ["tax", "tax-saving", "income-tax", "tax-planning"],
  },
  {
    id: "health-insurance-2026-ranade",
    title: "Ultimate Guide for Health Insurance 2026 | 3-2-1 Cheat Code",
    description: "CA Rachana Ranade's updated 2026 guide to choosing the perfect health insurance using the simple 3-2-1 cheat code. Essential for every young professional.",
    type: "VIDEO",
    category: "Insurance",
    url: "https://www.youtube.com/watch?v=PbN07yF7OoE",
    thumbnailUrl: "https://img.youtube.com/vi/PbN07yF7OoE/hqdefault.jpg",
    author: "CA Rachana Ranade",
    tags: ["insurance", "health-insurance", "financial-planning"],
  },

  // ===== VIDEOS: INVESTING =====
  {
    id: "best-mutual-funds-2026-kamra",
    title: "Best Mutual Funds For 2026 | Masterclass",
    description: "Pranjal Kamra reveals the top-performing mutual funds to watch for 2026. A complete masterclass on portfolio building and long-term wealth creation.",
    type: "VIDEO",
    category: "Investing",
    url: "https://www.youtube.com/watch?v=2S71p90g18g",
    thumbnailUrl: "https://img.youtube.com/vi/2S71p90g18g/hqdefault.jpg",
    author: "Pranjal Kamra",
    tags: ["investing", "mutual-funds", "SIP", "2026"],
  },
  {
    id: "mutual-funds-explained-kamra",
    title: "Mutual Funds Explained Simply | SIP, SWP, Lumpsum",
    description: "The definitive guide to understanding everything about mutual funds, active vs passive investing, and how to start your SIP journey today.",
    type: "VIDEO",
    category: "Investing",
    url: "https://www.youtube.com/watch?v=5wIGQLYqPKg",
    thumbnailUrl: "https://img.youtube.com/vi/5wIGQLYqPKg/hqdefault.jpg",
    author: "Pranjal Kamra",
    tags: ["investing", "mutual-funds", "SIP", "beginners"],
  },
  {
    id: "stock-market-beginners-kamra",
    title: "Stock Market For Beginners | Step-by-Step Guide",
    description: "Learn how to start investing in the Indian share market from scratch. Covers everything from Demat accounts to picking your first stock.",
    type: "VIDEO",
    category: "Investing",
    url: "https://www.youtube.com/watch?v=3UF0ymVdYLA",
    thumbnailUrl: "https://img.youtube.com/vi/3UF0ymVdYLA/hqdefault.jpg",
    author: "Pranjal Kamra",
    tags: ["investing", "stocks", "stock-market", "beginners"],
  },

  // ===== VIDEOS: BUDGETING & SPENDING =====
  {
    id: "budgeting-rule-2025-warikoo",
    title: "New 65-20-15 RULE for Your BUDGET | Money Rules 2025",
    description: "Ankur Warikoo introduces the updated budgeting rule for 2025. Learn how to allocate your income for a balanced and wealthy life.",
    type: "VIDEO",
    category: "Budgeting",
    url: "https://www.youtube.com/watch?v=0CaA5K5EsN8",
    thumbnailUrl: "https://img.youtube.com/vi/0CaA5K5EsN8/hqdefault.jpg",
    author: "Ankur Warikoo",
    tags: ["budgeting", "money-rules", "2025", "saving"],
  },
  {
    id: "emergency-fund-guide-warikoo",
    title: "How to Build an Emergency Fund? | The 10% Simple Rule",
    description: "Ankur Warikoo explains the best ways to park your emergency funds and short-term savings for maximum security and decent returns.",
    type: "VIDEO",
    category: "Savings",
    url: "https://www.youtube.com/watch?v=g-hir-4WzfU",
    thumbnailUrl: "https://img.youtube.com/vi/g-hir-4WzfU/hqdefault.jpg",
    author: "Ankur Warikoo",
    tags: ["savings", "emergency-fund", "short-term"],
  },
  {
    id: "epf-act-explained-lla",
    title: "Employee Provident Fund (EPF) Act Explained",
    description: "Labour Law Advisor breaks down the EPF Act: how your retirement corpus is built and why it's the safest investment for salaried Indians.",
    type: "VIDEO",
    category: "Savings",
    url: "https://www.youtube.com/watch?v=y9kyV2N5cfY",
    thumbnailUrl: "https://img.youtube.com/vi/y9kyV2N5cfY/hqdefault.jpg",
    author: "Labour Law Advisor",
    tags: ["savings", "EPF", "retirement", "PF"],
  },

  // ===== ARTICLES =====
  {
    id: "income-tax-slabs-2025-cleartax",
    title: "Income Tax Slabs & Rates for FY 2025-26",
    description: "ClearTax's comprehensive breakdown of income tax slabs for both old and new tax regimes. Includes examples, deductions available, and calculator.",
    type: "ARTICLE",
    category: "Tax",
    url: "https://cleartax.in/s/income-tax-slabs",
    author: "ClearTax",
    tags: ["tax", "tax-slabs", "income-tax", "deductions"],
  },
  {
    id: "mutual-funds-guide-cleartax",
    title: "Beginner's Guide to Mutual Funds in India",
    description: "ClearTax's detailed guide covering mutual fund basics, types (equity, debt, hybrid), NAV, and taxation in India.",
    type: "ARTICLE",
    category: "Investing",
    url: "https://cleartax.in/s/mutual-funds",
    author: "ClearTax",
    tags: ["investing", "mutual-funds", "beginners", "SIP"],
  },

  {
    id: "money-rules-20s-warikoo",
    title: "5 Money Rules for Your 20s | Financial Freedom Guide",
    description: "Ankur Warikoo breaks down the 5 essential money rules every young adult should follow to achieve financial independence early in life.",
    type: "VIDEO",
    category: "Finance",
    url: "https://www.youtube.com/watch?v=XH_4rj-j0sU",
    thumbnailUrl: "https://img.youtube.com/vi/XH_4rj-j0sU/hqdefault.jpg",
    author: "Ankur Warikoo",
    tags: ["finance", "financial-freedom", "beginners", "money-management"],
  },
  {
    id: "build-credit-score-warikoo",
    title: "How to Build a Credit Score from Zero | Step-by-Step",
    description: "Ankur Warikoo explains the importance of credit scores in India and how beginners can build a strong credit profile responsibly.",
    type: "VIDEO",
    category: "Finance",
    url: "https://www.youtube.com/watch?v=YSihe9BEV5Q",
    thumbnailUrl: "https://img.youtube.com/vi/YSihe9BEV5Q/hqdefault.jpg",
    author: "Ankur Warikoo",
    tags: ["credit-score", "CIBIL", "finance", "loans"],
  },
  {
    id: "old-vs-new-tax-cleartax",
    title: "Old vs New Tax Regime: Which is Better for You?",
    description: "A detailed comparison of the two income tax regimes for FY 2025-26. Learn which one saves you more money based on your income level.",
    type: "ARTICLE",
    category: "Tax",
    url: "https://cleartax.in/s/old-tax-regime-vs-new-tax-regime",
    author: "ClearTax",
    tags: ["tax", "income-tax", "tax-planning", "2025"],
  },
  {
    id: "section-80c-guide-cleartax",
    title: "Section 80C Deductions: How to Save ₹1.5 Lakh",
    description: "The ultimate guide to Section 80C of the Income Tax Act. Covers ELSS, PPF, LIC, and other tax-saving investment options.",
    type: "ARTICLE",
    category: "Tax",
    url: "https://cleartax.in/s/80c-deductions",
    author: "ClearTax",
    tags: ["tax", "80c", "tax-saving", "investing"],
  },
  {
    id: "stock-market-masterclass-ranade",
    title: "Stock Market Masterclass Part 1 | Basics for Beginners",
    description: "CA Rachana Ranade's simple explanation of how the stock market works, why companies list on the stock exchange, and how you can participate.",
    type: "VIDEO",
    category: "Investing",
    url: "https://www.youtube.com/watch?v=Xn7KWR9EOGQ",
    thumbnailUrl: "https://img.youtube.com/vi/Xn7KWR9EOGQ/hqdefault.jpg",
    author: "CA Rachana Ranade",
    tags: ["investing", "stocks", "stock-market", "beginners"],
  },
  {
    id: "emergency-fund-101-cleartax",
    title: "Emergency Fund 101: Why You Need It and How to Build It",
    description: "Learn why everyone needs a safety net and the exact steps to build a 6-month emergency fund without feeling the pinch.",
    type: "ARTICLE",
    category: "Savings",
    url: "https://cleartax.in/s/emergency-fund",
    author: "ClearTax",
    tags: ["savings", "emergency-fund", "financial-stability"],
  },
  {
    id: "rich-dad-poor-dad-kiyosaki",
    title: "Rich Dad Poor Dad – Robert Kiyosaki",
    description: "The #1 personal finance book of all time. Teaches the difference between assets and liabilities and how to make money work for you.",
    type: "BOOK",
    category: "Finance",
    url: "https://www.amazon.in/dp/1612681131",
    author: "Robert Kiyosaki",
    tags: ["finance", "mindset", "assets", "book"],
  },
  {
    id: "richest-man-babylon-clason",
    title: "The Richest Man in Babylon – George S. Clason",
    description: "Timeless financial advice through ancient parables. Teaches the golden rules of saving, investing, and wealth protection.",
    type: "BOOK",
    category: "Finance",
    url: "https://www.amazon.in/dp/9388144317",
    author: "George S. Clason",
    tags: ["finance", "wealth", "saving", "book"],
  },
];

async function seed() {
  console.log("Cleaning up existing resources...");
  await prisma.learningResource.deleteMany({});

  console.log("Seeding verified learning resources...");

  for (const resource of resources) {
    await prisma.learningResource.create({ data: resource });
    console.log(`  ✓ ${resource.type}: ${resource.title}`);
  }

  const count = await prisma.learningResource.count();
  console.log(`\nDone! ${count} resources in database.`);
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
