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
          "bg-background shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_#00000012] group-data-[invalid=true]/field:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)]! not-disabled:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] not-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! data-filled:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--border)] data-invalid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)] data-valid:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--success-outline)] dark:shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:not-disabled:hover:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)] dark:not-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]! disabled:bg-input disabled:text-popover-foreground",
        subtle:
          "bg-secondary not-disabled:hover:bg-muted not-disabled:focus:bg-background not-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! not-disabled:active:bg-background dark:not-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]! disabled:bg-input disabled:text-popover-foreground data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success",
        ghost:
          "bg-transparent not-disabled:hover:bg-muted not-disabled:focus:bg-background not-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! not-disabled:active:bg-primary-foreground dark:not-disabled:focus:shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2)]! disabled:bg-transparent disabled:text-popover-foreground data-filled:bg-secondary data-invalid:bg-error data-valid:bg-success",
      },
      size: {
        sm: "min-h-15 rounded-md px-2 py-1.5 text-base",
        default: "min-h-25.5 rounded-lg px-3 py-2.5 text-lg",
        lg: "min-h-31.5 rounded-lg px-3.5 py-3 text-xl",
      },
    },
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
