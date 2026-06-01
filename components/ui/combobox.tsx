"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react"

type ComboboxVariant = "outline" | "subtle"

const ComboboxContext = React.createContext<{ variant: ComboboxVariant }>({
  variant: "outline",
})

function useComboboxVariant() {
  return React.useContext(ComboboxContext).variant
}

function Combobox<TItem, TMultiple extends boolean | undefined = undefined>({
  variant = "outline",
  ...props
}: ComboboxPrimitive.Root.Props<TItem, TMultiple> & {
  variant?: ComboboxVariant
}) {
  return (
    <ComboboxContext.Provider value={{ variant }}>
      <ComboboxPrimitive.Root {...props} />
    </ComboboxContext.Provider>
  )
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  const variant = useComboboxVariant()
  return (
    <InputGroup variant={variant} className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-xl bg-popover text-muted-foreground shadow-5xs duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  const variant = useComboboxVariant()
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      data-variant={variant}
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] [animation:scroll-shadow-mask_linear_both] scroll-py-1 overflow-y-auto overscroll-contain p-1 [animation-timeline:scroll(self)] data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative mb-px flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-1.5 text-base text-muted-foreground outline-hidden select-none last:mb-0 focus:bg-accent focus:text-muted-foreground not-data-[variant=destructive]:focus:**:text-muted-foreground aria-selected:bg-muted! data-highlighted:bg-secondary data-highlighted:text-muted-foreground data-highlighted:active:bg-muted data-highlighted:active:text-muted-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("p-1", className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "py-1.5 pr-2 pl-1.5 text-sm leading-base font-medium tracking-normal text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  const variant = useComboboxVariant()
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      data-variant={variant}
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1.5 rounded-lg bg-clip-padding px-2.5 py-1 text-sm transition-colors has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:has-aria-invalid:ring-destructive/40",
        // outline variant
        "data-[variant=outline]:bg-background data-[variant=outline]:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_#00000012] data-[variant=outline]:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] data-[variant=outline]:has-[[data-slot=combobox-chip-input]:focus-visible]:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] dark:data-[variant=outline]:shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:data-[variant=outline]:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)] dark:data-[variant=outline]:has-[[data-slot=combobox-chip-input]:focus-visible]:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]",
        // subtle variant
        "data-[variant=subtle]:bg-secondary data-[variant=subtle]:has-[[data-slot=combobox-chip-input]:focus-visible]:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] dark:data-[variant=subtle]:has-[[data-slot=combobox-chip-input]:focus-visible]:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  const variant = useComboboxVariant()
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      data-variant={variant}
      className={cn(
        "flex h-[calc(--spacing(6.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-sm leading-base font-normal tracking-normal whitespace-nowrap text-secondary-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0.5 data-[variant=outline]:bg-secondary data-[variant=subtle]:bg-card data-[variant=subtle]:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_#00000012] data-[variant=subtle]:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] dark:data-[variant=subtle]:shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:data-[variant=subtle]:enabled:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="size-4 rounded-sm"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("h-6.25 min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
