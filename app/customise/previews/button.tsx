"use client"

import * as React from "react"
import { Search, Plus, Mail, Trash2, Ellipsis, Settings, Paperclip } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import { Button } from "@/components/ui/button"

export default function ButtonPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Danger</Button>
        <Button variant="link">Link</Button>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
        <Button size="2xl">2XL</Button>
      </PreviewCard>

      <PreviewCard label="With icons">
        <Button>
          <Search />
          Search
        </Button>
        <Button variant="secondary">
          <Plus />
          Add Member
        </Button>
        <Button variant="outline">
          <Mail />
          Email
        </Button>
        <Button variant="destructive">
          <Trash2 />
          Delete
        </Button>
      </PreviewCard>

      <PreviewCard label="Icon only">
        <Button variant="secondary" size="icon">
          <Ellipsis />
        </Button>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </PreviewCard>

      <PreviewCard label="With file upload">
        <Button>
          <Paperclip />
          Upload File
        </Button>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="destructive" disabled>
          Danger
        </Button>
      </PreviewCard>
    </PreviewGrid>
  )
}
