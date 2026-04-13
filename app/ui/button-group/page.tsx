"use client"

import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Plus, Minus, ChevronDown, ArrowLeft, MoreHorizontal, Trash2, Forward, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
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

export default function ButtonGroupPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </div>

      {/* Icon buttons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Icon Buttons</SectionTitle>
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
      </div>

      {/* With separator */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Separator</SectionTitle>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <AlignLeft />
          </Button>
          <Button variant="outline" size="icon">
            <AlignCenter />
          </Button>
          <Button variant="outline" size="icon">
            <AlignRight />
          </Button>
          <ButtonGroupSeparator />
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
      </div>

      {/* With text */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Text</SectionTitle>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Minus />
          </Button>
          <ButtonGroupText>10</ButtonGroupText>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </ButtonGroup>
      </div>

      {/* Split button */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Split Button</SectionTitle>
        <ButtonGroup>
          <Button variant="outline">Save</Button>
          <Button variant="outline" size="icon">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Toolbar</SectionTitle>
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
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical</SectionTitle>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </div>

      {/* Vertical with icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical — Icons</SectionTitle>
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
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-col gap-3">
          <ButtonGroup>
            <Button variant="outline" size="sm">Small</Button>
            <Button variant="outline" size="sm">Group</Button>
            <Button variant="outline" size="sm">Buttons</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Default</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline">Buttons</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="lg">Large</Button>
            <Button variant="outline" size="lg">Group</Button>
            <Button variant="outline" size="lg">Buttons</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-col gap-3">
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
      </div>
    </div>
  )
}
