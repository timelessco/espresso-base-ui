"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "peer relative flex shrink-0 items-center justify-center rounded-2xs border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:border-popover-foreground data-disabled:bg-input data-disabled:data-checked:border-muted data-disabled:data-checked:bg-muted data-[disabled]:data-[checked]:[&_svg]:text-card-foreground",
    // unchecked states
    "data-unchecked:border-card-foreground not-data-disabled:data-unchecked:hover:border-accent-foreground not-data-disabled:data-unchecked:hover:shadow-sm not-data-disabled:data-unchecked:focus:border-primary not-data-disabled:data-unchecked:focus:ring-0 not-data-disabled:data-unchecked:focus:ring-ring not-data-disabled:data-unchecked:active:border-muted-foreground",
    // checked states
    "data-checked:bg-primary data-checked:text-primary-foreground not-data-disabled:data-checked:hover:bg-primary/86 not-data-disabled:data-checked:hover:shadow-sm not-data-disabled:data-checked:focus:ring-2 not-data-disabled:data-checked:focus:ring-ring not-data-disabled:data-checked:active:bg-primary/74",
    // invalid states
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:data-checked:border-primary",
  ],
  {
    variants: {
      size: {
        sm: "size-3.5",
        default: "size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const checkboxIndicatorVariants = cva(
  "grid place-content-center text-current transition-none",
  {
    variants: {
      size: {
        sm: "[&>svg]:size-2.5",
        default: "[&>svg]:size-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Checkbox({
  className,
  size = "default",
  ...props
}: CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(checkboxVariants({ size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorVariants({ size })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M8.03488 1.99125C8.2154 1.78244 8.53103 1.76003 8.73996 1.94047C8.94881 2.12099 8.97216 2.43661 8.79172 2.64555L4.15988 8.00785C4.0661 8.11645 3.9303 8.18018 3.78683 8.18168C3.64331 8.18315 3.50589 8.12235 3.40988 8.01567L1.21554 5.57817C1.03111 5.373 1.04775 5.05681 1.25265 4.87211C1.45791 4.68738 1.77496 4.70397 1.95968 4.90922L3.77316 6.92485L8.03488 1.99125Z"
            fill="currentColor"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }
