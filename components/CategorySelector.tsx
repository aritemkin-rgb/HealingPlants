"use client";

import { healingCategories } from "@/lib/recommendationEngine";

export function CategorySelector({
  selected,
  selectedIssues,
  onToggleConcern,
  onToggleIssue,
  compact = false,
}: {
  selected: string[];
  selectedIssues: string[];
  onToggleConcern: (id: string) => void;
  onToggleIssue: (id: string) => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <>
        {healingCategories.map((item) => {
          const active = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleConcern(item.id)}
              aria-pressed={active}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 font-condensed text-[0.72rem] uppercase tracking-[0.12em] ${
                active
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[rgba(44,36,22,0.14)] bg-white text-[var(--ink)] hover:border-[var(--ink)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {healingCategories.map((item) => {
        const active = selected.includes(item.id);
        return (
          <div
            key={item.id}
            className={`rounded-2xl border p-3 text-left transition ${
              active
                ? "border-[var(--moss)] bg-[rgba(107,127,98,0.14)] shadow-[inset_0_0_0_1px_rgba(107,127,98,0.2)]"
                : "border-[rgba(44,36,22,0.1)] bg-white hover:border-[var(--root-gold)]"
            }`}
          >
            <button
              type="button"
              onClick={() => onToggleConcern(item.id)}
              aria-pressed={active}
              className="w-full text-left"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="font-display text-xl leading-tight">{item.label}</span>
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] ${
                    active
                      ? "border-[var(--moss)] bg-[var(--moss)] text-white"
                      : "border-[rgba(44,36,22,0.22)] bg-white text-transparent"
                  }`}
                  aria-hidden
                >
                  ✓
                </span>
              </span>
              <span className="mt-1 block text-xs leading-snug text-[var(--ink-soft)]">
                {item.prompt}
              </span>
            </button>
            {active ? (
              <div className="mt-2 flex flex-wrap gap-1.5 border-t border-[rgba(44,36,22,0.08)] pt-2">
                {item.issues.map((issue) => {
                  const on = selectedIssues.includes(issue.id);
                  return (
                    <button
                      key={issue.id}
                      type="button"
                      onClick={() => onToggleIssue(issue.id)}
                      aria-pressed={on}
                      className={`rounded-full px-2.5 py-1 font-sans text-[0.62rem] uppercase tracking-[0.12em] ${
                        on
                          ? "bg-[var(--soil)] text-[var(--root-gold)]"
                          : "border border-[rgba(44,36,22,0.14)] bg-[var(--panel)]"
                      }`}
                    >
                      {issue.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
