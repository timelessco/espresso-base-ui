"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

// The mobile app frame — a fixed, full-height column: a pinned header, a
// natively-scrolling content area, and a bottom-nav slot. Render this below the
// `md` breakpoint (via `useIsMobile`) as the counterpart to the desktop Sidebar
// layout, since mobile and desktop are different navigation models rather than
// one responsive component.
function MobileShell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="mobile-shell"
      className={cn(
        "flex h-dvh flex-col overflow-hidden bg-background text-foreground",
        className
      )}
      {...props}
    />
  )
}

function MobileShellHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="mobile-shell-header"
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4 pt-[env(safe-area-inset-top)]",
        className
      )}
      {...props}
    />
  )
}

function MobileShellContent({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="mobile-shell-content"
      className={cn(
        "scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain",
        className
      )}
      {...props}
    />
  )
}

// Bottom tab bar — an equal-width grid, so it adapts to any number of items.
function MobileNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="mobile-nav"
      className={cn(
        "grid shrink-0 auto-cols-fr grid-flow-col border-t border-border bg-background pb-[env(safe-area-inset-bottom)]",
        className
      )}
      {...props}
    />
  )
}

type MobileNavItemProps = {
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  active?: boolean
} & Omit<React.ComponentProps<"button">, "children">

// Each item takes a label + icon. Renders a router link when `href` is given,
// otherwise a button. `active` controls the highlight independently of the URL.
function MobileNavItem({
  label,
  icon,
  href,
  active,
  className,
  ...props
}: MobileNavItemProps) {
  const cls = cn(
    "flex flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors outline-none select-none [&_svg]:size-5 [&_svg]:shrink-0 data-[active=true]:text-primary not-data-[active=true]:hover:text-foreground",
    className
  )

  const content = (
    <>
      {icon}
      <span className="text-xs leading-none font-medium">{label}</span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        data-slot="mobile-nav-item"
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={cls}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      data-slot="mobile-nav-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cls}
      {...props}
    >
      {content}
    </button>
  )
}

export {
  MobileShell,
  MobileShellHeader,
  MobileShellContent,
  MobileNav,
  MobileNavItem,
}
