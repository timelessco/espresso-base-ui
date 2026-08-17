"use client"

import * as React from "react"
import { Diamond, Settings } from "lucide-react"

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
              Default
            </TooltipTrigger>
            <TooltipContent variant="default">Default variant</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Plain
            </TooltipTrigger>
            <TooltipContent variant="plain">Plain variant</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Subtle
            </TooltipTrigger>
            <TooltipContent variant="subtle">Subtle variant</TooltipContent>
          </Tooltip>
        </PreviewCard>

        <PreviewCard label="Positions">
          {(["top", "bottom", "left", "right"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" />}>
                {side}
              </TooltipTrigger>
              <TooltipContent side={side}>{side} tooltip</TooltipContent>
            </Tooltip>
          ))}
        </PreviewCard>

        <PreviewCard label="Icon trigger">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="icon" />}>
              <Settings />
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </PreviewCard>
      </PreviewGrid>
    </TooltipProvider>
  )
}
