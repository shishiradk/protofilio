import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthed } from "@/lib/auth";

const ALLOWED_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".pdf",
]);
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized — please log in again." },
      { status: 401 }
    );
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "File too large (max 8 MB)" },
        { status: 413 }
      );
    }

    const fileName = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, "_");
    const ext = path.extname(fileName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { ok: false, error: `File type ${ext || "(none)"} not allowed` },
        { status: 415 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ ok: true, path: `/${fileName}` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
