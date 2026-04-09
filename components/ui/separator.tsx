"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorLineClasses =
  "shrink-0 bg-border-soft data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch"

const separatorSpacingVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "",
    },
    spacing: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", spacing: "sm", className: "my-1" },
    { orientation: "horizontal", spacing: "md", className: "my-1.5" },
    { orientation: "horizontal", spacing: "lg", className: "my-2.5" },
    { orientation: "vertical", spacing: "sm", className: "mx-1" },
    { orientation: "vertical", spacing: "md", className: "mx-1.5" },
    { orientation: "vertical", spacing: "lg", className: "mx-2.5" },
  ],
})

const separatorWrapperVariants = cva("relative flex shrink-0", {
  variants: {
    orientation: {
      horizontal: "h-7 w-full items-center",
      vertical: "h-full flex-col items-center",
    },
    slotAlign: {
      start: "",
      center: "",
      end: "",
    },
  },
  compoundVariants: [
    { orientation: "vertical", slotAlign: "start", className: "justify-start" },
    {
      orientation: "vertical",
      slotAlign: "center",
      className: "justify-center",
    },
    { orientation: "vertical", slotAlign: "end", className: "justify-end" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    slotAlign: "center",
  },
})

const separatorSlotVariants = cva(
  "flex h-7 w-max shrink-0 items-center gap-2 rounded-md bg-primary px-2 py-1.5 text-base leading-base font-normal tracking-normal text-primary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      orientation: {
        horizontal: "absolute",
        vertical: "relative",
      },
      slotAlign: {
        start: "",
        center: "",
        end: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", slotAlign: "start", className: "left-4" },
      {
        orientation: "horizontal",
        slotAlign: "center",
        className: "left-1/2 -translate-x-1/2",
      },
      { orientation: "horizontal", slotAlign: "end", className: "right-4" },
      { orientation: "vertical", slotAlign: "start", className: "top-4" },
      { orientation: "vertical", slotAlign: "end", className: "bottom-4" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      slotAlign: "center",
    },
  }
)

type SeparatorAlign = NonNullable<
  VariantProps<typeof separatorSlotVariants>["slotAlign"]
>
type SeparatorSpacing = NonNullable<
  VariantProps<typeof separatorSpacingVariants>["spacing"]
>

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
  const spacingClass = separatorSpacingVariants({ orientation, spacing })

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

  const isVertical = orientation === "vertical"

  return (
    <div
      data-slot="separator-wrapper"
      data-orientation={orientation}
      data-align={slotAlign}
      className={cn(
        separatorWrapperVariants({ orientation, slotAlign }),
        spacingClass
      )}
    >
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(
          isVertical
            ? "absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border-soft"
            : separatorLineClasses,
          className
        )}
        {...props}
      />
      <span
        data-slot="separator-slot"
        className={cn(
          separatorSlotVariants({ orientation, slotAlign }),
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
// shadcn ships a single pass-through wrapper around `SeparatorPrimitive`
// with no variants. This component extends that baseline with CVA-driven
// spacing and a compositional slot API.
//
// ### Added
// - `slot` (boolean) prop — when `true`, renders a wrapper `<div>` around
//   the Base UI primitive containing a styled pill element, and uses
//   `children` as the pill content. When `false` (default), behavior
//   matches shadcn: a lone `SeparatorPrimitive`.
// - `slotAlign` prop (`"start" | "center" | "end"`) — positions the slot
//   along the separator line. Works for both orientations.
// - `slotClassName` prop — override slot pill styles per usage without
//   touching the wrapper `className`.
// - `spacing` prop (`"sm" | "md" | "lg"`) — orientation-aware cross-axis
//   margin (`my-*` horizontal, `mx-*` vertical). Applied to the primitive
//   when no slot, and to the wrapper when a slot is present.
// - Extra data attributes when a slot is rendered:
//   `data-slot="separator-wrapper"`, `data-orientation`, `data-align` on
//   the wrapper, and `data-slot="separator-slot"` on the pill.
//
// ### CVA migration
// - Replaced the inline conditional class strings from earlier iterations
//   with three `cva` definitions:
//   - `separatorSpacingVariants` — `orientation × spacing` compound
//     variants produce the `my-*` / `mx-*` classes.
//   - `separatorWrapperVariants` — handles the wrapper's flex layout and
//     vertical `justify-*` alignment for the slot.
//   - `separatorSlotVariants` — positions the slot pill (`absolute` for
//     horizontal, `relative` for vertical) and applies `slotAlign`-driven
//     offsets via compound variants.
// - The horizontal and vertical slot render paths are merged into a
//   single branch; orientation-specific behavior lives in the CVAs.
// - `SeparatorAlign` and `SeparatorSpacing` types are derived from the
//   CVA `VariantProps`, keeping the prop types and class maps in sync.
//
// ### Type changes
// - `slot` (the native HTML attribute, `string`) is `Omit`ted from the
//   inherited primitive props so it can be redefined as a boolean.
// - The component can now return either `SeparatorPrimitive` (no slot) or
//   a wrapping `<div>` (slot enabled); shadcn always returns the former.
//
// ### Unchanged
// - The no-slot path still forwards `className`, `orientation`, `style`,
//   `render`, and other Base UI primitive props exactly like shadcn.
