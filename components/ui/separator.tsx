"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

const separatorLineClasses =
  "shrink-0 bg-border-soft data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch"

type SeparatorAlign = "start" | "center" | "end"
type SeparatorSpacing = "sm" | "md" | "lg"

const spacingClasses: Record<
  "horizontal" | "vertical",
  Record<SeparatorSpacing, string>
> = {
  horizontal: {
    sm: "my-1",
    md: "my-1.5",
    lg: "my-2.5",
  },
  vertical: {
    sm: "mx-1",
    md: "mx-1.5",
    lg: "mx-2.5",
  },
}

type SeparatorProps = Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "slot"
> & {
  slot?: boolean
  slotAlign?: SeparatorAlign
  slotClassName?: string
  spacing?: SeparatorSpacing
  children?: React.ReactNode
}

function Separator({
  className,
  orientation = "horizontal",
  slot = false,
  slotAlign = "center",
  slotClassName,
  spacing,
  children,
  ...props
}: SeparatorProps) {
  const spacingClass = spacing
    ? spacingClasses[orientation === "vertical" ? "vertical" : "horizontal"][
        spacing
      ]
    : undefined

  if (!slot) {
    return (
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(separatorLineClasses, spacingClass, className)}
        {...props}
      />
    )
  }

  if (orientation === "vertical") {
    return (
      <div
        data-slot="separator-wrapper"
        data-orientation="vertical"
        data-align={slotAlign}
        className={cn(
          "relative flex h-full shrink-0 flex-col items-center",
          slotAlign === "start"
            ? "justify-start"
            : slotAlign === "end"
              ? "justify-end"
              : "justify-center",
          spacingClass
        )}
      >
        <SeparatorPrimitive
          data-slot="separator"
          orientation="vertical"
          className={cn(
            "absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border-soft",
            className
          )}
          {...props}
        />
        <span
          data-slot="separator-slot"
          className={cn(
            "relative flex h-7 w-max shrink-0 items-center gap-2 rounded-md bg-primary px-2 py-1.5 text-base leading-base font-normal tracking-normal text-primary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            slotAlign === "start" && "top-4",
            slotAlign === "end" && "bottom-4",
            slotClassName
          )}
        >
          {children}
        </span>
      </div>
    )
  }

  return (
    <div
      data-slot="separator-wrapper"
      data-orientation="horizontal"
      data-align={slotAlign}
      className={cn(
        "relative flex h-7 w-full shrink-0 items-center",
        spacingClass
      )}
    >
      <SeparatorPrimitive
        data-slot="separator"
        orientation="horizontal"
        className={cn(separatorLineClasses, className)}
        {...props}
      />
      <span
        data-slot="separator-slot"
        className={cn(
          "absolute flex h-7 w-max shrink-0 items-center gap-2 rounded-md bg-primary px-2 py-1.5 text-base leading-base font-normal tracking-normal text-primary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          slotAlign === "start"
            ? "left-4"
            : slotAlign === "end"
              ? "right-4"
              : "left-1/2 -translate-x-1/2",
          slotClassName
        )}
      >
        {children}
      </span>
    </div>
  )
}

export { Separator }

// ## Separator Changelog (vs shadcn)
//
// ### Added
// - `slot` (boolean) prop — when `true`, the separator renders a wrapper
//   around the Base UI primitive with a styled pill overlay. `children` are
//   rendered inside the pill. When `false` (default), behavior matches
//   shadcn: a lone `SeparatorPrimitive`.
// - `slotAlign` prop (`"start" | "center" | "end"`) — positions the slot
//   along the separator line. Applies to both horizontal and vertical.
// - `slotClassName` prop — escape hatch to override slot styles per usage
//   without touching the wrapper `className`.
// - `spacing` prop (`"sm" | "md" | "lg"`) — adds cross-axis margin around
//   the separator. Applied to the primitive when there is no slot, and to
//   the wrapper when a slot is present. Direction is orientation-aware:
//   `my-*` for horizontal, `mx-*` for vertical.
// - `data-slot="separator-wrapper"`, `data-orientation`, and `data-align`
//   attributes on the slot wrapper, plus `data-slot="separator-slot"` on
//   the pill element, for styling/targeting from outside.
// - Vertical slot mode uses a flex-column wrapper sized by the slot, with
//   the separator line absolutely positioned behind it — so the wrapper's
//   width matches the slot and the line runs through its horizontal
//   center.
//
// ### Changed
// - `slot` (the HTML attribute of type `string`) is omitted from the
//   inherited primitive props so it can be redefined as a boolean without
//   TypeScript conflicts.
// - Return type is no longer always `SeparatorPrimitive` — it can now also
//   be a wrapping `<div>` when `slot` is enabled.
//
// ### Unchanged
// - The no-slot code path still renders `SeparatorPrimitive` directly and
//   forwards `className`, `orientation`, `style`, `render`, and other Base
//   UI props exactly like shadcn.
