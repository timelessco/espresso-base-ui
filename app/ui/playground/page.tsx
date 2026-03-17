"use client"

import { useState } from "react"

const fontSizes = [
  { label: "tiny", detail: "11px", value: "var(--text-tiny)", lineHeight: "var(--leading-tiny)" },
  { label: "2xs", detail: "11px", value: "var(--text-2xs)", lineHeight: "var(--leading-2xs)" },
  { label: "xs", detail: "12px", value: "var(--text-xs)", lineHeight: "var(--leading-xs)" },
  { label: "sm", detail: "13px", value: "var(--text-sm)", lineHeight: "var(--leading-sm)" },
  { label: "base", detail: "14px", value: "var(--text-base)", lineHeight: "var(--leading-base)" },
  { label: "lg", detail: "16px", value: "var(--text-lg)", lineHeight: "var(--leading-lg)" },
  { label: "xl", detail: "18px", value: "var(--text-xl)", lineHeight: "var(--leading-xl)" },
  { label: "2xl", detail: "20px", value: "var(--text-2xl)", lineHeight: "var(--leading-2xl)" },
  { label: "3xl", detail: "24px", value: "var(--text-3xl)", lineHeight: "var(--leading-3xl)" },
  { label: "4xl", detail: "26px", value: "var(--text-4xl)", lineHeight: "var(--leading-4xl)" },
  { label: "5xl", detail: "28px", value: "var(--text-5xl)", lineHeight: "var(--leading-5xl)" },
  { label: "6xl", detail: "32px", value: "var(--text-6xl)", lineHeight: "var(--leading-6xl)" },
  { label: "7xl", detail: "40px", value: "var(--text-7xl)", lineHeight: "var(--leading-7xl)" },
  { label: "8xl", detail: "44px", value: "var(--text-8xl)", lineHeight: "var(--leading-8xl)" },
  { label: "9xl", detail: "48px", value: "var(--text-9xl)", lineHeight: "var(--leading-9xl)" },
  { label: "10xl", detail: "52px", value: "var(--text-10xl)", lineHeight: "var(--leading-10xl)" },
  { label: "11xl", detail: "56px", value: "var(--text-11xl)", lineHeight: "var(--leading-11xl)" },
  { label: "12xl", detail: "64px", value: "var(--text-12xl)", lineHeight: "var(--leading-12xl)" },
  { label: "13xl", detail: "72px", value: "var(--text-13xl)", lineHeight: "var(--leading-13xl)" },
  { label: "14xl", detail: "80px", value: "var(--text-14xl)", lineHeight: "var(--leading-14xl)" },
  { label: "15xl", detail: "88px", value: "var(--text-15xl)", lineHeight: "var(--leading-15xl)" },
]

const lineHeights = [
  { label: "tiny", detail: "0", value: "var(--leading-tiny)" },
  { label: "2xs", detail: "1.18", value: "var(--leading-2xs)" },
  { label: "xs", detail: "1.17", value: "var(--leading-xs)" },
  { label: "sm", detail: "1.15", value: "var(--leading-sm)" },
  { label: "base", detail: "1.14", value: "var(--leading-base)" },
  { label: "lg", detail: "1.13", value: "var(--leading-lg)" },
  { label: "xl", detail: "1.17", value: "var(--leading-xl)" },
  { label: "2xl", detail: "1.15", value: "var(--leading-2xl)" },
  { label: "3xl", detail: "1.17", value: "var(--leading-3xl)" },
  { label: "4xl", detail: "1.62", value: "var(--leading-4xl)" },
  { label: "5xl", detail: "1.61", value: "var(--leading-5xl)" },
  { label: "6xl", detail: "1.59", value: "var(--leading-6xl)" },
  { label: "7xl", detail: "1.4", value: "var(--leading-7xl)" },
  { label: "8xl", detail: "1.41", value: "var(--leading-8xl)" },
  { label: "9xl", detail: "1.4", value: "var(--leading-9xl)" },
  { label: "10xl", detail: "1.4", value: "var(--leading-10xl)" },
  { label: "11xl", detail: "1.39", value: "var(--leading-11xl)" },
  { label: "12xl", detail: "1.3", value: "var(--leading-12xl)" },
  { label: "13xl", detail: "1.28", value: "var(--leading-13xl)" },
  { label: "14xl", detail: "1.2", value: "var(--leading-14xl)" },
  { label: "15xl", detail: "1.2", value: "var(--leading-15xl)" },
  { label: "tight", detail: "1.25", value: "var(--leading-tight)" },
  { label: "snug", detail: "1.375", value: "var(--leading-snug)" },
  { label: "normal", detail: "1.5", value: "var(--leading-normal)" },
  { label: "relaxed", detail: "1.625", value: "var(--leading-relaxed)" },
  { label: "loose", detail: "2", value: "var(--leading-loose)" },
]

