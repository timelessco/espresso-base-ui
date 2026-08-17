"use client"

import * as React from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Sparkles,
} from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
      <PreviewCard label="Task header">
        <div className="w-full overflow-hidden rounded-lg">
          <Header
            leftControls={
              <>
                <AppIcon />
                <span className="text-sm font-medium text-foreground">
                  Open source products
                </span>
              </>
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
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal />
                </Button>
                <Button size="sm">
                  <Check />
                  Mark complete
                </Button>
              </>
            }
          />
        </div>
      </PreviewCard>

      <PreviewCard label="App header">
        <div className="w-full overflow-hidden rounded-lg">
          <Header
            leftControls={
              <>
                <AppIcon />
                <span className="text-sm font-medium text-foreground">
                  Builder
                </span>
              </>
            }
            rightControls={
              <>
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
    </PreviewGrid>
  )
}
