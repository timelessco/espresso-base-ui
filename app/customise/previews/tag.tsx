"use client"

import * as React from "react"

import { Tag } from "@/components/ui/tag"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function TagPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="outline">Outline</Tag>
        <Tag variant="ghost">Ghost</Tag>
        <Tag variant="destructive">Destructive</Tag>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <Tag size="sm">Small</Tag>
        <Tag size="default">Default</Tag>
        <Tag size="lg">Large</Tag>
      </PreviewCard>

      <PreviewCard label="With close">
        <Tag variant="primary" onClose={() => {}}>
          Primary
        </Tag>
        <Tag variant="secondary" onClose={() => {}}>
          Secondary
        </Tag>
        <Tag variant="outline" onClose={() => {}}>
          Outline
        </Tag>
        <Tag variant="destructive" onClose={() => {}}>
          Destructive
        </Tag>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Tag variant="primary" disabled onClose={() => {}}>
          Primary
        </Tag>
        <Tag variant="secondary" disabled onClose={() => {}}>
          Secondary
        </Tag>
        <Tag variant="outline" disabled onClose={() => {}}>
          Outline
        </Tag>
      </PreviewCard>
    </PreviewGrid>
  )
}
