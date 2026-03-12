export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = { sm: 28, md: 36, lg: 48 };
  const s = dims[size];

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FinGenie logo"
    >
      {/* Rounded hexagon background */}
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5A0" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="symbolGrad" x1="14" y1="12" x2="34" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A0C10" />
          <stop offset="1" stopColor="#12141A" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#logoGrad)" />
      {/* ₹ symbol — stylized */}
      <path
        d="M16 16h16M16 22h16M18 16c0 0 2 12 8 16M25 16l-8 20"
        stroke="url(#symbolGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sparkle dot */}
      <circle cx="36" cy="12" r="2.5" fill="#0A0C10" opacity="0.5" />
    </svg>
  );
}
