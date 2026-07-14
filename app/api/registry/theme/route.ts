import { type NextRequest, NextResponse } from "next/server"

// The theme preset carried in the `?preset=` param. Colors are resolved,
// self-contained values (oklch/rgb/hex), not `var(--color-…)`, so they work in
// any consumer project regardless of its Tailwind theme.
type ThemePreset = {
  primary?: string
  primaryFg?: string
  primaryDark?: string
  primaryFgDark?: string
  radius?: string
}

// Decode the base64url `?preset=` payload: { primary, radius }.
function decodePreset(param: string): ThemePreset | null {
  try {
    const b64 = param.replace(/-/g, "+").replace(/_/g, "/")
    const parsed = JSON.parse(Buffer.from(b64, "base64").toString("utf8"))
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    return null
  }
}

// A css-only registry item (no files) that overrides --primary / --radius via
// the shadcn `css` field. We use the higher-specificity `:root:root` /
// `.dark.dark` selectors (appended to the end of the installer's globals.css)
// so the override wins regardless of the target's existing :root structure —
// `cssVars` merges into an existing :root, which breaks when a theme declares
// multiple :root blocks and a later one re-defines --primary.
export async function GET(req: NextRequest) {
  const item: Record<string, unknown> = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "espresso-theme-preset",
    type: "registry:style",
    title: "Espresso Theme Preset",
    description: "Primary color and radius preset.",
  }

  const param = req.nextUrl.searchParams.get("preset")
  if (param) {
    const preset = decodePreset(param)
    if (preset) {
      const root: Record<string, string> = {}
      if (preset.primary) root["--primary"] = preset.primary
      if (preset.primaryFg) root["--primary-foreground"] = preset.primaryFg
      if (preset.radius) root["--radius"] = preset.radius

      const dark: Record<string, string> = {}
      if (preset.primaryDark) dark["--primary"] = preset.primaryDark
      if (preset.primaryFgDark) dark["--primary-foreground"] = preset.primaryFgDark

      const css: Record<string, Record<string, string>> = {}
      if (Object.keys(root).length > 0) css[":root:root"] = root
      if (Object.keys(dark).length > 0) css[".dark.dark"] = dark
      if (Object.keys(css).length > 0) item.css = css
    }
  }

  return NextResponse.json(item)
}
