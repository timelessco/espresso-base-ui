"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { docsComponents } from "./nav"

// Global docs search: a search pill that opens a ⌘K command palette listing
// every documented component, like the frappe-ui docs search. When two
// instances are mounted (desktop header + mobile sidebar), only one should
// own the ⌘K hotkey via `enableHotkey`.
export function DocsSearch({
  className,
  enableHotkey = true,
}: {
  className?: string
  enableHotkey?: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!enableHotkey) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [enableHotkey])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-8 w-full items-center gap-2 rounded-lg border border-border-soft bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted focus-visible:shadow-3xs",
          className
        )}
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Search documentation</span>
        <Kbd>⌘K</Kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search the component docs"
      >
        <Command>
          <CommandInput placeholder="Search documentation" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Components">
              {docsComponents.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    setOpen(false)
                    router.push(item.href)
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
