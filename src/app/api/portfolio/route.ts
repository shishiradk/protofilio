import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  try {
    const data = getPortfolioData();
    // Never expose a legacy adminPassword field to the client.
    delete (data as unknown as Record<string, unknown>).adminPassword;
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized — please log in again." },
      { status: 401 }
    );
  }
  try {
    const data = await req.json();
    // The admin password lives in env vars, never in the data file.
    delete (data as Record<string, unknown>).adminPassword;
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
