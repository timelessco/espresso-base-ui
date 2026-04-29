"use client"

import {
  Bell,
  ChevronDown,
  Search,
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
  Home,
  Clock,
  Share2,
  Trash2,
  Heart,
  FileText,
  FolderOpen,
  Star,
  Upload,
  Download,
  Ellipsis,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  LayoutGrid,
  AlignJustify,
  Pencil,
  Copy,
  Move,
  Info,
  Link,
  CircleAlert as InfoIcon,
  MessageCircle,
  History,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/ui/header"
import { SubHeader } from "@/components/ui/sub-header"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
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

const files = [
  {
    name: "Tax submission docu...",
    type: "folder",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me1",
    size: "47.4 MB",
    modified: "Yesterday",
  },
  {
    name: "Photos",
    type: "folder",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me2",
    size: "47.4 MB",
    modified: "2 days ago",
  },
  {
    name: "Abcd",
    type: "folder",
    owner: "8 People",
    ownerAvatar: "https://i.pravatar.cc/32?u=group1",
    size: "47.4 MB",
    modified: "2 days ago",
  },
  {
    name: "Abode collections",
    type: "folder",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me3",
    size: "47.4 MB",
    modified: "1 week ago",
  },
  {
    name: "Mango mist - outing",
    type: "folder",
    owner: "3 People",
    ownerAvatar: "https://i.pravatar.cc/32?u=group2",
    size: "47.4 MB",
    modified: "1 week ago",
  },
  {
    name: "Procreate illustrations",
    type: "folder",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me4",
    size: "47.4 MB",
    modified: "3 weeks ago",
  },
  {
    name: "video2023081822p54...",
    type: "folder",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me5",
    size: "47.4 MB",
    modified: "2 days ago",
  },
  {
    name: "Satoshi.zip",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me6",
    size: "74 KB",
    modified: "22 Jun 2023",
  },
  {
    name: "Ball.jpg",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me7",
    size: "47.4 MB",
    modified: "Jan 16 2023",
  },
  {
    name: "Untitled2023.psd",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me8",
    size: "47.4 MB",
    modified: "May 28 2023",
  },
  {
    name: "Orginal_image.jpg",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me9",
    size: "47.4 MB",
    modified: "May 28 2023",
  },
  {
    name: "New_catalogue.pdf",
    type: "file",
    owner: "11 People",
    ownerAvatar: "https://i.pravatar.cc/32?u=group3",
    size: "47.4 MB",
    modified: "May 28 2023",
  },
  {
    name: "Illustration.aed",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me10",
    size: "47.4 MB",
    modified: "May 22 2023",
  },
  {
    name: "Illustration.skt",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me11",
    size: "58.9 mb",
    modified: "May 1 2023",
  },
  {
    name: "town-10169.mp3",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me12",
    size: "47.4 MB",
    modified: "May 1 2023",
  },
  {
    name: "Orginal_list.xlsx",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me13",
    size: "47.4 MB",
    modified: "Apr 12 2023",
  },
  {
    name: "Illustration_updel...pdf",
    type: "file",
    owner: "2 People",
    ownerAvatar: "https://i.pravatar.cc/32?u=group4",
    size: "47.4 MB",
    modified: "May 31 2023",
  },
  {
    name: "Mosaic menu.pdf",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me14",
    size: "47.4 MB",
    modified: "Jan 1 2023",
  },
  {
    name: "Project_brief.docx",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me15",
    size: "12.3 MB",
    modified: "Mar 15 2023",
  },
  {
    name: "Budget_2024.xlsx",
    type: "file",
    owner: "5 People",
    ownerAvatar: "https://i.pravatar.cc/32?u=group5",
    size: "8.7 MB",
    modified: "Feb 20 2023",
  },
  {
    name: "Logo_final.svg",
    type: "file",
    owner: "Just you",
    ownerAvatar: "https://i.pravatar.cc/32?u=me16",
    size: "1.2 MB",
    modified: "Dec 5 2022",
  },
  {
    name: "Meeting_notes.pdf",
    type: "file",
    owner: "3 People",
    ownerAvatar: "https://i.pravatar.cc/32?u=group6",
    size: "4.5 MB",
    modified: "Nov 18 2022",
  },
]

type DriveFile = (typeof files)[number]

const columns: ColumnDef<DriveFile>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 280,
    minSize: 150,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <FolderOpen
          className={`size-4 shrink-0 ${row.original.type === "folder" ? "text-muted-foreground" : "hidden"}`}
        />
        <FileText
          className={`size-4 shrink-0 ${row.original.type === "file" ? "text-muted-foreground" : "hidden"}`}
        />
        <span className="truncate font-medium text-foreground">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    size: 140,
    minSize: 100,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <Avatar size="xs" className="shrink-0">
          <AvatarImage src={row.original.ownerAvatar} />
          <AvatarFallback>{row.original.owner.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="truncate">{row.original.owner}</span>
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    size: 100,
    minSize: 70,
  },
  {
    accessorKey: "modified",
    header: "Date Of Modified",
    size: 160,
    minSize: 100,
  },
  {
    id: "actions",
    header: "Action",
    size: 140,
    minSize: 120,
    enableResizing: false,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        >
          <Star className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        >
          <Upload className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        >
          <Download className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground"
              />
            }
          >
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="size-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="size-4" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Move className="size-4" />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="size-4" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Info className="size-4" />
              Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

function DriveSidebar() {
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
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#016E7D]">
                  <img src="/images/svg/logo-drive.svg" alt="Drive" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Drive</span>
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
                  <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#016E7D]">
                    <img src="/images/svg/logo-drive.svg" alt="Drive" />
                  </div>
                  <div className="grid text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      Drive
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
                          alt="Gameplan"
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
                  tooltip="Home"
                  className="h-7 text-base font-normal!"
                  data-active
                >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Recents"
                  className="h-7 text-base font-normal!"
                >
                  <Clock />
                  <span>Recents</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Shared"
                  className="h-7 text-base font-normal!"
                >
                  <Share2 />
                  <span>Shared</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Trash"
                  className="h-7 text-base font-normal!"
                >
                  <Trash2 />
                  <span>Trash</span>
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
                    <ChevronDown className="size-3! shrink-0 -rotate-90 stroke-[2.25] text-sidebar-accent-foreground transition-all duration-200 ease-in-out group-data-open/collapsible:rotate-0" />
                    <span>views</span>
                    <Plus className="ml-auto size-3.5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="gap-0.5">
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <Heart />
                          <span>Favorites</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <FileText />
                          <span>Documents</span>
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
        <div className="mx-2 flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-medium text-foreground">Storage</span>
          <Progress value={80} className="h-1.5" />
          <span className="text-xs text-muted-foreground">
            679 GB of 2 TB &nbsp;&nbsp; 80%
          </span>
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

export default function DrivePage() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    columnResizeMode: "onChange",
  })

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <DriveSidebar />
      <SidebarInset className="min-w-0 overflow-hidden">
        <SidebarTrigger className="sr-only" />
        <div className="flex h-full min-w-0 flex-col overflow-hidden">
          <Header
            leftControls={
              <span className="text-lg font-medium text-foreground">
                My drive
              </span>
            }
            rightControls={
              <Button size="sm">
                <Upload />
                Upload
                <ChevronDown className="size-4" />
              </Button>
            }
          />
          <SubHeader
            leftControls={
              <span className="text-sm font-medium text-foreground">All</span>
            }
            rightControls={
              <>
                <Select
                  items={[
                    { label: "Open", value: "open" },
                    { label: "Preview", value: "preview" },
                    { label: "Download", value: "download" },
                  ]}
                  defaultValue="open"
                  variant="subtle"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue>
                      {(value) => {
                        const items = [
                          { label: "Open", value: "open" },
                          { label: "Preview", value: "preview" },
                          { label: "Download", value: "download" },
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
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="preview">Preview</SelectItem>
                    <SelectItem value="download">Download</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="secondary" size="icon-sm">
                  <Search className="size-4" />
                </Button>
                <Tabs defaultValue="list">
                  <TabsList>
                    <TabsIndicator />
                    <TabsTrigger value="grid">
                      <LayoutGrid className="size-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <AlignJustify className="size-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
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
                <TableHeader className="group/thead sticky top-0 z-20 bg-background [&_tr]:border-b-0 [&_th]:after:absolute [&_th]:after:inset-x-0 [&_th]:after:bottom-0 [&_th]:after:h-px [&_th]:after:bg-border-soft [&_th]:after:content-[''] has-[+tbody>tr:first-child:hover]:[&_th]:after:bg-transparent">
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
        </div>
      </SidebarInset>
      <aside className="flex w-12 shrink-0 flex-col items-center gap-3 border-l border-border-soft bg-background py-4">
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        >
          <InfoIcon className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        >
          <MessageCircle className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        >
          <History className="size-4" />
        </Button>
      </aside>
    </SidebarProvider>
  )
}
