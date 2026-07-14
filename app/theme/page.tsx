"use client"

import { useEffect, useState } from "react"
import {
  type LucideIcon,
  Activity,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Bell,
  BookText,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Copy,
  CreditCard,
  FileText,
  Gauge,
  HelpCircle,
  Inbox,
  Info,
  LayoutDashboard,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Palette,
  PieChart,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  Settings,
  Share,
  Shield,
  Shuffle as ShuffleIcon,
  Sun,
  Target,
  Thermometer,
  Timer,
  Trash2,
  TrendingUp,
  User,
  Volume2,
  Wallet,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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

// Named theme colors pulled from the CSS color scales, with a light (:root) and
// dark (.dark) `--primary` / `--primary-foreground` each. Vivid colors get a
// 600/500 primary with white text; neutrals invert (900 light / 50 dark).
const WHITE = "#ffffff"
const VIVID = [
  "red", "orange", "amber", "yellow", "lime", "green", "teal",
  "cyan", "sky", "blue", "violet", "purple", "pink", "rose",
]
const NEUTRALS = ["slate", "gray", "zinc", "neutral", "stone"]

type ThemeColor = {
  name: string
  swatch: string
  light: string
  dark: string
  lightFg: string
  darkFg: string
}

const THEME_COLORS: ThemeColor[] = [
  ...VIVID.map((c) => ({
    name: c,
    swatch: `var(--color-${c}-500)`,
    light: `var(--color-${c}-600)`,
    dark: `var(--color-${c}-500)`,
    lightFg: WHITE,
    darkFg: WHITE,
  })),
  ...NEUTRALS.map((c) => ({
    name: c,
    swatch: `var(--color-${c}-500)`,
    light: `var(--color-${c}-900)`,
    dark: `var(--color-${c}-50)`,
    lightFg: WHITE,
    darkFg: `var(--color-${c}-900)`,
  })),
].sort((a, b) => a.name.localeCompare(b.name))

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

type NavItem = { icon: LucideIcon; label: string; active?: boolean }
type NavGroupData = { title: string; items: NavItem[] }

const NAV: NavGroupData[] = [
  {
    title: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", active: true },
      { icon: ArrowLeftRight, label: "Transactions" },
      { icon: TrendingUp, label: "Investments" },
      { icon: Wallet, label: "Accounts" },
      { icon: PieChart, label: "Spending" },
    ],
  },
  {
    title: "Planning",
    items: [
      { icon: Target, label: "Goals" },
      { icon: Receipt, label: "Budget" },
      { icon: FileText, label: "Reports" },
      { icon: BookText, label: "Documents" },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile" },
      { icon: CreditCard, label: "Billing", active: true },
      { icon: Bell, label: "Notifications" },
      { icon: Shield, label: "Security" },
      { icon: Palette, label: "Appearance" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center" },
      { icon: MessageSquare, label: "Contact Us" },
      { icon: FileText, label: "Documentation" },
      { icon: Activity, label: "Status" },
    ],
  },
]

function NavGroup({ group }: { group: NavGroupData }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {group.title}
      </span>
      {group.items.map(({ icon: Icon, label, active }) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm",
            active
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          <Icon className="size-4" />
          {label}
        </div>
      ))}
    </div>
  )
}

const THEME_REGISTRY_URL = "https://espresso-base-ui.vercel.app/r/theme.json"

