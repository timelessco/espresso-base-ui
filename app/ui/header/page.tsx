"use client"

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  LayoutTemplate,
  MoreHorizontal,
  MousePointer2,
  Plane,
  Play,
  PlayCircle,
  Plus,
  Settings,
  Share2,
  Sparkles,
  Square,
  Type,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Header, HeaderSeparator } from "@/components/ui/header"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tag } from "@/components/ui/tag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function AppIcon() {
  return (
    <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <Sparkles className="size-4" />
    </div>
  )
}

export default function HeaderPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Task — Breadcrumb + Actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Task — Breadcrumb + Actions</SectionTitle>
        <div className="overflow-hidden rounded-lg">
          <Header
            leftControls={
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="gap-2">
                      <Plane className="size-4" />
                      Products
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">General</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Task</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Open source frappe products</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            }
            rightControls={
              <>
                <span className="text-sm text-muted-foreground">4 / 6</span>
                <Tag variant="secondary">Day</Tag>
                <Button variant="ghost" size="icon-sm">
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <ChevronRight />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Duplicate task</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Check />
                  Mark complete
                </Button>
              </>
            }
          />
        </div>
      </div>

      {/* Builder — App Select + Actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Builder — App Select + Actions</SectionTitle>
        <div className="overflow-hidden rounded-lg">
          <Header
            leftControls={
              <>
                <AppIcon />
                <Select defaultValue="Builder">
                  <SelectTrigger variant="ghost" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Builder">Builder</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Frappe">Frappe</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            }
            rightControls={
              <>
                <Button variant="ghost" size="sm">
                  <PlayCircle />
                  Learning resources
                </Button>
                <Button variant="ghost" size="sm">
                  <Sparkles />
                  Templates
                </Button>
                <Button size="sm">
                  <Plus />
                  New Project
                </Button>
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            }
          />
        </div>
      </div>

      {/* Editor — Toolbar + Center + Actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Editor — Toolbar + Center + Actions</SectionTitle>
        <div className="overflow-hidden rounded-lg">
          <Header
            leftControls={
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" className="h-auto p-1">
                        <AppIcon />
                        <ChevronDown />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Duplicate task</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ButtonGroup>
                  <Button variant="ghost" size="icon-sm">
                    <Square />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <MousePointer2 />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Type />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <ImageIcon />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <LayoutTemplate />
                  </Button>
                </ButtonGroup>
              </>
            }
            centerControls={
              <Button variant="ghost" size="sm" className="gap-1.5">
                <span className="font-medium">My page</span>
                <span className="text-muted-foreground">
                  - pages/my-page-c3c8
                </span>
                <ChevronDown />
              </Button>
            }
            rightControls={
              <>
                <Button variant="ghost" size="icon-sm">
                  <Settings />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Play />
                </Button>
                <Button variant="secondary" size="sm">
                  <Share2 />
                  Share
                </Button>
                <Button size="sm">Publish</Button>
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}
