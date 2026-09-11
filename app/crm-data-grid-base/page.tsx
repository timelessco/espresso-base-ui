"use client"

import {
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalSpaceAround,
  AppWindow,
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  ArrowRightFromLine,
  ArrowUp,
  Bell,
  Boxes,
  Building2,
  CalendarDays,
  CalendarDays as CalendarIcon,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  CircleAlert,
  CircleHelp,
  ClipboardList,
  Columns2,
  Contact,
  Equal,
  Handshake,
  Headset,
  HeartHandshake,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Mail,
  MapPin,
  Minus,
  Moon,
  PanelRight,
  Phone,
  PinOff,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  StickyNote,
  Sun,
  User,
  Users,
  Workflow,
  Zap,
} from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import {
  type ColumnDef,
  type ColumnPinningState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useTable,
} from "@tanstack/react-table-v9"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import { Header } from "@/components/ui/header"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SubHeader } from "@/components/ui/sub-header"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridCellsChangeDetails,
  type DataGridFeatures,
} from "@/components/reui/data-grid/data-grid"
import { DataGridCellSelection } from "@/components/reui/data-grid/data-grid-cell-selection"
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header"
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area"
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table"

const views = [
  { label: "List view", value: "list-view", icon: AlignJustify },
  { label: "Kanban view", value: "kanban-view", icon: Columns2 },
  { label: "Calendar", value: "calendar", icon: CalendarIcon },
]

const savedViews = [
  { label: "Product - sales", value: "product-sales", icon: Sun },
  { label: "Support", value: "support", icon: PinOff },
  { label: "Board - highest sales", value: "board-highest", icon: PinOff },
  { label: "Board pinned", value: "board-pinned", icon: MapPin },
]

const statusColors: Record<string, string> = {
  Open: "#7C7C7C",
  Contacted: "#B35309",
  Nurture: "#0070CC",
  Qualified: "#137949",
  Unqualified: "#B52A2A",
  Junk: "#4F3DA1",
}

const dataLists = {
  names: [
    { label: "Jenny Wilson", image: "https://i.pravatar.cc/40?u=jenny" },
    { label: "Mariana Rodriguez", image: "https://i.pravatar.cc/40?u=mariana" },
    { label: "Sophie Chen", image: "https://i.pravatar.cc/40?u=sophie" },
    { label: "David Lee", image: "https://i.pravatar.cc/40?u=david" },
    { label: "Maria Gomez", image: "https://i.pravatar.cc/40?u=maria" },
    { label: "Anika Sharma", image: "https://i.pravatar.cc/40?u=anika" },
    { label: "Liam Brown", image: "https://i.pravatar.cc/40?u=liam" },
    { label: "Daniel Kim", image: "https://i.pravatar.cc/40?u=daniel" },
    { label: "Nina Lee", image: "https://i.pravatar.cc/40?u=nina" },
    { label: "Avery Clark", image: "https://i.pravatar.cc/40?u=avery" },
    { label: "Lucas White", image: "https://i.pravatar.cc/40?u=lucas" },
    { label: "Chloe Allen", image: "https://i.pravatar.cc/40?u=chloe" },
    { label: "Evelyn Young", image: "https://i.pravatar.cc/40?u=evelyn" },
    { label: "Nathan Green", image: "https://i.pravatar.cc/40?u=nathan" },
    { label: "Grace Roberts", image: "https://i.pravatar.cc/40?u=grace" },
    { label: "Ravi Kumar", image: "https://i.pravatar.cc/40?u=ravi" },
    { label: "Priya Menon", image: "https://i.pravatar.cc/40?u=priyam" },
    { label: "Arjun Patel", image: "https://i.pravatar.cc/40?u=arjun" },
    { label: "Meera Joshi", image: "https://i.pravatar.cc/40?u=meera" },
    { label: "Vikram Singh", image: "https://i.pravatar.cc/40?u=vikram" },
  ],
  organisations: [
    { label: "Gumroad", image: "/images/svg/gumroad.svg" },
    { label: "Attentive", image: "/images/svg/attentive.svg" },
    { label: "Evergreen", image: "/images/svg/evergreen.svg" },
    { label: "Dropbox", image: "/images/svg/dropbox.svg" },
    { label: "Hourglass", image: "/images/svg/hourglass.svg" },
    { label: "Miro", image: "/images/svg/miro.svg" },
    { label: "Zapier", image: "/images/svg/zapier.svg" },
    { label: "Figma", image: "/images/svg/figma.svg" },
    { label: "1password", image: "/images/svg/1password.svg" },
    { label: "Cooper", image: "/images/svg/cooper.svg" },
    { label: "ChatGpt", image: "/images/svg/chatgpt.svg" },
    { label: "Github", image: "/images/svg/github.svg" },
    { label: "Metalab", image: "/images/svg/metalab.svg" },
    { label: "Adobe Express", image: "/images/svg/adobeexpress.svg" },
    { label: "Spotify", image: "/images/svg/spotify.svg" },
  ],
  assigned: [
    { label: "Avinash Goel", image: "https://i.pravatar.cc/40?u=avinash" },
    { label: "Rahul Sharma", image: "https://i.pravatar.cc/40?u=rahul" },
    { label: "Elena Petrova", image: "https://i.pravatar.cc/40?u=elena" },
    { label: "Priya Patel", image: "https://i.pravatar.cc/40?u=priya" },
    { label: "James Smith", image: "https://i.pravatar.cc/40?u=james" },
    { label: "Mark Johnson", image: "https://i.pravatar.cc/40?u=mark" },
    { label: "Olivia Martinez", image: "https://i.pravatar.cc/40?u=olivia" },
    { label: "Isabella Davis", image: "https://i.pravatar.cc/40?u=isabella" },
    { label: "Ethan Wilson", image: "https://i.pravatar.cc/40?u=ethan" },
    { label: "Mia Thompson", image: "https://i.pravatar.cc/40?u=mia" },
    { label: "Ella Hill", image: "https://i.pravatar.cc/40?u=ella" },
    { label: "Noah Scott", image: "https://i.pravatar.cc/40?u=noah" },
    { label: "Alexander King", image: "https://i.pravatar.cc/40?u=alexander" },
    { label: "Sofia Walker", image: "https://i.pravatar.cc/40?u=sofia" },
    { label: "Henry Allen", image: "https://i.pravatar.cc/40?u=henry" },
  ],
}

