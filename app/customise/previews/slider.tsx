"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Slider } from "@/components/ui/slider"

export default function SliderPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Slider size="sm" defaultValue={[50]} />
          <Slider size="default" defaultValue={[50]} />
          <Slider size="lg" defaultValue={[50]} />
          <Slider size="xl" defaultValue={[50]} />
        </div>
      </PreviewCard>

      <PreviewCard label="Range">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Slider size="sm" defaultValue={[25, 75]} />
          <Slider size="default" defaultValue={[25, 75]} />
          <Slider size="lg" defaultValue={[25, 75]} />
          <Slider size="xl" defaultValue={[25, 75]} />
        </div>
      </PreviewCard>

      <PreviewCard label="Step (10)">
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} step={10} />
        </div>
      </PreviewCard>

      <PreviewCard label="Multiple Values">
        <div className="w-full max-w-sm">
          <Slider defaultValue={[20, 50, 80]} />
        </div>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Slider size="sm" defaultValue={[50]} disabled />
          <Slider size="default" defaultValue={[50]} disabled />
          <Slider size="lg" defaultValue={[25, 75]} disabled />
          <Slider size="xl" defaultValue={[25, 75]} disabled />
        </div>
      </PreviewCard>

      <PreviewCard label="Vertical">
        <div className="flex h-40 items-center gap-8">
          <Slider size="sm" defaultValue={[50]} orientation="vertical" />
          <Slider size="default" defaultValue={[50]} orientation="vertical" />
          <Slider size="lg" defaultValue={[25, 75]} orientation="vertical" />
          <Slider size="xl" defaultValue={[25, 75]} orientation="vertical" />
          <Slider
            size="default"
            defaultValue={[50]}
            orientation="vertical"
            disabled
          />
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
