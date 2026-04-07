import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AlertVariant =
  | "default"
  | "success"
  | "destructive"
  | "warning"
  | "info"
type AlertType = "default" | "banner"

const alertVariants = cva(
  [
    "group/alert relative w-full rounded-lg border text-left leading-base tracking-normal",
    "[&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  ],
  {
    variants: {
      type: {
        default:
          "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 px-3 py-2.5 has-[>[data-slot=alert-action]]:pr-9 has-[>[data-slot=alert-button]]:[&>[data-slot=alert-button]]:col-start-2 has-[>svg]:[&>[data-slot=alert-title]]:col-start-2 has-[>svg]:[&>[data-slot=alert-description]]:col-start-2",
        banner:
          "grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1 border-0 px-3.5 py-2.5 has-[>[data-slot=alert-action]]:pr-9 has-[>[data-slot=alert-button]]:[&>[data-slot=alert-button]]:col-start-2 has-[>svg]:[&>[data-slot=alert-title]]:col-start-2 has-[>svg]:[&>[data-slot=alert-description]]:col-start-2",
      },
      variant: {
        default: "[&>svg]:text-muted-foreground",
        success:
          "[&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        destructive:
          "[&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        warning:
          "[&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
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
        className: "border-border-soft bg-primary-foreground",
      },
      {
        type: "default",
        variant: "destructive",
        className: "border-border-soft bg-primary-foreground",
      },
      {
        type: "default",
        variant: "warning",
        className: "border-border-soft bg-primary-foreground",
      },
      {
        type: "default",
        variant: "info",
        className: "border-border-soft bg-primary-foreground",
      },
      // banner type — variant bg colors
      {
        type: "banner",
        variant: "default",
        className: "bg-primary-foreground",
      },
      {
        type: "banner",
        variant: "success",
        className: "bg-green-50 dark:bg-green-950",
      },
      {
        type: "banner",
        variant: "destructive",
        className: "bg-red-50 dark:bg-red-950",
      },
      {
        type: "banner",
        variant: "warning",
        className: "bg-amber-50 dark:bg-amber-950",
      },
      {
        type: "banner",
        variant: "info",
        className: "bg-blue-50 dark:bg-blue-950",
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
  "mt-2 flex items-center gap-2 *:[button]:border-0 group-data-[type=default]/alert:[&>button:only-child]:w-full",
  {
    variants: {
      variant: {
        default:
          "[&>button:first-child]:bg-secondary [&>button:first-child]:text-secondary-foreground",
        success:
          "[&>button:first-child]:bg-green-600 [&>button:first-child]:text-white dark:[&>button:first-child]:bg-green-500",
        destructive:
          "[&>button:first-child]:bg-red-600 [&>button:first-child]:text-white dark:[&>button:first-child]:bg-red-500",
        warning:
          "[&>button:first-child]:bg-amber-600 [&>button:first-child]:text-white dark:[&>button:first-child]:bg-amber-500",
        info: "[&>button:first-child]:bg-blue-600 [&>button:first-child]:text-white dark:[&>button:first-child]:bg-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
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
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

function AlertButton({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = React.useContext(AlertContext)
  return (
    <div
      data-slot="alert-button"
      className={cn(alertButtonVariants({ variant }), className)}
      {...props}
    />
  )
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertButton,
  alertVariants,
}
