"use client"

import * as React from "react"
import { Bold, Italic, Settings2, Underline } from "lucide-react"

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
      <PreviewCard label="Default">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Popover title</PopoverTitle>
              <PopoverDescription>
                Place any content inside the popover surface.
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
          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>Set the layout dimensions.</PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-2 pt-1">
              <Field>
                <FieldLabel>Width</FieldLabel>
                <Input defaultValue="100%" />
              </Field>
              <Field>
                <FieldLabel>Height</FieldLabel>
                <Input defaultValue="25px" />
              </Field>
            </div>
          </PopoverContent>
        </Popover>
      </PreviewCard>

      <PreviewCard label="Toolbar">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Format</Button>} />
          <PopoverContent
            align="start"
            className="flex w-auto flex-row items-center gap-0 p-1"
          >
            <Button variant="ghost" size="icon-sm">
              <Bold />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Italic />
            </Button>
            <Separator orientation="vertical" className="mx-1" />
            <Button variant="ghost" size="icon-sm">
              <Underline />
            </Button>
          </PopoverContent>
        </Popover>
      </PreviewCard>

      <PreviewCard label="Sides">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
            <PopoverContent side={side}>
              <PopoverDescription>Opens on the {side}.</PopoverDescription>
            </PopoverContent>
          </Popover>
        ))}
      </PreviewCard>
    </PreviewGrid>
  )
}
