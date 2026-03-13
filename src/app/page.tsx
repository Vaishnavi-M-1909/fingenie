"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Shield,
  Upload,
  TrendingUp,
} from "lucide-react";
import Logo from "@/components/Logo";

const features = [
  {
    icon: Upload,
    title: "Data Ingestion",
    description: "Drag & drop PDF bank statements or photo receipts. Immediate parsing and vectorization.",
    color: "var(--brand-primary)",
    bg: "var(--bg-secondary)",
  },
  {
    icon: BarChart3,
    title: "Visual Telemetry",
    description: "Precise category breakdowns, temporal spending matrices, and top merchant mapping.",
    color: "var(--text-primary)",
    bg: "var(--bg-secondary)",
  },
  {
    icon: Brain,
    title: "AI Cognition",
    description: "Interface directly with FinGenie intelligence. Obtain diagnostic strategies bounded to your data.",
    color: "var(--accent-coral)",
    bg: "var(--bg-secondary)",
  },
  {
    icon: Shield,
    title: "Zero-Trust Privacy",
    description: "Absolute data sovereignty. Raw telemetry never touches the AI layer—only obfuscated statistical signatures.",
    color: "var(--text-tertiary)",
    bg: "var(--bg-secondary)",
  },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "var(--bg-primary)" }}>
      {/* Editorial Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border-heavy) 1px, transparent 1px), linear-gradient(90deg, var(--border-heavy) 1px, transparent 1px)",
          backgroundSize: "128px 128px",
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: "none"
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
          padding: "20px clamp(24px, 5vw, 64px)",
          borderBottom: "1px solid var(--border-light)",
          background: "var(--bg-primary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Logo size="md" />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "var(--text-primary)",
            }}
          >
            FinGenie
          </span>
        </div>
        <Link href="/login" className="btn btn-primary" style={{ padding: "10px 20px" }}>
          Get Started <ArrowRight size={16} />
        </Link>
      </nav>

      <main className="container-editorial animate-reveal" style={{ padding: 0, maxWidth: "none" }}>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "clamp(60px, 10vw, 120px) clamp(24px, 5vw, 64px)",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "var(--brand-dim)",
              border: "1px solid var(--brand-primary)",
              borderRadius: "100px",
              marginBottom: "32px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--brand-primary)",
              fontFamily: "var(--font-body)",
            }}
          >
            <TrendingUp size={16} />
            FinGenie Intelligence Active
          </div>

          <h1
            className="animate-fade-in-up delay-100 display-large"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.05,
              maxWidth: "1100px",
              marginBottom: "32px",
              color: "var(--text-primary)"
            }}
          >
            Your capital, <span style={{ color: "var(--brand-primary)" }}>decoded.</span>
          </h1>

          <p
            className="animate-fade-in-up delay-200"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              maxWidth: "800px",
              lineHeight: 1.6,
              marginBottom: "48px",
            }}
          >
            Upload arbitrary financial payloads. FinGenie executes absolute semantic parsing and injects the telemetry into a rigorous cognitive matrix. No generic dashboards. Pure signal.
          </p>

          <div
            className="animate-fade-in-up delay-300"
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}
          >
            <Link
              href="/login"
              className="btn btn-primary"
              style={{ padding: "14px 28px", fontSize: "1.1rem" }}
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <a
              href="#architecture"
              className="btn btn-secondary"
              style={{ padding: "14px 28px", fontSize: "1.1rem", border: "1px solid var(--border-light)" }}
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Architecture Grid */}
        <section
          id="architecture"
          style={{
            position: "relative",
            zIndex: 10,
            padding: "clamp(60px, 8vw, 120px) clamp(24px, 5vw, 64px)",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
            <h2 className="display-large" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
              System Capabilities
            </h2>
            <p style={{ maxWidth: "500px", color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              The FinGenie engine operates on a multi-stage ingestion protocol, providing absolute clarity on your capital velocity.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "24px",
            }}
          >
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`editorial-card animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{ padding: "32px", background: feature.bg, display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: feature.color,
                    color: "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    boxShadow: "var(--shadow-hover)"
                  }}
                >
                  <feature.icon size={28} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    marginBottom: "12px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    flex: 1
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            position: "relative",
            zIndex: 10,
            padding: "clamp(60px, 10vw, 120px) clamp(24px, 5vw, 64px)",
            textAlign: "center",
            background: "var(--text-primary)",
            color: "var(--bg-primary)"
          }}
        >
          <h2 className="display-large" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--bg-primary)", marginBottom: "32px" }}>
            Ready to take control?
          </h2>
          <Link
            href="/login"
            className="btn btn-primary"
            style={{ background: "var(--brand-primary)", borderColor: "var(--brand-primary)", color: "var(--bg-primary)", padding: "16px 36px", fontSize: "1.25rem", boxShadow: "0 8px 30px rgba(23, 0, 255, 0.4)" }}
          >
            Start for free <ArrowRight size={20} />
          </Link>
        </section>

        {/* Footer */}
        <footer
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            padding: "32px clamp(24px, 5vw, 64px)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Logo size="sm" />
            <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>FinGenie</span>
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} / All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
