"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "rounded-md bg-secondary p-px",
        outline: "rounded-md border border-border-soft bg-transparent p-px",
        line: "rounded-md bg-transparent p-px group-data-horizontal/tabs:border-b group-data-horizontal/tabs:border-border-soft",
        ghost: "rounded-md bg-transparent p-px",
        browser:
          "gap-0 bg-transparent p-0 group-data-horizontal/tabs:border-b group-data-horizontal/tabs:border-border-soft",
      },
      size: {
        sm: "",
        default: "",
      },
    },
    compoundVariants: [
      // sm heights
      {
        variant: "default",
        size: "sm",
        className: "group-data-horizontal/tabs:h-7",
      },
      {
        variant: "outline",
        size: "sm",
        className: "group-data-horizontal/tabs:h-7.25",
      },
      {
        variant: "line",
        size: "sm",
        className: "group-data-horizontal/tabs:h-7",
      },
      {
        variant: "ghost",
        size: "sm",
        className: "group-data-horizontal/tabs:h-7",
      },
      {
        variant: "browser",
        size: "sm",
        className: "group-data-horizontal/tabs:h-7",
      },
      // default heights
      {
        variant: "default",
        size: "default",
        className: "group-data-horizontal/tabs:h-7.5",
      },
      {
        variant: "outline",
        size: "default",
        className: "group-data-horizontal/tabs:h-7.75",
      },
      {
        variant: "line",
        size: "default",
        className: "group-data-horizontal/tabs:h-7.5",
      },
      {
        variant: "ghost",
        size: "default",
        className: "group-data-horizontal/tabs:h-7.5",
      },
      {
        variant: "browser",
        size: "default",
        className: "group-data-horizontal/tabs:h-7.5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  size = "sm",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-size={size}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva([
  "relative inline-flex flex-1 items-center justify-center gap-2 rounded-[7px] text-base leading-base tracking-normal whitespace-nowrap text-accent-foreground transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  // variant-specific active styles
  "group-data-[variant=default]/tabs-list:data-active:bg-surface group-data-[variant=default]/tabs-list:data-active:shadow-6xs",
  "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:shadow-none",
  "group-data-[variant=outline]/tabs-list:bg-transparent group-data-[variant=outline]/tabs-list:data-active:bg-surface group-data-[variant=outline]/tabs-list:data-active:shadow-sm",
  "group-data-[variant=ghost]/tabs-list:bg-transparent group-data-[variant=ghost]/tabs-list:data-active:bg-surface group-data-[variant=ghost]/tabs-list:data-active:shadow-sm",
  "group-data-[variant=browser]/tabs-list:bottom-[-1px] group-data-[variant=browser]/tabs-list:h-full group-data-[variant=browser]/tabs-list:rounded-none group-data-[variant=browser]/tabs-list:rounded-b-none group-data-[variant=browser]/tabs-list:border-x group-data-[variant=browser]/tabs-list:border-t group-data-[variant=browser]/tabs-list:border-transparent group-data-[variant=browser]/tabs-list:bg-transparent group-data-[variant=browser]/tabs-list:after:hidden group-data-[variant=browser]/tabs-list:data-active:rounded-t-md group-data-[variant=browser]/tabs-list:data-active:border-border group-data-[variant=browser]/tabs-list:data-active:bg-primary-foreground group-data-[variant=browser]/tabs-list:data-active:shadow-none",
  // active base
  "data-active:bg-background data-active:text-foreground",
  // line indicator
  "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-1.5px] group-data-horizontal/tabs:after:h-px group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-px group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
  // size sm
  "group-data-[size=sm]/tabs-list:h-6.5 group-data-[size=sm]/tabs-list:px-2 group-data-[size=sm]/tabs-list:py-1.25 group-data-[size=sm]/tabs-list:font-normal",
  // size default
  "group-data-[size=default]/tabs-list:h-7 group-data-[size=default]/tabs-list:px-2.5 group-data-[size=default]/tabs-list:py-1.5 group-data-[size=default]/tabs-list:font-medium",
])

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants(), className)}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