const organisations = dataLists.organisations.map((o) => ({
  name: o.label,
  image: o.image,
}))

const organisationItems = organisations.map((o) => ({
  label: o.name,
  value: o.name.toLowerCase(),
  icon: ({ className }: { className?: string }) => (
    <Avatar size="xs" variant="square" className={className}>
      <AvatarImage src={o.image} />
      <AvatarFallback>{o.name[0]}</AvatarFallback>
    </Avatar>
  ),
}))

const statusFilterItems = Object.keys(statusColors).map((s) => ({
  label: s,
  value: s.toLowerCase(),
  icon: ({ className }: { className?: string }) => (
    <span
      className={cn(
        "flex size-2! shrink-0 items-center justify-center rounded-full",
        className
      )}
      style={{ backgroundColor: statusColors[s] }}
    />
  ),
}))

type Lead = {
  id: string
  name: string
  organisation: string
  status: string
  email: string
  mobile: string
  assignee: string
  lastModified: string
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Jenny Wilson",
    organisation: "Gumroad",
    status: "Open",
    email: "stacy@example.com",
    mobile: "+91 9994445678",
    assignee: "Avinash Goel",
    lastModified: "2 days ago",
  },
  {
    id: "2",
    name: "Mariana Rodriguez",
    organisation: "Attentive",
    status: "Contacted",
    email: "mariana@example.com",
    mobile: "+91 8885556789",
    assignee: "Rahul Sharma",
    lastModified: "1 week ago",
  },
  {
    id: "3",
    name: "Sophie Chen",
    organisation: "Evergreen",
    status: "Nurture",
    email: "sophie@example.com",
    mobile: "+91 7773335678",
    assignee: "Elena Petrova",
    lastModified: "3 days ago",
  },
  {
    id: "4",
    name: "David Lee",
    organisation: "Dropbox",
    status: "Qualified",
    email: "david@example.com",
    mobile: "+91 6662225678",
    assignee: "Priya Patel",
    lastModified: "4 days ago",
  },
  {
    id: "5",
    name: "Maria Gomez",
    organisation: "Hourglass",
    status: "Unqualified",
    email: "maria@example.com",
    mobile: "+91 5554445678",
    assignee: "James Smith",
    lastModified: "5 days ago",
  },
  {
    id: "6",
    name: "Anika Sharma",
    organisation: "Miro",
    status: "Nurture",
    email: "anika@example.com",
    mobile: "+91 4443335678",
    assignee: "Mark Johnson",
    lastModified: "6 days ago",
  },
  {
    id: "7",
    name: "Liam Brown",
    organisation: "Zapier",
    status: "Junk",
    email: "liam@example.com",
    mobile: "+91 3332225678",
    assignee: "Olivia Martinez",
    lastModified: "1 week ago",
  },
  {
    id: "8",
    name: "Daniel Kim",
    organisation: "Figma",
    status: "Contacted",
    email: "daniel@example.com",
    mobile: "+91 2221115678",
    assignee: "Isabella Davis",
    lastModified: "1 week ago",
  },
  {
    id: "9",
    name: "Nina Lee",
    organisation: "1password",
    status: "Open",
    email: "nina@example.com",
    mobile: "+91 1110005678",
    assignee: "Ethan Wilson",
    lastModified: "8 days ago",
  },
  {
    id: "10",
    name: "Avery Clark",
    organisation: "Cooper",
    status: "Qualified",
    email: "avery@example.com",
    mobile: "+91 9998885678",
    assignee: "Mia Thompson",
    lastModified: "9 days ago",
  },
  {
    id: "11",
    name: "Lucas White",
    organisation: "ChatGpt",
    status: "Junk",
    email: "lucas@example.com",
    mobile: "+91 8887775678",
    assignee: "Ella Hill",
    lastModified: "10 days ago",
  },
  {
    id: "12",
    name: "Chloe Allen",
    organisation: "Github",
    status: "Contacted",
    email: "chloe@example.com",
    mobile: "+91 7776665678",
    assignee: "Noah Scott",
    lastModified: "11 days ago",
  },
  {
    id: "13",
    name: "Evelyn Young",
    organisation: "Metalab",
    status: "Open",
    email: "evelyn@example.com",
    mobile: "+91 6665555678",
    assignee: "Alexander King",
    lastModified: "12 days ago",
  },
  {
    id: "14",
    name: "Nathan Green",
    organisation: "Adobe Express",
    status: "Unqualified",
    email: "nathan@example.com",
    mobile: "+91 5554445678",
    assignee: "Sofia Walker",
    lastModified: "13 days ago",
  },
  {
    id: "15",
    name: "Grace Roberts",
    organisation: "Spotify",
    status: "Junk",
    email: "grace@example.com",
    mobile: "+91 4443335678",
    assignee: "Henry Allen",
    lastModified: "14 days ago",
  },
  {
    id: "16",
    name: "Ravi Kumar",
    organisation: "Gumroad",
    status: "Open",
    email: "ravi@example.com",
    mobile: "+91 9876543210",
    assignee: "Avinash Goel",
    lastModified: "15 days ago",
  },
  {
    id: "17",
    name: "Priya Menon",
    organisation: "Attentive",
    status: "Contacted",
    email: "priya.m@example.com",
    mobile: "+91 8765432109",
    assignee: "Rahul Sharma",
    lastModified: "16 days ago",
  },
  {
    id: "18",
    name: "Arjun Patel",
    organisation: "Dropbox",
    status: "Nurture",
    email: "arjun@example.com",
    mobile: "+91 7654321098",
    assignee: "Elena Petrova",
    lastModified: "17 days ago",
  },
  {
    id: "19",
    name: "Meera Joshi",
    organisation: "Figma",
    status: "Qualified",
    email: "meera@example.com",
    mobile: "+91 6543210987",
    assignee: "Priya Patel",
    lastModified: "18 days ago",
  },
  {
    id: "20",
    name: "Vikram Singh",
    organisation: "Miro",
    status: "Unqualified",
    email: "vikram@example.com",
    mobile: "+91 5432109876",
    assignee: "James Smith",
    lastModified: "19 days ago",
  },
]

