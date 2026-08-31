// Regenerates the registry theme from app/globals.css so it can never go
// stale. The only difference between the two files is the app-only mobile
// font-scale media query (plus its leading comment), which is stripped here.
import { readFileSync, writeFileSync } from "node:fs"

const SOURCE = "app/globals.css"
const TARGET = "registry/espresso/espresso-theme/globals.css"
const MOBILE_QUERY = "@media (max-width: 767.98px)"

const css = readFileSync(SOURCE, "utf8")

const start = css.indexOf(MOBILE_QUERY)
if (start === -1) {
  throw new Error(`${SOURCE}: mobile media query not found (${MOBILE_QUERY})`)
}

// Walk to the media block's matching closing brace.
let index = css.indexOf("{", start)
let depth = 0
do {
  const char = css[index]
  if (char === "{") depth++
  else if (char === "}") depth--
  index++
} while (depth > 0 && index < css.length)
if (depth !== 0) throw new Error(`${SOURCE}: unbalanced braces in mobile block`)

// Also strip the comment block directly above the media query, if present.
let blockStart = start
const before = css.slice(0, start)
const commentOpen = before.lastIndexOf("/*")
if (commentOpen !== -1) {
  const between = css.slice(before.indexOf("*/", commentOpen) + 2, start)
  if (/^\s*$/.test(between)) blockStart = commentOpen
}

const output = (
  css.slice(0, blockStart).replace(/\n[ \t]*$/, "\n") + css.slice(index)
).replace(/\n{3,}/g, "\n\n")

writeFileSync(TARGET, output)
console.log(`✔ Synced ${TARGET} from ${SOURCE} (mobile block stripped)`)
