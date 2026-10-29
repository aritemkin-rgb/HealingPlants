"use client";

export function IssueSelector({
  intensity,
  onChange,
}: {
  intensity: number;
  onChange: (value: number) => void;
}) {
  const safe = Number.isFinite(intensity) ? intensity : 3;

  return (
    <label className="block text-sm font-light text-[var(--ink-soft)]">
      Optional intensity
      <input
        type="range"
        min={1}
        max={5}
        value={safe}
        onChange={(event) => onChange(Number(event.target.value))}
        className="guide-intensity mt-2 w-full"
      />
      <span className="mt-1 block font-condensed text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink)]">
        {safe <= 2 ? "Gentle looking" : safe >= 4 ? "More pressing" : "In the middle"}
      </span>
    </label>
  );
}
