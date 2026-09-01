"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

type DropdownMenuSize = "xs" | "sm" | "md" | "lg"

// size flows from DropdownMenuContent (or a per-item override) via context, so
// `<DropdownMenuContent size="lg">` sizes every item; submenus inherit it.
const DropdownMenuSizeContext = React.createContext<DropdownMenuSize>("sm")

const dropdownMenuItemVariants = cva(
  "group/dropdown-menu-item relative flex w-auto cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 leading-base font-normal tracking-normal text-secondary-foreground outline-hidden select-none data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-highlighted:active:bg-[color-mix(in_oklch,var(--secondary),black_1%)] data-highlighted:active:text-secondary-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive",
  {
    variants: {
      size: {
        xs: "min-h-6 rounded-sm py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        sm: "min-h-7 rounded-md text-base [&_svg:not([class*='size-'])]:size-4",
        md: "min-h-8 rounded-lg text-base [&_svg:not([class*='size-'])]:size-4",
        lg: "min-h-10 rounded-lg px-2.5 text-lg [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  size,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    size?: DropdownMenuSize
  }) {
  const inheritedSize = React.useContext(DropdownMenuSizeContext)
  const resolvedSize = size ?? inheritedSize
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuSizeContext.Provider value={resolvedSize}>
          <MenuPrimitive.Popup
            data-slot="dropdown-menu-content"
            data-size={resolvedSize}
            className={cn(
              "z-50 max-h-(--available-height) w-auto min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border-none bg-popover p-1 text-popover-foreground shadow-elevation-xl duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
              // radius per size (rounded-xl base covers md and lg)
              "data-[size=xs]:rounded-md data-[size=sm]:rounded-lg",
              className
            )}
            {...props}
          />
        </DropdownMenuSizeContext.Provider>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "min-h-7 px-2 py-1.5 text-sm leading-base font-medium tracking-normal text-accent-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  size,
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
  size?: DropdownMenuSize
}) {
  const inheritedSize = React.useContext(DropdownMenuSizeContext)
  const resolvedSize = size ?? inheritedSize
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      data-size={resolvedSize}
      className={cn(
        dropdownMenuItemVariants({ size: resolvedSize }),
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md p-1.5 text-base leading-base font-normal tracking-normal text-secondary-foreground outline-hidden select-none data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-inset:pl-7 data-popup-open:bg-[color-mix(in_oklch,var(--secondary),black_1%)] data-popup-open:text-secondary-foreground data-open:bg-[color-mix(in_oklch,var(--secondary),black_1%)] data-open:text-secondary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-elevation-xl duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 pr-8 leading-base font-normal tracking-normal text-secondary-foreground outline-hidden select-none data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-highlighted:active:bg-[color-mix(in_oklch,var(--secondary),black_1%)] data-highlighted:active:text-secondary-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        // sizes mirror dropdownMenuItemVariants, driven by the content's data-size
        "min-h-7 text-base [&_svg:not([class*='size-'])]:size-4",
        "in-data-[size=xs]:min-h-6 in-data-[size=xs]:rounded-sm in-data-[size=xs]:py-1 in-data-[size=xs]:text-sm in-data-[size=xs]:[&_svg:not([class*='size-'])]:size-3.5",
        "in-data-[size=md]:min-h-8 in-data-[size=md]:rounded-lg",
        "in-data-[size=lg]:min-h-10 in-data-[size=lg]:rounded-lg in-data-[size=lg]:text-lg in-data-[size=lg]:[&_svg:not([class*='size-'])]:size-4.5",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 pr-8 leading-base font-normal tracking-normal text-secondary-foreground outline-hidden select-none data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-highlighted:active:bg-[color-mix(in_oklch,var(--secondary),black_1%)] data-highlighted:active:text-secondary-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        // sizes mirror dropdownMenuItemVariants, driven by the content's data-size
        "min-h-7 text-base [&_svg:not([class*='size-'])]:size-4",
        "in-data-[size=xs]:min-h-6 in-data-[size=xs]:rounded-sm in-data-[size=xs]:py-1 in-data-[size=xs]:text-sm in-data-[size=xs]:[&_svg:not([class*='size-'])]:size-3.5",
        "in-data-[size=md]:min-h-8 in-data-[size=md]:rounded-lg",
        "in-data-[size=lg]:min-h-10 in-data-[size=lg]:rounded-lg in-data-[size=lg]:text-lg in-data-[size=lg]:[&_svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("mx-0 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-secondary-foreground group-data-[variant=destructive]/dropdown-menu-item:text-destructive",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
