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
    "group/radio peer relative flex shrink-0 rounded-full border border-transparent transition-all duration-[250ms] ease-[ease] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 not-data-disabled:active:scale-[0.97] not-data-disabled:data-pressed:scale-[0.97] data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:data-checked:border-[color-mix(in_oklch,var(--primary),var(--background)_93%)] data-disabled:data-checked:bg-[color-mix(in_oklch,var(--primary),var(--background)_93%)] data-disabled:data-unchecked:border-[color-mix(in_oklch,var(--primary),var(--background)_79%)] data-disabled:data-unchecked:bg-[color-mix(in_oklch,var(--primary),var(--background)_97%)] dark:data-disabled:data-checked:border-[color-mix(in_oklch,var(--primary),var(--background)_84%)] dark:data-disabled:data-checked:bg-[color-mix(in_oklch,var(--primary),var(--background)_84%)] dark:data-disabled:data-unchecked:border-[color-mix(in_oklch,var(--primary),var(--background)_67%)] dark:data-disabled:data-unchecked:bg-[color-mix(in_oklch,var(--primary),var(--background)_96%)]",
    // unchecked states
    "data-unchecked:border-[color-mix(in_oklch,var(--primary),var(--background)_60%)] dark:data-unchecked:border-[color-mix(in_oklch,var(--primary),var(--background)_56%)] not-data-disabled:data-unchecked:hover:border-[color-mix(in_oklch,var(--primary),var(--background)_48%)] dark:not-data-disabled:data-unchecked:hover:border-[color-mix(in_oklch,var(--primary),var(--background)_52%)] not-data-disabled:data-unchecked:hover:shadow-elevation-sm not-data-disabled:data-unchecked:focus-visible:border-primary not-data-disabled:data-unchecked:focus-visible:shadow-3xs! not-data-disabled:data-unchecked:active:border-[color-mix(in_oklch,var(--primary),var(--background)_29%)] dark:not-data-disabled:data-unchecked:active:border-[color-mix(in_oklch,var(--primary),var(--background)_38%)] not-data-disabled:data-unchecked:active:bg-[color-mix(in_oklch,var(--primary),var(--background)_95%)] dark:not-data-disabled:data-unchecked:active:bg-[color-mix(in_oklch,var(--primary),var(--background)_89%)] not-data-disabled:data-unchecked:active:shadow-none!",
    // checked states
    "data-checked:bg-primary data-checked:text-primary-foreground not-data-disabled:data-checked:hover:bg-primary/86 not-data-disabled:data-checked:focus-visible:shadow-3xs! not-data-disabled:data-checked:active:bg-primary/74",
    // invalid state (self + Field context)
    "data-invalid:border-destructive! data-invalid:ring-2! data-invalid:ring-destructive/20! data-invalid:data-checked:border-destructive!",
    "group-data-[invalid=true]/field:border-destructive! group-data-[invalid=true]/field:ring-2! group-data-[invalid=true]/field:ring-destructive/20! group-data-[invalid=true]/field:data-checked:border-destructive!",
  ],
  {
    variants: {
      size: {
        xs: "size-[13px]",
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
      xs: "size-[13px] [&>span]:size-1.25",
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
  "data-invalid": dataInvalid,
  ...props
}: RadioPrimitive.Root.Props &
  VariantProps<typeof radioGroupItemVariants> & {
    "data-invalid"?: string
  }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-size={size}
      {...(dataInvalid !== undefined && { "data-invalid": dataInvalid })}
      className={cn(radioGroupItemVariants({ size, className }))}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={radioGroupIndicatorVariants({ size })}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground group-data-disabled/radio:bg-popover-foreground" />
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
