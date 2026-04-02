"use client"

import { Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-12 p-8">
        {/* Default */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Default</SectionTitle>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Hover me
              </TooltipTrigger>
              <TooltipContent>
                Open source by default <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Positions */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Positions</SectionTitle>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Top
              </TooltipTrigger>
              <TooltipContent side="top">
                Top tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Bottom
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Bottom tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Left
              </TooltipTrigger>
              <TooltipContent side="left">
                Left tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Right
              </TooltipTrigger>
              <TooltipContent side="right">
                Right tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* With Text Trigger */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Text Trigger</SectionTitle>
          <p className="text-sm text-muted-foreground">
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
        </div>

        {/* Long Content */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Long Content</SectionTitle>
          <div className="flex items-center gap-4">
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
          </div>
        </div>

        {/* Alignment */}
        <div className="flex flex-col gap-4">
          <SectionTitle>Alignment</SectionTitle>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Start
              </TooltipTrigger>
              <TooltipContent align="start">
                Aligned to start <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Center
              </TooltipTrigger>
              <TooltipContent align="center">
                Aligned to center <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                End
              </TooltipTrigger>
              <TooltipContent align="end">
                Aligned to end <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* With Offset */}
        <div className="flex flex-col gap-4">
          <SectionTitle>With Offset</SectionTitle>
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
