"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const SEGMENT_COUNT = 5

const progressVariants = cva("group/progress flex flex-wrap items-center gap-2.5", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
      xl: "",
    },
    edge: {
      "round-edge": "",
      "square-edge": "",
    },
    type: {
      default: "",
      segmented: "",
    },
  },
  defaultVariants: {
    size: "default",
    edge: "round-edge",
    type: "default",
  },
})

function Progress({
  className,
  children,
  size = "default",
  edge = "round-edge",
  type = "default",
  value,
  min,
  max,
  ...props
}: ProgressPrimitive.Root.Props & VariantProps<typeof progressVariants>) {
  return (
    <ProgressPrimitive.Root
      value={value}
      min={min}
      max={max}
      data-slot="progress"
      data-size={size}
      data-edge={edge}
      data-type={type}
      className={cn(progressVariants({ size, edge, type }), className)}
      {...props}
    >
      {children}
      {type === "segmented" ? (
        <ProgressSegments
          value={value ?? null}
          min={min ?? 0}
          max={max ?? 100}
        />
      ) : (
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(
        "relative flex w-full items-center overflow-x-hidden rounded-full bg-secondary",
        "group-data-[size=sm]/progress:h-0.5",
        "group-data-[size=default]/progress:h-1",
        "group-data-[size=lg]/progress:h-2",
        "group-data-[size=xl]/progress:h-3",
        className
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full bg-primary transition-all",
        "group-data-[edge=round-edge]/progress:rounded-full",
        "group-data-[edge=square-edge]/progress:rounded-none",
        className
      )}
      {...props}
    />
  )
}

const segmentsVariants = cva("flex w-full gap-1", {
  variants: {
    size: {
      sm: "h-0.5",
      default: "h-1",
      lg: "h-2",
      xl: "h-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function ProgressSegments({
  className,
  value,
  min,
  max,
  ...props
}: React.ComponentProps<"div"> & {
  value: number | null
  min: number
  max: number
}) {
  const percentage = value === null ? 0 : ((value - min) / (max - min)) * 100
  const filledCount = Math.round((percentage / 100) * SEGMENT_COUNT)
  return (
    <div
      data-slot="progress-segments"
      className={cn(
        "flex w-full gap-1",
        "group-data-[size=sm]/progress:h-0.5",
        "group-data-[size=default]/progress:h-1",
        "group-data-[size=lg]/progress:h-2",
        "group-data-[size=xl]/progress:h-3",
        className
      )}
      {...props}
    >
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
        const isFirst = i === 0
        const isLast = i === SEGMENT_COUNT - 1
        const isFilled = i < filledCount
        return (
          <div
            key={i}
            data-slot="progress-segment"
            data-filled={isFilled || undefined}
            className={cn(
              "h-full flex-1 transition-colors",
              isFilled ? "bg-primary" : "bg-secondary",
              "group-data-[edge=round-edge]/progress:rounded-full",
              "group-data-[edge=square-edge]/progress:rounded-none",
              "group-data-[edge=square-edge]/progress:first:rounded-l-full",
              "group-data-[edge=square-edge]/progress:last:rounded-r-full"
            )}
          />
        )
      })}
    </div>
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn(
        "text-base leading-base font-medium tracking-normal text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "ml-auto text-base leading-base font-medium tracking-normal text-accent-foreground tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressSegments,
  ProgressLabel,
  ProgressValue,
  progressVariants,
}
