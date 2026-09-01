"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { docsComponents, docsGettingStarted } from "./nav"

const OPEN_EVENT = "espresso:open-docs-search"

// Opens the global docs search palette from anywhere (e.g. the docs pills).
export function openDocsSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

// The ⌘K docs search palette. Mounted once in the root layout so the shortcut
// works on every page; trigger buttons call openDocsSearch().
export function DocsSearchDialog() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener("keydown", onKeyDown)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  return (
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
          <CommandGroup heading="Getting Started">
            {docsGettingStarted.map((item) => (
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
  )
}
