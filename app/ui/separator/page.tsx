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
          <div className="text-sm font-medium text-foreground">
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

      {/* Between content */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Between Sections</SectionTitle>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            First paragraph of content goes here with some descriptive text.
          </p>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Second paragraph continues the content after the separator.
          </p>
        </div>
      </div>

      {/* Horizontal with slot */}
      <div className="flex max-w-lg flex-col gap-6">
        <SectionTitle>Horizontal — With Slot</SectionTitle>
        <Separator slot="Continue" slotAlign="start" />
        <Separator slot="Continue" slotAlign="center" />
        <Separator slot="Continue" slotAlign="end" />
        <Separator
          slot={
            <>
              <Check />
              Continue
            </>
          }
          slotAlign="center"
        />
        <Separator slot={<Check />} slotAlign="center" />
      </div>

      {/* Paragraphs with slot separator */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Paragraphs — With Slot Separator</SectionTitle>
        <div className="flex flex-col gap-6">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Separator slot="Section 1" slotAlign="start" />
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <Separator slot="Continue reading" slotAlign="center" />
          <p className="text-sm text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <Separator
            slot={
              <>
                <Check />
                Finished
              </>
            }
            slotAlign="end"
          />
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
          <Separator orientation="vertical" slot="Continue" slotAlign="start" />
          <Separator
            orientation="vertical"
            slot="Continue"
            slotAlign="center"
          />
          <Separator orientation="vertical" slot="Continue" slotAlign="end" />
          <Separator
            orientation="vertical"
            slot={
              <>
                <Check />
                Continue
              </>
            }
            slotAlign="center"
          />
        </div>
      </div>
    </div>
  )
}
