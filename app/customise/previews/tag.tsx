"use client"

import * as React from "react"

import { Tag } from "@/components/ui/tag"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function TagPreview() {
  const [tags, setTags] = React.useState([
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
  ])

  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <Tag variant="primary" onClose={() => {}}>
          Primary
        </Tag>
        <Tag variant="secondary" onClose={() => {}}>
          Secondary
        </Tag>
        <Tag variant="outline" onClose={() => {}}>
          Outline
        </Tag>
        <Tag variant="ghost" onClose={() => {}}>
          Ghost
        </Tag>
        <Tag variant="destructive" onClose={() => {}}>
          Destructive
        </Tag>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <Tag size="sm" onClose={() => {}}>
          Small
        </Tag>
        <Tag size="default" onClose={() => {}}>
          Default
        </Tag>
        <Tag size="lg" onClose={() => {}}>
          Large
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
        <Tag variant="ghost" disabled onClose={() => {}}>
          Ghost
        </Tag>
        <Tag variant="destructive" disabled onClose={() => {}}>
          Destructive
        </Tag>
      </PreviewCard>

      <PreviewCard label="Removable Tags">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="secondary"
            onClose={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <button
            type="button"
            onClick={() =>
              setTags(["React", "Next.js", "TypeScript", "Tailwind"])
            }
            className="text-sm text-muted-foreground underline-offset-3 hover:underline"
          >
            Reset tags
          </button>
        )}
      </PreviewCard>
    </PreviewGrid>
  )
}
