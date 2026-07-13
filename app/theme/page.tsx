"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, Shuffle as ShuffleIcon } from "lucide-react"
import { Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
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
/*  A floating control sidebar + a live preview canvas. Editing the primary   */
/*  color and radius updates them live and writes to app/globals.css, so all  */
/*  the preview components re-theme in place. "Get Code" produces an install  */
/*  command that carries the current theme as a preset.                       */
/* -------------------------------------------------------------------------- */

const RADIUS_OPTIONS = [
  { label: "None", value: "0px" },
  { label: "Small", value: "4px" },
  { label: "Medium", value: "6px" },
  { label: "Default", value: "0.625rem" },
  { label: "Large", value: "14px" },
]

const SWATCHES = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "muted",
  "accent",
  "border",
  "destructive",
]

const THEME_REGISTRY_URL = "https://espresso-base-ui.vercel.app/r/theme.json"

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

function randomHex(): string {
  const h = Math.floor(
    // deterministic-enough spread without Math.random (blocked): derive from time
    (typeof performance !== "undefined" ? performance.now() : 1) * 997
  )
  const n = (h % 0xffffff).toString(16).padStart(6, "0")
  return `#${n}`
}

export default function ThemePage() {
  const [primary, setPrimary] = useState<string | null>(null)
  const [radius, setRadius] = useState("0.625rem")
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [calDate, setCalDate] = useState<Date | undefined>(undefined)
  // The Calendar formats dates with the runtime locale, which differs between
  // server and client — render it only after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPrimary(resolveVarToHex("--primary"))
    setMounted(true)
  }, [])

  const applyLive = (next: { primary?: string; radius?: string }) => {
    const root = document.documentElement
    if (next.primary) root.style.setProperty("--primary", next.primary)
    if (next.radius) root.style.setProperty("--radius", next.radius)
  }

  const onColorChange = (hex: string) => {
    setPrimary(hex)
    applyLive({ primary: hex })
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => updateThemeVars({ primary: hex }), 400)
  }

  const onRadiusChange = (value: string) => {
    setRadius(value)
    applyLive({ radius: value })
    updateThemeVars({ radius: value })
  }

  const shuffle = () => onColorChange(randomHex())

  const installCommand = `npx shadcn@latest add "${THEME_REGISTRY_URL}?preset=${encodePreset(
    { primary: primary ?? undefined, radius }
  )}"`

  const copyCommand = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Frosted blur in the space around the floating sidebar — content
          scrolling behind is blurred, fading out toward the cards. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-10 w-[19rem] bg-background/70 backdrop-blur-sm [mask-image:linear-gradient(to_right,black_0%,black_82%,transparent_100%)]"
      />

      {/* Control sidebar — solid, floating over the canvas */}
      <aside className="fixed inset-y-4 left-4 z-20 flex w-64 flex-col gap-3 overflow-y-auto rounded-2xl border border-neutral-700/60 bg-neutral-800 p-3 text-neutral-100 shadow-2xl">
        {/* Theme color — functional: drives --primary */}
        <div className="flex flex-col gap-1.5">
          <span className="px-1 text-xs font-bold text-neutral-300">Theme</span>
          <ColorPicker
            value={primary ?? "#171717"}
            onValueChange={onColorChange}
            format="hex"
          >
            <ColorPickerTrigger className="flex h-11 w-full! min-w-0 items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 px-3 text-sm transition-colors hover:bg-neutral-800">
              <span className="flex items-center gap-2.5">
                <ColorPickerSwatch className="size-5 rounded-md ring-1 ring-white/10" />
                <span className="font-medium tabular-nums text-neutral-100">
                  {primary ?? "…"}
                </span>
              </span>
              <span className="text-neutral-500">Aa</span>
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <ColorPickerHueSlider />
              <ColorPickerInput withoutAlpha className="flex-1" />
            </ColorPickerContent>
          </ColorPicker>
        </div>

        {/* Radius — functional: drives --radius */}
        <div className="flex flex-col gap-1.5">
          <span className="px-1 text-xs font-bold text-neutral-300">Radius</span>
          <Select value={radius} onValueChange={(v) => v && onRadiusChange(v)}>
            <SelectTrigger className="h-11 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-800">
              <SelectValue>
                {(value) =>
                  RADIUS_OPTIONS.find((o) => o.value === value)?.label ??
                  "Default"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {RADIUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Button variant="secondary" size="sm" className="w-full justify-center bg-neutral-900 text-neutral-200 hover:bg-neutral-800" onClick={() => setShowCode(true)}>
            --preset current
          </Button>
          <Button variant="secondary" size="sm" className="w-full justify-center bg-neutral-900 text-neutral-200 hover:bg-neutral-800" onClick={() => setShowCode(true)}>
            Open Preset
          </Button>
          <Button variant="secondary" size="sm" className="w-full justify-center gap-2 bg-neutral-900 text-neutral-200 hover:bg-neutral-800" onClick={shuffle}>
            <ShuffleIcon className="size-3.5" /> Shuffle
          </Button>
          <Button size="lg" className="w-full justify-center bg-neutral-100 text-neutral-900 hover:bg-white" onClick={() => setShowCode(true)}>
            Get Code
          </Button>
        </div>
      </aside>

      {/* Preview canvas — scrolls both axes, passing behind the sidebar */}
      {/* Preview canvas — scrolls both axes, passing behind the sidebar */}
      <main className="absolute inset-0 z-0 overflow-auto bg-muted/40">
        <div className="ml-[19.5rem] w-[128rem] columns-6 gap-6 py-6 pr-6 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {/* Contribution History */}
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
              <CardDescription>Last 6 months of activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-end gap-2">
                {[45, 70, 55, 90, 40, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-md bg-primary/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col gap-3">
                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted p-3">
                    <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Upcoming</p>
                    <p className="text-base font-semibold text-foreground">May 25, 2024</p>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Auto-save</p>
                    <p className="text-base font-semibold text-foreground">Accelerated</p>
                  </div>
                </div>
                <Button>View Full Report</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Payout Threshold */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Threshold</CardTitle>
              <CardDescription>Set the minimum balance before a payout is triggered.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 [&_button]:w-full">
                  <span className="text-sm font-medium">Preferred Currency</span>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD — United States Dollar</SelectItem>
                      <SelectItem value="eur">EUR — Euro</SelectItem>
                      <SelectItem value="gbp">GBP — Pound Sterling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Minimum Payout</span>
                  <span className="text-xl font-semibold">$2500.00</span>
                </div>
                <Slider defaultValue={[25]} />
                <Textarea placeholder="Add any notes for this payout configuration…" />
                <Button>Save Threshold</Button>
              </div>
            </CardContent>
          </Card>

          {/* Savings Targets */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Targets</CardTitle>
              <CardDescription>Active milestones for 2024</CardDescription>
              <CardAction>
                <Badge variant="outline">New Goal</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <TargetRow label="Retirement" amount="$420,000" pct={65} sub="$273,000" />
                <TargetRow label="Real Estate" amount="$85,000" pct={32} sub="$27,200" />
              </div>
            </CardContent>
          </Card>

          {/* Component showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>Buttons, inputs and controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Button</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <Input placeholder="Name" />
                <Textarea placeholder="Message" />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Subscribe</label>
                  <label className="flex items-center gap-2 text-sm"><Switch defaultChecked /> Enabled</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Color tokens</CardTitle>
              <CardDescription>Driven by your theme variables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {SWATCHES.map((token) => (
                  <div key={token} className="flex flex-col items-center gap-1.5">
                    <div className="h-10 w-full rounded-lg border border-border" style={{ background: `var(--${token})` }} />
                    <span className="text-[10px] text-muted-foreground">--{token}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardDescription>Inter</CardDescription>
              <CardTitle>Designing with rhythm and hierarchy.</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p>A strong body style keeps long-form content readable and balances the visual weight of headings.</p>
                <p>Thoughtful spacing and cadence help paragraphs scan quickly without feeling dense.</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid w-full">
                <Button variant="outline">Share Feedback</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <TxRow name="Blue Bottle Coffee" cat="Food & Drink" when="Today" amount="-$6.50" />
                <TxRow name="Whole Foods Market" cat="Groceries" when="Yesterday" amount="-$142.30" />
                <TxRow name="Stripe Payout" cat="Income" when="Oct 12" amount="+$4,200.00" positive />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {[
                  ["Transaction alerts", "Deposits, withdrawals, and transfers.", true],
                  ["Security alerts", "Login attempts and account changes.", true],
                  ["Goal milestones", "Updates at 25%, 50%, 75%, and 100%.", false],
                  ["Market updates", "Daily portfolio summary and price alerts.", false],
                ].map(([t, d, on]) => (
                  <label key={t as string} className="flex items-start gap-3">
                    <Checkbox defaultChecked={on as boolean} />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{t}</span>
                      <span className="text-xs text-muted-foreground">{d}</span>
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buy Investment */}
          <Card>
            <CardHeader>
              <CardTitle>Buy Investment</CardTitle>
              <CardDescription>Amount to invest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Input defaultValue="$ 1,000.00" />
                <div className="flex flex-col gap-1.5 [&_button]:w-full">
                  <span className="text-sm font-medium">Order Type</span>
                  <Select defaultValue="market">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="stop">Stop Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Shares</span>
                  <span className="font-medium text-foreground">12.4</span>
                </div>
                <Button>Review Order</Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Switch between views</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList size="sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  A quick summary of activity across all accounts this month.
                </TabsContent>
                <TabsContent value="analytics">
                  Trends, breakdowns and comparisons over time.
                </TabsContent>
                <TabsContent value="reports">
                  Exportable statements and scheduled reports.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Delivery method — radio */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery method</CardTitle>
              <CardDescription>How should we send it?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="standard">
                {[
                  ["standard", "Standard", "3–5 business days"],
                  ["express", "Express", "1–2 business days"],
                  ["pickup", "Pickup", "Collect in store"],
                ].map(([v, t, d]) => (
                  <label key={v} className="flex items-center gap-3">
                    <RadioGroupItem value={v} />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{t}</span>
                      <span className="text-xs text-muted-foreground">{d}</span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Alert */}
          <Card>
            <CardContent>
              <Alert>
                <Info />
                <AlertTitle>Your trial ends soon!</AlertTitle>
                <AlertDescription>
                  Upgrade to keep enjoying all features without interruption.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Production · 3 variables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {[
                  ["DATABASE_URL", "••••••••"],
                  ["NEXT_PUBLIC_API", "https://api.example.com"],
                  ["STRIPE_SECRET", "••••••••"],
                ].map(([k, val]) => (
                  <div key={k} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
                    <span className="shrink-0 font-mono text-xs font-medium text-foreground">{k}</span>
                    <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-end gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button size="sm">Deploy</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Traffic channels */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic channels</CardTitle>
              <CardDescription>Desktop and mobile, last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex h-32 items-end justify-between gap-2">
                  {[
                    ["Jan", 70, 40],
                    ["Feb", 95, 55],
                    ["Mar", 60, 42],
                    ["Apr", 82, 50],
                    ["May", 90, 60],
                    ["Jun", 74, 46],
                  ].map(([m, d, mo]) => (
                    <div key={m as string} className="flex flex-1 flex-col items-center gap-1.5">
                      <div className="flex items-end justify-center gap-1">
                        <div className="w-2.5 rounded-t bg-primary" style={{ height: (d as number) * 1.1 }} />
                        <div className="w-2.5 rounded-t bg-primary/40" style={{ height: (mo as number) * 1.1 }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <Legend label="Desktop" className="bg-primary" />
                  <Legend label="Mobile" className="bg-primary/40" />
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                  {[
                    ["Desktop", "1,224"],
                    ["Mobile", "860"],
                    ["Mix delta", "+42%"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col">
                      <span className="text-[10px] tracking-wide text-muted-foreground uppercase">{label}</span>
                      <span className="text-sm font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid w-full">
                <Button>View report</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Browser share — donut */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Share</CardTitle>
              <CardDescription>January – June</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div
                  className="relative size-28 rounded-full"
                  style={{
                    background:
                      "conic-gradient(var(--primary) 0 55%, color-mix(in oklch, var(--primary), white 55%) 55% 80%, var(--muted) 80% 100%)",
                  }}
                >
                  <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-card">
                    <span className="text-lg font-semibold text-foreground">935</span>
                    <span className="text-[10px] text-muted-foreground">Visitors</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <Legend label="Chrome" className="bg-primary" />
                  <Legend label="Edge" className="bg-primary/60" />
                  <Legend label="Firefox" className="bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Field label="Spotify Artist URL" placeholder="spotify.com/artist/…" />
                <Field label="Instagram Handle" placeholder="@username" />
                <Field label="Website" placeholder="https://yoursite.com" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-end gap-2">
                <Button variant="ghost" size="sm">Discard</Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Select a date to view</CardDescription>
            </CardHeader>
            <CardContent>
              {mounted && (
              <Calendar
                mode="single"
                selected={calDate}
                onSelect={setCalDate}
                className="w-full p-0 shadow-none [--cell-size:2.25rem]"
                classNames={{
                  root: "w-full overflow-visible",
                  months: "relative flex w-full flex-col gap-4 overflow-visible",
                  month: "flex w-full flex-col gap-4 overflow-visible",
                  weekdays: "grid grid-cols-7 justify-items-center gap-0.5",
                  week: "mt-0.5 grid grid-cols-7 justify-items-center gap-0.5 overflow-visible",
                }}
              />
              )}
            </CardContent>
          </Card>

          {/* Data table */}
          <Card>
            <CardHeader>
              <CardTitle>Latest invoices</CardTitle>
              <CardDescription>Recent billing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["INV-001", "Paid", "$250.00"],
                    ["INV-002", "Pending", "$150.00"],
                    ["INV-003", "Paid", "$350.00"],
                  ].map(([id, status, amt]) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>
                        <Badge variant={status === "Paid" ? "default" : "secondary"}>
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell>{amt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>3 members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["AB", "CD", "EF"].map((i) => (
                    <Avatar key={i}>
                      <AvatarFallback>{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm">
                    Invite
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showCode} onOpenChange={setShowCode}>
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

/* --- small preview helpers ---------------------------------------------- */

function Legend({ label, className }: { label: string; className: string }) {
  return (
    <span className="flex items-center gap-2 text-muted-foreground">
      <span className={cn("size-2.5 rounded-sm", className)} />
      {label}
    </span>
  )
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Input placeholder={placeholder} />
    </div>
  )
}

function TargetRow({ label, amount, pct, sub }: { label: string; amount: string; pct: number; sub: string }) {
  return (
    <div className="rounded-xl bg-muted p-4">
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="text-2xl font-semibold text-foreground">{amount}</p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{pct}% achieved</span>
        <span>{sub}</span>
      </div>
    </div>
  )
}

function TxRow({ name, cat, when, amount, positive }: { name: string; cat: string; when: string; amount: string; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-muted" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{cat}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className={cn("text-sm font-medium", positive ? "text-emerald-600" : "text-foreground")}>{amount}</span>
        <span className="text-xs text-muted-foreground">{when}</span>
      </div>
    </div>
  )
}
