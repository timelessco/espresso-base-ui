"use client"

import { type ReactNode, useEffect, useState } from "react"
import {
  type LucideIcon,
  Activity,
  AppWindow,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Bell,
  BookText,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Cloud,
  Copy,
  CreditCard,
  Diamond,
  FileText,
  Gauge,
  Github,
  HelpCircle,
  Inbox,
  Info,
  Keyboard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  Palette,
  Phone,
  PhoneIncoming,
  PieChart,
  Plus,
  PlusCircle,
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
  UserPlus,
  Users,
  Volume2,
  Wallet,
  X,
} from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertHandlers,
  AlertTitle,
} from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Timeline,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@/components/reui/timeline"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
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
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "sky",
  "blue",
  "violet",
  "purple",
  "pink",
  "rose",
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

// Fixed selected date for the preview calendar (matches the mock: Jul 16, 2026).
const CAL_DEFAULT = new Date(2026, 6, 16)

const TEAM = [
  { img: "https://i.pravatar.cc/80?img=12", fallback: "AB" },
  { img: "https://i.pravatar.cc/80?img=32", fallback: "CD" },
  { img: "https://i.pravatar.cc/80?img=45", fallback: "EF" },
]

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

// Resolve a `var(--token)` to a concrete computed color (oklch/rgb), so the
// exported preset is self-contained and works in any consumer project.
function resolveColor(value: string): string {
  if (typeof document === "undefined" || !value.startsWith("var(")) return value
  const probe = document.createElement("div")
  probe.style.color = value
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()
  return resolved || value
}

