"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function SeparatorPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Horizontal">
        <div className="w-full max-w-xs">
          <div className="pb-2 text-sm font-medium text-foreground">
            Radix Primitives
          </div>
          <div className="text-sm text-muted-foreground">
            An open-source UI component library.
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center gap-4 text-sm text-muted-foreground">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </div>
      </PreviewCard>

      <PreviewCard label="Vertical">
        <div className="flex h-16 items-center gap-4 text-sm text-muted-foreground">
          <div>Left</div>
          <Separator orientation="vertical" />
          <div>Middle</div>
          <Separator orientation="vertical" />
          <div>Right</div>
        </div>
      </PreviewCard>

      <PreviewCard label="Between sections">
        <div className="flex w-full max-w-md flex-col">
          <p className="text-sm text-muted-foreground">
            First paragraph of content goes here with some descriptive text.
          </p>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">
            Second paragraph continues the content after the separator.
          </p>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">
            Third paragraph wraps up the section.
          </p>
        </div>
      </PreviewCard>

      <PreviewCard label="Horizontal — with slot">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Separator slot slotAlign="start">
            <Button size="sm">Continue</Button>
          </Separator>
          <Separator slot slotAlign="center">
            <Button size="sm">Continue</Button>
          </Separator>
          <Separator slot slotAlign="end">
            <Button size="sm">Continue</Button>
          </Separator>
          <Separator slot slotAlign="center">
            <Button size="sm">
              <Check />
              Continue
            </Button>
          </Separator>
          <Separator slot slotAlign="center">
            <Button size="sm">
              <Check />
            </Button>
          </Separator>
        </div>
      </PreviewCard>

      <PreviewCard label="Paragraphs — with slot separator">
        <div className="flex w-full max-w-md flex-col gap-6">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <Separator slot slotAlign="start">
            <Button size="sm">Section 1</Button>
          </Separator>
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip.
          </p>
          <Separator slot slotAlign="center">
            <Button size="sm">Continue reading</Button>
          </Separator>
          <p className="text-sm text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore.
          </p>
          <Separator slot slotAlign="end">
            <Button size="sm">
              <Check />
              Finished
            </Button>
          </Separator>
        </div>
      </PreviewCard>

      <PreviewCard label="Vertical — with slot">
        <div className="flex h-56 items-stretch gap-12">
          <Separator orientation="vertical" slot slotAlign="start">
            <Button size="sm">Continue</Button>
          </Separator>
          <Separator orientation="vertical" slot slotAlign="center">
            <Button size="sm">Continue</Button>
          </Separator>
          <Separator orientation="vertical" slot slotAlign="end">
            <Button size="sm">Continue</Button>
          </Separator>
          <Separator orientation="vertical" slot slotAlign="center">
            <Button size="sm">
              <Check />
              Continue
            </Button>
          </Separator>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