function CrmSidebar() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
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
                  <img src="/images/svg/logo-crm.svg" alt="CRM" />
                </div>
                <div className="grid flex-1 text-left">
                  <span className="truncate pb-0.5 text-base font-medium text-foreground">
                    CRM
                  </span>
                  <span className="truncate text-sm font-normal text-muted-foreground">
                    James fenimore
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
                    <img src="/images/svg/logo-crm.svg" alt="CRM" />
                  </div>
                  <div className="grid text-left">
                    <span className="truncate pb-0.5 text-base font-medium text-foreground">
                      CRM
                    </span>
                    <span className="truncate text-sm font-normal text-muted-foreground">
                      James fenimore
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
                    <DropdownMenuItem render={<a href="/crm-data-grid-base" />}>
                      <div className="flex size-7 items-center justify-center rounded-md text-white">
                        <img src="/images/svg/logo-crm.svg" alt="CRM" />
                      </div>
                      CRM Data Grid Base
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
                          alt="Game Plan"
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
                  tooltip="Notifications"
                  className="h-7 text-base"
                >
                  <Bell />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {[
                { icon: LayoutDashboard, label: "Dashboard" },
                { icon: ClipboardList, label: "Tasks" },
                { icon: StickyNote, label: "Notes" },
                { icon: Mail, label: "Emails" },
                { icon: Users, label: "Leads" },
                { icon: Handshake, label: "Deals" },
                { icon: Building2, label: "Organization" },
                { icon: CalendarDays, label: "Calendar" },
                { icon: Contact, label: "Contacts" },
                { icon: Phone, label: "Call & Event Logs" },
              ].map((item) => (
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

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <Collapsible
                defaultOpen
                className="group/collapsible group-data-[collapsible=icon]:hidden"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronRight className="shrink-0 transition-transform duration-200 ease-in-out group-data-open/collapsible:rotate-90" />
                    <span>Saved views</span>
                  </CollapsibleTrigger>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="absolute top-0.5 right-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus className="size-3.5" />
                  </Button>
                  <CollapsibleContent>
                    <SidebarMenu className="mt-0.5 gap-0.5">
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <Headset />
                          <span>My leads</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <HeartHandshake />
                          <span>Deals flow</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <ShieldCheck />
                          <span>Qualified Deals</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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

type SelectOption = {
  label: string
  value: string
  image?: string
  dot?: string
}

const nameOptions: SelectOption[] = dataLists.names.map((n) => ({
  label: n.label,
  value: n.label,
  image: n.image,
}))

const organisationOptions: SelectOption[] = dataLists.organisations.map(
  (o) => ({ label: o.label, value: o.label, image: o.image })
)

const assignedOptions: SelectOption[] = dataLists.assigned.map((a) => ({
  label: a.label,
  value: a.label,
  image: a.image,
}))

const statusOptions: SelectOption[] = Object.keys(statusColors).map((s) => ({
  label: s,
  value: s,
  dot: statusColors[s],
}))

function OptionVisual({
  option,
  square,
  className,
}: {
  option?: SelectOption
  square?: boolean
  className?: string
}) {
  if (!option) return null
  if (option.dot) {
    return (
      <span
        className={cn("size-1.75 shrink-0 rounded-full", className)}
        style={{ backgroundColor: option.dot }}
      />
    )
  }
  return (
    <Avatar
      size="xs"
      variant={square ? "square" : "circle"}
      className={cn("size-4", square && "rounded-xs", className)}
    >
      <AvatarImage src={option.image} />
      <AvatarFallback>{option.label[0]}</AvatarFallback>
    </Avatar>
  )
}

/**
 * A select-variant grid cell in the espresso Select: reads as a plain value
 * at rest (avatar/dot + label, no trigger chrome), the chevron appears only
 * while the cell is focused, and the popup opens over the cell.
 */
function GridSelectCell({
  value,
  options,
  onChange,
  square,
  labelClassName,
}: {
  value: string
  options: SelectOption[]
  onChange: (next: string) => void
  square?: boolean
  labelClassName?: string
}) {
  const selected = options.find((o) => o.value === value)
  return (
    <Select
      items={options}
      value={value || null}
      onValueChange={(next) => onChange((next as string) ?? "")}
      // Non-modal: a modal popup's inert backdrop swallows the mouse events
      // the grid's cell selection depends on, so opening the dropdown left a
      // half-started drag that made the next cell click extend a range.
      // Non-modal lets an outside click reach the grid as a normal click.
      modal={false}
    >
      <SelectTrigger
        variant="ghost"
        size="sm"
        suffix={<ChevronDown />}
        className="h-6 w-full border-0 bg-transparent! px-0 text-base text-muted-foreground shadow-none! transition-none! active:transform-none! active:bg-transparent! [&_svg]:hidden in-data-[cell-focused]:[&_svg]:inline-block"
        aria-label={selected?.label ?? "Empty"}
      >
        <SelectValue>
          <span className="flex min-w-0 items-center gap-2">
            <OptionVisual option={selected} square={square} />
            <span className={cn("truncate", labelClassName)}>
              {selected?.label ?? ""}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        align="start"
        // the trigger is a 24px strip centered in the cell, so its bottom
        // sits ~10px above the cell edge — 16 clears the cell plus a gap
        sideOffset={13}
        // span the full cell: the trigger (--anchor-width) is inset by the
        // cell's 8px side padding, so widen by 16 and shift left by 8 to
        // reach both cell edges
        alignOffset={-8}
        className="max-h-72 w-[calc(var(--anchor-width)+--spacing(4))]"
      >
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex min-w-0 items-center gap-2">
                <OptionVisual option={option} square={square} />
                <span className="truncate">{option.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

// editorPad pins the flush editor's line box to the exact text position of
// the cell (the measured centering differs by the row border + baseline
// rounding); important classes so they beat the editor's inline paddings
const rowHeightItems = [
  {
    label: "Short",
    value: "short",
    icon: Minus,
    className: "h-10",
    editorPad:
      "[&_[data-slot=data-grid-cell-editor]]:pt-[11.5px]! [&_[data-slot=data-grid-cell-editor]]:pb-[12.5px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:mt-[-1px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:min-h-[41px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:pt-[12.5px]!",
  },
  {
    label: "Medium",
    value: "medium",
    icon: Equal,
    className: "h-14",
    editorPad:
      "[&_[data-slot=data-grid-cell-editor]]:pt-[19.5px]! [&_[data-slot=data-grid-cell-editor]]:pb-[20.5px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:mt-[-1px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:min-h-[57px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:pt-[20.5px]!",
  },
  {
    label: "Tall",
    value: "tall",
    icon: AlignVerticalSpaceAround,
    className: "h-19",
    editorPad:
      "[&_[data-slot=data-grid-cell-editor]]:pt-[29.5px]! [&_[data-slot=data-grid-cell-editor]]:pb-[30.5px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:mt-[-1px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:min-h-[77px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:pt-[30.5px]!",
  },
  {
    label: "Extra tall",
    value: "extra-tall",
    icon: ChevronsDownUp,
    className: "h-24",
    editorPad:
      "[&_[data-slot=data-grid-cell-editor]]:pt-[39.5px]! [&_[data-slot=data-grid-cell-editor]]:pb-[40.5px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:mt-[-1px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:min-h-[97px]! [&:has(tbody_tr+tr_td[data-cell-focused])_[data-slot=data-grid-cell-editor]]:pt-[40.5px]!",
  },
]

const toolbarButtonClassName = "font-normal"

const gridHeaderClassName =
  "h-full w-full justify-start rounded-none text-sm text-accent-foreground transition-none! hover:bg-transparent hover:text-accent-foreground active:transform-none! active:bg-transparent data-[state=open]:bg-transparent data-popup-open:bg-transparent data-popup-open:text-accent-foreground dark:hover:bg-transparent dark:active:bg-transparent dark:data-popup-open:bg-transparent [&_svg]:opacity-0 [&:hover_svg]:opacity-60 [&[aria-expanded=true]_svg]:opacity-60"

export default function CrmDataGridBasePage() {
  const [data, setData] = React.useState<Lead[]>(initialLeads)
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >({})
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    start: ["select"],
    end: [],
  })
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [rowHeight, setRowHeight] = React.useState("short")
  const nextIdRef = React.useRef(initialLeads.length + 1)

  const updateRows = React.useCallback(
    (changes: Array<{ rowId: string; columnId: string; value: unknown }>) => {
      if (!changes.length) return
      const byRow = new Map<
        string,
        Array<{ columnId: string; value: unknown }>
      >()
      for (const change of changes) {
        const rowChanges = byRow.get(change.rowId) ?? []
        rowChanges.push(change)
        byRow.set(change.rowId, rowChanges)
      }
      setData((previous) =>
        previous.map((row) => {
          const rowChanges = byRow.get(row.id)
          if (!rowChanges) return row
          const next = { ...row } as Record<string, unknown>
          for (const change of rowChanges) next[change.columnId] = change.value
          return next as unknown as Lead
        })
      )
    },
    []
  )

  const handleCellsChange = (details: DataGridCellsChangeDetails<Lead>) => {
    updateRows(details.changes)
  }

  const handleRowCreate = () => {
    const id = `lead-${nextIdRef.current}`
    nextIdRef.current += 1
    setData((previous) => [
      ...previous,
      {
        id,
        name: "",
        organisation: "",
        status: "Open",
        email: "",
        mobile: "",
        assignee: "",
        lastModified: "just now",
      },
    ])
  }

  // Proportional stretch, the old grid's stretchColumns: base widths are
  // weights, scaled so visible columns always fill the measured grid width
  // (below the base total the grid falls back to horizontal scroll).
  const gridWrapRef = React.useRef<HTMLDivElement | null>(null)
  const [gridWidth, setGridWidth] = React.useState(0)
  React.useEffect(() => {
    const el = gridWrapRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setGridWidth(entries[0].contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const columnWidths = React.useMemo(() => {
    const base: Record<string, number> = {
      name: 200,
      organisation: 170,
      status: 130,
      email: 190,
      mobile: 145,
      assignee: 170,
      lastModified: 140,
    }
    const visible = Object.keys(base).filter(
      (id) => columnVisibility[id] !== false
    )
    const flexTotal = visible.reduce((total, id) => total + base[id], 0)
    const available = gridWidth - 40
    const scale = flexTotal > 0 ? Math.max(1, available / flexTotal) : 1
    const sized: Record<string, number> = {}
    for (const id of Object.keys(base)) sized[id] = Math.floor(base[id] * scale)
    return sized
  }, [gridWidth, columnVisibility])

  const filteredData = React.useMemo(
    () =>
      statusFilter.length
        ? data.filter((lead) => statusFilter.includes(lead.status))
        : data,
    [data, statusFilter]
  )

  // select columns are spreadsheet-writable like the reui demo: the
  // clipboard carries labels, parse canonicalizes them against the options
  // (rejecting unknowns into the batch's rejected list)
  const optionCellEdit = (options: SelectOption[]) => ({
    parse: (raw: string) => {
      const needle = raw.trim().toLowerCase()
      return options.find((o) => o.label.toLowerCase() === needle)?.value
    },
    format: (value: unknown) => String(value ?? ""),
    clearValue: "",
  })

  const columns = React.useMemo<ColumnDef<DataGridFeatures, Lead>[]>(
    () => [
      {
        id: "select",
        size: 40,
        minSize: 40,
        maxSize: 40,
        enableResizing: false,
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => (
          <div className="flex w-full items-center">
            <Checkbox
              size="sm"
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onCheckedChange={(checked) =>
                table.toggleAllRowsSelected(!!checked)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex w-full items-center">
            <Checkbox
              size="sm"
              checked={row.getIsSelected()}
              onCheckedChange={(checked) => row.toggleSelected(!!checked)}
              aria-label="Select row"
            />
          </div>
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Name"
            column={column}
            className={gridHeaderClassName}
          />
        ),
        size: columnWidths.name,
        cell: ({ row }) => (
          <GridSelectCell
            value={row.original.name}
            options={nameOptions}
            labelClassName="font-medium text-foreground"
            onChange={(next) =>
              updateRows([{ rowId: row.id, columnId: "name", value: next }])
            }
          />
        ),
        meta: { headerTitle: "Name", cellEdit: optionCellEdit(nameOptions) },
      },
      {
        id: "organisation",
        accessorKey: "organisation",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Organisation"
            column={column}
            className={gridHeaderClassName}
          />
        ),
        size: columnWidths.organisation,
        cell: ({ row }) => (
          <GridSelectCell
            value={row.original.organisation}
            options={organisationOptions}
            square
            onChange={(next) =>
              updateRows([
                { rowId: row.id, columnId: "organisation", value: next },
              ])
            }
          />
        ),
        meta: { headerTitle: "Organisation", cellEdit: optionCellEdit(organisationOptions) },
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Status"
            column={column}
            className={gridHeaderClassName}
          />
        ),
        size: columnWidths.status,
        cell: ({ row }) => (
          <GridSelectCell
            value={row.original.status}
            options={statusOptions}
            onChange={(next) =>
              updateRows([{ rowId: row.id, columnId: "status", value: next }])
            }
          />
        ),
        meta: { headerTitle: "Status", cellEdit: optionCellEdit(statusOptions) },
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Email"
            column={column}
            className={gridHeaderClassName}
          />
        ),
        cell: (info) => info.getValue() as string,
        size: columnWidths.email,
        meta: {
          headerTitle: "Email",
          cellClassName: "text-muted-foreground",
          cellEdit: { control: "text", clearValue: "" },
        },
      },
      {
        id: "mobile",
        accessorKey: "mobile",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Mobile no."
            column={column}
            className={gridHeaderClassName}
          />
        ),
        cell: (info) => info.getValue() as string,
        size: columnWidths.mobile,
        meta: {
          headerTitle: "Mobile no.",
          cellClassName: "text-muted-foreground",
          cellEdit: { control: "text", clearValue: "" },
        },
      },
      {
        id: "assignee",
        accessorKey: "assignee",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Assigned to"
            column={column}
            className={gridHeaderClassName}
          />
        ),
        size: columnWidths.assignee,
        cell: ({ row }) => (
          <GridSelectCell
            value={row.original.assignee}
            options={assignedOptions}
            onChange={(next) =>
              updateRows([{ rowId: row.id, columnId: "assignee", value: next }])
            }
          />
        ),
        meta: { headerTitle: "Assigned to", cellEdit: optionCellEdit(assignedOptions) },
      },
      {
        id: "lastModified",
        accessorKey: "lastModified",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Last modified"
            column={column}
            className={gridHeaderClassName}
          />
        ),
        cell: (info) => info.getValue() as string,
        size: columnWidths.lastModified,
        minSize: 130,
        meta: {
          headerTitle: "Last modified",
          cellClassName: "text-muted-foreground",
          cellEdit: { control: "text", clearValue: "" },
        },
      },
    ],
    [updateRows, columnWidths]
  )

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: filteredData,
    pageCount: 1,
    getRowId: (row: Lead) => row.id,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnPinning,
      // one continuous scroll like the old grid: the footer tabs pick a
      // nominal page size, but the page always covers every row
      pagination: {
        pageIndex: 0,
        pageSize: Math.max(pagination.pageSize, filteredData.length || 1),
      },
    },
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onPaginationChange: setPagination,
  })

  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.id !== "select" && column.getCanHide())

  const sortableColumns = table
    .getAllColumns()
    .filter((column) => column.id !== "select" && column.getCanSort())

  const rowHeightItem =
    rowHeightItems.find((item) => item.value === rowHeight) ?? rowHeightItems[0]

  const visibleRowCount = table.getRowModel().rows.length

  return (
    <SidebarProvider>
      <CrmSidebar />
      <SidebarInset className="h-screen min-w-0 overflow-hidden">
        <SidebarTrigger className="sr-only" />
        <div className="flex h-full min-w-0 flex-col overflow-hidden">
          <Header
            leftControls={
              <>
                <SidebarTrigger className="md:hidden" />
                <Breadcrumb size="md">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/crm-data-grid-base">
                        Leads
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <Select
                        items={[...views, ...savedViews]}
                        defaultValue="list-view"
                      >
                        <SelectTrigger
                          variant="ghost"
                          size="sm"
                          suffix={<ChevronDown />}
                        >
                          <SelectValue className="text-lg font-medium text-foreground" />
                        </SelectTrigger>
                        <SelectContent align="start">
                          <SelectGroup>
                            {views.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                            <SelectSeparator />
                            {savedViews.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </>
            }
            rightControls={
              <Button size="sm">
                <Plus />
                Create
              </Button>
            }
          />
          <SubHeader
            className="scrollbar-hide overflow-x-auto [&_[data-slot=sub-header-left]]:shrink-0 [&_[data-slot=sub-header-left]>*]:shrink-0 [&_[data-slot=sub-header-right]]:shrink-0 [&_[data-slot=sub-header-right]>*]:shrink-0"
            leftControls={
              <>
                <Select
                  items={[
                    { label: "Lead owner", value: "lead-owner" },
                    { label: "Jenny Wilson", value: "jenny-wilson" },
                    { label: "Mariana Rodriguez", value: "mariana" },
                    { label: "Sophie Chen", value: "sophie-chen" },
                    { label: "David Lee", value: "david-lee" },
                  ]}
                  defaultValue="lead-owner"
                >
                  <SelectTrigger
                    variant="subtle"
                    size="sm"
                    suffix={<ChevronDown />}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start">
                    <SelectGroup>
                      <SelectItem value="lead-owner">Lead owner</SelectItem>
                      <SelectItem value="jenny-wilson">Jenny Wilson</SelectItem>
                      <SelectItem value="mariana">Mariana Rodriguez</SelectItem>
                      <SelectItem value="sophie-chen">Sophie Chen</SelectItem>
                      <SelectItem value="david-lee">David Lee</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select items={organisationItems} defaultValue="gumroad">
                  <SelectTrigger
                    variant="subtle"
                    size="sm"
                    suffix={<ChevronDown />}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start">
                    <SelectGroup>
                      {organisationItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select items={statusFilterItems} defaultValue="open">
                  <SelectTrigger
                    variant="subtle"
                    size="sm"
                    suffix={<ChevronDown />}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start">
                    <SelectGroup>
                      {statusFilterItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            }
            rightControls={
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className={toolbarButtonClassName}
                  onClick={() =>
                    setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"))
                  }
                >
                  {direction === "ltr" ? <AlignLeft /> : <AlignRight />}
                  {direction === "ltr" ? "LTR" : "RTL"}
                </Button>

                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="secondary"
                        size="sm"
                        className={cn(
                          toolbarButtonClassName,
                          "ms-auto hidden lg:flex"
                        )}
                      />
                    }
                  >
                    <Settings2 className="text-muted-foreground" />
                    View
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-44 overflow-hidden p-0 [&_[data-slot=command-input-wrapper]]:p-0 [&_[data-slot=command-input-wrapper]_[data-slot=input-group]]:h-9! [&_[data-slot=command-input-wrapper]_[data-slot=input-group]]:rounded-none! [&_[data-slot=command-input-wrapper]_[data-slot=input-group]]:border-0 [&_[data-slot=command-input-wrapper]_[data-slot=input-group]]:border-b [&_[data-slot=command-input-wrapper]_[data-slot=input-group]]:border-muted [&_[data-slot=command-input-wrapper]_[data-slot=input-group]]:bg-transparent!"
                  >
                    <Command className="pb-0">
                      <CommandInput placeholder="Search columns..." />
                      <CommandList>
                        <CommandEmpty>No columns found.</CommandEmpty>
                        <CommandGroup className="p-1">
                          {hideableColumns.map((column) => (
                            <CommandItem
                              key={column.id}
                              data-checked={column.getIsVisible()}
                              className="rounded-md py-1.5 text-sm font-normal [&_svg]:text-muted-foreground"
                              onSelect={() =>
                                column.toggleVisibility(!column.getIsVisible())
                              }
                            >
                              <span className="flex-1 truncate">
                                {(
                                  column.columnDef.meta as {
                                    headerTitle?: string
                                  }
                                )?.headerTitle ?? column.id}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="secondary"
                        size="sm"
                        className={toolbarButtonClassName}
                      />
                    }
                  >
                    <ListFilter className="text-muted-foreground" />
                    Filter
                    {statusFilter.length > 0 && (
                      <Badge variant="secondary" size="sm">
                        {statusFilter.length}
                      </Badge>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    {statusOptions.map((option) => {
                      const active = statusFilter.includes(option.value)
                      return (
                        <DropdownMenuItem
                          key={option.value}
                          closeOnClick={false}
                          onClick={() =>
                            setStatusFilter((prev) =>
                              active
                                ? prev.filter((s) => s !== option.value)
                                : [...prev, option.value]
                            )
                          }
                        >
                          <span
                            className="size-1.75 shrink-0 rounded-full"
                            style={{ backgroundColor: option.dot }}
                          />
                          <span className="grow">{option.label}</span>
                          {active && <Check className="size-4" />}
                        </DropdownMenuItem>
                      )
                    })}
                    {statusFilter.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setStatusFilter([])}>
                          Clear filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="secondary"
                        size="sm"
                        className={toolbarButtonClassName}
                      />
                    }
                  >
                    <ArrowDownUp className="text-muted-foreground" />
                    Sort
                    {sorting.length > 0 && (
                      <Badge variant="secondary" size="sm">
                        {sorting.length}
                      </Badge>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {sortableColumns.map((column) => {
                      const sorted = sorting.find((s) => s.id === column.id)
                      return (
                        <DropdownMenuItem
                          key={column.id}
                          closeOnClick={false}
                          onClick={() => {
                            if (!sorted) {
                              column.toggleSorting(false)
                            } else if (!sorted.desc) {
                              column.toggleSorting(true)
                            } else {
                              column.clearSorting()
                            }
                          }}
                        >
                          <span className="grow">
                            {(
                              column.columnDef.meta as {
                                headerTitle?: string
                              }
                            )?.headerTitle ?? column.id}
                          </span>
                          {sorted &&
                            (sorted.desc ? (
                              <ArrowDown className="size-3.5" />
                            ) : (
                              <ArrowUp className="size-3.5" />
                            ))}
                        </DropdownMenuItem>
                      )
                    })}
                    {sorting.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSorting([])}>
                          Clear sorting
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Select
                  items={rowHeightItems}
                  value={rowHeight}
                  onValueChange={(next) => setRowHeight(next as string)}
                >
                  <SelectTrigger
                    variant="subtle"
                    size="sm"
                    aria-label="Row height"
                    suffix={<span className="hidden" />}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="end">
                    <SelectGroup>
                      {rowHeightItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            }
          />

          <div
            ref={gridWrapRef}
            dir={direction}
            className={cn(
              rowHeightItem.editorPad,
              "mt-2 min-h-0 min-w-0 flex-1 overflow-hidden px-5 pb-5 [&_[data-slot=data-grid-table-resize-handle]]:opacity-0 [&_[data-slot=data-grid-table-resize-handle]]:transition-opacity [&_thead:hover_[data-slot=data-grid-table-resize-handle]]:opacity-100 [&_[data-slot=data-grid-table-resize-handle]]:before:top-1/2 [&_[data-slot=data-grid-table-resize-handle]]:before:bottom-auto [&_[data-slot=data-grid-table-resize-handle]]:before:h-5 [&_[data-slot=data-grid-table-resize-handle]]:before:w-0.5 [&_[data-slot=data-grid-table-resize-handle]]:before:-translate-y-1/2 [&_[data-slot=data-grid-table-resize-handle]]:before:rounded-full [&_[data-slot=data-grid-table-resize-handle]:not(:active)]:before:bg-border-soft [&_td[data-pinned]]:shadow-none! [&_th[data-pinned]]:bg-transparent! [&_th[data-pinned]]:shadow-none! [&_thead:has(+tbody>tr:first-child:hover)_th]:border-transparent! [&_td[data-cell-focused]]:z-10 [&_td[data-cell-selected]]:z-10 [&_[data-slot=data-grid-scrollbar]]:hidden! [&_[data-slot=data-grid-scroll-area]+div[aria-hidden]]:hidden! [&_[data-slot=data-grid-cell-editor]]:text-muted-foreground! [&_[data-slot=data-grid-cell-editor]]:bg-secondary! [&_tbody_td]:[--data-grid-overlay-top:0px] [&_tbody_tr:not(:last-child)_td]:[--data-grid-overlay-bottom:-1px] [&_tbody_td]:[--data-grid-overlay-start:0px] [&_tbody_td]:[--data-grid-overlay-end:0px] [&_td[data-cell-focused]]:before:border-border-normal [&_td[data-cell-selected]]:before:border-border-normal [&_[data-slot=data-grid-cell-editor]]:outline-border-normal! [&_td[data-cell-selected]:not([data-cell-edge-right])]:before:border-e-transparent [&_thead:has(+tbody>tr:first-child_td[data-cell-edge-top])_th]:border-transparent! [&_tbody_tr+tr_td]:[--data-grid-overlay-top:-1px] [&_td[data-cell-selected]]:bg-secondary! [&_td[data-cell-fill-target]]:bg-secondary! [&_[data-slot=data-grid-cell-fill-preview]]:outline-border-normal!"
            )}
          >
            <DataGrid
              table={table}
              recordCount={filteredData.length}
              onCellsChange={handleCellsChange}
              onRowCreate={handleRowCreate}
              tableLayout={{
                dense: true,
                rowBorder: true,
                headerSticky: true,
                headerBorder: true,
                headerBackground: false,
                columnsResizable: true,
                columnsPinnable: true,
                columnsVisibility: true,
                columnsMovable: true,
                cellSelection: true,
                cellFillHandle: true,
                cellFillHandleVariant: "dot",
              }}
              tableClassNames={{
                base: "text-base text-muted-foreground",
                edgeCell: "first:ps-3 last:pe-3",
                headerRow: "[&>th]:border-border-soft",
                rowCreate:
                  "hover:bg-transparent [&_button]:w-fit [&_button]:rounded-md",
                cellFillHandle:
                  "-end-[5px] -bottom-[5px] bg-border-normal! in-[td:has(+td[data-pinned])]:end-0 in-[td:last-child]:end-0 in-[tr:last-child]:bottom-0",
                bodyRow: cn(
                  rowHeightItem.className,
                  // the old grid's hover: the whole row turns bg-secondary
                  // with rounded ends; ! outranks the pinned cell's own bg
                  "[&>td]:transition-colors [&:hover>td]:bg-secondary! [&:hover>td:first-child]:rounded-s-md [&:hover>td:last-child]:rounded-e-md [&[data-selected]>td]:bg-secondary!",
                  // border-soft rows whose borders vanish around the hovered
                  // row, exactly like the old grid
                  "[&>td]:border-border-soft [&:hover>td]:border-transparent [&:has(+tr:hover)>td]:border-transparent",
                  // while the flush editor is open the overlay owns the
                  // pointer and the row would lose :hover mid-edit — pin the
                  // hovered look on the row being edited instead
                  "in-data-[cell-editing]:[&:has(>td[data-cell-focused])>td]:bg-secondary! in-data-[cell-editing]:[&:has(>td[data-cell-focused])>td]:border-transparent in-data-[cell-editing]:[&:has(>td[data-cell-focused])>td:first-child]:rounded-s-md in-data-[cell-editing]:[&:has(>td[data-cell-focused])>td:last-child]:rounded-e-md in-data-[cell-editing]:[&:has(+tr>td[data-cell-focused])>td]:border-transparent",
                  // same pin while a select cell's popup is open — its
                  // portal steals :hover exactly like the flush editor
                  "[&:has(>td_[data-slot=select-trigger][data-popup-open])>td]:bg-secondary! [&:has(>td_[data-slot=select-trigger][data-popup-open])>td]:border-transparent [&:has(>td_[data-slot=select-trigger][data-popup-open])>td:first-child]:rounded-s-md [&:has(>td_[data-slot=select-trigger][data-popup-open])>td:last-child]:rounded-e-md [&:has(+tr>td_[data-slot=select-trigger][data-popup-open])>td]:border-transparent"
                ),
              }}
              className="h-full"
            >
              <DataGridContainer className="h-full [&>div:first-child]:h-full">
                <DataGridScrollArea className="h-full">
                  <DataGridTable />
                </DataGridScrollArea>
                <DataGridCellSelection />
              </DataGridContainer>
            </DataGrid>
          </div>

          <div className="flex items-center justify-between border-t border-border-soft px-3 py-1.5">
            <Tabs
              value={String(pagination.pageSize)}
              onValueChange={(value) =>
                setPagination({ pageIndex: 0, pageSize: Number(value) })
              }
            >
              <TabsList>
                <TabsIndicator />
                <TabsTrigger value="20">20</TabsTrigger>
                <TabsTrigger value="50">50</TabsTrigger>
                <TabsTrigger value="80">80</TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="text-base text-muted-foreground">
              {visibleRowCount} of {filteredData.length}
            </span>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
