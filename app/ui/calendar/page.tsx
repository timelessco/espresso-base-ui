"use client"

import { useState, useCallback, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

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

function CalendarPopover({
  buttonContent,
  buttonClassName,
  align = "start",
  children,
}: {
  buttonContent: React.ReactNode
  buttonClassName?: string
  align?: "start" | "center" | "end"
  children: (api: { close: () => void }) => React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-56 justify-start gap-2 font-normal text-foreground",
              buttonClassName
            )}
          >
            <img src="/images/svg/calender.svg" alt="" className="size-4" />
            {buttonContent}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align={align} sideOffset={4}>
        {children({ close: () => setOpen(false) })}
      </PopoverContent>
    </Popover>
  )
}

function formatDateShort(date: Date | undefined) {
  return date
    ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    : ""
}

function formatRange(range: DateRange | undefined, fallback: string) {
  if (range?.from && range?.to) {
    return `${formatDateShort(range.from)} to ${formatDateShort(range.to)}`
  }
  if (range?.from) return formatDateShort(range.from)
  return fallback
}

function FormattedDate({ date }: { date: Date }) {
  return (
    <>
      {format(date, "dd")}
      <span className="text-card-foreground"> / </span>
      {format(date, "MM")}
      <span className="text-card-foreground"> / </span>
      {format(date, "yyyy")}
    </>
  )
}

function FormattedRange({
  range,
  fallback,
}: {
  range: DateRange | undefined
  fallback: string
}) {
  if (range?.from && range?.to) {
    return (
      <span className="text-foreground">
        <FormattedDate date={range.from} />
        <span className="px-1"> - </span>
        <FormattedDate date={range.to} />
      </span>
    )
  }
  if (range?.from) {
    return (
      <span className="text-foreground">
        <FormattedDate date={range.from} />
      </span>
    )
  }
  return <span className="text-card-foreground">{fallback}</span>
}

function TimeInput() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    setTime(format(new Date(), "HH:mm:ss"))
  }, [])

  return (
    <Input
      type="time"
      step="1"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="w-fit [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit-ampm-field]:rounded-sm [&::-webkit-datetime-edit-ampm-field]:px-px [&::-webkit-datetime-edit-hour-field]:rounded-sm [&::-webkit-datetime-edit-hour-field]:px-px [&::-webkit-datetime-edit-minute-field]:rounded-sm [&::-webkit-datetime-edit-minute-field]:px-px [&::-webkit-datetime-edit-second-field]:rounded-sm [&::-webkit-datetime-edit-second-field]:px-px"
    />
  )
}

