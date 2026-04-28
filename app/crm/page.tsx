"use client"

import {
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Contact,
  FileText,
  Handshake,
  LayoutDashboard,
  Mail,
  PanelLeftClose,
  Phone,
  Search,
  Settings,
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
  HardDrive,
  MessageSquare,
  Gamepad2,
  Workflow,
  CircleHelp,
  PanelRight,
  ArrowRight,
  ArrowRightFromLine,
  Zap,
  Phone as PhoneIcon,
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
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  SidebarGroupLabel,
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

const leads = [
  {
    name: "Jenny Wilson",
    avatar: "https://i.pravatar.cc/32?u=jenny",
    organisation: "Gumroad",
    status: "Open",
    email: "stacy@example.com",
    mobile: "+91 9994445678",
    assignee: "Avinash Goel",
    assigneeAvatar: "https://i.pravatar.cc/32?u=avinash",
    lastModified: "2 days ago",
  },
  {
    name: "Mariana Rodriguez",
    avatar: "https://i.pravatar.cc/32?u=mariana",
    organisation: "Attentive",
    status: "Contacted",
    email: "mariana@example.com",
    mobile: "+91 8885556789",
    assignee: "Rahul Sharma",
    assigneeAvatar: "https://i.pravatar.cc/32?u=rahul",
    lastModified: "1 week ago",
  },
  {
    name: "Sophie Chen",
    avatar: "https://i.pravatar.cc/32?u=sophie",
    organisation: "Evergreen",
    status: "Nurture",
    email: "sophie@example.com",
    mobile: "+91 7773335678",
    assignee: "Elena Petrova",
    assigneeAvatar: "https://i.pravatar.cc/32?u=elena",
    lastModified: "3 days ago",
  },
  {
    name: "David Lee",
    avatar: "https://i.pravatar.cc/32?u=david",
    organisation: "Dropbox",
    status: "Qualified",
    email: "david@example.com",
    mobile: "+91 6662225678",
    assignee: "Priya Patel",
    assigneeAvatar: "https://i.pravatar.cc/32?u=priya",
    lastModified: "4 days ago",
  },
  {
    name: "Maria Gomez",
    avatar: "https://i.pravatar.cc/32?u=maria",
    organisation: "Hourglass",
    status: "Unqualified",
    email: "maria@example.com",
    mobile: "+91 5554445678",
    assignee: "James Smith",
    assigneeAvatar: "https://i.pravatar.cc/32?u=james",
    lastModified: "5 days ago",
  },
  {
    name: "Anika Sharma",
    avatar: "https://i.pravatar.cc/32?u=anika",
    organisation: "Miro",
    status: "Nurture",
    email: "anika@example.com",
    mobile: "+91 4443335678",
    assignee: "Mark Johnson",
    assigneeAvatar: "https://i.pravatar.cc/32?u=mark",
    lastModified: "6 days ago",
  },
  {
    name: "Liam Brown",
    avatar: "https://i.pravatar.cc/32?u=liam",
    organisation: "Zapier",
    status: "Junk",
    email: "liam@example.com",
    mobile: "+91 3332225678",
    assignee: "Olivia Martinez",
    assigneeAvatar: "https://i.pravatar.cc/32?u=olivia",
    lastModified: "1 week ago",
  },
  {
    name: "Daniel Kim",
    avatar: "https://i.pravatar.cc/32?u=daniel",
    organisation: "Figma",
    status: "Contacted",
    email: "daniel@example.com",
    mobile: "+91 2221115678",
    assignee: "Isabella Davis",
    assigneeAvatar: "https://i.pravatar.cc/32?u=isabella",
    lastModified: "1 week ago",
  },
  {
    name: "Nina Lee",
    avatar: "https://i.pravatar.cc/32?u=nina",
    organisation: "1password",
    status: "Open",
    email: "nina@example.com",
    mobile: "+91 1110005678",
    assignee: "Ethan Wilson",
    assigneeAvatar: "https://i.pravatar.cc/32?u=ethan",
    lastModified: "8 days ago",
  },
  {
    name: "Avery Clark",
    avatar: "https://i.pravatar.cc/32?u=avery",
    organisation: "Cooper",
    status: "Qualified",
    email: "avery@example.com",
    mobile: "+91 9998885678",
    assignee: "Mia Thompson",
    assigneeAvatar: "https://i.pravatar.cc/32?u=mia",
    lastModified: "9 days ago",
  },
  {
    name: "Lucas White",
    avatar: "https://i.pravatar.cc/32?u=lucas",
    organisation: "ChatGpt",
    status: "Junk",
    email: "lucas@example.com",
    mobile: "+91 8887775678",
    assignee: "Ella Hill",
    assigneeAvatar: "https://i.pravatar.cc/32?u=ella",
    lastModified: "10 days ago",
  },
  {
    name: "Chloe Allen",
    avatar: "https://i.pravatar.cc/32?u=chloe",
    organisation: "Github",
    status: "Contacted",
    email: "chloe@example.com",
    mobile: "+91 7776665678",
    assignee: "Noah Scott",
    assigneeAvatar: "https://i.pravatar.cc/32?u=noah",
    lastModified: "11 days ago",
  },
  {
    name: "Evelyn Young",
    avatar: "https://i.pravatar.cc/32?u=evelyn",
    organisation: "Metalab",
    status: "Open",
    email: "evelyn@example.com",
    mobile: "+91 6665555678",
    assignee: "Alexander King",
    assigneeAvatar: "https://i.pravatar.cc/32?u=alexander",
    lastModified: "12 days ago",
  },
  {
    name: "Nathan Green",
    avatar: "https://i.pravatar.cc/32?u=nathan",
    organisation: "Adobe Express",
    status: "Unqualified",
    email: "nathan@example.com",
    mobile: "+91 5554445678",
    assignee: "Sofia Walker",
    assigneeAvatar: "https://i.pravatar.cc/32?u=sofia",
    lastModified: "13 days ago",
  },
  {
    name: "Grace Roberts",
    avatar: "https://i.pravatar.cc/32?u=grace",
    organisation: "Spotify",
    status: "Junk",
    email: "grace@example.com",
    mobile: "+91 4443335678",
    assignee: "Henry Allen",
    assigneeAvatar: "https://i.pravatar.cc/32?u=henry",
    lastModified: "14 days ago",
  },
  {
    name: "Ravi Kumar",
    avatar: "https://i.pravatar.cc/32?u=ravi",
    organisation: "Gumroad",
    status: "Open",
    email: "ravi@example.com",
    mobile: "+91 9876543210",
    assignee: "Avinash Goel",
    assigneeAvatar: "https://i.pravatar.cc/32?u=avinash2",
    lastModified: "15 days ago",
  },
  {
    name: "Priya Menon",
    avatar: "https://i.pravatar.cc/32?u=priyam",
    organisation: "Attentive",
    status: "Contacted",
    email: "priya.m@example.com",
    mobile: "+91 8765432109",
    assignee: "Rahul Sharma",
    assigneeAvatar: "https://i.pravatar.cc/32?u=rahul2",
    lastModified: "16 days ago",
  },
  {
    name: "Arjun Patel",
    avatar: "https://i.pravatar.cc/32?u=arjun",
    organisation: "Dropbox",
    status: "Nurture",
    email: "arjun@example.com",
    mobile: "+91 7654321098",
    assignee: "Elena Petrova",
    assigneeAvatar: "https://i.pravatar.cc/32?u=elena2",
    lastModified: "17 days ago",
  },
  {
    name: "Meera Joshi",
    avatar: "https://i.pravatar.cc/32?u=meera",
    organisation: "Figma",
    status: "Qualified",
    email: "meera@example.com",
    mobile: "+91 6543210987",
    assignee: "Priya Patel",
    assigneeAvatar: "https://i.pravatar.cc/32?u=priya2",
    lastModified: "18 days ago",
  },
  {
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/32?u=vikram",
    organisation: "Miro",
    status: "Unqualified",
    email: "vikram@example.com",
    mobile: "+91 5432109876",
    assignee: "James Smith",
    assigneeAvatar: "https://i.pravatar.cc/32?u=james2",
    lastModified: "19 days ago",
  },
  {
    name: "Ananya Rao",
    avatar: "https://i.pravatar.cc/32?u=ananya",
    organisation: "Cooper",
    status: "Open",
    email: "ananya@example.com",
    mobile: "+91 4321098765",
    assignee: "Mark Johnson",
    assigneeAvatar: "https://i.pravatar.cc/32?u=mark2",
    lastModified: "20 days ago",
  },
  {
    name: "Karthik Nair",
    avatar: "https://i.pravatar.cc/32?u=karthik",
    organisation: "Github",
    status: "Contacted",
    email: "karthik@example.com",
    mobile: "+91 3210987654",
    assignee: "Olivia Martinez",
    assigneeAvatar: "https://i.pravatar.cc/32?u=olivia2",
    lastModified: "21 days ago",
  },
  {
    name: "Deepa Iyer",
    avatar: "https://i.pravatar.cc/32?u=deepa",
    organisation: "Zapier",
    status: "Junk",
    email: "deepa@example.com",
    mobile: "+91 2109876543",
    assignee: "Isabella Davis",
    assigneeAvatar: "https://i.pravatar.cc/32?u=isabella2",
    lastModified: "22 days ago",
  },
  {
    name: "Rohit Verma",
    avatar: "https://i.pravatar.cc/32?u=rohit",
    organisation: "Evergreen",
    status: "Nurture",
    email: "rohit@example.com",
    mobile: "+91 1098765432",
    assignee: "Ethan Wilson",
    assigneeAvatar: "https://i.pravatar.cc/32?u=ethan2",
    lastModified: "23 days ago",
  },
  {
    name: "Sneha Gupta",
    avatar: "https://i.pravatar.cc/32?u=sneha",
    organisation: "Hourglass",
    status: "Qualified",
    email: "sneha@example.com",
    mobile: "+91 9988776655",
    assignee: "Mia Thompson",
    assigneeAvatar: "https://i.pravatar.cc/32?u=mia2",
    lastModified: "24 days ago",
  },
  {
    name: "Aditya Reddy",
    avatar: "https://i.pravatar.cc/32?u=aditya",
    organisation: "1password",
    status: "Open",
    email: "aditya@example.com",
    mobile: "+91 8877665544",
    assignee: "Ella Hill",
    assigneeAvatar: "https://i.pravatar.cc/32?u=ella2",
    lastModified: "25 days ago",
  },
  {
    name: "Kavya Sharma",
    avatar: "https://i.pravatar.cc/32?u=kavya",
    organisation: "ChatGpt",
    status: "Contacted",
    email: "kavya@example.com",
    mobile: "+91 7766554433",
    assignee: "Noah Scott",
    assigneeAvatar: "https://i.pravatar.cc/32?u=noah2",
    lastModified: "26 days ago",
  },
  {
    name: "Siddharth Das",
    avatar: "https://i.pravatar.cc/32?u=siddharth",
    organisation: "Metalab",
    status: "Unqualified",
    email: "siddharth@example.com",
    mobile: "+91 6655443322",
    assignee: "Alexander King",
    assigneeAvatar: "https://i.pravatar.cc/32?u=alexander2",
    lastModified: "27 days ago",
  },
  {
    name: "Tanya Bose",
    avatar: "https://i.pravatar.cc/32?u=tanya",
    organisation: "Adobe Express",
    status: "Junk",
    email: "tanya@example.com",
    mobile: "+91 5544332211",
    assignee: "Sofia Walker",
    assigneeAvatar: "https://i.pravatar.cc/32?u=sofia2",
    lastModified: "28 days ago",
  },
  {
    name: "Nikhil Chopra",
    avatar: "https://i.pravatar.cc/32?u=nikhil",
    organisation: "Spotify",
    status: "Nurture",
    email: "nikhil@example.com",
    mobile: "+91 4433221100",
    assignee: "Henry Allen",
    assigneeAvatar: "https://i.pravatar.cc/32?u=henry2",
    lastModified: "29 days ago",
  },
  {
    name: "Pooja Mehta",
    avatar: "https://i.pravatar.cc/32?u=pooja",
    organisation: "Gumroad",
    status: "Qualified",
    email: "pooja@example.com",
    mobile: "+91 3322110099",
    assignee: "Avinash Goel",
    assigneeAvatar: "https://i.pravatar.cc/32?u=avinash3",
    lastModified: "30 days ago",
  },
  {
    name: "Amit Saxena",
    avatar: "https://i.pravatar.cc/32?u=amit",
    organisation: "Attentive",
    status: "Open",
    email: "amit@example.com",
    mobile: "+91 2211009988",
    assignee: "Rahul Sharma",
    assigneeAvatar: "https://i.pravatar.cc/32?u=rahul3",
    lastModified: "1 month ago",
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
                    <DropdownMenuItem>
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
        {/* Navigation */}
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

        {/* Saved views — Collapsible */}
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
        {/* Getting Started Card */}
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

        {/* Bottom Icons */}
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

type Lead = (typeof leads)[number]

const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableResizing: false,
    header: () => <Checkbox />,
    cell: () => <Checkbox />,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <Avatar size="sm" className="shrink-0">
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback>{row.original.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="truncate font-medium text-foreground">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "organisation",
    header: "Organisation",
    size: 160,
    cell: ({ row }) => {
      const org = organisations.find(
        (o) => o.name === row.original.organisation
      )
      return (
        <div className="flex min-w-0 items-center gap-2">
          {org && (
            <Avatar size="sm" variant="square" className="shrink-0">
              <AvatarImage src={org.image} />
              <AvatarFallback>
                {row.original.organisation.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="truncate">{row.original.organisation}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 130,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="flex size-3.5 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: statusColors[row.original.status] }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: "white" }}
          />
        </span>
        <span className="truncate">{row.original.status}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "mobile",
    header: "Mobile no.",
    size: 160,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <PhoneIcon className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{row.original.mobile}</span>
      </div>
    ),
  },
  {
    accessorKey: "assignee",
    header: "Assigned to",
    size: 180,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <Avatar size="sm" className="shrink-0">
          <AvatarImage src={row.original.assigneeAvatar} />
          <AvatarFallback>{row.original.assignee.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="truncate">{row.original.assignee}</span>
      </div>
    ),
  },
  {
    accessorKey: "lastModified",
    header: "Last modified",
    size: 120,
  },
]

export default function CrmPage() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    columnResizeMode: "onChange",
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
                    <BreadcrumbLink href="/crm">Leads</BreadcrumbLink>
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
                  items={organisations.map((o) => ({
                    label: o.name,
                    value: o.name.toLowerCase(),
                    icon: ({ className }: { className?: string }) => (
                      <Avatar size="xs" variant="square" className={className}>
                        <AvatarImage src={o.image} />
                        <AvatarFallback>{o.name[0]}</AvatarFallback>
                      </Avatar>
                    ),
                  }))}
                  defaultValue="gumroad"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {organisations.map((o) => (
                      <SelectItem key={o.name} value={o.name.toLowerCase()}>
                        <Avatar size="xs" variant="square">
                          <AvatarImage src={o.image} />
                          <AvatarFallback>{o.name[0]}</AvatarFallback>
                        </Avatar>
                        {o.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  items={Object.keys(statusColors).map((s) => ({
                    label: s,
                    value: s.toLowerCase(),
                    icon: ({ className }: { className?: string }) => (
                      <span
                        className="flex size-3 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: statusColors[s] }}
                      >
                        <span className="size-1 rounded-full bg-white" />
                      </span>
                    ),
                  }))}
                  defaultValue="open"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {Object.keys(statusColors).map((s) => (
                      <SelectItem key={s} value={s.toLowerCase()}>
                        <span
                          className="flex size-3 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: statusColors[s] }}
                        >
                          <span className="size-1 rounded-full bg-white" />
                        </span>
                        {s}
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

          <div className="scrollbar-hide mt-2 min-h-0 min-w-0 flex-1 overflow-auto px-5 pb-5">
            <div className="[&>[data-slot=table-container]]:overflow-visible">
              <Table
                className="table-fixed"
                style={{
                  width: Math.max(table.getTotalSize(), 0),
                  minWidth: "100%",
                }}
              >
                <TableHeader className="group/thead sticky top-0 z-20 bg-background">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="relative"
                          style={{ width: header.getSize() }}
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <div
                              className="flex cursor-pointer items-center gap-1 select-none"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <ArrowUp className="size-3.5" />,
                                desc: <ArrowDown className="size-3.5" />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                          {header.column.getCanResize() && (
                            <div
                              onDoubleClick={() => header.column.resetSize()}
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className={`absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none group-hover/thead:opacity-100 before:absolute before:top-1/2 before:left-1/2 before:h-5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full ${
                                header.column.getIsResizing()
                                  ? "opacity-100 before:bg-primary"
                                  : "opacity-0 before:bg-border"
                              }`}
                            />
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
            <span className="text-base text-muted-foreground">18 of 32</span>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
