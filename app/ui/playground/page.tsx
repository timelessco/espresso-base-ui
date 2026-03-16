"use client"

import { useState } from "react"

const fontSizes = [
  { label: "tiny (11px)", value: "var(--text-tiny)", lineHeight: "var(--leading-tiny)" },
  { label: "2xs (11px)", value: "var(--text-2xs)", lineHeight: "var(--leading-2xs)" },
  { label: "xs (12px)", value: "var(--text-xs)", lineHeight: "var(--leading-xs)" },
  { label: "sm (13px)", value: "var(--text-sm)", lineHeight: "var(--leading-sm)" },
  { label: "base (14px)", value: "var(--text-base)", lineHeight: "var(--leading-base)" },
  { label: "lg (16px)", value: "var(--text-lg)", lineHeight: "var(--leading-lg)" },
  { label: "xl (18px)", value: "var(--text-xl)", lineHeight: "var(--leading-xl)" },
  { label: "2xl (20px)", value: "var(--text-2xl)", lineHeight: "var(--leading-2xl)" },
  { label: "3xl (24px)", value: "var(--text-3xl)", lineHeight: "var(--leading-3xl)" },
  { label: "4xl (26px)", value: "var(--text-4xl)", lineHeight: "var(--leading-4xl)" },
  { label: "5xl (28px)", value: "var(--text-5xl)", lineHeight: "var(--leading-5xl)" },
  { label: "6xl (32px)", value: "var(--text-6xl)", lineHeight: "var(--leading-6xl)" },
  { label: "7xl (40px)", value: "var(--text-7xl)", lineHeight: "var(--leading-7xl)" },
  { label: "8xl (44px)", value: "var(--text-8xl)", lineHeight: "var(--leading-8xl)" },
  { label: "9xl (48px)", value: "var(--text-9xl)", lineHeight: "var(--leading-9xl)" },
  { label: "10xl (52px)", value: "var(--text-10xl)", lineHeight: "var(--leading-10xl)" },
  { label: "11xl (56px)", value: "var(--text-11xl)", lineHeight: "var(--leading-11xl)" },
  { label: "12xl (64px)", value: "var(--text-12xl)", lineHeight: "var(--leading-12xl)" },
  { label: "13xl (72px)", value: "var(--text-13xl)", lineHeight: "var(--leading-13xl)" },
  { label: "14xl (80px)", value: "var(--text-14xl)", lineHeight: "var(--leading-14xl)" },
  { label: "15xl (88px)", value: "var(--text-15xl)", lineHeight: "var(--leading-15xl)" },
]

const lineHeights = [
  { label: "tiny (0)", value: "var(--leading-tiny)" },
  { label: "2xs (1.18)", value: "var(--leading-2xs)" },
  { label: "xs (1.17)", value: "var(--leading-xs)" },
  { label: "sm (1.15)", value: "var(--leading-sm)" },
  { label: "base (1.14)", value: "var(--leading-base)" },
  { label: "lg (1.13)", value: "var(--leading-lg)" },
  { label: "xl (1.17)", value: "var(--leading-xl)" },
  { label: "2xl (1.15)", value: "var(--leading-2xl)" },
  { label: "3xl (1.17)", value: "var(--leading-3xl)" },
  { label: "4xl (1.62)", value: "var(--leading-4xl)" },
  { label: "5xl (1.61)", value: "var(--leading-5xl)" },
  { label: "6xl (1.59)", value: "var(--leading-6xl)" },
  { label: "7xl (1.4)", value: "var(--leading-7xl)" },
  { label: "8xl (1.41)", value: "var(--leading-8xl)" },
  { label: "9xl (1.4)", value: "var(--leading-9xl)" },
  { label: "10xl (1.4)", value: "var(--leading-10xl)" },
  { label: "11xl (1.39)", value: "var(--leading-11xl)" },
  { label: "12xl (1.3)", value: "var(--leading-12xl)" },
  { label: "13xl (1.28)", value: "var(--leading-13xl)" },
  { label: "14xl (1.2)", value: "var(--leading-14xl)" },
  { label: "15xl (1.2)", value: "var(--leading-15xl)" },
  { label: "tight (1.25)", value: "var(--leading-tight)" },
  { label: "snug (1.375)", value: "var(--leading-snug)" },
  { label: "normal (1.5)", value: "var(--leading-normal)" },
  { label: "relaxed (1.625)", value: "var(--leading-relaxed)" },
  { label: "loose (2)", value: "var(--leading-loose)" },
]

