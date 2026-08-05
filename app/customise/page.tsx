"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
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
import CrmPage from "../crm/page"

// base font-size tokens (rem) — scaled by the font-size control below
const TEXT_TOKENS: Record<string, number> = {
  tiny: 0.6875,
  "2xs": 0.6875,
  xs: 0.75,
  sm: 0.8125,
  base: 0.875,
  normal: 0.9375,
  lg: 1,
  xl: 1.125,
  "2xl": 1.25,
  "3xl": 1.5,
  "4xl": 1.625,
  "5xl": 1.75,
  "6xl": 2,
  "7xl": 2.5,
  "8xl": 2.75,
  "9xl": 3,
  "10xl": 3.25,
  "11xl": 3.5,
  "12xl": 4,
  "13xl": 4.5,
  "14xl": 5,
  "15xl": 5.5,
}

// Left-rail navigation. PREVIEW holds the current customisation pages;
// COMPONENTS will be wired up one by one.
const PREVIEW_ITEMS = [{ id: "crm", label: "CRM" }] as const

const COMPONENT_IDS = [
  "alert",
  "attachment",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "checkbox",
  "color-picker",
  "color-swatch",
  "combobox",
  "command",
  "dialog",
  "dropdown-menu",
  "empty",
  "field",
  "file-upload",
  "header",
  "input",
  "input-group",
  "input-otp",
  "item",
  "kanban",
  "kbd",
  "message",
  "notification",
  "popover",
  "progress",
  "radio",
  "rating",
  "select",
  "separator",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "tag",
  "textarea",
  "timeline",
  "tooltip",
] as const

function toLabel(id: string) {
  return id
    .split("-")
    .map((w) => (w === "otp" ? "OTP" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
}

const COMPONENT_ITEMS = COMPONENT_IDS.map((id) => ({ id, label: toLabel(id) }))
const RAIL_ITEMS = [...PREVIEW_ITEMS, ...COMPONENT_ITEMS]

const SPACING_BASE = 0.25 // rem — matches --spacing: 0.25rem

const DEFAULTS = {
  accent: "#171717",
  danger: "#cc2929",
  fontScale: 1,
  spacingScale: 1,
  radius: 10, // px — matches --radius: 0.625rem
}

function toNumber(value: number | readonly number[]): number {
  return Array.isArray(value) ? (value[0] ?? 0) : (value as number)
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </span>
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-base font-normal text-foreground">{children}</span>
  )
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <RowLabel>{label}</RowLabel>
      <ColorPicker value={value} onValueChange={onChange}>
        <ColorPickerTrigger
          variant="subtle"
          size="sm"
          className="min-w-0 justify-between gap-2 tabular-nums"
        >
          <span className="text-sm text-muted-foreground uppercase">
            {value}
          </span>
          <ColorPickerSwatch size="sm" />
        </ColorPickerTrigger>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHueSlider />
          <ColorPickerFormatSelect className="w-full" />
          <ColorPickerInput className="flex-1" />
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <RowLabel>{label}</RowLabel>
        <span className="text-sm text-muted-foreground tabular-nums">
          {display}
        </span>
      </div>
      <Slider
        size="sm"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(toNumber(v))}
      />
    </div>
  )
}

function FlyoutItem({
  label,
  active,
  onSelect,
}: {
  label: string
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center rounded-md px-2 py-1.5 text-left text-base transition-colors",
        active
          ? "font-medium text-primary"
          : "text-secondary-foreground hover:bg-secondary"
      )}
    >
      {label}
    </button>
  )
}

