import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 leading-base font-normal tracking-normal text-secondary-foreground outline-none placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_52%)] focus-visible:ring-2 focus-visible:ring-[rgba(201,201,201,0.9)] dark:placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_37%)] data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] data-disabled:placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] dark:data-disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)] dark:data-disabled:placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)]",
  ],
  {
    variants: {
      variant: {
        outline:
          "bg-transparent shadow-default transition-shadow duration-150 group-data-[invalid=true]/field:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)]! hover:shadow-raised not-data-disabled:focus:shadow-raised! data-filled:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--border)] data-invalid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)] data-valid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--success-outline)] data-disabled:bg-transparent [&:-webkit-autofill]:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--filled-outline)]",
        subtle:
          "bg-secondary group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),black_2%)] not-data-disabled:focus:bg-background not-data-disabled:focus:shadow-raised! data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success dark:not-data-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),white_5%)] data-disabled:bg-input [&:-webkit-autofill]:bg-filled",
        ghost:
          "bg-transparent group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),black_2%)] not-data-disabled:focus:bg-background not-data-disabled:focus:shadow-raised! data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success dark:not-data-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),white_5%)] data-disabled:bg-transparent [&:-webkit-autofill]:bg-filled",
      },
      size: {
        xs: "h-6 rounded-sm px-2 py-1 text-sm",
        sm: "h-7 rounded-md px-2 py-1.5 text-base",
        md: "h-8 rounded-md px-2.5 py-2 text-base",
        lg: "h-10 rounded-lg px-3 py-2.75 text-lg",
      },
    },
    compoundVariants: [
      // outline variant: reduce height by 2px for each size to account for outer shadow ring
      { variant: "outline", size: "xs", className: "h-5.5!" },
      { variant: "outline", size: "sm", className: "h-6.5!" },
      { variant: "outline", size: "md", className: "h-7.5!" },
      { variant: "outline", size: "lg", className: "h-9.5!" },
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
// - Variant prop (`outline`, `subtle`, `ghost`) with `outline` as default
// - Size variants (`xs`, `sm`, `md`, `lg`) with `md` as default
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
