"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "UI", href: "/ui" },
  { label: "Colors", href: "/colors" },
  { label: "Playground", href: "/playground" },
]

export function Header() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="flex h-12 shrink-0 items-center justify-between rounded-2xl">
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 150"
          width="100"
          height="38"
        >
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
      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-5">
          {navItems.map((item) => (
            <Button
              key={item.href}
              className="font-medium"
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              size="sm"
              nativeButton={false}
              render={<Link href={item.href} />}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Sun className="absolute scale-0 dark:scale-100" />
          <Moon className="scale-100 dark:scale-0" />
        </Button>
      </div>
    </header>
  )
}
