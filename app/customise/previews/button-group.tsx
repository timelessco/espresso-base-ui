"use client"

import * as React from "react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Plus,
  ChevronDown,
  ArrowLeft,
  MoreHorizontal,
  Trash2,
  Forward,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function ButtonGroupPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Icon Buttons">
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Bold />
          </Button>
          <Button variant="outline" size="icon">
            <Italic />
          </Button>
          <Button variant="outline" size="icon">
            <Underline />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="With Text">
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Minus />
          </Button>
          <ButtonGroupText className="bg-transparent">10</ButtonGroupText>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Split Button">
        <ButtonGroup>
          <Button variant="outline">Save</Button>
          <Button variant="outline" size="icon">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Toolbar">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ArrowLeft />
          </Button>
          <ButtonGroup>
            <Button variant="outline">Archive</Button>
            <Button variant="outline">Report</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Snooze</Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="icon">
                    <MoreHorizontal />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Star />
                  Star
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward />
                  Forward
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Vertical">
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Vertical — Icons">
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <AlignLeft />
          </Button>
          <Button variant="outline" size="icon">
            <AlignCenter />
          </Button>
          <Button variant="outline" size="icon">
            <AlignRight />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Sizes (via ButtonGroup)">
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup size="sm">
            <Button variant="outline">Small</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline">Buttons</Button>
          </ButtonGroup>
          <ButtonGroup size="default">
            <Button variant="outline">Default</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline">Buttons</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button variant="outline">Large</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline">Buttons</Button>
          </ButtonGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Variants">
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup>
            <Button variant="outline">Outline</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline">Buttons</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary">Group</Button>
            <Button variant="secondary">Buttons</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="ghost">Ghost</Button>
            <Button variant="ghost">Group</Button>
            <Button variant="ghost">Buttons</Button>
          </ButtonGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Detached">
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup detached size="sm">
            <Button>Small</Button>
            <Button>Small</Button>
            <Button>Small</Button>
          </ButtonGroup>
          <ButtonGroup detached>
            <Button>Default</Button>
            <Button>Default</Button>
            <Button>Default</Button>
          </ButtonGroup>
          <ButtonGroup detached size="lg">
            <Button>Large</Button>
            <Button>Large</Button>
            <Button>Large</Button>
          </ButtonGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Detached — Variants">
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup detached>
            <Button variant="outline">Outline</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="outline">Outline</Button>
          </ButtonGroup>
          <ButtonGroup detached>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary">Secondary</Button>
          </ButtonGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Wrap Layout">
        <ButtonGroup detached wrapLayout className="max-w-xs">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Detached — Vertical">
        <ButtonGroup detached orientation="vertical">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
