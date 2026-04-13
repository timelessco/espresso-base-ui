"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function CalendarPage() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(2026, 3, 5),
    to: new Date(2026, 3, 15),
  })
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([
    new Date(2026, 3, 5),
    new Date(2026, 3, 10),
    new Date(2026, 3, 18),
  ])

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Single */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Single</SectionTitle>
        <Calendar
          mode="single"
          selected={singleDate}
          onSelect={setSingleDate}
        />
      </div>

      {/* Range */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Range</SectionTitle>
        <Calendar
          mode="range"
          selected={rangeDate}
          onSelect={setRangeDate}
        />
      </div>

      {/* Multiple */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple</SectionTitle>
        <Calendar
          mode="multiple"
          selected={multipleDates}
          onSelect={setMultipleDates}
        />
      </div>

      {/* With dropdown navigation */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Dropdown Navigation</SectionTitle>
        <Calendar
          mode="single"
          captionLayout="dropdown"
          defaultMonth={new Date()}
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
        />
      </div>

      {/* Multiple months */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple Months</SectionTitle>
        <Calendar mode="single" numberOfMonths={2} />
      </div>

      {/* With week numbers */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Week Numbers</SectionTitle>
        <Calendar mode="single" showWeekNumber />
      </div>

      {/* Disabled dates */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Dates</SectionTitle>
        <Calendar
          mode="single"
          disabled={[
            new Date(2026, 3, 8),
            new Date(2026, 3, 12),
            { dayOfWeek: [0, 6] },
          ]}
        />
      </div>

      {/* Outside days hidden */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Without Outside Days</SectionTitle>
        <Calendar mode="single" showOutsideDays={false} />
      </div>
    </div>
  )
}
