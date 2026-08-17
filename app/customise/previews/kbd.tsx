"use client"

import * as React from "react"
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
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function KbdPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Single Keys">
        <Kbd>⌘</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Space</Kbd>
        <Kbd>⌫</Kbd>
      </PreviewCard>

      <PreviewCard label="Letter Keys">
        <Kbd>A</Kbd>
        <Kbd>B</Kbd>
        <Kbd>C</Kbd>
        <Kbd>K</Kbd>
        <Kbd>S</Kbd>
        <Kbd>Z</Kbd>
        <Kbd>1</Kbd>
        <Kbd>2</Kbd>
        <Kbd>9</Kbd>
      </PreviewCard>

      <PreviewCard label="With Icons">
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
      </PreviewCard>

      <PreviewCard label="Key Combinations">
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
      </PreviewCard>

      <PreviewCard label="Inline in Text">
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
      </PreviewCard>

      <PreviewCard label="In Button">
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
      </PreviewCard>

      <PreviewCard label="In Tooltip">
        <TooltipProvider>
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
        </TooltipProvider>
      </PreviewCard>

      <PreviewCard label="Arrow Navigation">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
