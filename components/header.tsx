"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "UI", href: "/ui" },
  { label: "Colors", href: "/colors" },
  { label: "Playground", href: "/playground" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-4">
      <Link href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" width="100" height="38">
          <text
            x="50%"
            y="55%"
            fontFamily="'Montserrat', 'Heebo', sans-serif"
            fontSize="80"
            fontWeight="700"
            fill="currentColor"
            textAnchor="middle"
            dominantBaseline="middle"
            letterSpacing="-1.5"
          >
            espresso
          </text>
        </svg>
      </Link>
      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
            size="sm"
            nativeButton={false}
            render={<Link href={item.href} />}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </header>
  )
}
