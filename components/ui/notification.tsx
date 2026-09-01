"use client"

import * as React from "react"
import {
  Toast,
  ToastPortal,
  ToastProvider,
  ToastViewport,
  createToastManager,
  useToastManager,
} from "@/components/ui/toast"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NotificationToastData = { render: (id: string) => React.ReactNode }

// A dedicated toast manager so notifications stack/animate independently of the
// standard toast Toaster, while reusing the Toast primitives for rendering.
const notificationManager = createToastManager<NotificationToastData>()

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
  "relative flex min-w-[390px] overflow-hidden rounded-lg bg-card tracking-wider shadow-elevation-md",
  {
    variants: {
      variant: {
        default: "min-h-10 flex-row items-center gap-1 px-3 py-1",
        banner: "flex-col gap-1 p-3 pb-4",
        avatar: "flex-row items-start gap-2.5 p-3",
        compact: "flex-col items-center gap-3 p-3 py-4 text-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type NotificationVariant = "default" | "banner" | "avatar" | "compact"
type ActionType = "none" | "single" | "dual"

type NotificationAction = {
  label: string
  onClick: () => void
  variant?: React.ComponentProps<typeof Button>["variant"]
}

type NotificationOptions = VariantProps<typeof notificationVariants> & {
  title: string
  description?: string
  /** Leading icon (default/banner) or avatar (avatar variant). */
  prefix?: React.ReactNode
  /** Show the close (✕) icon button. */
  showClose?: boolean
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
    variant = "default",
    title,
    description,
    prefix,
    showClose = false,
    actionType = "none",
    actions = [],
    timestamp,
    unread,
    duration,
  } = options

  const visibleActions =
    actionType === "none"
      ? []
      : actions.slice(0, actionType === "single" ? 1 : 2)

  const layoutProps = {
    title,
    description,
    prefix,
    timestamp,
    unread,
    showClose,
    actions: visibleActions,
  }

  return notificationManager.add({
    timeout: duration ?? 90000,
    data: {
      render: (id) => (
        <div
          data-slot="notification"
          data-variant={variant}
          className={cn(notificationVariants({ variant }))}
        >
          {variant === "default" ? (
            <DefaultLayout id={id} {...layoutProps} />
          ) : variant === "banner" ? (
            <BannerLayout id={id} {...layoutProps} />
          ) : variant === "avatar" ? (
            <AvatarLayout id={id} {...layoutProps} />
          ) : (
            <CompactLayout id={id} {...layoutProps} />
          )}
        </div>
      ),
    },
  })
}

// --- Shared pieces ---

type LayoutProps = {
  id: string
  title: string
  description?: string
  prefix?: React.ReactNode
  timestamp?: string
  unread?: boolean
  showClose: boolean
  actions: NotificationAction[]
}

function CloseButton({ id, className }: { id: string; className?: string }) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label="Dismiss notification"
      className={className}
      onClick={() => notificationManager.close(id)}
    >
      <CloseIcon className="size-3.5" />
    </Button>
  )
}

function ActionButtons({
  id,
  actions,
  className,
  buttonClassName,
}: {
  id: string
  actions: NotificationAction[]
  className?: string
  buttonClassName?: string
}) {
  if (actions.length === 0) return null
  return (
    <div className={cn("flex flex-row gap-1.5", className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant ?? (index === 0 ? "secondary" : "outline")}
          size="sm"
          className={cn("tracking-wider", buttonClassName)}
          onClick={() => {
            action.onClick()
            notificationManager.close(id)
          }}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}

// --- Layouts ---

// Single row: [icon] title ... [text action(s)] [close]
function DefaultLayout({ id, title, prefix, showClose, actions }: LayoutProps) {
  return (
    <>
      {prefix && (
        <span className="shrink-0 text-muted-foreground [&_svg]:size-4">
          {prefix}
        </span>
      )}
      <span className="flex-1 text-base leading-base font-medium text-foreground">
        {title}
      </span>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant ?? "ghost"}
          size="sm"
          className="shrink-0 tracking-wider"
          onClick={() => {
            action.onClick()
            notificationManager.close(id)
          }}
        >
          {action.label}
        </Button>
      ))}
      {showClose && <CloseButton id={id} className="shrink-0" />}
    </>
  )
}

