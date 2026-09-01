"use client"

import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Kbd } from "@/components/ui/kbd"
import { openDocsSearch } from "./search-dialog"

// Docs search pill: opens the global ⌘K palette (DocsSearchDialog, mounted
// once in the root layout) so the shortcut and dialog are shared site-wide.
export function DocsSearch({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openDocsSearch}
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-lg border border-border-soft bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted focus-visible:shadow-3xs",
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0" />
      <span className="flex-1 truncate text-left">Search documentation</span>
      <Kbd>⌘K</Kbd>
    </button>
  )
}
