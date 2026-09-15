"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

// The mobile app frame, modeled on frappe-ui's MobileShell — a fixed,
// full-height column: a pinned header, a natively-scrolling content area, and
// a bottom-nav slot. Render this below the `md` breakpoint (via
// `useIsMobile`) as the counterpart to the desktop Sidebar layout, since
// mobile and desktop are different navigation models rather than one
// responsive component. For modal surfaces inside the shell, pair it with the
// Drawer component (the thumb-reachable counterpart to Dialog).
function MobileShell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="mobile-shell"
      className={cn(
        "fixed inset-0 flex touch-none flex-col overflow-hidden bg-background text-foreground",
        className
      )}
      {...props}
    />
  )
}

// A fixed-height header (--mobile-header-height, 64px) so a long title can
// never wrap and shift the page as the user navigates. The title stays
// centered on a single line: the side columns share free space equally, and
// their min-content floor means a wide control claims what it needs (the
// title yields and truncates) instead of being overlapped. Extra top padding
// clears the notch / status bar when running as an installed PWA.
function MobileShellHeader({
  prefix,
  suffix,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"header">, "prefix"> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}) {
  return (
    <header
      data-slot="mobile-shell-header"
      className={cn(
        "z-10 grid h-[var(--mobile-header-height,64px)] shrink-0 grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-2 border-b border-border-soft bg-background px-4 [@media(display-mode:standalone)]:h-[calc(var(--mobile-header-height,64px)+env(safe-area-inset-top,0px))] [@media(display-mode:standalone)]:pt-[env(safe-area-inset-top)]",
        className
      )}
      {...props}
    >
      <div
        data-slot="mobile-shell-header-prefix"
        className="flex min-w-0 items-center justify-self-start"
      >
        {prefix}
      </div>
      {/* Skipped when the title lives in the prefix (left-aligned layout) so
          no empty heading is announced. */}
      {children != null && (
        <h1 className="min-w-0 truncate text-center text-lg leading-tight font-semibold text-foreground">
          {children}
        </h1>
      )}
      <div
        data-slot="mobile-shell-header-suffix"
        className="col-start-3 flex items-center justify-self-end"
      >
        {suffix}
      </div>
    </header>
  )
}

// Native momentum scroll (not a custom scrollbar) — a mobile surface wants
// the platform's own inertia and overscroll.
function MobileShellContent({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="mobile-shell-content"
      className={cn(
        "scrollbar-hide min-h-0 flex-1 touch-auto overflow-y-auto overscroll-auto [-webkit-overflow-scrolling:touch]",
        className
      )}
      {...props}
    />
  )
}

// Bottom tab bar — a bare grid frame where each item becomes one equal-width
// column, so the bar adapts to any item count. Bottom padding clears the home
// indicator in an installed PWA.
function MobileNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="mobile-nav"
      className={cn(
        "grid h-16 shrink-0 auto-cols-fr grid-flow-col border-t border-border-soft bg-background [@media(display-mode:standalone)]:h-[calc(--spacing(16)+--spacing(4))] [@media(display-mode:standalone)]:pb-4",
        className
      )}
      {...props}
    />
  )
}

// Tapping the already-active item scrolls the shell's content back to the
// top instead of re-navigating.
function scrollShellToTop(target: HTMLElement) {
  target
    .closest('[data-slot="mobile-shell"]')
    ?.querySelector('[data-slot="mobile-shell-content"]')
    ?.scrollTo({ top: 0, behavior: "smooth" })
}

type MobileNavItemProps = {
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  active?: boolean
} & Omit<React.ComponentProps<"button">, "children">

// Each item is an icon-only tab; `label` is its accessible name. Renders a
// router link when `href` is given and the item isn't current; the active
// item is a button whose tap scrolls to top. `active` controls the highlight
// independently of the URL (so one tab can stay lit across a section).
function MobileNavItem({
  label,
  icon,
  href,
  active,
  className,
  onClick,
  ...props
}: MobileNavItemProps) {
  const cls = cn(
    "flex min-h-14 flex-col items-center justify-center text-muted-foreground transition outline-none select-none active:scale-95 data-[active=true]:text-foreground [&_svg]:size-6 [&_svg]:shrink-0",
    className
  )

  const content = icon

  // A real link when navigating somewhere new; a plain button when this item
  // is already active (tap = scroll to top). Switching the element keeps the
  // scroll-vs-navigate decision unambiguous.
  if (href && !active) {
    return (
      <Link
        href={href}
        data-slot="mobile-nav-item"
        data-active={undefined}
        aria-label={typeof label === "string" ? label : undefined}
        className={cls}
        onClick={onClick as React.MouseEventHandler}
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
      aria-label={typeof label === "string" ? label : undefined}
      className={cls}
      onClick={(event) => {
        if (active) scrollShellToTop(event.currentTarget)
        onClick?.(event)
      }}
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
