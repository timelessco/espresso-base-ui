"use client"

import { useState, useCallback } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

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

function DateTimePresetPicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState(new Date())
  const [hour, setHour] = useState("05")
  const [minute, setMinute] = useState("34")
  const [period, setPeriod] = useState("AM")

  const setToNow = useCallback(() => {
    const now = new Date()
    setDate(now)
    setMonth(now)
    let h = now.getHours()
    const m = now.getMinutes()
    const p = h >= 12 ? "PM" : "AM"
    h = h % 12 || 12
    setHour(String(h).padStart(2, "0"))
    setMinute(String(m).padStart(2, "0"))
    setPeriod(p)
  }, [])

  return (
    <div className="flex w-max flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-sm">
      <div className="">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
          className="border-0 shadow-none"
          classNames={{
            nav: "absolute inset-x-0 top-0 flex w-full items-center justify-end gap-1",
          }}
          components={{
            MonthCaption: () => (
              <div className="flex h-(--cell-size) items-center gap-1.5">
                <Select
                  value={String(month.getMonth())}
                  onValueChange={(v) => {
                    const next = new Date(month)
                    next.setMonth(Number(v))
                    setMonth(next)
                  }}
                >
                  <SelectTrigger variant="ghost" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((m, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={String(month.getFullYear())}
                  onValueChange={(v) => {
                    const next = new Date(month)
                    next.setFullYear(Number(v))
                    setMonth(next)
                  }}
                >
                  <SelectTrigger variant="ghost" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 14 }, (_, i) => {
                      const y = 2017 + i
                      return (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            ),
          }}
        />
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3">
        <span className="text-sm font-medium text-foreground">Time</span>
        <button
          onClick={setToNow}
          className="text-sm font-medium text-foreground hover:text-muted-foreground"
        >
          Now
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 pb-3">
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger variant="subtle" size="sm" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => {
              const v = String(i + 1).padStart(2, "0")
              return (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger variant="subtle" size="sm" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => {
              const v = String(i).padStart(2, "0")
              return (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger variant="subtle" size="sm" className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 border-t px-4 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const d = new Date()
            setDate(d)
            setMonth(d)
          }}
        >
          Today
        </Button>
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
    </div>
  )
}

function MultiMonthRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2023, 4, 3),
    to: new Date(2023, 4, 11),
  })

  const formatDate = (date: Date | undefined) =>
    date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : ""

  return (
    <div className="flex w-max flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-sm">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        defaultMonth={new Date(2023, 4)}
        className="border-0 shadow-none"
        classNames={{
          months:
            "relative flex flex-row gap-0 [&>div:not(:first-child)]:border-l [&>div:not(:first-child)]:border-border [&>div:not(:first-child)]:pl-3 [&>div:not(:last-child)]:pr-3",
        }}
      />
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-lg bg-secondary px-3 py-1.5 text-foreground">
            {formatDate(range?.from)}
          </span>
          <span className="text-muted-foreground">to</span>
          <span className="rounded-lg bg-secondary px-3 py-1.5 text-foreground">
            {formatDate(range?.to)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRange(undefined)}
          >
            Cancel
          </Button>
          <Button size="sm">Set date</Button>
        </div>
      </div>
    </div>
  )
}

function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2023, 4, 3),
    to: new Date(2023, 4, 11),
  })

  const formatDate = (date: Date | undefined) =>
    date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : ""

  return (
    <div className="flex w-max flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-sm">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        defaultMonth={new Date(2023, 4)}
        className="border-0 shadow-none"
        classNames={{
          months:
            "relative flex flex-row gap-0 [&>div:not(:first-child)]:border-l [&>div:not(:first-child)]:border-border [&>div:not(:first-child)]:pl-3 [&>div:not(:last-child)]:pr-3",
        }}
      />
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-lg bg-secondary px-3 py-1.5 text-foreground">
            {formatDate(range?.from)}
          </span>
          <span className="text-muted-foreground">to</span>
          <span className="rounded-lg bg-secondary px-3 py-1.5 text-foreground">
            {formatDate(range?.to)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRange(undefined)}
          >
            Cancel
          </Button>
          <Button size="sm">Set date</Button>
        </div>
      </div>
    </div>
  )
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
  const [presetDate, setPresetDate] = useState<Date | undefined>(new Date())
  const [presetMonth, setPresetMonth] = useState(new Date())
  const [dateTimeRange, setDateTimeRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const bookedDates = [
    new Date(2026, 3, 3),
    new Date(2026, 3, 7),
    new Date(2026, 3, 11),
    new Date(2026, 3, 14),
    new Date(2026, 3, 21),
    new Date(2026, 3, 25),
  ]

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
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
          numberOfMonths={2}
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

      {/* Date Time Picker with Presets */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Date Time Picker with Presets</SectionTitle>
        <DateTimePresetPicker />
      </div>

      {/* Presets */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Presets</SectionTitle>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const d = new Date()
                setPresetDate(d)
                setPresetMonth(d)
              }}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const d = addDays(new Date(), 1)
                setPresetDate(d)
                setPresetMonth(d)
              }}
            >
              Tomorrow
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const d = addDays(new Date(), 3)
                setPresetDate(d)
                setPresetMonth(d)
              }}
            >
              In 3 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const d = addDays(new Date(), 7)
                setPresetDate(d)
                setPresetMonth(d)
              }}
            >
              In a week
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const d = addDays(new Date(), 14)
                setPresetDate(d)
                setPresetMonth(d)
              }}
            >
              In 2 weeks
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={presetDate}
            onSelect={setPresetDate}
            month={presetMonth}
            onMonthChange={setPresetMonth}
          />
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Date Range Picker</SectionTitle>
        <DateRangePicker />
      </div>

      {/* Booked Dates */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Booked Dates</SectionTitle>
        <Calendar mode="single" disabled={bookedDates} />
      </div>

      {/* Custom Cell Size */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Custom Cell Size</SectionTitle>
        <Calendar mode="single" className="[--cell-size:2.75rem]" />
      </div>

      {/* Week Numbers */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Week Numbers</SectionTitle>
        <Calendar mode="single" showWeekNumber />
      </div>

      {/* Without Outside Days */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Without Outside Days</SectionTitle>
        <Calendar mode="single" showOutsideDays={false} />
      </div>

      {/* Multiple Months */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple Months</SectionTitle>
        <MultiMonthRangePicker />
      </div>

      {/* With Select */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Select</SectionTitle>
        <div className="flex w-max flex-col gap-3 rounded-lg border p-3">
          <Select defaultValue="this-week">
            <SelectTrigger variant="outline" className="w-full">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="next-week">Next week</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Calendar mode="range" selected={rangeDate} onSelect={setRangeDate} />
        </div>
      </div>

      {/* Disabled Weekends */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Weekends</SectionTitle>
        <Calendar mode="single" disabled={{ dayOfWeek: [0, 6] }} />
      </div>
    </div>
  )
}
