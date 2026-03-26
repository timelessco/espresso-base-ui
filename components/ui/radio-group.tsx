"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

const radioGroupItemVariants = cva(
  [
    "peer relative flex shrink-0 rounded-full border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:pointer-events-none data-disabled:cursor-not-allowed",
    // unchecked states
    "data-unchecked:border-card-foreground not-data-disabled:data-unchecked:hover:border-accent-foreground not-data-disabled:data-unchecked:hover:shadow-md not-data-disabled:data-unchecked:focus:border-primary not-data-disabled:data-unchecked:focus:ring-2 not-data-disabled:data-unchecked:focus:ring-ring not-data-disabled:data-unchecked:active:border-muted-foreground not-data-disabled:data-unchecked:active:bg-secondary not-data-disabled:data-unchecked:active:shadow-none not-data-disabled:data-unchecked:active:ring-0",
    // checked states
    "data-checked:bg-primary data-checked:text-primary-foreground not-data-disabled:data-checked:hover:bg-primary/86 not-data-disabled:data-checked:hover:shadow-md not-data-disabled:data-checked:focus:ring-2 not-data-disabled:data-checked:focus:ring-ring not-data-disabled:data-checked:active:bg-primary/74",
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

const radioGroupIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-3.5 [&>span]:size-1.5",
      default: "size-4 [&>span]:size-1.75",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function RadioGroupItem({
  className,
  size = "default",
  ...props
}: RadioPrimitive.Root.Props & VariantProps<typeof radioGroupItemVariants>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-size={size}
      className={cn(radioGroupItemVariants({ size, className }))}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={radioGroupIndicatorVariants({ size })}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem, radioGroupItemVariants }

// ## RadioGroup Changelog
//
// ### Added
// - CVA-based `radioGroupItemVariants` and `radioGroupIndicatorVariants`
// - Size variants (`sm`, `default`) with `default` as default
// - `data-size` attribute on `RadioGroupItem`
// - Exported `radioGroupItemVariants`
// - Hover, active, and focus states for unchecked and checked
// - `data-disabled:pointer-events-none` to prevent interaction when disabled
// - Indicator dot scales with size variant
//
// ### Changed
// - Replaced inline className string with CVA variants
//
// ### Removed
// - `aria-invalid` styles
// - `group/radio-group-item` class
// - `aspect-square` (redundant with `size-*` on a circle)
// - Dark mode overrides
