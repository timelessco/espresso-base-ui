"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"

const sidebarItems = [
  { label: "Avatar", href: "/ui/avatar" },
  { label: "Button", href: "/ui/button" },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-border p-4">
      <nav className="flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
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
    <div>
      <Header />
      <div className="flex h-[calc(100vh-48px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
