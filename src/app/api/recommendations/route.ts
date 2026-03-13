import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

// GET: Fetch recommendations by category or tags
export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const type = searchParams.get("type"); // VIDEO | ARTICLE | BOOK
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 25);

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (type) where.type = type;
    if (tag) where.tags = { has: tag };

    const resources = await prisma.learningResource.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        interactions: {
          where: { userId: user.id },
          select: { type: true, interactedAt: true },
          orderBy: { interactedAt: "desc" },
          take: 1,
        },
      },
    });

    // Enrich with user's interaction status
    const enriched = resources.map((r) => ({
      ...r,
      userStatus: r.interactions.length > 0 ? r.interactions[0].type : null,
      interactions: undefined, // Remove raw interactions from response
    }));

    return NextResponse.json({ resources: enriched });
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Track user interaction (CLICK, VIEW, COMPLETE)
export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resourceId, type } = await request.json();

    if (!resourceId || !type) {
      return NextResponse.json({ error: "resourceId and type are required" }, { status: 400 });
    }

    if (!["CLICK", "VIEW", "COMPLETE"].includes(type)) {
      return NextResponse.json({ error: "type must be CLICK, VIEW, or COMPLETE" }, { status: 400 });
    }

    // Verify resource exists
    const resource = await prisma.learningResource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const interaction = await prisma.resourceInteraction.create({
      data: {
        userId: user.id,
        resourceId,
        type,
      },
    });

    return NextResponse.json({ interaction }, { status: 201 });
  } catch (error) {
    console.error("Interaction tracking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
