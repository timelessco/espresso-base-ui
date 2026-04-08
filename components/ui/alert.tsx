import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AlertVariant = "default" | "success" | "destructive" | "warning" | "info"
type AlertType = "default" | "banner"

const alertVariants = cva(
  [
    "group/alert relative w-full rounded-lg border text-left leading-base tracking-normal",
    "[&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      type: {
        default:
          "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 px-3 py-2.5 has-[>[data-slot=alert-action]]:pr-3 has-[>[data-slot=alert-button]]:[&>[data-slot=alert-button]]:col-span-2 has-[>svg]:[&>[data-slot=alert-description]]:col-start-2 has-[>svg]:[&>[data-slot=alert-title]]:col-start-2",
        banner:
          "grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1 border-0 px-3.5 py-2.5 has-[>[data-slot=alert-action]]:pr-9 has-[>[data-slot=alert-button]]:[&>[data-slot=alert-button]]:col-start-2 has-[>svg]:[&>[data-slot=alert-description]]:col-start-2 has-[>svg]:[&>[data-slot=alert-title]]:col-start-2",
      },
      variant: {
        default: "[&>svg]:text-muted-foreground",
        success: "[&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        destructive: "[&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        warning: "[&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        info: "[&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    compoundVariants: [
      // default type — keep base bg/border, no variant bg
      {
        type: "default",
        variant: "default",
        className: "border-border-soft bg-primary-foreground",
      },
      {
        type: "default",
        variant: "success",
        className:
          "border-border-soft bg-primary-foreground [&_[data-slot=alert-button]>button]:bg-success! [&_[data-slot=alert-button]>button]:text-success-foreground [&_[data-slot=alert-button]>button]:hover:brightness-97 [&_[data-slot=alert-button]>button]:active:brightness-95",
      },
      {
        type: "default",
        variant: "destructive",
        className:
          "border-border-soft bg-primary-foreground [&_[data-slot=alert-button]>button]:bg-error! [&_[data-slot=alert-button]>button]:text-error-foreground [&_[data-slot=alert-button]>button]:hover:brightness-97 [&_[data-slot=alert-button]>button]:active:brightness-95",
      },
      {
        type: "default",
        variant: "warning",
        className:
          "border-border-soft bg-primary-foreground [&_[data-slot=alert-button]>button]:bg-warning! [&_[data-slot=alert-button]>button]:text-warning-foreground [&_[data-slot=alert-button]>button]:hover:brightness-97 [&_[data-slot=alert-button]>button]:active:brightness-95",
      },
      {
        type: "default",
        variant: "info",
        className:
          "border-border-soft bg-primary-foreground [&_[data-slot=alert-button]>button]:bg-info! [&_[data-slot=alert-button]>button]:text-info-foreground [&_[data-slot=alert-button]>button]:hover:brightness-97 [&_[data-slot=alert-button]>button]:active:brightness-95",
      },
      // banner type — variant bg colors
      {
        type: "banner",
        variant: "default",
        className:
          "border border-border-soft bg-input dark:[--btn-inverted-bg:theme(colors.gray.500)] dark:[--btn-inverted-fg:theme(colors.gray.50)] dark:[--btn-inverted-ghost-fg:theme(colors.gray.50)]",
      },
      {
        type: "banner",
        variant: "success",
        className:
          "bg-success dark:[--btn-inverted-bg:theme(colors.green.700)] dark:[--btn-inverted-fg:theme(colors.green.200)] dark:[--btn-inverted-ghost-fg:theme(colors.green.400)]",
      },
      {
        type: "banner",
        variant: "destructive",
        className:
          "bg-error dark:[--btn-inverted-bg:theme(colors.red.700)] dark:[--btn-inverted-fg:theme(colors.red.200)] dark:[--btn-inverted-ghost-fg:theme(colors.red.400)]",
      },
      {
        type: "banner",
        variant: "warning",
        className:
          "bg-warning dark:[--btn-inverted-bg:theme(colors.amber.700)] dark:[--btn-inverted-fg:theme(colors.amber.200)] dark:[--btn-inverted-ghost-fg:theme(colors.amber.400)]",
      },
      {
        type: "banner",
        variant: "info",
        className:
          "bg-info dark:[--btn-inverted-bg:theme(colors.blue.700)] dark:[--btn-inverted-fg:theme(colors.blue.200)] dark:[--btn-inverted-ghost-fg:theme(colors.blue.400)]",
      },
    ],
    defaultVariants: {
      type: "default",
      variant: "default",
    },
  }
)

const alertTitleVariants = cva(
  "font-medium [&_a]:underline [&_a]:underline-offset-3",
  {
    variants: {
      type: {
        default: "text-sm",
        banner: "text-base",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
)

const alertDescriptionVariants = cva(
  "leading-base font-normal tracking-normal text-balance opacity-80 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
  {
    variants: {
      type: {
        default: "text-xs",
        banner: "text-base",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
)

const alertButtonVariants = cva(
  "mt-2 flex items-center gap-2 group-data-[type=default]/alert:[&>button]:w-full"
)

type AlertContextValue = {
  type: AlertType
  variant: AlertVariant
}

const AlertContext = React.createContext<AlertContextValue>({
  type: "default",
  variant: "default",
})

function Alert({
  className,
  type = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const contextValue = React.useMemo(
    () => ({ type: type ?? "default", variant: variant ?? "default" }),
    [type, variant]
  )
  return (
    <AlertContext.Provider value={contextValue}>
      <div
        data-slot="alert"
        data-type={type}
        data-variant={variant}
        role="alert"
        className={cn(alertVariants({ type, variant }), className)}
        {...props}
      />
    </AlertContext.Provider>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  const { type } = React.useContext(AlertContext)
  return (
    <div
      data-slot="alert-title"
      className={cn(alertTitleVariants({ type }), className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { type } = React.useContext(AlertContext)
  return (
    <div
      data-slot="alert-description"
      className={cn(alertDescriptionVariants({ type }), className)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  )
}

function AlertHandlers({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-button"
      className={cn(alertButtonVariants(), className)}
      {...props}
    />
  )
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertHandlers,
  alertVariants,
}
