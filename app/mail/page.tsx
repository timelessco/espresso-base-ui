"use client"

import {
  Bell,
  ChevronDown,
  ChevronUp,
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
  ArrowRightFromLine,
  Zap,
  Home,
  Inbox,
  Star,
  AlertTriangle,
  Send,
  FileText,
  Tag,
  Users,
  CalendarDays,
  Clock,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  Trash2,
  Paperclip,
  Calendar,
  Pencil,
  Grid3X3,
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
import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/ui/header"
import { SubHeader } from "@/components/ui/sub-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const emails = [
  {
    from: "Michael Nguyen",
    avatar: "https://i.pravatar.cc/32?u=michael",
    starred: true,
    subject: "Don't forget to complete the user testing feedback form.",
    preview: "",
    icon: "paperclip",
    date: "Apr 10, 2024",
  },
  {
    from: "Sophie Rodriguez, Noah...",
    avatar: "https://i.pravatar.cc/32?u=sophie2",
    avatarExtra: "https://i.pravatar.cc/32?u=noah3",
    starred: false,
    subject: "Reminder",
    preview: "Complete peer code review for sprint deliverables.",
    icon: "calendar",
    date: "Apr 10, 2024",
  },
  {
    from: "Upstox daily",
    avatar: "",
    avatarLetter: "U",
    avatarColor: "#6B7280",
    starred: false,
    subject: "Asian Paints Q3 profit falls, Titan Q3 total income rises & more",
    preview: "NIFTY sectoral indices, Oil and Gas (+2.70%) and",
    icon: "",
    date: "Apr 10, 2024",
  },
  {
    from: "Behance",
    avatar: "",
    avatarLetter: "B",
    avatarColor: "#1769FF",
    starred: false,
    subject: "New Inspiration For You: Feb 5, 2025",
    preview:
      "New projects from people you follow like TACTYC Studio, Danny Ivan, and...",
    icon: "",
    date: "Apr 09, 2024",
  },
  {
    from: "Olivia Garcia",
    avatar: "https://i.pravatar.cc/32?u=olivia3",
    starred: true,
    subject: "Upcoming holiday:",
    preview: "Office closed on Labor Day.",
    icon: "",
    date: "Apr 09, 2024",
  },
  {
    from: "Coursera",
    avatar: "",
    avatarLetter: "C",
    avatarColor: "#0056D2",
    starred: false,
    subject:
      "We combed our catalog and found courses that we think match your interests.",
    preview: "Browse our recommendations bel...",
    icon: "",
    date: "Apr 08, 2024",
  },
  {
    from: "ET money",
    avatar: "",
    avatarLetter: "E",
    avatarColor: "#22C55E",
    starred: false,
    subject: "Hey, it's reserved only for you",
    preview:
      "Your family's dreams are unique & deserve a plan that's as special as the aspirat...",
    icon: "",
    date: "Apr 08, 2024",
  },
  {
    from: "Olivia Garcia",
    avatar: "https://i.pravatar.cc/32?u=olivia4",
    starred: false,
    subject: "The tool behind $5k+ app design wins",
    preview:
      "Quick question: Would you like to peek behind the curtain of successful...",
    icon: "",
    date: "Apr 08, 2024",
  },
  {
    from: "David Kim",
    avatar: "https://i.pravatar.cc/32?u=david2",
    starred: false,
    subject: "Q4 Planning Document Ready for Review",
    preview:
      "Hi team, I've uploaded the Q4 planning document to the shared drive...",
    icon: "",
    date: "Apr 07, 2024",
  },
  {
    from: "LinkedIn",
    avatar: "",
    avatarLetter: "in",
    avatarColor: "#0A66C2",
    starred: false,
    subject: "You appeared in 15 searches this week",
    preview: "See who's looking at your profile and new job recommendations...",
    icon: "",
    date: "Apr 07, 2024",
  },
  {
    from: "Emma Wilson",
    avatar: "https://i.pravatar.cc/32?u=emma",
    starred: true,
    subject: "Design review feedback",
    preview:
      "Great work on the latest mockups! I have a few suggestions for the navigation...",
    icon: "paperclip",
    date: "Apr 06, 2024",
  },
  {
    from: "GitHub",
    avatar: "",
    avatarLetter: "G",
    avatarColor: "#171717",
    starred: false,
    subject: "[espresso-ui] Pull request #42 merged",
    preview:
      "Your pull request 'feat: add data grid component' has been merged into main...",
    icon: "",
    date: "Apr 06, 2024",
  },
  {
    from: "Stripe",
    avatar: "",
    avatarLetter: "S",
    avatarColor: "#635BFF",
    starred: false,
    subject: "Your March invoice is ready",
    preview:
      "Your invoice for March 2024 is now available. Total amount: $149.00...",
    icon: "",
    date: "Apr 05, 2024",
  },
  {
    from: "Alex Chen",
    avatar: "https://i.pravatar.cc/32?u=alexc",
    starred: false,
    subject: "Lunch tomorrow?",
    preview:
      "Hey! Are you free for lunch tomorrow? There's a new place that just opened...",
    icon: "",
    date: "Apr 05, 2024",
  },
  {
    from: "Figma",
    avatar: "",
    avatarLetter: "F",
    avatarColor: "#A259FF",
    starred: false,
    subject: "What's new in Figma — March 2024",
    preview: "Auto layout improvements, new plugin API features, and more...",
    icon: "",
    date: "Apr 04, 2024",
  },
  {
    from: "Priya Patel",
    avatar: "https://i.pravatar.cc/32?u=priya3",
    starred: true,
    subject: "Client presentation slides",
    preview:
      "Attached are the final slides for tomorrow's client presentation. Please review...",
    icon: "paperclip",
    date: "Apr 04, 2024",
  },
  {
    from: "Notion",
    avatar: "",
    avatarLetter: "N",
    avatarColor: "#000000",
    starred: false,
    subject: "Your weekly digest",
    preview:
      "Here's what happened in your workspace this week. 12 pages updated, 3 new...",
    icon: "",
    date: "Apr 03, 2024",
  },
  {
    from: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/32?u=sarahj",
    starred: false,
    subject: "Re: Project timeline update",
    preview:
      "Thanks for the update. I think we should push the deadline by a week to...",
    icon: "",
    date: "Apr 03, 2024",
  },
  {
    from: "AWS",
    avatar: "",
    avatarLetter: "A",
    avatarColor: "#FF9900",
    starred: false,
    subject: "Your AWS bill for March 2024",
    preview:
      "Your total charges for the billing period ending March 31, 2024 are $87.23...",
    icon: "",
    date: "Apr 02, 2024",
  },
  {
    from: "James Park",
    avatar: "https://i.pravatar.cc/32?u=jamesp",
    starred: true,
    subject: "Weekend hackathon plan",
    preview:
      "Hey! I was thinking we could work on that side project this weekend. I've set up...",
    icon: "",
    date: "Apr 02, 2024",
  },
  {
    from: "Vercel",
    avatar: "",
    avatarLetter: "V",
    avatarColor: "#000000",
    starred: false,
    subject: "Deployment successful",
    preview:
      "Your project espresso-ui has been deployed to production. Build time: 45s...",
    icon: "",
    date: "Apr 01, 2024",
  },
  {
    from: "Maya Chen",
    avatar: "https://i.pravatar.cc/32?u=mayac",
    starred: false,
    subject: "Design system review notes",
    preview:
      "Here are my notes from today's design system review. Overall the components look...",
    icon: "paperclip",
    date: "Apr 01, 2024",
  },
  {
    from: "Slack",
    avatar: "",
    avatarLetter: "S",
    avatarColor: "#4A154B",
    starred: false,
    subject: "You have 12 unread messages",
    preview:
      "You missed some messages in #design-team and #engineering channels...",
    icon: "",
    date: "Mar 31, 2024",
  },
  {
    from: "Rahul Mehta",
    avatar: "https://i.pravatar.cc/32?u=rahulm",
    starred: false,
    subject: "API integration docs",
    preview:
      "I've finished documenting the REST API endpoints. Please review the swagger...",
    icon: "paperclip",
    date: "Mar 31, 2024",
  },
  {
    from: "Google Cloud",
    avatar: "",
    avatarLetter: "G",
    avatarColor: "#4285F4",
    starred: false,
    subject: "Security alert: New sign-in",
    preview:
      "A new sign-in was detected on your Google Cloud account from a new device...",
    icon: "",
    date: "Mar 30, 2024",
  },
  {
    from: "Anita Desai",
    avatar: "https://i.pravatar.cc/32?u=anitad",
    starred: true,
    subject: "Congratulations on the launch!",
    preview:
      "Amazing work on shipping the new feature! The client loved the demo...",
    icon: "",
    date: "Mar 30, 2024",
  },
  {
    from: "Medium",
    avatar: "",
    avatarLetter: "M",
    avatarColor: "#000000",
    starred: false,
    subject: "Daily digest: Top stories for you",
    preview:
      "Building scalable design systems, Why TypeScript is winning, The future of...",
    icon: "",
    date: "Mar 29, 2024",
  },
  {
    from: "Tom Wilson",
    avatar: "https://i.pravatar.cc/32?u=tomw",
    starred: false,
    subject: "Sprint retrospective action items",
    preview:
      "Here are the action items from today's retro: 1. Improve PR review turnaround...",
    icon: "",
    date: "Mar 29, 2024",
  },
  {
    from: "Dropbox",
    avatar: "",
    avatarLetter: "D",
    avatarColor: "#0061FF",
    starred: false,
    subject: "Someone shared a folder with you",
    preview:
      "Marketing Assets 2024 has been shared with you by design@company.com...",
    icon: "",
    date: "Mar 28, 2024",
  },
  {
    from: "Lisa Wong",
    avatar: "https://i.pravatar.cc/32?u=lisaw",
    starred: false,
    subject: "Re: Brand guidelines update",
    preview:
      "I agree with the proposed color changes. Let's also update the typography...",
    icon: "",
    date: "Mar 28, 2024",
  },
  {
    from: "ProductHunt",
    avatar: "",
    avatarLetter: "P",
    avatarColor: "#DA552F",
    starred: false,
    subject: "You're featured on Product Hunt!",
    preview:
      "Congratulations! Your product has been featured and is trending on...",
    icon: "",
    date: "Mar 27, 2024",
  },
  {
    from: "Kevin Patel",
    avatar: "https://i.pravatar.cc/32?u=kevinp",
    starred: false,
    subject: "Database migration plan",
    preview:
      "Attached is the migration plan for moving from PostgreSQL 14 to 16...",
    icon: "paperclip",
    date: "Mar 27, 2024",
  },
  {
    from: "Twilio",
    avatar: "",
    avatarLetter: "T",
    avatarColor: "#F22F46",
    starred: false,
    subject: "Your monthly usage report",
    preview:
      "Here's a summary of your Twilio usage for March 2024. Total messages sent...",
    icon: "",
    date: "Mar 26, 2024",
  },
]

