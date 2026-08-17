"use client"

import * as React from "react"
import { Diamond } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function BadgePreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <Badge size="default">Default</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </PreviewCard>

      <PreviewCard label="With icons">
        <Badge variant="default">
          <Diamond data-icon="inline-start" />
          Leading
        </Badge>
        <Badge variant="secondary">
          Trailing
          <Diamond data-icon="inline-end" />
        </Badge>
        <Badge variant="outline">
          <Diamond data-icon="inline-start" />
          Both
          <Diamond data-icon="inline-end" />
        </Badge>
      </PreviewCard>

      <PreviewCard label="Colors">
        <Badge className="bg-blue-600 text-blue-100">Blue</Badge>
        <Badge className="bg-green-600 text-green-100">Green</Badge>
        <Badge className="bg-amber-600 text-amber-100">Amber</Badge>
        <Badge className="bg-violet-600 text-violet-100">Violet</Badge>
      </PreviewCard>
    </PreviewGrid>
  )
}
