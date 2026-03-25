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
    "peer relative flex shrink-0 rounded-full border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed",
    // unchecked states
    "data-unchecked:border-primary/44 data-unchecked:hover:border-primary/68 data-unchecked:active:border-primary/75 data-unchecked:disabled:border-primary/20 data-unchecked:disabled:bg-secondary",
    "hover:shadow-control active:shadow-control",
    "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50",
    // checked states
    "data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:bg-primary/86 data-checked:active:bg-primary/74 data-checked:disabled:bg-primary/20",
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

const radioGroupIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-3.5 [&>span]:size-1.5",
      md: "size-4 [&>span]:size-1.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

function RadioGroupItem({
  className,
  size = "sm",
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
// - Size variants (`sm`: 14px, `md`: 16px) via CVA with `sm` as default
// - `data-size` attribute on `RadioGroupItem`
// - Exported `radioGroupItemVariants`
//
// ### Changed
// - Replaced inline className string with CVA-based `radioGroupItemVariants` and `radioGroupIndicatorVariants`
// - Indicator dot size scales with variant
//
// ### Removed
// - `aria-invalid` styles
// - `group/radio-group-item` class
