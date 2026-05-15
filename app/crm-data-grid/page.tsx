"use client"

import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Contact,
  Handshake,
  LayoutDashboard,
  Mail,
  Phone,
  Search,
  StickyNote,
  Users,
  Building2,
  LogOut,
  AppWindow,
  User,
  Moon,
  CircleAlert,
  Boxes,
  Workflow,
  CircleHelp,
  PanelRight,
  ArrowRight,
  ArrowRightFromLine,
  Zap,
  Plus,
  AlignJustify,
  Columns2,
  CalendarDays as CalendarIcon,
  Sun,
  Anchor,
  PinOff,
  MapPin,
  AlignLeft,
  AlignRight,
  Headset,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { SubHeader } from "@/components/ui/sub-header"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { DataGrid } from "@/components/data-grid/data-grid"
import { DataGridViewMenu } from "@/components/data-grid/data-grid-view-menu"
import { DataGridFilterMenu } from "@/components/data-grid/data-grid-filter-menu"
import { DataGridSortMenu } from "@/components/data-grid/data-grid-sort-menu"
import { DataGridRowHeightMenu } from "@/components/data-grid/data-grid-row-height-menu"
import { useDataGrid } from "@/hooks/use-data-grid"
import { useIsMobile } from "@/hooks/use-mobile"
import { Checkbox } from "@/components/ui-radix/checkbox"
import { Button as RadixButton } from "@/components/ui-radix/button"
import { TooltipProvider } from "@/components/ui-radix/tooltip"
import { DirectionProvider } from "@radix-ui/react-direction"

const views = [
  { label: "List view", value: "list-view", icon: AlignJustify },
  { label: "Kanban view", value: "kanban-view", icon: Columns2 },
  { label: "Calendar", value: "calendar", icon: CalendarIcon },
]

