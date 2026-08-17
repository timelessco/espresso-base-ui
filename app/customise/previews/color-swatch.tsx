"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { ColorSwatch } from "@/components/ui/color-swatch"

const palette = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"]

export default function ColorSwatchPreview() {
  const [selected, setSelected] = React.useState<string>(palette[3]!)

  return (
    <PreviewGrid>
      <PreviewCard label="Colors">
        {palette.map((color) => (
          <ColorSwatch key={color} color={color} />
        ))}
      </PreviewCard>

      <PreviewCard label="Sizes">
        <ColorSwatch color="#3b82f6" size="sm" />
        <ColorSwatch color="#3b82f6" size="default" />
        <ColorSwatch color="#3b82f6" size="lg" />
      </PreviewCard>

      <PreviewCard label="Selectable palette">
        {palette.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelected(color)}
            aria-label={`Pick ${color}`}
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ColorSwatch color={color} selected={selected === color} />
          </button>
        ))}
      </PreviewCard>

      <PreviewCard label="Transparency & empty">
        <ColorSwatch color="#3b82f680" />
        <ColorSwatch color="rgba(239, 68, 68, 0.5)" />
        <ColorSwatch color="transparent" />
        <ColorSwatch />
      </PreviewCard>
    </PreviewGrid>
  )
}
