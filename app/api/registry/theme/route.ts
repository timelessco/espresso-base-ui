import { type NextRequest, NextResponse } from "next/server"

// The theme preset carried in the `?preset=` param.
type ThemePreset = { primary?: string; primaryDark?: string; radius?: string }

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

// A css-only registry item (no files) that sets --primary / --radius on :root
// via shadcn `cssVars`, so `npx shadcn add ".../r/theme.json?preset=…"` applies
// the picked color and radius to the installer's globals.css.
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
      const light: Record<string, string> = {}
      const dark: Record<string, string> = {}
      if (preset.primary) light.primary = preset.primary
      if (preset.radius) light.radius = preset.radius
      if (preset.primaryDark) dark.primary = preset.primaryDark
      const cssVars: Record<string, Record<string, string>> = {}
      if (Object.keys(light).length > 0) cssVars.light = light
      if (Object.keys(dark).length > 0) cssVars.dark = dark
      if (Object.keys(cssVars).length > 0) item.cssVars = cssVars
    }
  }

  return NextResponse.json(item)
}
