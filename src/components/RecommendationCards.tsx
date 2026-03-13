"use client";

import { useState } from "react";
import { Play, BookOpen, FileText, ExternalLink, X, Eye } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  author: string | null;
  description: string;
  thumbnailUrl: string | null;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : null;
}

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center", // CENTERED
        justifyContent: "center", // CENTERED
        zIndex: 9999,
        padding: "20px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          height: "auto",
          maxHeight: "90vh",
          borderRadius: "var(--radius-lg, 16px)",
          overflow: "hidden",
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
          animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(0,0,0,0.7)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            color: "#fff",
          }}
        >
          <X size={20} />
        </button>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RecommendationCards({ recommendations }: { recommendations: Resource[] }) {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const trackInteraction = async (resourceId: string, type: string) => {
    try {
      await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, type }),
      });
    } catch {
      // Silent fail for tracking
    }
  };

  const handleClick = (resource: Resource) => {
    trackInteraction(resource.id, "CLICK");

    if (resource.type === "VIDEO" && extractYouTubeId(resource.url)) {
      setPlayingUrl(resource.url);
      trackInteraction(resource.id, "VIEW");
    } else {
      window.open(resource.url, "_blank", "noopener");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "VIDEO": return <Play size={16} />;
      case "ARTICLE": return <FileText size={16} />;
      case "BOOK": return <BookOpen size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VIDEO": return "#FF3B00";
      case "ARTICLE": return "#00E57A";
      case "BOOK": return "#FFC700";
      default: return "var(--brand-primary)";
    }
  };

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <>
      {playingUrl && (
        <VideoModal url={playingUrl} onClose={() => setPlayingUrl(null)} />
      )}

      <div 
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px",
          marginBottom: "12px",
          overflowX: "auto",
          paddingBottom: "12px",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {recommendations.map((r) => {
          const isVideo = r.type === "VIDEO";
          const videoId = isVideo ? extractYouTubeId(r.url) : null;
          const cardWidth = isVideo ? "280px" : "220px"; // Narrower article cards

          return (
            <button
              key={r.id}
              onClick={() => handleClick(r)}
              style={{
                flex: `0 0 ${cardWidth}`,
                display: "flex",
                flexDirection: "column",
                background: isVideo ? "var(--bg-secondary)" : "var(--bg-primary)", // Subtle difference
                border: isVideo ? "1px solid var(--border-light)" : "2px solid var(--border-light)", // Thicker for articles?
                borderRadius: "var(--radius-md, 12px)",
                overflow: "hidden",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                scrollSnapAlign: "start",
                boxShadow: isVideo ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = getTypeColor(r.type);
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${getTypeColor(r.type)}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-light)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
              }}
            >
              {/* Thumbnail */}
              {isVideo && videoId && (
                <div style={{ position: "relative", paddingBottom: "56.25%", background: "#111" }}>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={r.title}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.3)",
                  }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(255,59,0,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Play size={20} color="#fff" fill="#fff" />
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: getTypeColor(r.type),
                    background: `${getTypeColor(r.type)}15`,
                    borderRadius: "4px",
                  }}>
                    {getIcon(r.type)} {r.type}
                  </span>
                  {!isVideo && (
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-body)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                      • 5 Min Read
                    </span>
                  )}
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: isVideo ? "0.88rem" : "0.95rem", // Slightly larger for articles
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: isVideo ? 2 : 3, // More lines for articles
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}>
                  {r.title}
                </div>

                {/* Author */}
                {r.author && (
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--text-tertiary)",
                  }}>
                    by {r.author}
                  </div>
                )}

                {/* Action hint */}
                <div style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: getTypeColor(r.type),
                }}>
                  {isVideo ? <><Eye size={12} /> Watch Now</> : <><ExternalLink size={12} /> Read</>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
