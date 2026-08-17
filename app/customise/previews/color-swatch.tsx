"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { ColorSwatch } from "@/components/ui/color-swatch"

const palette = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"]

const tokens = [
  ["primary", "var(--primary)"],
  ["secondary", "var(--secondary)"],
  ["muted", "var(--muted)"],
  ["accent", "var(--accent)"],
  ["destructive", "var(--destructive)"],
  ["success", "var(--success)"],
  ["error", "var(--error)"],
  ["warning", "var(--warning)"],
] as const

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

      <PreviewCard label="CSS color formats">
        <ColorSwatch color="#3b82f6" />
        <ColorSwatch color="rgb(59, 130, 246)" />
        <ColorSwatch color="hsl(217, 91%, 60%)" />
        <ColorSwatch color="oklch(0.65 0.18 250)" />
        <ColorSwatch color="dodgerblue" />
      </PreviewCard>

      <PreviewCard label="With transparency">
        <ColorSwatch color="#3b82f680" />
        <ColorSwatch color="rgba(239, 68, 68, 0.5)" />
        <ColorSwatch color="hsla(45, 100%, 50%, 0.6)" />
        <ColorSwatch color="transparent" />
      </PreviewCard>

      <PreviewCard label="Without transparency">
        <ColorSwatch color="#3b82f680" withoutTransparency />
        <ColorSwatch color="rgba(239, 68, 68, 0.5)" withoutTransparency />
        <ColorSwatch color="rgba(16, 185, 129, 0.25)" withoutTransparency />
      </PreviewCard>

      <PreviewCard label="No color / invalid">
        <ColorSwatch />
        <ColorSwatch color="" />
        <ColorSwatch color="not-a-real-color" />
      </PreviewCard>

      <PreviewCard label="Disabled">
        <ColorSwatch color="#3b82f6" disabled />
        <ColorSwatch color="#ef4444" disabled />
        <ColorSwatch color="#10b981" disabled />
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

      <PreviewCard label="Design tokens">
        {tokens.map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <ColorSwatch color={value} />
            <span className="text-xs font-medium">{name}</span>
          </div>
        ))}
      </PreviewCard>
    </PreviewGrid>
  )
}
