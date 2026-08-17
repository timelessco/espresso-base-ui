"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"

function TriggerDemo({
  label,
  size = "md",
}: {
  label: string
  size?: "xs" | "sm" | "md" | "lg"
}) {
  const [value, setValue] = React.useState("#3b82f6")
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <ColorPicker value={value} onValueChange={setValue}>
        <ColorPickerTrigger size={size}>
          <ColorPickerSwatch size={size} />
          {value}
        </ColorPickerTrigger>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHueSlider />
          <ColorPickerFormatSelect className="w-full" />
          <ColorPickerInput className="flex-1" />
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}

export default function ColorPickerPreview() {
  const [value, setValue] = React.useState("#3b82f6")
  const [withAlpha, setWithAlpha] = React.useState("#ef4444")

  return (
    <PreviewGrid>
      <PreviewCard label="Trigger + popover">
        <ColorPicker
          value={value}
          onValueChange={setValue}
          className="w-full max-w-xs"
        >
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            {value}
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerFormatSelect className="w-full" />
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
      </PreviewCard>

      <PreviewCard label="With alpha">
        <ColorPicker
          value={withAlpha}
          onValueChange={setWithAlpha}
          className="w-full max-w-xs"
        >
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            {withAlpha}
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
            <ColorPickerFormatSelect className="w-full shrink-0" />
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
      </PreviewCard>

      <PreviewCard label="Trigger sizes">
        <div className="flex w-full max-w-xs flex-col gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <TriggerDemo key={size} label={size} size={size} />
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="Inline">
        <ColorPicker inline defaultValue="#f59e0b" className="w-full max-w-xs">
          <ColorPickerContent className="w-full rounded-lg border bg-popover">
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
            <div className="flex items-center gap-2">
              <ColorPickerSwatch />
              <ColorPickerFormatSelect className="w-full flex-1" />
            </div>
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
      </PreviewCard>
    </PreviewGrid>
  )
}
