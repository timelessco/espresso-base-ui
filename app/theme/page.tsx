"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"
import { cn } from "@/lib/utils"
import { updateThemeVars } from "./actions"

/* -------------------------------------------------------------------------- */
/*  Theme editor                                                              */
/*                                                                            */
/*  A floating sidebar to set the primary color and the corner radius. Both   */
/*  update live on the page and are written to app/globals.css (--primary /    */
/*  --radius) so the whole app picks them up.                                 */
/* -------------------------------------------------------------------------- */

const RADIUS_OPTIONS = [
  { label: "None", value: "0px" },
  { label: "Small", value: "4px" },
  { label: "Medium", value: "6px" },
  { label: "Default", value: "0.625rem" },
  { label: "Large", value: "14px" },
]

// The shadcn registry URL for the theme preset.
const THEME_REGISTRY_URL = "https://espresso-base-ui.vercel.app/r/theme.json"

// Base64url-encode the theme preset for the `?preset=` install param.
function encodePreset(payload: unknown): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

// Resolve a `var(--token)` to a #rrggbb hex via a probe element + canvas.
function resolveVarToHex(cssVar: string): string {
  const probe = document.createElement("div")
  probe.style.color = `var(${cssVar})`
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color
  probe.remove()
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return "#000000"
  ctx.fillStyle = rgb || "#000000"
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")
}

export default function ThemePage() {
  const [primary, setPrimary] = useState<string | null>(null)
  const [radius, setRadius] = useState("0.625rem")
  const [showPreset, setShowPreset] = useState(false)
  const [copied, setCopied] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Encode the current color + radius into the install command.
  const installCommand = `npx shadcn@latest add "${THEME_REGISTRY_URL}?preset=${encodePreset(
    { primary: primary ?? undefined, radius }
  )}"`

  const copyCommand = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Seed the color control from the current --primary on mount.
  useEffect(() => {
    setPrimary(resolveVarToHex("--primary"))
  }, [])

  // Apply a live preview on the document root (instant, no recompile wait).
  const applyLive = (next: { primary?: string; radius?: string }) => {
    const root = document.documentElement
    if (next.primary) root.style.setProperty("--primary", next.primary)
    if (next.radius) root.style.setProperty("--radius", next.radius)
  }

  const onColorChange = (hex: string) => {
    setPrimary(hex)
    applyLive({ primary: hex })
    // Debounce the file write while dragging the picker.
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      updateThemeVars({ primary: hex })
    }, 400)
  }

  const onRadiusChange = (value: string) => {
    setRadius(value)
    applyLive({ radius: value })
    updateThemeVars({ radius: value })
  }

  return (
    <div className="relative flex min-h-screen w-full bg-muted/40">
      {/* Floating sidebar */}
      <aside className="fixed top-6 left-6 bottom-6 z-10 flex w-72 flex-col gap-6 overflow-y-auto rounded-3xl bg-neutral-900 p-5 text-neutral-100 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Theme</span>
          <span className="text-xs text-neutral-400">globals.css</span>
        </div>

        {/* Background / primary color */}
        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-medium text-neutral-300">
            Background color
          </span>
          <ColorPicker
            value={primary ?? "#171717"}
            onValueChange={onColorChange}
            format="hex"
          >
            <ColorPickerTrigger className="flex h-10 items-center justify-between gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-neutral-100 hover:bg-neutral-700">
              <div className="flex items-center gap-2">
                <ColorPickerSwatch className="size-5 rounded-md" />
                <span className="text-sm tabular-nums">
                  {primary ?? "…"}
                </span>
              </div>
              <span className="text-xs text-neutral-400">--primary</span>
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <ColorPickerHueSlider />
              <ColorPickerInput withoutAlpha className="flex-1" />
            </ColorPickerContent>
          </ColorPicker>
        </div>

        {/* Radius */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-300">Radius</span>
            <span className="text-xs text-neutral-400">--radius</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {RADIUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onRadiusChange(option.value)}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                  radius === option.value
                    ? "border-neutral-100 bg-neutral-100 text-neutral-900"
                    : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <p className="text-xs leading-relaxed text-neutral-500">
            Changes apply live and are saved to{" "}
            <code className="text-neutral-300">app/globals.css</code> (
            <code className="text-neutral-300">--primary</code> and{" "}
            <code className="text-neutral-300">--radius</code>).
          </p>
          <Button
            variant="inverted"
            size="lg"
            className="w-full"
            onClick={() => setShowPreset(true)}
          >
            Preset
          </Button>
        </div>
      </aside>

      {/* Preview */}
      <main className="ml-[22rem] flex flex-1 flex-col gap-8 p-10">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Preview</h1>
          <p className="text-sm text-muted-foreground">
            Components reflect the primary color and radius you pick.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
              <CardDescription>Last 6 months of activity</CardDescription>
            </CardHeader>
            <CardContent className="flex h-28 items-end gap-2">
              {[40, 70, 55, 90, 45, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-md bg-primary/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Full Report</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-save plan</CardTitle>
              <CardDescription>Recurring weekly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-xl bg-muted p-4">
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-lg font-semibold text-foreground">
                  May 25, 2024
                </p>
              </div>
              <Button variant="secondary" className="w-full">
                Create Release
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showPreset} onOpenChange={setShowPreset}>
        <DialogContent size="default">
          <DialogHeader>
            <DialogTitle>Install with your theme</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Run this command to apply the primary color and radius you picked to
            another project&apos;s globals.css.
          </p>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2"
              onClick={copyCommand}
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