export default function ThemePage() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [themeColor, setThemeColor] = useState("neutral")
  const [radius, setRadius] = useState("0.625rem")
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [installCommand, setInstallCommand] = useState("")
  const [calDate, setCalDate] = useState<Date | undefined>(undefined)
  // The Calendar formats dates with the runtime locale, which differs between
  // server and client — render it only after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false)

  // Kitchen Island — Tabs switch the scene, which randomizes the slider values.
  const [kitchenScene, setKitchenScene] = useState("light")
  const [kitchenValues, setKitchenValues] = useState([80, 20, 95, 5])

  const changeKitchenScene = (scene: string) => {
    setKitchenScene(scene)
    setKitchenValues(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
    )
  }

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
    root.style.setProperty(
      "--primary-foreground",
      isDark ? c.darkFg : c.lightFg
    )
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

  // Build the install command from resolved (self-contained) colors. Done on
  // the client because resolveColor reads computed styles from the DOM.
  useEffect(() => {
    if (!mounted) return
    const c = THEME_COLORS.find((x) => x.name === themeColor) ?? THEME_COLORS[0]
    const payload = {
      primary: resolveColor(c.light),
      primaryFg: resolveColor(c.lightFg),
      primaryDark: resolveColor(c.dark),
      primaryFgDark: resolveColor(c.darkFg),
      radius,
    }
    setInstallCommand(
      `npx shadcn@latest add "${THEME_REGISTRY_URL}?preset=${encodePreset(payload)}"`
    )
  }, [mounted, themeColor, radius])

  const copyCommand = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      {/* Control sidebar — standard app sidebar with a header + controls */}
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="group-data-[collapsible=icon]:pl-1.5! md:pl-1.5 data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                    />
                  }
                >
                  <div className="flex aspect-square size-7 items-center justify-center rounded-md">
                    <img src="/images/svg/logo-gameplan.svg" alt="Gameplan" />
                  </div>
                  <div className="grid flex-1 text-left">
                    <span className="truncate pb-0.5 text-base font-medium text-foreground">
                      Gameplan
                    </span>
                    <span className="truncate text-sm font-normal text-muted-foreground">
                      Sally Potter
                    </span>
                  </div>
                  <ChevronDown className="relative right-2 ml-auto" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--anchor-width] min-w-56"
                  align="start"
                  alignOffset={2}
                  sideOffset={4}
                >
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="flex aspect-square size-7 items-center justify-center rounded-md">
                      <img src="/images/svg/logo-gameplan.svg" alt="Gameplan" />
                    </div>
                    <div className="grid text-left">
                      <span className="truncate pb-0.5 text-base font-medium text-foreground">
                        Gameplan
                      </span>
                      <span className="truncate text-sm font-normal text-muted-foreground">
                        Sally Potter
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <AppWindow />
                      App
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem render={<a href="/crm" />}>
                        <div className="flex size-7 items-center justify-center rounded-md text-white">
                          <img src="/images/svg/logo-crm.svg" alt="CRM" />
                        </div>
                        CRM
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/crm-data-grid" />}>
                        <div className="flex size-7 items-center justify-center rounded-md text-white">
                          <img src="/images/svg/logo-crm.svg" alt="CRM" />
                        </div>
                        CRM Data Grid
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/helpdesk" />}>
                        <div className="flex size-7 items-center justify-center rounded-md text-white">
                          <img
                            src="/images/svg/logo-helpDesk.svg"
                            alt="Helpdesk"
                          />
                        </div>
                        Helpdesk
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/drive" />}>
                        <div className="flex size-7 items-center justify-center rounded-md text-white">
                          <img src="/images/svg/logo-drive.svg" alt="Drive" />
                        </div>
                        Drive
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/mail" />}>
                        <div className="flex size-7 items-center justify-center rounded-md text-white">
                          <img src="/images/svg/logo-mail.svg" alt="Mail" />
                        </div>
                        Mail
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/gameplan" />}>
                        <div className="flex size-7 items-center justify-center rounded-md text-white">
                          <img
                            src="/images/svg/logo-gameplan.svg"
                            alt="Gameplan"
                          />
                        </div>
                        Gameplan
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/ui" />}>
                        <div className="flex size-7 items-center justify-center rounded-md bg-[#84B346] text-white">
                          <Boxes className="size-4" />
                        </div>
                        UI
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <User />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                  >
                    {isDark ? <Sun /> : <Moon />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CircleAlert />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="gap-4 p-3">
          {/* Theme color — functional: drives --primary (light + dark) */}
          <div className="flex flex-col gap-1.5">
            <span className="px-1 text-xs font-medium text-muted-foreground">
              Color
            </span>
            <Select
              value={themeColor}
              onValueChange={(v) => v && applyTheme(v)}
            >
              <SelectTrigger className="w-full">
                <span className="flex items-center gap-2">
                  <span
                    className="size-4 rounded-full ring-1 ring-border"
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
                        className="size-3.5 rounded-full ring-1 ring-border"
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
            <span className="px-1 text-xs font-medium text-muted-foreground">
              Radius
            </span>
            <Select
              value={radius}
              onValueChange={(v) => v && onRadiusChange(v)}
            >
              <SelectTrigger className="w-full">
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
        </SidebarContent>

        <SidebarFooter className="gap-2 border-t border-sidebar-border p-3">
          <Button
            variant="outline"
            className="w-full justify-center gap-2"
            onClick={shuffle}
          >
            <ShuffleIcon className="size-3.5" /> Shuffle
          </Button>
          <Button
            className="w-full justify-center"
            onClick={() => setShowCode(true)}
          >
            Open Preset
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Preview canvas — the main pane */}
      <SidebarInset className="min-h-0 min-w-0">
        <main className="min-h-0 w-full min-w-0 flex-1">
          <div className="size-full overflow-auto">
            <div className="flex w-max gap-10 p-6">
              {/* Column 1 */}
              <div className="flex w-[18rem] shrink-0 flex-col gap-10">
                {/* Account row */}
                <Card className="py-2">
                  <CardContent className="px-2.5">
                    <div className="flex items-center gap-3">
                      <Avatar variant="square" size="3xl">
                        <AvatarImage
                          src="https://i.pravatar.cc/96?img=12"
                          alt="sandeep"
                        />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <span className="pb-0.5 text-lg font-medium text-foreground">
                          sandeep@gmail.com
                        </span>
                        <span className="text-base font-normal text-muted-foreground">
                          Keep things in sync with gmail
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Field — radio group (coffee size) */}
                <Card>
                  <CardContent>
                    <FieldSet>
                      <FieldLegend variant="legend">
                        Select coffee size{" "}
                        <span className="text-destructive">*</span>
                      </FieldLegend>
                      <FieldDescription>
                        Select the size of coffee you prefer from the options
                        below.
                      </FieldDescription>
                      <RadioGroup defaultValue="short" className="gap-4">
                        {[
                          ["short", "Short"],
                          ["tall", "Tall"],
                          ["grande", "Grande"],
                          ["venti", "Venti"],
                        ].map(([value, label]) => (
                          <FieldLabel key={value} htmlFor={value}>
                            <RadioGroupItem
                              size="sm"
                              value={value}
                              id={value}
                            />
                            {label}
                          </FieldLabel>
                        ))}
                      </RadioGroup>
                    </FieldSet>
                  </CardContent>
                </Card>

                {/* Current Plan — badge + button */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold text-secondary-foreground">
                        ₹1999
                        <span className="text-base font-normal text-muted-foreground">
                          /mo
                        </span>
                      </span>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        Gamma
                      </Badge>
                    </div>
                    <CardDescription>Expiring in 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <span className="text-sm text-secondary-foreground">
                        Can support
                      </span>
                      <div className="flex flex-col gap-2.5 text-base text-secondary-foreground">
                        {[
                          "Support 5 apps",
                          "Upto 30 concurrent users",
                          "Customizable dashboard",
                        ].map((t) => (
                          <div
                            key={t}
                            className="flex items-center gap-2 text-sm text-foreground"
                          >
                            <CircleCheck className="size-4 text-muted-foreground" />
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex items-center gap-2 text-base text-muted-foreground">
                        <Info className="size-4" />
                        Free trail ends in 7 days
                      </div>
                      <Button className="w-full" size="sm">
                        Upgrage
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* Dropdown menu */}
                <AccountDropdown />

                {/* Dialog */}
                <Dialog>
                  <DialogTrigger
                    className="w-full"
                    render={
                      <Button variant="secondary" className="w-full">
                        Open dialog
                      </Button>
                    }
                  />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog title</DialogTitle>
                      <DialogDescription>
                        A short description of the dialog contents.
                      </DialogDescription>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                      This is the main content of the dialog. You can place any
                      children here.
                    </p>
                  </DialogContent>
                </Dialog>

                {/* Tooltip */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      render={<Button variant="secondary" className="w-full" />}
                    >
                      Hover me
                    </TooltipTrigger>
                    <TooltipContent>
                      Open source by default{" "}
                      <Diamond className="size-3 shrink-0" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Buy Investment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Buy Investment</CardTitle>
                    <CardDescription>Amount to invest</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <Input placeholder="Enter amount" />
                      <div className="flex flex-col gap-1.5 [&_button]:w-full">
                        <span className="text-sm text-muted-foreground">
                          Order Type
                        </span>
                        <Select defaultValue="market">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">market</SelectItem>
                            <SelectItem value="limit">limit</SelectItem>
                            <SelectItem value="stop">stop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Estimated Shares
                        </span>
                        <span className="font-medium text-foreground">12.4</span>
                      </div>
                      <Button>Review Order</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Column 2 */}
              <div className="flex w-[20rem] shrink-0 flex-col gap-10">
                {/* Button variants */}
                <Card>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Subtle</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Field — checkbox group (simple label) */}
                <Card>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <span className="text-sm text-muted-foreground">
                        Send me email notifications for:
                      </span>
                      <FieldGroup>
                        <Field orientation="vertical">
                          <FieldLabel>
                            <Checkbox size="sm" />
                            <FieldContent>
                              <FieldTitle>Activity updates</FieldTitle>
                              <FieldDescription>
                                New tasks assigned to you, @mentions and
                                completion notification for tasks that you
                                assigned to others
                              </FieldDescription>
                            </FieldContent>
                          </FieldLabel>
                        </Field>
                        <Field orientation="vertical">
                          <FieldLabel>
                            <Checkbox size="sm" defaultChecked />
                            <FieldContent>
                              <FieldTitle>Mention only</FieldTitle>
                              <FieldDescription>
                                New tasks assigned to you, direct messages and
                                @mentions
                              </FieldDescription>
                            </FieldContent>
                          </FieldLabel>
                        </Field>
                        <Field orientation="vertical">
                          <FieldLabel>
                            <Checkbox size="sm" defaultChecked />
                            <FieldContent>
                              <FieldTitle>Daily summaries</FieldTitle>
                              <FieldDescription>
                                New tasks assigned to you and upcoming due
                                dates. New discussions and important messages
                              </FieldDescription>
                            </FieldContent>
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </div>
                  </CardContent>
                </Card>

                {/* Details — switch group */}
                <Card>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <FieldGroup>
                        {[
                          { label: "Allow alternative", on: false },
                          { label: "Maintain stock", on: true },
                          { label: "Item variants", on: true },
                          {
                            label: "Item variants",
                            on: false,
                            desc: "If this item has variants, then it cannot be selected in sales orders etc.",
                          },
                          { label: "Fixed Asset", on: false },
                        ].map((item, i) =>
                          item.desc ? (
                            <Field key={i} orientation="vertical">
                              <FieldLabel>
                                <Switch size="sm" defaultChecked={item.on} />
                                <FieldContent>
                                  <FieldTitle>{item.label}</FieldTitle>
                                  <FieldDescription>
                                    {item.desc}
                                  </FieldDescription>
                                </FieldContent>
                              </FieldLabel>
                            </Field>
                          ) : (
                            <FieldLabel key={i}>
                              <Switch size="sm" defaultChecked={item.on} />
                              {item.label}
                            </FieldLabel>
                          )
                        )}
                      </FieldGroup>
                    </div>
                  </CardContent>
                </Card>

                {/* Kitchen Island — tabs randomize the sliders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kitchen Island</CardTitle>
                    <CardDescription>Hue Color Ambient</CardDescription>
                    <CardAction>
                      <Switch />
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <Tabs
                        value={kitchenScene}
                        onValueChange={(v) => v && changeKitchenScene(v)}
                      >
                        <TabsList size="sm" className="w-full">
                          <TabsTrigger value="light" className="flex-1">
                            Light
                          </TabsTrigger>
                          <TabsTrigger value="dark" className="flex-1">
                            Dark
                          </TabsTrigger>
                          <TabsTrigger value="moderate" className="flex-1">
                            Moderate
                          </TabsTrigger>
                          <TabsIndicator />
                        </TabsList>
                      </Tabs>
                      {(
                        [
                          [Sun, "Brightness"],
                          [Thermometer, "Color Temp"],
                          [Volume2, "Volume"],
                          [Timer, "Fade"],
                        ] as const
                      ).map(([Icon, label], i) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 rounded-xl border border-border p-3"
                        >
                          <Icon className="size-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            {label}
                          </span>
                          <div className="ml-auto w-28">
                            <Slider
                              value={[kitchenValues[i]]}
                              onValueChange={(v) => {
                                const next = Array.isArray(v) ? v[0] : v
                                setKitchenValues((prev) =>
                                  prev.map((p, idx) => (idx === i ? next : p))
                                )
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Column 3 */}
              <div className="flex w-[36rem] shrink-0 flex-col gap-10">
                {/* Icon buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Icon buttons</CardTitle>
                    <CardDescription>Outline icon actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-8 gap-4">
                      {[
                        Copy,
                        CircleAlert,
                        Trash2,
                        Share,
                        Inbox,
                        MoreHorizontal,
                        RefreshCw,
                        Plus,
                        Minus,
                        ArrowLeft,
                        ArrowRight,
                        Check,
                        ChevronDown,
                        ChevronRight,
                        Search,
                        Settings,
                      ].map((Icon, i) => (
                        <Button key={i} variant="outline" size="icon">
                          <Icon />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recurring charges */}
                <Card className="gap-2">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1.5">
                        <CardTitle className="text-lg font-semibold">
                          Recurring charges
                        </CardTitle>
                        <CardDescription>
                          Next charge date — Sep 24. 2026 ·{" "}
                          <span className="underline">See plan details</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xl font-semibold text-foreground">
                          ₹1999
                          <span className="text-base font-normal text-accent-foreground">
                            /mo
                          </span>
                        </span>
                        <span className="text-accent-foreground">₹67/day</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-4 pb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="size-4 shrink-0" />
                        <span>
                          Current billing amount so far{" "}
                          <span className="font-medium text-foreground">
                            ₹4780.00
                          </span>
                        </span>
                      </div>
                      <Button size="sm" className="shrink-0">
                        <Plus /> Upgrade plan
                      </Button>
                    </div>
                    <div className="flex w-full items-center justify-between gap-4 rounded-lg bg-input px-3 py-2">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Receipt className="size-4 shrink-0 text-muted-foreground" />
                        <span>Unpaid amount is ₹799.00</span>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        Pay now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts — side by side */}
                <div className="flex gap-12">
                  <Alert variant="default">
                    <Info />
                    <AlertTitle>Default alert</AlertTitle>
                    <AlertDescription>
                      This is a default vertical alert.
                    </AlertDescription>
                    <AlertHandlers>
                      <Button variant="secondary" size="sm" className="w-full">
                        Take action
                      </Button>
                    </AlertHandlers>
                    {/* <AlertAction>
                      <X />
                    </AlertAction> */}
                  </Alert>

                  <Alert variant="destructive">
                    <CircleAlert />
                    <AlertTitle>Destructive alert</AlertTitle>
                    <AlertDescription>
                      This is a destructive vertical alert.
                    </AlertDescription>
                    <AlertHandlers>
                      <Button variant="secondary" size="sm" className="w-full">
                        Try again
                      </Button>
                    </AlertHandlers>
                    {/* <AlertAction>
                      <X />
                    </AlertAction> */}
                  </Alert>
                </div>
                <div className="flex gap-12">
                  <div>
                    {/* Calendar */}
                    {mounted && (
                      <Calendar
                        mode="single"
                        selected={calDate ?? CAL_DEFAULT}
                        onSelect={setCalDate}
                        defaultMonth={CAL_DEFAULT}
                        className="shadow-default"
                      />
                    )}
                  </div>
                  <div>
                    {/* Empty — with search input */}
                    <Empty className="h-full">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <Search />
                        </EmptyMedia>
                        <EmptyTitle>No results found</EmptyTitle>
                        <EmptyDescription>
                          Try adjusting your search or filter to find what
                          you&apos;re looking for.
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <InputGroup>
                          <InputGroupAddon>
                            <Search />
                          </InputGroupAddon>
                          <InputGroupInput placeholder="Search" />
                        </InputGroup>
                      </EmptyContent>
                    </Empty>
                  </div>
                </div>

                {/* Message scroller transcript */}
                <MessageScrollerDemo />
              </div>

              {/* Column 4 */}
              <div className="flex w-[40rem] shrink-0 flex-col gap-12">
                {/* CRM activity timeline */}

                <CrmActivityTimeline />

                {/* Divider with centered button */}
                <Separator slot slotAlign="center">
                  <Button size="sm">
                    <Check />
                    Continue
                  </Button>
                </Separator>

                {/* Organisation table */}
                <OrganisationTable />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>

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
    </SidebarProvider>
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

function LabeledInput({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Input placeholder={placeholder} />
    </div>
  )
}

function TargetRow({
  label,
  amount,
  pct,
  sub,
}: {
  label: string
  amount: string
  pct: number
  sub: string
}) {
  return (
    <div className="rounded-xl bg-muted p-4">
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="text-2xl font-semibold text-foreground">{amount}</p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{pct}% achieved</span>
        <span>{sub}</span>
      </div>
    </div>
  )
}

function TxRow({
  name,
  cat,
  when,
  amount,
  positive,
}: {
  name: string
  cat: string
  when: string
  amount: string
  positive?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-muted" />
        <div className="flex flex-col">
          <span className="pb-1 text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="text-xs text-muted-foreground">{cat}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={cn(
            "pb-1 text-sm font-medium",
            positive ? "text-emerald-600" : "text-foreground"
          )}
        >
          {amount}
        </span>
        <span className="text-xs text-muted-foreground">{when}</span>
      </div>
    </div>
  )
}

