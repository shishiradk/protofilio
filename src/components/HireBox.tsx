"use client";

import { portfolioData } from "@/data/portfolio";

export default function HireBox() {
  const hire = portfolioData.hire;
  if (!hire.visible) return null;

  return (
    <div
      className="absolute left-4 md:left-6 top-16 md:top-5 bg-[var(--card-bg)]
        text-white px-3 py-2 rounded-lg border border-[var(--border)]
        inline-flex gap-2 items-center z-[120]"
      style={{
        boxShadow: hire.glow ? `0 0 18px ${hire.color}40` : "none",
      }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{
          background: hire.color,
          boxShadow: `0 0 8px ${hire.color}`,
        }}
      />
      <span className="text-xs font-medium">{hire.text}</span>
    </div>
  );
}
