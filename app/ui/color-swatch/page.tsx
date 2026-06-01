"use client"

import * as React from "react"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const tailwindPalette = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#d946ef", // fuchsia
  "#ec4899", // pink
]

export default function ColorSwatchPage() {
  const [selected, setSelected] = React.useState<string>(tailwindPalette[0]!)

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <div className="flex items-center gap-2">
          <ColorSwatch color="#3b82f6" />
          <ColorSwatch color="#ef4444" />
          <ColorSwatch color="#10b981" />
          <ColorSwatch color="#f59e0b" />
          <ColorSwatch color="#a855f7" />
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex items-end gap-3">
          <ColorSwatch color="#3b82f6" size="sm" />
          <ColorSwatch color="#3b82f6" size="default" />
          <ColorSwatch color="#3b82f6" size="lg" />
        </div>
        <p className="text-sm text-muted-foreground">
          <code>sm</code> (24px) · <code>default</code> (32px) · <code>lg</code>{" "}
          (48px)
        </p>
      </div>

      {/* Different formats */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Different CSS Color Formats</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <ColorSwatch color="#3b82f6" />
            <span className="font-mono text-xs">hex</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ColorSwatch color="rgb(59, 130, 246)" />
            <span className="font-mono text-xs">rgb</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ColorSwatch color="hsl(217, 91%, 60%)" />
            <span className="font-mono text-xs">hsl</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ColorSwatch color="oklch(0.65 0.18 250)" />
            <span className="font-mono text-xs">oklch</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ColorSwatch color="dodgerblue" />
            <span className="font-mono text-xs">named</span>
          </div>
        </div>
      </div>

      {/* With Transparency */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Transparency (Alpha)</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <ColorSwatch color="#3b82f680" />
          <ColorSwatch color="rgba(239, 68, 68, 0.5)" />
          <ColorSwatch color="rgba(16, 185, 129, 0.25)" />
          <ColorSwatch color="hsla(45, 100%, 50%, 0.6)" />
          <ColorSwatch color="transparent" />
        </div>
        <p className="text-sm text-muted-foreground">
          A checkerboard pattern shows through any color with an alpha channel
          below 1.
        </p>
      </div>

      {/* Without Transparency */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Without Transparency</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <ColorSwatch color="#3b82f680" withoutTransparency />
          <ColorSwatch color="rgba(239, 68, 68, 0.5)" withoutTransparency />
          <ColorSwatch color="rgba(16, 185, 129, 0.25)" withoutTransparency />
        </div>
        <p className="text-sm text-muted-foreground">
          <code>withoutTransparency</code> disables the checkerboard, blending
          alpha colors with the surface behind.
        </p>
      </div>

      {/* No Color / Invalid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>No Color / Invalid</SectionTitle>
        <div className="flex items-center gap-3">
          <ColorSwatch />
          <ColorSwatch color="" />
          <ColorSwatch color="not-a-real-color" />
        </div>
        <p className="text-sm text-muted-foreground">
          When the <code>color</code> prop is missing or invalid, the swatch
          shows a diagonal strike-through line.
        </p>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex items-center gap-3">
          <ColorSwatch color="#3b82f6" disabled />
          <ColorSwatch color="#ef4444" disabled />
          <ColorSwatch color="#10b981" disabled />
        </div>
      </div>

      {/* Palette Picker */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Color Palette</SectionTitle>
        <div className="grid w-fit grid-cols-8 gap-3">
          {tailwindPalette.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelected(color)}
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Pick ${color}`}
              aria-pressed={selected === color}
            >
              <ColorSwatch
                color={color}
                selected={selected === color}
                className="rounded-full"
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>Selected:</span>
          <ColorSwatch color={selected} size="sm" />
          <code className="font-mono">{selected}</code>
        </div>
      </div>

      {/* Interactive (button wraps swatch) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Interactive (clickable)</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
          {["#3b82f6", "#ef4444", "#10b981", "#a855f7", "#f59e0b"].map(
            (color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelected(color)}
                aria-label={`Select ${color}`}
                className="rounded-sm transition-transform outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ColorSwatch color={color} />
              </button>
            )
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Wrap the swatch in a <code>{"<button>"}</code> for click/focus
          interaction.
        </p>
      </div>

      {/* Sample row — design tokens */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Design Tokens</SectionTitle>
        <div className="grid w-fit grid-cols-4 gap-3">
          {(
            [
              ["primary", "var(--primary)"],
              ["secondary", "var(--secondary)"],
              ["muted", "var(--muted)"],
              ["accent", "var(--accent)"],
              ["destructive", "var(--destructive)"],
              ["success", "var(--success)"],
              ["error", "var(--error)"],
              ["warning", "var(--warning)"],
            ] as const
          ).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <ColorSwatch color={value} />
              <span className="text-xs font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => setSelected(tailwindPalette[0]!)}
      >
        Reset selection
      </Button>
    </div>
  )
}
