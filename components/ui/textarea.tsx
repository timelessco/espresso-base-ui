import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full border font-normal leading-base tracking-normal text-secondary-foreground transition-colors outline-none placeholder:text-card-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input disabled:text-popover-foreground",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-border bg-primary-foreground hover:border-popover-foreground active:border-secondary-foreground focus:bg-primary-foreground focus:shadow-3xs disabled:bg-input disabled:text-popover-foreground",
        subtle:
          "border-transparent bg-secondary hover:bg-muted active:bg-primary-foreground active:border-secondary-foreground focus:bg-primary-foreground focus:shadow-3xs disabled:bg-input disabled:text-popover-foreground",
        ghost:
          "border-transparent bg-transparent hover:bg-muted focus:bg-primary-foreground focus:shadow-3xs active:bg-primary-foreground active:border-secondary-foreground disabled:bg-transparent disabled:text-popover-foreground",
      },
      size: {
        sm: "min-h-15 rounded-md px-2 py-1.5 text-base",
        default: "min-h-25.5 rounded-lg px-3 py-2.5 text-lg",
        lg: "min-h-31.5 rounded-lg px-3.5 py-3 text-xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant ?? "outline"}
      data-size={size ?? "default"}
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
