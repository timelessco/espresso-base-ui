"use client"

import { useState, useEffect, useRef } from "react"
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
import { addDays, addMonths, format, subMonths } from "date-fns"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

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

// The date picker's "Today": a sun, as the playground draws it (tomorrow.svg).
function TodayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15.9995 25.4005C16.5518 25.4005 16.9995 25.8482 16.9995 26.4005V29.0001C16.9993 29.5522 16.5517 30.0001 15.9995 30.0001C15.4474 30.0001 14.9997 29.5522 14.9995 29.0001V26.4005C14.9995 25.8482 15.4472 25.4005 15.9995 25.4005ZM7.29248 23.172C7.68287 22.7816 8.31599 22.7819 8.70654 23.172C9.09707 23.5625 9.09707 24.1955 8.70654 24.5861L6.70654 26.5861C6.31602 26.9766 5.683 26.9766 5.29248 26.5861C4.90235 26.1955 4.90209 25.5624 5.29248 25.172L7.29248 23.172ZM23.1733 23.172C23.5639 22.782 24.197 22.7816 24.5874 23.172L26.5874 25.172C26.9777 25.5624 26.9774 26.1955 26.5874 26.5861C26.1969 26.9766 25.5639 26.9765 25.1733 26.5861L23.1733 24.5861C22.7828 24.1955 22.7828 23.5625 23.1733 23.172ZM15.9995 9.00012C19.8655 9.00012 22.9995 12.1341 22.9995 16.0001C22.9995 19.8661 19.8655 23.0001 15.9995 23.0001C12.1337 22.9999 8.99956 19.8659 8.99951 16.0001C8.99951 12.1343 12.1337 9.00033 15.9995 9.00012ZM15.9995 11.0001C13.2383 11.0003 10.9995 13.2388 10.9995 16.0001C10.9996 18.7614 13.2383 20.9999 15.9995 21.0001C18.7609 21.0001 20.9995 18.7615 20.9995 16.0001C20.9995 13.2387 18.7609 11.0001 15.9995 11.0001ZM5.59912 15.0001C6.15141 15.0001 6.59912 15.4478 6.59912 16.0001C6.59912 16.5524 6.15141 17.0001 5.59912 17.0001H2.99951C2.44723 17.0001 1.99951 16.5524 1.99951 16.0001C1.99951 15.4478 2.44723 15.0001 2.99951 15.0001H5.59912ZM28.9995 15.0001C29.5516 15.0003 29.9995 15.448 29.9995 16.0001C29.9995 16.5523 29.5516 16.9999 28.9995 17.0001H26.3999C25.8476 17.0001 25.3999 16.5524 25.3999 16.0001C25.3999 15.4478 25.8476 15.0001 26.3999 15.0001H28.9995ZM5.41357 5.41223C5.80417 5.02262 6.43742 5.02201 6.82764 5.41223L8.82764 7.41223C9.2178 7.80245 9.21722 8.43572 8.82764 8.82629C8.43713 9.2168 7.8041 9.21676 7.41357 8.82629L5.41357 6.82629C5.02305 6.43577 5.02305 5.80276 5.41357 5.41223ZM25.1733 5.29309C25.5639 4.903 26.197 4.90271 26.5874 5.29309C26.9774 5.68351 26.9774 6.31674 26.5874 6.70715L24.5874 8.70715C24.197 9.09753 23.5639 9.09725 23.1733 8.70715C22.7828 8.31663 22.7828 7.68362 23.1733 7.29309L25.1733 5.29309ZM15.9995 2.00012C16.5518 2.00012 16.9995 2.44784 16.9995 3.00012V5.59973C16.9995 6.15202 16.5518 6.59973 15.9995 6.59973C15.4472 6.59973 14.9995 6.15202 14.9995 5.59973V3.00012C14.9995 2.44784 15.4472 2.00012 15.9995 2.00012Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Calendar whose caption is a button: clicking it swaps the month grid for a
// two-column scrollable year/month picker sized to match the calendar.
// Picking a year keeps the picker open; picking a month returns to the grid.
function MonthYearCalendar({
  className,
  ...props
}: React.ComponentProps<typeof Calendar>) {
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => (props.defaultMonth as Date | undefined) ?? new Date()
  )
  const month = (props.month as Date | undefined) ?? internalMonth
  const setMonth = (next: Date) => {
    setInternalMonth(next)
    props.onMonthChange?.(next)
  }
  const [pickerOpen, setPickerOpen] = useState(false)
  const [panelSize, setPanelSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLButtonElement>(null)
  const monthRef = useRef<HTMLButtonElement>(null)

  const years = Array.from({ length: 14 }, (_, i) => 2017 + i)

  useEffect(() => {
    if (pickerOpen) {
      yearRef.current?.scrollIntoView({ block: "center" })
      monthRef.current?.scrollIntoView({ block: "center" })
    }
  }, [pickerOpen])

  const openPicker = () => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (rect) setPanelSize({ width: rect.width, height: rect.height })
    setPickerOpen(true)
  }

  const captionButton = (
    <Button
      variant="ghost"
      size="xs"
      className="h-6 gap-0.5 rounded-md px-1.5 text-sm font-medium tracking-[0.02em] text-secondary-foreground hover:bg-muted dark:hover:bg-muted"
      onClick={() => (pickerOpen ? setPickerOpen(false) : openPicker())}
    >
      {format(month, "MMM yyyy")}
      {/* down while the days show, up while the month list is open */}
      <ChevronDown
        className={cn("size-3.5 transition-[rotate]", pickerOpen && "rotate-180")}
      />
    </Button>
  )

  if (pickerOpen) {
    return (
      <div
        className={cn("flex flex-col [--cell-size:1.5rem]", className)}
        style={panelSize ?? { width: 196, height: 226 }}
      >
        <div className="flex h-(--cell-size) shrink-0 items-center">
          {captionButton}
        </div>
        <div className="mt-1.5 flex min-h-0 flex-1 gap-1">
          <div className="scrollbar-hide flex flex-1 flex-col gap-0.5 overflow-y-auto [animation:scroll-fade-y_linear_both] [animation-timeline:scroll(self)]">
            {years.map((year) => (
              <Button
                key={year}
                ref={year === month.getFullYear() ? yearRef : undefined}
                variant="ghost"
                size="sm"
                onClick={() => setMonth(new Date(year, month.getMonth(), 1))}
                className={cn(
                  "shrink-0 justify-start text-sm",
                  year === month.getFullYear() && "bg-secondary"
                )}
              >
                {year}
              </Button>
            ))}
          </div>
          <div className="scrollbar-hide flex flex-1 flex-col gap-0.5 overflow-y-auto [animation:scroll-fade-y_linear_both] [animation-timeline:scroll(self)]">
            {monthNames.map((name, index) => (
              <Button
                key={name}
                ref={index === month.getMonth() ? monthRef : undefined}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMonth(new Date(month.getFullYear(), index, 1))
                  setPickerOpen(false)
                }}
                className={cn(
                  "shrink-0 justify-start text-sm",
                  index === month.getMonth() && "bg-secondary"
                )}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="w-fit">
      <Calendar
        {...props}
        month={month}
        onMonthChange={setMonth}
        className={className}
        components={{
          MonthCaption: () => (
            <div className="flex h-(--cell-size) items-center">
              {captionButton}
            </div>
          ),
          Nav: ({ className: navClassName }) => (
            // the nav strip spans the whole header; let clicks pass through
            // to the caption button underneath except on the nav buttons
            <div
              className={cn(
                navClassName,
                // match the caption row height so the nav buttons stay
                // vertically centered at any --cell-size
                "pointer-events-none h-(--cell-size) [&>*]:pointer-events-auto"
              )}
            >
              <Button
                variant="ghost"
                size="icon-xs"
                className="h-6 w-[22px] rounded-md text-secondary-foreground hover:bg-muted dark:hover:bg-muted [&_svg]:size-3.5"
                aria-label="Previous month"
                onClick={() => setMonth(subMonths(month, 1))}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="h-6 w-[22px] rounded-md text-secondary-foreground hover:bg-muted dark:hover:bg-muted [&_svg]:size-3.5"
                aria-label="Today"
                title="Today"
                onClick={() => setMonth(new Date())}
              >
                <TodayIcon />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="h-6 w-[22px] rounded-md text-secondary-foreground hover:bg-muted dark:hover:bg-muted [&_svg]:size-3.5"
                aria-label="Next month"
                onClick={() => setMonth(addMonths(month, 1))}
              >
                <ChevronRight />
              </Button>
            </div>
          ),
        }}
      />
    </div>
  )
}

function CalendarPopover({
  buttonContent,
  buttonClassName,
  contentClassName,
  align = "start",
  children,
}: {
  buttonContent: React.ReactNode
  buttonClassName?: string
  contentClassName?: string
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
      <PopoverContent
        className={cn("w-auto p-2", contentClassName)}
        align={align}
        sideOffset={4}
      >
        {children({ close: () => setOpen(false) })}
      </PopoverContent>
    </Popover>
  )
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

  return (
    <div className="flex w-max">
      <div className="flex flex-col items-start gap-px border-r border-border p-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm"
          onClick={() => {
            const d = addDays(new Date(), 1)
            setDate(d)
            setMonth(d)
          }}
        >
          Tomorrow
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm"
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
        <MonthYearCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
          className="w-full border-0 p-2 shadow-none [--cell-size:1.5rem] [&_tbody>tr]:mt-1.5"
        />
        <div className="flex items-center gap-1 border-t p-2">
          <Select value={hour} onValueChange={(v) => v && setHour(v)}>
            <SelectTrigger variant="subtle" size="xs" className="w-full">
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
            <SelectTrigger variant="subtle" size="xs" className="w-full">
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
            <SelectTrigger variant="subtle" size="xs" className="w-16">
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
            "relative flex flex-row items-stretch [&>div+div]:border-l [&>div+div]:border-border [&>div]:py-2 [&>div]:px-2",
          nav: "absolute inset-x-2 top-2 flex w-auto items-center justify-between gap-1",
          root: "w-fit p-0!",
        }}
      />
      <div className="flex items-center justify-end border-t border-border p-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              onRangeChange(undefined)
            }}
          >
            Cancel
          </Button>
          <Button size="xs" onClick={onConfirm}>
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
      <div className="flex flex-col items-start gap-px border-r border-border p-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm"
          onClick={() => {
            const d = addDays(new Date(), 1)
            setDate(d)
            setMonth(d)
          }}
        >
          Tomorrow
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm"
          onClick={() => {
            const d = addDays(new Date(), 7)
            setDate(d)
            setMonth(d)
          }}
        >
          Next week
        </Button>
      </div>
      <MonthYearCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
        className="w-full border-0 p-2 shadow-none [--cell-size:1.5rem] [&_tbody>tr]:mt-1.5"
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
          <PopoverContent className="w-auto p-2" align="start" sideOffset={4}>
            <MonthYearCalendar
              mode="single"
              selected={singleDate}
              onSelect={setSingleDate}
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
            <MonthYearCalendar
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
            <MonthYearCalendar
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
        <CalendarPopover
          buttonContent="Pick date & time"
          contentClassName="p-0"
        >
          {() => <DateTimePresetContent />}
        </CalendarPopover>
      </div>

      {/* Presets */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Presets</SectionTitle>
        <CalendarPopover buttonContent="Pick a date" contentClassName="p-0">
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
          contentClassName="p-0"
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
            <MonthYearCalendar
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
            <MonthYearCalendar
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
            <MonthYearCalendar
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
            <MonthYearCalendar
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
            <MonthYearCalendar
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
