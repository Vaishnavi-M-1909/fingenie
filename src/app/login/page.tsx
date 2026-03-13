"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "var(--bg-primary)",
        padding: "20px",
      }}
    >
      <div
        className="editorial-card animate-scale-in"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "clamp(32px, 5vw, 48px)",
          maxWidth: "440px",
          width: "100%",
          textAlign: "center",
          borderTop: "4px solid var(--brand-primary)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <Logo size="lg" />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            FinGenie
          </span>
        </div>

        <h1 className="display-large" style={{ fontSize: "2rem", marginBottom: "12px", lineHeight: 1.1 }}>
          Welcome back
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
            fontSize: "1rem",
            fontWeight: 500,
            marginBottom: "40px",
            lineHeight: 1.5,
          }}
        >
          Sign in to access your financial telemetry and personalized insights.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: "14px 24px",
            fontSize: "1.05rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
          {!loading && <ArrowRight size={20} />}
        </button>

        <p
          style={{
            marginTop: "32px",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--text-tertiary)",
            lineHeight: 1.6,
          }}
        >
          By proceeding, you agree to let us process your uploaded bank
          statements for analysis. We never store raw credentials.
        </p>
      </div>
    </div>
  );
}
