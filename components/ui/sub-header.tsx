import * as React from "react"

import { cn } from "@/lib/utils"

type SubHeaderProps = React.ComponentProps<"div"> & {
  leftControls?: React.ReactNode
  rightControls?: React.ReactNode
}

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
        "flex shrink-0 items-center justify-between gap-3 bg-background px-5 py-3",
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
        <div data-slot="sub-header-right" className="flex items-center gap-2">
          {rightControls}
        </div>
      )}
      {children}
    </div>
  )
}

export { SubHeader, type SubHeaderProps }
