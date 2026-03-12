"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Shield,
  Upload,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Statements",
    description: "Drag & drop your PDF or CSV bank statements. We support all major Indian banks.",
    color: "var(--mint-primary)",
    bg: "var(--mint-dim)",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Interactive charts showing category breakdowns, spending timelines, and top merchants.",
    color: "var(--blue)",
    bg: "var(--blue-dim)",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Get personalized financial advice and curated learning resources powered by AI.",
    color: "var(--purple)",
    bg: "var(--purple-dim)",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. We never send raw transactions to AI — only aggregated summaries.",
    color: "var(--amber)",
    bg: "var(--amber-dim)",
  },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Gradient orbs */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--mint-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--purple-dim) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 48px",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
          background: "rgba(10, 12, 16, 0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--mint-primary), var(--emerald))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={20} color="var(--bg-primary)" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            FinGenie
          </span>
        </div>
        <Link href="/login" className="btn btn-primary">
          Get Started <ArrowRight size={16} />
        </Link>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          className="animate-fade-in-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "100px",
            background: "var(--mint-dim)",
            border: "1px solid var(--mint-primary)",
            marginBottom: "32px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--mint-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          <TrendingUp size={14} />
          Built for ages 18–24
        </div>

        <h1
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "24px",
          }}
        >
          Your money,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--mint-primary), var(--emerald))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            explained.
          </span>
        </h1>

        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}
        >
          Upload your bank statements. Get instant spending breakdowns,
          AI-powered financial insights, and personalized learning resources —
          all in one place.
        </p>

        <div
          className="animate-fade-in-up delay-300"
          style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/login" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16px" }}>
            Start for Free <ArrowRight size={18} />
          </Link>
          <a href="#features" className="btn btn-secondary" style={{ padding: "16px 32px", fontSize: "16px" }}>
            See How It Works
          </a>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "80px 24px 120px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h2
          className="animate-fade-in-up"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "64px",
            letterSpacing: "-1px",
          }}
        >
          Everything you need to{" "}
          <span style={{ color: "var(--mint-primary)" }}>master your finances</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`glass-card animate-fade-in-up delay-${(i + 1) * 100}`}
              style={{ padding: "32px 28px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: feature.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <feature.icon size={24} color={feature.color} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "32px 24px",
          borderTop: "1px solid var(--border)",
          color: "var(--text-dim)",
          fontSize: "13px",
          fontFamily: "var(--font-display)",
        }}
      >
        FinGenie · Built with care for young adults managing their money
      </footer>
    </div>
  );
}
