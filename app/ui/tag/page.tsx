"use client"

import { useState } from "react"
import { Tag } from "@/components/ui/tag"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function TagPage() {
  const [tags, setTags] = useState(["React", "Next.js", "TypeScript", "Tailwind"])

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Tag size="sm" onClose={() => {}}>
            Small
          </Tag>
          <Tag size="default" onClose={() => {}}>
            Default
          </Tag>
          <Tag size="lg" onClose={() => {}}>
            Large
          </Tag>
        </div>
      </div>

      {/* With close icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Close Icon</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
      </div>

      {/* Close icon — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Close Icon — All Sizes</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Tag size="sm" onClose={() => {}}>
            Small
          </Tag>
          <Tag size="default" onClose={() => {}}>
            Default
          </Tag>
          <Tag size="lg" onClose={() => {}}>
            Large
          </Tag>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
      </div>

      {/* Removable tags (interactive) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Removable Tags</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
      </div>
    </div>
  )
}
