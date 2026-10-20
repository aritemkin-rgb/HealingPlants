import { MEDICAL_DISCLAIMER, SAFETY_SHORT } from "@/lib/safetyRules";

export function SafetyNote({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-[0.72rem] leading-relaxed text-[var(--ink-soft)] ${className}`}
    >
      {compact ? SAFETY_SHORT : MEDICAL_DISCLAIMER}
    </p>
  );
}

export function PlaceholderBadge({
  label = "PLACEHOLDER",
}: {
  label?: string;
}) {
  return (
    <span className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-[var(--terracotta)]">
      {label}
    </span>
  );
}
