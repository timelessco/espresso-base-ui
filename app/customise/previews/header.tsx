"use client"

import * as React from "react"
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
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Tag } from "@/components/ui/tag"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AppIcon() {
  return (
    <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <Sparkles className="size-4" />
    </div>
  )
}

export default function HeaderPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Task — breadcrumb + actions">
        <div className="w-full overflow-hidden rounded-lg">
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
                    <BreadcrumbPage>Task</BreadcrumbPage>
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
      </PreviewCard>

      <PreviewCard label="Builder — app select + actions">
        <div className="w-full overflow-hidden rounded-lg">
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
      </PreviewCard>

      <PreviewCard label="Editor — toolbar + center + actions">
        <div className="w-full overflow-hidden rounded-lg">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
