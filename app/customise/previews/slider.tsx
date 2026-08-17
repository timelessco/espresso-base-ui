"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Slider } from "@/components/ui/slider"

export default function SliderPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-xs flex-col gap-6">
          <Slider size="sm" defaultValue={[40]} />
          <Slider size="default" defaultValue={[50]} />
          <Slider size="lg" defaultValue={[60]} />
          <Slider size="xl" defaultValue={[70]} />
        </div>
      </PreviewCard>

      <PreviewCard label="Single value">
        <div className="w-full max-w-xs">
          <Slider defaultValue={[35]} />
        </div>
      </PreviewCard>

      <PreviewCard label="Range">
        <div className="w-full max-w-xs">
          <Slider defaultValue={[25, 75]} />
        </div>
      </PreviewCard>

      <PreviewCard label="Steps">
        <div className="w-full max-w-xs">
          <Slider defaultValue={[40]} step={10} />
        </div>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <div className="w-full max-w-xs">
          <Slider defaultValue={[50]} disabled />
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
