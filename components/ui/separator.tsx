"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorLineClasses =
  "shrink-0 bg-border-soft data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch"

const separatorSlotVariants = cva(
  "flex h-7 w-max shrink-0 items-center gap-2 rounded-md bg-primary px-2 py-1.5 text-base leading-base font-normal tracking-normal text-primary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "",
      },
      slotAlign: {
        start: "",
        center: "",
        end: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      slotAlign: "center",
    },
  }
)

type SeparatorProps = Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "slot" | "children"
> & {
  slot?: boolean
  slotAlign?: "start" | "center" | "end"
  slotClassName?: string
  children?: React.ReactNode
}

function Separator({
  className,
  orientation = "horizontal",
  slot = false,
  slotAlign = "center",
  slotClassName,
  children,
  ...props
}: SeparatorProps) {
  if (!slot) {
    return (
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(separatorLineClasses, className)}
        {...props}
      />
    )
  }

  const isHorizontal = orientation === "horizontal"

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      data-align={slotAlign}
      className={cn(
        "relative flex shrink-0",
        isHorizontal ? "w-full" : "h-full flex-col",
        className
      )}
      {...props}
      render={(renderProps) => (
        <div {...renderProps}>
          <span
            aria-hidden="true"
            className={cn(
              "absolute bg-border-soft",
              isHorizontal
                ? "inset-x-0 top-1/2 h-px -translate-y-1/2"
                : "inset-y-0 left-1/2 w-px -translate-x-1/2"
            )}
          />
          <span
            data-slot="separator-slot"
            className={cn(
              "relative z-[1]",
              isHorizontal
                ? slotAlign === "start"
                  ? "ml-4"
                  : slotAlign === "end"
                    ? "mr-4 ml-auto"
                    : "mx-auto"
                : slotAlign === "start"
                  ? "mt-4"
                  : slotAlign === "end"
                    ? "mt-auto mb-4"
                    : "my-auto",
              separatorSlotVariants({ orientation, slotAlign }),
              slotClassName
            )}
          >
            {children}
          </span>
        </div>
      )}
    />
  )
}

export { Separator, separatorSlotVariants }
