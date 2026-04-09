"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

const separatorLineClasses =
  "shrink-0 bg-border-soft data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch"

type SeparatorAlign = "start" | "center" | "end"

type SeparatorProps = Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "slot"
> & {
  slot?: React.ReactNode
  slotAlign?: SeparatorAlign
  slotClassName?: string
}

function Separator({
  className,
  orientation = "horizontal",
  slot,
  slotAlign = "center",
  slotClassName,
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
              : "justify-center"
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
          {slot}
        </span>
      </div>
    )
  }

  return (
    <div
      data-slot="separator-wrapper"
      data-orientation="horizontal"
      data-align={slotAlign}
      className="relative flex h-7 w-full shrink-0 items-center"
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
        {slot}
      </span>
    </div>
  )
}

export { Separator }
