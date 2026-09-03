"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const options = [
  { label: "Pick an option", value: null },
  { label: "Option one", value: "one" },
  { label: "Option two", value: "two" },
  { label: "Option three", value: "three" },
]

function OptionsSelect() {
  return (
    <Select items={options}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function LayerNote({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>
}

function ExampleTile({
  title,
  layers,
  children,
}: {
  title: string
  layers: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-soft p-5">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{layers}</p>
      </div>
      {children}
    </div>
  )
}

function DemoCard({
  note,
  children,
}: {
  note: string
  children?: React.ReactNode
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <LayerNote>{note}</LayerNote>
        {children}
      </CardContent>
    </Card>
  )
}

function PopoverSelect({ note }: { note: string }) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Open popover</Button>}
      />
      <PopoverContent className="flex w-64 flex-col gap-3">
        <LayerNote>{note}</LayerNote>
        <OptionsSelect />
      </PopoverContent>
    </Popover>
  )
}

function PopoverCard({ cardNote }: { cardNote: string }) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Open popover with card</Button>}
      />
      <PopoverContent className="flex w-72 flex-col gap-3">
        <DemoCard note={cardNote}>
          <OptionsSelect />
        </DemoCard>
      </PopoverContent>
    </Popover>
  )
}

function CardPopover({
  cardNote,
  popoverNote,
}: {
  cardNote: string
  popoverNote: string
}) {
  return (
    <DemoCard note={cardNote}>
      <PopoverSelect note={popoverNote} />
    </DemoCard>
  )
}

export default function ElevationPage() {
  return (
    <div className="min-h-dvh p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-foreground">Elevation</h1>
          <p className="max-w-prose text-sm leading-lg text-muted-foreground">
            Surfaces step up as they stack: bg-card on the page, one layer up on
            a modal, card or popover, two layers up when those combine, and a
            third layer inside a modal. Open each example to compare the
            backgrounds.
          </p>
        </header>

        <section className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleTile title="Select" layers="popup bg-card">
            <OptionsSelect />
          </ExampleTile>

          <ExampleTile
            title="Card → Select"
            layers="card bg-card · popup bg-popover"
          >
            <DemoCard note="card bg-card">
              <OptionsSelect />
            </DemoCard>
          </ExampleTile>

          <ExampleTile
            title="Popover → Select"
            layers="popover bg-card · popup bg-popover"
          >
            <PopoverSelect note="popover bg-card · select popup bg-popover" />
          </ExampleTile>

          <ExampleTile
            title="Popover → Card → Select"
            layers="card bg-popover · popup bg-surface"
          >
            <PopoverCard cardNote="card bg-popover · select popup bg-surface" />
          </ExampleTile>

          <ExampleTile
            title="Card → Popover → Select"
            layers="popover bg-popover · popup bg-surface"
          >
            <CardPopover
              cardNote="card bg-card"
              popoverNote="popover bg-popover · select popup bg-surface"
            />
          </ExampleTile>

          <ExampleTile
            title="Modal combinations"
            layers="everything steps one layer higher inside a dialog"
          >
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Open dialog</Button>}
              />
              <DialogContent className="flex max-h-[85vh] flex-col gap-5 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Elevation in a dialog</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                  <LayerNote>Modal → Select — popup bg-popover</LayerNote>
                  <OptionsSelect />
                </div>

                <div className="flex flex-col gap-2">
                  <LayerNote>
                    Modal → Card → Select — card bg-popover · popup bg-surface
                  </LayerNote>
                  <DemoCard note="card bg-popover">
                    <OptionsSelect />
                  </DemoCard>
                </div>

                <div className="flex flex-col gap-2">
                  <LayerNote>
                    Modal → Popover → Select — popup bg-surface
                  </LayerNote>
                  <PopoverSelect note="popover bg-popover · select popup bg-surface" />
                </div>

                <div className="flex flex-col gap-2">
                  <LayerNote>
                    Modal → Popover → Card → Select — card bg-surface · popup
                    layer 3
                  </LayerNote>
                  <PopoverCard cardNote="card bg-surface · select popup layer 3" />
                </div>

                <div className="flex flex-col gap-2">
                  <LayerNote>
                    Modal → Card → Popover → Select — popover bg-surface · popup
                    layer 3
                  </LayerNote>
                  <CardPopover
                    cardNote="card bg-popover"
                    popoverNote="popover bg-surface · select popup layer 3"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </ExampleTile>
        </section>
      </div>
    </div>
  )
}
