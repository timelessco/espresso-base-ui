"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"

function SelectCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M13.0831 3.3823C13.2637 3.17362 13.5793 3.15113 13.7882 3.33152C13.9969 3.51206 14.0204 3.82772 13.84 4.0366L6.42885 12.6167C6.33507 12.7253 6.19926 12.789 6.0558 12.7905C5.91228 12.792 5.77486 12.7312 5.67885 12.6245L2.1681 8.7241L2.54018 8.39012L2.91225 8.05516L6.04213 11.5337L13.0831 3.3823ZM2.20521 8.01805C2.41047 7.83332 2.72752 7.8499 2.91225 8.05516L2.1681 8.7241C1.98378 8.51889 2.00023 8.20268 2.20521 8.01805Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SelectChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.85355 10.6464C5.65829 10.4512 5.34171 10.4512 5.14645 10.6464C4.95118 10.8417 4.95118 11.1583 5.14645 11.3536L7.64645 13.8536C7.84171 14.0488 8.15829 14.0488 8.35355 13.8536L10.8536 11.3536C11.0488 11.1583 11.0488 10.8417 10.8536 10.6464C10.6583 10.4512 10.3417 10.4512 10.1464 10.6464L8 12.7929L5.85355 10.6464ZM5.85355 5.35355C5.65829 5.54882 5.34171 5.54882 5.14645 5.35355C4.95118 5.15829 4.95118 4.84171 5.14645 4.64645L7.64645 2.14645C7.84171 1.95118 8.15829 1.95118 8.35355 2.14645L10.8536 4.64645C11.0488 4.84171 11.0488 5.15829 10.8536 5.35355C10.6583 5.54882 10.3417 5.54882 10.1464 5.35355L8 3.20711L5.85355 5.35355Z"
        fill="currentColor"
      />
    </svg>
  )
}

type SelectContextValue = {
  size: "sm" | "default" | "lg"
  variant: "outline" | "subtle" | "ghost"
}

const SelectContext = React.createContext<SelectContextValue>({
  size: "default",
  variant: "outline",
})

