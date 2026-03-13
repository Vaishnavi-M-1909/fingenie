"use client";

import { useQuery } from "@tanstack/react-query";
import { 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  Download, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

type Statement = {
  id: string;
  originalFilename: string;
  filePath: string;
  uploadedAt: string;
  status: "queued" | "parsing" | "done" | "failed";
  meta: any;
  _count: {
    transactions: number;
  };
};

function FileIcon({ filename }: { filename: string }) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) return <ImageIcon size={24} />;
  if (ext === "csv" || ext === "xlsx") return <FileSpreadsheet size={24} />;
  return <FileText size={24} />;
}

function StatusBadge({ status }: { status: Statement["status"] }) {
  switch (status) {
    case "done":
      return (
        <span className="badge" style={{ background: "rgba(0, 229, 122, 0.1)", color: "var(--accent-mint)", borderColor: "var(--accent-mint)" }}>
          <CheckCircle2 size={12} style={{ marginRight: "4px" }} /> PROCESSED
        </span>
      );
    case "parsing":
    case "queued":
      return (
        <span className="badge" style={{ background: "rgba(255, 199, 0, 0.1)", color: "#FFC700", borderColor: "#FFC700" }}>
          <Clock size={12} style={{ marginRight: "4px" }} /> ANALYZING
        </span>
      );
    case "failed":
      return (
        <span className="badge" style={{ background: "rgba(255, 59, 0, 0.1)", color: "var(--accent-coral)", borderColor: "var(--accent-coral)" }}>
          <AlertCircle size={12} style={{ marginRight: "4px" }} /> FAILED
        </span>
      );
    default:
      return null;
  }
}

export default function VaultPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery<{ statements: Statement[] }>({
    queryKey: ["vault"],
    queryFn: async () => {
      const res = await fetch("/api/vault");
      if (!res.ok) throw new Error("Failed to fetch vault");
      return res.json();
    },
  });

  const filteredStatements = data?.statements.filter(s => 
    s.originalFilename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-editorial animate-reveal" style={{ maxWidth: "1200px" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 className="display-large" style={{ marginBottom: "8px" }}>Repository.</h1>
        <div className="eyebrow" style={{ color: "var(--brand-primary)" }}>Document Storage & Audit Trail</div>
      </header>

      <div className="rule-horizontal" style={{ marginBottom: "40px" }} />

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: "32px" }}>
        <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} size={20} />
        <input 
          type="text" 
          placeholder="SEARCH REGISTRY..." 
          className="input" 
          style={{ paddingLeft: "48px", textTransform: "uppercase", fontWeight: 700 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[1,2,3].map(i => (
            <div key={i} className="editorial-card" style={{ height: "100px", opacity: 0.5 }} />
          ))}
        </div>
      ) : filteredStatements?.length === 0 ? (
        <div className="editorial-card" style={{ textAlign: "center", padding: "80px 20px" }}>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>No matching records found</div>
          <p style={{ color: "var(--text-secondary)" }}>Your vault is currently empty or matches no search criteria.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--border-heavy)", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--bg-secondary)" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 150px 150px 120px 80px", 
            padding: "16px 24px", 
            background: "var(--bg-primary)",
            borderBottom: "1px solid var(--border-heavy)",
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            color: "var(--text-secondary)"
          }}>
            <div>Document</div>
            <div>Date Uploaded</div>
            <div>Status</div>
            <div>Vectors</div>
            <div>Action</div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredStatements?.map((stmt, idx) => (
              <div 
                key={stmt.id} 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 150px 150px 120px 80px", 
                  padding: "20px 24px", 
                  borderBottom: idx === filteredStatements.length - 1 ? "none" : "1px solid var(--border-light)",
                  alignItems: "center",
                  transition: "background 0.2s"
                }}
                className="editorial-card-hover"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ 
                    width: "44px", 
                    height: "44px", 
                    background: "var(--bg-primary)", 
                    borderRadius: "8px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "var(--brand-primary)",
                    border: "1px solid var(--border-heavy)"
                  }}>
                    <FileIcon filename={stmt.originalFilename} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {stmt.originalFilename}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                      {stmt.id.substring(0, 12).toUpperCase()}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                  {new Date(stmt.uploadedAt).toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" })}
                </div>

                <div>
                  <StatusBadge status={stmt.status} />
                </div>

                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-primary)" }}>
                  {stmt._count.transactions} <span style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>TXS</span>
                </div>

                <div>
                  <a 
                    href={`/api/vault/file/${stmt.id}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      width: "36px", 
                      height: "36px", 
                      borderRadius: "6px", 
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-heavy)",
                      color: "var(--text-primary)",
                      textDecoration: "none"
                    }}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
