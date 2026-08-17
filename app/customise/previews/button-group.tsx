"use client"

import * as React from "react"
import {
  Bold,
  Italic,
  Underline,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function ButtonGroupPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Icon buttons">
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Bold />
          </Button>
          <Button variant="outline" size="icon">
            <Italic />
          </Button>
          <Button variant="outline" size="icon">
            <Underline />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="With text">
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Minus />
          </Button>
          <ButtonGroupText className="bg-transparent">10</ButtonGroupText>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Split button">
        <ButtonGroup>
          <Button variant="outline">Save</Button>
          <Button variant="outline" size="icon">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup size="sm">
            <Button variant="outline">Small</Button>
            <Button variant="outline">Group</Button>
          </ButtonGroup>
          <ButtonGroup size="default">
            <Button variant="outline">Default</Button>
            <Button variant="outline">Group</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button variant="outline">Large</Button>
            <Button variant="outline">Group</Button>
          </ButtonGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Detached & vertical">
        <ButtonGroup detached>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
