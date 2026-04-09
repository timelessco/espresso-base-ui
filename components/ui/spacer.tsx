import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spacerVariants = cva("shrink-0 bg-transparent", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "h-full",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
      "3xl": "",
      "4xl": "",
    },
  },
  compoundVariants: [
    // vertical → height
    { orientation: "vertical", size: "sm", className: "h-1" },
    { orientation: "vertical", size: "md", className: "h-1.5" },
    { orientation: "vertical", size: "lg", className: "h-2" },
    { orientation: "vertical", size: "xl", className: "h-2.5" },
    { orientation: "vertical", size: "2xl", className: "h-3" },
    { orientation: "vertical", size: "3xl", className: "h-3.5" },
    { orientation: "vertical", size: "4xl", className: "h-4" },
    // horizontal → width
    { orientation: "horizontal", size: "sm", className: "w-1" },
    { orientation: "horizontal", size: "md", className: "w-1.5" },
    { orientation: "horizontal", size: "lg", className: "w-2" },
    { orientation: "horizontal", size: "xl", className: "w-2.5" },
    { orientation: "horizontal", size: "2xl", className: "w-3" },
    { orientation: "horizontal", size: "3xl", className: "w-3.5" },
    { orientation: "horizontal", size: "4xl", className: "w-4" },
  ],
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
})

type SpacerProps = React.ComponentProps<"div"> &
  VariantProps<typeof spacerVariants>

function Spacer({ className, orientation, size, ...props }: SpacerProps) {
  return (
    <div
      data-slot="spacer"
      data-orientation={orientation ?? "vertical"}
      aria-hidden="true"
      className={cn(spacerVariants({ orientation, size }), className)}
      {...props}
    />
  )
}

export { Spacer, spacerVariants }