const fontWeights = [
  { label: "light", detail: "300", value: "var(--font-weight-light)", num: 300 },
  { label: "normal", detail: "420", value: "var(--font-weight-normal)", num: 420 },
  { label: "medium", detail: "500", value: "var(--font-weight-medium)", num: 500 },
  { label: "semibold", detail: "600", value: "var(--font-weight-semibold)", num: 600 },
  { label: "bold", detail: "700", value: "var(--font-weight-bold)", num: 700 },
  { label: "extrabold", detail: "800", value: "var(--font-weight-extrabold)", num: 800 },
]

const borderRadii = [
  { label: "xs", detail: "2px", value: "var(--radius-xs)" },
  { label: "sm", detail: "6px", value: "var(--radius-sm)" },
  { label: "md", detail: "8px", value: "var(--radius-md)" },
  { label: "lg", detail: "10px", value: "var(--radius-lg)" },
  { label: "xl", detail: "12px", value: "var(--radius-xl)" },
  { label: "2xl", detail: "16px", value: "var(--radius-2xl)" },
  { label: "3xl", detail: "20px", value: "var(--radius-3xl)" },
  { label: "4xl", detail: "24px", value: "var(--radius-4xl)" },
]

function ControlGroup({
  label,
  selectedLabel,
  selectedDetail,
  variableName,
  children,
}: {
  label: string
  selectedLabel: string
  selectedDetail: string
  variableName: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            {selectedLabel}
          </span>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {selectedDetail}
          </span>
        </div>
      </div>
      {children}
      <span className="font-mono text-[10px] text-muted-foreground/60">
        {variableName}
      </span>
    </div>
  )
}

