"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-card-foreground transition-shadow outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "not-disabled:hover:shadow-sm",
        "not-disabled:data-[state=unchecked]:hover:border-accent-foreground",
        "not-disabled:data-[state=unchecked]:focus-visible:border-primary",
        "not-disabled:data-[state=unchecked]:active:border-muted-foreground",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "not-disabled:data-[state=checked]:hover:bg-primary/86",
        "not-disabled:data-[state=checked]:active:bg-primary/74",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "not-disabled:data-[state=indeterminate]:hover:bg-primary/86",
        "not-disabled:data-[state=indeterminate]:active:bg-primary/74",
        "disabled:cursor-not-allowed disabled:border-popover-foreground disabled:bg-input",
        "disabled:data-[state=checked]:border-muted disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:[&_svg]:text-card-foreground",
        "disabled:data-[state=indeterminate]:border-muted disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:[&_svg]:text-card-foreground",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className={cn(
          "grid place-content-center text-current transition-[clip-path] duration-200 ease-out",
          "data-[state=unchecked]:[clip-path:inset(0_100%_0_0)]",
          "data-[state=checked]:[clip-path:inset(0_0_0_0)]",
          "data-[state=indeterminate]:[clip-path:inset(0_0_0_0)]"
        )}
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