function PreviewRail({
  active,
  onSelect,
}: {
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="group/rail relative flex h-full shrink-0 items-stretch px-4">
      {/* Tick pattern — one mark per flyout item, active one highlighted.
          Scrolls independently (like the flyout) so every tick is reachable. */}
      <div className="scrollbar-hide flex h-full flex-col justify-center-safe gap-1.5 overflow-y-auto py-4">
        {RAIL_ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => onSelect(item.id)}
              className="flex h-1.5 w-6 items-center"
            >
              <span
                className={cn(
                  "h-0.5 rounded-full transition-all",
                  isActive ? "w-6 bg-primary" : "w-4 bg-border"
                )}
              />
            </button>
          )
        })}
      </div>

      {/* Flyout — revealed on hover. Outer stays overflow-visible so the
          `::before` bridge (covering the ml-2 gap) keeps hover continuous;
          the inner container does the scrolling. */}
      <div
        className={cn(
          "opacity- 0 invisible absolute top-1/2 left-full z-50 ml-2 flex max-h-[80vh] w-56 -translate-x-1 -translate-y-1/2 flex-col rounded-xl border border-border-soft bg-popover p-1.5 shadow-elevation-xl transition duration-150",
          "before:absolute before:top-0 before:-left-3 before:h-full before:w-3 before:content-['']",
          "group-hover/rail:visible group-hover/rail:translate-x-0 group-hover/rail:opacity-100"
        )}
      >
        <div className="scrollbar-hide scroll-fade flex min-h-0 flex-col overflow-y-auto">
          <span className="px-2 pt-1.5 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Preview
          </span>
          {PREVIEW_ITEMS.map((item) => (
            <FlyoutItem
              key={item.id}
              label={item.label}
              active={item.id === active}
              onSelect={() => onSelect(item.id)}
            />
          ))}

          <div className="my-2 h-px shrink-0 bg-border" />

          <span className="px-2 pt-1 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Components
          </span>
          {COMPONENT_ITEMS.map((item) => (
            <FlyoutItem
              key={item.id}
              label={item.label}
              active={item.id === active}
              onSelect={() => onSelect(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function PreviewPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <span className="text-2xl font-medium text-foreground">{label}</span>
      <span className="max-w-xs text-base text-muted-foreground">
        Customisation for this component is coming soon.
      </span>
    </div>
  )
}

export default function CustomisePage() {
  const [active, setActive] = React.useState<string>("crm")
  const [accent, setAccent] = React.useState(DEFAULTS.accent)
  const [danger, setDanger] = React.useState(DEFAULTS.danger)
  const [fontScale, setFontScale] = React.useState(DEFAULTS.fontScale)
  const [spacingScale, setSpacingScale] = React.useState(DEFAULTS.spacingScale)
  const [radius, setRadius] = React.useState(DEFAULTS.radius)

  const activeLabel =
    RAIL_ITEMS.find((item) => item.id === active)?.label ?? active

  const previewVars = React.useMemo(() => {
    const vars: Record<string, string> = {
      "--primary": accent,
      "--destructive": danger,
      "--radius": `${radius}px`,
      "--spacing": `${(SPACING_BASE * spacingScale).toFixed(4)}rem`,
    }
    for (const [name, base] of Object.entries(TEXT_TOKENS)) {
      vars[`--text-${name}`] = `${(base * fontScale).toFixed(4)}rem`
    }
    return vars as React.CSSProperties
  }, [accent, danger, fontScale, spacingScale, radius])

  const reset = React.useCallback(() => {
    setAccent(DEFAULTS.accent)
    setDanger(DEFAULTS.danger)
    setFontScale(DEFAULTS.fontScale)
    setSpacingScale(DEFAULTS.spacingScale)
    setRadius(DEFAULTS.radius)
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-secondary">
      {/* Left rail + hover flyout navigation */}
      <PreviewRail active={active} onSelect={setActive} />

      {/* Preview — CSS var overrides cascade in; `transform-gpu` makes this the
          containing block so the CRM's fixed sidebar aligns to it, not the viewport */}
      <div
        className="min-w-0 flex-1 transform-gpu overflow-hidden bg-background"
        style={previewVars}
      >
        {active === "crm" ? (
          <CrmPage />
        ) : (
          <PreviewPlaceholder label={activeLabel} />
        )}
      </div>

      {/* Customiser panel */}
      <aside className="flex w-80 shrink-0 flex-col border-l border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-lg font-medium text-foreground">Customise</span>
          <Button variant="ghost" size="icon-sm" onClick={reset}>
            <RotateCcw />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          {/* Color */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Color</SectionLabel>
            <ColorRow label="Accent" value={accent} onChange={setAccent} />
            <ColorRow label="Danger" value={danger} onChange={setDanger} />
          </div>

          {/* Typography */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Typography</SectionLabel>
            <SliderRow
              label="Font Size"
              value={fontScale}
              display={fontScale.toFixed(2)}
              min={0.8}
              max={1.4}
              step={0.05}
              onChange={setFontScale}
            />
          </div>

          {/* Density */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Density</SectionLabel>
            <SliderRow
              label="Spacing"
              value={spacingScale}
              display={spacingScale.toFixed(2)}
              min={0.75}
              max={1.5}
              step={0.05}
              onChange={setSpacingScale}
            />
          </div>

          {/* Corners */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Corners</SectionLabel>
            <SliderRow
              label="Radius"
              value={radius}
              display={`${radius}px`}
              min={0}
              max={20}
              step={1}
              onChange={setRadius}
            />
          </div>
        </div>
      </aside>
    </div>
  )
}
