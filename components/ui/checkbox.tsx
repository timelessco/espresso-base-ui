"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "peer relative flex shrink-0 items-center justify-center rounded-[4px] border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed",
    // unchecked states
    "data-unchecked:border-primary/44 data-unchecked:hover:border-primary/68 data-unchecked:hover:shadow-sm data-unchecked:active:border-primary/75 data-unchecked:focus-visible:border-primary data-unchecked:focus-visible:ring-3 data-unchecked:focus-visible:ring-ring/50 data-unchecked:disabled:border-primary/20 data-unchecked:disabled:bg-secondary",
    // checked states
    "data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:bg-primary/86 data-checked:hover:shadow-sm data-checked:active:bg-primary/74 data-checked:focus-visible:bg-primary data-checked:focus-visible:ring-3 data-checked:focus-visible:ring-ring/50 data-checked:disabled:bg-primary/20",
    // indeterminate states
    "data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:hover:bg-primary/86 data-indeterminate:hover:shadow-sm data-indeterminate:active:bg-primary/74 data-indeterminate:focus-visible:bg-primary data-indeterminate:focus-visible:ring-3 data-indeterminate:focus-visible:ring-ring/50 data-indeterminate:disabled:bg-primary/20",
  ],
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

const checkboxIndicatorVariants = cva(
  "grid place-content-center text-current transition-none",
  {
    variants: {
      size: {
        sm: "[&>svg]:size-2.5",
        md: "[&>svg]:size-3",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function Checkbox({
  className,
  size = "sm",
  indeterminate,
  ...props
}: CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      indeterminate={indeterminate}
      className={cn(checkboxVariants({ size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorVariants({ size })}
      >
        {indeterminate ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2 4.99995C2 4.72381 2.22386 4.49995 2.5 4.49995H7.5C7.77614 4.49995 8 4.72381 8 4.99995C8 5.2761 7.77614 5.49995 7.5 5.49995H2.5C2.22386 5.49995 2 5.2761 2 4.99995Z" fill="currentColor"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.74012 1.93999C8.94911 2.12048 8.97221 2.43622 8.79172 2.64521L4.16 8.00825C4.06619 8.11687 3.93022 8.17995 3.78671 8.18141C3.64319 8.18288 3.50596 8.1226 3.40994 8.01592L1.21597 5.57818C1.03124 5.37292 1.04788 5.05678 1.25314 4.87205C1.45839 4.68732 1.77454 4.70396 1.95927 4.90921L3.77386 6.92542L8.0349 1.99159C8.21539 1.7826 8.53113 1.75949 8.74012 1.93999Z" fill="currentColor"/>
          </svg>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }
