export default function Logo({ size = "md", inverse = false }: { size?: "sm" | "md" | "lg", inverse?: boolean }) {
  const dims = { sm: 28, md: 36, lg: 48 };
  const s = dims[size];
  const primaryColor = inverse ? "var(--bg-primary)" : "var(--text-primary)"; 
  const accentColor = "var(--brand-primary)"; 

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FinGenie logo"
    >
      {/* Expressive geometric monogram (Abstract F/G) */}
      <rect x="4" y="4" width="18" height="40" fill={primaryColor} />
      <rect x="26" y="4" width="18" height="14" fill={accentColor} />
      <rect x="26" y="22" width="12" height="12" fill={primaryColor} />
      {/* Decorative grain/cut */}
      <circle cx="38" cy="38" r="4" fill={accentColor} />
    </svg>
  );
}
