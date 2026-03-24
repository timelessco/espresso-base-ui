"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  [
    "flex w-fit items-center gap-2 rounded-md leading-normal tracking-normal transition-colors outline-none select-none",
    "text-muted-foreground hover:bg-muted hover:text-muted-foreground",
    "focus-within:bg-secondary focus-within:text-secondary-foreground focus-within:ring-2 focus-within:ring-ring",
    "active:bg-accent active:text-secondary-foreground",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "p-1.5 text-base font-normal",
        md: "px-2 py-1.75 text-lg font-medium",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function Label({
  className,
  size,
  ...props
}: React.ComponentProps<"label"> & VariantProps<typeof labelVariants>) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ size, className }))}
      {...props}
    />
  )
}

export { Label, labelVariants }
