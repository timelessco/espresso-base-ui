"use server"

import { promises as fs } from "fs"
import path from "path"

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Write (or update / clear) a managed block of CSS in app/globals.css.
 *
 * Each `scope` owns one delimited block, e.g.:
 *   /* customise:button:start *\/ … /* customise:button:end *\/
 * Re-applying the same scope replaces its block; an empty `css` removes it.
 */
export async function applyCustomisation(scope: string, css: string) {
  const file = path.join(process.cwd(), "app", "globals.css")
  let content = await fs.readFile(file, "utf8")

  const start = `/* customise:${scope}:start */`
  const end = `/* customise:${scope}:end */`
  const re = new RegExp(
    `\\n*${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`,
    "g"
  )

  // remove any existing block for this scope
  content = content.replace(re, "")

  const trimmed = css.trim()
  if (trimmed) {
    content = `${content.trimEnd()}\n\n${start}\n${trimmed}\n${end}\n`
  } else {
    content = `${content.trimEnd()}\n`
  }

  await fs.writeFile(file, content, "utf8")
  return { ok: true as const }
}

/**
 * Remove every managed customise block (global + all components) from
 * app/globals.css — a full reset back to the theme defaults.
 */
export async function resetAllCustomisations() {
  const file = path.join(process.cwd(), "app", "globals.css")
  let content = await fs.readFile(file, "utf8")
  content = content.replace(
    /\n*\/\* customise:[\w-]+:start \*\/[\s\S]*?\/\* customise:[\w-]+:end \*\//g,
    ""
  )
  await fs.writeFile(file, `${content.trimEnd()}\n`, "utf8")
  return { ok: true as const }
}
