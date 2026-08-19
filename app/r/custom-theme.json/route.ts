import type { NextRequest } from "next/server"

// Serves the exported customisation as a shadcn registry item. The theme is
// passed as a base64url-encoded payload in `?d=` (built by the customiser's
// "Get code"), so nothing is written to disk — this works on read-only
// serverless filesystems (e.g. Vercel) where fs writes would fail.
export function GET(req: NextRequest) {
  const d = req.nextUrl.searchParams.get("d")
  if (!d) {
    return Response.json({ error: "Missing theme payload" }, { status: 400 })
  }
  try {
    const b64 = d.replace(/-/g, "+").replace(/_/g, "/")
    const json = Buffer.from(b64, "base64").toString("utf8")
    const item = JSON.parse(json)
    return Response.json(item)
  } catch {
    return Response.json({ error: "Invalid theme payload" }, { status: 400 })
  }
}
