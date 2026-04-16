"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const SEGMENT_COUNT = 5

const progressVariants = cva("flex flex-wrap items-center gap-2.5", {
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

type ProgressContextValue = Required<VariantProps<typeof progressVariants>> & {
  value: number | null
  min: number
  max: number
}

const ProgressContext = React.createContext<ProgressContextValue>({
  size: "default",
  edge: "round-edge",
  type: "default",
  value: null,
  min: 0,
  max: 100,
})

function useProgress() {
  return React.useContext(ProgressContext)
}

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
  const context = React.useMemo(
    () => ({
      size: size ?? "default",
      edge: edge ?? "round-edge",
      type: type ?? "default",
      value: value ?? null,
      min: min ?? 0,
      max: max ?? 100,
    }),
    [size, edge, type, value, min, max]
  )
  return (
    <ProgressContext.Provider value={context}>
      <ProgressPrimitive.Root
        value={value}
        min={min}
        max={max}
        data-slot="progress"
        data-size={context.size}
        data-edge={context.edge}
        data-type={context.type}
        className={cn(progressVariants({ size, edge, type }), className)}
        {...props}
      >
        {children}
        {type === "segmented" ? (
          <ProgressSegments />
        ) : (
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        )}
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

const trackVariants = cva(
  "relative flex w-full items-center overflow-x-hidden rounded-full bg-secondary",
  {
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
  }
)

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  const { size } = useProgress()
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(trackVariants({ size }), className)}
      {...props}
    />
  )
}

const indicatorVariants = cva("h-full bg-primary transition-all", {
  variants: {
    edge: {
      "round-edge": "rounded-full",
      "square-edge": "rounded-none",
    },
  },
  defaultVariants: {
    edge: "round-edge",
  },
})

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  const { edge } = useProgress()
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(indicatorVariants({ edge }), className)}
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
  ...props
}: React.ComponentProps<"div">) {
  const { size, edge, value, min, max } = useProgress()
  const percentage = value === null ? 0 : ((value - min) / (max - min)) * 100
  const filledCount = Math.round((percentage / 100) * SEGMENT_COUNT)
  return (
    <div
      data-slot="progress-segments"
      className={cn(segmentsVariants({ size }), className)}
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
              edge === "round-edge" && "rounded-full",
              edge === "square-edge" && isFirst && "rounded-l-full",
              edge === "square-edge" && isLast && "rounded-r-full"
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
