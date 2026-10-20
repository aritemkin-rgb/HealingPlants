"use client";

import { useGuideController } from "@/components/GuideProvider";

export function StartGuideButton({
  children = "Start with Prairie Sage",
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  const { openGuide } = useGuideController();

  return (
    <button
      type="button"
      onClick={() => openGuide()}
      className={className}
    >
      {children}
    </button>
  );
}
