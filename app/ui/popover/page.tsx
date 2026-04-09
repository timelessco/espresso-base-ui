"use client"

import {
  Settings2,
  MessageCircle,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Quote,
  Code,
  Link,
  Image as ImageIcon,
  Table,
  ListOrdered,
  List,
  AlignLeft,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function PopoverPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Formatting toolbar */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Formatting Toolbar</SectionTitle>
        <Popover>
          <PopoverTrigger
            render={<Button variant="outline">Open toolbar</Button>}
          />
          <PopoverContent
            className="flex w-auto flex-row items-center gap-0 p-1"
            align="start"
          >
            <Button variant="ghost" size="sm" className="gap-1">
              Text
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="sm" className="gap-1.5">
              <MessageCircle />
              Comment
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="icon-sm">
              <Bold />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Italic />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Strikethrough />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Underline />
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="icon-sm">
              <Quote />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Code />
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="icon-sm">
              <Link />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <ImageIcon />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Table />
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="icon-sm">
              <ListOrdered />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <List />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <AlignLeft />
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="sm" className="gap-2">
              Text
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              Highlight
            </Button>
            <Separator orientation="vertical" spacing="sm" />
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal />
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open</Button>} />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Popover title</PopoverTitle>
              <PopoverDescription>
                A short description of what this popover is for.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>

      {/* With form */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Form</SectionTitle>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline">
                <Settings2 />
                Dimensions
              </Button>
            }
          />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
            <Field>
              <FieldLabel>Width</FieldLabel>
              <Input defaultValue="100%" />
            </Field>
            <Field>
              <FieldLabel>Height</FieldLabel>
              <Input defaultValue="25px" />
            </Field>
          </PopoverContent>
        </Popover>
      </div>

      {/* Sides */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sides</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Top</Button>} />
            <PopoverContent side="top">
              <PopoverHeader>
                <PopoverTitle>Top side</PopoverTitle>
                <PopoverDescription>
                  Opens above the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Right</Button>} />
            <PopoverContent side="right">
              <PopoverHeader>
                <PopoverTitle>Right side</PopoverTitle>
                <PopoverDescription>
                  Opens to the right of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger
              render={<Button variant="outline">Bottom</Button>}
            />
            <PopoverContent side="bottom">
              <PopoverHeader>
                <PopoverTitle>Bottom side</PopoverTitle>
                <PopoverDescription>
                  Opens below the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Left</Button>} />
            <PopoverContent side="left">
              <PopoverHeader>
                <PopoverTitle>Left side</PopoverTitle>
                <PopoverDescription>
                  Opens to the left of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Alignments */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Alignments</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Start</Button>} />
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>Align start</PopoverTitle>
                <PopoverDescription>
                  Aligned to the start of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger
              render={<Button variant="outline">Center</Button>}
            />
            <PopoverContent align="center">
              <PopoverHeader>
                <PopoverTitle>Align center</PopoverTitle>
                <PopoverDescription>
                  Centered on the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline">End</Button>} />
            <PopoverContent align="end">
              <PopoverHeader>
                <PopoverTitle>Align end</PopoverTitle>
                <PopoverDescription>
                  Aligned to the end of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
