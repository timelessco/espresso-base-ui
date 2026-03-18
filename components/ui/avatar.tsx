"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "group/avatar relative flex shrink-0 items-center justify-center bg-secondary select-none [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        circle: "rounded-full",
        square: "",
      },
      size: {
        xs: "size-4 [--overlap:-2px] [&>svg]:size-2.5",
        sm: "size-5 [--overlap:-4px] [&>svg]:size-3",
        default: "size-6 [--overlap:-4px] [&>svg]:size-3.5",
        lg: "size-7 [--overlap:-5px] [&>svg]:size-4",
        xl: "size-8 [--overlap:-4px] [&>svg]:size-4",
        "2xl": "size-10 [--overlap:-6px] [&>svg]:size-5",
        "3xl": "size-[46px] [--overlap:-8px] [&>svg]:size-5",
      },
    },
    compoundVariants: [
      { variant: "square", size: "xs", className: "rounded-2xs" },
      { variant: "square", size: "sm", className: "rounded-xs" },
      { variant: "square", size: "default", className: "rounded-xs" },
      { variant: "square", size: "lg", className: "rounded-sm" },
      { variant: "square", size: "xl", className: "rounded-sm" },
      { variant: "square", size: "2xl", className: "rounded-md" },
      { variant: "square", size: "3xl", className: "rounded-lg" },
    ],
    defaultVariants: {
      variant: "circle",
      size: "default",
    },
  }
)

function Avatar({
  className,
  size = "default",
  variant = "circle",
  ...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-variant={variant}
      className={cn(avatarVariants({ variant, size, className }))}
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
  avatarVariants,
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
 *   After:  "circle" (default) | "square".
 *           When variant="square", border-radius is set per size using design token variables:
 *             xs      → --radius-2xs (4px)
 *             sm      → --radius-xs  (5px)
 *             default → --radius-xs  (5px)
 *             lg      → --radius-sm  (6px)
 *             xl      → --radius-sm  (6px)
 *             2xl     → --radius-md  (8px)
 *             3xl     → --radius-lg  (10px)
 *
 * CVA refactor:
 *   Before: Manual conditional classes with data attributes and squaredRadiusClasses map.
 *   After:  Uses class-variance-authority (CVA) with avatarVariants.
 *           variant and size are managed via CVA variants.
 *           Square border-radius per size handled via compoundVariants.
 *           Exported avatarVariants for external use.
 */
