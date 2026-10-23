"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function TagCloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        d="M22.791 7.79297C23.1815 7.40248 23.8145 7.40255 24.2051 7.79297C24.5956 8.18349 24.5956 8.81651 24.2051 9.20703L17.4141 15.998L24.207 22.791C24.5971 23.1814 24.597 23.8146 24.207 24.2051C23.8166 24.5955 23.1835 24.5953 22.793 24.2051L16 17.4121L9.20703 24.2051C8.81651 24.5956 8.18349 24.5956 7.79297 24.2051C7.40255 23.8145 7.40248 23.1815 7.79297 22.791L14.5859 15.998L7.79492 9.20703C7.4044 8.81651 7.4044 8.18349 7.79492 7.79297C8.18548 7.40287 8.8186 7.40259 9.20898 7.79297L16 14.584L22.791 7.79297Z"
        fill="currentColor"
      />
    </svg>
  )
}

const tagVariants = cva(
  "inline-flex shrink-0 items-center gap-1 bg-clip-padding font-normal whitespace-nowrap [&>svg]:size-3 [&>svg]:shrink-0 transition-all outline-none select-none focus-visible:shadow-3xs data-disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/86 active:bg-primary/75 data-disabled:bg-secondary data-disabled:text-card-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),black_2%)] focus-visible:bg-[color-mix(in_oklch,var(--secondary),black_2%)] active:bg-[color-mix(in_oklch,var(--secondary),black_5%)] dark:hover:bg-[color-mix(in_oklch,var(--secondary),white_5%)] dark:focus-visible:bg-[color-mix(in_oklch,var(--secondary),white_5%)] dark:active:bg-[color-mix(in_oklch,var(--secondary),white_13%)] data-disabled:bg-secondary data-disabled:text-card-foreground",
        outline:
          "bg-background text-secondary-foreground shadow-default hover:border-border-normal focus-visible:bg-secondary active:border-border-strong active:bg-accent data-disabled:border-border data-disabled:bg-transparent data-disabled:text-card-foreground",
        ghost:
          "text-secondary-foreground hover:bg-muted focus-visible:bg-secondary active:bg-accent data-disabled:text-card-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-destructive/50 active:bg-destructive-active data-disabled:bg-destructive-disabled data-disabled:text-destructive-disabled-foreground",
      },
      size: {
        sm: "h-5 rounded-xs pl-1.5 pr-1 text-xs leading-lg tracking-normal not-has-data-[slot=tag-close]:pr-1.5",
        default:
          "h-6 rounded-sm pl-1.5 pr-1 text-sm leading-lg tracking-normal not-has-data-[slot=tag-close]:pr-1.5",
        lg: "h-7 rounded-md pl-2 pr-1.5 text-base leading-lg tracking-normal not-has-data-[slot=tag-close]:pr-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const tagCloseVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs transition-opacity hover:opacity-70 [&>svg]:size-3"
)

type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    onClose?: () => void
    disabled?: boolean
  }

function Tag({
  className,
  variant,
  size,
  onClose,
  disabled,
  children,
  onKeyDown,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      data-variant={variant ?? "primary"}
      data-size={size ?? "default"}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={onClose && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        if (
          onClose &&
          !disabled &&
          (e.key === "Backspace" || e.key === "Delete")
        ) {
          e.preventDefault()
          onClose()
        }
      }}
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {onClose && (
        <span
          role="button"
          data-slot="tag-close"
          aria-label="Remove"
          aria-hidden={disabled || undefined}
          onClick={(e) => {
            if (disabled) return
            e.stopPropagation()
            onClose()
          }}
          className={tagCloseVariants()}
        >
          <TagCloseIcon />
        </span>
      )}
    </span>
  )
}

export { Tag, tagVariants, type TagProps }
