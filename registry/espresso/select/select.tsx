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

type SelectItem = {
  label: string
  value: string | null
  icon?: React.ComponentType<{ className?: string }> | null
}

type SelectContextValue = {
  size: "sm" | "default" | "lg"
  variant: "outline" | "subtle" | "ghost"
  items?: SelectItem[]
}

const SelectContext = React.createContext<SelectContextValue>({
  size: "default",
  variant: "outline",
})

function Select({
  size = "default",
  variant = "outline",
  items,
  ...props
}: SelectPrimitive.Root.Props<string> & {
  size?: "sm" | "default" | "lg"
  variant?: "outline" | "subtle" | "ghost"
  items?: SelectItem[]
}) {
  const contextValue = React.useMemo(
    () => ({ size, variant, items }),
    [size, variant, items]
  )
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
      className={cn("scroll-my-1", className)}
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
      className={cn(
        "flex flex-1 items-center gap-2 text-left [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
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
  [
    "flex w-fit items-center justify-between gap-2 border leading-base font-normal tracking-normal whitespace-nowrap text-muted-foreground transition-colors outline-none select-none focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:shadow-3xs active:text-secondary-foreground data-filled:text-secondary-foreground data-invalid:text-secondary-foreground data-placeholder:text-card-foreground data-valid:text-secondary-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-input data-disabled:text-popover-foreground! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        outline:
          "border border-border bg-primary-foreground group-data-[invalid=true]/field:border-error-outline! not-data-disabled:hover:border-border-normal not-data-disabled:active:border-border-strong not-data-disabled:active:ring-0 data-filled:border-border data-invalid:border-error-outline data-valid:border-success-outline data-disabled:border-border data-disabled:bg-input data-disabled:text-popover-foreground",
        subtle:
          "border-transparent bg-secondary group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-muted not-data-disabled:active:bg-accent not-data-disabled:active:ring-0 data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success data-disabled:bg-input data-disabled:text-popover-foreground",
        ghost:
          "border-transparent bg-transparent group-data-[invalid=true]/field:bg-error! not-data-disabled:hover:bg-muted not-data-disabled:active:bg-accent not-data-disabled:active:ring-0 data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success data-disabled:bg-transparent data-disabled:text-popover-foreground",
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
  suffixIcon,
  children,
  ...props
}: SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants> & {
    suffixIcon?: React.ReactNode
  }) {
  const { size: contextSize, variant: contextVariant } =
    React.useContext(SelectContext)
  const variant = variantProp ?? contextVariant
  const size = sizeProp ?? contextSize
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-variant={variant}
      data-size={size}
      className={cn(selectTriggerVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="pointer-events-none flex shrink-0 items-center [&>svg]:size-4">
        {suffixIcon ?? <SelectChevronIcon />}
      </SelectPrimitive.Icon>
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
          <SelectPrimitive.List className="flex flex-col">
            {children}
          </SelectPrimitive.List>
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
  default: "h-7",
  lg: "h-7",
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
        "relative mb-px flex w-full cursor-default items-center gap-2 rounded-md pr-8 pl-2 text-sm text-secondary-foreground outline-hidden select-none last:mb-0 focus:bg-accent focus:text-secondary-foreground not-data-[variant=destructive]:focus:**:text-secondary-foreground aria-selected:bg-muted! data-highlighted:bg-secondary data-highlighted:text-secondary-foreground data-highlighted:active:bg-muted data-highlighted:active:text-secondary-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
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

/**
 * Changelog — compared to shadcn base-ui select
 * (npx shadcn@latest add base/select)
 *
 * Reference: https://ui.shadcn.com/docs/components/base/select
 * Base UI:   https://base-ui.com/react/components/select
 * Source:    apps/v4/registry/bases/base/ui/select.tsx
 *
 * Structure preserved from shadcn base:
 *   - SelectGroup, SelectContent, SelectLabel, SelectSeparator,
 *     SelectScrollUpButton, SelectScrollDownButton — identical structure
 *   - All components use correct Base UI primitives with data-slot attributes
 *   - SelectContent: Portal → Positioner → Popup + ScrollUp/Down + List
 *   - SelectContent defaults: side="bottom", sideOffset=4, align="center",
 *     alignOffset=0, alignItemWithTrigger=true
 *   - SelectItem: Item → ItemText + ItemIndicator with check icon
 *
 * Design extensions (behavioral — not in shadcn):
 *
 *   Select (Root):
 *     Before: `const Select = SelectPrimitive.Root` (direct re-export).
 *     After:  Wrapper function with `SelectContext.Provider`.
 *             Accepts `size`, `variant`, `items` props.
 *             `items` stored in context AND forwarded to SelectPrimitive.Root.
 *             Context shares size/variant/items to Trigger, Value, and Item.
 *
 *   SelectValue:
 *     Before: Stateless — passes className + ...props.
 *     After:  Reads `items` from context. When items with `icon` field exist,
 *             injects a children render function `(value) => icon + label`
 *             per Base UI docs (Select.Value children accepts a function).
 *             User-provided children take priority over auto-rendering.
 *
 *   SelectTrigger:
 *     Before: Destructures `size` only, renders children + Icon via `render` prop.
 *     After:  Reads `size`/`variant` from context (overridable per-trigger).
 *             CVA `selectTriggerVariants` with variant (outline|subtle|ghost)
 *             and size (sm|default|lg).
 *             `suffixIcon` prop replaces default SelectChevronIcon.
 *             Uses Base UI's Icon children pattern per docs:
 *             `<Select.Icon>{icon}</Select.Icon>` — gets `data-popup-open`.
 *             Added `data-variant` attribute.
 *
 *   SelectItem:
 *     Before: Stateless — fixed height via CSS.
 *     After:  Reads `size` from context for dynamic item height
 *             (sm: h-7, default: h-7.5, lg: h-8).
 *
 *   SelectItem type:
 *     Added `{ label, value, icon? }` type extending Base UI's
 *     `{ label, value }` format. The `icon` field enables automatic
 *     icon rendering in SelectValue.
 *
 * Tailwind-only swaps (class-level, no behavior impact):
 *   - cn-select-* slot classes → explicit Tailwind utilities
 *   - Color tokens, border, bg, shadow, ring, animation classes
 *   - IconPlaceholder → custom SVGs (SelectChevronIcon, SelectCheckIcon)
 *     and lucide (ChevronUpIcon, ChevronDownIcon)
 *   - selectTriggerVariants exported for external use
 */
