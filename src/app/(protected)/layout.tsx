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
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/settings/privacy", label: "Settings", icon: Settings },
];

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
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

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "72px" : "256px",
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderBottom: "1px solid var(--border)",
            minHeight: "73px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              minWidth: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--mint-primary), var(--emerald))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={18} color="var(--bg-primary)" />
          </div>
          {!collapsed && (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                whiteSpace: "nowrap",
              }}
            >
              FinGenie
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: collapsed ? "12px" : "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  color: isActive ? "var(--mint-primary)" : "var(--text-secondary)",
                  background: isActive ? "var(--mint-dim)" : "transparent",
                  transition: "all 0.2s",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                  justifyContent: collapsed ? "center" : "flex-start",
                  whiteSpace: "nowrap",
                }}
                title={item.label}
              >
                <item.icon size={20} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: "12px",
            margin: "0 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            color: "var(--text-dim)",
            transition: "all 0.2s",
          }}
        >
          <ChevronRight
            size={16}
            style={{
              transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s",
            }}
          />
        </button>

        {/* User */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              style={{ width: "32px", height: "32px", borderRadius: "50%", minWidth: "32px" }}
            />
          ) : (
            <div
              style={{
                width: "32px",
                height: "32px",
                minWidth: "32px",
                borderRadius: "50%",
                background: "var(--bg-elevated)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--mint-primary)",
              }}
            >
              {user?.name?.[0] || "?"}
            </div>
          )}
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name || "User"}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-dim)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.email}
              </div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleSignOut}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-dim)",
                padding: "4px",
                display: "flex",
              }}
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: collapsed ? "72px" : "256px",
          transition: "margin-left 0.3s ease",
          padding: "32px 40px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
