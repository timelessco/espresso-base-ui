"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap tracking-base leading-base transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-background disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/86 active:bg-primary/75 disabled:bg-primary/5 disabled:text-primary/62",
        secondary:
          "bg-secondary text-accent-foreground hover:bg-accent active:bg-input focus:bg-secondary disabled:text-accent-foreground/51",
        outline:
          "border border-input text-accent-foreground hover:border-primary/25 active:bg-accent disabled:bg-secondary disabled:text-primary/42",
        ghost:
          "bg-transparent text-accent-foreground hover:bg-accent hover:text-foreground active:bg-input aria-expanded:bg-muted disabled:text-primary/42",
        destructive:
          "bg-destructive text-white/90 hover:bg-destructive/80 active:bg-destructive/90 focus-visible:ring-destructive/50 disabled:bg-destructive/25 disabled:text-destructive/50 outline-none",
      },
      size: {
        sm: "gap-2 h-7 rounded-lg px-2 text-base font-normal [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='size-'])]:max-w-4 [&_svg:not([class*='size-'])]:max-h-4",
        md: "gap-2 h-8 rounded-lg px-2.5 text-base font-medium [&_svg:not([class*='size-'])]:size-4.5 [&_svg:not([class*='size-'])]:max-w-4.5 [&_svg:not([class*='size-'])]:max-h-4.5",
        lg: "gap-2 h-10 rounded-xl px-3 text-lg font-medium [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:max-w-5 [&_svg:not([class*='size-'])]:max-h-5",
        xl: "gap-2 h-[46px] rounded-2xl px-3.5 text-xl font-medium [&_svg:not([class*='size-'])]:size-6 [&_svg:not([class*='size-'])]:max-w-6 [&_svg:not([class*='size-'])]:max-h-6",
        "2xl":
          "gap-2 h-13 rounded-3xl px-4 text-2xl font-medium [&_svg:not([class*='size-'])]:size-6 [&_svg:not([class*='size-'])]:max-w-6 [&_svg:not([class*='size-'])]:max-h-6",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "px-1.5" },
      { iconOnly: true, size: "md", className: "px-2" },
      { iconOnly: true, size: "lg", className: "px-2.5" },
      { iconOnly: true, size: "xl", className: "px-3" },
      { iconOnly: true, size: "2xl", className: "px-3.5" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "md",
  iconOnly = false,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    iconOnly?: boolean;
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, iconOnly, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
