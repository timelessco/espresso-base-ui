"use client"

import {
  ArrowBigUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Command,
  CornerDownLeft,
  Delete,
  Option,
  Search,
} from "lucide-react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function KbdPage() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-12 p-8">
        {/* Single Keys */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Single Keys</SectionTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Kbd>⌘</Kbd>
            <Kbd>Ctrl</Kbd>
            <Kbd>Alt</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>⌫</Kbd>
          </div>
        </div>

        {/* Letter Keys */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Letter Keys</SectionTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Kbd>A</Kbd>
            <Kbd>B</Kbd>
            <Kbd>C</Kbd>
            <Kbd>K</Kbd>
            <Kbd>S</Kbd>
            <Kbd>Z</Kbd>
            <Kbd>1</Kbd>
            <Kbd>2</Kbd>
            <Kbd>9</Kbd>
          </div>
        </div>

        {/* With Icons */}
        <div className="flex flex-col gap-4">
          <SectionTitle>With Icons</SectionTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Kbd>
              <Command />
            </Kbd>
            <Kbd>
              <Option />
            </Kbd>
            <Kbd>
              <ArrowBigUp />
            </Kbd>
            <Kbd>
              <CornerDownLeft />
            </Kbd>
            <Kbd>
              <Delete />
            </Kbd>
            <Kbd>
              <ArrowUp />
            </Kbd>
            <Kbd>
              <ArrowDown />
            </Kbd>
            <Kbd>
              <ArrowLeft />
            </Kbd>
            <Kbd>
              <ArrowRight />
            </Kbd>
          </div>
        </div>

        {/* Key Combinations */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Key Combinations</SectionTitle>
          <div className="flex flex-col gap-3">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>Shift</Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>P</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>S</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>
                <Command />
              </Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>
                <ArrowBigUp />
              </Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </div>

        {/* Inline in Text */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Inline in Text</SectionTitle>
          <div className="flex flex-col gap-2">
            <p className="text-base text-muted-foreground">
              Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
            </p>
            <p className="text-base text-muted-foreground">
              Use <Kbd>Esc</Kbd> to close the dialog.
            </p>
            <p className="text-base text-muted-foreground">
              Save your changes with <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>.
            </p>
          </div>
        </div>

        {/* In Button */}
        <div className="flex flex-col gap-4">
          <SectionTitle>In Button</SectionTitle>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" className="gap-6">
              <span className="flex items-center gap-2">
                <Search />
                Search
              </span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </Button>
            <Button variant="secondary" size="sm" className="gap-6">
              Save
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>S</Kbd>
              </KbdGroup>
            </Button>
          </div>
        </div>

        {/* In Tooltip */}
        <div className="flex flex-col gap-4">
          <SectionTitle>In Tooltip</SectionTitle>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Copy
              </TooltipTrigger>
              <TooltipContent>
                <span>Copy</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Paste
              </TooltipTrigger>
              <TooltipContent>
                <span>Paste</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>V</Kbd>
                </KbdGroup>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Undo
              </TooltipTrigger>
              <TooltipContent>
                <span>Undo</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>Z</Kbd>
                </KbdGroup>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Arrow Navigation */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Arrow Navigation</SectionTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Kbd>
              <ArrowUp />
            </Kbd>
            <Kbd>
              <ArrowDown />
            </Kbd>
            <Kbd>
              <ArrowLeft />
            </Kbd>
            <Kbd>
              <ArrowRight />
            </Kbd>
            <span className="text-sm text-muted-foreground">to navigate</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
