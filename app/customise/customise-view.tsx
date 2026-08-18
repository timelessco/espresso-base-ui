"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"

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
  ColorPickerTrigger,
} from "@/components/ui/color-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/spinner"
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

// line-height tokens (unitless) — scaled by the Line Height control
const LEADING_TOKENS: Record<string, number> = { base: 1.15, lg: 1.35, xl: 1.5 }
const TEXT_LEADING_TOKENS: Record<string, number> = {
  "2xs": 1.1818,
  xs: 1.1667,
  sm: 1.1538,
  base: 1.1429,
  normal: 1.2,
  lg: 1.125,
  xl: 1.1667,
  "2xl": 1.15,
  "3xl": 1.1667,
  "4xl": 1.6154,
  "5xl": 1.6071,
  "6xl": 1.5938,
  "7xl": 1.4,
  "8xl": 1.4091,
  "9xl": 1.3958,
  "10xl": 1.4038,
  "11xl": 1.3929,
  "12xl": 1.2969,
  "13xl": 1.2778,
  "14xl": 1.2,
  "15xl": 1.2045,
}
// tracking tokens (em base) — offset by the Letter Spacing control
const TRACKING_TOKENS: Record<string, number> = { normal: 0.015, wider: 0.04 }

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

type ColorPair = { light: string; dark: string }

const DEFAULTS = {
  // separate light/dark values per color token
  accent: { light: "#171717", dark: "#f8f8f8" } as ColorPair,
  danger: { light: "#cc2929", dark: "#b01f1f" } as ColorPair,
  fontScale: 1,
  lineScale: 1,
  letterSpacing: 0, // em offset added to tracking tokens
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

// A large swatch that opens the color picker on click (used for Light / Dark).
// Clicking it also switches the preview to that mode so the change is visible.
function ModeSwatch({
  label,
  mode,
  value,
  onChange,
}: {
  label: string
  mode: "light" | "dark"
  value: string
  onChange: (value: string) => void
}) {
  const { setTheme } = useTheme()
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <ColorPicker
        className="block w-full"
        style={{ width: "100%" }}
        value={value}
        onValueChange={onChange}
      >
        <ColorPickerTrigger
          aria-label={`${label} color`}
          onClick={() => setTheme(mode)}
          className="flex h-14 min-w-0 rounded-lg border border-border-soft p-0 shadow-none hover:shadow-none"
          style={{ backgroundColor: value, width: "100%" }}
        />
        <ColorPickerContent side="left" align="start" sideOffset={8}>
          <ColorPickerArea />
          <ColorPickerHueSlider />
          <ColorPickerFormatSelect className="w-full" />
          <ColorPickerInput className="flex-1" />
        </ColorPickerContent>
      </ColorPicker>
      <span className="text-center text-xs text-muted-foreground">{label}</span>
      <span className="text-center text-xs text-secondary-foreground uppercase">
        {value}
      </span>
    </div>
  )
}

// A color row that opens a popup with separate Light / Dark swatches.
function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: ColorPair
  onChange: (value: ColorPair) => void
}) {
  const { resolvedTheme } = useTheme()
  // avoid hydration mismatch: resolvedTheme is undefined on the server, so keep
  // "light" until mounted, then follow the real theme
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const mode: "light" | "dark" =
    mounted && resolvedTheme === "dark" ? "dark" : "light"

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-left transition-colors hover:bg-secondary"
          />
        }
      >
        <RowLabel>{label}</RowLabel>
        <span className="ml-auto text-sm text-muted-foreground uppercase">
          {value[mode]}
        </span>
        <span
          className="size-4 shrink-0 rounded-full border border-border-soft"
          style={{ backgroundColor: value[mode] }}
        />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-64 p-3">
        <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-foreground lowercase">
          {label}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ModeSwatch
            label="Light"
            mode="light"
            value={value.light}
            onChange={(v) => onChange({ ...value, light: v })}
          />
          <ModeSwatch
            label="Dark"
            mode="dark"
            value={value.dark}
            onChange={(v) => onChange({ ...value, dark: v })}
          />
        </div>
      </PopoverContent>
    </Popover>
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
    <div className="flex flex-col gap-3 rounded-lg border border-border-soft px-3 pt-3 pb-4">
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
          ? "font-medium text-blue-500"
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
                  isActive ? "w-6 bg-blue-500" : "w-4 bg-border"
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
        <div className="scrollbar-hide flex min-h-0 scroll-fade flex-col overflow-y-auto">
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


// Semantic theme tokens shown in the Variables tab (each + its foreground).
const VARIABLE_TOKENS = [
  "background",
  "foreground",
  "sidebar",
  "sidebar-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "success",
  "success-foreground",
  "error",
  "error-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
]

