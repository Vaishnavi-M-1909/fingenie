"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Upload,
  Receipt,
  Lightbulb,
  Settings,
  LogOut,
  Menu,
  X,
  Database,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/assistant", label: "Intelligence", icon: Lightbulb },
  { href: "/upload", label: "Registry", icon: Upload },
  { href: "/transactions", label: "Ledger", icon: Receipt },
  { href: "/vault", label: "Vault", icon: Database },
  { href: "/settings/privacy", label: "Config", icon: Settings },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; name?: string; avatarUrl?: string } | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
          avatarUrl: data.user.user_metadata?.avatar_url,
        });
      }
    });
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ─── MOBILE LAYOUT ───
  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        {/* Mobile Top Bar */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "70px",
          background: "var(--bg-primary)", borderBottom: "2px solid var(--border-heavy)",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", zIndex: 100
        }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <Logo size="sm" />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
              FinGenie
            </span>
          </Link>
          <button style={{ background: "transparent", border: "none", color: "var(--text-primary)" }} onClick={() => setDrawerOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Slide-out Drawer */}
        {drawerOpen && (
          <div style={{ width: "100vw", height: "100vh", position: "fixed", inset: 0, zIndex: 200, background: "var(--bg-primary)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", borderBottom: "2px solid var(--border-heavy)" }}>
              <Logo size="sm" />
              <button style={{ background: "transparent", border: "none", color: "var(--text-primary)" }} onClick={() => setDrawerOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <nav style={{ padding: "40px 20px", display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: pathname.startsWith(item.href) ? 800 : 500,
                    color: pathname.startsWith(item.href) ? "var(--brand-primary)" : "var(--text-primary)",
                    textDecoration: "none",
                    textTransform: "uppercase"
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div style={{ padding: "20px", borderTop: "2px solid var(--border-heavy)" }}>
              <button onClick={handleSignOut} className="btn btn-secondary" style={{ width: "100%" }}>
                SIGN OUT TERMINAL
              </button>
            </div>
          </div>
        )}

        <main style={{ paddingTop: "70px", paddingBottom: "40px" }}>
          {children}
        </main>
      </div>
    );
  }

  // ─── DESKTOP (EDITORIAL / NEOMRUTALIST) LAYOUT ───
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Editorial Left Frame */}
      <aside
        style={{
          width: "250px",
          borderRight: "1px solid var(--border-light)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          background: "transparent",
        }}
      >
        {/* Brand */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid var(--border-light)" }}>
          <Link href="/dashboard" style={{ textDecoration: "none", display: "inline-block" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <Logo size="md" inverse={false} />
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px", lineHeight: 1 }}>
              FinGenie
            </h1>
            <div className="eyebrow" style={{ marginTop: "6px" }}>Operating System</div>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "24px 0", display: "flex", flexDirection: "column" }}>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: isActive ? "var(--brand-primary)" : "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: isActive ? 700 : 600,
                  borderLeft: isActive ? "4px solid var(--brand-primary)" : "4px solid transparent",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  if(!isActive) {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.paddingLeft = "28px";
                  }
                }}
                onMouseOut={(e) => {
                  if(!isActive) {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.paddingLeft = "20px";
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Block */}
        <div style={{ padding: "20px", borderTop: "1px solid var(--border-light)" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>Operator</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border-light)", flexShrink: 0 }} />
            ) : (
              <div style={{ width: "36px", height: "36px", background: "var(--brand-primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, flexShrink: 0 }}>
                {user?.name?.[0] || "?"}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name || "SYS_ADMIN"}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email}
              </div>
            </div>
          </div>
          <button onClick={handleSignOut} className="btn btn-secondary" style={{ width: "100%", fontSize: "0.75rem", padding: "8px" }}>
            <LogOut size={14} /> TERMINATE SESSION
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: "250px", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
