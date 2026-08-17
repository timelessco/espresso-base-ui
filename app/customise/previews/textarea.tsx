"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea variant="outline" placeholder="Outline" />
          <Textarea variant="subtle" placeholder="Subtle" />
          <Textarea variant="ghost" placeholder="Ghost" />
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea size="xs" placeholder="Extra Small (xs)" />
          <Textarea size="sm" placeholder="Small (sm)" />
          <Textarea size="md" placeholder="Medium (md)" />
          <Textarea size="lg" placeholder="Large (lg)" />
        </div>
      </PreviewCard>

      <PreviewCard label="States">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea placeholder="Default" />
          <Textarea data-valid="true" defaultValue="Valid" />
          <Textarea data-invalid="true" defaultValue="Invalid" />
        </div>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea variant="outline" disabled placeholder="Outline disabled" />
          <Textarea variant="subtle" disabled placeholder="Subtle disabled" />
        </div>
      </PreviewCard>

      <PreviewCard label="With value">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea
            variant="outline"
            defaultValue="Outline with content that spans multiple lines to show how the component handles text."
          />
          <Textarea
            variant="subtle"
            defaultValue="Subtle with content that spans multiple lines to show how the component handles text."
          />
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
