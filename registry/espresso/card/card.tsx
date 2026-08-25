import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-4 overflow-hidden text-sm text-card-foreground shadow-default has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=lg]:gap-5 data-[size=sm]:gap-3 data-[size=xl]:gap-5 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      variant: {
        default:
          "rounded-xl bg-card py-4 data-[size=lg]:pt-5 data-[size=sm]:pt-3 data-[size=xl]:pt-6",
        mail: "rounded-lg bg-card px-3 py-2.5",
        message: "rounded-lg bg-input px-3 py-2",
        call: "rounded-lg bg-card px-3 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  size = "md",
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    size?: "sm" | "md" | "lg" | "xl"
  }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant ?? "default"}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-xl px-4 group-data-[size=lg]/card:px-5 group-data-[size=sm]/card:px-3 group-data-[size=xl]/card:px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=lg]/card:[.border-b]:pb-5 group-data-[size=sm]/card:[.border-b]:pb-3 group-data-[size=xl]/card:[.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium text-foreground group-data-[size=lg]/card:text-lg group-data-[size=sm]/card:text-sm group-data-[size=xl]/card:text-xl",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-4 group-data-[size=lg]/card:px-5 group-data-[size=sm]/card:px-3 group-data-[size=xl]/card:px-6",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl p-4 group-data-[size=lg]/card:p-4 group-data-[size=sm]/card:p-3 group-data-[size=xl]/card:p-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
