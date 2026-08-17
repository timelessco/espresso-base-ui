"use client"

import * as React from "react"
import { Diamond } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function TooltipPreview() {
  return (
    <TooltipProvider>
      <PreviewGrid>
        <PreviewCard label="Default">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Hover me
            </TooltipTrigger>
            <TooltipContent>
              Open source by default <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
        </PreviewCard>

        <PreviewCard label="Variants">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              With arrow
            </TooltipTrigger>
            <TooltipContent variant="default">
              Default variant <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Without arrow
            </TooltipTrigger>
            <TooltipContent variant="plain">
              Plain variant <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Subtle
            </TooltipTrigger>
            <TooltipContent variant="subtle">
              Subtle variant <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
        </PreviewCard>

        <PreviewCard label="Positions">
          {(["top", "bottom", "left", "right"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" />}>
                {side}
              </TooltipTrigger>
              <TooltipContent side={side}>
                {side} tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          ))}
        </PreviewCard>

        <PreviewCard label="Text trigger">
          <p className="max-w-xs text-sm text-muted-foreground">
            Hover over the{" "}
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="cursor-help underline decoration-dotted" />
                }
              >
                underlined text
              </TooltipTrigger>
              <TooltipContent>
                This is an inline tooltip{" "}
                <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>{" "}
            to see the tooltip.
          </p>
        </PreviewCard>

        <PreviewCard label="Long content">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Long tooltip
            </TooltipTrigger>
            <TooltipContent>
              This is a longer tooltip message that wraps to multiple lines to
              show how the component handles longer text content.{" "}
              <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
        </PreviewCard>

        <PreviewCard label="Alignment">
          {(["start", "center", "end"] as const).map((align) => (
            <Tooltip key={align}>
              <TooltipTrigger render={<Button variant="outline" />}>
                {align}
              </TooltipTrigger>
              <TooltipContent align={align}>
                Aligned to {align} <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          ))}
        </PreviewCard>

        <PreviewCard label="With offset">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Default offset (4)
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>
              Default offset <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Large offset (12)
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>
              Large offset <Diamond className="size-3 shrink-0" />
            </TooltipContent>
          </Tooltip>
        </PreviewCard>
      </PreviewGrid>
    </TooltipProvider>
  )
}