const savedViews = [
  { label: "Product - sales", value: "product-sales", icon: Sun },
  { label: "Support", value: "support", icon: Anchor },
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

const nameOptions = dataLists.names.map((n) => ({
  label: n.label,
  value: n.label,
  images: n.image,
}))

const organisationOptions = dataLists.organisations.map((o) => ({
  label: o.label,
  value: o.label,
  images: o.image,
}))

const assignedOptions = dataLists.assigned.map((a) => ({
  label: a.label,
  value: a.label,
  images: a.image,
}))

const statusOptions = Object.keys(statusColors).map((s) => ({
  label: s,
  value: s,
  icon: ({ className }: { className?: string }) => (
    <span
      className={`flex size-2 shrink-0 items-center justify-center rounded-full ${className ?? ""}`}
      style={{ backgroundColor: statusColors[s] }}
    />
  ),
}))

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
                    className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-md">
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
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md">
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  className="h-7 text-base font-normal!"
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Tasks"
                  className="h-7 text-base font-normal!"
                >
                  <ClipboardList />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Notes"
                  className="h-7 text-base font-normal!"
                >
                  <StickyNote />
                  <span>Notes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Emails"
                  className="h-7 text-base font-normal!"
                >
                  <Mail />
                  <span>Emails</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Leads"
                  className="h-7 text-base font-normal!"
                >
                  <Users />
                  <span>Leads</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Deals"
                  className="h-7 text-base font-normal!"
                >
                  <Handshake />
                  <span>Deals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Organization"
                  className="h-7 text-base font-normal!"
                >
                  <Building2 />
                  <span>Organization</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Calendar"
                  className="h-7 text-base font-normal!"
                >
                  <CalendarDays />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Contacts"
                  className="h-7 text-base font-normal!"
                >
                  <Contact />
                  <span>Contacts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Call & Event Logs"
                  className="h-7 text-base font-normal!"
                >
                  <Phone />
                  <span>Call & Event Logs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
        <div className="mx-2 flex flex-col gap-3 rounded-lg border border-border-soft bg-background px-3 pt-2.5 pb-3 group-data-[collapsible=icon]:hidden">
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

export default function CrmDataGridPage() {
  const [data, setData] = React.useState<Lead[]>(initialLeads)
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr")
  const isMobile = useIsMobile()

  const columns = React.useMemo<ColumnDef<Lead>[]>(
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
          <div className="flex h-full items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllRowsSelected()
                  ? true
                  : table.getIsSomeRowsSelected()
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex h-full items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(v) => row.toggleSelected(!!v)}
              aria-label="Select row"
            />
          </div>
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        size: 220,
        meta: {
          label: "Name",
          cell: {
            variant: "select",
            options: nameOptions,
            imageSize: "size-5",
          },
        },
      },
      {
        id: "organisation",
        accessorKey: "organisation",
        header: "Organisation",
        size: 200,
        meta: {
          label: "Organisation",
          cell: {
            variant: "select",
            options: organisationOptions,
            imageSize: "size-5",
            className: "rounded-xs",
          },
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        size: 140,
        meta: {
          label: "Status",
          cell: {
            variant: "select",
            options: statusOptions,
            imageSize: "size-2",
            className: "gap-2",
          },
        },
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
        size: 220,
        meta: { label: "Email", cell: { variant: "short-text" } },
      },
      {
        id: "mobile",
        accessorKey: "mobile",
        header: "Mobile no.",
        size: 160,
        meta: { label: "Mobile no.", cell: { variant: "short-text" } },
      },
      {
        id: "assignee",
        accessorKey: "assignee",
        header: "Assigned to",
        size: 200,
        meta: {
          label: "Assigned to",
          cell: {
            variant: "select",
            options: assignedOptions,
            imageSize: "size-5",
          },
        },
      },
      {
        id: "lastModified",
        accessorKey: "lastModified",
        header: "Last modified",
        size: 160,
        meta: { label: "Last modified", cell: { variant: "short-text" } },
      },
    ],
    []
  )

  const { table, ...dataGridProps } = useDataGrid({
    data,
    columns,
    initialState: {
      columnPinning: { left: ["select"] },
    },
    onDataChange: setData,
    getRowId: (row) => row.id,
    onRowAdd: () => {
      const newRow: Lead = {
        id: crypto.randomUUID(),
        name: "",
        organisation: "",
        status: "Open",
        email: "",
        mobile: "",
        assignee: "",
        lastModified: "just now",
      }
      setData((prev) => [...prev, newRow])
      return { rowIndex: data.length, columnId: "name" }
    },
  })

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
                      <BreadcrumbLink href="/crm-data-grid">
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
              <TooltipProvider>
                <RadixButton
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"))
                  }
                >
                  {direction === "ltr" ? <AlignLeft /> : <AlignRight />}
                  {direction === "ltr" ? "LTR" : "RTL"}
                </RadixButton>
                <DataGridViewMenu table={table} align="start" />
                <DataGridFilterMenu table={table} align="end" />
                <DataGridSortMenu table={table} align="end" />
                <DataGridRowHeightMenu table={table} />
              </TooltipProvider>
            }
          />

          <div className="mt-2 min-h-0 min-w-0 flex-1 overflow-hidden px-5 pb-5">
            <TooltipProvider>
              <DirectionProvider dir={direction}>
                <DataGrid
                  table={table}
                  {...dataGridProps}
                  dir={direction}
                  stretchColumns={!isMobile}
                  className='[&_[data-slot=grid-cell]]:font-normal [&_[data-slot=grid-cell]]:text-muted-foreground [&_[data-slot=grid-cell][aria-colindex="2"]]:font-medium [&_[data-slot=grid-cell][aria-colindex="2"]]:text-foreground'
                />
              </DirectionProvider>
            </TooltipProvider>
          </div>

          <div className="flex items-center justify-between border-t border-border-soft px-3 py-1.5">
            <Tabs defaultValue="20">
              <TabsList>
                <TabsIndicator />
                <TabsTrigger value="20">20</TabsTrigger>
                <TabsTrigger value="50">50</TabsTrigger>
                <TabsTrigger value="80">80</TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="text-base text-muted-foreground">
              {data.length} of {data.length}
            </span>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
