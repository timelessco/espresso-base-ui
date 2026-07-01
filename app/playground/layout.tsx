"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertCircle,
  AlignLeft,
  AppWindow,
  ArrowRight,
  ArrowRightFromLine,
  Asterisk,
  Paperclip,
  BadgeCheck,
  Bell,
  BellPlus,
  BellRing,
  Box,
  BoxSelect,
  Boxes,
  Calendar,
  CalendarClock,
  CreditCard,
  CloudUpload,
  CaseSensitive,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Columns3,
  Divide,
  Folder,
  FormInput,
  History,
  Home,
  Inbox,
  Keyboard,
  Layout,
  Link2,
  List,
  LoaderCircle,
  LogOut,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Moon,
  PanelLeft,
  PanelRight,
  PanelTop,
  Plane,
  Plus,
  Radio,
  Search,
  SlidersHorizontal,
  SquareCheckBig,
  SquareDashed,
  Star,
  Sun,
  Table as TableIcon,
  Tags,
  TextCursorInput,
  ToggleLeft,
  Tornado,
  User,
  Workflow,
  Zap,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

const quickLinks = [
  { label: "Home", href: "#", icon: Home },
  { label: "Travel", href: "#", icon: Plane },
]

const teams = [
  {
    name: "Form Components",
    icon: Folder,
    items: ["Input", "Select", "Checkbox", "Radio"],
  },
  {
    name: "Product",
    icon: CalendarClock,
    count: 5,
    items: ["Roadmap", "Releases", "Backlog", "Sprints", "Reports"],
  },
]

const components = [
  { label: "Alert", href: "/ui/alert", icon: AlertCircle },
  { label: "Attachment", href: "/ui/attachment", icon: Paperclip },
  { label: "Avatar", href: "/ui/avatar", icon: User },
  { label: "Badge", href: "/ui/badge", icon: BadgeCheck },
  { label: "Breadcrumb", href: "/ui/breadcrumb", icon: Link2 },
  { label: "Button", href: "/playground/button", icon: Asterisk },
  { label: "Button Group", href: "/ui/button-group", icon: Inbox },
  { label: "Calendar", href: "/ui/calendar", icon: Calendar },
  { label: "Card", href: "/ui/card", icon: CreditCard },
  { label: "Checkbox", href: "/ui/checkbox", icon: SquareCheckBig },
  { label: "Color Picker", href: "/ui/color-picker", icon: Sun },
  { label: "Color Swatch", href: "/ui/color-swatch", icon: Sun },
  { label: "Combobox", href: "/ui/combobox", icon: Search },
  { label: "Command", href: "/ui/command", icon: SquareDashed },
  { label: "Dialog", href: "/ui/dialog", icon: AppWindow },
  { label: "Divider", href: "/ui/separator", icon: Divide },
  { label: "Dropdown Menu", href: "/ui/dropdown-menu", icon: ChevronDown },
  { label: "Empty", href: "/ui/empty", icon: Box },
  { label: "Field", href: "/ui/field", icon: FormInput },
  { label: "File Upload", href: "/ui/file-upload", icon: CloudUpload },
  { label: "Header", href: "/ui/header", icon: PanelTop },
  { label: "Input", href: "/ui/input", icon: TextCursorInput },
  { label: "Input Group", href: "/ui/input-group", icon: AlignLeft },
  { label: "Input OTP", href: "/ui/input-otp", icon: Keyboard },
  { label: "Item", href: "/ui/item", icon: List },
  { label: "Kanban", href: "/ui/kanban", icon: Columns3 },
  { label: "Kbd", href: "/ui/kbd", icon: Keyboard },
  { label: "Message", href: "/ui/message", icon: MessageSquare },
  {
    label: "Message Scroller",
    href: "/ui/message-scroller",
    icon: MessagesSquare,
  },
  { label: "Notification", href: "/ui/notification", icon: BellRing },
  { label: "Popover", href: "/ui/popover", icon: MessageCircle },
  { label: "Progress Bar", href: "/ui/progress", icon: LoaderCircle },
  { label: "Radio Group", href: "/ui/radio", icon: Radio },
  { label: "Rating", href: "/ui/rating", icon: Star },
  { label: "Select", href: "/ui/select", icon: SquareDashed },
  { label: "Sidebar", href: "/sidebar", icon: PanelLeft },
  { label: "Slider", href: "/ui/slider", icon: SlidersHorizontal },
  { label: "Sonner", href: "/ui/sonner", icon: BellPlus },
  { label: "Spinner", href: "/ui/spinner", icon: Tornado },
  { label: "Switch", href: "/ui/switch", icon: ToggleLeft },
  { label: "Table", href: "/ui/table", icon: TableIcon },
  { label: "Tabs", href: "/ui/tabs", icon: Layout },
  { label: "Tags", href: "/ui/tag", icon: Tags },
  { label: "Text Area", href: "/ui/textarea", icon: CaseSensitive },
  { label: "Timeline", href: "/ui/timeline", icon: History },
  { label: "Tooltip", href: "/ui/tooltip", icon: BoxSelect },
]

