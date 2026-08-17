"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"

export default function ColorPickerPreview() {
  const [value, setValue] = React.useState("#3b82f6")

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

      <PreviewCard label="Inline">
        <ColorPicker inline defaultValue="#f59e0b" className="w-full max-w-xs">
          <ColorPickerContent className="w-full rounded-lg border bg-popover">
            <ColorPickerArea />
            <ColorPickerHueSlider />
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
