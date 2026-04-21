"use client"

import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function CollapsiblePage() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [controlledOpen, setControlledOpen] = useState(true)

  return (
    <div className="flex max-w-md flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <Collapsible open={basicOpen} onOpenChange={setBasicOpen}>
          <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2">
            <span className="text-sm font-medium">3 items hidden</span>
            <CollapsibleTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              }
            />
          </div>
          <CollapsibleContent>
            <div className="mt-2 flex flex-col gap-2">
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Item 1
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Item 2
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Item 3
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Default Open */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default Open</SectionTitle>
        <Collapsible defaultOpen>
          <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2">
            <span className="text-sm font-medium">Favorites</span>
            <CollapsibleTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              }
            />
          </div>
          <CollapsibleContent>
            <div className="mt-2 flex flex-col gap-2">
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Design System
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Component Library
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Documentation
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Controlled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Controlled</SectionTitle>
        <div className="mb-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setControlledOpen(!controlledOpen)}
          >
            {controlledOpen ? "Close" : "Open"}
          </Button>
          <span className="text-xs text-muted-foreground">
            State: {controlledOpen ? "open" : "closed"}
          </span>
        </div>
        <Collapsible open={controlledOpen} onOpenChange={setControlledOpen}>
          <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2">
            <span className="text-sm font-medium">Settings</span>
            <CollapsibleTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              }
            />
          </div>
          <CollapsibleContent>
            <div className="mt-2 flex flex-col gap-2">
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                General
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Notifications
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Privacy
              </div>
              <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                Billing
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Multiple */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple</SectionTitle>
        <div className="flex flex-col gap-3">
          <Collapsible>
            <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2">
              <span className="text-sm font-medium">Frontend</span>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon-sm">
                    <ChevronsUpDown />
                  </Button>
                }
              />
            </div>
            <CollapsibleContent>
              <div className="mt-2 flex flex-col gap-2">
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  React
                </div>
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  Next.js
                </div>
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  Tailwind CSS
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2">
              <span className="text-sm font-medium">Backend</span>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon-sm">
                    <ChevronsUpDown />
                  </Button>
                }
              />
            </div>
            <CollapsibleContent>
              <div className="mt-2 flex flex-col gap-2">
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  Node.js
                </div>
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  PostgreSQL
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2">
              <span className="text-sm font-medium">DevOps</span>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon-sm">
                    <ChevronsUpDown />
                  </Button>
                }
              />
            </div>
            <CollapsibleContent>
              <div className="mt-2 flex flex-col gap-2">
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  Docker
                </div>
                <div className="rounded-lg border border-border-soft px-4 py-2 text-sm">
                  Vercel
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <Collapsible disabled>
          <div className="flex items-center justify-between rounded-lg border border-border-soft px-4 py-2 opacity-50">
            <span className="text-sm font-medium">Locked section</span>
            <CollapsibleTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              }
            />
          </div>
          <CollapsibleContent>
            <div className="mt-2 rounded-lg border border-border-soft px-4 py-2 text-sm">
              This content is hidden
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