// Column: [icon] title / description / action buttons; close pinned top-right.
function BannerLayout({
  id,
  title,
  description,
  prefix,
  showClose,
  actions,
}: LayoutProps) {
  return (
    <>
      <div className={cn("flex items-center gap-2.5", showClose && "pr-8")}>
        {prefix && (
          <span className="shrink-0 text-muted-foreground [&_svg]:size-4">
            {prefix}
          </span>
        )}
        <span className="text-base leading-base font-medium text-foreground">
          {title}
        </span>
      </div>
      {description && (
        <span className="text-base leading-lg font-normal text-muted-foreground">
          {description}
        </span>
      )}
      <ActionButtons id={id} actions={actions} className="mt-1" />
      {showClose && <CloseButton id={id} className="absolute top-2 right-2" />}
    </>
  )
}

// Row: avatar + content column (title / description / timestamp / actions);
// close or unread dot pinned top-right.
function AvatarLayout({
  id,
  title,
  description,
  prefix,
  timestamp,
  unread,
  showClose,
  actions,
}: LayoutProps) {
  return (
    <>
      {prefix && (
        <span className="mt-0.5 shrink-0 text-muted-foreground">{prefix}</span>
      )}
      <div className={cn("flex flex-1 flex-col gap-1", showClose && "pr-8")}>
        <span className="text-base leading-base font-medium text-foreground">
          {title}
        </span>
        {description && (
          <span className="text-base leading-lg font-normal text-muted-foreground">
            {description}
          </span>
        )}
        {timestamp && (
          <span className="mt-0.5 text-xs leading-base font-normal tracking-normal text-muted-foreground">
            {timestamp}
          </span>
        )}
        <ActionButtons id={id} actions={actions} className="mt-1" />
      </div>
      {showClose ? (
        <CloseButton id={id} className="absolute top-2 right-2" />
      ) : (
        unread && (
          <span className="absolute top-3.5 right-3.5 size-2 rounded-full bg-blue-500" />
        )
      )}
    </>
  )
}

// Centered column: title / description / full-width action buttons.
function CompactLayout({
  id,
  title,
  description,
  showClose,
  actions,
}: LayoutProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-1 text-center">
        <span className="text-base leading-base font-medium text-foreground">
          {title}
        </span>
        {description && (
          <span className="text-base leading-lg font-normal text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      <ActionButtons
        id={id}
        actions={actions}
        className="w-full"
        buttonClassName={actions.length > 1 ? "flex-1" : "w-full"}
      />
      {showClose && <CloseButton id={id} className="absolute top-2 right-2" />}
    </>
  )
}

// --- Toaster ---

// Renders each notification's custom card inside a Toast root, stripped of the
// standard toast shell (bg/shadow/radius/padding) so only the card's own styles
// show — while keeping the root's stacking/slide animation.
function NotificationList() {
  const { toasts } = useToastManager()

  return toasts.map((toastItem) => (
    <Toast
      key={toastItem.id}
      toast={toastItem}
      className="w-auto rounded-none bg-transparent p-0 text-foreground shadow-none"
    >
      {(toastItem.data as NotificationToastData | undefined)?.render?.(
        toastItem.id
      )}
    </Toast>
  ))
}

function NotificationToaster() {
  return (
    <ToastProvider toastManager={notificationManager}>
      <ToastPortal>
        <ToastViewport className="max-w-[26rem]">
          <NotificationList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

export {
  notify,
  NotificationToaster,
  notificationVariants,
  type NotificationOptions,
  type NotificationAction,
  type NotificationVariant,
}
