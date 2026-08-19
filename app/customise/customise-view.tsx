"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import { RotateCcw, Copy, Check } from "lucide-react"
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { applyCustomisation, resetAllCustomisations } from "./actions"
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

// Most components expose a bare `data-slot="<id>"`, but a few use a different
// root name or split across prefixed parts (portaled content, sub-elements).
// Map those to the correct selector so scoped overrides actually land.
// `sonner` and `kanban` have no data-slot and aren't targetable.
const SLOT_SELECTORS: Record<string, string> = {
  radio: '[data-slot="radio-group"]',
  select: '[data-slot^="select-"]',
  combobox: '[data-slot^="combobox-"]',
  "color-picker": '[data-slot^="color-picker-"]',
}
function slotSelector(id: string) {
  return SLOT_SELECTORS[id] ?? `[data-slot="${id}"]`
}

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
  iconRadius: 10, // px — icon-only button radius (--radius-btn-icon); off at default
}

// Known-exact pristine values for the Style-tab colours, so the panel chrome
// (which uses --primary / --destructive) resets correctly even when the DOM's
// `themeDefaults` is polluted by an already-applied global override.
const PRISTINE_STYLE_COLORS: Record<string, ColorPair> = {
  primary: DEFAULTS.accent,
  destructive: DEFAULTS.danger,
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
  dot,
  onSelect,
}: {
  label: string
  active: boolean
  dot?: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-base transition-colors",
        active
          ? "font-medium text-blue-500"
          : "text-secondary-foreground hover:bg-secondary"
      )}
    >
      <span className="truncate">{label}</span>
      {dot && (
        <span
          aria-label="customised"
          className="ml-auto size-1.5 shrink-0 rounded-full bg-blue-500"
        />
      )}
    </button>
  )
}

