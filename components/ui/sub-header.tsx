import * as React from "react"

import { cn } from "@/lib/utils"

type SubHeaderProps = React.ComponentProps<"div"> & {
  leftControls?: React.ReactNode
  rightControls?: React.ReactNode
}

// A secondary toolbar row that sits below a Header: a left slot for filters,
// titles or toolbars and a right slot for view controls and actions.
function SubHeader({
  className,
  leftControls,
  rightControls,
  children,
  ...props
}: SubHeaderProps) {
  return (
    <div
      data-slot="sub-header"
      className={cn(
        "flex shrink-0 items-center gap-3 bg-background p-0.5",
        className
      )}
      {...props}
    >
      {leftControls !== undefined && (
        <div
          data-slot="sub-header-left"
          className="flex min-w-0 items-center gap-2"
        >
          {leftControls}
        </div>
      )}
      {rightControls !== undefined && (
        <div
          data-slot="sub-header-right"
          className="ml-auto flex shrink-0 items-center gap-2"
        >
          {rightControls}
        </div>
      )}
      {children}
    </div>
  )
}

function SubHeaderSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="sub-header-separator"
      className={cn("h-5 w-px shrink-0 bg-border-soft", className)}
      {...props}
    />
  )
}

export { SubHeader, SubHeaderSeparator, type SubHeaderProps }
