import { NextResponse } from "next/server";
import {
  checkPassword,
  createSessionToken,
  isAuthConfigured,
  sessionCookie,
} from "@/lib/auth";

export async function POST(req: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin login is not configured. Set the ADMIN_PASSWORD environment variable." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = body?.password ?? "";
  } catch {
    // fall through — empty password fails the check
  }

  if (!checkPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Wrong password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie.name, createSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionCookie.maxAgeSeconds,
  });
  return res;
}
