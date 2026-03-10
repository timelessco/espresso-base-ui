"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-[0_8px] w-fit hover:z-1 justify-center whitespace-nowrap transition-all ease-in-out disabled:pointer-events-none pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/86 active:bg-primary/75 disabled:bg-secondary disabled:text-primary/62",
        secondary:
          "bg-secondary text-accent-foreground hover:bg-accent active:bg-primary/12 focus:bg-secondary focus-visible:bg-secondary disabled:bg-secondary disabled:text-primary/42",
        outline:
          "outline outline-1 outline-input -outline-offset-1 text-accent-foreground hover:outline-primary/25 active:bg-primary/12 active:outline-primary/15 focus-visible:bg-secondary focus-visible:bg-secondary  focus-visible:ring-2 focus-visible:ring-ring disabled:bg-secondary disabled:text-primary/42",
        ghost:
          "bg-transparent hover:bg-accent  text-accent-foreground  active:bg-primary/12 focus:bg-secondary focus-visible:bg-secondary  disabled:bg-transparent disabled:text-primary/42",
        destructive:
          "bg-destructive text-white/99 focus-visible:ring-destructive/20 hover:bg-destructive/85 active:bg-destructive/90 disabled:bg-destructive/25 disabled:text-destructive/50",
      },
      size: {
        sm: "gap-2 rounded-lg px-2 py-1.5 text-base font-normal leading-tight tracking-5 [&_svg:not([class*='size-'])]:size-4",
        md: "gap-2 rounded-lg px-2.5 py-[7px] text-base font-medium leading-tight tracking-3 [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "gap-2 rounded-xl px-3 py-2.5 text-lg font-medium leading-tight tracking-4 [&_svg:not([class*='size-'])]:size-5",
        xl: "gap-2 rounded-2xl px-[14px] py-[11px] text-xl font-medium leading-tight tracking-1 [&_svg:not([class*='size-'])]:size-6",
        "2xl":
          "gap-2 rounded-3xl px-4 py-3.5 text-2xl font-medium leading-tight tracking-2 [&_svg:not([class*='size-'])]:size-6",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "p-1.5" },
      { iconOnly: true, size: "md", className: "p-[7px]" },
      { iconOnly: true, size: "lg", className: "p-2.5" },
      { iconOnly: true, size: "xl", className: "p-[11px]" },
      { iconOnly: true, size: "2xl", className: "p-3.5" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    iconOnly?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size = "md",
  iconOnly = false,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, iconOnly, className }))}
      {...(props as React.ComponentPropsWithoutRef<typeof ButtonPrimitive>)}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
