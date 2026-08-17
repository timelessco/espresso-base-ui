"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <RadioGroup defaultValue="a">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <RadioGroupItem value="a" />
            Option A
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <RadioGroupItem value="b" />
            Option B
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <RadioGroupItem value="c" />
            Option C
          </label>
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <RadioGroup defaultValue="x" className="flex-row items-center gap-4">
          <RadioGroupItem value="x" size="xs" />
          <RadioGroupItem value="y" size="sm" />
          <RadioGroupItem value="z" size="default" />
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <RadioGroup defaultValue="on" disabled>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <RadioGroupItem value="on" />
            Selected
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <RadioGroupItem value="off" />
            Unselected
          </label>
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Invalid">
        <RadioGroup defaultValue="one" className="flex-row items-center gap-4">
          <RadioGroupItem value="one" data-invalid="true" />
          <RadioGroupItem value="two" data-invalid="true" />
        </RadioGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
