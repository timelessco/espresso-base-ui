"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LogOut,
  Plus,
  Search,
  Settings,
  Sparkles,
  SquareTerminal,
  Star,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  FileText,
  PanelLeftClose,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
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

function AppSidebar() {
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left">
                  <span className="truncate pb-0.5 text-base font-medium text-foreground">
                    Espresso UI
                  </span>
                  <span className="truncate text-sm font-normal text-muted-foreground">
                    Pro Plan
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
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings />
                  Workspace Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Search" className="h-7 text-base">
                  <Search />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inbox" className="h-7 text-base">
                  <Inbox />
                  <span>Inbox</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="top-1!">12</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Platform */}
        <SidebarGroup>
          <SidebarGroupLabel className="mb-px h-7">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  className="h-7 text-base font-normal!"
                >
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#" className="text-base!">
                      <span>Overview</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#" className="text-base!">
                      <span>Analytics</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#" className="text-base!">
                      <span>Reports</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Projects */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-7 py-0 text-base!"
                  tooltip="Design System"
                  isActive
                >
                  <Sparkles />
                  <span>Design System</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-7 py-0 text-base!"
                  tooltip="Marketing Site"
                >
                  <GalleryVerticalEnd />
                  <span>Marketing Site</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-7 py-0 text-base!"
                  tooltip="Mobile App"
                >
                  <AudioWaveform />
                  <span>Mobile App</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Team */}
        <SidebarGroup>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Members"
                  className="h-7 py-0 text-base!"
                >
                  <Users />
                  <span>Members</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="top-1!">4</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />

        {/* Channels — Collapsible */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <Collapsible
                defaultOpen={true}
                className="group/collapsible group-data-[collapsible=icon]:hidden"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronRight className="shrink-0 transition-transform duration-200 ease-in-out group-data-open/collapsible:rotate-90" />
                    <span className="flex size-4 items-center justify-center">
                      ☀️
                    </span>
                    <span>Product</span>
                  </CollapsibleTrigger>
                  <SidebarMenuBadge className="top-1!">21</SidebarMenuBadge>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>General</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Standups</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Training</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Update</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible className="group/collapsible group-data-[collapsible=icon]:hidden">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronRight className="shrink-0 transition-transform duration-200 ease-in-out group-data-open/collapsible:rotate-90" />
                    <span className="flex size-4 items-center justify-center">
                      🔗
                    </span>
                    <span>Open FLC</span>
                  </CollapsibleTrigger>
                  <SidebarMenuBadge className="top-1!">21</SidebarMenuBadge>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>General</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Releases</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible className="group/collapsible group-data-[collapsible=icon]:hidden">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronRight className="shrink-0 transition-transform duration-200 ease-in-out group-data-open/collapsible:rotate-90" />
                    <span className="flex size-4 items-center justify-center">
                      🚚
                    </span>
                    <span>Delivery team</span>
                  </CollapsibleTrigger>
                  <SidebarMenuBadge className="top-1!">13</SidebarMenuBadge>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>General</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Standups</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible className="group/collapsible group-data-[collapsible=icon]:hidden">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="h-7 text-base leading-base font-normal tracking-normal text-sidebar-accent-foreground group-data-open/collapsible:bg-sidebar-accent" />
                    }
                  >
                    <ChevronRight className="shrink-0 transition-transform duration-200 ease-in-out group-data-open/collapsible:rotate-90" />
                    <span className="flex size-4 items-center justify-center">
                      📦
                    </span>
                    <span>Sales</span>
                  </CollapsibleTrigger>
                  <SidebarMenuBadge className="top-1!">25</SidebarMenuBadge>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>General</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" className="text-base!">
                          <span>Leads</span>
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

      <SidebarFooter className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="h-7 w-full justify-start gap-2 overflow-hidden text-base text-muted-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
              onClick={() =>
                document
                  .querySelector<HTMLButtonElement>('[data-sidebar="trigger"]')
                  ?.click()
              }
            >
              <PanelLeftClose className="size-4 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                Collapse
              </span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default function SidebarPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border-soft px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2"></div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-2"></div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
