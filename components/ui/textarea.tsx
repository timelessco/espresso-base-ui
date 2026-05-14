import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full border leading-base font-normal tracking-normal text-secondary-foreground transition-colors outline-none placeholder:text-card-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input disabled:text-popover-foreground",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-border bg-primary-foreground not-disabled:hover:border-border-normal not-disabled:focus:bg-primary-foreground not-disabled:focus:shadow-3xs not-disabled:active:border-border-stronger disabled:bg-input disabled:text-popover-foreground data-valid:border-success-outline data-invalid:border-error-outline data-filled:border-border",
        subtle:
          "border-transparent bg-secondary not-disabled:hover:bg-muted not-disabled:focus:bg-primary-foreground not-disabled:focus:shadow-3xs not-disabled:active:border-border-stronger not-disabled:active:bg-primary-foreground disabled:bg-input disabled:text-popover-foreground data-valid:bg-success data-invalid:bg-error data-filled:bg-secondary",
        ghost:
          "border-transparent bg-transparent not-disabled:hover:bg-muted not-disabled:focus:border-transparent not-disabled:focus:bg-primary-foreground not-disabled:focus:shadow-3xs not-disabled:active:border-transparent! not-disabled:active:bg-primary-foreground disabled:bg-transparent disabled:text-popover-foreground data-valid:bg-success data-invalid:bg-error data-filled:bg-secondary",
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
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>) {
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