function encodePreset(payload: unknown): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export default function ThemePage() {
  const [themeColor, setThemeColor] = useState("neutral")
  const [radius, setRadius] = useState("0.625rem")
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [calDate, setCalDate] = useState<Date | undefined>(undefined)
  // The Calendar formats dates with the runtime locale, which differs between
  // server and client — render it only after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply a color: live-preview the current mode's values on the root, and save
  // both light and dark values to globals.css.
  const applyTheme = (name: string) => {
    const c = THEME_COLORS.find((x) => x.name === name)
    if (!c) return
    setThemeColor(name)
    const root = document.documentElement
    const isDark = root.classList.contains("dark")
    root.style.setProperty("--primary", isDark ? c.dark : c.light)
    root.style.setProperty("--primary-foreground", isDark ? c.darkFg : c.lightFg)
    updateThemeVars({
      primaryLight: c.light,
      primaryDark: c.dark,
      primaryFgLight: c.lightFg,
      primaryFgDark: c.darkFg,
    })
  }

  const onRadiusChange = (value: string) => {
    setRadius(value)
    document.documentElement.style.setProperty("--radius", value)
    updateThemeVars({ radius: value })
  }

  const shuffle = () => {
    const idx =
      Math.floor(
        (typeof performance !== "undefined" ? performance.now() : 1) * 997
      ) % THEME_COLORS.length
    applyTheme(THEME_COLORS[idx].name)
  }

  const current =
    THEME_COLORS.find((c) => c.name === themeColor) ?? THEME_COLORS[0]

  const installCommand = `npx shadcn@latest add "${THEME_REGISTRY_URL}?preset=${encodePreset(
    { primary: current.light, primaryDark: current.dark, radius }
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
        {/* Theme color — functional: drives --primary (light + dark) */}
        <div className="flex flex-col gap-1.5">
          <span className="px-1 text-xs font-bold text-neutral-300">Theme</span>
          <Select value={themeColor} onValueChange={(v) => v && applyTheme(v)}>
            <SelectTrigger className="h-11 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-800">
              <span className="flex items-center gap-2">
                <span
                  className="size-4 rounded-full ring-1 ring-white/15"
                  style={{ background: current.swatch }}
                />
                {cap(themeColor)}
              </span>
            </SelectTrigger>
            <SelectContent>
              {THEME_COLORS.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  <span className="flex items-center gap-2">
                    <span
                      className="size-3.5 rounded-full ring-1 ring-black/10"
                      style={{ background: c.swatch }}
                    />
                    {cap(c.name)}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  <TabsIndicator />
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

          {/* Navigation */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <NavGroup group={NAV[0]} />
                  <NavGroup group={NAV[1]} />
                </div>
                <div className="flex flex-col gap-4">
                  <NavGroup group={NAV[2]} />
                  <NavGroup group={NAV[3]} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments — breadcrumb + settings list */}
          <Card>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Payments</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col gap-2">
                  {[
                    [Gauge, "Change transfer limit", "Adjust how much you can send from your balance."],
                    [CalendarDays, "Scheduled transfers", "Set up a transfer to send at a later date."],
                    [ArrowLeftRight, "Direct Debits", "Set up and manage regular payments."],
                  ].map(([Icon, title, desc]) => (
                    <div key={title as string} className="flex items-start gap-3 rounded-xl bg-muted p-3">
                      {(() => {
                        const I = Icon as typeof Gauge
                        return <I className="mt-0.5 size-4 text-muted-foreground" />
                      })()}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{title as string}</span>
                        <span className="text-xs text-muted-foreground">{desc as string}</span>
                      </div>
                      <ChevronRight className="mt-0.5 ml-auto size-4 shrink-0 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Funds */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Funds</CardTitle>
              <CardDescription>Move money between your connected accounts.</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm">
                  <Plus className="rotate-45" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Amount to Transfer</span>
                  <Input defaultValue="$ 1,200.00" />
                </div>
                <div className="flex flex-col gap-1.5 [&_button]:w-full">
                  <span className="text-sm font-medium">From Account</span>
                  <Select defaultValue="checking">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Main Checking (··8402) — $12,450.00</SelectItem>
                      <SelectItem value="savings">High Yield Savings (··1192) — $42,100.00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5 [&_button]:w-full">
                  <span className="text-sm font-medium">To Account</span>
                  <Select defaultValue="savings">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">High Yield Savings (··1192) — $42,100.00</SelectItem>
                      <SelectItem value="checking">Main Checking (··8402) — $12,450.00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 rounded-xl bg-muted p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated arrival</span>
                    <span className="font-medium text-foreground">Today, Apr 14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction fee</span>
                    <span className="font-medium text-foreground">$0.00</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-medium text-foreground">Total amount</span>
                    <span className="font-semibold text-foreground">$1,200.00</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid w-full">
                <Button>Confirm Transfer</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Balance + Yearly activity */}
          <Card>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-foreground">US$12.94</span>
                    <span className="text-xs text-muted-foreground">US$11,337.06 Available</span>
                  </div>
                  <Button variant="outline" size="sm">Pay Early</Button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Yearly Activity</span>
                    <Badge variant="secondary">+US$0.25 Daily Cash</Badge>
                  </div>
                  <div className="flex h-20 items-end justify-between gap-1">
                    {[50, 65, 45, 70, 55, 60, 48, 62, 58, 72, 52, 90].map((h, i) => (
                      <div key={i} className="w-full rounded-sm bg-primary/80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                      <span key={i} className="w-full text-center">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kitchen Island — control panel */}
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Island</CardTitle>
              <CardDescription>Hue Color Ambient</CardDescription>
              <CardAction>
                <Switch defaultChecked />
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Cooking</Button>
                  <Button size="sm" variant="outline">Dining</Button>
                  <Button size="sm" variant="outline">Nightlight</Button>
                  <Button size="sm" variant="outline">Focus</Button>
                </div>
                {[
                  [Sun, "Brightness", 80],
                  [Thermometer, "Color Temp", 60],
                  [Volume2, "Volume", 40],
                  [Timer, "Fade", 10],
                ].map(([Icon, label, val]) => (
                  <div key={label as string} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    {(() => {
                      const I = Icon as typeof Sun
                      return <I className="size-4 text-muted-foreground" />
                    })()}
                    <span className="text-sm text-foreground">{label as string}</span>
                    <div className="ml-auto w-28">
                      <Slider defaultValue={[val as number]} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Holdings */}
          <Card>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Input placeholder="Search holdings or tickers..." />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Stocks</Button>
                    <Button variant="outline" size="sm">ETFs</Button>
                    <Button variant="outline" size="sm">REITs</Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    ["VOO", "Vanguard S&P 500 ETF", "112 SHARES · JAN 2021", "ETF", "$48,230.40"],
                    ["VIG", "Vanguard Dividend Appreciation", "450 SHARES · MAR 2022", "ETF", "$26,033.79"],
                    ["AAPL", "Apple Inc.", "85 SHARES · NOV 2020", "Stock", "$18,488.90"],
                    ["O", "Realty Income Corp", "320 SHARES · JUN 2023", "REIT", "$15,136.59"],
                  ].map(([ticker, name, meta, type, value]) => (
                    <div key={ticker} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-[11px] font-bold text-foreground">{ticker}</div>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">{name}</span>
                        <span className="text-[11px] text-muted-foreground">{meta}</span>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <Badge variant="secondary">{type}</Badge>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] tracking-wide text-muted-foreground uppercase">Value</span>
                          <span className="text-sm font-semibold text-foreground">{value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connect Bank — empty state */}
          <Card>
            <CardContent>
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                  <CreditCard className="size-5 text-foreground" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-foreground">Connect Bank</span>
                  <p className="text-sm text-muted-foreground">Link your payout method to receive monthly royalty distributions automatically.</p>
                </div>
                <Button>Set Up Payouts</Button>
              </div>
            </CardContent>
          </Card>

          {/* Icon buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Icon buttons</CardTitle>
              <CardDescription>Outline icon actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                {[Copy, CircleAlert, Trash2, Share, Inbox, MoreHorizontal, RefreshCw, Plus, Minus, ArrowLeft, ArrowRight, Check, ChevronDown, ChevronRight, Search, Settings].map((Icon, i) => (
                  <Button key={i} variant="outline" size="icon">
                    <Icon />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invite Members — dashed empty state */}
          <Card>
            <CardContent>
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-8 text-center">
                <div className="flex -space-x-2">
                  {["AB", "CD", "EF"].map((i) => (
                    <Avatar key={i}>
                      <AvatarFallback>{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-foreground">No Team Members</span>
                  <p className="text-sm text-muted-foreground">Invite your team to collaborate on this project.</p>
                </div>
                <Button>Invite Members</Button>
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
