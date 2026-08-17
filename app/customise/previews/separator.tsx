"use client"

import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function SeparatorPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Horizontal">
        <div className="w-full max-w-xs">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">
              Espresso UI
            </span>
            <span className="text-sm text-muted-foreground">
              A design system.
            </span>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">Docs</span>
            <span className="text-sm text-muted-foreground">
              Read the guides.
            </span>
          </div>
        </div>
      </PreviewCard>

      <PreviewCard label="Vertical">
        <div className="flex h-6 items-center gap-4 text-sm text-secondary-foreground">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </PreviewCard>

      <PreviewCard label="With label — center">
        <div className="w-full max-w-xs">
          <Separator slot slotAlign="center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              OR
            </span>
          </Separator>
        </div>
      </PreviewCard>

      <PreviewCard label="With label — start / end">
        <div className="flex w-full max-w-xs flex-col gap-6">
          <Separator slot slotAlign="start">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              Continue
            </span>
          </Separator>
          <Separator slot slotAlign="end">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              More
            </span>
          </Separator>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
