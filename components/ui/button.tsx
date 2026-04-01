"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center bg-clip-padding text-sm whitespace-nowrap transition-all outline-none select-none focus-visible:shadow-3xs disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/86 active:bg-primary/75 disabled:bg-secondary disabled:text-card-foreground",
        outline:
          "active:card-foreground border border-border bg-background text-secondary-foreground hover:border-border-normal focus-visible:bg-secondary active:border-border-strong active:bg-accent disabled:border-border disabled:bg-secondary disabled:text-card-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted active:bg-accent disabled:bg-secondary disabled:text-card-foreground",
        ghost:
          "text-secondary-foreground hover:bg-muted focus-visible:bg-secondary active:bg-accent disabled:text-card-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-destructive/50 active:bg-destructive-active disabled:bg-destructive-disabled disabled:text-destructive-disabled-foreground",
        link: "text-secondary-foreground underline-offset-4 hover:underline disabled:text-card-foreground",
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