/* --- CRM activity timeline (from the timeline showcase) ------------------ */

function CrmActivityTimeline() {
  return (
    <Timeline defaultValue={6}>
      {/* 1) Email card with attachments */}
      <TimelineItem
        step={1}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-full group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator
          className="size-7 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8"
          render={
            <Avatar className="size-7">
              <AvatarImage
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
                alt="Templeton Peck"
              />
              <AvatarFallback className="text-[10px]">TP</AvatarFallback>
            </Avatar>
          }
        />
        <TimelineContent>
          <Card variant="mail" className="-mt-2.5 gap-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-medium text-foreground">
                    Templeton Peck
                  </span>{" "}
                  <span className="text-sm text-accent-foreground">
                    &lt;templeton@frappe.io&gt;
                  </span>
                </p>
                <p className="text-base font-normal text-muted-foreground">
                  <span className="text-accent-foreground">To:</span> Jonathan
                  Higgins, sandeep@timeless.co, +4
                </p>
                <p className="text-base text-muted-foreground">
                  <span className="text-accent-foreground">Subject:</span>{" "}
                  Package update
                </p>
              </div>
              <span className="shrink-0 text-xs text-accent-foreground">
                3d ago
              </span>
            </div>
            <div className="mt-3.5 border-t border-border-soft pt-3.5 text-base text-secondary-foreground">
              <p className="pb-0.5">Hi Good morning,</p>
              <p>We hope this message finds you well.</p>
              <br></br>
              <p className="leading-lg">
                We are writing to inform you about recent updates to our
                inventory package that may affect your current and future
                orders. We&rsquo;ve expanded our inventory with new items
                including Bose. These additions are now available for ordering
                and can be viewed on our Bose
              </p>
              <br></br>
              <p className="pb-0.5">Thanks &amp; Regards</p>
              <p>Templeton Peck</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <AttachmentChip
                icon="/images/svg/zip.svg"
                name="Satoshi.zip"
                meta="Zip · 5.4 MB"
              />
              <AttachmentChip
                icon="/images/svg/pdf.svg"
                name="Bose.PDF"
                meta="PDF · 44MB"
              />
              <AttachmentChip
                icon="/images/svg/document.svg"
                name="Supply_Update.doc"
                meta="Doc · 9.8 MB"
              />
            </div>
          </Card>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem
        step={2}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-full group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator
          className="size-7 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8"
          render={
            <Avatar className="size-7">
              <AvatarImage
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
                alt="Templeton Peck"
              />
              <AvatarFallback className="text-[10px]">TP</AvatarFallback>
            </Avatar>
          }
        />
        <TimelineContent>
          <Card variant="mail" className="-mt-2.5 gap-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <p>
                  <span className="font-medium text-foreground">
                    Templeton Peck
                  </span>{" "}
                  <span className="text-sm text-accent-foreground">
                    &lt;templeton@frappe.io&gt;
                  </span>
                </p>
              </div>
              <span className="shrink-0 text-xs text-accent-foreground">
                3d ago
              </span>
            </div>
            <p className="pt-1 leading-lg text-accent-foreground">
              Hi, I placed an order last week. I spoke with Marisa at the time.
              When will it be delivered?
            </p>
          </Card>
        </TimelineContent>
      </TimelineItem>

      {/* 2) Comment in chat bubble */}
      <TimelineItem
        step={3}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-full group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator className="flex size-8 items-center justify-center rounded-full border-none bg-secondary text-muted-foreground group-data-[orientation=vertical]/timeline:-left-8">
          <MessageSquare className="size-3.5" />
        </TimelineIndicator>
        <TimelineContent className="mt-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <Avatar className="size-5">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80"
                  alt="Sanny Woven"
                />
                <AvatarFallback className="text-[9px]">SW</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">Sanny Woven</span>
              <span className="text-muted-foreground">added a comment</span>
            </div>
            <span className="text-xs text-accent-foreground">27 Jun</span>
          </div>
          <Card variant="message" className="mt-2 w-full text-base">
            <p className="max-w-lg leading-lg text-muted-foreground">
              <span className="font-medium text-secondary-foreground">
                @Sandra Bass
              </span>
              , I&apos;ve noticed that too. I think we need better forecasting.
              We often end up with either too much stock or not enough. Maybe we
              should look into some advanced forecasting software?
            </p>
          </Card>
        </TimelineContent>
      </TimelineItem>

      {/* 3) Compact activity log rows */}
      <TimelineItem
        step={4}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="h-full! bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator className="size-2 rounded-full border-0 bg-yellow-500 group-data-[orientation=vertical]/timeline:top-1 group-data-[orientation=vertical]/timeline:-left-9 group-data-[orientation=vertical]/timeline:translate-x-0" />
        <TimelineContent>
          <p className="text-sm font-medium text-foreground">
            Show +9 activities from last week
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Significa Well
                  </span>{" "}
                  updated deal status value from{" "}
                  <span className="font-medium text-foreground">
                    Prospecting
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">Qualified</span>
                </>
              }
              date="12 Jun"
            />
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Gleb Kuznetsov
                  </span>{" "}
                  created a task
                </>
              }
              date="19 Jun"
            />
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Zhenya Rynzhuk
                  </span>{" "}
                  added a note
                </>
              }
              date="19 Jun"
            />
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Shariq Ansari
                  </span>{" "}
                  updated status from{" "}
                  <span className="font-medium text-foreground">Contacted</span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">Qualified</span>
                </>
              }
              date="20 Jun"
            />
          </ul>
        </TimelineContent>
      </TimelineItem>

      {/* 4) Single field change */}
      <TimelineItem
        step={5}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="h-full! bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator className="size-2 rounded-full border-0 bg-yellow-500 group-data-[orientation=vertical]/timeline:top-1 group-data-[orientation=vertical]/timeline:-left-9 group-data-[orientation=vertical]/timeline:translate-x-0" />
        <TimelineContent>
          <p className="text-sm">
            <span className="font-medium text-foreground">Shariq Ansari</span>{" "}
            <span className="text-muted-foreground">added</span>{" "}
            <span className="font-medium text-foreground">Annual Revenue</span>{" "}
            <span className="text-muted-foreground">as</span>{" "}
            <span className="font-medium text-foreground">45,00,000.00</span>
          </p>
        </TimelineContent>
      </TimelineItem>

      {/* 6) Phone call card */}
      <TimelineItem
        step={6}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineIndicator className="flex size-8 items-center justify-center rounded-full border-none bg-destructive/10 text-destructive group-data-[orientation=vertical]/timeline:-left-8">
          <PhoneIncoming className="size-3.5" />
        </TimelineIndicator>
        <TimelineContent>
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <Avatar className="size-5">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80"
                  alt="Brian Robinson"
                />
                <AvatarFallback className="text-[9px]">BR</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">
                Brian Robinson
              </span>
              <span className="text-muted-foreground">
                has reached out to you.
              </span>
            </div>
            <span className="text-xs text-accent-foreground">14 May</span>
          </div>
          <Card variant="call" className="mt-2 gap-0">
            <p className="pb-1 text-sm font-medium text-foreground">
              Inbound Call
            </p>
            <p className="text-sm text-destructive">Missed call</p>
          </Card>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

