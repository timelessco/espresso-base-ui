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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronsUpDown,
  Search,
  Plus,
  Mail,
  Trash2,
  Ellipsis,
  Settings,
  Paperclip,
  Info,
  CircleCheck,
  CircleX,
  TriangleAlert,
  X,
  FileText,
  FileSpreadsheet,
  Download,
  User,
  Moon,
} from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertHandlers,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { PreviewCard } from "./previews/preview-card"
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

const ELEVATION_SHADOWS = ["sm", "base", "md", "lg", "xl", "2xl"]
const SHADOW_ITEMS = ELEVATION_SHADOWS.map((s) => ({
  label: s,
  value: s,
}))

function ShadowsSection() {
  const [shadow, setShadow] = React.useState("md")
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Shadows</SectionLabel>
      <div className="flex items-stretch gap-3">
        <Select
          items={SHADOW_ITEMS}
          value={shadow}
          onValueChange={(v) => typeof v === "string" && setShadow(v)}
        >
          <SelectTrigger
            variant="subtle"
            size="sm"
            suffix={<ChevronsUpDown />}
            className="w-full flex-1"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false}>
            <SelectGroup>
              {SHADOW_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* live preview of the selected elevation — matches the select height */}
        <div
          className="aspect-square h-full shrink-0 self-stretch rounded-lg border border-border-soft bg-background"
          style={{ boxShadow: `var(--shadow-elevation-${shadow})` }}
        />
      </div>
    </div>
  )
}

// A bordered showcase card with a bottom-left label (component preview grid).
function ButtonPreview() {
  return (
    <div className="h-full overflow-y-auto bg-secondary p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PreviewCard label="Variants">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Danger</Button>
          <Button variant="link">Link</Button>
        </PreviewCard>

        <PreviewCard label="Sizes">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="2xl">2XL</Button>
        </PreviewCard>

        <PreviewCard label="With icons">
          <Button>
            <Search />
            Search
          </Button>
          <Button variant="secondary">
            <Plus />
            Add Member
          </Button>
          <Button variant="outline">
            <Mail />
            Email
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
        </PreviewCard>

        <PreviewCard label="Icon only">
          <Button variant="secondary" size="icon">
            <Ellipsis />
          </Button>
          <Button variant="outline" size="icon">
            <Settings />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 />
          </Button>
        </PreviewCard>

        <PreviewCard label="With file upload">
          <Button>
            <Paperclip />
            Upload File
          </Button>
        </PreviewCard>

        <PreviewCard label="Disabled">
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Danger
          </Button>
        </PreviewCard>
      </div>
    </div>
  )
}

function AlertPreview() {
  return (
    <div className="h-full overflow-y-auto bg-secondary p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PreviewCard label="Variants">
          <div className="flex w-full max-w-md flex-col gap-3">
            <Alert variant="default">
              <Info />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                This is a default informational alert.
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <CircleCheck />
              <AlertTitle>Payment received</AlertTitle>
              <AlertDescription>Your invoice has been paid.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <TriangleAlert />
              <AlertTitle>Storage almost full</AlertTitle>
              <AlertDescription>You have used 90% of space.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <CircleX />
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>Please try again later.</AlertDescription>
            </Alert>
          </div>
        </PreviewCard>

        <PreviewCard label="With actions">
          <div className="flex flex-wrap items-start justify-center gap-3">
            <Alert variant="info" className="w-full max-w-[220px]">
              <Info />
              <AlertTitle>Your trial ends soon!</AlertTitle>
              <AlertDescription>
                Upgrade to keep enjoying features.
              </AlertDescription>
              <AlertHandlers>
                <Button variant="secondary" size="sm" className="w-full">
                  Update now
                </Button>
              </AlertHandlers>
              <AlertAction>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
            <Alert variant="success" className="w-full max-w-[220px]">
              <CircleCheck />
              <AlertTitle>Source added</AlertTitle>
              <AlertDescription>
                Your data source is now connected.
              </AlertDescription>
              <AlertHandlers>
                <Button variant="secondary" size="sm" className="w-full">
                  View changes
                </Button>
              </AlertHandlers>
              <AlertAction>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </PreviewCard>

        <PreviewCard label="Banner">
          <div className="flex w-full max-w-xl flex-col gap-3">
            <Alert type="banner" variant="default">
              <Info />
              <AlertTitle>Your trial ends soon!</AlertTitle>
              <AlertAction>
                <Button variant="ghost" size="sm">
                  Update
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
            <Alert type="banner" variant="success">
              <CircleCheck />
              <AlertTitle>Source successfully added</AlertTitle>
              <AlertAction>
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
            <Alert type="banner" variant="warning">
              <TriangleAlert />
              <AlertTitle>Changes will affect all warehouses</AlertTitle>
              <AlertAction>
                <Button variant="ghost" size="sm">
                  Confirm
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
            <Alert type="banner" variant="destructive">
              <CircleX />
              <AlertTitle>Failed to save changes</AlertTitle>
              <AlertAction>
                <Button variant="ghost" size="sm">
                  Retry
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </PreviewCard>

        <PreviewCard label="Banner with description">
          <Alert type="banner" variant="info" className="w-full max-w-xl">
            <Info />
            <AlertTitle>New Feature Available</AlertTitle>
            <AlertDescription>
              Discover the new feature to enhance your experience.
            </AlertDescription>
            <AlertHandlers>
              <Button variant="secondary" size="sm">
                Learn more
              </Button>
            </AlertHandlers>
            <AlertAction>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
        </PreviewCard>
      </div>
    </div>
  )
}

