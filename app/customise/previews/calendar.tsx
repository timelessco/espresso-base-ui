"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPreview() {
  const [single, setSingle] = React.useState<Date | undefined>(new Date())
  const [dropdown, setDropdown] = React.useState<Date | undefined>(new Date())

  return (
    <PreviewGrid>
      <PreviewCard label="Single selection">
        <Calendar
          mode="single"
          selected={single}
          onSelect={setSingle}
          className="w-fit"
        />
      </PreviewCard>

      <PreviewCard label="Dropdown caption">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={dropdown}
          onSelect={setDropdown}
          className="w-fit"
        />
      </PreviewCard>
    </PreviewGrid>
  )
}
