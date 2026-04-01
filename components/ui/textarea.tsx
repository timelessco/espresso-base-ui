import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full border leading-base font-normal tracking-normal text-secondary-foreground transition-colors outline-none placeholder:text-card-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-input data-disabled:text-popover-foreground",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-border bg-primary-foreground not-data-disabled:hover:border-border-normal not-data-disabled:focus:bg-primary-foreground not-data-disabled:focus:shadow-3xs not-data-disabled:active:border-border-stronger data-disabled:bg-input data-disabled:text-popover-foreground data-[valid=true]:border-input-valid-outline data-[invalid=true]:border-input-invalid-outline data-[filled=true]:border-border",
        subtle:
          "border-transparent bg-secondary not-data-disabled:hover:bg-muted not-data-disabled:focus:bg-primary-foreground not-data-disabled:focus:shadow-3xs not-data-disabled:active:border-border-stronger not-data-disabled:active:bg-primary-foreground data-disabled:bg-input data-disabled:text-popover-foreground data-[valid=true]:bg-input-valid data-[invalid=true]:bg-input-invalid data-[filled=true]:bg-secondary",
        ghost:
          "border-transparent bg-transparent not-data-disabled:hover:bg-muted not-data-disabled:focus:border-transparent not-data-disabled:focus:bg-primary-foreground not-data-disabled:focus:shadow-3xs not-data-disabled:active:border-transparent! not-data-disabled:active:bg-primary-foreground data-disabled:bg-transparent data-disabled:text-popover-foreground data-[valid=true]:bg-input-valid data-[invalid=true]:bg-input-invalid data-[filled=true]:bg-secondary",
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
  disabled,
  "data-invalid": dataInvalid,
  "data-disabled": dataDisabled,
  ...props
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    "data-invalid"?: string
    "data-disabled"?: string
    "data-valid"?: string
    "data-filled"?: string
  }) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant ?? "outline"}
      data-size={size ?? "default"}
      data-invalid={dataInvalid}
      data-disabled={disabled || dataDisabled === "true" ? "true" : undefined}
      disabled={disabled}
      aria-invalid={dataInvalid === "true" || undefined}
      aria-disabled={disabled || dataDisabled === "true" || undefined}
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
