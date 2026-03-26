"use client";

import { createContext, useContext } from "react";
import type { PortfolioData } from "@/types/portfolio";

const PortfolioContext = createContext<PortfolioData | null>(null);

export function PortfolioProvider({ data, children }: { data: PortfolioData; children: React.ReactNode }) {
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioData {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
