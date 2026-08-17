"use client"

import * as React from "react"
import {
  AlignLeft,
  Bold,
  Code,
  Image as ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  MessageCircle,
  MoreHorizontal,
  Quote,
  Settings2,
  Strikethrough,
  Table,
  Underline,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function PopoverPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Formatting toolbar">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open toolbar</Button>} />
          <PopoverContent
            className="flex w-auto flex-row items-center gap-0 p-1"
            align="start"
          >
            <Button variant="ghost" size="sm" className="gap-1">
              Text
            </Button>
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="sm" className="gap-1.5">
              <MessageCircle />
              Comment
            </Button>
            <Separator orientation="vertical" className="mx-1" />
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
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="icon-sm">
              <Quote />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Code />
            </Button>
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="icon-sm">
              <Link />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <ImageIcon />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Table />
            </Button>
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="icon-sm">
              <ListOrdered />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <List />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <AlignLeft />
            </Button>
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="sm" className="gap-2">
              Text
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              Highlight
            </Button>
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal />
            </Button>
          </PopoverContent>
        </Popover>
      </PreviewCard>

      <PreviewCard label="Basic">
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
      </PreviewCard>

      <PreviewCard label="With form">
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
      </PreviewCard>

      <PreviewCard label="Sides">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
            <PopoverContent side={side}>
              <PopoverHeader>
                <PopoverTitle>{side} side</PopoverTitle>
                <PopoverDescription>
                  Opens on the {side} of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ))}
      </PreviewCard>

      <PreviewCard label="Alignments">
        {(["start", "center", "end"] as const).map((align) => (
          <Popover key={align}>
            <PopoverTrigger render={<Button variant="outline">{align}</Button>} />
            <PopoverContent align={align}>
              <PopoverHeader>
                <PopoverTitle>Align {align}</PopoverTitle>
                <PopoverDescription>
                  Aligned to the {align} of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ))}
      </PreviewCard>
    </PreviewGrid>
  )
}
