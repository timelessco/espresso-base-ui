"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={"w-fit tracking-normal"}
      {...props}
    />
  )
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-xl bg-card px-3.5 py-3 text-base leading-base tracking-normal text-secondary-foreground shadow-elevation-lg outline-hidden duration-100 transition-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            // elevation ladder, computed from the card token (white 3% =
            // --popover, white 9.5% for layer 2; both no-ops in light mode).
            // The popup portals out of its trigger's surface, so body:has()
            // checks where the open trigger sits; ! makes the two-layer rule
            // win the cascade regardless of class order
            "[body:has([data-slot=card]_[data-slot=popover-trigger][data-popup-open])_&]:bg-[color-mix(in_oklch,var(--card),white_3%)] [body:has([data-slot=dialog-content]_[data-slot=popover-trigger][data-popup-open])_&]:bg-[color-mix(in_oklch,var(--card),white_3%)] [body:has([data-slot=dialog-content]_[data-slot=card]_[data-slot=popover-trigger][data-popup-open])_&]:bg-[color-mix(in_oklch,var(--card),white_9.5%)]! [body:has([data-slot=command]_[data-slot=popover-trigger][data-popup-open])_&]:bg-[color-mix(in_oklch,var(--card),white_3%)] [body:has([data-slot=command]_[data-slot=card]_[data-slot=popover-trigger][data-popup-open])_&]:bg-[color-mix(in_oklch,var(--card),white_9.5%)]!",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm tracking-normal", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-base leading-base font-medium tracking-normal text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn(
        "pt-1 text-base leading-lg font-normal tracking-normal text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
