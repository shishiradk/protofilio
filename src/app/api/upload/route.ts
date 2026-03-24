import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ ok: true, path: `/${fileName}` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