function AttachmentPreview() {
  return (
    <div className="h-full overflow-y-auto bg-secondary p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PreviewCard label="File">
          <Attachment className="w-full max-w-sm">
            <AttachmentMedia>
              <FileText />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </PreviewCard>

        <PreviewCard label="Image">
          <Attachment className="w-full max-w-sm">
            <AttachmentMedia variant="image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&dpr=2&q=80"
                alt="Cover"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>cover-art.png</AttachmentTitle>
              <AttachmentDescription>PNG · 840 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Download">
                <Download />
              </AttachmentAction>
              <AttachmentAction aria-label="Remove">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </PreviewCard>

        <PreviewCard label="Sizes">
          <div className="flex w-full max-w-sm flex-col gap-3">
            {(["default", "sm", "xs"] as const).map((size) => (
              <Attachment key={size} size={size}>
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>proposal.docx</AttachmentTitle>
                  <AttachmentDescription>size = {size}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove">
                    <X />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </div>
        </PreviewCard>

        <PreviewCard label="States">
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Attachment state="uploading">
              <AttachmentMedia>
                <Spinner />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>report-q3.pdf</AttachmentTitle>
                <AttachmentDescription>Uploading · 62%</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment state="processing">
              <AttachmentMedia>
                <Spinner />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>keynote.mov</AttachmentTitle>
                <AttachmentDescription>Processing…</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment state="error">
              <AttachmentMedia>
                <TriangleAlert />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>archive.zip</AttachmentTitle>
                <AttachmentDescription>Upload failed</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                  <X />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </div>
        </PreviewCard>

        <PreviewCard label="Vertical (media on top)">
          <AttachmentGroup>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&dpr=2&q=80"
                  alt="Headphones"
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>headphones.jpg</AttachmentTitle>
                <AttachmentDescription>JPG · 1.2 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                  <X />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
            <Attachment orientation="vertical">
              <AttachmentMedia>
                <FileSpreadsheet />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>budget.xlsx</AttachmentTitle>
                <AttachmentDescription>XLSX · 320 KB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                  <X />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </AttachmentGroup>
        </PreviewCard>
      </div>
    </div>
  )
}

const AVATAR_SIZES = ["xs", "sm", "default", "lg", "xl", "2xl", "3xl"] as const
const AVATAR_SRC = "https://github.com/shadcn.png"

function AvatarPreview() {
  return (
    <div className="h-full overflow-y-auto bg-secondary p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PreviewCard label="Sizes">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="Fallback">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="Icon">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size}>
              <User className="text-muted-foreground" />
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="Square">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size} variant="square">
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="With badge">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="Badge with icon">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge className="bg-blue-500">
                <Moon />
              </AvatarBadge>
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="Square with badge">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} size={size} variant="square">
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          ))}
        </PreviewCard>

        <PreviewCard label="Group — images">
          <AvatarGroup>
            <Avatar>
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={AVATAR_SRC} alt="User" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </PreviewCard>

        <PreviewCard label="Group — icons">
          <AvatarGroup>
            <Avatar>
              <User className="text-muted-foreground" />
            </Avatar>
            <Avatar>
              <User className="text-muted-foreground" />
            </Avatar>
            <Avatar>
              <User className="text-muted-foreground" />
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
        </PreviewCard>
      </div>
    </div>
  )
}

