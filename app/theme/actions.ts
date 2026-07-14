"use server"

import { promises as fs } from "fs"
import path from "path"

// Replace the Nth occurrence (1-indexed) of a `--name: …;` declaration.
// globals.css declares each token twice — once in :root (light, n=1) and once
// in .dark (n=2) — so the caller targets a mode by occurrence.
function replaceNth(css: string, name: string, value: string, n: number) {
  let i = 0
  return css.replace(new RegExp(`--${name}:\\s*[^;]+;`, "g"), (m) => {
    i += 1
    return i === n ? `--${name}: ${value};` : m
  })
}

/**
 * Update the theme tokens in app/globals.css. `--primary` / `--primary-foreground`
 * can be set per mode (light = :root, dark = .dark); `--radius` lives in :root.
 * Dev-only: it edits the source file, which Turbopack hot-reloads.
 */
export async function updateThemeVars(vars: {
  primaryLight?: string
  primaryDark?: string
  primaryFgLight?: string
  primaryFgDark?: string
  radius?: string
}) {
  const file = path.join(process.cwd(), "app", "globals.css")
  let css = await fs.readFile(file, "utf8")

  if (vars.primaryLight) css = replaceNth(css, "primary", vars.primaryLight, 1)
  if (vars.primaryDark) css = replaceNth(css, "primary", vars.primaryDark, 2)
  if (vars.primaryFgLight)
    css = replaceNth(css, "primary-foreground", vars.primaryFgLight, 1)
  if (vars.primaryFgDark)
    css = replaceNth(css, "primary-foreground", vars.primaryFgDark, 2)
  if (vars.radius) css = replaceNth(css, "radius", vars.radius, 1)

  await fs.writeFile(file, css, "utf8")
  return { ok: true }
}