function PlaygroundSidebar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const { isMobile, setOpenMobile } = useSidebar()
  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="icon">
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Search" className="h-7 text-base">
                  <Search />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Notification"
                  className="h-7 text-base"
                >
                  <Bell />
                  <span>Notification</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>2</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {quickLinks.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    className="h-7 text-base font-normal!"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <div className="flex items-center justify-between pr-0.5 pb-1 pl-2">
              <span className="text-xs font-medium text-muted-foreground">
                Teams
              </span>
              <Button variant="ghost" size="icon-xs">
                <Plus className="size-3.5" />
              </Button>
            </div>
            <SidebarMenu className="gap-0.5">
              {teams.map((team) => (
                <Collapsible key={team.name} className="group/team">
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/team:bg-sidebar-accent" />
                      }
                    >
                      <ChevronRight className="shrink-0 transition-transform duration-200 ease-in-out group-data-open/team:rotate-90" />
                      <team.icon className="size-4" />
                      <span>{team.name}</span>
                    </CollapsibleTrigger>
                    {team.count !== undefined && (
                      <SidebarMenuBadge>{team.count}</SidebarMenuBadge>
                    )}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {team.items.map((item) => (
                          <SidebarMenuSubItem key={item}>
                            <SidebarMenuSubButton className="cursor-default text-base! select-none">
                              <span>{item}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {components.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={isActive}
                      onClick={closeMobileSidebar}
                      className={cn(
                        "h-7 text-base font-normal!",
                        isActive &&
                          "bg-background shadow-sm shadow-black/5 data-[active=true]:bg-background data-[active=true]:hover:bg-background"
                      )}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 pb-4">
        <div className="mx-2 flex flex-col gap-3 rounded-lg border border-border-soft bg-card px-3 pt-2.5 pb-3 group-data-[collapsible=icon]:hidden">
          <div className="flex gap-2">
            <Workflow className="size-4 text-muted-foreground" />
            <div className="flex flex-col gap-2">
              <span className="text-sm leading-base font-medium tracking-normal text-foreground">
                Getting Started
              </span>
              <span className="text-xs leading-base font-normal tracking-normal text-muted-foreground">
                0/4
              </span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full">
            Continue <ArrowRight />
          </Button>
        </div>

        <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
            >
              <Zap className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
            >
              <CircleHelp className="size-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground"
            onClick={() =>
              document
                .querySelector<HTMLButtonElement>('[data-sidebar="trigger"]')
                ?.click()
            }
          >
            <PanelRight className="size-4 group-data-[collapsible=icon]:hidden" />
            <ArrowRightFromLine className="hidden size-4 group-data-[collapsible=icon]:block" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <PlaygroundSidebar />
      <SidebarInset className="relative h-screen min-w-0 overflow-hidden">
        <SidebarTrigger className="absolute top-3 right-3 z-50 md:hidden" />
        <main className="scrollbar-hide h-full min-h-0 min-w-0 flex-1 overflow-hidden">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