function PreviewRail({
  active,
  customised,
  onSelect,
}: {
  active: string
  customised: Set<string>
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
              dot={customised.has(item.id)}
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
              dot={customised.has(item.id)}
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

type Snapshot = {
  fontScale: number
  lineScale: number
  letterSpacing: number
  spacingScale: number
  radius: number
  iconRadius: number
  colors: Record<string, ColorPair>
}

// Build a map of changed CSS variables ({ "--radius": "6px", ... }) from a set
// of slider/colour values, split into mode-independent+light (`main`) and dark.
// Used to export the shadcn registry item.
type VarValues = {
  radius: number
  iconRadius: number
  spacingScale: number
  fontScale: number
  letterSpacing: number
  colors: Record<string, ColorPair>
}
function buildVarMap(v: VarValues, themeDefaults: Record<string, ColorPair>) {
  const main: Record<string, string> = {}
  const dark: Record<string, string> = {}
  if (v.radius !== DEFAULTS.radius) main["--radius"] = `${v.radius}px`
  if (v.iconRadius !== DEFAULTS.iconRadius)
    main["--radius-btn-icon"] = `${v.iconRadius}px`
  if (v.spacingScale !== DEFAULTS.spacingScale)
    main["--spacing"] = `${(SPACING_BASE * v.spacingScale).toFixed(4)}rem`
  if (v.fontScale !== DEFAULTS.fontScale)
    for (const [name, base] of Object.entries(TEXT_TOKENS))
      main[`--text-${name}`] = `${(base * v.fontScale).toFixed(4)}rem`
  if (v.letterSpacing !== DEFAULTS.letterSpacing)
    for (const [name, base] of Object.entries(TRACKING_TOKENS))
      main[`--tracking-${name}`] = `${(base + v.letterSpacing).toFixed(4)}em`
  for (const token of ALL_COLOR_TOKENS) {
    const pair = v.colors[token]
    if (!pair) continue
    const def = themeDefaults[token]
    if (!def || pair.light.toLowerCase() !== def.light.toLowerCase())
      main[`--${token}`] = pair.light
    if (!def || pair.dark.toLowerCase() !== def.dark.toLowerCase())
      dark[`--${token}`] = pair.dark
  }
  return { main, dark }
}

// Strip the leading `--` from a var map's keys (shadcn cssVars want bare names).
function stripDashes(map: Record<string, string>) {
  const out: Record<string, string> = {}
  for (const [k, val] of Object.entries(map)) out[k.replace(/^--/, "")] = val
  return out
}

const SNAPSHOT_PREFIX = "customise:v1:"
// Reserved id for the "Apply to all" (global) snapshot, stored alongside the
// per-component ones. Never a real component, so it never gets a rail dot.
const GLOBAL_ID = "__global__"
// Original theme colours captured before any "Apply to all" is baked into
// globals.css. Once a global apply exists, `themeDefaults` (read from the DOM)
// reflects the applied colour, so we need this to keep the tool chrome fixed.
const PRISTINE_KEY = "customise:pristine:v1"
function loadPristine(): Record<string, ColorPair> {
  try {
    const raw = localStorage.getItem(PRISTINE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, ColorPair>) : {}
  } catch {
    return {}
  }
}
function savePristine(v: Record<string, ColorPair>) {
  try {
    localStorage.setItem(PRISTINE_KEY, JSON.stringify(v))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

// Per-component slider/colour state, so re-opening a component shows what was
// last applied to it. globals.css holds the real styles; this holds the UI.
function loadSnapshot(id: string): Snapshot | null {
  try {
    const raw = localStorage.getItem(SNAPSHOT_PREFIX + id)
    return raw ? (JSON.parse(raw) as Snapshot) : null
  } catch {
    return null
  }
}

function saveSnapshot(id: string, snap: Snapshot) {
  try {
    localStorage.setItem(SNAPSHOT_PREFIX + id, JSON.stringify(snap))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

function clearSnapshot(id: string) {
  try {
    localStorage.removeItem(SNAPSHOT_PREFIX + id)
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export default function CustomiseView() {
  const router = useRouter()
  // Derived from the URL rather than a prop so this component can live in the
  // persistent layout and NOT remount on component switches (which would re-run
  // the theme read + snapshot load and cause a colour flash).
  const pathname = usePathname()
  const active = pathname.split("/").filter(Boolean)[1] ?? "crm"
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
  const [iconRadius, setIconRadius] = React.useState(DEFAULTS.iconRadius)

  // The global ("Apply to all") snapshot — the shared baseline every component
  // inherits. Seeded from localStorage, updated on apply-to-all / reset.
  const [globalSnap, setGlobalSnap] = React.useState<Snapshot | null>(null)
  const [globalLoaded, setGlobalLoaded] = React.useState(false)
  React.useEffect(() => {
    setGlobalSnap(loadSnapshot(GLOBAL_ID))
    setGlobalLoaded(true)
  }, [])

  // Pristine (pre-global-apply) theme colours — used to keep the tool chrome
  // fixed. When nothing is applied globally, the read defaults ARE pristine, so
  // capture + persist them; otherwise trust the persisted copy over the
  // now-polluted `themeDefaults`.
  const [pristine, setPristine] = React.useState<Record<string, ColorPair>>({})
  React.useEffect(() => {
    if (!globalLoaded || !Object.keys(themeDefaults).length) return
    if (globalSnap === null) {
      setPristine(themeDefaults)
      savePristine(themeDefaults)
    } else {
      const saved = loadPristine()
      setPristine(Object.keys(saved).length ? saved : themeDefaults)
    }
  }, [globalLoaded, globalSnap, themeDefaults])

  // Effective baseline for the active component: theme defaults, overlaid with
  // whatever was applied globally. A component's own snapshot layers on top.
  const baseline = React.useMemo(
    () => ({
      fontScale: globalSnap?.fontScale ?? DEFAULTS.fontScale,
      lineScale: globalSnap?.lineScale ?? DEFAULTS.lineScale,
      letterSpacing: globalSnap?.letterSpacing ?? DEFAULTS.letterSpacing,
      spacingScale: globalSnap?.spacingScale ?? DEFAULTS.spacingScale,
      radius: globalSnap?.radius ?? DEFAULTS.radius,
      iconRadius: globalSnap?.iconRadius ?? DEFAULTS.iconRadius,
      colors: { ...themeDefaults, ...(globalSnap?.colors ?? {}) },
    }),
    [globalSnap, themeDefaults]
  )

  // Once theme defaults are read (and whenever the active component or global
  // baseline changes), set the sliders from: defaults → global → component.
  React.useEffect(() => {
    if (!Object.keys(themeDefaults).length) return
    const c = loadSnapshot(active)
    setColors({ ...baseline.colors, ...(c?.colors ?? {}) })
    setFontScale(c?.fontScale ?? baseline.fontScale)
    setLineScale(c?.lineScale ?? baseline.lineScale)
    setLetterSpacing(c?.letterSpacing ?? baseline.letterSpacing)
    setSpacingScale(c?.spacingScale ?? baseline.spacingScale)
    setRadius(c?.radius ?? baseline.radius)
    setIconRadius(c?.iconRadius ?? baseline.iconRadius)
  }, [themeDefaults, active, baseline])

  // Components that carry a saved (applied) customisation — drives the rail's
  // blue dots. Seeded from localStorage, then kept in sync on apply/reset.
  const [customisedIds, setCustomisedIds] = React.useState<Set<string>>(
    () => new Set()
  )
  React.useEffect(() => {
    const ids = new Set<string>()
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key?.startsWith(SNAPSHOT_PREFIX)) continue
        const id = key.slice(SNAPSHOT_PREFIX.length)
        if (id !== GLOBAL_ID) ids.add(id)
      }
    } catch {
      /* storage unavailable */
    }
    setCustomisedIds(ids)
  }, [])

  // Whether the active component differs from its baseline (global + defaults).
  // A global change alone isn't "dirty" — only a component-specific deviation.
  const isDirty = React.useMemo(() => {
    if (
      radius !== baseline.radius ||
      iconRadius !== baseline.iconRadius ||
      spacingScale !== baseline.spacingScale ||
      fontScale !== baseline.fontScale ||
      letterSpacing !== baseline.letterSpacing
    )
      return true
    for (const token of ALL_COLOR_TOKENS) {
      const pair = colors[token]
      const base = baseline.colors[token]
      if (!pair || !base) continue
      if (
        pair.light.toLowerCase() !== base.light.toLowerCase() ||
        pair.dark.toLowerCase() !== base.dark.toLowerCase()
      )
        return true
    }
    return false
  }, [radius, iconRadius, spacingScale, fontScale, letterSpacing, colors, baseline])

  // Dotted = applied customisations, plus the active one while being edited.
  const dottedIds = React.useMemo(() => {
    const ids = new Set(customisedIds)
    if (isDirty && active !== "crm") ids.add(active)
    return ids
  }, [customisedIds, isDirty, active])

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

    // `:root` gets the live colour overrides (vs the baked-in theme). The panel
    // is reset to the *pristine* theme (not `themeDefaults`, which is polluted
    // once a global apply is baked into globals.css) so the chrome never shifts.
    const light: string[] = []
    const dark: string[] = []
    const resetLight: string[] = []
    const resetDark: string[] = []
    for (const token of ALL_COLOR_TOKENS) {
      const pair = colors[token]
      const def = themeDefaults[token]
      if (!pair || !def) continue
      const pris = PRISTINE_STYLE_COLORS[token] ?? pristine[token] ?? def
      if (pair.light.toLowerCase() !== def.light.toLowerCase())
        light.push(`--${token}:${pair.light};`)
      if (pair.dark.toLowerCase() !== def.dark.toLowerCase())
        dark.push(`--${token}:${pair.dark};`)
      // reset the panel to pristine whenever :root would otherwise show a
      // non-pristine value (live change OR a baked-in global apply)
      if (
        pair.light.toLowerCase() !== pris.light.toLowerCase() ||
        def.light.toLowerCase() !== pris.light.toLowerCase()
      )
        resetLight.push(`--${token}:${pris.light};`)
      if (
        pair.dark.toLowerCase() !== pris.dark.toLowerCase() ||
        def.dark.toLowerCase() !== pris.dark.toLowerCase()
      )
        resetDark.push(`--${token}:${pris.dark};`)
    }

    // Icon-only button radius override (--radius-btn-icon). Only emitted when
    // changed so icon buttons keep their per-size defaults otherwise; the panel
    // resets it to `initial` so the tool chrome's icon buttons stay unaffected.
    const iconRadiusCss =
      iconRadius !== DEFAULTS.iconRadius
        ? `--radius-btn-icon:${iconRadius}px;`
        : ""

    return (
      `:root{${sharedCurrent}${iconRadiusCss}${light.join("")}}` +
      (dark.length ? `.dark{${dark.join("")}}` : "") +
      // `letter-spacing` is applied once on <body> (tracking-normal) and
      // inherited as a computed length, so resetting the var alone doesn't
      // reach the panel — re-derive it here from the reset --tracking-normal.
      `[data-customise-panel]{${sharedDefault}--radius-btn-icon:initial;${resetLight.join("")}letter-spacing:var(--tracking-normal);}` +
      (resetDark.length
        ? `.dark [data-customise-panel]{${resetDark.join("")}}`
        : "")
    )
  }, [
    colors,
    themeDefaults,
    pristine,
    fontScale,
    lineScale,
    letterSpacing,
    spacingScale,
    radius,
    iconRadius,
  ])

  const reset = React.useCallback(() => {
    setColors(themeDefaults)
    setFontScale(DEFAULTS.fontScale)
    setLineScale(DEFAULTS.lineScale)
    setLetterSpacing(DEFAULTS.letterSpacing)
    setSpacingScale(DEFAULTS.spacingScale)
    setRadius(DEFAULTS.radius)
    setIconRadius(DEFAULTS.iconRadius)
  }, [themeDefaults])

  // Revert the sliders to the shared baseline (global override, else defaults).
  const resetToBaseline = React.useCallback(() => {
    setColors(baseline.colors)
    setFontScale(baseline.fontScale)
    setLineScale(baseline.lineScale)
    setLetterSpacing(baseline.letterSpacing)
    setSpacingScale(baseline.spacingScale)
    setRadius(baseline.radius)
    setIconRadius(baseline.iconRadius)
  }, [baseline])

  // Serialise only the changed values into CSS declarations.
  // `main` = mode-independent + light colors; `dark` = dark-mode colours.
  const buildDecls = React.useCallback(() => {
    const main: string[] = []
    const dark: string[] = []
    if (radius !== DEFAULTS.radius) main.push(`--radius:${radius}px;`)
    if (iconRadius !== DEFAULTS.iconRadius)
      main.push(`--radius-btn-icon:${iconRadius}px;`)
    if (spacingScale !== DEFAULTS.spacingScale)
      main.push(`--spacing:${(SPACING_BASE * spacingScale).toFixed(4)}rem;`)
    if (fontScale !== DEFAULTS.fontScale)
      for (const [name, base] of Object.entries(TEXT_TOKENS))
        main.push(`--text-${name}:${(base * fontScale).toFixed(4)}rem;`)
    if (letterSpacing !== DEFAULTS.letterSpacing)
      for (const [name, base] of Object.entries(TRACKING_TOKENS))
        main.push(`--tracking-${name}:${(base + letterSpacing).toFixed(4)}em;`)
    for (const token of ALL_COLOR_TOKENS) {
      const pair = colors[token]
      const def = themeDefaults[token]
      if (!pair || !def) continue
      if (pair.light.toLowerCase() !== def.light.toLowerCase())
        main.push(`--${token}:${pair.light};`)
      if (pair.dark.toLowerCase() !== def.dark.toLowerCase())
        dark.push(`--${token}:${pair.dark};`)
    }
    return { main: main.join(""), dark: dark.join("") }
  }, [radius, iconRadius, spacingScale, fontScale, letterSpacing, colors, themeDefaults])

  // Writes are fast + idempotent, so we don't disable buttons while pending —
  // toggling `disabled` mid-write causes a visible flash of the disabled style.
  const [, startApply] = React.useTransition()

  // "Apply to all" → global override written to :root / .dark in globals.css.
  // Colour overrides that differ from the theme defaults (for snapshots).
  const colorDiff = React.useCallback(() => {
    const diff: Record<string, ColorPair> = {}
    for (const token of ALL_COLOR_TOKENS) {
      const pair = colors[token]
      const def = themeDefaults[token]
      if (!pair || !def) continue
      if (
        pair.light.toLowerCase() !== def.light.toLowerCase() ||
        pair.dark.toLowerCase() !== def.dark.toLowerCase()
      )
        diff[token] = pair
    }
    return diff
  }, [colors, themeDefaults])

  const applyGlobal = React.useCallback(() => {
    if (!isDirty) return // nothing differs from the current baseline
    const { main, dark } = buildDecls()
    const css =
      (main ? `:root{${main}}` : "") + (dark ? `.dark{${dark}}` : "")

    // persist as the shared baseline so every component's sliders reflect it
    if (css) {
      const snap: Snapshot = {
        fontScale,
        lineScale,
        letterSpacing,
        spacingScale,
        radius,
        iconRadius,
        colors: colorDiff(),
      }
      saveSnapshot(GLOBAL_ID, snap)
      setGlobalSnap(snap)
    } else {
      clearSnapshot(GLOBAL_ID)
      setGlobalSnap(null)
    }

    startApply(async () => {
      await applyCustomisation("global", css)
      toast.success(
        css ? "Applied to all components" : "Global customisation cleared"
      )
    })
  }, [
    isDirty,
    buildDecls,
    colorDiff,
    fontScale,
    lineScale,
    letterSpacing,
    spacingScale,
    radius,
    iconRadius,
  ])

  // "Apply" → scoped to this component only, via its root data-slot. The
  // `:not([data-customise-panel] *)` excludes the customiser's own chrome so the
  // sidebar's buttons/inputs don't change (a no-op in the real app).
  const applyComponent = React.useCallback(() => {
    if (active === "crm") return
    // Nothing to do if it matches the baseline and has no existing override.
    if (!isDirty && !customisedIds.has(active)) return
    const sel = `${slotSelector(active)}:not([data-customise-panel] *)`
    const { main, dark } = buildDecls()
    const css =
      (main ? `${sel}{${main}}` : "") + (dark ? `.dark ${sel}{${dark}}` : "")

    // persist the slider/colour positions for this component only
    if (css)
      saveSnapshot(active, {
        fontScale,
        lineScale,
        letterSpacing,
        spacingScale,
        radius,
        iconRadius,
        colors: colorDiff(),
      })
    else clearSnapshot(active)

    setCustomisedIds((prev) => {
      const next = new Set(prev)
      if (css) next.add(active)
      else next.delete(active)
      return next
    })

    startApply(async () => {
      await applyCustomisation(active, css)
      toast.success(
        css ? `Applied to ${activeLabel}` : `${activeLabel} reset to default`
      )
    })
  }, [
    active,
    activeLabel,
    isDirty,
    customisedIds,
    buildDecls,
    colorDiff,
    fontScale,
    lineScale,
    letterSpacing,
    spacingScale,
    radius,
    iconRadius,
  ])

  // "Reset" → revert this component to its baseline (global override, else
  // defaults): reset the sliders, drop its globals.css block + snapshot.
  const resetComponent = React.useCallback(() => {
    if (active === "crm") return
    const wasCustomised = customisedIds.has(active)
    if (!isDirty && !wasCustomised) return // already at baseline, nothing to do
    resetToBaseline()
    if (wasCustomised) {
      clearSnapshot(active)
      setCustomisedIds((prev) => {
        const next = new Set(prev)
        next.delete(active)
        return next
      })
    }
    startApply(async () => {
      if (wasCustomised) await applyCustomisation(active, "")
      toast.success(`${activeLabel} reset to default`)
    })
  }, [active, activeLabel, isDirty, customisedIds, resetToBaseline])

  // Global reset — every component + global override back to theme defaults.
  const resetAll = React.useCallback(() => {
    const hadAny = isDirty || customisedIds.size > 0 || globalSnap !== null
    reset()
    setGlobalSnap(null)
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        if (key?.startsWith(SNAPSHOT_PREFIX)) localStorage.removeItem(key)
      }
    } catch {
      /* storage unavailable */
    }
    setCustomisedIds(new Set())
    startApply(async () => {
      await resetAllCustomisations()
      if (hadAny) toast.success("All customisations reset")
    })
  }, [reset, isDirty, customisedIds, globalSnap])

  // --- "Get code": export all customisations as a shadcn registry item ------
  const [codeOpen, setCodeOpen] = React.useState(false)
  const [installUrl, setInstallUrl] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  // Assemble the registry item: global changes → cssVars, per-component
  // overrides → css (each [data-slot=…]). The active component uses its live
  // slider state; others read their saved snapshots.
  const buildRegistryItem = React.useCallback(() => {
    const currentVals: VarValues = {
      radius,
      iconRadius,
      spacingScale,
      fontScale,
      letterSpacing,
      colors,
    }

    const cssVars: { light?: Record<string, string>; dark?: Record<string, string> } = {}
    if (globalSnap) {
      const g = buildVarMap(globalSnap, themeDefaults)
      if (Object.keys(g.main).length) cssVars.light = stripDashes(g.main)
      if (Object.keys(g.dark).length) cssVars.dark = stripDashes(g.dark)
    }

    const css: Record<string, Record<string, string>> = {}
    const ids = new Set(customisedIds)
    if (isDirty && active !== "crm") ids.add(active)
    for (const id of ids) {
      const vals = id === active ? currentVals : loadSnapshot(id)
      if (!vals) continue
      const { main, dark } = buildVarMap(vals, themeDefaults)
      const sel = slotSelector(id)
      if (Object.keys(main).length) css[sel] = main
      if (Object.keys(dark).length) css[`.dark ${sel}`] = dark
    }

    const item: Record<string, unknown> = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "custom-theme",
      type: "registry:style",
      title: "Custom theme",
      description: "Theme customisation exported from the Espresso customiser.",
    }
    if (cssVars.light || cssVars.dark) item.cssVars = cssVars
    if (Object.keys(css).length) item.css = css
    return item
  }, [
    radius,
    iconRadius,
    spacingScale,
    fontScale,
    letterSpacing,
    colors,
    globalSnap,
    themeDefaults,
    customisedIds,
    isDirty,
    active,
  ])

  const openGetCode = React.useCallback(() => {
    const item = buildRegistryItem()
    // Encode the registry item into the URL (base64url) rather than writing a
    // file — a route handler serves it, so this works on read-only serverless
    // filesystems (Vercel) too.
    const payload = btoa(JSON.stringify(item))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
    setInstallUrl(
      `${window.location.origin}/r/custom-theme.json?d=${payload}`
    )
    setCodeOpen(true)
  }, [buildRegistryItem])

  const installCommand = installUrl
    ? `npx shadcn@latest add ${installUrl}`
    : "Generating…"

  const copyCommand = React.useCallback(() => {
    if (!installUrl) return
    navigator.clipboard?.writeText(`npx shadcn@latest add ${installUrl}`).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    })
  }, [installUrl])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f3f3] dark:bg-[#2b2b2b]">
      {/* Token overrides applied at :root (so portaled overlays inherit them);
          the tool chrome (rail + panel) is reset via [data-customise-panel]. */}
      <style dangerouslySetInnerHTML={{ __html: previewCss }} />

      {/* Left rail + hover flyout navigation */}
      <div data-customise-panel className="contents">
        <PreviewRail
          active={active}
          customised={dottedIds}
          onSelect={setActive}
        />
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
            <Dialog>
              <DialogTrigger
                className="shrink-0"
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-7! shrink-0"
                    aria-label="Reset all components"
                  >
                    <RotateCcw />
                  </Button>
                }
              />
              <DialogContent size="sm" data-customise-panel>
                <DialogHeader>
                  <DialogTitle>Reset all customisations?</DialogTitle>
                  <DialogDescription>
                    This resets every component and the global theme back to
                    their default values, and removes all customise overrides
                    from your stylesheet. This can&apos;t be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="secondary">Back</Button>} />
                  <DialogClose
                    render={
                      <Button variant="destructive" onClick={resetAll}>
                        Okay
                      </Button>
                    }
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              {active === "button" && (
                <SliderRow
                  label="Icon Button Radius"
                  value={iconRadius}
                  display={`${iconRadius}px`}
                  min={0}
                  max={20}
                  step={1}
                  onChange={setIconRadius}
                />
              )}
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

        {/* Footer actions — persist overrides to app/globals.css */}
        <div className="grid grid-cols-2 gap-2 border-t border-border-soft p-3">
          <Button onClick={applyComponent} disabled={active === "crm"}>
            Apply
          </Button>
          <Button onClick={applyGlobal}>Apply to all</Button>
          <Button onClick={resetComponent} disabled={active === "crm"}>
            Reset
          </Button>
          <Button onClick={openGetCode}>Get code</Button>
          <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
            <DialogContent size="default" data-customise-panel>
              <DialogHeader>
                <DialogTitle>Install your theme</DialogTitle>
                <DialogDescription>
                  Run this in a shadcn project to apply your customisations.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-2 rounded-lg border border-border-soft bg-secondary p-3">
                <code className="min-w-0 flex-1 text-sm break-all">
                  {installCommand}
                </code>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="shrink-0"
                  onClick={copyCommand}
                  disabled={!installUrl}
                  aria-label="Copy command"
                >
                  {copied ? <Check /> : <Copy />}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </aside>
      {mounted && <Toaster />}
    </div>
  )
}
