"use client"

import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  LogOut,
  AppWindow,
  User,
  Moon,
  CircleAlert,
  Boxes,
  CircleHelp,
  PanelRight,
  ArrowRightFromLine,
  Zap,
  Plus,
  Home,
  FileText,
  ListTodo,
  BookOpen,
  Inbox,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Ellipsis,
  Calendar,
  Circle,
  GitBranch,
  FileCode,
  Truck,
  BarChart3,
  Hash,
  Target,
  Infinity,
  Users,
  Compass,
  Coffee,
  Palmtree,
  LineChart,
  Crosshair,
  SquarePen,
  Check,
  Archive,
  ClipboardCopy,
  Trash2,
  Workflow,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
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
import { Kbd } from "@/components/ui/kbd"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
} from "@/components/ui/sidebar"

const tasks = [
  {
    title: "Version 14 Release",
    project: "General",
    priority: "Low",
    tags: ["Design", "Help"],
    extraTags: 1,
    due: "3 Sept",
  },
  {
    title: "Hyper-verge landing page",
    project: "Trainings",
    priority: "High",
    tags: ["App", "Frappe"],
    extraTags: 2,
    due: "10 Sept",
  },
  {
    title: "New design system",
    project: "Uncategorised",
    priority: "High",
    tags: ["Mobile"],
    extraTags: 0,
    due: "24 Sept",
  },
  {
    title: "Client feedback",
    project: "Meta",
    priority: "Low",
    tags: ["Opensource"],
    extraTags: 0,
    due: "5 Oct",
  },
  {
    title: "Content strategy",
    project: "Approved",
    priority: "Low",
    tags: ["Mobile", "App"],
    extraTags: 2,
    due: "15 Oct",
  },
  {
    title: "Calendar update",
    project: "Fun points",
    priority: "Low",
    tags: ["Help", "Frappe"],
    extraTags: 2,
    due: "17 Sept",
  },
  {
    title: "Version 14 Release date",
    project: "General",
    priority: "Medium",
    tags: ["App"],
    extraTags: 0,
    due: "17 Sept",
  },
]

type Task = (typeof tasks)[number]

const tagColors: Record<string, string> = {
  Design: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Help: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  App: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Frappe: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Mobile:
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Opensource:
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
}

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableResizing: false,
    enableSorting: false,
    header: () => <Checkbox />,
    cell: () => <Checkbox className="rounded-full" />,
  },
  {
    accessorKey: "title",
    header: "Task title",
    size: 250,
    minSize: 150,
    cell: ({ row }) => (
      <span className="truncate font-medium text-foreground">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: "project",
    header: "Project",
    size: 140,
    minSize: 100,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    size: 100,
    minSize: 70,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 200,
    minSize: 120,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-1">
        {row.original.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            size="md"
            className={tagColors[tag] ?? ""}
          >
            {tag}
          </Badge>
        ))}
        {row.original.extraTags > 0 && (
          <Badge variant="secondary" size="md">
            +{row.original.extraTags}
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "due",
    header: "Due",
    size: 120,
    minSize: 80,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-1.5">
        <Calendar className="size-3.5 shrink-0" />
        <span>{row.original.due}</span>
      </div>
    ),
  },
]

const teams = [
  { name: "Product", icon: GitBranch, count: 43 },
  { name: "Operations", icon: Crosshair, count: 26 },
  { name: "Open FLC", icon: FileCode, count: 13 },
  { name: "Delivery team", icon: Truck, count: 8 },
  { name: "Sales", icon: BarChart3, count: 26 },
  { name: "Framework", icon: Hash, count: 12 },
  { name: "Team coffee", icon: Coffee, count: 9 },
  { name: "Vacation", icon: Palmtree, count: 24 },
  { name: "Frappe analytics", icon: LineChart, count: 17 },
  { name: "Goals", icon: Target, count: 9 },
  { name: "Quality", icon: Infinity, count: 3 },
  { name: "Team out", icon: Users, count: 0 },
  { name: "Adventure", icon: Compass, count: 0 },
  { name: "DevOps", icon: Workflow, count: 0 },
]

const subItems = ["General", "Standups", "Training", "Update"]

