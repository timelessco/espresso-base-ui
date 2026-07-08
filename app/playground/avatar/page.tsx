"use client"

import { useRef, useState } from "react"
import { Check, Copy, User } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
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
/*  Avatar playground                                                          */
/*                                                                            */
/*  Click any avatar in the preview to select it, then tweak its size, icon    */
/*  size, background and icon color from the right sidebar. Each avatar keeps   */
/*  its own overrides.                                                          */
/* -------------------------------------------------------------------------- */

type Overrides = {
  avatarSize: number
  iconSize: number
  background: string
  iconColor: string
}

type AvatarItem = { key: string; size: string; variant: string; label: string }

const SIZES = ["xs", "sm", "default", "lg", "xl", "2xl", "3xl"]

function makeItems(variant: string): AvatarItem[] {
  return SIZES.map((size) => ({
    key: `${variant}-${size}`,
    size,
    variant,
    label: size,
  }))
}

const CIRCLE_ITEMS = makeItems("circle")
const SQUARE_ITEMS = makeItems("square")

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

export default function AvatarPlaygroundPage() {
  const refs = useRef<Record<string, HTMLSpanElement | null>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [overrides, setOverrides] = useState<Record<string, Overrides>>({})
  // Seeded (unedited) snapshot per avatar, used to detect real changes.
  const initials = useRef<Record<string, Overrides>>({})
  const [showProps, setShowProps] = useState(false)
  const [copied, setCopied] = useState(false)

  const selectAvatar = (key: string) => {
    setSelected(key)
    if (overrides[key]) return
    // Seed controls from the avatar's current computed style on first select.
    const el = refs.current[key]
    if (!el) return
    const cs = getComputedStyle(el)
    const svg = el.querySelector("svg")
    const seed: Overrides = {
      avatarSize: parseFloat(cs.width) || 0,
      iconSize: svg ? parseFloat(getComputedStyle(svg).width) || 16 : 16,
      background: toHex(cs.backgroundColor),
      iconColor: toHex(cs.color),
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
  }

  const styleFor = (key: string) => {
    const o = overrides[key]
    if (!o) return undefined
    return {
      width: o.avatarSize,
      height: o.avatarSize,
      backgroundColor: o.background,
      color: o.iconColor,
    }
  }

  const iconStyleFor = (key: string) => {
    const o = overrides[key]
    if (!o) return undefined
    return { width: o.iconSize, height: o.iconSize }
  }

  const renderRow = (heading: string, items: AvatarItem[]) => (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {heading}
      </span>
      <div className="flex flex-wrap items-end justify-center gap-4">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-2">
            <Avatar
              ref={(el) => {
                refs.current[item.key] = el
              }}
              size={item.size as never}
              variant={item.variant as never}
              style={styleFor(item.key)}
              onClick={() => selectAvatar(item.key)}
              className={
                "cursor-pointer" +
                (selected === item.key
                  ? " ring-2 ring-ring ring-offset-2 ring-offset-background"
                  : "")
              }
            >
              <User style={iconStyleFor(item.key)} />
            </Avatar>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const current = selected ? overrides[selected] : null
  const selectedItem = selected
    ? [...CIRCLE_ITEMS, ...SQUARE_ITEMS].find((s) => s.key === selected)
    : null

  // Compose the edited values into Tailwind arbitrary-value utility classes.
  // Only when the user actually changed a property (not just selected).
  const customClasses =
    current && selected && isEdited(selected)
      ? [
          `size-[${Math.round(current.avatarSize)}px]`,
          `[&>svg]:size-[${Math.round(current.iconSize)}px]`,
          `bg-[${current.background}]`,
          `text-[${current.iconColor}]`,
        ].join(" ")
      : ""

  const attrs: { name: string; value: string }[] = selectedItem
    ? [
        { name: "size", value: selectedItem.size },
        { name: "variant", value: selectedItem.variant },
        ...(customClasses ? [{ name: "className", value: customClasses }] : []),
      ]
    : []

  const snippet = [
    "<Avatar",
    ...attrs.map((a) => `  ${a.name}="${a.value}"`),
    ">",
    "  <User />",
    "</Avatar>",
  ].join("\n")

  const copySnippet = async () => {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex h-full min-h-0 w-full">
      {/* Center — live avatar preview */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-12 overflow-auto p-10">
          {renderRow("Circle", CIRCLE_ITEMS)}
          {renderRow("Square", SQUARE_ITEMS)}
        </div>
      </div>

      {/* Right — floating props panel */}
      <aside className="scrollbar-hide m-4 flex w-72 shrink-0 flex-col overflow-y-auto rounded-3xl border border-border bg-card shadow-default">
        <div className="flex flex-col gap-5 px-4 py-5">
          {current ? (
            <>
              <span className="text-xs text-muted-foreground">
                Editing <span className="text-foreground">{selected}</span>
              </span>

              <SliderControl
                label="Avatar size"
                value={current.avatarSize}
                min={12}
                max={96}
                onChange={(v) => setField("avatarSize", v)}
              />
              <SliderControl
                label="Icon size"
                value={current.iconSize}
                min={6}
                max={64}
                onChange={(v) => setField("iconSize", v)}
              />

              <ColorControl
                label="Background"
                value={current.background}
                onChange={(v) => setField("background", v)}
              />
              <ColorControl
                label="Icon color"
                value={current.iconColor}
                onChange={(v) => setField("iconColor", v)}
              />
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Click an avatar to edit its properties.
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-border px-4 py-4">
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
            <DialogTitle>Avatar properties</DialogTitle>
          </DialogHeader>
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
            <pre className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-sm leading-relaxed">
              <code>
                <div>
                  <span className="text-sky-600 dark:text-sky-400">
                    &lt;Avatar
                  </span>
                </div>
                {attrs.map((a) => (
                  <div key={a.name} className="pl-4 whitespace-pre-wrap">
                    <span className="text-violet-600 dark:text-violet-400">
                      {a.name}
                    </span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &quot;{a.value}&quot;
                    </span>
                  </div>
                ))}
                <div>
                  <span className="text-sky-600 dark:text-sky-400">&gt;</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-600 dark:text-sky-400">
                    &lt;User /&gt;
                  </span>
                </div>
                <div>
                  <span className="text-sky-600 dark:text-sky-400">
                    &lt;/Avatar&gt;
                  </span>
                </div>
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
        <span className="text-sm tabular-nums text-muted-foreground">
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
        <ColorPickerTrigger className="h-7 w-30 min-w-0 gap-2 px-2">
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
