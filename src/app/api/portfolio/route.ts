import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    savePortfolioData(data);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
