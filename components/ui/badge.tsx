import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent leading-base font-normal tracking-normal whitespace-nowrap transition-all [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-muted-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline:
          "bg-background text-muted-foreground shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_#00000012] dark:shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.1)]",
        ghost: "text-muted-foreground",
        link: "overflow-visible text-muted-foreground underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-4 px-1.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-2.5!",
        md: "h-5 px-1.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3!",
        lg: "h-6 px-2 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&>svg]:size-3!",
      },
    },
    compoundVariants: [
      // outline variant: reduce height by 2px for each size to account for outer shadow ring
      { variant: "outline", size: "default", className: "h-3.5!" },
      { variant: "outline", size: "md", className: "h-4.5!" },
      { variant: "outline", size: "lg", className: "h-5.5!" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }

/**
 * Changelog — compared to shadcn base-ui badge (npx shadcn@latest add badge)
 *
 * Size variant:
 *   Before: No size variant. Single fixed size: h-5, px-2, text-xs, [&>svg]:size-3.
 *   After:  Added size variant with 3 options:
 *             default (sm) → h-4 (16px), text-xs (12px), [&>svg]:size-2.5 (10px)
 *             md           → h-5 (20px), text-xs (12px), [&>svg]:size-3 (12px)
 *             lg           → h-6 (24px), text-sm (13px), [&>svg]:size-3 (12px)
 *           Each size has proportional px padding and icon padding adjustments.
 *
 * Base classes:
 *   Before: h-5, px-2, py-0.5, text-xs, font-medium, focus-visible styles inline.
 *   After:  Removed fixed h/px/text from base (moved to size variants).
 *           Changed font-medium to font-normal.
 *           Added leading-base, tracking-normal.
 *
 * Link variant:
 *   Before: overflow-hidden clipped the underline on hover.
 *   After:  Added overflow-visible to link variant.
 *
 * Variant changes:
 *   Before: destructive used bg-destructive/10 with text-destructive.
 *   After:  destructive uses bg-destructive with text-destructive-foreground.
 *   Before: secondary used text-secondary-foreground.
 *   After:  secondary uses text-muted-foreground.
 */
