"use client"

import * as React from "react"
import { Bell, House, Search, User } from "lucide-react"

import {
  MobileNav,
  MobileNavItem,
  MobileShell,
  MobileShellContent,
  MobileShellHeader,
} from "@/components/ui/mobile-shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const tabs = [
  { id: "home", label: "Home", icon: <House /> },
  { id: "search", label: "Search", icon: <Search /> },
  { id: "alerts", label: "Alerts", icon: <Bell /> },
  { id: "profile", label: "Profile", icon: <User /> },
]

export default function MobileShellPage() {
  const [active, setActive] = React.useState("home")

  return (
    <div className="flex flex-col gap-12 p-8">
      <div className="flex flex-col gap-4">
        <SectionTitle>Mobile Shell</SectionTitle>
        <p className="max-w-prose text-sm text-muted-foreground">
          A full-height mobile frame — a pinned header, a natively-scrolling
          content area, and a bottom <code>MobileNav</code>. Render it below the{" "}
          <code>md</code> breakpoint (via <code>useIsMobile()</code>) as the
          counterpart to the desktop sidebar layout. Shown here inside a device
          frame.
        </p>

        {/* Device frame (for preview on desktop). In an app, MobileShell fills
            the viewport with its default h-dvh. */}
        <div className="h-[760px] w-[380px] overflow-hidden rounded-[2.25rem] border-8 border-foreground/90 bg-background shadow-elevation-md">
          <MobileShell className="h-full">
            <MobileShellHeader>
              <span className="text-base font-medium text-foreground capitalize">
                {active}
              </span>
            </MobileShellHeader>

            <MobileShellContent className="flex flex-col gap-3 p-4">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border-soft bg-card p-3"
                >
                  <Avatar className="size-9">
                    <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {tabs.find((t) => t.id === active)?.label} item {i + 1}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Scroll the content — the header and nav stay pinned.
                    </span>
                  </div>
                </div>
              ))}
            </MobileShellContent>

            <MobileNav>
              {tabs.map((tab) => (
                <MobileNavItem
                  key={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  active={active === tab.id}
                  onClick={() => setActive(tab.id)}
                />
              ))}
            </MobileNav>
          </MobileShell>
        </div>
      </div>
    </div>
  )
}