type Email = (typeof emails)[number]

const emailColumns: ColumnDef<Email>[] = [
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
    id: "starred",
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableResizing: false,
    enableSorting: false,
    header: () => <Star className="size-4 text-muted-foreground" />,
    cell: ({ row }) => (
      <Star
        className={`size-4 ${row.original.starred ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
      />
    ),
  },
  {
    accessorKey: "from",
    header: "From",
    size: 200,
    minSize: 120,
    cell: ({ row }) => {
      const email = row.original
      return (
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex shrink-0 items-center">
            {email.avatar ? (
              <Avatar size="xs">
                <AvatarImage src={email.avatar} />
                <AvatarFallback>{email.from.slice(0, 2)}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar size="xs">
                <AvatarFallback
                  style={{ backgroundColor: email.avatarColor, color: "white" }}
                  className="text-[9px] font-bold"
                >
                  {email.avatarLetter}
                </AvatarFallback>
              </Avatar>
            )}
            {email.avatarExtra && (
              <Avatar size="xs" className="-ml-2">
                <AvatarImage src={email.avatarExtra} />
                <AvatarFallback>+</AvatarFallback>
              </Avatar>
            )}
          </div>
          <span className="truncate font-medium text-foreground">
            {email.from}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    size: 500,
    minSize: 200,
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 font-medium text-foreground">
          {row.original.subject}
        </span>
        {row.original.preview && (
          <span className="truncate text-muted-foreground">
            {row.original.preview}
          </span>
        )}
        {row.original.icon === "paperclip" && (
          <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />
        )}
        {row.original.icon === "calendar" && (
          <Calendar className="size-3.5 shrink-0 text-muted-foreground" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 120,
    minSize: 80,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.date}</span>
    ),
  },
]

function MailSidebar() {
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
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#0466DC]">
                  <img src="/images/svg/logo-mail.svg" alt="Mail" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mail</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Aditi Sharma
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
                  <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-[#0466DC]">
                    <img src="/images/svg/logo-mail.svg" alt="Mail" />
                  </div>
                  <div className="grid text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      Mail
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Aditi Sharma
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
                <SidebarMenuButton
                  tooltip="Home"
                  className="h-7 text-base font-normal!"
                >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Inbox"
                  className="h-7 text-base font-normal!"
                  data-active
                >
                  <Inbox />
                  <span>Inbox</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>5</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Starred"
                  className="h-7 text-base font-normal!"
                >
                  <Star />
                  <span>Starred</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Important"
                  className="h-7 text-base font-normal!"
                >
                  <AlertTriangle />
                  <span>Important</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Sent"
                  className="h-7 text-base font-normal!"
                >
                  <Send />
                  <span>Sent</span>
                </SidebarMenuButton>
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
                  tooltip="Categories"
                  className="h-7 text-base font-normal!"
                >
                  <Tag />
                  <span>Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Contacts"
                  className="h-7 text-base font-normal!"
                >
                  <Users />
                  <span>Contacts</span>
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
                  tooltip="Schedules"
                  className="h-7 text-base font-normal!"
                >
                  <Clock />
                  <span>Schedules</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Notebook"
                  className="h-7 text-base font-normal!"
                >
                  <BookOpen />
                  <span>Notebook</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="To-do's"
                  className="h-7 text-base font-normal!"
                >
                  <CheckCircle2 />
                  <span>To-do&apos;s</span>
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
                  tooltip="Spam"
                  className="h-7 text-base font-normal!"
                >
                  <ShieldAlert />
                  <span>Spam</span>
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
          <SidebarGroupLabel>Labels</SidebarGroupLabel>
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
                    <span>Fashion</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="gap-0.5 pl-4">
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <span className="size-3 rounded-sm bg-orange-400" />
                          <span>Projects</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="h-7 text-base font-normal!">
                          <span className="size-3 rounded-sm bg-green-400" />
                          <span>Events</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Upcoming events
                </span>
                <span className="text-xs text-muted-foreground">5</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-lg border border-border-soft bg-background px-3 py-2 shadow-xs">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-8 w-0.5 shrink-0 rounded-full bg-blue-500" />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        4:00 - 4:30PM
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        Branding changes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-border-soft bg-background px-3 py-2 shadow-xs">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-8 w-0.5 shrink-0 rounded-full bg-red-500" />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        4:00 - 4:30PM
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        Website design meeting
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-border-soft bg-background px-3 py-2 shadow-xs">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-8 w-0.5 shrink-0 rounded-full bg-orange-400" />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        4:00 - 4:30PM
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        Feedback loops within the...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 pb-4">
        <div className="mx-2 flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-medium text-foreground">Storage</span>
          <Progress value={34} className="h-1.5" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              679 GB of 2 TB
            </span>
            <span className="text-xs text-muted-foreground">Manage</span>
          </div>
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

export default function MailPage() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: emails,
    columns: emailColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    columnResizeMode: "onChange",
  })

  return (
    <SidebarProvider>
      <MailSidebar />
      <SidebarInset className="h-screen min-w-0 overflow-hidden">
        <SidebarTrigger className="sr-only" />
        <div className="flex h-full min-w-0 flex-col overflow-hidden">
          <Header
            className="px-5"
            leftControls={
              <span className="text-lg font-medium text-foreground">Inbox</span>
            }
            centerControls={
              <Tabs defaultValue="primary">
                <TabsList
                  variant="line"
                  className="py-2.25 group-data-horizontal/tabs:h-auto"
                >
                  <TabsIndicator />
                  <TabsTrigger value="primary">
                    Primary{" "}
                    <Badge variant="secondary" size="md">
                      24
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="promotions">Promotions</TabsTrigger>
                </TabsList>
              </Tabs>
            }
            rightControls={
              <>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Search className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Workflow className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Grid3X3 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Sparkles className="size-4" />
                </Button>
                <Button size="sm">
                  <Pencil className="size-4" />
                  Compose
                </Button>
              </>
            }
          />

          <SubHeader
            leftControls={
              <>
                <Checkbox />
                <ChevronDown className="size-3.5 text-muted-foreground" />
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="size-3" />
                  Has attachment
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="size-3" />
                  Image
                </Button>
                <Button variant="outline" size="sm">
                  PDF
                </Button>
                <Select
                  items={[
                    { label: "From", value: "from" },
                    { label: "Anyone", value: "anyone" },
                    { label: "Me", value: "me" },
                  ]}
                  defaultValue="from"
                  variant="outline"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="from">From</SelectItem>
                    <SelectItem value="anyone">Anyone</SelectItem>
                    <SelectItem value="me">Me</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "Any time", value: "anytime" },
                    { label: "Today", value: "today" },
                    { label: "This week", value: "week" },
                    { label: "This month", value: "month" },
                    { label: "This year", value: "year" },
                  ]}
                  defaultValue="anytime"
                  variant="outline"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="anytime">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  items={[
                    { label: "To", value: "to" },
                    { label: "Me", value: "me-to" },
                    { label: "Anyone", value: "anyone-to" },
                  ]}
                  defaultValue="to"
                  variant="outline"
                  size="sm"
                >
                  <SelectTrigger suffixIcon={<ChevronDown />}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="to">To</SelectItem>
                    <SelectItem value="me-to">Me</SelectItem>
                    <SelectItem value="anyone-to">Anyone</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Is unread
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Advanced search
                </Button>
              </>
            }
            rightControls={
              <span className="text-xs text-muted-foreground">
                1-50 of 2,000
              </span>
            }
          />

          {/* Email list */}
          <div className="scrollbar-hide mt-2 min-h-0 min-w-0 flex-1 overflow-auto pb-5">
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
                      {headerGroup.headers.map((header, index) => (
                        <TableHead
                          key={header.id}
                          className={`relative ${index === 0 ? "px-5" : ""}`}
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
                    <TableRow
                      key={row.id}
                      className="cursor-pointer [&>*:first-child]:rounded-l-none [&>*:last-child]:rounded-r-none"
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={cell.id}
                          className={index === 0 ? "pl-5" : ""}
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
    </SidebarProvider>
  )
}
