"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ArrowUpRight, Monitor, Moon, Smartphone, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Dashboards shown on the home page. Add more entries as demos are built.
const demos = [
  { name: "CRM", href: "/crm" },
  { name: "Helpdesk", href: "/helpdesk" },
  { name: "Drive", href: "/drive" },
  { name: "Mail", href: "/mail" },
  { name: "Gameplan", href: "/gameplan" },
]

function SiteHeader({ scrolled }: { scrolled: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background transition-colors",
        scrolled ? "border-border-soft" : "border-transparent"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <span className="text-xl font-semibold text-foreground">
          Espresso UI
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 py-12 text-center sm:gap-5 sm:py-16 lg:py-24">
      <h1 className="max-w-3xl text-6xl leading-10 font-semibold tracking-tight text-foreground sm:text-10xl sm:leading-14">
        Build beautiful interfaces fast
      </h1>
      <p className="max-w-2xl text-lg leading-5 text-muted-foreground sm:text-xl sm:leading-6">
        Battle-tested components built for real-world applications. Good
        defaults helping you ship faster.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/docs/installation">Get started</Link>}
        />
        <Button
          variant="secondary"
          size="lg"
          nativeButton={false}
          render={<Link href="/ui/alert">Components</Link>}
        />
      </div>
    </section>
  )
}

// Each demo renders in an iframe so it gets its own viewport — selecting
// "Mobile" gives the app a phone-width window, so its own mobile behaviors
// (sidebar sheet, mobile shell) activate naturally, like the frappe-ui viewer.
function DemoViewer({ name, href }: { name: string; href: string }) {
  const [viewport, setViewport] = React.useState("desktop")
  const isMobile = viewport === "mobile"

  return (
    <section
      id={`${name.toLowerCase()}-demo`}
      className="flex scroll-mt-20 flex-col gap-3"
    >
      <div className="flex items-center justify-between gap-3">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-1 text-lg font-medium text-foreground"
        >
          {name}
          <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </a>

        <Tabs
          value={viewport}
          onValueChange={(value) => setViewport(value as string)}
        >
          <TabsList size="sm">
            <TabsTrigger value="desktop" aria-label="Desktop view">
              <Monitor />
            </TabsTrigger>
            <TabsTrigger value="mobile" aria-label="Mobile view">
              <Smartphone />
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>

      {/* Constant-size block: desktop fills it; mobile floats a phone frame
          on a muted backdrop, like the frappe-ui viewer. */}
      <div
        className={cn(
          "h-[840px] overflow-hidden rounded-xl border border-border-soft",
          isMobile ? "bg-[#f3f3f3] dark:bg-[#2b2b2b]" : "bg-background"
        )}
      >
        {isMobile ? (
          <div className="flex h-full items-center justify-center p-4 sm:p-8">
            <div className="h-full w-[390px] max-w-full overflow-hidden rounded-xl border border-border-soft bg-background shadow-elevation-sm">
              <iframe
                src={href}
                title={`${name} demo`}
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </div>
        ) : (
          <iframe
            src={href}
            title={`${name} demo`}
            loading="lazy"
            className="h-full w-full"
          />
        )}
      </div>
    </section>
  )
}

export default function HomePage() {
  // The root layout locks <body> scrolling (each screen owns its scroll
  // container), so the page provides its own scroll region.
  const [scrolled, setScrolled] = React.useState(false)

  return (
    <div
      className="h-dvh overflow-y-auto"
      onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 0)}
    >
      <SiteHeader scrolled={scrolled} />
      <main className="mx-auto flex max-w-7xl flex-col px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <Hero />
        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-40">
          {demos.map((demo) => (
            <DemoViewer key={demo.href} {...demo} />
          ))}
        </div>
      </main>
    </div>
  )
}
