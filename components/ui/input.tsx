import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 leading-base font-normal tracking-normal text-secondary-foreground outline-none placeholder:text-card-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-popover-foreground",
  ],
  {
    variants: {
      variant: {
        outline:
          "bg-background shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_#00000012] transition-shadow duration-150 group-data-[invalid=true]/field:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)]! hover:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] not-data-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! data-filled:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--border)] data-invalid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)] data-valid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--success-outline)] dark:shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:not-data-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]! dark:enabled:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)] data-disabled:bg-transparent [&:-webkit-autofill]:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--filled-outline)]",
        subtle:
          "bg-secondary group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-muted not-data-disabled:focus:bg-background not-data-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success dark:not-data-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]! data-disabled:bg-input [&:-webkit-autofill]:bg-filled",
      },
      size: {
        sm: "h-7 rounded-md px-2 py-1.5 text-base",
        md: "h-8 rounded-md px-2.5 py-2 text-base",
        lg: "h-10 rounded-lg px-3 py-2.75 text-lg",
        xl: "h-10 rounded-lg px-3 py-2.25 text-xl",
      },
    },
    compoundVariants: [
      // outline variant: reduce height by 2px for each size to account for outer shadow ring
      { variant: "outline", size: "sm", className: "h-6.5!" },
      { variant: "outline", size: "md", className: "h-7.5!" },
      { variant: "outline", size: "lg", className: "h-9.5!" },
      { variant: "outline", size: "xl", className: "h-9.5!" },
    ],
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
