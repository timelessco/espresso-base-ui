"use client"

import { Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function SeparatorPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Horizontal */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Horizontal</SectionTitle>
        <div>
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
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical</SectionTitle>
        <div className="flex h-16 items-center">
          <div className="text-sm text-muted-foreground">Left</div>
          <Separator orientation="vertical" spacing="md" />
          <div className="text-sm text-muted-foreground">Middle</div>
          <Separator orientation="vertical" spacing="md" />
          <div className="text-sm text-muted-foreground">Right</div>
        </div>
      </div>

      {/* Between content */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Between Sections</SectionTitle>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            First paragraph of content goes here with some descriptive text.
          </p>
          <Separator spacing="md" />
          <p className="text-sm text-muted-foreground">
            Second paragraph continues the content after the separator.
          </p>
        </div>
      </div>

      {/* Horizontal with slot */}
      <div className="flex max-w-lg flex-col">
        <SectionTitle>Horizontal — With Slot</SectionTitle>
        <Separator spacing="lg" slot slotAlign="start">
          Continue
        </Separator>
        <Separator spacing="lg" slot slotAlign="center">
          Continue
        </Separator>
        <Separator spacing="lg" slot slotAlign="end">
          Continue
        </Separator>
        <Separator spacing="lg" slot slotAlign="center">
          <Check />
          Continue
        </Separator>
        <Separator spacing="lg" slot slotAlign="center">
          <Check />
        </Separator>
      </div>

      {/* Paragraphs with slot separator */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Paragraphs — With Slot Separator</SectionTitle>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Separator spacing="lg" slot slotAlign="start">
            Section 1
          </Separator>
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <Separator spacing="lg" slot slotAlign="center">
            Continue reading
          </Separator>
          <p className="text-sm text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <Separator spacing="lg" slot slotAlign="end">
            <Check />
            Finished
          </Separator>
          <p className="text-sm text-muted-foreground">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Horizontal Spacing */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Horizontal — Spacing</SectionTitle>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Above (sm)</p>
          <Separator spacing="sm" />
          <p className="text-sm text-muted-foreground">Between (sm & md)</p>
          <Separator spacing="md" />
          <p className="text-sm text-muted-foreground">Between (md & lg)</p>
          <Separator spacing="lg" />
          <p className="text-sm text-muted-foreground">Below (lg)</p>
        </div>
      </div>

      {/* Horizontal Spacing with slot */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Horizontal — Spacing with Slot</SectionTitle>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Above (sm)</p>
          <Separator spacing="sm" slot>
            sm
          </Separator>
          <p className="text-sm text-muted-foreground">Between (sm & md)</p>
          <Separator spacing="md" slot>
            md
          </Separator>
          <p className="text-sm text-muted-foreground">Between (md & lg)</p>
          <Separator spacing="lg" slot>
            lg
          </Separator>
          <p className="text-sm text-muted-foreground">Below (lg)</p>
        </div>
      </div>

      {/* Vertical Spacing */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical — Spacing</SectionTitle>
        <div className="flex h-16 items-center">
          <span className="text-sm text-muted-foreground">Left</span>
          <Separator orientation="vertical" spacing="sm" />
          <span className="text-sm text-muted-foreground">sm</span>
          <Separator orientation="vertical" spacing="md" />
          <span className="text-sm text-muted-foreground">md</span>
          <Separator orientation="vertical" spacing="lg" />
          <span className="text-sm text-muted-foreground">lg</span>
        </div>
      </div>

      {/* Vertical with slot */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical — With Slot</SectionTitle>
        <div className="flex h-72 items-stretch">
          <Separator orientation="vertical" spacing="lg" slot slotAlign="start">
            Continue
          </Separator>
          <Separator
            orientation="vertical"
            spacing="lg"
            slot
            slotAlign="center"
          >
            Continue
          </Separator>
          <Separator orientation="vertical" spacing="lg" slot slotAlign="end">
            Continue
          </Separator>
          <Separator
            orientation="vertical"
            spacing="lg"
            slot
            slotAlign="center"
          >
            <Check />
            Continue
          </Separator>
        </div>
      </div>
    </div>
  )
}
