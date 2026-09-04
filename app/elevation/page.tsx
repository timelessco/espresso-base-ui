"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

function OptionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" className="w-fit" />}
      >
        Open dropdown
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem>Option one</DropdownMenuItem>
          <DropdownMenuItem>Option two</DropdownMenuItem>
          <DropdownMenuItem>Option three</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// select + dropdown + subtle button — all follow the same ladder
function PopupDemos() {
  return (
    <div className="flex flex-col gap-2">
      <OptionsSelect />
      <OptionsDropdown />
      <Button variant="secondary" className="w-fit">
        Subtle button
      </Button>
    </div>
  )
}

function ModalSection({
  title,
  layers,
  children,
}: {
  title: string
  layers: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{layers}</p>
      </div>
      {children}
    </div>
  )
}

function ExampleTile({
  title,
  layers,
  asCard,
  children,
}: {
  title: string
  layers: string
  asCard?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{layers}</p>
      </div>
      {asCard ? (
        // card-based examples: the demo itself is the Card, the heading
        // stays outside it
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">{children}</CardContent>
        </Card>
      ) : (
        children
      )}
    </div>
  )
}

function DemoCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">{children}</CardContent>
    </Card>
  )
}

function DemoPopover({
  trigger = "Open popover",
  children,
}: {
  trigger?: string
  children: React.ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">{trigger}</Button>} />
      <PopoverContent className="flex w-72 flex-col gap-3">
        {children}
      </PopoverContent>
    </Popover>
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
            third layer inside a modal. Select and dropdown popups follow the
            same ladder, and subtle buttons step up with their surface — open
            each example to compare the backgrounds.
          </p>
        </header>

        <section className="grid grid-cols-1 items-start gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleTile title="Standalone" layers="popups bg-card">
            <PopupDemos />
          </ExampleTile>

          <ExampleTile
            asCard
            title="Card"
            layers="card bg-card · popups bg-popover"
          >
            <PopupDemos />
          </ExampleTile>

          <ExampleTile
            title="Popover"
            layers="popover bg-card · popups bg-popover"
          >
            <DemoPopover>
              <PopupDemos />
            </DemoPopover>
          </ExampleTile>

          <ExampleTile
            title="Popover → Card"
            layers="card bg-popover · popups bg-surface"
          >
            <DemoPopover trigger="Open popover with card">
              <DemoCard>
                <PopupDemos />
              </DemoCard>
            </DemoPopover>
          </ExampleTile>

          <ExampleTile
            asCard
            title="Card → Popover"
            layers="popover bg-popover · popups bg-surface"
          >
            <DemoPopover>
              <PopupDemos />
            </DemoPopover>
          </ExampleTile>

          <ExampleTile
            title="Modal combinations"
            layers="everything steps one layer higher inside a dialog"
          >
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Open dialog</Button>}
              />
              <DialogContent className="flex max-h-[85vh] flex-col gap-6 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Elevation in a dialog</DialogTitle>
                  <DialogDescription>
                    Everything steps one layer higher inside a modal.
                  </DialogDescription>
                </DialogHeader>

                <ModalSection title="Modal" layers="popups bg-popover">
                  <PopupDemos />
                </ModalSection>

                <ModalSection
                  title="Modal → Card"
                  layers="card bg-popover · popups bg-surface"
                >
                  <DemoCard>
                    <PopupDemos />
                  </DemoCard>
                </ModalSection>

                <ModalSection
                  title="Modal → Popover"
                  layers="popover bg-popover · popups bg-surface"
                >
                  <DemoPopover>
                    <PopupDemos />
                  </DemoPopover>
                </ModalSection>

                <ModalSection
                  title="Modal → Popover → Card"
                  layers="card bg-surface · popups layer 3"
                >
                  <DemoPopover trigger="Open popover with card">
                    <DemoCard>
                      <PopupDemos />
                    </DemoCard>
                  </DemoPopover>
                </ModalSection>

                <ModalSection
                  title="Modal → Card → Popover"
                  layers="popover bg-surface · popups layer 3"
                >
                  <DemoCard>
                    <DemoPopover>
                      <PopupDemos />
                    </DemoPopover>
                  </DemoCard>
                </ModalSection>
              </DialogContent>
            </Dialog>
          </ExampleTile>
        </section>
      </div>
    </div>
  )
}
