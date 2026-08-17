"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

// Calendar with a Select-based month/year caption (matches the showcase).
function SelectCalendar({ withPresets = false }: { withPresets?: boolean }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [month, setMonth] = React.useState(new Date())

  const calendar = (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      month={month}
      onMonthChange={setMonth}
      className="w-full min-w-[280px] border-0 shadow-none [--cell-size:1.5rem] [&_tbody>tr]:mt-1.5"
      classNames={{
        nav: "pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-end gap-1 [&>*]:pointer-events-auto",
      }}
      components={{
        MonthCaption: () => {
          const monthItems = monthNames.map((m) => ({ label: m, value: m }))
          const yearItems = Array.from({ length: 14 }, (_, i) => {
            const y = String(2017 + i)
            return { label: y, value: y }
          })
          return (
            <div className="flex h-(--cell-size) items-center gap-1.5">
              <Select
                items={monthItems}
                value={monthNames[month.getMonth()]}
                onValueChange={(v) => {
                  if (!v) return
                  const next = new Date(month)
                  next.setMonth(monthNames.indexOf(v as string))
                  setMonth(next)
                }}
              >
                <SelectTrigger variant="ghost" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {monthItems.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                items={yearItems}
                value={String(month.getFullYear())}
                onValueChange={(v) => {
                  if (!v) return
                  const next = new Date(month)
                  next.setFullYear(Number(v))
                  setMonth(next)
                }}
              >
                <SelectTrigger variant="ghost" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {yearItems.map((y) => (
                      <SelectItem key={y.value} value={y.value}>
                        {y.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )
        },
        Nav: ({
          className: navClassName,
          onPreviousClick,
          onNextClick,
          previousMonth,
          nextMonth,
        }) => (
          <nav className={navClassName}>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={(e) => onPreviousClick?.(e)}
              disabled={!previousMonth}
              aria-label="Previous month"
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                const today = new Date()
                setDate(today)
                setMonth(today)
              }}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={(e) => onNextClick?.(e)}
              disabled={!nextMonth}
              aria-label="Next month"
            >
              <ChevronRightIcon />
            </Button>
          </nav>
        ),
      }}
    />
  )

  if (!withPresets) return calendar

  return (
    <div className="flex w-max overflow-hidden rounded-xl bg-popover shadow-elevation-xl">
      <div className="flex flex-col items-start gap-2 border-r border-border px-3 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const d = addDays(new Date(), 1)
            setDate(d)
            setMonth(d)
          }}
        >
          Tomorrow
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const d = addDays(new Date(), 7)
            setDate(d)
            setMonth(d)
          }}
        >
          Next week
        </Button>
      </div>
      {calendar}
    </div>
  )
}

export default function CalendarPreview() {
  const [single, setSingle] = React.useState<Date | undefined>(new Date())

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

      <PreviewCard label="With presets">
        <SelectCalendar withPresets />
      </PreviewCard>
    </PreviewGrid>
  )
}
