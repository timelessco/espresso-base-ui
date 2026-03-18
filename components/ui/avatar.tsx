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
 * Changelog — compared to shadcn base-ui avatar (npx shadcn@latest add avatar)
 *
 * Architecture:
 *   Before: Manual className strings with data-attribute selectors.
 *   After:  Uses class-variance-authority (CVA) with avatarVariants for variant/size management.
 *           Exported avatarVariants for external use.
 *
 * Avatar (Root):
 *   Before: size: "sm" (24px) | "default" (32px) | "lg" (40px). Always rounded-full.
 *           Had after: pseudo-element border and dark: mix-blend classes.
 *   After:  size: "xs" (16px) | "sm" (20px) | "default" (24px) | "lg" (28px) | "xl" (32px) | "2xl" (40px) | "3xl" (46px).
 *           Added variant: "circle" (default) | "square".
 *           Square variant uses compoundVariants with design token border-radius per size.
 *           Removed after: pseudo-element border and dark: classes.
 *           Added items-center/justify-center for direct icon children.
 *           Added [&>svg] sizing per size for icon avatars.
 *           Added --overlap CSS variable per size for AvatarGroup spacing.
 *           Added bg-secondary background.
 *
 * AvatarImage:
 *   Before: rounded-full, object-cover.
 *   After:  rounded-[inherit] (inherits from parent for square support), object-cover.
 *
 * AvatarFallback:
 *   Before: rounded-full, bg-muted, text-sm, text-muted-foreground. Only sm text override.
 *   After:  rounded-[inherit], bg-secondary, text-secondary-foreground.
 *           Font size per size: xs=text-2xs, sm=text-sm, default=text-base, lg=text-base,
 *           xl=text-lg, 2xl=text-xl, 3xl=text-2xl.
 *           Added leading-base, font-medium, tracking-base.
 *           Added [&_svg] sizing per size for fallback icons.
 *
 * AvatarBadge:
 *   Before: bg-primary, 3 sizes (sm/default/lg).
 *   After:  bg-green-500, 7 sizes (xs through 3xl) with per-size badge and icon dimensions.
 *           Added position offsets for square variant per size.
 *
 * AvatarGroup:
 *   Before: flex -space-x-2, ring-2 ring-background on children.
 *   After:  Uses --overlap CSS variable for per-size negative margin via [&>*+*]:ml-[var(--overlap)].
 *           Added descending z-index stacking (first avatar on top).
 *
 * AvatarGroupCount:
 *   Before: size-8, bg-muted, text-sm. Only sm/lg size overrides.
 *   After:  bg-secondary, text-secondary-foreground. All 7 size overrides with matching font sizes.
 *           Added --overlap CSS variable for consistent group spacing.
 */
