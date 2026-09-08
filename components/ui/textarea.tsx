import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full leading-lg font-normal tracking-normal text-secondary-foreground outline-none placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_52%)] focus-visible:ring-2 focus-visible:ring-[rgba(201,201,201,0.9)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] disabled:placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] dark:placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_37%)] dark:disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)] dark:disabled:placeholder:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)]",
  ],
  {
    variants: {
      variant: {
        outline:
          "bg-transparent shadow-default transition-shadow duration-150 group-data-[invalid=true]/field:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)]! not-disabled:hover:shadow-raised not-disabled:focus:shadow-raised! disabled:bg-transparent disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] data-filled:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--border)] data-invalid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)] data-valid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--success-outline)] dark:disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)]",
        subtle:
          "bg-secondary not-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),black_2%)] not-disabled:focus:bg-background not-disabled:focus:shadow-raised! not-disabled:active:bg-background disabled:bg-input disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success dark:not-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),white_5%)] dark:disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)]",
        ghost:
          "bg-transparent not-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),black_2%)] not-disabled:focus:bg-background not-disabled:focus:shadow-raised! not-disabled:active:bg-primary-foreground disabled:bg-transparent disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_74%)] data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success dark:not-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),white_5%)] dark:disabled:text-[color-mix(in_oklch,var(--secondary-foreground),var(--background)_54%)]",
      },
      size: {
        xs: "min-h-12 rounded-sm px-2 py-1 text-sm",
        sm: "min-h-15 rounded-md px-2 py-1.5 text-base",
        md: "min-h-25.5 rounded-md px-3 py-2.5 text-base",
        lg: "min-h-31.5 rounded-lg px-3.5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
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
      data-size={size ?? "md"}
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