function AttachmentChip({
  icon,
  name,
  meta,
}: {
  icon: string
  name: string
  meta: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium text-foreground">{name}</p>
        <div className="flex items-center gap-2 pt-1">
          <img src={icon} alt="" className="size-4 shrink-0" />
          <p className="truncate text-xs text-muted-foreground">{meta}</p>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({ text, date }: { text: ReactNode; date: string }) {
  return (
    <li className="flex items-center justify-between gap-3 text-accent-foreground">
      <span>{text}</span>
      <span className="shrink-0 text-xs">{date}</span>
    </li>
  )
}

/* --- Message scroller transcript (from the showcase) -------------------- */

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  name: string
  initials: string
  text: string
  time: string
}

const CHAT_CONVERSATION: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    name: "You",
    initials: "YO",
    text: "Can you walk me through how the message scroller keeps things anchored?",
    time: "9:41 AM",
  },
  {
    id: "m2",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "Of course. Each row is wrapped in a MessageScrollerItem so the viewport can measure and preserve its position.",
    time: "9:41 AM",
  },
  {
    id: "m3",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "When you mark an item with scrollAnchor, it's treated as a conversation turn — the viewport parks it near the top.",
    time: "9:42 AM",
  },
  {
    id: "m4",
    role: "user",
    name: "You",
    initials: "YO",
    text: "So the last thing I sent stays pinned while the reply streams in?",
    time: "9:43 AM",
  },
  {
    id: "m5",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "Exactly. With autoScroll on, streamed replies stay in view as long as you're at the live edge.",
    time: "9:43 AM",
  },
  {
    id: "m6",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "If you scroll up to read older messages, auto-scroll pauses so you aren't yanked back down.",
    time: "9:44 AM",
  },
]

