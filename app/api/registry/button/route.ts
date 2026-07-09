import { type NextRequest, NextResponse } from "next/server"

// Bundled at build time so it works on Vercel (serverless funcs can't fs-read
// public/). Kept in sync with the served file by `pnpm registry:build`.
import buttonItem from "../../../../public/r/button.json"

// A per-variant theme carried in the `?preset=` param.
type VariantTheme = { bg?: string; fg?: string; radius?: number }

// Which theme token each variant's background / text color maps onto. `bg: null`
// means the variant is transparent (no background token to override).
const VARIANT_TOKENS: Record<string, { bg: string | null; fg: string }> = {
  default: { bg: "primary", fg: "primary-foreground" },
  secondary: { bg: "secondary", fg: "secondary-foreground" },
  outline: { bg: null, fg: "secondary-foreground" },
  ghost: { bg: null, fg: "secondary-foreground" },
  destructive: { bg: "destructive", fg: "destructive-foreground" },
  link: { bg: null, fg: "secondary-foreground" },
}

// Decode the base64url `?preset=` payload: { [variant]: { bg, fg, radius } }.
function decodePreset(param: string): Record<string, VariantTheme> | null {
  try {
    const b64 = param.replace(/-/g, "+").replace(/_/g, "/")
    const parsed = JSON.parse(Buffer.from(b64, "base64").toString("utf8"))
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    return null
  }
}

// Turn the preset into a shadcn `css` object of scoped rules — one selector per
// variant — that override the theme variables the button consumes (so its own
// `bg-primary`/`text-primary-foreground`/`rounded-*` and hover states follow).
function buildCss(preset: Record<string, VariantTheme>) {
  const css: Record<string, Record<string, string>> = {}
  for (const [variant, theme] of Object.entries(preset)) {
    const tokens = VARIANT_TOKENS[variant] ?? VARIANT_TOKENS.default
    const decls: Record<string, string> = {}
    if (theme.bg && tokens.bg) decls[`--${tokens.bg}`] = theme.bg
    if (theme.fg) decls[`--${tokens.fg}`] = theme.fg
    if (theme.radius != null) decls["--radius"] = `${theme.radius}px`
    if (Object.keys(decls).length > 0) {
      css[`[data-slot=button][data-variant=${variant}]`] = decls
    }
  }
  return css
}

// Serves the button registry item. With `?preset=`, it merges a scoped `css`
// block so `npx shadcn add ".../r/button.json?preset=…"` installs the themed
// button. Without it, returns the plain item (same as the static file).
export async function GET(req: NextRequest) {
  const item: Record<string, unknown> = { ...buttonItem }

  const param = req.nextUrl.searchParams.get("preset")
  if (param) {
    const preset = decodePreset(param)
    if (preset) {
      const css = buildCss(preset)
      if (Object.keys(css).length > 0) item.css = css
    }
  }

  return NextResponse.json(item)
}