export default function PlaygroundPage() {
  const [fontSizeIdx, setFontSizeIdx] = useState(4)
  const [lineHeightIdx, setLineHeightIdx] = useState(4)
  const [fontWeightIdx, setFontWeightIdx] = useState(1)
  const [radiusIdx, setRadiusIdx] = useState(3)

  const fs = fontSizes[fontSizeIdx]
  const lh = lineHeights[lineHeightIdx]
  const fw = fontWeights[fontWeightIdx]
  const br = borderRadii[radiusIdx]

  return (
    <div className="flex min-h-svh bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-svh w-72 shrink-0 flex-col border-r border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h1 className="text-sm font-semibold text-foreground">Playground</h1>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Adjust design tokens to preview changes
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
          <ControlGroup
            label="Font Size"
            selectedLabel={fs.label}
            selectedDetail={fs.detail}
            variableName={`--text-${fs.label}`}
          >
            <input
              type="range"
              min={0}
              max={fontSizes.length - 1}
              step={1}
              value={fontSizeIdx}
              onChange={(e) => setFontSizeIdx(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
          </ControlGroup>

          <div className="h-px bg-border" />

          <ControlGroup
            label="Line Height"
            selectedLabel={lh.label}
            selectedDetail={lh.detail}
            variableName={`--leading-${lh.label}`}
          >
            <input
              type="range"
              min={0}
              max={lineHeights.length - 1}
              step={1}
              value={lineHeightIdx}
              onChange={(e) => setLineHeightIdx(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
          </ControlGroup>

          <div className="h-px bg-border" />

          <ControlGroup
            label="Font Weight"
            selectedLabel={fw.label}
            selectedDetail={fw.detail}
            variableName={`--font-weight-${fw.label}`}
          >
            <input
              type="range"
              min={0}
              max={fontWeights.length - 1}
              step={1}
              value={fontWeightIdx}
              onChange={(e) => setFontWeightIdx(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
          </ControlGroup>

          <div className="h-px bg-border" />

          <ControlGroup
            label="Border Radius"
            selectedLabel={br.label}
            selectedDetail={br.detail}
            variableName={`--radius-${br.label}`}
          >
            <input
              type="range"
              min={0}
              max={borderRadii.length - 1}
              step={1}
              value={radiusIdx}
              onChange={(e) => setRadiusIdx(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
          </ControlGroup>
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            onClick={() => {
              setFontSizeIdx(4)
              setLineHeightIdx(4)
              setFontWeightIdx(1)
              setRadiusIdx(3)
            }}
            className="w-full rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Reset defaults
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-10">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          {/* CSS output bar */}
          <div className="flex items-center gap-2 overflow-x-auto rounded-lg bg-muted/50 px-4 py-2.5">
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              CSS
            </span>
            <code className="font-mono text-[11px] text-foreground/80">
              font-size: {fs.detail}; line-height: {lh.detail}; font-weight: {fw.detail}; border-radius: {br.detail};
            </code>
          </div>

          {/* Preview card */}
          <div
            className="border border-border bg-card shadow-sm transition-all duration-200"
            style={{ borderRadius: br.value }}
          >
            {/* Card header */}
            <div
              className="border-b border-border px-8 py-5"
              style={{ borderTopLeftRadius: br.value, borderTopRightRadius: br.value }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-8 bg-primary"
                  style={{ borderRadius: br.value }}
                />
                <div>
                  <p
                    className="text-foreground"
                    style={{
                      fontSize: fs.value,
                      lineHeight: lh.value,
                      fontWeight: fw.value,
                      fontVariationSettings: `"opsz" 24, "wght" ${fw.num}`,
                    }}
                  >
                    Espresso Design System
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Token playground preview
                  </p>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col gap-6 px-8 py-6">
              <p
                className="text-foreground"
                style={{
                  fontSize: fs.value,
                  lineHeight: lh.value,
                  fontWeight: fw.value,
                  fontVariationSettings: `"opsz" 24, "wght" ${fw.num}`,
                }}
              >
                The quick brown fox jumps over the lazy dog. Pack my box with
                five dozen liquor jugs. How vexingly quick daft zebras jump.
                The five boxing wizards jump quickly.
              </p>

              <div className="h-px bg-border" />

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="flex flex-col gap-2 border border-border bg-background p-4"
                  style={{ borderRadius: br.value }}
                >
                  <p
                    className="text-foreground"
                    style={{
                      fontSize: fs.value,
                      lineHeight: lh.value,
                      fontWeight: fw.value,
                      fontVariationSettings: `"opsz" 24, "wght" ${fw.num}`,
                    }}
                  >
                    Heading
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Nested card with current border radius and font settings
                    applied to the heading above.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2 border border-border bg-background p-4"
                  style={{ borderRadius: br.value }}
                >
                  <div className="flex gap-2">
                    <div
                      className="h-2 flex-1 bg-chart-1"
                      style={{ borderRadius: br.value }}
                    />
                    <div
                      className="h-2 flex-[0.7] bg-chart-2"
                      style={{ borderRadius: br.value }}
                    />
                    <div
                      className="h-2 flex-[0.4] bg-chart-3"
                      style={{ borderRadius: br.value }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Progress bars inherit the current border radius token.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {fontWeights.map((w) => (
                  <span
                    key={w.label}
                    className="border border-border bg-background px-3 py-1.5 text-foreground transition-colors"
                    style={{
                      borderRadius: br.value,
                      fontSize: fs.value,
                      lineHeight: lh.value,
                      fontWeight: w.value,
                      fontVariationSettings: `"opsz" 24, "wght" ${w.num}`,
                      ...(w.num === fw.num
                        ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderColor: "transparent" }
                        : {}),
                    }}
                  >
                    {w.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Card footer */}
            <div
              className="flex items-center justify-between border-t border-border px-8 py-4"
              style={{ borderBottomLeftRadius: br.value, borderBottomRightRadius: br.value }}
            >
              <span className="font-mono text-[10px] text-muted-foreground">
                text-{fs.label} / leading-{lh.label} / font-{fw.label} / rounded-{br.label}
              </span>
              <div className="flex gap-1">
                {borderRadii.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setRadiusIdx(i)}
                    className="size-6 border border-border bg-background transition-colors hover:bg-muted"
                    style={{
                      borderRadius: r.value,
                      ...(i === radiusIdx
                        ? { backgroundColor: "var(--primary)", borderColor: "transparent" }
                        : {}),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
