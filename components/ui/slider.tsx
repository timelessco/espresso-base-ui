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
  sm: "size-3.5 data-horizontal:active:w-5 data-vertical:active:h-5",
  default: "size-4 data-horizontal:active:w-5.5 data-vertical:active:h-5.5",
  lg: "size-5 data-horizontal:active:w-6.5 data-vertical:active:h-6.5",
  xl: "size-6 data-horizontal:active:w-7.5 data-vertical:active:h-7.5",
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
              "relative block shrink-0 origin-center rounded-full bg-white shadow-6xs ring-ring/70 transition-[color,box-shadow,width,height] duration-300 [transition-timing-function:linear(0_0%,.004379_1%,.017027_2%,.037197_3%,.064139_4%,.097098_5%,.135326_6%,.178089_7%,.224667_8%,.274366_9%,.326515_10%,.380476_11%,.435642_12%,.491445_13%,.547353_14%,.602874_15%,.65756_16%,.711_17%,.76283_18%,.812725_19%,.860402_20%,.90562_21%,.948177_22%,.98791_23%,1.024693_24%,1.058435_25%,1.089077_26%,1.116593_27%,1.140987_28%,1.162286_29%,1.180545_30%,1.19584_31%,1.208266_32%,1.217937_33%,1.22498_34%,1.229538_35%,1.231761_36%,1.231811_37%,1.229853_38%,1.226059_39%,1.220603_40%,1.213659_41%,1.205403_42%,1.196006_43%,1.185638_44%,1.174463_45%,1.162638_46%,1.150318_47%,1.137645_48%,1.124757_49%,1.111781_50%,1.098837_51%,1.086034_52%,1.073472_53%,1.061241_54%,1.04942_55%,1.038082_56%,1.027286_57%,1.017084_58%,1.007519_59%,.998624_60%,.990425_61%,.982939_62%,.976176_63%,.970139_64%,.964824_65%,.960222_66%,.956318_67%,.953091_68%,.950518_69%,.94857_70%,.947216_71%,.946423_72%,.946154_73%,.946371_74%,.947035_75%,.948105_76%,.949542_77%,.951304_78%,.953352_79%,.955646_80%,.958146_81%,.960816_82%,.963619_83%,.966522_84%,.96949_85%,.972494_86%,.975505_87%,.978496_88%,.981443_89%,.984323_90%,.987118_91%,.989809_92%,.992382_93%,.994822_94%,.99712_95%,.999265_96%,1.001252_97%,1.003076_98%,1.004733_99%,1.006221_100%)] select-none after:absolute after:-inset-2 hover:shadow-3xl hover:ring-3 active:shadow-3xl active:ring-3 has-[:focus-visible]:shadow-3xl has-[:focus-visible]:ring-3 has-[:focus-visible]:outline-hidden data-disabled:pointer-events-none data-disabled:bg-accent data-disabled:shadow-none data-disabled:ring-0",
              thumbSizeMap[size ?? "default"]
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