function Select({
  size = "default",
  variant = "outline",
  ...props
}: SelectPrimitive.Root.Props<string> & {
  size?: "sm" | "default" | "lg"
  variant?: "outline" | "subtle" | "ghost"
}) {
  const contextValue = React.useMemo(() => ({ size, variant }), [size, variant])
  return (
    <SelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root {...props} />
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

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

const selectTriggerVariants = cva(
  [
    "flex w-fit items-center justify-between gap-2 border leading-base font-normal tracking-normal whitespace-nowrap text-muted-foreground transition-colors outline-none select-none focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:shadow-3xs active:text-secondary-foreground data-placeholder:text-card-foreground data-[filled=true]:text-secondary-foreground data-[invalid=true]:text-secondary-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 data-[valid=true]:text-secondary-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-input data-disabled:text-popover-foreground! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        outline:
          "border border-border bg-primary-foreground group-data-[invalid=true]/field:border-error-outline! hover:border-border-normal active:border-border-strong active:ring-0 data-[filled=true]:border-border data-[invalid=true]:border-error-outline data-[valid=true]:border-success-outline data-disabled:border-border data-disabled:bg-input data-disabled:text-popover-foreground",
        subtle:
          "border-transparent bg-secondary group-data-[invalid=true]/field:bg-error! hover:bg-muted active:bg-accent active:ring-0 data-[filled=true]:bg-secondary data-[invalid=true]:bg-error data-[valid=true]:bg-success data-disabled:bg-input data-disabled:text-popover-foreground",
        ghost:
          "border-transparent bg-transparent group-data-[invalid=true]/field:bg-error! hover:bg-muted active:bg-accent active:ring-0 data-[filled=true]:bg-secondary data-[invalid=true]:bg-error data-[valid=true]:bg-success data-disabled:bg-transparent data-disabled:text-popover-foreground",
      },
      size: {
        sm: "h-7 rounded-md px-2 text-base",
        default: "h-8 rounded-md px-2.5 text-base",
        lg: "h-10 rounded-lg px-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

function SelectTrigger({
  className,
  variant: variantProp,
  size: sizeProp,
  prefixIcon,
  suffixIcon,
  children,
  ...props
}: SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants> & {
    prefixIcon?: React.ReactNode
    suffixIcon?: React.ReactNode
    "data-invalid"?: string
    "data-disabled"?: string
    "data-valid"?: string
    "data-filled"?: string
  }) {
  const { size: contextSize, variant: contextVariant } =
    React.useContext(SelectContext)
  const variant = variantProp ?? contextVariant
  const size = sizeProp ?? contextSize
  const dataInvalid = props["data-invalid"]
  const dataDisabled = props["data-disabled"]
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-variant={variant}
      data-size={size}
      aria-invalid={dataInvalid === "true" || undefined}
      aria-disabled={dataDisabled === "true" || undefined}
      className={cn(
        "relative",
        selectTriggerVariants({ variant, size, className }),
        prefixIcon && "[&>[data-slot=select-value]]:pl-6",
        suffixIcon && "[&>[data-slot=select-value]]:pr-6"
      )}
      {...props}
    >
      {prefixIcon && (
        <span className="pointer-events-none absolute top-1/2 left-2.5 flex -translate-y-1/2 items-center">
          {prefixIcon}
        </span>
      )}
      {children}
      {suffixIcon ? (
        <span className="pointer-events-none absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center">
          {suffixIcon}
        </span>
      ) : (
        <SelectPrimitive.Icon
          render={
            <SelectChevronIcon className="pointer-events-none size-4 text-current" />
          }
        />
      )}
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
            "relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl bg-popover p-1 text-secondary-foreground shadow-5xs ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
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

const selectItemSizeMap = {
  sm: "h-7",
  default: "h-7.5",
  lg: "h-8",
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const { size } = React.useContext(SelectContext)
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md pr-8 pl-2 text-sm text-secondary-foreground outline-hidden select-none focus:bg-accent focus:text-secondary-foreground not-data-[variant=destructive]:focus:**:text-secondary-foreground aria-selected:bg-muted! data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-highlighted:active:bg-muted data-highlighted:active:text-secondary-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        selectItemSizeMap[size],
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 text-base leading-base font-normal tracking-normal whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <SelectCheckIcon className="pointer-events-none" />
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
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-muted", className)}
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
  selectTriggerVariants,
  SelectValue,
}

// ## Select Changelog
//
// ### React Context
// - `SelectContext` passes `variant` and `size` from `Select` root to children
// - `SelectTrigger` reads `variant` and `size` from context, can be overridden per-trigger via props
// - `SelectItem` reads `size` from context to set item height (sm: h-7, default: h-7.5, lg: h-8)
// - Usage: `<Select variant="outline" size="sm">` — no need to pass variant/size to SelectTrigger
//
// ### Added
// - `Select` wrapper component with `variant` and `size` props (replaces direct `SelectPrimitive.Root`)
// - `SelectSizeContext` → `SelectContext` (holds both variant and size)
// - CVA-based `selectTriggerVariants` with variant (`outline`, `subtle`, `ghost`) and size (`sm`, `default`, `lg`)
// - `prefixIcon` and `suffixIcon` props on `SelectTrigger`
// - Custom `SelectChevronIcon` and `SelectCheckIcon` SVGs (replaced lucide icons)
// - Data states: `data-[valid]`, `data-[invalid]`, `data-[filled]` on all variants
// - Aria states: `aria-invalid` and `aria-disabled` auto-set from data attributes
// - `data-disabled` styles with `!important` text color override
//
// ### Changed
// - `alignItemWithTrigger` default changed from `true` to `false`
// - `SelectItem` height now varies by size via context
//
// ### Removed
// - Lucide `CheckIcon` (replaced with custom SVG)
// - Dark mode overrides
//
// ### Prefix/Suffix Icon Positioning
// - `prefixIcon` and `suffixIcon` are now absolutely positioned inside the
//   `SelectTrigger` (left-2.5 / right-2.5, vertically centered) instead of
//   being rendered in the normal flow.
// - `SelectValue` receives `pl-6` / `pr-6` when a prefix/suffix icon is
//   present so its text doesn't overlap the icons.
// - Reason: with icons in flow, `SelectValue`'s bounding rect was pushed
//   inward, and Base UI's `alignItemWithTrigger` positioning (which aligns
//   the selected item's text with the value text) dragged the popup off the
//   trigger's left edge. Taking the icons out of flow keeps
//   `SelectValue`'s rect flush with the trigger's content edge, so the
//   popup stays anchored to the trigger regardless of prefix icon presence.
// - The trigger now has `relative` positioning so the absolute icon spans
//   anchor to it.
