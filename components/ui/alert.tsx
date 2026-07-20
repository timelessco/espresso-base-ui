import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AlertVariant = "default" | "success" | "destructive" | "warning" | "info"
type AlertType = "default" | "banner"

const alertVariants = cva(
  [
    "group/alert relative w-full border text-left leading-base tracking-normal",
    "[&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      type: {
        default:
          "grid grid-cols-[auto_1fr] gap-x-1.5 gap-y-1 rounded-xl p-3 has-[>[data-slot=alert-action]]:pr-3 has-[>[data-slot=alert-button]]:[&>[data-slot=alert-button]]:col-span-2 has-[>svg]:[&>[data-slot=alert-description]]:col-span-2 has-[>svg]:[&>[data-slot=alert-title]]:col-start-2",
        banner:
          "grid grid-cols-[auto_1fr] gap-x-1.5 gap-y-1 rounded-lg border-0 p-3 has-[>[data-slot=alert-action]]:pr-9 [&_[data-slot=alert-button]>button[data-variant=secondary]]:bg-surface! [&_[data-slot=alert-button]>button[data-variant=secondary]]:shadow-elevation-sm [&_[data-slot=alert-button]>button[data-variant=secondary]]:hover:bg-gray-50/10! [&:not(:has(>[data-slot=alert-button]))]:flex! [&:not(:has(>[data-slot=alert-button]))]:items-center! [&:not(:has(>[data-slot=alert-button]))]:py-1.5! [&:not(:has(>[data-slot=alert-button]))]:pr-1.5! [&:not(:has(>[data-slot=alert-button]))]:pl-3.5! [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:relative! [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:top-auto! [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:right-auto! [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:ml-auto! [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:flex [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:items-center [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-action]]:gap-1 [&:not(:has(>[data-slot=alert-button]))>[data-slot=alert-title]]:text-normal! has-[>[data-slot=alert-button]]:[&>[data-slot=alert-button]]:col-span-2 has-[>svg]:[&>[data-slot=alert-description]]:col-span-2 has-[>svg]:[&>[data-slot=alert-title]]:col-start-2",
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
        className: "border-transparent bg-transparent shadow-default",
      },
      {
        type: "default",
        variant: "success",
        className:
          "border-transparent bg-transparent shadow-default [&_[data-slot=alert-button]>button]:bg-success/80! [&_[data-slot=alert-button]>button]:text-success-foreground [&_[data-slot=alert-button]>button]:hover:bg-success! [&_[data-slot=alert-button]>button]:active:bg-success/60! dark:[&_[data-slot=alert-button]>button]:hover:bg-[color-mix(in_oklch,var(--success),white_5%)]! dark:[&_[data-slot=alert-button]>button]:active:bg-[color-mix(in_oklch,var(--success),white_10%)]!",
      },
      {
        type: "default",
        variant: "destructive",
        className:
          "border-transparent bg-transparent shadow-default [&_[data-slot=alert-button]>button]:bg-error/80! [&_[data-slot=alert-button]>button]:text-error-foreground [&_[data-slot=alert-button]>button]:hover:bg-error! [&_[data-slot=alert-button]>button]:active:bg-error/60! dark:[&_[data-slot=alert-button]>button]:hover:bg-[color-mix(in_oklch,var(--error),white_5%)]! dark:[&_[data-slot=alert-button]>button]:active:bg-[color-mix(in_oklch,var(--error),white_10%)]!",
      },
      {
        type: "default",
        variant: "warning",
        className:
          "border-transparent bg-transparent shadow-default [&_[data-slot=alert-button]>button]:bg-warning/80! [&_[data-slot=alert-button]>button]:text-warning-foreground [&_[data-slot=alert-button]>button]:hover:bg-warning! [&_[data-slot=alert-button]>button]:active:bg-warning/60! dark:[&_[data-slot=alert-button]>button]:hover:bg-[color-mix(in_oklch,var(--warning),white_5%)]! dark:[&_[data-slot=alert-button]>button]:active:bg-[color-mix(in_oklch,var(--warning),white_10%)]!",
      },
      {
        type: "default",
        variant: "info",
        className:
          "border-transparent bg-transparent shadow-default [&_[data-slot=alert-button]>button]:bg-info/80! [&_[data-slot=alert-button]>button]:text-info-foreground [&_[data-slot=alert-button]>button]:hover:bg-info! [&_[data-slot=alert-button]>button]:active:bg-info/60! dark:[&_[data-slot=alert-button]>button]:hover:bg-[color-mix(in_oklch,var(--info),white_5%)]! dark:[&_[data-slot=alert-button]>button]:active:bg-[color-mix(in_oklch,var(--info),white_10%)]!",
      },
      // banner type — neutral bg-input background, plain secondary buttons
      {
        type: "banner",
        variant: "default",
        className: "border border-border-soft bg-input",
      },
      {
        type: "banner",
        variant: "success",
        className: "border border-border-soft bg-input",
      },
      {
        type: "banner",
        variant: "destructive",
        className: "border border-border-soft bg-input",
      },
      {
        type: "banner",
        variant: "warning",
        className: "border border-border-soft bg-input",
      },
      {
        type: "banner",
        variant: "info",
        className: "border border-border-soft bg-input",
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
  "leading-xl font-normal tracking-normal text-wrap text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
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
      className={cn(alertTitleVariants({ type }), "text-foreground", className)}
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
      className={cn("absolute top-1.5 right-1.5", className)}
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
