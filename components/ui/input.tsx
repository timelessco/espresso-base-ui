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
          "border-accent bg-primary-foreground hover:border-popover-foreground hover:shadow-4xs focus:border-primary-foreground focus:shadow-3xs active:border-card-foreground active:shadow-md active:ring-0 data-disabled:border-accent data-[valid=true]:border-input-valid-border data-[invalid=true]:border-input-invalid-border data-[filled=true]:border-input-filled-border",
        subtle:
          "border-transparent bg-secondary hover:bg-muted focus:border-primary-foreground focus:bg-primary-foreground focus:shadow-3xs active:border-card-foreground active:bg-primary-foreground active:shadow-md active:ring-0 data-disabled:bg-input data-[valid=true]:bg-input-valid data-[invalid=true]:bg-input-invalid data-[filled=true]:bg-input-filled",
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
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant ?? "outline"}
      data-size={size ?? "md"}
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
