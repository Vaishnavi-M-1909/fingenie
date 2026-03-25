import "dotenv/config";

interface YouTubeSearchResult {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: { url: string };
    };
    channelTitle: string;
  };
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  author: string;
  type: "VIDEO";
}

export async function searchYouTubeVideos(query: string, limit: number = 5): Promise<VideoResource[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn("YOUTUBE_API_KEY is not set in environment variables.");
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${encodeURIComponent(
        query
      )}&type=video&key=${apiKey}`
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("YouTube API Error:", error);
      return [];
    }

    const data = await response.json();
    const items: YouTubeSearchResult[] = data.items || [];

    return items.map((item) => ({
      id: `yt-${item.id.videoId}`,
      title: item.snippet.title,
      description: item.snippet.description,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      author: item.snippet.channelTitle,
      type: "VIDEO",
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export async function getOrSyncYouTubeResources(prisma: any, query: string, category: string, limit: number = 4) {
  // 1. Fetch from YouTube
  const videos = await searchYouTubeVideos(`${query} ${category} finance india`, limit);
  
  if (videos.length === 0) return [];

  // 2. Upsert into database
  const resources = await Promise.all(
    videos.map((v) =>
      prisma.learningResource.upsert({
        where: { id: v.id },
        update: {
          title: v.title,
          description: v.description,
          thumbnailUrl: v.thumbnailUrl,
          author: v.author,
          category: category,
        },
        create: {
          id: v.id,
          title: v.title,
          description: v.description,
          url: v.url,
          thumbnailUrl: v.thumbnailUrl,
          author: v.author,
          type: "VIDEO",
          category: category,
        },
      })
    )
  );

  //  Optional: Cleanup old resources that have NO interactions to prevent DB bloat
  // We'll keep it simple: if we have more than 500 YouTube resources, delete the oldest 50 with no interactions.
  try {
    const ytCount = await prisma.learningResource.count({
      where: { id: { startsWith: "yt-" } },
    });

    if (ytCount > 500) {
      const oldUnused = await prisma.learningResource.findMany({
        where: {
          id: { startsWith: "yt-" },
          interactions: { none: {} },
        },
        orderBy: { createdAt: "asc" },
        take: 50,
        select: { id: true },
      });

      if (oldUnused.length > 0) {
        await prisma.learningResource.deleteMany({
          where: { id: { in: oldUnused.map((r: any) => r.id) } },
        });
      }
    }
  } catch (err) {
    console.error("Cleanup error:", err);
  }

  return resources;
}
