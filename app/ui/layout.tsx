"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/sonner"

const sidebarItems = [
  { label: "Alert", href: "/ui/alert" },
  { label: "Avatar", href: "/ui/avatar" },
  { label: "Badge", href: "/ui/badge" },
  { label: "Breadcrumb", href: "/ui/breadcrumb" },
  { label: "Button", href: "/ui/button" },
  { label: "Button Group", href: "/ui/button-group" },
  { label: "Calendar", href: "/ui/calendar" },
  { label: "Checkbox", href: "/ui/checkbox" },
  { label: "Dialog", href: "/ui/dialog" },
  { label: "Dropdown Menu", href: "/ui/dropdown-menu" },
  { label: "Field", href: "/ui/field" },
  { label: "Input", href: "/ui/input" },
  { label: "Input Group", href: "/ui/input-group" },
  { label: "Notification", href: "/ui/notification" },
  { label: "Popover", href: "/ui/popover" },
  { label: "Radio", href: "/ui/radio" },
  { label: "Select", href: "/ui/select" },
  { label: "Sonner", href: "/ui/sonner" },
  { label: "Spacer", href: "/ui/spacer" },
  { label: "Separator", href: "/ui/separator" },
  { label: "Slider", href: "/ui/slider" },
  { label: "Spinner", href: "/ui/spinner" },
  { label: "Switch", href: "/ui/switch" },
  { label: "Table", href: "/ui/table" },
  { label: "Tabs", href: "/ui/tabs" },
  { label: "Textarea", href: "/ui/textarea" },
  { label: "Tooltip", href: "/ui/tooltip" },
]

function Sidebar() {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [shadowTop, setShadowTop] = useState(false)
  const [shadowBottom, setShadowBottom] = useState(true)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setShadowTop(el.scrollTop > 0)
    setShadowBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1)
  }, [])

  return (
    <aside className="relative flex w-48 shrink-0 flex-col rounded-2xl border border-border bg-background shadow-sm shadow-black/5 dark:shadow-black/20">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-12 rounded-t-2xl bg-gradient-to-b from-background to-transparent transition-opacity duration-200",
          shadowTop ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex-1 overflow-y-auto p-3"
      >
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-muted",
                pathname === item.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 rounded-b-2xl bg-gradient-to-t from-background to-transparent transition-opacity duration-200",
          shadowBottom ? "opacity-100" : "opacity-0"
        )}
      />
    </aside>
  )
}

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col gap-3 bg-background px-5 pt-3 pb-5">
      <Header />
      <div className="flex min-h-0 flex-1 gap-5">
        <Sidebar />
        <main className="scrollbar-hide flex-1 overflow-auto rounded-2xl border border-border bg-background shadow-sm shadow-black/5 dark:shadow-black/20">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
