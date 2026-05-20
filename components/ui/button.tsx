"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 transform-gpu items-center justify-center bg-clip-padding text-sm whitespace-nowrap outline-none select-none focus-visible:shadow-3xs disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/86 disabled:bg-secondary disabled:text-card-foreground in-[[data-slot=button-group]:not([data-detached])]:active:bg-primary/75 [@media(hover:none)]:active:bg-primary/75",
        outline:
          "border border-border bg-background text-secondary-foreground hover:border-border-normal disabled:border-border disabled:bg-secondary disabled:text-card-foreground in-[[data-slot=button-group]:not([data-detached])]:active:border-border-strong in-[[data-slot=button-group]:not([data-detached])]:active:bg-secondary [@media(hover:none)]:active:border-border-strong [@media(hover:none)]:active:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted disabled:bg-secondary disabled:text-card-foreground in-[[data-slot=button-group]:not([data-detached])]:active:bg-accent [@media(hover:none)]:active:bg-accent",
        ghost:
          "text-secondary-foreground hover:bg-muted disabled:text-card-foreground in-[[data-slot=button-group]:not([data-detached])]:active:bg-secondary [@media(hover:none)]:active:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-destructive/50 disabled:bg-destructive-disabled disabled:text-destructive-disabled-foreground in-[[data-slot=button-group]:not([data-detached])]:active:bg-destructive-active [@media(hover:none)]:active:bg-destructive-active",
        link: "text-secondary-foreground underline-offset-4 hover:underline disabled:text-card-foreground in-[[data-slot=button-group]:not([data-detached])]:active:bg-secondary [@media(hover:none)]:active:bg-secondary",
        inverted:
          "bg-[var(--btn-inverted-bg,#fff)] text-[var(--btn-inverted-fg,#171717)] shadow-md hover:bg-[color-mix(in_oklch,var(--btn-inverted-bg,#fff),black_2%)] in-[[data-slot=button-group]:not([data-detached])]:active:bg-[color-mix(in_oklch,var(--btn-inverted-bg,#fff),black_3%)] dark:hover:bg-[color-mix(in_oklch,var(--btn-inverted-bg,#fff),white_5%)] dark:in-[[data-slot=button-group]:not([data-detached])]:active:bg-[color-mix(in_oklch,var(--btn-inverted-bg,#fff),white_12%)] [@media(hover:none)]:active:bg-[color-mix(in_oklch,var(--btn-inverted-bg,#fff),black_3%)] dark:[@media(hover:none)]:active:bg-[color-mix(in_oklch,var(--btn-inverted-bg,#fff),white_12%)]",
        "inverted-ghost":
          "bg-[var(--btn-inverted-ghost-bg,transparent)] text-secondary-foreground hover:bg-muted in-[[data-slot=button-group]:not([data-detached])]:active:bg-accent dark:hover:bg-[color-mix(in_oklch,var(--btn-inverted-ghost-fg,#383838)_15%,transparent)] dark:in-[[data-slot=button-group]:not([data-detached])]:active:bg-[color-mix(in_oklch,var(--btn-inverted-ghost-fg,#383838)_25%,transparent)] [@media(hover:none)]:active:bg-accent dark:[@media(hover:none)]:active:bg-[color-mix(in_oklch,var(--btn-inverted-ghost-fg,#383838)_25%,transparent)]",
      },
      size: {
        xs: "h-6 gap-2 rounded-md px-1.5 text-sm leading-base font-normal tracking-normal in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3 [&_svg:not([class*='size-'])]:max-h-3 [&_svg:not([class*='size-'])]:max-w-3",

        sm: "h-7 gap-2 rounded-md px-2 text-base leading-base font-normal tracking-normal in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='size-'])]:max-h-4 [&_svg:not([class*='size-'])]:max-w-4",
        default:
          "h-8 gap-2 rounded-md px-2 text-base leading-base font-medium tracking-normal [&_svg:not([class*='size-'])]:size-4.5 [&_svg:not([class*='size-'])]:max-h-4.5 [&_svg:not([class*='size-'])]:max-w-4.5", // md
        lg: "h-10 gap-2 rounded-lg px-3 text-lg leading-base font-medium tracking-normal [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:max-h-5 [&_svg:not([class*='size-'])]:max-w-5",
        xl: "h-[46px] gap-2 rounded-xl px-3.5 text-xl leading-base font-medium tracking-normal [&_svg:not([class*='size-'])]:size-6 [&_svg:not([class*='size-'])]:max-h-6 [&_svg:not([class*='size-'])]:max-w-6",
        "2xl":
          "h-13 gap-2 rounded-2xl px-4 text-2xl leading-base font-medium tracking-normal [&_svg:not([class*='size-'])]:size-6 [&_svg:not([class*='size-'])]:max-h-6 [&_svg:not([class*='size-'])]:max-w-6",

        "icon-xs":
          "size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3 [&_svg:not([class*='size-'])]:max-h-3 [&_svg:not([class*='size-'])]:max-w-3",
        "icon-sm":
          "size-7 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='size-'])]:max-h-4 [&_svg:not([class*='size-'])]:max-w-4",
        icon: "size-8 rounded-md [&_svg:not([class*='size-'])]:size-4.5 [&_svg:not([class*='size-'])]:max-h-4.5 [&_svg:not([class*='size-'])]:max-w-4.5",
        "icon-lg":
          "size-10 rounded-lg [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:max-h-5 [&_svg:not([class*='size-'])]:max-w-5",
        "icon-xl":
          "size-[46px] rounded-xl [&_svg:not([class*='size-'])]:size-6 [&_svg:not([class*='size-'])]:max-h-6 [&_svg:not([class*='size-'])]:max-w-6",
        "icon-2xl":
          "size-13 rounded-2xl [&_svg:not([class*='size-'])]:size-6 [&_svg:not([class*='size-'])]:max-h-6 [&_svg:not([class*='size-'])]:max-w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
