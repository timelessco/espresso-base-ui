"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

const checkboxVariants = cva(
  [
    "peer relative flex shrink-0 items-center justify-center rounded-[4px] border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed",
    // unchecked states
    "data-unchecked:border-primary/44 data-unchecked:hover:border-primary/68 data-unchecked:active:border-primary/75 data-unchecked:focus-visible:border-primary data-unchecked:focus-visible:ring-3 data-unchecked:focus-visible:ring-ring/50 data-unchecked:disabled:border-primary/20 data-unchecked:disabled:bg-secondary",
    // checked states
    "data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:bg-primary/86 data-checked:active:bg-primary/74 data-checked:focus-visible:bg-primary data-checked:focus-visible:ring-3 data-checked:focus-visible:ring-ring/50 data-checked:disabled:bg-primary/20",
    // indeterminate states
    "data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:hover:bg-primary/86 data-indeterminate:active:bg-primary/74 data-indeterminate:focus-visible:bg-primary data-indeterminate:focus-visible:ring-3 data-indeterminate:focus-visible:ring-ring/50 data-indeterminate:disabled:bg-primary/20",
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
        {indeterminate ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }
