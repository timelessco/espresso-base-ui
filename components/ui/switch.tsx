"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "md" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
        // sizes
        "data-[size=sm]:h-[16px] data-[size=sm]:w-[26px]",
        "data-[size=md]:h-[20px] data-[size=md]:w-[32px]",
        "data-[size=default]:h-[20px] data-[size=default]:w-[32px]",
        // unchecked states
        "data-unchecked:bg-primary/20 data-unchecked:hover:bg-primary/28 data-unchecked:active:bg-primary/44",
        "data-unchecked:focus-visible:bg-primary data-unchecked:focus-visible:ring-3 data-unchecked:focus-visible:ring-ring",
        "data-unchecked:disabled:bg-primary/20",
        // checked states
        "data-checked:bg-primary data-checked:hover:bg-primary/86 data-checked:active:bg-primary/74",
        "data-checked:focus-visible:bg-primary data-checked:focus-visible:ring-2 data-checked:focus-visible:ring-ring",
        "data-checked:disabled:bg-primary/20",
        // invalid
        "aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform",
          // sm: 12px thumb, 2px gap
          "group-data-[size=sm]/switch:size-3",
          "group-data-[size=sm]/switch:data-unchecked:translate-x-[1px]",
          "group-data-[size=sm]/switch:data-checked:translate-x-[11px]",
          // md: 14px thumb, 2px gap
          "group-data-[size=md]/switch:size-3.5",
          "group-data-[size=md]/switch:data-unchecked:translate-x-[2px]",
          "group-data-[size=md]/switch:data-checked:translate-x-[14px]",
          // default: same as md
          "group-data-[size=default]/switch:size-3.5",
          "group-data-[size=default]/switch:data-unchecked:translate-x-[2px]",
          "group-data-[size=default]/switch:data-checked:translate-x-[14px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
