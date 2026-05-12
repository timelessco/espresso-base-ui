"use client"

import * as React from "react"
import { toast } from "sonner"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function CloseIcon({ className }: { className?: string }) {
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
        d="M12.8563 3.14638C12.6611 2.95125 12.3445 2.95116 12.1493 3.14638L8.00192 7.29378L3.85452 3.14638C3.65929 2.95116 3.34276 2.95125 3.14748 3.14638C2.95222 3.34165 2.95222 3.65815 3.14748 3.85342L7.29488 8.00082L3.14638 12.1493C2.95116 12.3445 2.95125 12.6611 3.14638 12.8563C3.34165 13.0516 3.65815 13.0516 3.85342 12.8563L8.00192 8.70785L12.1504 12.8563C12.3457 13.0516 12.6622 13.0516 12.8574 12.8563C13.0526 12.6611 13.0527 12.3445 12.8574 12.1493L8.70895 8.00082L12.8563 3.85342C13.0516 3.65815 13.0516 3.34165 12.8563 3.14638Z"
        fill="currentColor"
      />
    </svg>
  )
}

const notificationVariants = cva(
  "relative flex w-[390px] overflow-hidden rounded-lg bg-card px-3 py-2.5 shadow-3xl",
  {
    variants: {
      variant: {
        inline: "flex-row items-center gap-2",
        "long-text": "flex-col gap-3 px-3! pt-3! pb-4!",
        notification: "flex-col gap-3",
        modal: "flex-col items-center gap-3 px-3! py-4! text-center",
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
)

type ActionType = "none" | "single" | "dual" | "split"

type NotificationAction = {
  label: string
  onClick: () => void
  variant?: React.ComponentProps<typeof Button>["variant"]
}

type NotificationOptions = VariantProps<typeof notificationVariants> & {
  title: string
  description?: string
  prefix?: React.ReactNode
  suffix?: boolean
  actionType?: ActionType
  actions?: NotificationAction[]
  timestamp?: string
  unread?: boolean
  duration?: number
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
}

function notify(options: NotificationOptions) {
  const {
    variant = "inline",
    title,
    description,
    prefix,
    suffix = false,
    actionType = "none",
    actions = [],
    timestamp,
    unread,
    duration,
    position,
  } = options

  const isSplit = actionType === "split"

  return toast.custom(
    (id) => (
      <div
        data-slot="notification"
        data-variant={variant}
        className={cn(
          notificationVariants({ variant }),
          suffix && "pr-10",
          isSplit && "flex-row! items-stretch! gap-0! p-0!"
        )}
      >
        {isSplit ? (
          <SplitLayout
            id={id}
            title={title}
            description={description}
            prefix={prefix}
            actions={actions}
          />
        ) : variant === "modal" ? (
          <ModalLayout
            id={id}
            title={title}
            description={description}
            actionType={actionType}
            actions={actions}
          />
        ) : (
          <DefaultLayout
            id={id}
            variant={variant!}
            title={title}
            description={description}
            prefix={prefix}
            timestamp={timestamp}
            unread={unread}
            actionType={actionType}
            actions={actions}
          />
        )}

        {suffix && !isSplit && (
          <Button
            variant="ghost"
            size="icon-xs"
            className={cn(
              "absolute right-3",
              variant === "inline" ? "top-1/2 -translate-y-1/2" : "top-2.5"
            )}
            onClick={() => toast.dismiss(id)}
          >
            <CloseIcon className="size-4" />
          </Button>
        )}
      </div>
    ),
    {
      duration: duration ?? 90000,
      position,
      unstyled: true,
      className:
        "!p-0 !shadow-none !border-none !bg-transparent !gap-0 [&_[data-content]]:!p-0 [&_[data-content]]:!m-0 [&_[data-title]]:!p-0 [&_[data-title]]:!m-0 [&_[data-content]]:!gap-0 [&_[data-title]]:!gap-0",
    }
  )
}

// --- Layouts ---

function DefaultLayout({
  id,
  variant,
  title,
  description,
  prefix,
  timestamp,
  unread,
  actionType,
  actions,
}: {
  id: string | number
  variant: string
  title: string
  description?: string
  prefix?: React.ReactNode
  timestamp?: string
  unread?: boolean
  actionType: ActionType
  actions: NotificationAction[]
}) {
  const isInline = variant === "inline"

  return (
    <>
      <div
        className={cn(
          "flex flex-1 gap-2.5",
          isInline ? "items-center" : "items-start"
        )}
      >
        {prefix && (
          <span className="mt-0.5 shrink-0 text-muted-foreground [&_svg]:size-4">
            {prefix}
          </span>
        )}
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-base leading-base font-medium tracking-wider text-foreground">
            {title}
          </span>
          {description && (
            <span className="text-base leading-lg font-normal tracking-wider text-muted-foreground">
              {description}
            </span>
          )}
          {timestamp && (
            <span className="mt-0.5 text-xs leading-base font-normal tracking-wider text-muted-foreground">
              {timestamp}
            </span>
          )}

          {/* Dual action buttons inside content column */}
          {!isInline && actionType === "dual" && actions.length > 0 && (
            <div className="mt-1 flex flex-row gap-2">
              {actions.map((a, i) => (
                <Button
                  key={i}
                  variant={a.variant ?? (i === 0 ? "secondary" : "outline")}
                  size="sm"
                  onClick={() => {
                    a.onClick()
                    toast.dismiss(id)
                  }}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          )}

          {/* Single action button inside content column */}
          {!isInline && actionType === "single" && actions.length > 0 && (
            <div className="mt-1">
              <Button
                variant={actions[0].variant ?? "outline"}
                size="sm"
                className="w-full"
                onClick={() => {
                  actions[0].onClick()
                  toast.dismiss(id)
                }}
              >
                {actions[0].label}
              </Button>
            </div>
          )}
        </div>

        {/* Inline single action */}
        {isInline && actionType !== "none" && actions.length > 0 && (
          <Button
            variant={actions[0].variant ?? "ghost"}
            size="sm"
            className="shrink-0"
            onClick={() => {
              actions[0].onClick()
              toast.dismiss(id)
            }}
          >
            {actions[0].label}
          </Button>
        )}

        {unread && (
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
        )}
      </div>
    </>
  )
}

function SplitLayout({
  id,
  title,
  description,
  prefix,
  actions,
}: {
  id: string | number
  title: string
  description?: string
  prefix?: React.ReactNode
  actions: NotificationAction[]
}) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          {prefix && (
            <span className="shrink-0 text-muted-foreground [&_svg]:size-4">
              {prefix}
            </span>
          )}
          <span className="text-base leading-base font-semibold tracking-wider text-foreground">
            {title}
          </span>
        </div>
        {description && (
          <span
            className={cn(
              "text-base leading-lg font-normal tracking-wider text-muted-foreground",
              prefix && "pl-6"
            )}
          >
            {description}
          </span>
        )}
      </div>
      {actions.length > 0 && (
        <div className="flex flex-col border-l border-border">
          {actions.map((a, i) => (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 rounded-none px-4",
                i > 0 && "border-t border-border"
              )}
              onClick={() => {
                a.onClick()
                toast.dismiss(id)
              }}
            >
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

function ModalLayout({
  id,
  title,
  description,
  actionType,
  actions,
}: {
  id: string | number
  title: string
  description?: string
  actionType: ActionType
  actions: NotificationAction[]
}) {
  return (
    <>
      <div className="flex w-full flex-col gap-1 text-center">
        <span className="text-base leading-base font-semibold tracking-wider text-foreground">
          {title}
        </span>
        {description && (
          <span className="text-base leading-lg font-normal tracking-wider text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      {actionType !== "none" && actions.length > 0 && (
        <div
          className={cn(
            "flex w-full gap-2",
            actionType === "single" ? "flex-col" : "flex-row"
          )}
        >
          {actions.map((a, i) => (
            <Button
              key={i}
              variant={
                a.variant ??
                (actions.length > 1
                  ? i === 0
                    ? "secondary"
                    : "outline"
                  : "secondary")
              }
              size="sm"
              className={actionType === "single" ? "w-full" : "flex-1"}
              onClick={() => {
                a.onClick()
                toast.dismiss(id)
              }}
            >
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

export {
  notify,
  notificationVariants,
  type NotificationOptions,
  type NotificationAction,
}