// Style tab colors (Accent → --primary, Danger → --destructive) + variables.
const STYLE_TOKENS = ["primary", "destructive"]
const ALL_COLOR_TOKENS = Array.from(
  new Set([...STYLE_TOKENS, ...VARIABLE_TOKENS])
)

// Resolve a CSS token to sRGB hex. getComputedStyle may return lab()/oklch(),
// so paint it to a 1×1 canvas and read back the real pixel.
function tokenHex(
  token: string,
  probe: HTMLElement,
  ctx: CanvasRenderingContext2D | null
): string {
  probe.style.color = `var(--${token})`
  const color = getComputedStyle(probe).color
  if (!ctx) return color
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  const h = (n: number) => n.toString(16).padStart(2, "0")
  return `#${h(r)}${h(g)}${h(b)}`
}

// Read each token's light AND dark theme value by briefly toggling `.dark`
// synchronously (no repaint), regardless of the current theme.
function useThemeColorDefaults(tokens: string[]) {
  const [defaults, setDefaults] = React.useState<Record<string, ColorPair>>({})
  React.useEffect(() => {
    const html = document.documentElement
    const wasDark = html.classList.contains("dark")
    const probe = document.createElement("span")
    probe.style.cssText =
      "position:absolute;visibility:hidden;pointer-events:none"
    document.body.appendChild(probe)
    const ctx = document.createElement("canvas").getContext("2d")

    html.classList.remove("dark")
    const light: Record<string, string> = {}
    for (const t of tokens) light[t] = tokenHex(t, probe, ctx)
    html.classList.add("dark")
    const dark: Record<string, string> = {}
    for (const t of tokens) dark[t] = tokenHex(t, probe, ctx)
    if (!wasDark) html.classList.remove("dark")
    probe.remove()

    const next: Record<string, ColorPair> = {}
    for (const t of tokens)
      next[t] = { light: light[t] ?? "#000000", dark: dark[t] ?? "#000000" }
    setDefaults(next)
    // tokens is a stable module constant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return defaults
}

function VariablesTab({
  getPair,
  onChange,
}: {
  getPair: (token: string) => ColorPair
  onChange: (token: string, value: ColorPair) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Colors {VARIABLE_TOKENS.length}
      </span>
      {VARIABLE_TOKENS.map((token) => (
        <ColorField
          key={token}
          label={token}
          value={getPair(token)}
          onChange={(v) => onChange(token, v)}
        />
      ))}
    </div>
  )
}

// Centered spinner shown while a preview chunk loads or the route transitions.
function LoadingPreview() {
  return (
    <div className="flex h-full items-center justify-center bg-secondary">
      <Spinner className="size-6 text-blue-500" />
    </div>
  )
}

// Each remaining component has a bespoke block/card-grid preview under
// `./previews/<id>`. Loaded client-only (ssr: false) to avoid Base UI useId
// hydration mismatches across the dynamic boundary.
const lp = (loader: () => Promise<{ default: React.ComponentType }>) =>
  dynamic(loader, { ssr: false, loading: () => <LoadingPreview /> })

const PREVIEWS: Record<string, React.ComponentType> = {
  alert: lp(() => import("./previews/alert")),
  attachment: lp(() => import("./previews/attachment")),
  avatar: lp(() => import("./previews/avatar")),
  badge: lp(() => import("./previews/badge")),
  breadcrumb: lp(() => import("./previews/breadcrumb")),
  button: lp(() => import("./previews/button")),
  "button-group": lp(() => import("./previews/button-group")),
  calendar: lp(() => import("./previews/calendar")),
  card: lp(() => import("./previews/card")),
  checkbox: lp(() => import("./previews/checkbox")),
  "color-picker": lp(() => import("./previews/color-picker")),
  "color-swatch": lp(() => import("./previews/color-swatch")),
  combobox: lp(() => import("./previews/combobox")),
  command: lp(() => import("./previews/command")),
  dialog: lp(() => import("./previews/dialog")),
  "dropdown-menu": lp(() => import("./previews/dropdown-menu")),
  empty: lp(() => import("./previews/empty")),
  field: lp(() => import("./previews/field")),
  "file-upload": lp(() => import("./previews/file-upload")),
  header: lp(() => import("./previews/header")),
  input: lp(() => import("./previews/input")),
  "input-group": lp(() => import("./previews/input-group")),
  "input-otp": lp(() => import("./previews/input-otp")),
  item: lp(() => import("./previews/item")),
  kanban: lp(() => import("./previews/kanban")),
  kbd: lp(() => import("./previews/kbd")),
  message: lp(() => import("./previews/message")),
  notification: lp(() => import("./previews/notification")),
  popover: lp(() => import("./previews/popover")),
  progress: lp(() => import("./previews/progress")),
  radio: lp(() => import("./previews/radio")),
  rating: lp(() => import("./previews/rating")),
  select: lp(() => import("./previews/select")),
  separator: lp(() => import("./previews/separator")),
  slider: lp(() => import("./previews/slider")),
  sonner: lp(() => import("./previews/sonner")),
  spinner: lp(() => import("./previews/spinner")),
  switch: lp(() => import("./previews/switch")),
  table: lp(() => import("./previews/table")),
  tabs: lp(() => import("./previews/tabs")),
  tag: lp(() => import("./previews/tag")),
  textarea: lp(() => import("./previews/textarea")),
  timeline: lp(() => import("./previews/timeline")),
  tooltip: lp(() => import("./previews/tooltip")),
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

export default function CustomiseView({ active }: { active: string }) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const setActive = React.useCallback(
    (id: string) => startTransition(() => router.push(`/customise/${id}`)),
    [router]
  )
  // Render the preview client-only. It's empty on the server and the first
  // client render (so they match), which keeps the panel's Base UI `useId`
  // counter stable and avoids hydration mismatches from the preview subtree.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const themeDefaults = useThemeColorDefaults(ALL_COLOR_TOKENS)
  // seed the Style-tab colors so they don't flash before defaults resolve
  const [colors, setColors] = React.useState<Record<string, ColorPair>>({
    primary: DEFAULTS.accent,
    destructive: DEFAULTS.danger,
  })
  const [fontScale, setFontScale] = React.useState(DEFAULTS.fontScale)
  const [lineScale, setLineScale] = React.useState(DEFAULTS.lineScale)
  const [letterSpacing, setLetterSpacing] = React.useState(
    DEFAULTS.letterSpacing
  )
  const [spacingScale, setSpacingScale] = React.useState(DEFAULTS.spacingScale)
  const [radius, setRadius] = React.useState(DEFAULTS.radius)

  // once theme defaults are read, adopt them as the baseline for every token
  React.useEffect(() => {
    if (Object.keys(themeDefaults).length) setColors(themeDefaults)
  }, [themeDefaults])

  const getPair = React.useCallback(
    (token: string): ColorPair =>
      colors[token] ??
      themeDefaults[token] ?? { light: "#000000", dark: "#000000" },
    [colors, themeDefaults]
  )
  const setPair = React.useCallback((token: string, value: ColorPair) => {
    setColors((c) => ({ ...c, [token]: value }))
  }, [])

  const activeLabel =
    RAIL_ITEMS.find((item) => item.id === active)?.label ?? active

  // Overrides are applied at `:root` so that portaled overlays (Base UI
  // Select/Popover/Dropdown popups render to document.body, outside the
  // preview) also pick them up. The customiser panel is then reset back to the
  // theme defaults via `[data-customise-panel]` so the tool chrome stays stable.
  const previewCss = React.useMemo(() => {
    const buildShared = (
      fs: number,
      ls: number,
      letter: number,
      ss: number,
      r: number
    ) => {
      const fontVars = Object.entries(TEXT_TOKENS)
        .map(([name, base]) => `--text-${name}:${(base * fs).toFixed(4)}rem;`)
        .join("")
      const leadingVars = [
        ...Object.entries(LEADING_TOKENS).map(
          ([name, base]) => `--leading-${name}:${(base * ls).toFixed(4)};`
        ),
        ...Object.entries(TEXT_LEADING_TOKENS).map(
          ([name, base]) =>
            `--text-${name}--line-height:${(base * ls).toFixed(4)};`
        ),
      ].join("")
      const trackingVars = Object.entries(TRACKING_TOKENS)
        .map(([name, base]) => `--tracking-${name}:${(base + letter).toFixed(4)}em;`)
        .join("")
      return `--radius:${r}px;--spacing:${(SPACING_BASE * ss).toFixed(4)}rem;${fontVars}${leadingVars}${trackingVars}`
    }

    const sharedCurrent = buildShared(
      fontScale,
      lineScale,
      letterSpacing,
      spacingScale,
      radius
    )
    const sharedDefault = buildShared(
      DEFAULTS.fontScale,
      DEFAULTS.lineScale,
      DEFAULTS.letterSpacing,
      DEFAULTS.spacingScale,
      DEFAULTS.radius
    )

    // color overrides (only tokens that differ) + their panel resets
    const light: string[] = []
    const dark: string[] = []
    const resetLight: string[] = []
    const resetDark: string[] = []
    for (const token of ALL_COLOR_TOKENS) {
      const pair = colors[token]
      const def = themeDefaults[token]
      if (!pair || !def) continue
      if (pair.light.toLowerCase() !== def.light.toLowerCase()) {
        light.push(`--${token}:${pair.light};`)
        resetLight.push(`--${token}:${def.light};`)
      }
      if (pair.dark.toLowerCase() !== def.dark.toLowerCase()) {
        dark.push(`--${token}:${pair.dark};`)
        resetDark.push(`--${token}:${def.dark};`)
      }
    }

    return (
      `:root{${sharedCurrent}${light.join("")}}` +
      (dark.length ? `.dark{${dark.join("")}}` : "") +
      `[data-customise-panel]{${sharedDefault}${resetLight.join("")}}` +
      (resetDark.length
        ? `.dark [data-customise-panel]{${resetDark.join("")}}`
        : "")
    )
  }, [
    colors,
    themeDefaults,
    fontScale,
    lineScale,
    letterSpacing,
    spacingScale,
    radius,
  ])

  const reset = React.useCallback(() => {
    setColors(themeDefaults)
    setFontScale(DEFAULTS.fontScale)
    setLineScale(DEFAULTS.lineScale)
    setLetterSpacing(DEFAULTS.letterSpacing)
    setSpacingScale(DEFAULTS.spacingScale)
    setRadius(DEFAULTS.radius)
  }, [themeDefaults])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f3f3] dark:bg-[#2b2b2b]">
      {/* Token overrides applied at :root (so portaled overlays inherit them);
          the tool chrome (rail + panel) is reset via [data-customise-panel]. */}
      <style dangerouslySetInnerHTML={{ __html: previewCss }} />

      {/* Left rail + hover flyout navigation */}
      <div data-customise-panel className="contents">
        <PreviewRail active={active} onSelect={setActive} />
      </div>

      {/* Preview — CSS var overrides cascade in; `transform-gpu` makes this the
          containing block so the CRM's fixed sidebar aligns to it, not the viewport */}
      <div
        data-preview-scope
        className="min-w-0 flex-1 transform-gpu overflow-hidden bg-background"
      >
        {!mounted ? null : isPending ? (
          <LoadingPreview />
        ) : active === "crm" ? (
          <CrmPage />
        ) : PREVIEWS[active] ? (
          React.createElement(PREVIEWS[active])
        ) : (
          <PreviewPlaceholder label={activeLabel} />
        )}
      </div>

      {/* Customiser panel — floating card */}
      <aside
        data-customise-panel
        className="m-3 flex w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-border-soft bg-background shadow-elevation-xl"
      >
        <Tabs
          defaultValue="style"
          className="flex min-h-0 flex-1 flex-col gap-0"
        >
          <div className="flex items-center gap-2 border-b border-border-soft px-3 py-3">
            <TabsList className="flex-1">
              <TabsIndicator />
              <TabsTrigger value="style" className="flex-1">
                Style
              </TabsTrigger>
              <TabsTrigger value="variables" className="flex-1">
                Variables
              </TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="icon-sm" onClick={reset}>
              <RotateCcw />
            </Button>
          </div>

          <TabsContent
            value="style"
            className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4"
          >
            {/* Color */}
            <div className="flex flex-col gap-3">
              <SectionLabel>Color</SectionLabel>
              <ColorField
                label="Primary"
                value={getPair("primary")}
                onChange={(v) => setPair("primary", v)}
              />
              <ColorField
                label="Danger"
                value={getPair("destructive")}
                onChange={(v) => setPair("destructive", v)}
              />
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
              {/* Line Height — hidden for now
              <SliderRow
                label="Line Height"
                value={lineScale}
                display={lineScale.toFixed(2)}
                min={0.8}
                max={1.6}
                step={0.05}
                onChange={setLineScale}
              />
              */}
              <SliderRow
                label="Letter Spacing"
                value={letterSpacing}
                display={`${letterSpacing.toFixed(2)}em`}
                min={-0.05}
                max={0.1}
                step={0.01}
                onChange={setLetterSpacing}
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
          </TabsContent>

          <TabsContent
            value="variables"
            className="min-h-0 flex-1 overflow-y-auto p-4"
          >
            <div className="flex flex-col gap-6">
              <VariablesTab getPair={getPair} onChange={setPair} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer actions (functionality TBD) */}
        <div className="flex gap-2 border-t border-border-soft p-3">
          <Button className="flex-1">Apply</Button>
          <Button className="flex-1">Apply to all</Button>
        </div>
      </aside>
    </div>
  )
}
