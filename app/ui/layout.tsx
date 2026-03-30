"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"

const sidebarItems = [
  { label: "Avatar", href: "/ui/avatar" },
  { label: "Badge", href: "/ui/badge" },
  { label: "Breadcrumb", href: "/ui/breadcrumb" },
  { label: "Button", href: "/ui/button" },
  { label: "Checkbox", href: "/ui/checkbox" },
  { label: "Dropdown Menu", href: "/ui/dropdown-menu" },
  { label: "Field", href: "/ui/field" },
  { label: "Input", href: "/ui/input" },
  { label: "Radio", href: "/ui/radio" },
  { label: "Switch", href: "/ui/switch" },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-48 shrink-0 flex-col gap-1 rounded-2xl border border-border bg-background p-3 shadow-sm shadow-black/5 dark:shadow-black/20">
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
    </div>
  )
}
