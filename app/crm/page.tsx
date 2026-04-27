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
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#DB4EE0] text-white">
                        <img
                          src="/images/svg/logo-crm.svg"
                          alt="CRM"
                          className="size-4"
                        />
                      </div>
                      CRM
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#DB4EE0] text-white">
                        <img
                          src="/images/svg/logo-crm.svg"
                          alt="CRM"
                          className="size-4"
                        />
                      </div>
                      CRM Data Grid
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#7D42FB] text-white">
                        <img
                          src="/images/svg/logo-helpDesk.svg"
                          alt="Helpdesk"
                          className="size-4"
                        />
                      </div>
                      Helpdesk
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#016E7D] text-white">
                        <img
                          src="/images/svg/logo-drive.svg"
                          alt="Drive"
                          className="size-4"
                        />
                      </div>
                      Drive
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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

export default function CrmPage() {
  return (
    <SidebarProvider>
      <CrmSidebar />
      <SidebarInset>
        <SidebarTrigger className="sr-only" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="min-w-[200px]">Name</TableHead>
                    <TableHead className="min-w-[160px]">
                      Organisation
                    </TableHead>
                    <TableHead className="min-w-[130px]">Status</TableHead>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="min-w-[160px]">Mobile no.</TableHead>
                    <TableHead className="min-w-[180px]">Assigned to</TableHead>
                    <TableHead className="min-w-[120px]">
                      Last modified
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead, i) => {
                    const org = organisations.find(
                      (o) => o.name === lead.organisation
                    )
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback>
                                {lead.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">
                              {lead.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {org && (
                              <Avatar size="sm" variant="square">
                                <AvatarImage src={org.image} />
                                <AvatarFallback>
                                  {lead.organisation.slice(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <span>{lead.organisation}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className="flex size-3.5 shrink-0 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: statusColors[lead.status],
                              }}
                            >
                              <span
                                className="size-1.5 rounded-full"
                                style={{
                                  backgroundColor: "white",
                                }}
                              />
                            </span>
                            <span>{lead.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="size-3.5 text-muted-foreground" />
                            <span>{lead.mobile}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarImage src={lead.assigneeAvatar} />
                              <AvatarFallback>
                                {lead.assignee.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{lead.assignee}</span>
                          </div>
                        </TableCell>
                        <TableCell>{lead.lastModified}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
