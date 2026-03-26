"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function Footer() {
  const footer = usePortfolio().footer;

  return (
    <footer className="text-center py-5 text-[var(--muted)] mt-6 text-sm md:text-base">
      &copy; {footer.year} {footer.text}
    </footer>
  );
}
