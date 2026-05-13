"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

type SelectOption = {
  label: string
  value: string | null
  icon?: React.ComponentType<{ className?: string }>
}

type SelectContextValue = {
  items?: SelectOption[]
}

const SelectContext = React.createContext<SelectContextValue>({})

function Select({
  items,
  ...props
}: SelectPrimitive.Root.Props<string> & {
  items?: SelectOption[]
}) {
  const contextValue = React.useMemo(() => ({ items }), [items])
  return (
    <SelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root items={items} {...props} />
    </SelectContext.Provider>
  )
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  className,
  children,
  ...props
}: SelectPrimitive.Value.Props) {
  const { items } = React.useContext(SelectContext)
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 items-center gap-2 text-left", className)}
      {...props}
    >
      {children ??
        (items
          ? (value: string | null) => {
              const item = items.find((i) => i.value === value)
              if (!item) return null
              const Icon = item.icon
              return (
                <>
                  {Icon && <Icon className="size-4" />}
                  {item.label}
                </>
              )
            }
          : undefined)}
    </SelectPrimitive.Value>
  )
}

const selectTriggerVariants = cva(
  "flex w-fit items-center justify-between gap-2 rounded-md p-2 text-base leading-base font-normal tracking-normal whitespace-nowrap text-secondary-foreground transition-colors outline-none select-none focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:shadow-3xs data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-popover-foreground! data-placeholder:text-card-foreground data-[size=default]:h-8 data-[size=lg]:h-10 data-[size=lg]:rounded-lg data-[size=lg]:px-3 data-[size=lg]:text-lg data-[size=sm]:h-7 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        outline:
          "border border-border bg-primary-foreground group-data-[invalid=true]/field:border-error-outline! not-data-disabled:hover:border-border-normal data-invalid:border-error-outline data-valid:border-success-outline data-disabled:border-border data-disabled:bg-input",
        subtle:
          "border border-transparent bg-secondary group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-muted data-invalid:bg-error data-valid:bg-success data-disabled:bg-input",
        ghost:
          "border border-transparent bg-transparent group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-muted data-invalid:bg-error data-valid:bg-success data-disabled:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

function SelectTrigger({
  className,
  variant,
  size = "default",
  suffix,
  children,
  ...props
}: SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants> & {
    size?: "sm" | "default" | "lg"
    suffix?: React.ReactElement
  }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-variant={variant ?? "outline"}
      data-size={size}
      className={cn(selectTriggerVariants({ variant }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          suffix ?? (
            <ChevronDownIcon className="pointer-events-none size-4" />
          )
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-(--available-height) w-auto min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl bg-popover text-secondary-foreground shadow-5xs ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 text-sm leading-base font-medium tracking-normal text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: SelectPrimitive.Item.Props) {
  const { items } = React.useContext(SelectContext)
  const item = items?.find((i) => i.value === value)
  const Icon = item?.icon
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value}
      className={cn(
        "relative mb-px flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-1.5 text-base text-secondary-foreground outline-hidden select-none last:mb-0 focus:bg-accent focus:text-secondary-foreground not-data-[variant=destructive]:focus:**:text-secondary-foreground aria-selected:bg-muted! data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-highlighted:active:bg-muted data-highlighted:active:text-secondary-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {Icon && <Icon className="size-4" />}
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
