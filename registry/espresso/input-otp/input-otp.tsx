"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { MinusIcon } from "lucide-react"

// Variant/size are driven entirely from the container via descendant selectors
// (`[&_[data-slot=input-otp-slot]]`), so no React context is needed — the slots
// stay "dumb" and only carry layout + their own active/invalid state classes.
const inputOTPVariants = cva(
  "cn-input-otp flex items-center gap-2 has-disabled:opacity-50",
  {
    variants: {
      variant: {
        outline: [
          "[&_[data-slot=input-otp-slot]]:bg-transparent [&_[data-slot=input-otp-slot]]:shadow-default",
          "[&_[data-slot=input-otp-slot][data-active=true]]:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]",
          "[&_[aria-invalid=true]_[data-slot=input-otp-slot]]:shadow-[0px_1px_1px_#0000000f,0px_0px_0px_1px_var(--error-outline)]",
          "[&_[aria-invalid=true]_[data-slot=input-otp-slot][data-active=true]]:shadow-[0px_0px_0px_1px_var(--destructive)]",
        ],
        subtle: [
          "[&_[data-slot=input-otp-slot]]:bg-secondary",
          "[&_[data-slot=input-otp-slot]:not([data-active=true])]:hover:bg-muted",
          "[&_[data-slot=input-otp-slot][data-active=true]]:bg-background",
          "[&_[aria-invalid=true]_[data-slot=input-otp-slot]]:bg-error",
        ],
      },
      size: {
        xs: "[&_[data-slot=input-otp-slot]]:size-6 [&_[data-slot=input-otp-slot]]:rounded-md [&_[data-slot=input-otp-slot]]:text-sm",
        sm: "[&_[data-slot=input-otp-slot]]:size-7 [&_[data-slot=input-otp-slot]]:rounded-md [&_[data-slot=input-otp-slot]]:text-base",
        md: "[&_[data-slot=input-otp-slot]]:size-8 [&_[data-slot=input-otp-slot]]:rounded-md [&_[data-slot=input-otp-slot]]:text-base",
        lg: "[&_[data-slot=input-otp-slot]]:size-10 [&_[data-slot=input-otp-slot]]:rounded-lg [&_[data-slot=input-otp-slot]]:text-lg",
      },
    },
    compoundVariants: [
      // outline variant: reduce slot size by 2px to account for the outer shadow ring
      {
        variant: "outline",
        size: "xs",
        className: "[&_[data-slot=input-otp-slot]]:size-5.5!",
      },
      {
        variant: "outline",
        size: "sm",
        className: "[&_[data-slot=input-otp-slot]]:size-6.5!",
      },
      {
        variant: "outline",
        size: "md",
        className: "[&_[data-slot=input-otp-slot]]:size-7.5!",
      },
      {
        variant: "outline",
        size: "lg",
        className: "[&_[data-slot=input-otp-slot]]:size-9.5!",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
)

function InputOTP({
  className,
  containerClassName,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<typeof OTPInput>, "size"> &
  VariantProps<typeof inputOTPVariants> & {
    containerClassName?: string
  }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        inputOTPVariants({ variant, size }),
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...(props as React.ComponentProps<typeof OTPInput>)}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("group/input-otp-group flex items-center gap-2", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // structural + variant-independent state (bg / shadow / size come from the container)
        "relative flex items-center justify-center font-medium text-secondary-foreground transition-shadow duration-150 outline-none",
        "data-[active=true]:z-10 data-[active=true]:ring-3 data-[active=true]:ring-ring/50",
        "group-aria-invalid/input-otp-group:data-[active=true]:ring-destructive/20 dark:group-aria-invalid/input-otp-group:data-[active=true]:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
