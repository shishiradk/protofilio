import fs from "fs";
import path from "path";
import type { PortfolioData } from "@/types/portfolio";

const DATA_PATH = path.join(process.cwd(), "src/data/portfolio.json");

export function getPortfolioData(): PortfolioData {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

export function savePortfolioData(data: PortfolioData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}
