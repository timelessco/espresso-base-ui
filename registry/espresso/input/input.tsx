import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 border leading-base font-normal tracking-normal text-secondary-foreground transition-colors outline-none placeholder:text-card-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-input data-disabled:text-popover-foreground",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-border bg-primary-foreground not-data-disabled:hover:border-border-normal not-data-disabled:focus:border-primary-foreground not-data-disabled:focus:shadow-3xs not-data-disabled:active:border-border-strong not-data-disabled:active:shadow-md not-data-disabled:active:ring-0 data-filled:border-border data-invalid:border-error-outline data-valid:border-success-outline data-disabled:border-border [&:-webkit-autofill]:border-filled-outline group-data-[invalid=true]/field:border-error-outline!",
        subtle:
          "border-transparent bg-secondary not-data-disabled:hover:bg-muted not-data-disabled:focus:border-primary-foreground not-data-disabled:focus:bg-primary-foreground not-data-disabled:focus:shadow-3xs not-data-disabled:active:border-border-strong not-data-disabled:active:bg-primary-foreground not-data-disabled:active:shadow-md not-data-disabled:active:ring-0 data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success [&:-webkit-autofill]:bg-filled group-data-[invalid=true]/field:bg-error!",
      },
      size: {
        sm: "h-7 rounded-md px-2 py-1.5 text-base",
        md: "h-8 rounded-md px-2.5 py-2 text-base",
        lg: "h-10 rounded-lg px-3 py-2.75 text-lg",
        xl: "h-10 rounded-lg px-3 py-2.25 text-xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
)

function Input({
  className,
  type,
  variant,
  size,
  "data-invalid": dataInvalid,
  "data-disabled": dataDisabled,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    "data-invalid"?: string
    "data-disabled"?: string
  }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant ?? "outline"}
      data-size={size ?? "md"}
      {...(dataInvalid !== undefined && { "data-invalid": dataInvalid })}
      {...(dataDisabled !== undefined && { "data-disabled": dataDisabled })}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }

// ## Input Changelog
//
// ### Added
// - CVA-based `inputVariants`
// - Variant prop (`outline`, `subtle`) with `outline` as default
// - Size variants (`sm`, `md`, `lg`, `xl`) with `md` as default
// - `data-variant` and `data-size` attributes on the element
// - Exported `inputVariants`
// - Hover, active, and focus states for both variants
//
// ### Changed
// - Replaced inline className string with CVA variants
//
// ### Removed
// - `file:` styles
// - `md:text-sm` responsive text override
// - Dark mode overrides