// Each remaining component has a bespoke block/card-grid preview under
// `./previews/<id>`. Loaded client-only (ssr: false) to avoid Base UI useId
// hydration mismatches across the dynamic boundary.
const lp = (loader: () => Promise<{ default: React.ComponentType }>) =>
  dynamic(loader, { ssr: false })

const PREVIEWS: Record<string, React.ComponentType> = {
  badge: lp(() => import("./previews/badge")),
  breadcrumb: lp(() => import("./previews/breadcrumb")),
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
  const setActive = React.useCallback(
    (id: string) => router.push(`/customise/${id}`),
    [router]
  )
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

  // Scoped CSS: only tokens that differ from the theme default are overridden,
  // split into light and `.dark [data-preview-scope]` rules.
  const previewCss = React.useMemo(() => {
    const fontVars = Object.entries(TEXT_TOKENS)
      .map(
        ([name, base]) => `--text-${name}:${(base * fontScale).toFixed(4)}rem;`
      )
      .join("")
    const leadingVars = [
      ...Object.entries(LEADING_TOKENS).map(
        ([name, base]) => `--leading-${name}:${(base * lineScale).toFixed(4)};`
      ),
      ...Object.entries(TEXT_LEADING_TOKENS).map(
        ([name, base]) =>
          `--text-${name}--line-height:${(base * lineScale).toFixed(4)};`
      ),
    ].join("")
    const trackingVars = Object.entries(TRACKING_TOKENS)
      .map(
        ([name, base]) =>
          `--tracking-${name}:${(base + letterSpacing).toFixed(4)}em;`
      )
      .join("")
    const shared = `--radius:${radius}px;--spacing:${(SPACING_BASE * spacingScale).toFixed(4)}rem;${fontVars}${leadingVars}${trackingVars}`

    const light: string[] = []
    const dark: string[] = []
    for (const token of ALL_COLOR_TOKENS) {
      const pair = colors[token]
      const def = themeDefaults[token]
      if (!pair || !def) continue
      if (pair.light.toLowerCase() !== def.light.toLowerCase())
        light.push(`--${token}:${pair.light};`)
      if (pair.dark.toLowerCase() !== def.dark.toLowerCase())
        dark.push(`--${token}:${pair.dark};`)
    }
    return (
      `[data-preview-scope]{${shared}${light.join("")}}` +
      (dark.length ? `.dark [data-preview-scope]{${dark.join("")}}` : "")
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
    <div className="flex h-screen w-full overflow-hidden bg-secondary">
      {/* Scoped token overrides (light + dark) for the preview only */}
      <style dangerouslySetInnerHTML={{ __html: previewCss }} />

      {/* Left rail + hover flyout navigation */}
      <PreviewRail active={active} onSelect={setActive} />

      {/* Preview — CSS var overrides cascade in; `transform-gpu` makes this the
          containing block so the CRM's fixed sidebar aligns to it, not the viewport */}
      <div
        data-preview-scope
        className="min-w-0 flex-1 transform-gpu overflow-hidden bg-background"
      >
        {active === "crm" ? (
          <CrmPage />
        ) : active === "button" ? (
          <ButtonPreview />
        ) : active === "alert" ? (
          <AlertPreview />
        ) : active === "attachment" ? (
          <AttachmentPreview />
        ) : active === "avatar" ? (
          <AvatarPreview />
        ) : PREVIEWS[active] ? (
          React.createElement(PREVIEWS[active])
        ) : (
          <PreviewPlaceholder label={activeLabel} />
        )}
      </div>

      {/* Customiser panel — floating card */}
      <aside className="m-3 flex w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-border-soft bg-background shadow-elevation-xl">
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
              <ShadowsSection />
            </div>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  )
}
