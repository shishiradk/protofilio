import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/portfolio.ts");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const content = `export const portfolioData = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(DATA_PATH, content, "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
