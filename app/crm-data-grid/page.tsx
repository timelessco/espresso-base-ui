"use client"

import {
  Bell,
  CalendarDays,
  ChevronDown,
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
  ChevronsUpDown,
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
  Columns3,
  Group,
  ListFilter,
  ArrowUpDown,
  Ellipsis,
} from "lucide-react"
import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { DataGrid } from "@/components/data-grid/data-grid"
import { useDataGrid } from "@/hooks/use-data-grid"
import { TooltipProvider } from "@/components/ui-radix/tooltip"

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

const statusOptions = Object.keys(statusColors).map((s) => ({
  label: s,
  value: s,
}))

const organisations = [
  { name: "Gumroad", image: "/images/svg/gumroad.svg" },
  { name: "Attentive", image: "/images/svg/attentive.svg" },
  { name: "Evergreen", image: "/images/svg/evergreen.svg" },
  { name: "Dropbox", image: "/images/svg/dropbox.svg" },
  { name: "Hourglass", image: "/images/svg/hourglass.svg" },
  { name: "Miro", image: "/images/svg/miro.svg" },
  { name: "Zapier", image: "/images/svg/zapier.svg" },
  { name: "Figma", image: "/images/svg/figma.svg" },
  { name: "1password", image: "/images/svg/1password.svg" },
  { name: "Cooper", image: "/images/svg/cooper.svg" },
  { name: "ChatGpt", image: "/images/svg/chatgpt.svg" },
  { name: "Github", image: "/images/svg/github.svg" },
  { name: "Metalab", image: "/images/svg/metalab.svg" },
  { name: "Adobe Express", image: "/images/svg/adobeexpress.svg" },
  { name: "Spotify", image: "/images/svg/spotify.svg" },
]

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
      className={`flex size-2 shrink-0 items-center justify-center rounded-full ${className ?? ""}`}
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
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#DB4EE0]">
                  <img src="/images/svg/logo-crm.svg" alt="CRM" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CRM</span>
                  <span className="truncate text-xs text-muted-foreground">
                    James fenimore
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--anchor-width] min-w-56"
                align="start"
                sideOffset={4}
              >
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#DB4EE0]">
                    <img src="/images/svg/logo-crm.svg" alt="CRM" />
                  </div>
                  <div className="grid text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      CRM
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
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
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#DB4EE0] text-white">
                        <img
                          src="/images/svg/logo-crm.svg"
                          alt="CRM"
                          className="size-4"
                        />
                      </div>
                      CRM
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<a href="/crm-data-grid" />}>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#DB4EE0] text-white">
                        <img
                          src="/images/svg/logo-crm.svg"
                          alt="CRM"
                          className="size-4"
                        />
                      </div>
                      CRM Data Grid
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<a href="/helpdesk" />}>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#7D42FB] text-white">
                        <img
                          src="/images/svg/logo-helpDesk.svg"
                          alt="Helpdesk"
                          className="size-4"
                        />
                      </div>
                      Helpdesk
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<a href="/drive" />}>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#016E7D] text-white">
                        <img
                          src="/images/svg/logo-drive.svg"
                          alt="Drive"
                          className="size-4"
                        />
                      </div>
                      Drive
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<a href="/mail" />}>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#0466DC] text-white">
                        <img
                          src="/images/svg/logo-mail.svg"
                          alt="Mail"
                          className="size-4"
                        />
                      </div>
                      Mail
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<a href="/gameplan" />}>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#FF8F26] text-white">
                        <img
                          src="/images/svg/logo-gameplan.svg"
                          alt="Game Plan"
                          className="size-4"
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
                <DropdownMenuItem>
                  <Moon />
                  Dark Mode
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
              <Collapsible className="group/collapsible group-data-[collapsible=icon]:hidden">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronDown className="size-3! shrink-0 -rotate-90 stroke-[2.25] text-sidebar-accent-foreground transition-all duration-200 ease-in-out group-data-open/collapsible:rotate-0" />
                    <span>Saved views</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>All Leads</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Active Leads</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>My Leads</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
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

  const columns = React.useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        size: 200,
        meta: { label: "Name", cell: { variant: "short-text" } },
      },
      {
        id: "organisation",
        accessorKey: "organisation",
        header: "Organisation",
        size: 180,
        meta: { label: "Organisation", cell: { variant: "short-text" } },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        size: 140,
        meta: {
          label: "Status",
          cell: { variant: "select", options: statusOptions },
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
        size: 180,
        meta: { label: "Assigned to", cell: { variant: "short-text" } },
      },
      {
        id: "lastModified",
        accessorKey: "lastModified",
        header: "Last modified",
        size: 140,
        meta: { label: "Last modified", cell: { variant: "short-text" } },
      },
    ],
    []
  )

  const { table, ...dataGridProps } = useDataGrid({
    data,
    columns,
    onDataChange: setData,
    getRowId: (row) => row.id,
  })

  return (
    <SidebarProvider>
      <CrmSidebar />
      <SidebarInset className="h-screen min-w-0 overflow-hidden">
        <SidebarTrigger className="sr-only" />
        <div className="flex h-full min-w-0 flex-col overflow-hidden">
          <Header
            leftControls={
              <Breadcrumb size="md">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/crm-data-grid">Leads</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <Select
                      items={[...views, ...savedViews]}
                      defaultValue="list-view"
                      variant="ghost"
                      size="sm"
                    >
                      <SelectTrigger suffixIcon={<ChevronDown />}>
                        <SelectValue className="text-lg font-medium text-foreground" />
                      </SelectTrigger>
                      <SelectContent>
                        {views.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <item.icon className="size-4" />
                            {item.label}
                          </SelectItem>
                        ))}
                        <SelectSeparator />
                        {savedViews.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <item.icon className="size-4" />
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            }
            rightControls={
              <Button size="sm">
                <Plus />
                Create
              </Button>
            }
          />
          <SubHeader
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
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="lead-owner">Lead owner</SelectItem>
                    <SelectItem value="jenny-wilson">Jenny Wilson</SelectItem>
                    <SelectItem value="mariana">Mariana Rodriguez</SelectItem>
                    <SelectItem value="sophie-chen">Sophie Chen</SelectItem>
                    <SelectItem value="david-lee">David Lee</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={organisationItems}
                  defaultValue="gumroad"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {organisationItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.icon && <item.icon />}
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  items={statusFilterItems}
                  defaultValue="open"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {statusFilterItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.icon && <item.icon className="my-auto" />}
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            }
            rightControls={
              <>
                <Select
                  items={[
                    { label: "Column", value: "column" },
                    { label: "Name", value: "name" },
                    { label: "Organisation", value: "organisation" },
                    { label: "Start Date", value: "start-date" },
                    { label: "Status", value: "status" },
                    { label: "Email", value: "email" },
                    { label: "Mobile No", value: "mobile" },
                    { label: "Assigned To", value: "assigned" },
                  ]}
                  defaultValue="column"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const item = [
                          { label: "Column", value: "column" },
                          { label: "Name", value: "name" },
                          { label: "Organisation", value: "organisation" },
                          { label: "Start Date", value: "start-date" },
                          { label: "Status", value: "status" },
                          { label: "Email", value: "email" },
                          { label: "Mobile No", value: "mobile" },
                          { label: "Assigned To", value: "assigned" },
                        ].find((i) => i.value === value)
                        return (
                          <>
                            <Columns3 className="size-4" />
                            {item?.label ?? "Column"}
                          </>
                        )
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="column">Column</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="organisation">Organisation</SelectItem>
                    <SelectItem value="start-date">Start Date</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="mobile">Mobile No</SelectItem>
                    <SelectItem value="assigned">Assigned To</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "Group", value: "group" },
                    { label: "Options", value: "option-1" },
                    { label: "Options", value: "option-2" },
                    { label: "Options", value: "option-3" },
                  ]}
                  defaultValue="group"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Group", value: "group" },
                          { label: "Options", value: "option-1" },
                          { label: "Options", value: "option-2" },
                          { label: "Options", value: "option-3" },
                        ]
                        const item = items.find((i) => i.value === value)
                        return (
                          <>
                            <Group className="size-4" />
                            {item?.label ?? "Group"}
                          </>
                        )
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="group">Group</SelectItem>
                    <SelectItem value="option-1">Options</SelectItem>
                    <SelectItem value="option-2">Options</SelectItem>
                    <SelectItem value="option-3">Options</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "Filter", value: "filter" },
                    { label: "Title", value: "title" },
                    { label: "Priority", value: "priority" },
                    { label: "Start Date", value: "start-date" },
                    { label: "Reference Document Type", value: "ref-doc-type" },
                    { label: "Reference Doc", value: "ref-doc" },
                    { label: "Assigned To", value: "assigned" },
                    { label: "Status", value: "status" },
                  ]}
                  defaultValue="filter"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Filter", value: "filter" },
                          { label: "Title", value: "title" },
                          { label: "Priority", value: "priority" },
                          { label: "Start Date", value: "start-date" },
                          {
                            label: "Reference Document Type",
                            value: "ref-doc-type",
                          },
                          { label: "Reference Doc", value: "ref-doc" },
                          { label: "Assigned To", value: "assigned" },
                          { label: "Status", value: "status" },
                        ]
                        const item = items.find((i) => i.value === value)
                        return (
                          <>
                            <ListFilter className="size-4" />
                            {item?.label ?? "Filter"}
                          </>
                        )
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="filter">Filter</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="start-date">Start Date</SelectItem>
                    <SelectItem value="ref-doc-type">
                      Reference Document Type
                    </SelectItem>
                    <SelectItem value="ref-doc">Reference Doc</SelectItem>
                    <SelectItem value="assigned">Assigned To</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "Sort", value: "short" },
                    { label: "Status", value: "status" },
                    { label: "Name", value: "name" },
                    { label: "Created", value: "created" },
                  ]}
                  defaultValue="short"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Sort", value: "short" },
                          { label: "Status", value: "status" },
                          { label: "Name", value: "name" },
                          { label: "Created", value: "created" },
                        ]
                        const item = items.find((i) => i.value === value)
                        return (
                          <>
                            <ArrowUpDown className="size-4" />
                            {item?.label ?? "Sort"}
                          </>
                        )
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="short">Sort</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="created">Created</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="secondary" size="icon-sm" />}
                  >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Import</DropdownMenuItem>
                    <DropdownMenuItem>User Permissions</DropdownMenuItem>
                    <DropdownMenuItem>
                      Role Permissions Manager
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Customize
                      <span className="ml-auto text-xs text-muted-foreground">
                        ⌘+Y
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Toggle Sidebar
                      <span className="ml-auto text-xs text-muted-foreground">
                        ⌘+G
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>List Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            }
          />

          <div className="mt-2 min-h-0 min-w-0 flex-1 overflow-hidden px-5 pb-5">
            <TooltipProvider>
              <DataGrid table={table} {...dataGridProps} height={600} />
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
