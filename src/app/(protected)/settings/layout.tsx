"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Shield, Bell } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { href: "/settings/accounts", label: "Bank Accounts", icon: CreditCard },
    { href: "/settings/notifications", label: "Notifications", icon: Bell },
    { href: "/settings/privacy", label: "Privacy & Data", icon: Shield },
  ];

  return (
    <div className="container-editorial animate-reveal" style={{ maxWidth: "1000px" }}>
      <header style={{ marginBottom: "32px" }}>
        <h1 className="display-large" style={{ marginBottom: "8px" }}>Settings.</h1>
        <div className="eyebrow" style={{ color: "var(--brand-primary)" }}>Configuration & Governance</div>
      </header>

      <nav style={{ 
        display: "flex", 
        gap: "12px", 
        marginBottom: "40px",
        borderBottom: "1px solid var(--border-light)",
        paddingBottom: "16px"
      }}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                borderRadius: "var(--radius-sm)",
                transition: "all 0.2s",
                background: isActive ? "var(--bg-secondary)" : "transparent",
                color: isActive ? "var(--brand-primary)" : "var(--text-tertiary)",
                border: isActive ? "2px solid var(--border-heavy)" : "2px solid transparent",
                boxShadow: isActive ? "4px 4px 0 var(--border-heavy)" : "none",
                transform: isActive ? "translate(-2px, -2px)" : "none",
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}
