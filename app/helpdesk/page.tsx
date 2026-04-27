"use client"

import {
  Bell,
  ChevronDown,
  ClipboardList,
  Search,
  Users,
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
  Columns3,
  ListFilter,
  ArrowUpDown,
  Ellipsis,
  Ticket,
  BookOpen,
  MessageSquareReply,
  Star,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useState, useRef, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/ui/header"
import { SubHeader } from "@/components/ui/sub-header"
import { Input } from "@/components/ui/input"
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

const statusColors: Record<string, string> = {
  New: "#3B82F6",
  Resolved: "#22C55E",
  Closed: "#9CA3AF",
  Replied: "#8B5CF6",
  "Awaiting app...": "#F59E0B",
  "Awaiting Cus...": "#F97316",
  Quotation: "#06B6D4",
  "In Progress": "#3B82F6",
  "Not Started": "#9CA3AF",
  Pending: "#F59E0B",
}

const tickets = [
  { id: "#06070", ticket: "Update website content for new products", status: "New", firstDue: "22h 30m", resolution: "22h 30m", priority: "Medium", type: "Incident", assignee: "Jay", assigneeAvatar: "https://i.pravatar.cc/32?u=jay", team: "Marketing", customer: "Namma yathri" },
  { id: "#06069", ticket: "Prepare presentation for client pitch", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Incident", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep", team: "Creative", customer: "Timeless" },
  { id: "06065", ticket: "Analyze competitors' marketing strategies", status: "New", firstDue: "2h 30m", resolution: "2h 30m", priority: "Low", type: "Incident", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep2", team: "Marketing", customer: "Agency" },
  { id: "06063", ticket: "Create marketing materials for the campaign", status: "New", firstDue: "0h 35m", resolution: "0h 35m", priority: "High", type: "Incident", assignee: "Jay", assigneeAvatar: "https://i.pravatar.cc/32?u=jay2", team: "Marketing", customer: "CRED" },
  { id: "06059", ticket: "Create marketing materials for the campaign", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Low", type: "Bug", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep3", team: "Marketing", customer: "TCS" },
  { id: "06058", ticket: "Develop social media strategy for next quarter", status: "Awaiting app...", firstDue: "Failed", resolution: "Failed", priority: "High", type: "Bug", assignee: "Gowtham", assigneeAvatar: "https://i.pravatar.cc/32?u=gowtham", team: "Marketing", customer: "Pentagram" },
  { id: "06056", ticket: "Develop social media strategy for next quarter", status: "Awaiting app...", firstDue: "Failed", resolution: "Failed", priority: "Medium", type: "Incident", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep4", team: "Marketing", customer: "Crew" },
  { id: "06066", ticket: "Conduct user feedback sessions for product", status: "Quotation", firstDue: "Failed", resolution: "Failed", priority: "Medium", type: "Incident", assignee: "Jay", assigneeAvatar: "https://i.pravatar.cc/32?u=jay3", team: "Product", customer: "InsightsCorp" },
  { id: "06055", ticket: "Optimise website SEO for better visibility", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Low", type: "Incident", assignee: "Gowtham", assigneeAvatar: "https://i.pravatar.cc/32?u=gowtham2", team: "Marketing", customer: "WebSolutions" },
  { id: "06054", ticket: "Update website content for new products", status: "Closed", firstDue: "Failed", resolution: "Failed", priority: "Low", type: "Bug", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep5", team: "Marketing", customer: "Namma yathri" },
  { id: "06053", ticket: "Prepare presentation for client pitch", status: "Awaiting Cus...", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Bug", assignee: "Gowtham", assigneeAvatar: "https://i.pravatar.cc/32?u=gowtham3", team: "Creative", customer: "Timeless" },
  { id: "06052", ticket: "Analyze competitors' marketing strategies", status: "New", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Incident", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep6", team: "Marketing", customer: "Agency" },
  { id: "06051", ticket: "Create marketing materials for the campaign", status: "Replied", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Incident", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep7", team: "Marketing", customer: "CRED" },
  { id: "06050", ticket: "Launch email campaign targeting new subscribers", status: "New", firstDue: "1h 45m", resolution: "1h 45m", priority: "High", type: "Incident", assignee: "Jay", assigneeAvatar: "https://i.pravatar.cc/32?u=jay4", team: "Creative", customer: "Timeless" },
  { id: "06049", ticket: "Conduct A/B testing for website landing page", status: "In Progress", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Bug", assignee: "Gowtham", assigneeAvatar: "https://i.pravatar.cc/32?u=gowtham4", team: "Product", customer: "WebSolutions" },
  { id: "06050", ticket: "Revamp mobile app interface for improved", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "High", type: "Unspecified", assignee: "Aisha", assigneeAvatar: "https://i.pravatar.cc/32?u=aisha", team: "Design", customer: "AppInnovations" },
  { id: "06051", ticket: "Integrate payment gateway for e-commerce", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "High", type: "Bug", assignee: "Rajesh", assigneeAvatar: "https://i.pravatar.cc/32?u=rajesh", team: "Development", customer: "ShopTech" },
  { id: "06052", ticket: "Conduct user research for new product features", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Incident", assignee: "Jessica", assigneeAvatar: "https://i.pravatar.cc/32?u=jessica", team: "UX", customer: "InnovativeIdeas" },
  { id: "06053", ticket: "Update content strategy for social media channels", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Low", type: "Bug", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep8", team: "Marketing", customer: "SocialMediaMasters" },
  { id: "06054", ticket: "Optimize website load time and performance", status: "Not Started", firstDue: "Pending", resolution: "Pending", priority: "High", type: "Improvement", assignee: "Lina", assigneeAvatar: "https://i.pravatar.cc/32?u=lina", team: "Engineering", customer: "TechSolutions" },
  { id: "06055", ticket: "Design new onboarding flow for mobile users", status: "New", firstDue: "4h 15m", resolution: "4h 15m", priority: "High", type: "Incident", assignee: "Aisha", assigneeAvatar: "https://i.pravatar.cc/32?u=aisha2", team: "Design", customer: "AppInnovations" },
  { id: "06056", ticket: "Fix authentication bug in production", status: "In Progress", firstDue: "1h 10m", resolution: "1h 10m", priority: "High", type: "Bug", assignee: "Rajesh", assigneeAvatar: "https://i.pravatar.cc/32?u=rajesh2", team: "Development", customer: "ShopTech" },
  { id: "06057", ticket: "Create quarterly performance report", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Low", type: "Incident", assignee: "Jay", assigneeAvatar: "https://i.pravatar.cc/32?u=jay5", team: "Marketing", customer: "Agency" },
  { id: "06058", ticket: "Set up monitoring alerts for API endpoints", status: "New", firstDue: "3h 20m", resolution: "3h 20m", priority: "Medium", type: "Improvement", assignee: "Gowtham", assigneeAvatar: "https://i.pravatar.cc/32?u=gowtham5", team: "Engineering", customer: "WebSolutions" },
  { id: "06059", ticket: "Review and update privacy policy documentation", status: "Closed", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Low", type: "Incident", assignee: "Jessica", assigneeAvatar: "https://i.pravatar.cc/32?u=jessica2", team: "Legal", customer: "Timeless" },
  { id: "06060", ticket: "Implement dark mode for dashboard", status: "Awaiting app...", firstDue: "Failed", resolution: "Failed", priority: "Medium", type: "Improvement", assignee: "Lina", assigneeAvatar: "https://i.pravatar.cc/32?u=lina2", team: "Design", customer: "CRED" },
  { id: "06061", ticket: "Migrate database to new cloud provider", status: "In Progress", firstDue: "12h 0m", resolution: "12h 0m", priority: "High", type: "Bug", assignee: "Rajesh", assigneeAvatar: "https://i.pravatar.cc/32?u=rajesh3", team: "Engineering", customer: "TechSolutions" },
  { id: "06062", ticket: "Train support team on new ticket workflow", status: "Resolved", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Low", type: "Incident", assignee: "Sandeep", assigneeAvatar: "https://i.pravatar.cc/32?u=sandeep9", team: "Support", customer: "Namma yathri" },
  { id: "06063", ticket: "Build analytics dashboard for customer metrics", status: "New", firstDue: "6h 45m", resolution: "6h 45m", priority: "Medium", type: "Improvement", assignee: "Gowtham", assigneeAvatar: "https://i.pravatar.cc/32?u=gowtham6", team: "Product", customer: "InsightsCorp" },
  { id: "06064", ticket: "Resolve billing discrepancy for enterprise client", status: "Replied", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "High", type: "Bug", assignee: "Jay", assigneeAvatar: "https://i.pravatar.cc/32?u=jay6", team: "Finance", customer: "Pentagram" },
  { id: "06065", ticket: "Update API documentation for v3 release", status: "Closed", firstDue: "Fulfilled", resolution: "Fulfilled", priority: "Medium", type: "Incident", assignee: "Jessica", assigneeAvatar: "https://i.pravatar.cc/32?u=jessica3", team: "Development", customer: "Crew" },
]

type Ticket = (typeof tickets)[number]

const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableResizing: false,
    enableSorting: false,
    header: () => <Checkbox />,
    cell: () => <Checkbox />,
  },
  {
    accessorKey: "id",
    header: "Id",
    size: 80,
    minSize: 60,
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "ticket",
    header: "Ticket",
    size: 300,
    minSize: 150,
    cell: ({ row }) => (
      <span className="truncate">{row.original.ticket}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 130,
    minSize: 80,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="flex size-3.5 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: statusColors[row.original.status] ?? "#9CA3AF" }}
        >
          <span className="size-1.5 rounded-full bg-white" />
        </span>
        <span className="truncate">{row.original.status}</span>
      </div>
    ),
  },
  {
    accessorKey: "firstDue",
    header: "First due",
    size: 100,
    minSize: 70,
  },
  {
    accessorKey: "resolution",
    header: "Resolution",
    size: 100,
    minSize: 70,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    size: 100,
    minSize: 70,
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 100,
    minSize: 70,
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    size: 140,
    minSize: 100,
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
    accessorKey: "team",
    header: "Team",
    size: 120,
    minSize: 80,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    size: 140,
    minSize: 100,
  },
  {
    id: "star",
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableResizing: false,
    enableSorting: false,
    header: () => <Star className="size-4 text-muted-foreground" />,
    cell: () => <Star className="size-4 text-amber-400 fill-amber-400" />,
  },
]

function ScrollShadow({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [shadowTop, setShadowTop] = useState(false)
  const [shadowBottom, setShadowBottom] = useState(true)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setShadowTop(el.scrollTop > 0)
    setShadowBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1)
  }, [])

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-background to-transparent transition-opacity duration-200 ${
          shadowTop ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide size-full overflow-auto px-5 pt-2 pb-5"
      >
        {children}
      </div>
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-background to-transparent transition-opacity duration-200 ${
          shadowBottom ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

function HelpdeskSidebar() {
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
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#7D42FB]">
                  <img src="/images/svg/logo-helpDesk.svg" alt="Helpdesk" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Helpdesk</span>
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
                  <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#7D42FB]">
                    <img src="/images/svg/logo-helpDesk.svg" alt="Helpdesk" />
                  </div>
                  <div className="grid text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      Helpdesk
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
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#DB4EE0] text-white">
                        <img src="/images/svg/logo-crm.svg" alt="CRM" className="size-4" />
                      </div>
                      CRM
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#7D42FB] text-white">
                        <img src="/images/svg/logo-helpDesk.svg" alt="Helpdesk" className="size-4" />
                      </div>
                      Helpdesk
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#016E7D] text-white">
                        <img src="/images/svg/logo-drive.svg" alt="Drive" className="size-4" />
                      </div>
                      Drive
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#0466DC] text-white">
                        <img src="/images/svg/logo-mail.svg" alt="Mail" className="size-4" />
                      </div>
                      Mail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#FF8F26] text-white">
                        <img src="/images/svg/logo-gameplan.svg" alt="Game Plan" className="size-4" />
                      </div>
                      Gameplan
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
                <SidebarMenuButton tooltip="Notifications" className="h-7 text-base">
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
                <SidebarMenuButton tooltip="Tickets" className="h-7 text-base font-normal!" data-active>
                  <Ticket />
                  <span>Tickets</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Knowledge Base" className="h-7 text-base font-normal!">
                  <BookOpen />
                  <span>Knowledge Base</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Canned response" className="h-7 text-base font-normal!">
                  <MessageSquareReply />
                  <span>Canned response</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Customers" className="h-7 text-base font-normal!">
                  <Users />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Contacts" className="h-7 text-base font-normal!">
                  <Users />
                  <span>Contacts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <Collapsible defaultOpen className="group/collapsible group-data-[collapsible=icon]:hidden">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronDown className="size-3! shrink-0 -rotate-90 stroke-[2.25] text-sidebar-accent-foreground transition-all duration-200 ease-in-out group-data-open/collapsible:rotate-0" />
                    <span>Saved views</span>
                    <Plus className="ml-auto size-3.5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Resolved tickets</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Closed tickets</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>My tickets</span>
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
            <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
              <Zap className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
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

export default function HelpdeskPage() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: tickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    columnResizeMode: "onChange",
  })

  return (
    <SidebarProvider>
      <HelpdeskSidebar />
      <SidebarInset className="h-screen min-w-0 overflow-hidden">
        <SidebarTrigger className="sr-only" />
        <div className="flex h-full min-w-0 flex-col overflow-hidden">
          <Header
            leftControls={
              <Breadcrumb size="md">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Tickets</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            }
            rightControls={
              <Button size="sm">
                <Plus />
                New Ticket
              </Button>
            }
          />
          <SubHeader
            leftControls={
              <div className="relative">
                <Sparkles className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder='Try "first due" or ticket type'
                  className="h-7 w-64 pl-8 text-sm"
                />
              </div>
            }
            rightControls={
              <>
                <Select
                  items={[
                    { label: "Title", value: "title" },
                    { label: "Id", value: "id" },
                    { label: "Status", value: "status" },
                    { label: "Priority", value: "priority" },
                  ]}
                  defaultValue="title"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Title", value: "title" },
                          { label: "Id", value: "id" },
                          { label: "Status", value: "status" },
                          { label: "Priority", value: "priority" },
                        ]
                        const item = items.find((i) => i.value === value)
                        return (<><ListFilter className="size-4" />{item?.label ?? "Title"}</>)
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="id">Id</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "Name", value: "name" },
                    { label: "Assignee", value: "assignee" },
                    { label: "Customer", value: "customer" },
                  ]}
                  defaultValue="name"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="assignee">Assignee</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "Column", value: "column" },
                    { label: "Id", value: "id" },
                    { label: "Ticket", value: "ticket" },
                    { label: "Status", value: "status" },
                    { label: "First due", value: "first-due" },
                    { label: "Resolution", value: "resolution" },
                    { label: "Priority", value: "priority" },
                    { label: "Type", value: "type" },
                    { label: "Assignee", value: "assignee" },
                    { label: "Team", value: "team" },
                    { label: "Customer", value: "customer" },
                  ]}
                  defaultValue="column"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Column", value: "column" },
                          { label: "Id", value: "id" },
                          { label: "Ticket", value: "ticket" },
                          { label: "Status", value: "status" },
                          { label: "First due", value: "first-due" },
                          { label: "Resolution", value: "resolution" },
                          { label: "Priority", value: "priority" },
                          { label: "Type", value: "type" },
                          { label: "Assignee", value: "assignee" },
                          { label: "Team", value: "team" },
                          { label: "Customer", value: "customer" },
                        ]
                        const item = items.find((i) => i.value === value)
                        return (<><Columns3 className="size-4" />{item?.label ?? "Column"}</>)
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="column">Column</SelectItem>
                    <SelectItem value="id">Id</SelectItem>
                    <SelectItem value="ticket">Ticket</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="first-due">First due</SelectItem>
                    <SelectItem value="resolution">Resolution</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                    <SelectItem value="assignee">Assignee</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </>
            }
          />

          <ScrollShadow className="min-h-0 min-w-0 flex-1">
            <Table className="table-fixed" style={{ width: Math.max(table.getTotalSize(), 0), minWidth: "100%" }}>
              <TableHeader className="group/thead">
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
                            className="flex cursor-pointer select-none items-center gap-1"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ArrowUp className="size-3.5" />,
                              desc: <ArrowDown className="size-3.5" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                        {header.column.getCanResize() && (
                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none group-hover/thead:opacity-100 before:absolute before:top-1/2 before:left-1/2 before:h-2.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full ${
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
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>

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
