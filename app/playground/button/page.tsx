"use client"

import { useRef, useState } from "react"
import { Check, Copy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"

/* -------------------------------------------------------------------------- */
/*  Button playground                                                          */
/*                                                                            */
/*  Click any button in the preview to select it, then tweak its padding,      */
/*  height, font size, background and text color from the right sidebar.       */
/*  Each button keeps its own overrides.                                       */
/* -------------------------------------------------------------------------- */

type Overrides = {
  paddingX: number
  height: number
  fontSize: number
  radius: number
  iconSize: number
  background: string
  color: string
}

type SizeItem = { key: string; size: string; label: string; icon: boolean }

const TEXT_SIZES: SizeItem[] = [
  { key: "xs", size: "xs", label: "xs", icon: false },
  { key: "sm", size: "sm", label: "sm", icon: false },
  { key: "default", size: "default", label: "default", icon: false },
  { key: "lg", size: "lg", label: "lg", icon: false },
  { key: "xl", size: "xl", label: "xl", icon: false },
  { key: "2xl", size: "2xl", label: "2xl", icon: false },
]

const ICON_SIZES: SizeItem[] = [
  { key: "icon-xs", size: "icon-xs", label: "xs", icon: true },
  { key: "icon-sm", size: "icon-sm", label: "sm", icon: true },
  { key: "icon", size: "icon", label: "default", icon: true },
  { key: "icon-lg", size: "icon-lg", label: "lg", icon: true },
  { key: "icon-xl", size: "icon-xl", label: "xl", icon: true },
  { key: "icon-2xl", size: "icon-2xl", label: "2xl", icon: true },
]

/**
 * Normalize any CSS color string (`rgb`, `rgba`, `oklch`, named, …) to a
 * `#rrggbb` hex usable by an `<input type="color">`. Uses a canvas so the
 * browser does the parsing for us across every color format.
 */
function toHex(color: string): string {
  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return "#000000"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")
}

const VARIANTS = [
  { label: "Default", value: "default" },
  { label: "Secondary", value: "secondary" },
  { label: "Outline", value: "outline" },
  { label: "Ghost", value: "ghost" },
  { label: "Destructive", value: "destructive" },
  { label: "Link", value: "link" },
]

// The shadcn registry URL the button is installed from.
const REGISTRY_URL = "https://espresso-base-ui.vercel.app/r/button.json"

// Base64url-encode the theme preset for the `?preset=` install param.
function encodePreset(payload: unknown): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export default function ButtonPlaygroundPage() {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [variant, setVariant] = useState("default")
  const [selected, setSelected] = useState<string | null>(null)
  const [overrides, setOverrides] = useState<Record<string, Overrides>>({})
  // Seeded (unedited) snapshot per button, used to detect real changes.
  const initials = useRef<Record<string, Overrides>>({})
  const [showProps, setShowProps] = useState(false)
  const [copied, setCopied] = useState(false)

  // Overrides are scoped per variant+size, so theming one variant never leaks
  // onto another (editing Default's `lg` must not touch Secondary's `lg`).
  const keyFor = (size: string) => `${variant}:${size}`

  const selectButton = (size: string) => {
    const key = keyFor(size)
    setSelected(key)
    if (overrides[key]) return
    // Seed controls from the button's current computed style on first select.
    const el = refs.current[size]
    if (!el) return
    const cs = getComputedStyle(el)
    const svg = el.querySelector("svg")
    const seed: Overrides = {
      paddingX: parseFloat(cs.paddingLeft) || 0,
      height: parseFloat(cs.height) || 0,
      fontSize: parseFloat(cs.fontSize) || 0,
      radius: parseFloat(cs.borderTopLeftRadius) || 0,
      iconSize: svg ? parseFloat(getComputedStyle(svg).width) || 16 : 16,
      background: toHex(cs.backgroundColor),
      color: toHex(cs.color),
    }
    if (!initials.current[key]) initials.current[key] = seed
    setOverrides((prev) => (prev[key] ? prev : { ...prev, [key]: seed }))
  }

  const setField = (field: keyof Overrides, value: number | string) => {
    if (!selected) return
    setOverrides((prev) => ({
      ...prev,
      [selected]: { ...prev[selected], [field]: value },
    }))
  }

  const isEdited = (key: string) => {
    const init = initials.current[key]
    const o = overrides[key]
    if (!init || !o) return false
    return (Object.keys(o) as (keyof Overrides)[]).some((f) => o[f] !== init[f])
  }

  const reset = () => {
    setOverrides({})
    initials.current = {}
    setSelected(null)
    setVariant("default")
  }

  // Copy the selected button's radius / background / text color onto every size
  // shown in the preview (all buttons share the active variant).
  const applyToAll = () => {
    if (!selected) return
    const src = overrides[selected]
    if (!src) return
    const { radius, background, color } = src
    setOverrides((prev) => {
      const next = { ...prev }
      for (const item of [...TEXT_SIZES, ...ICON_SIZES]) {
        const k = keyFor(item.key)
        const base = prev[k] ?? src
        next[k] = { ...base, radius, background, color }
      }
      return next
    })
  }

  const styleFor = (size: string) => {
    const o = overrides[keyFor(size)]
    if (!o) return undefined
    return {
      borderRadius: o.radius,
      backgroundColor: o.background,
      color: o.color,
    }
  }

  const iconStyleFor = (size: string) => {
    const o = overrides[keyFor(size)]
    if (!o) return undefined
    // Also override the button's max-w/max-h svg clamp so the icon can grow.
    return {
      width: o.iconSize,
      height: o.iconSize,
      maxWidth: o.iconSize,
      maxHeight: o.iconSize,
    }
  }

  const renderRow = (heading: string, sizes: SizeItem[]) => (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {heading}
      </span>
      <div className="flex flex-wrap items-end justify-center gap-4">
        {sizes.map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-2">
            <Button
              ref={(el) => {
                refs.current[item.key] = el
              }}
              variant={variant as never}
              size={item.size as never}
              style={styleFor(item.key)}
              onClick={() => selectButton(item.key)}
              className={
                selected === keyFor(item.key)
                  ? "ring-2 ring-ring ring-offset-2 ring-offset-background"
                  : undefined
              }
            >
              {item.icon ? <Star style={iconStyleFor(item.key)} /> : "Button"}
            </Button>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const current = selected ? overrides[selected] : null

  // Group the changed values per variant into the theme preset the install
  // command encodes. Each variant's edits install as a scoped rule.
  const presetPayload = (() => {
    const out: Record<
      string,
      { bg?: string; fg?: string; radius?: number }
    > = {}
    for (const key of Object.keys(overrides)) {
      const o = overrides[key]
      const init = initials.current[key]
      if (!init) continue
      const variantKey = key.split(":")[0]
      const theme = out[variantKey] ?? (out[variantKey] = {})
      if (o.background !== init.background) theme.bg = o.background
      if (o.color !== init.color) theme.fg = o.color
      if (o.radius !== init.radius) theme.radius = Math.round(o.radius)
    }
    for (const v of Object.keys(out)) {
      if (Object.keys(out[v]).length === 0) delete out[v]
    }
    return out
  })()

  const hasPreset = Object.keys(presetPayload).length > 0
  const installCommand = hasPreset
    ? `npx shadcn@latest add "${REGISTRY_URL}?preset=${encodePreset(presetPayload)}"`
    : `npx shadcn@latest add ${REGISTRY_URL}`

  const copySnippet = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex h-full min-h-0 w-full">
      {/* Center — live component preview */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-12 overflow-auto p-10">
          {renderRow("Text", TEXT_SIZES)}
          {renderRow("Icon only", ICON_SIZES)}
        </div>
      </div>

      {/* Right — props panel */}
      <aside className="scrollbar-hide m-4 flex w-72 shrink-0 flex-col overflow-y-auto rounded-3xl bg-card shadow-default">
        <div className="flex flex-col gap-5 px-4 py-5">
          {/* Variant — applies to every button */}
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-medium text-foreground">Variant</span>
            <div className="flex flex-wrap gap-1.5">
              {VARIANTS.map((option) => (
                <Button
                  key={option.value}
                  variant={variant === option.value ? "default" : "secondary"}
                  size="xs"
                  onClick={() => {
                    setVariant(option.value)
                    setSelected(null)
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {current ? (
            <>
              <span className="text-xs text-muted-foreground">
                Editing{" "}
                <span className="text-foreground">
                  {variant} · {selected?.split(":")[1]}
                </span>
              </span>

              <SliderControl
                label="Border radius"
                value={current.radius}
                min={0}
                max={40}
                onChange={(v) => setField("radius", v)}
              />

              <ColorControl
                label="Background"
                value={current.background}
                onChange={(v) => setField("background", v)}
              />
              <ColorControl
                label="Text color"
                value={current.color}
                onChange={(v) => setField("color", v)}
              />
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Select a button to edit its properties.
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-border px-4 py-4">
          <Button
            variant="secondary"
            size="default"
            className="w-full"
            disabled={!selected}
            onClick={applyToAll}
          >
            Apply to all buttons
          </Button>
          <Button
            variant="outline"
            size="default"
            className="w-full"
            disabled={!selected}
            onClick={() => setShowProps(true)}
          >
            Show properties
          </Button>
          <Button
            variant="default"
            size="default"
            className="w-full"
            onClick={reset}
          >
            Reset
          </Button>
        </div>
      </aside>

      <Dialog open={showProps} onOpenChange={setShowProps}>
        <DialogContent size="default">
          <DialogHeader>
            <DialogTitle>Install with your theme</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Run this command to add the button with the background, text color
            and radius you picked — scoped per variant in your globals.css.
          </p>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2"
              onClick={copySnippet}
              aria-label="Copy"
            >
              {copied ? <Check /> : <Copy />}
            </Button>
            <pre className="overflow-x-auto rounded-xl bg-muted p-4 pr-12 font-mono text-sm leading-relaxed">
              <code className="break-all whitespace-pre-wrap">
                <span className="text-muted-foreground select-none">$ </span>
                {installCommand}
              </code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function SliderControl({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground tabular-nums">
          {Math.round(value)}px
        </span>
      </div>
      <Slider
        size="sm"
        min={min}
        max={max}
        value={[value]}
        onValueChange={(v) => onChange(Array.isArray(v) ? (v[0] ?? 0) : v)}
      />
    </div>
  )
}

function ColorControl({
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
      <span className="text-sm font-medium text-foreground">{label}</span>
      <ColorPicker value={value} onValueChange={onChange} format="hex">
        <ColorPickerTrigger className="flex h-7 min-w-24 justify-between gap-2 px-2">
          <ColorPickerSwatch className="size-4" />
          <span className="text-xs tabular-nums">{value}</span>
        </ColorPickerTrigger>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHueSlider />
          <ColorPickerInput withoutAlpha className="flex-1" />
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}
