"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

const squaredRadiusClasses: Record<string, string> = {
  xs: "rounded-2xs",
  sm: "rounded-xs",
  default: "rounded-xs",
  lg: "rounded-sm",
  xl: "rounded-sm",
  "2xl": "rounded-md",
  "3xl": "rounded-lg",
}

function Avatar({
  className,
  size = "default",
  variant = "circle",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl"
  variant?: "circle" | "square"
}) {
  const isSquare = variant === "square"
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/avatar relative flex size-6 shrink-0 items-center justify-center bg-secondary select-none data-[size=2xl]:size-10 data-[size=3xl]:size-[46px] data-[size=lg]:size-7 data-[size=sm]:size-5 data-[size=xl]:size-8 data-[size=xs]:size-4 [--overlap:-4px] data-[size=xs]:[--overlap:-2px] data-[size=lg]:[--overlap:-5px] data-[size=2xl]:[--overlap:-6px] data-[size=3xl]:[--overlap:-8px]",
        "[&>svg]:size-3.5 data-[size=2xl]:[&>svg]:size-5 data-[size=3xl]:[&>svg]:size-5 data-[size=lg]:[&>svg]:size-4 data-[size=sm]:[&>svg]:size-3 data-[size=xl]:[&>svg]:size-4 data-[size=xs]:[&>svg]:size-2.5",
        isSquare ? squaredRadiusClasses[size] : "rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-[inherit] object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-[inherit] bg-secondary text-base leading-base font-medium tracking-base text-secondary-foreground group-data-[size=2xl]/avatar:text-xl group-data-[size=3xl]/avatar:text-2xl group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-sm group-data-[size=xl]/avatar:text-lg group-data-[size=xs]/avatar:text-2xs group-data-[size=xs]/avatar:font-medium-plus",
        "group-data-[size=2xl]/avatar:[&_svg]:size-5 group-data-[size=3xl]/avatar:[&_svg]:size-5 group-data-[size=default]/avatar:[&_svg]:size-3.5 group-data-[size=lg]/avatar:[&_svg]:size-4 group-data-[size=sm]/avatar:[&_svg]:size-3 group-data-[size=xl]/avatar:[&_svg]:size-4 group-data-[size=xs]/avatar:[&_svg]:size-2.5",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-green-500 text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[variant=square]/avatar:group-data-[size=xs]/avatar:-right-px group-data-[variant=square]/avatar:group-data-[size=xs]/avatar:-bottom-px",
        "group-data-[variant=square]/avatar:group-data-[size=sm]/avatar:-right-px group-data-[variant=square]/avatar:group-data-[size=sm]/avatar:-bottom-px",
        "group-data-[variant=square]/avatar:group-data-[size=default]/avatar:-right-0.5 group-data-[variant=square]/avatar:group-data-[size=default]/avatar:-bottom-0.5",
        "group-data-[variant=square]/avatar:group-data-[size=lg]/avatar:-right-0.5 group-data-[variant=square]/avatar:group-data-[size=lg]/avatar:-bottom-0.5",
        "group-data-[variant=square]/avatar:group-data-[size=xl]/avatar:-right-1 group-data-[variant=square]/avatar:group-data-[size=xl]/avatar:-bottom-1",
        "group-data-[variant=square]/avatar:group-data-[size=2xl]/avatar:-right-1 group-data-[variant=square]/avatar:group-data-[size=2xl]/avatar:-bottom-1",
        "group-data-[variant=square]/avatar:group-data-[size=3xl]/avatar:-right-1 group-data-[variant=square]/avatar:group-data-[size=3xl]/avatar:-bottom-1",
        "group-data-[size=xs]/avatar:size-1 group-data-[size=xs]/avatar:[&>svg]:size-0.75",
        "group-data-[size=sm]/avatar:size-1.25 group-data-[size=sm]/avatar:[&>svg]:size-1",
        "group-data-[size=default]/avatar:size-1.75 group-data-[size=default]/avatar:[&>svg]:size-1.5",
        "group-data-[size=lg]/avatar:size-2 group-data-[size=lg]/avatar:[&>svg]:size-1.5",
        "group-data-[size=xl]/avatar:size-2 group-data-[size=xl]/avatar:[&>svg]:size-1.5",
        "group-data-[size=2xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:[&>svg]:size-2",
        "group-data-[size=3xl]/avatar:size-3 group-data-[size=3xl]/avatar:[&>svg]:size-2.25",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex [&>*+*]:ml-[var(--overlap)] *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background [&>*]:z-[var(--stack-index)] [&>*]:[--stack-index:0] [&>*:nth-child(1)]:[--stack-index:10] [&>*:nth-child(2)]:[--stack-index:9] [&>*:nth-child(3)]:[--stack-index:8] [&>*:nth-child(4)]:[--stack-index:7] [&>*:nth-child(5)]:[--stack-index:6] [&>*:nth-child(6)]:[--stack-index:5] [&>*:nth-child(7)]:[--stack-index:4] [&>*:nth-child(8)]:[--stack-index:3]",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-base leading-base font-medium tracking-base text-secondary-foreground ring-2 ring-background [--overlap:-4px] group-has-data-[size=xs]/avatar-group:size-4 group-has-data-[size=xs]/avatar-group:text-2xs group-has-data-[size=xs]/avatar-group:[--overlap:-2px] group-has-data-[size=sm]/avatar-group:size-5 group-has-data-[size=sm]/avatar-group:text-sm group-has-data-[size=lg]/avatar-group:size-7 group-has-data-[size=lg]/avatar-group:text-base group-has-data-[size=lg]/avatar-group:[--overlap:-5px] group-has-data-[size=xl]/avatar-group:size-8 group-has-data-[size=xl]/avatar-group:text-lg group-has-data-[size=2xl]/avatar-group:size-10 group-has-data-[size=2xl]/avatar-group:text-xl group-has-data-[size=2xl]/avatar-group:[--overlap:-6px] group-has-data-[size=3xl]/avatar-group:size-[46px] group-has-data-[size=3xl]/avatar-group:text-2xl group-has-data-[size=3xl]/avatar-group:[--overlap:-8px]",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}

/**
 * Changelog
 *
 * Size prop:
 *   Before: "sm" | "default" | "lg"
 *   After:  "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl"
 *
 *   Added xs (16px), xl (32px), 2xl (40px), 3xl (46px) sizes.
 *   Changed sm from 24px to 20px, default from 32px to 24px, lg from 40px to 28px.
 *
 * Variant prop:
 *   Before: Not available. All avatars were circular (rounded-full).
 *   After:  Optional `variant` prop added: "circle" (default) | "square".
 *           When variant="square", border-radius is set per size using design token variables:
 *             xs      → --radius-2xs (4px)
 *             sm      → --radius-xs  (5px)
 *             default → --radius-xs  (5px)
 *             lg      → --radius-sm  (6px)
 *             xl      → --radius-sm  (6px)
 *             2xl     → --radius-md  (8px)
 *             3xl     → --radius-lg  (10px)
 */
