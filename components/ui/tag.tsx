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
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.1654 3.54105C9.36066 3.34579 9.36066 3.02921 9.1654 2.83395C8.97014 2.63868 8.65356 2.63868 8.45829 2.83395L5.99988 5.29236L3.54147 2.83395C3.34621 2.63868 3.02962 2.63868 2.83436 2.83395C2.6391 3.02921 2.6391 3.34579 2.83436 3.54105L5.29278 5.99947L2.83395 8.45829C2.63868 8.65356 2.63868 8.97014 2.83395 9.1654C3.02921 9.36066 3.34579 9.36066 3.54105 9.1654L5.99988 6.70657L8.45871 9.1654C8.65397 9.36066 8.97055 9.36066 9.16582 9.1654C9.36108 8.97014 9.36108 8.65356 9.16582 8.45829L6.70699 5.99947L9.1654 3.54105Z"
        fill="currentColor"
      />
    </svg>
  )
}

const tagVariants = cva(
  "inline-flex shrink-0 items-center gap-1 bg-clip-padding font-normal whitespace-nowrap transition-all outline-none select-none focus-visible:shadow-3xs data-disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/86 active:bg-primary/75 data-disabled:bg-secondary data-disabled:text-card-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted active:bg-accent data-disabled:bg-secondary data-disabled:text-card-foreground",
        outline:
          "bg-background text-secondary-foreground shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_#00000012] hover:border-border-normal focus-visible:bg-secondary active:border-border-strong active:bg-accent dark:shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.1)] data-disabled:border-border data-disabled:bg-secondary data-disabled:text-card-foreground",
        ghost:
          "text-secondary-foreground hover:bg-muted focus-visible:bg-secondary active:bg-accent data-disabled:text-card-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-destructive/50 active:bg-destructive-active data-disabled:bg-destructive-disabled data-disabled:text-destructive-disabled-foreground",
      },
      size: {
        sm: "h-5 rounded-xs px-1.5 text-xs leading-base tracking-normal",
        default: "h-6 rounded-sm px-1.5 text-sm leading-base tracking-normal",
        lg: "h-7 rounded-lg px-2 text-base leading-base tracking-normal",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const tagCloseVariants = cva(
  "-mr-0.5 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs transition-opacity hover:opacity-70 [&>svg]:size-3"
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
