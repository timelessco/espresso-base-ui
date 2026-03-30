"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type InputGroupContextValue = {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "outline" | "subtle"
}

const InputGroupContext = React.createContext<InputGroupContextValue>({
  size: "md",
  variant: "outline",
})

const inputGroupVariants = cva(
  [
    "group/input-group relative flex w-full min-w-0 items-center border text-secondary-foreground transition-colors outline-none",
    // disabled
    "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:bg-input has-disabled:text-popover-foreground has-disabled:[&_*]:!text-popover-foreground",
    // block/textarea layout
    "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
  ],
  {
    variants: {
      variant: {
        outline:
          "border-accent bg-primary-foreground focus-within:border-primary-foreground focus-within:shadow-3xs! hover:border-popover-foreground hover:shadow-4xs active:border-card-foreground active:shadow-md active:ring-0 has-disabled:border-accent data-[filled=true]:border-input-filled-outline data-[invalid=true]:border-input-invalid-outline data-[valid=true]:border-input-valid-outline",
        subtle:
          "border-transparent bg-secondary focus-within:border-primary-foreground focus-within:bg-primary-foreground! focus-within:shadow-3xs! hover:bg-muted active:border-card-foreground active:bg-primary-foreground active:shadow-md active:ring-0 has-disabled:bg-input data-[filled=true]:bg-input-filled data-[invalid=true]:bg-input-invalid data-[valid=true]:bg-input-valid",
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
  const contextValue = React.useMemo(
    () => ({ size: size ?? "md", variant: variant ?? "outline" }),
    [size, variant]
  )
  return (
    <InputGroupContext.Provider value={contextValue}>
      <div
        data-slot="input-group"
        data-variant={variant ?? "outline"}
        data-size={size ?? "md"}
        role="group"
        className={cn(inputGroupVariants({ variant, size, className }))}
        {...props}
      />
    </InputGroupContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)]",
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
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof Input>) {
  const { size: contextSize } = React.useContext(InputGroupContext)
  return (
    <Input
      data-slot="input-group-control"
      size={sizeProp ?? contextSize}
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none! ring-0 hover:border-0 hover:shadow-none! focus:border-0 focus:shadow-none! focus:ring-0 active:border-0 active:shadow-none! active:ring-0 disabled:bg-transparent",
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
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus:shadow-none focus:ring-0 disabled:bg-transparent",
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
