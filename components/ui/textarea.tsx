import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full leading-base font-normal tracking-normal text-secondary-foreground outline-none placeholder:text-card-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input disabled:text-popover-foreground",
  ],
  {
    variants: {
      variant: {
        outline:
          "bg-transparent shadow-default transition-shadow duration-150 group-data-[invalid=true]/field:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)]! not-disabled:hover:shadow-raised not-disabled:focus:shadow-raised! disabled:bg-transparent disabled:text-popover-foreground data-filled:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--border)] data-invalid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)] data-valid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--success-outline)]",
        subtle:
          "bg-secondary not-disabled:hover:bg-muted not-disabled:focus:bg-background not-disabled:focus:shadow-raised! not-disabled:active:bg-background disabled:bg-input disabled:text-popover-foreground data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success",
        ghost:
          "bg-transparent not-disabled:hover:bg-muted not-disabled:focus:bg-background not-disabled:focus:shadow-raised! not-disabled:active:bg-primary-foreground disabled:bg-transparent disabled:text-popover-foreground data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success",
      },
      size: {
        sm: "min-h-15 rounded-md px-2 py-1.5 text-base",
        default: "min-h-25.5 rounded-lg px-3 py-2.5 text-lg",
        lg: "min-h-31.5 rounded-lg px-3.5 py-3 text-xl",
      },
    },
    compoundVariants: [
      // outline variant: reduce height by 2px for each size to account for outer shadow ring
      { variant: "outline", size: "sm", className: "min-h-14.5!" },
      { variant: "outline", size: "default", className: "min-h-25!" },
      { variant: "outline", size: "lg", className: "min-h-31!" },
    ],
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant ?? "outline"}
      data-size={size ?? "default"}
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