const fontWeights = [
  { label: "light (300)", value: "var(--font-weight-light)", num: 300 },
  { label: "normal (420)", value: "var(--font-weight-normal)", num: 420 },
  { label: "medium (500)", value: "var(--font-weight-medium)", num: 500 },
  { label: "semibold (600)", value: "var(--font-weight-semibold)", num: 600 },
  { label: "bold (700)", value: "var(--font-weight-bold)", num: 700 },
  { label: "extrabold (800)", value: "var(--font-weight-extrabold)", num: 800 },
]

const borderRadii = [
  { label: "xs (2px)", value: "var(--radius-xs)" },
  { label: "sm (6px)", value: "var(--radius-sm)" },
  { label: "md (8px)", value: "var(--radius-md)" },
  { label: "lg (10px)", value: "var(--radius-lg)" },
  { label: "xl (12px)", value: "var(--radius-xl)" },
  { label: "2xl (16px)", value: "var(--radius-2xl)" },
  { label: "3xl (20px)", value: "var(--radius-3xl)" },
  { label: "4xl (24px)", value: "var(--radius-4xl)" },
]

export default function PlaygroundPage() {
  const [fontSizeIdx, setFontSizeIdx] = useState(4) // base
  const [lineHeightIdx, setLineHeightIdx] = useState(4) // base
  const [fontWeightIdx, setFontWeightIdx] = useState(1) // normal
  const [radiusIdx, setRadiusIdx] = useState(3) // lg

  const selectedFontSize = fontSizes[fontSizeIdx]
  const selectedLineHeight = lineHeights[lineHeightIdx]
  const selectedFontWeight = fontWeights[fontWeightIdx]
  const selectedRadius = borderRadii[radiusIdx]

  return (
    <div className="flex min-h-svh items-start gap-10 bg-background p-10">
      {/* Controls */}
      <div className="sticky top-10 flex w-64 shrink-0 flex-col gap-6 rounded-lg border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Controls</h2>

        {/* Font Size */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Font Size
          </label>
          <input
            type="range"
            min={0}
            max={fontSizes.length - 1}
            step={1}
            value={fontSizeIdx}
            onChange={(e) => setFontSizeIdx(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="text-xs tabular-nums text-foreground">
            {selectedFontSize.label}
          </span>
        </div>

        {/* Line Height */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Line Height
          </label>
          <input
            type="range"
            min={0}
            max={lineHeights.length - 1}
            step={1}
            value={lineHeightIdx}
            onChange={(e) => setLineHeightIdx(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="text-xs tabular-nums text-foreground">
            {selectedLineHeight.label}
          </span>
        </div>

        {/* Font Weight */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Font Weight
          </label>
          <input
            type="range"
            min={0}
            max={fontWeights.length - 1}
            step={1}
            value={fontWeightIdx}
            onChange={(e) => setFontWeightIdx(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="text-xs tabular-nums text-foreground">
            {selectedFontWeight.label}
          </span>
        </div>

        {/* Border Radius */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Border Radius
          </label>
          <input
            type="range"
            min={0}
            max={borderRadii.length - 1}
            step={1}
            value={radiusIdx}
            onChange={(e) => setRadiusIdx(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="text-xs tabular-nums text-foreground">
            {selectedRadius.label}
          </span>
        </div>
      </div>

      {/* Preview Box */}
      <div
        className="flex-1 border border-border p-8"
        style={{
          borderRadius: selectedRadius.value,
        }}
      >
        <p
          style={{
            fontSize: selectedFontSize.value,
            lineHeight: selectedLineHeight.value,
            fontWeight: selectedFontWeight.value,
            fontVariationSettings: `"wght" ${selectedFontWeight.num}`,
          }}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five
          dozen liquor jugs. How vexingly quick daft zebras jump. The five
          boxing wizards jump quickly. Bright vixens jump; dozy fowl quack.
        </p>
      </div>
    </div>
  )
}
