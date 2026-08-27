"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type TocEntry = { id: string; title: string }

// "On this page" rail: discovers the current page's DocSections from the DOM,
// highlights the section in view, and smooth-scrolls on click.
export function DocsToc() {
  const pathname = usePathname()
  const [entries, setEntries] = React.useState<TocEntry[]>([])
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cleanup: (() => void) | undefined

    // Wait a frame so the new page's sections are in the DOM after navigation.
    const frame = requestAnimationFrame(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-doc-section]")
      )
      setEntries(
        sections.map((section) => ({
          id: section.id,
          title: section.dataset.docTitle ?? section.id,
        }))
      )

      const root = document.getElementById("docs-scroll-container")
      if (!root || sections.length === 0) {
        setActiveId(sections[0]?.id ?? null)
        return
      }

      const updateActive = () => {
        // At the very bottom the last section is active, even if it's too
        // short to ever reach the top of the viewport.
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
          setActiveId(sections[sections.length - 1].id)
          return
        }
        const rootTop = root.getBoundingClientRect().top
        let current = sections[0].id
        for (const section of sections) {
          if (section.getBoundingClientRect().top - rootTop <= 96) {
            current = section.id
          } else {
            break
          }
        }
        setActiveId(current)
      }

      updateActive()
      root.addEventListener("scroll", updateActive, { passive: true })
      cleanup = () => root.removeEventListener("scroll", updateActive)
    })

    return () => {
      cancelAnimationFrame(frame)
      cleanup?.()
    }
  }, [pathname])

  if (entries.length === 0) return null

  return (
    <nav
      aria-label="On this page"
      className="scrollbar-hide w-52 shrink-0 overflow-y-auto py-10 pr-6"
    >
      <p className="mb-3 text-sm font-medium text-foreground">On this page</p>
      <ul className="flex flex-col border-l border-border-soft">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={(event) => {
                event.preventDefault()
                document
                  .getElementById(entry.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                activeId === entry.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