function DateTimePresetContent() {
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
    <div className="flex w-max">
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
      <div className="flex flex-col">
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
              const monthItems = monthNames.map((m) => ({
                label: m,
                value: m,
              }))
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
                      next.setMonth(monthNames.indexOf(v))
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
        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="text-base leading-base font-medium tracking-normal text-foreground">
            Time
          </span>
          <Button variant="ghost" size="sm" onClick={setToNow}>
            Now
          </Button>
        </div>
        <div className="flex items-center gap-2 px-4 pb-3">
          <Select value={hour} onValueChange={(v) => v && setHour(v)}>
            <SelectTrigger variant="subtle" size="sm" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 12 }, (_, i) => {
                  const v = String(i + 1).padStart(2, "0")
                  return (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={minute} onValueChange={(v) => v && setMinute(v)}>
            <SelectTrigger variant="subtle" size="sm" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="max-h-60">
              <SelectGroup>
                {Array.from({ length: 60 }, (_, i) => {
                  const v = String(i).padStart(2, "0")
                  return (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger variant="subtle" size="sm" className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function DateRangeContent({
  range,
  onRangeChange,
  onConfirm,
}: {
  range: DateRange | undefined
  onRangeChange: (r: DateRange | undefined) => void
  onConfirm: () => void
}) {
  return (
    <div className="flex w-max flex-col">
      <Calendar
        mode="range"
        selected={range}
        onSelect={onRangeChange}
        numberOfMonths={2}
        defaultMonth={range?.from ?? new Date(2023, 4)}
        className="border-0 shadow-none [--cell-size:1.5rem]"
        classNames={{
          months:
            "relative flex flex-row items-start [&>div+div]:border-l [&>div+div]:border-border [&>div]:py-3 [&>div]:px-3.5",
          nav: "absolute inset-x-3.5 top-3 flex w-auto items-center justify-between gap-1",
          root: "w-fit p-0!",
        }}
      />
      <div className="flex items-center justify-between border-t border-border px-4 py-3.5">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-7 rounded-md bg-secondary px-2 py-1.5 text-base leading-base font-normal tracking-normal text-secondary-foreground">
            {formatDateShort(range?.from) || (
              <span className="text-card-foreground">Start date</span>
            )}
          </span>
          <span className="text-base leading-base font-normal tracking-normal text-secondary-foreground">
            to
          </span>
          <span className="h-7 rounded-md bg-secondary px-2 py-1.5 text-base leading-base font-normal tracking-normal text-secondary-foreground">
            {formatDateShort(range?.to) || (
              <span className="text-card-foreground">End date</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onRangeChange(undefined)
            }}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={onConfirm}>
            Set date
          </Button>
        </div>
      </div>
    </div>
  )
}

function PresetsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState(new Date())
  return (
    <div className="flex w-max">
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
                    next.setMonth(monthNames.indexOf(v))
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
    </div>
  )
}

export default function CalendarPage() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>(
    undefined
  )
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 4, 3),
    to: new Date(2023, 4, 11),
  })
  const [bookedDate, setBookedDate] = useState<Date | undefined>(undefined)
  const [largeCellDate, setLargeCellDate] = useState<Date | undefined>(
    undefined
  )
  const [weekNumDate, setWeekNumDate] = useState<Date | undefined>(undefined)
  const [noOutsideDate, setNoOutsideDate] = useState<Date | undefined>(
    undefined
  )
  const [weekdayDate, setWeekdayDate] = useState<Date | undefined>(undefined)

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
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="w-56 justify-start gap-2 font-normal"
              >
                <img src="/images/svg/calender.svg" alt="" className="size-4" />
                {singleDate ? (
                  <span className="text-foreground">
                    {format(singleDate, "dd")}
                    <span className="text-card-foreground"> / </span>
                    {format(singleDate, "MM")}
                    <span className="text-card-foreground"> / </span>
                    {format(singleDate, "yyyy")}
                  </span>
                ) : (
                  <span className="text-card-foreground">dd / mm / yyyy</span>
                )}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
            <Calendar
              mode="single"
              selected={singleDate}
              onSelect={(d) => setSingleDate(d)}
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Multiple */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple</SectionTitle>
        <CalendarPopover
          buttonContent={
            multipleDates && multipleDates.length > 0
              ? `${multipleDates.length} date${multipleDates.length > 1 ? "s" : ""} selected`
              : "Pick dates"
          }
        >
          {() => (
            <Calendar
              mode="multiple"
              selected={multipleDates}
              onSelect={setMultipleDates}
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          )}
        </CalendarPopover>
      </div>

      {/* Date Picker */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Date Picker</SectionTitle>
        <CalendarPopover
          buttonContent={singleDate ? format(singleDate, "PPP") : "Pick a date"}
        >
          {({ close }) => (
            <Calendar
              mode="single"
              selected={singleDate}
              onSelect={(d) => {
                setSingleDate(d)
                close()
              }}
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          )}
        </CalendarPopover>
      </div>

      {/* Time Input */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Time Input</SectionTitle>
        <TimeInput />
      </div>

      {/* Date Time Picker with Presets */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Date Time Picker with Presets</SectionTitle>
        <CalendarPopover buttonContent="Pick date & time">
          {() => <DateTimePresetContent />}
        </CalendarPopover>
      </div>

      {/* Presets */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Presets</SectionTitle>
        <CalendarPopover buttonContent="Pick a date">
          {() => <PresetsContent />}
        </CalendarPopover>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Date Range Picker</SectionTitle>
        <CalendarPopover
          buttonContent={
            <FormattedRange range={dateRange} fallback="Pick a date range" />
          }
          buttonClassName="w-80"
        >
          {({ close }) => (
            <DateRangeContent
              range={dateRange}
              onRangeChange={setDateRange}
              onConfirm={close}
            />
          )}
        </CalendarPopover>
      </div>

      {/* Booked Dates */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Booked Dates</SectionTitle>
        <CalendarPopover
          buttonContent={bookedDate ? format(bookedDate, "PPP") : "Pick a date"}
        >
          {({ close }) => (
            <Calendar
              mode="single"
              selected={bookedDate}
              onSelect={(d) => {
                setBookedDate(d)
                close()
              }}
              disabled={bookedDates}
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          )}
        </CalendarPopover>
      </div>

      {/* Custom Cell Size */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Custom Cell Size</SectionTitle>
        <CalendarPopover
          buttonContent={
            largeCellDate ? format(largeCellDate, "PPP") : "Pick a date"
          }
        >
          {({ close }) => (
            <Calendar
              mode="single"
              selected={largeCellDate}
              onSelect={(d) => {
                setLargeCellDate(d)
                close()
              }}
              className="border-0 shadow-none [--cell-size:2.75rem]"
            />
          )}
        </CalendarPopover>
      </div>

      {/* Week Numbers */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Week Numbers</SectionTitle>
        <CalendarPopover
          buttonContent={
            weekNumDate ? format(weekNumDate, "PPP") : "Pick a date"
          }
        >
          {({ close }) => (
            <Calendar
              mode="single"
              selected={weekNumDate}
              onSelect={(d) => {
                setWeekNumDate(d)
                close()
              }}
              showWeekNumber
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          )}
        </CalendarPopover>
      </div>

      {/* Without Outside Days */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Without Outside Days</SectionTitle>
        <CalendarPopover
          buttonContent={
            noOutsideDate ? format(noOutsideDate, "PPP") : "Pick a date"
          }
        >
          {({ close }) => (
            <Calendar
              mode="single"
              selected={noOutsideDate}
              onSelect={(d) => {
                setNoOutsideDate(d)
                close()
              }}
              showOutsideDays={false}
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          )}
        </CalendarPopover>
      </div>

      {/* Disabled Weekends */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Weekends</SectionTitle>
        <CalendarPopover
          buttonContent={
            weekdayDate ? format(weekdayDate, "PPP") : "Pick a weekday"
          }
        >
          {({ close }) => (
            <Calendar
              mode="single"
              selected={weekdayDate}
              onSelect={(d) => {
                setWeekdayDate(d)
                close()
              }}
              disabled={{ dayOfWeek: [0, 6] }}
              className="border-0 shadow-none [--cell-size:1.5rem]"
            />
          )}
        </CalendarPopover>
      </div>
    </div>
  )
}
