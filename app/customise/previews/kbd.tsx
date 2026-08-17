"use client"

import * as React from "react"
import {
  ArrowBigUp,
  Command,
  CornerDownLeft,
  Option,
  Search,
} from "lucide-react"

import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function KbdPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Single keys">
        <Kbd>⌘</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>K</Kbd>
      </PreviewCard>

      <PreviewCard label="With icons">
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
      </PreviewCard>

      <PreviewCard label="Combinations">
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
      </PreviewCard>

      <PreviewCard label="In button">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