function ChatRow({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  return (
    <Message align={isUser ? "end" : "start"}>
      {!isUser && (
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>{message.initials}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      )}
      <MessageContent>
        <MessageHeader>{message.name}</MessageHeader>
        <Bubble variant={isUser ? "default" : "secondary"}>
          <BubbleContent>{message.text}</BubbleContent>
        </Bubble>
        <MessageFooter>{message.time}</MessageFooter>
      </MessageContent>
    </Message>
  )
}

function MessageScrollerDemo() {
  return (
    <MessageScrollerProvider
      autoScroll
      defaultScrollPosition="end"
      scrollPreviousItemPeek={64}
    >
      <div className="h-96 overflow-hidden rounded-xl shadow-default">
        <MessageScroller>
          <MessageScrollerViewport className="px-4 py-5">
            <MessageScrollerContent>
              {CHAT_CONVERSATION.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor={message.role === "user"}
                >
                  <ChatRow message={message} />
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  )
}

/* --- Organisation table (from the table showcase) ----------------------- */

type Organisation = {
  id: string
  logo: string
  logoBg: string
  name: string
  amount: string
  status: string
  statusColor: string
  email: string
  mobile: string
  assigneeName: string
  assigneeAvatar: string
  assigneeFallback: string
  lastModified: string
}

const ORGANISATIONS: Organisation[] = [
  {
    id: "1",
    logo: "T",
    logoBg: "bg-black text-white",
    name: "Timeless",
    amount: "₹ 3,50,500",
    status: "Qualification",
    statusColor: "bg-blue-500",
    email: "stacy@example.com",
    mobile: "+91 9994445678",
    assigneeName: "Avinash Goel",
    assigneeAvatar: "https://i.pravatar.cc/40?img=12",
    assigneeFallback: "AG",
    lastModified: "2 days ago",
  },
  {
    id: "2",
    logo: "D",
    logoBg: "bg-blue-500 text-white",
    name: "Dropbox",
    amount: "₹ 5,00,000",
    status: "Negotiation",
    statusColor: "bg-purple-500",
    email: "julie@example.com",
    mobile: "+91 7778889999",
    assigneeName: "Sara Patel",
    assigneeAvatar: "https://i.pravatar.cc/40?img=47",
    assigneeFallback: "SP",
    lastModified: "1 month ago",
  },
  {
    id: "3",
    logo: "A",
    logoBg: "bg-yellow-400 text-black",
    name: "Attentive",
    amount: "₹ 4,80,000",
    status: "Meeting",
    statusColor: "bg-orange-500",
    email: "linda@example.com",
    mobile: "+91 3332221111",
    assigneeName: "Emily Wong",
    assigneeAvatar: "https://i.pravatar.cc/40?img=44",
    assigneeFallback: "EW",
    lastModified: "2 weeks ago",
  },
  {
    id: "4",
    logo: "G",
    logoBg: "bg-pink-400 text-white",
    name: "Gumroad",
    amount: "₹ 4,60,000",
    status: "Proposal made",
    statusColor: "bg-cyan-500",
    email: "john@example.com",
    mobile: "+91 2223334444",
    assigneeName: "Michael Chen",
    assigneeAvatar: "https://i.pravatar.cc/40?img=33",
    assigneeFallback: "MC",
    lastModified: "5 days ago",
  },
]

function OrganisationTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox />
          </TableHead>
          <TableHead>Organisation</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ORGANISATIONS.map((org) => (
          <TableRow key={org.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar variant="square" size="default">
                  <AvatarFallback className={org.logoBg}>
                    {org.logo}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{org.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{org.amount}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${org.statusColor}`} />
                <span className="text-muted-foreground">{org.status}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {org.lastModified}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/* --- Account dropdown (from the dropdown-menu showcase) ------------------ */

function AccountDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button className="w-full" variant="secondary" />}
      >
        Open Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <User />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            Team
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail />
                Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare />
                Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle />
                More...
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus />
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github />
          GitHub
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Cloud />
          API
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
