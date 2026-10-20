export function BotanicMark({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const palette: Record<string, { leaf: string; accent: string }> = {
    peppermint: { leaf: "#3f7a62", accent: "#d7efe4" },
    passionflower: { leaf: "#5b4e8a", accent: "#f0d48a" },
    arnica: { leaf: "#d4a017", accent: "#f7e7b0" },
    ginseng: { leaf: "#7a4e2d", accent: "#e4c9a5" },
    "milk-thistle": { leaf: "#8aa0aa", accent: "#f2f5f6" },
    lavender: { leaf: "#7a6aa8", accent: "#e6def6" },
    echinacea: { leaf: "#c45c26", accent: "#f3d2b8" },
    aloe: { leaf: "#6b9a4a", accent: "#e2f0c9" },
    "black-cohosh": { leaf: "#3d4a38", accent: "#d9cbb8" },
    chamomile: { leaf: "#e0c14a", accent: "#fff6cf" },
    ginger: { leaf: "#c4783a", accent: "#f3d7b8" },
    clove: { leaf: "#6b2e24", accent: "#e8c4a8" },
  };
  const colors = palette[slug] ?? { leaf: "#6B7F62", accent: "#C5A572" };

  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="160" height="120" fill="#1A1613" />
      <circle cx="80" cy="64" r="34" fill="none" stroke="#C5A572" strokeWidth="0.6" opacity="0.5" />
      <path
        d="M80 96 C68 70 48 58 36 54 C58 50 74 36 80 18 C86 36 102 50 124 54 C112 58 92 70 80 96Z"
        fill={colors.leaf}
      />
      <circle cx="80" cy="52" r="7" fill={colors.accent} />
      <path d="M20 108 C48 96 112 96 140 108" fill="none" stroke="#C5A572" strokeWidth="1.1" />
    </svg>
  );
}
