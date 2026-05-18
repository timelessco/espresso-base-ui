"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

const trackSizeMap = {
  sm: "data-horizontal:h-0.5 data-vertical:w-0.5",
  default: "data-horizontal:h-1 data-vertical:w-1",
  lg: "data-horizontal:h-2 data-vertical:w-2",
  xl: "data-horizontal:h-2.5 data-vertical:w-2.5",
}

const thumbSizeMap = {
  sm: "size-3.5 active:w-5",
  default: "size-4 active:w-5.5",
  lg: "size-5 active:w-6.5",
  xl: "size-6 active:w-7.5",
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  size = "default",
  ...props
}: SliderPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg" | "xl"
}) {
  const _defaultValue = defaultValue ?? [min, max]
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(_defaultValue)
          ? _defaultValue
          : [_defaultValue],
    [value, _defaultValue]
  )

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      data-size={size}
      defaultValue={_defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:pointer-events-none data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full bg-secondary select-none data-horizontal:w-full data-vertical:h-full",
            trackSizeMap[size ?? "default"]
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "relative block shrink-0 origin-center rounded-full bg-white shadow-6xs ring-ring/70 transition-[color,box-shadow,width,height] duration-200 ease-out select-none after:absolute after:-inset-2 hover:shadow-3xl hover:ring-3 active:shadow-3xl active:ring-3 has-[:focus-visible]:shadow-3xl has-[:focus-visible]:ring-3 has-[:focus-visible]:outline-hidden data-disabled:pointer-events-none data-disabled:bg-accent data-disabled:shadow-none data-disabled:ring-0",
              thumbSizeMap[size ?? "default"]
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
