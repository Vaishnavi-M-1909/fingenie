import { searchYouTubeVideos, getOrSyncYouTubeResources } from "../src/lib/youtube";
import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

async function test() {
  console.log("--- Testing YouTube Search ---");
  const videos = await searchYouTubeVideos("tax saving tips india", 2);
  console.log("Search Results:", JSON.stringify(videos, null, 2));

  if (videos.length === 0) {
    console.error("No videos found. Check your YOUTUBE_API_KEY.");
    process.exit(1);
  }

  console.log("\n--- Testing Sync with DB ---");
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const resources = await getOrSyncYouTubeResources(prisma, "investing", "Investing", 2);
    console.log("Synced Resources:", JSON.stringify(resources, null, 2));
    
    if (resources.length > 0) {
      console.log("\n✅ Success! YouTube integration is working.");
    } else {
      console.log("\n❌ Failed to sync resources.");
    }
  } catch (err) {
    console.error("Sync Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
