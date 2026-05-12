import * as React from "react"

import { cn } from "@/lib/utils"

type HeaderProps = React.ComponentProps<"header"> & {
  leftControls?: React.ReactNode
  centerControls?: React.ReactNode
  rightControls?: React.ReactNode
}

function Header({
  className,
  leftControls,
  centerControls,
  rightControls,
  children,
  ...props
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        "flex shrink-0 items-center gap-3 border-b border-border-soft bg-background px-3 py-2",
        className
      )}
      {...props}
    >
      {leftControls !== undefined && (
        <div
          data-slot="header-left"
          className="flex min-w-0 items-center gap-2"
        >
          {leftControls}
        </div>
      )}
      {centerControls !== undefined && (
        <div
          data-slot="header-center"
          className="flex flex-1 items-center justify-center gap-2"
        >
          {centerControls}
        </div>
      )}
      {rightControls !== undefined && (
        <div
          data-slot="header-right"
          className="ml-auto flex items-center gap-2"
        >
          {rightControls}
        </div>
      )}
      {children}
    </header>
  )
}

function HeaderSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="header-separator"
      className={cn("h-5 w-px shrink-0 bg-border-soft", className)}
      {...props}
    />
  )
}

export { Header, HeaderSeparator, type HeaderProps }
