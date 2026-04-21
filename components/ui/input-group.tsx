"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const inputGroupVariants = cva(
  [
    "group/input-group relative flex w-full min-w-0 items-center border transition-colors outline-none",
    // disabled
    "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:bg-input has-disabled:text-popover-foreground",
    // focus-within
    "has-[[data-slot=input-group-control]:focus-visible]:shadow-3xs",
    // invalid
    "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
    // block/textarea layout
    "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-border bg-primary-foreground group-data-[invalid=true]/field:border-error-outline! not-has-disabled:hover:border-border-normal has-[[data-slot=input-group-control]:focus-visible]:border-primary-foreground data-[filled=true]:border-border data-[invalid=true]:border-error-outline! data-[valid=true]:border-success-outline!",
        subtle:
          "border-transparent bg-secondary group-data-[invalid=true]/field:bg-error! not-has-disabled:hover:bg-muted has-[[data-slot=input-group-control]:focus-visible]:border-primary-foreground has-[[data-slot=input-group-control]:focus-visible]:bg-primary-foreground data-[filled=true]:bg-secondary data-[invalid=true]:bg-error! data-[valid=true]:bg-success!",
      },
      size: {
        sm: "h-7 rounded-md [&_svg:not([class*='size-'])]:size-4",
        md: "h-8 rounded-md [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        xl: "h-10 rounded-lg [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
)

function InputGroup({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      data-variant={variant ?? "outline"}
      data-size={size ?? "md"}
      role="group"
      className={cn(inputGroupVariants({ variant, size }), className)}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "size">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none! ring-0 group-data-[size=lg]/input-group:h-10 group-data-[size=lg]/input-group:px-3 group-data-[size=lg]/input-group:text-lg group-data-[size=md]/input-group:h-8 group-data-[size=md]/input-group:px-2.5 group-data-[size=md]/input-group:text-base group-data-[size=sm]/input-group:h-7 group-data-[size=sm]/input-group:px-2 group-data-[size=sm]/input-group:text-base group-data-[size=xl]/input-group:h-10 group-data-[size=xl]/input-group:px-3 group-data-[size=xl]/input-group:text-xl hover:border-0 hover:shadow-none! focus:border-0 focus:shadow-none! focus:ring-0 focus-visible:ring-0 active:border-0 active:shadow-none! active:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none! ring-0 hover:bg-transparent! focus:border-0 focus:bg-transparent! focus:shadow-none! focus:ring-0 active:border-0 active:bg-transparent! active:shadow-none! active:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  inputGroupVariants,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
