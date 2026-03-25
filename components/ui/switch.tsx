"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2",
    // unchecked states
    "data-unchecked:bg-primary/20 not-data-disabled:data-unchecked:hover:bg-primary/28 not-data-disabled:data-unchecked:focus-visible:bg-primary not-data-disabled:data-unchecked:focus-visible:ring-2 not-data-disabled:data-unchecked:focus-visible:ring-ring not-data-disabled:data-unchecked:active:bg-primary/44",
    // checked states
    "data-checked:bg-primary not-data-disabled:data-checked:hover:bg-primary/86 not-data-disabled:data-checked:focus-visible:bg-primary not-data-disabled:data-checked:focus-visible:ring-2 not-data-disabled:data-checked:focus-visible:ring-ring not-data-disabled:data-checked:active:bg-primary/74",
    // disabled
    "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-[26px]",
        default: "h-5 w-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "size-3 data-checked:translate-x-[11px] data-unchecked:translate-x-px",
        default:
          "size-3.5 data-checked:translate-x-[14px] data-unchecked:translate-x-0.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(switchVariants({ size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={switchThumbVariants({ size })}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants }

// ## Switch Changelog
//
// ### Added
// - CVA-based `switchVariants` and `switchThumbVariants`
// - Size variants via CVA (`sm`, `default`) with `default` as default
// - Exported `switchVariants`
// - Hover and active states for unchecked and checked
// - `data-disabled:pointer-events-none` to prevent interaction when disabled
//
// ### Changed
// - Replaced inline className string with CVA variants
// - Size dimensions updated: `sm` (26x16, thumb 12px), `default` (32x20, thumb 14px)
// - Thumb translate values use explicit pixel values instead of `calc()`
//
// ### Removed
// - `aria-invalid` styles
// - Dark mode overrides for thumb colors
