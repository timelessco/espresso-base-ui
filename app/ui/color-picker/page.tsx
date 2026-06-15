"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function ColorPickerPage() {
  const [controlled, setControlled] = React.useState("#3b82f6")
  const [withAlpha, setWithAlpha] = React.useState("#ef4444")

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <ColorPicker defaultValue="#3b82f6">
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            Pick a color
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerFormatSelect className="w-full" />
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
      </div>

      {/* With Alpha */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>With Alpha</SectionTitle>
        <ColorPicker
          value={withAlpha}
          onValueChange={setWithAlpha}
          defaultValue="#ef4444"
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
      </div>

      {/* With Eye Dropper */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>With Eye Dropper</SectionTitle>
        <ColorPicker defaultValue="#10b981">
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            Pick / Sample
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
            <div className="flex items-center gap-2">
              <ColorPickerEyeDropper />
              <ColorPickerFormatSelect className="w-full" />
            </div>
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
        <p className="text-xs text-muted-foreground">
          The eye-dropper button only appears in browsers that support the{" "}
          <code className="rounded bg-muted px-1">EyeDropper</code> API.
        </p>
      </div>

      {/* Controlled */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Controlled</SectionTitle>
        <ColorPicker value={controlled} onValueChange={setControlled}>
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            {controlled}
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />

            <ColorPickerFormatSelect className="w-full" />
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
        <div className="flex items-center gap-2 text-sm">
          <span
            className="size-6 rounded-full border"
            style={{ backgroundColor: controlled }}
          />
          <span className="font-mono">{controlled}</span>
        </div>
        <div className="flex gap-2">
          {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#a855f7"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setControlled(c)}
              className="size-6 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ backgroundColor: c }}
              aria-label={`Set color to ${c}`}
            />
          ))}
        </div>
      </div>

      {/* Default Format — RGB */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Default Format — RGB</SectionTitle>
        <ColorPicker defaultValue="#a855f7" defaultFormat="rgb">
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            RGB Picker
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />

            <ColorPickerFormatSelect className="w-full" />
            <ColorPickerInput className="w-full flex-1" />
          </ColorPickerContent>
        </ColorPicker>
      </div>

      {/* Inline */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Inline (no popover)</SectionTitle>
        <ColorPicker inline defaultValue="#f59e0b">
          <ColorPickerContent className="w-full rounded-lg border bg-popover">
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
            <div className="flex items-center gap-2">
              <ColorPickerSwatch />
              <ColorPickerEyeDropper />
              <ColorPickerFormatSelect className="w-full flex-1" />
            </div>
            <ColorPickerInput className="flex-1" />
          </ColorPickerContent>
        </ColorPicker>
      </div>

      {/* Disabled */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <ColorPicker disabled defaultValue="#71717a">
          <ColorPickerTrigger>
            <ColorPickerSwatch className="size-5" />
            Disabled picker
          </ColorPickerTrigger>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <div className="flex items-center gap-2">
              <ColorPickerFormatSelect className="w-20 shrink-0" />
              <ColorPickerInput className="flex-1" />
            </div>
          </ColorPickerContent>
        </ColorPicker>
      </div>

      {/* In a Field */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>In a Field</SectionTitle>
        <Field>
          <FieldLabel>Brand color</FieldLabel>
          <ColorPicker defaultValue="#0ea5e9">
            <ColorPickerTrigger className="w-full justify-start">
              <ColorPickerSwatch className="size-5" />
              Choose brand color
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <ColorPickerHueSlider />
              <ColorPickerAlphaSlider />

              <ColorPickerFormatSelect className="w-full shrink-0" />
              <ColorPickerInput className="flex-1" />
            </ColorPickerContent>
          </ColorPicker>
          <FieldDescription>
            Used for buttons, links, and accents.
          </FieldDescription>
        </Field>
      </div>

      {/* Form Integration */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Form Integration</SectionTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            toast(`Submitted color: ${data.get("color")}`)
          }}
          className="flex flex-col items-start gap-3"
        >
          <ColorPicker name="color" defaultValue="#22c55e" required>
            <ColorPickerTrigger>
              <ColorPickerSwatch className="size-5" />
              Pick a color
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <ColorPickerHueSlider />

              <ColorPickerFormatSelect className="w-full" />
              <ColorPickerInput className="flex-1" />
            </ColorPickerContent>
          </ColorPicker>
          <Button type="submit" size="sm">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
