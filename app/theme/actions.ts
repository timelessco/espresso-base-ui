"use server"

import { promises as fs } from "fs"
import path from "path"

/**
 * Update the theme tokens in app/globals.css. Rewrites the first `--primary`
 * declaration (the light `:root`) and/or the single `--radius` declaration in
 * place. Dev-only: it edits the source file, which Turbopack hot-reloads.
 */
export async function updateThemeVars(vars: {
  primary?: string
  radius?: string
}) {
  const file = path.join(process.cwd(), "app", "globals.css")
  let css = await fs.readFile(file, "utf8")

  if (vars.primary) {
    css = css.replace(/--primary:\s*[^;]+;/, `--primary: ${vars.primary};`)
  }
  if (vars.radius) {
    css = css.replace(/--radius:\s*[^;]+;/, `--radius: ${vars.radius};`)
  }

  await fs.writeFile(file, css, "utf8")
  return { ok: true }
}
