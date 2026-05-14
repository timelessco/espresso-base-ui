"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
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
        <div className="flex h-16 items-center gap-4">
          <div className="text-sm text-muted-foreground">Left</div>
          <Separator orientation="vertical" />
          <div className="text-sm text-muted-foreground">Middle</div>
          <Separator orientation="vertical" />
          <div className="text-sm text-muted-foreground">Right</div>
        </div>
      </div>

      {/* Between sections */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Between Sections</SectionTitle>
        <div className="flex flex-col">
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
      </div>

      {/* Horizontal with slot */}
      <div className="flex max-w-lg flex-col gap-6">
        <SectionTitle>Horizontal — With Slot</SectionTitle>
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

      {/* Paragraphs with slot separator */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Paragraphs — With Slot Separator</SectionTitle>
        <div className="flex flex-col gap-6">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Separator slot slotAlign="start">
            <Button size="sm">Section 1</Button>
          </Separator>
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <Separator slot slotAlign="center">
            <Button size="sm">Continue reading</Button>
          </Separator>
          <p className="text-sm text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <Separator slot slotAlign="end">
            <Button size="sm">
              <Check />
              Finished
            </Button>
          </Separator>
          <p className="text-sm text-muted-foreground">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Vertical with slot */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical — With Slot</SectionTitle>
        <div className="flex h-72 items-stretch gap-20">
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
      </div>
    </div>
  )
}