function GameplanSidebar() {
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
                  <img src="/images/svg/logo-gameplan.svg" alt="Gameplan" />
                </div>
                <div className="grid flex-1 text-left">
                  <span className="truncate pb-0.5 text-base font-medium text-foreground">
                    Gameplan
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
                    <img src="/images/svg/logo-gameplan.svg" alt="Gameplan" />
                  </div>
                  <div className="grid text-left">
                    <span className="truncate pb-0.5 text-base font-medium text-foreground">
                      Gameplan
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
                  <Kbd className="ml-auto">⌘ K</Kbd>
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
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inbox" className="h-7 text-base">
                  <Inbox />
                  <span>Inbox</span>
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
                  tooltip="Home"
                  className="h-7 text-base font-normal!"
                  data-active
                >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>23</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Drafts"
                  className="h-7 text-base font-normal!"
                >
                  <FileText />
                  <span>Drafts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Tasks"
                  className="h-7 text-base font-normal!"
                >
                  <ListTodo />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Pages"
                  className="h-7 text-base font-normal!"
                >
                  <BookOpen />
                  <span>Pages</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <div className="flex items-center justify-between pr-0 pb-1 pl-2">
              <span className="text-acccent-foreground text-base font-normal">
                Teams
              </span>
              <Button variant="ghost" size="sm">
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
                    {team.count > 0 && (
                      <SidebarMenuBadge>{team.count}</SidebarMenuBadge>
                    )}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {subItems.map((item) => (
                          <SidebarMenuSubItem key={item}>
                            <SidebarMenuSubButton
                              href="#"
                              className="text-base!"
                            >
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
            <Button variant="ghost" size="xs" className="mt-1">
              More archived teams
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 pb-4">
        <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
            <Button variant="ghost" size="icon-xs">
              <Zap className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-xs">
              <CircleHelp className="size-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
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

export default function GameplanPage() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    columnResizeMode: "onChange",
  })

  return (
    <SidebarProvider>
      <GameplanSidebar />
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
                      <BreadcrumbLink
                        href="/gameplan"
                        className="flex items-center gap-1.5"
                      >
                        <Zap className="size-4" />
                        Products
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/gameplan">General</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Task</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </>
            }
            rightControls={
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="sm" />}
                  >
                    <Ellipsis className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <SquarePen className="size-4" />
                      Edit task
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ListTodo className="size-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="size-4" />
                      Mark complete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="size-4" />
                      Archive task
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ClipboardCopy className="size-4" />
                      Copy task id
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Plus />
                  New task
                </Button>
              </>
            }
          />
          <div className="mx-auto max-w-4xl">
            <SubHeader
              className="scrollbar-hide overflow-x-auto [&_[data-slot=sub-header-left]]:shrink-0 [&_[data-slot=sub-header-left]>*]:shrink-0 [&_[data-slot=sub-header-right]]:shrink-0 [&_[data-slot=sub-header-right]>*]:shrink-0"
              leftControls={
                <span className="text-base font-medium text-foreground">
                  Tasks
                </span>
              }
              rightControls={
                <Select
                  items={[
                    { label: "Open", value: "open" },
                    { label: "Closed", value: "closed" },
                    { label: "All", value: "all" },
                  ]}
                  defaultValue="open"
                >
                  <SelectTrigger
                    variant="subtle"
                    size="sm"
                    suffix={<ChevronDown />}
                  >
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Open", value: "open" },
                          { label: "Closed", value: "closed" },
                          { label: "All", value: "all" },
                        ]
                        const item = items.find((i) => i.value === value)
                        return (
                          <>
                            <ArrowUpDown className="size-4" />
                            {item?.label ?? "Open"}
                          </>
                        )
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start">
                    <SelectGroup>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  <TableHeader className="group/thead sticky top-0 z-20 bg-background [&_th]:after:absolute [&_th]:after:inset-x-0 [&_th]:after:bottom-0 [&_th]:after:h-px [&_th]:after:bg-border-soft [&_th]:after:content-[''] has-[+tbody>tr:first-child:hover]:[&_th]:after:bg-transparent [&_tr]:border-b-0">
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
                                }[header.column.getIsSorted() as string] ??
                                  null}
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
