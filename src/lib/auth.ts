import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  const a = crypto.createHash("sha256").update(password).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const sig = crypto.createHmac("sha256", SECRET).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

function verifySessionToken(token: string | undefined): boolean {
  if (!token || !SECRET) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(expStr).digest("hex");
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

/** Reads the session cookie from a Request and verifies it. */
export function isAuthed(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  const token = match?.slice(COOKIE_NAME.length + 1);
  return verifySessionToken(token);
}

export const sessionCookie = {
  name: COOKIE_NAME,
  maxAgeSeconds: SESSION_TTL_MS / 1000,
};
