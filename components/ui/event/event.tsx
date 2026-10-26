"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventContext } from "./context"
import { EventStyles } from "./styles"
import { MonthYearCalendar } from "./month-year-calendar"
import { AgendaIcon, DayIcon, MonthIcon, WeekIcon } from "./view-icons"
import { NewEventModal } from "./event-modal"
import { EventMonthly } from "./view-month"
import { EventWeekly } from "./view-week"
import { EventDaily } from "./view-day"
import { EventAgenda } from "./view-agenda"
import { popoverGate, setActiveEvent } from "./hooks"
import { agendaMonths, agendaRange } from "./agenda-days"
import { stripRange } from "./month-strip"
import { stripPlacement } from "./span"
import {
  formatMonthYear,
  getCalendarDates,
  getWeekMonthParts,
  handleSeconds,
  isTargetEditable,
  monthList,
  parseDate,
  calculateMinutes,
  convertMinutesToHours,
} from "./utils"
import type {
  CalendarEvent,
  EventCellClickData,
  EventConfig,
  EventHeaderSlotProps,
  EventPublicProps,
  EventSlots,
  EventView,
} from "./types"

const DEFAULT_CONFIG: EventConfig = {
  scrollToHour: 15,
  disableModes: [],
  defaultMode: "Month",
  isEditMode: false,
  eventIcons: {},
  hourHeight: 70,
  enableShortcuts: true,
  showIcon: true,
  timeFormat: "12h",
  weekends: ["sunday"],
} as EventConfig & { weekends: string[] }

const VIEW_SHORTCUTS: Record<string, EventView> = {
  m: "Month",
  w: "Week",
  a: "Agenda",
  d: "Day",
}

const OVERLAY_SELECTOR =
  '[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]'

interface NavState {
  year: number
  month: number
  dateIdx: number
  weekIdx: number
}

function datesOf(state: Pick<NavState, "year" | "month">) {
  return getCalendarDates(state.month, state.year)
}

function weeksOf(dates: Date[]): Date[][] {
  const copy = [...dates]
  const weeks: Date[][] = []
  while (copy.length) weeks.push(copy.splice(0, 7))
  return weeks
}

function indexOfDate(dates: Date[], date: Date | string) {
  return dates.findIndex(
    (d) => new Date(d).toDateString() === new Date(date).toDateString()
  )
}

function weekOfDate(weeks: Date[][], date?: Date) {
  if (!date) return 0
  const idx = weeks.findIndex((week) =>
    week.find((d) => d.toDateString() === new Date(date).toDateString())
  )
  return Math.max(idx, 0)
}

function firstOfMonth(dates: Date[], month: number, year: number) {
  return indexOfDate(dates, new Date(year, month, 1))
}

function lastOfMonth(dates: Date[], month: number, year: number) {
  return indexOfDate(dates, new Date(year, month + 1, 0))
}

function firstInMonth(weekDates: Date[], month: number) {
  return weekDates.find((d) => d.getMonth() === month) || weekDates[0]
}

export interface EventProps extends EventPublicProps, EventSlots {
  className?: string
  style?: React.CSSProperties
  /** Replaces the default header: the month label and every mover. */
  header?: (props: EventHeaderSlotProps) => React.ReactNode
  /** Extra controls at the end of the default header (e.g. Refresh, New). */
  headerActions?: React.ReactNode
  children?: React.ReactNode
}

/**
 * The calendar: a Month strip, a Week and a Day time grid, and an Agenda
 * list, with a view switcher and navigation over them — frappe-ui's
 * experimental Calendar, ported, with the espresso treatment baked in.
 */
export function Event({
  events: eventsProp = [],
  loading,
  config: configProp,
  onEventClick,
  onEventDblClick,
  onCellClick,
  onCreate,
  onUpdate,
  onDelete,
  onRangeChange,
  header,
  headerActions,
  eventPopoverContent,
  eventDescription,
  eventSuffix,
  eventParticipant,
  agendaDayLabel,
  className,
  style,
}: EventProps) {
  const config = React.useMemo<EventConfig>(
    () => ({ ...DEFAULT_CONFIG, ...configProp }),
    [configProp]
  )

  const [activeView, setActiveView] = React.useState<EventView>(
    config.defaultMode
  )

  const today = React.useMemo(() => new Date(), [])
  const [nav, setNav] = React.useState<NavState>(() => {
    const year = today.getFullYear()
    const month = today.getMonth()
    const dates = getCalendarDates(month, year)
    const dateIdx = indexOfDate(dates, today)
    return {
      year,
      month,
      dateIdx,
      weekIdx: weekOfDate(weeksOf(dates), today),
    }
  })

  const dates = React.useMemo(() => datesOf(nav), [nav.month, nav.year]) // eslint-disable-line react-hooks/exhaustive-deps
  const weeks = React.useMemo(() => weeksOf(dates), [dates])
  const selectedDay: Date | undefined = dates[nav.dateIdx]

  /** Bumped by setCalendarDate; the Agenda scrolls back on every bump. */
  const [agendaJump, setAgendaJump] = React.useState(0)
  const [jumpDate, setJumpDate] = React.useState<Date>(today)

  const [selectedMonthDate, setSelectedMonthDate] = React.useState(() =>
    parseDate(new Date())
  )

  /* ── Events: a fresh internal copy the views edit ─────────────────────── */

  const parseEvents = React.useCallback((): CalendarEvent[] => {
    return (
      eventsProp?.map((event) => {
        const { fromDate, toDate, fromTime, toTime, ...rest } = event
        const timed = !!(fromTime && toTime)
        return {
          ...rest,
          date: fromDate,
          fromDateTime: fromDate + " " + fromTime,
          toDateTime: toDate + " " + toTime,
          fromDate,
          toDate,
          fromTime: timed ? handleSeconds(fromTime!) : fromTime,
          toTime: timed ? handleSeconds(toTime!) : toTime,
        }
      }) || []
    )
  }, [eventsProp])

  const [events, setEvents] = React.useState<CalendarEvent[]>(parseEvents)
  React.useEffect(() => {
    setEvents(parseEvents())
  }, [parseEvents])

  /* ── Navigation ───────────────────────────────────────────────────────── */

  const navRef = React.useRef(nav)
  navRef.current = nav

  const landMonth = React.useCallback(
    (
      year: number,
      month: number,
      land: "first" | "last"
    ): NavState => {
      const nextDates = getCalendarDates(month, year)
      const dateIdx =
        land === "first"
          ? firstOfMonth(nextDates, month, year)
          : lastOfMonth(nextDates, month, year)
      return {
        year,
        month,
        dateIdx,
        weekIdx: weekOfDate(weeksOf(nextDates), nextDates[dateIdx]),
      }
    },
    []
  )

  const incrementMonth = React.useCallback(
    (state: NavState): NavState => {
      let { month, year } = state
      month++
      if (month > 11) {
        month = 0
        year++
      }
      return landMonth(year, month, "first")
    },
    [landMonth]
  )

  const decrementMonth = React.useCallback(
    (state: NavState): NavState => {
      let { month, year } = state
      if (month === 0) {
        month = 11
        year--
      } else month--
      return landMonth(year, month, "last")
    },
    [landMonth]
  )

  const decrementMonthView = React.useCallback(
    (state: NavState): NavState => {
      const back = decrementMonth(state)
      return landMonth(back.year, back.month, "first")
    },
    [decrementMonth, landMonth]
  )

  const incrementWeek = React.useCallback(
    (state: NavState): NavState => {
      const stateDates = getCalendarDates(state.month, state.year)
      const stateWeeks = weeksOf(stateDates)
      const nextWeek = state.weekIdx + 1

      const landWeek = (s: NavState, weekIdx: number): NavState => {
        const d = getCalendarDates(s.month, s.year)
        const w = weeksOf(d)
        const day = firstInMonth(w[weekIdx], s.month)
        return { ...s, weekIdx, dateIdx: indexOfDate(d, day) }
      }

      if (nextWeek < stateWeeks.length) {
        const weekDates = stateWeeks[nextWeek]
        const spansNextMonth = weekDates.some((d) => d.getMonth() !== state.month)
        if (spansNextMonth) return landWeek(incrementMonth(state), 0)
        return landWeek(state, nextWeek)
      }
      return landWeek(incrementMonth(state), 0)
    },
    [incrementMonth]
  )

  const decrementWeek = React.useCallback(
    (state: NavState): NavState => {
      const stateDates = getCalendarDates(state.month, state.year)
      const stateWeeks = weeksOf(stateDates)
      const prevWeek = state.weekIdx - 1

      const landWeek = (s: NavState, weekIdx: number): NavState => {
        const d = getCalendarDates(s.month, s.year)
        const w = weeksOf(d)
        const day = firstInMonth(w[weekIdx], s.month)
        return { ...s, weekIdx, dateIdx: indexOfDate(d, day) }
      }

      if (prevWeek >= 0) {
        const weekDates = stateWeeks[prevWeek]
        const spansPrevMonth = weekDates.some((d) => d.getMonth() !== state.month)
        if (spansPrevMonth) {
          const back = decrementMonth(state)
          const backWeeks = weeksOf(getCalendarDates(back.month, back.year))
          return landWeek(back, backWeeks.length - 1)
        }
        return landWeek(state, prevWeek)
      }

      const back = decrementMonth(state)
      const backWeeks = weeksOf(getCalendarDates(back.month, back.year))
      let targetIndex = backWeeks.length - 1
      const hasNextMonthDates = backWeeks[targetIndex].some(
        (d) => d.getMonth() !== back.month
      )
      if (hasNextMonthDates && targetIndex > 0) targetIndex--
      return landWeek(back, targetIndex)
    },
    [decrementMonth]
  )

  const incrementDay = React.useCallback(
    (state: NavState): NavState => {
      const stateDates = getCalendarDates(state.month, state.year)
      const next = state.dateIdx + 1
      if (
        next > stateDates.length - 1 ||
        stateDates[next]?.getMonth() !== state.month
      ) {
        return incrementMonth(state)
      }
      const stateWeeks = weeksOf(stateDates)
      return {
        ...state,
        dateIdx: next,
        weekIdx: weekOfDate(stateWeeks, stateDates[next]),
      }
    },
    [incrementMonth]
  )

  const decrementDay = React.useCallback(
    (state: NavState): NavState => {
      const stateDates = getCalendarDates(state.month, state.year)
      const prev = state.dateIdx - 1
      if (prev < 0 || stateDates[prev]?.getMonth() !== state.month) {
        return decrementMonth(state)
      }
      const stateWeeks = weeksOf(stateDates)
      return {
        ...state,
        dateIdx: prev,
        weekIdx: weekOfDate(stateWeeks, stateDates[prev]),
      }
    },
    [decrementMonth]
  )

  const syncSelectedMonth = React.useCallback((state: NavState) => {
    setSelectedMonthDate((current) => {
      const currentDay = new Date(current + "T00:00").getDate()
      let tentative = new Date(state.year, state.month, currentDay)
      if (tentative.getMonth() !== state.month) {
        tentative = new Date(state.year, state.month + 1, 0)
      }
      return parseDate(tentative)
    })
  }, [])

  const activeViewRef = React.useRef(activeView)
  activeViewRef.current = activeView

  const increment = React.useCallback(() => {
    const view = activeViewRef.current
    setNav((state) => {
      const next =
        view === "Month" || view === "Agenda"
          ? incrementMonth(state)
          : view === "Week"
            ? incrementWeek(state)
            : incrementDay(state)
      syncSelectedMonth(next)
      return next
    })
  }, [incrementMonth, incrementWeek, incrementDay, syncSelectedMonth])

  const decrement = React.useCallback(() => {
    const view = activeViewRef.current
    setNav((state) => {
      const next =
        view === "Month" || view === "Agenda"
          ? decrementMonthView(state)
          : view === "Week"
            ? decrementWeek(state)
            : decrementDay(state)
      syncSelectedMonth(next)
      return next
    })
  }, [decrementMonthView, decrementWeek, decrementDay, syncSelectedMonth])

  const setCalendarDate = React.useCallback(
    (d?: Date | string) => {
      const dt = d ? new Date(d) : new Date()
      if (dt.toString() === "Invalid Date") return
      setAgendaJump((n) => n + 1)
      setJumpDate(dt)
      const year = dt.getFullYear()
      const month = dt.getMonth()
      const nextDates = getCalendarDates(month, year)
      let dateIdx = indexOfDate(nextDates, dt)
      if (dateIdx < 0) dateIdx = firstOfMonth(nextDates, month, year)
      const next = {
        year,
        month,
        dateIdx,
        weekIdx: weekOfDate(weeksOf(nextDates), dt),
      }
      setNav(next)
      syncSelectedMonth(next)
    },
    [syncSelectedMonth]
  )

  const updateActiveView = React.useCallback((value: EventView, d?: Date) => {
    setActiveView(value)
    setNav((state) => {
      const stateDates = getCalendarDates(state.month, state.year)
      if (value === "Day" && d) {
        const idx = indexOfDate(stateDates, d)
        if (idx >= 0) return { ...state, dateIdx: idx }
        return state
      }
      if (value === "Week") {
        return {
          ...state,
          weekIdx: weekOfDate(weeksOf(stateDates), stateDates[state.dateIdx]),
        }
      }
      return state
    })
  }, [])

  const onMonthYearChange = React.useCallback(
    (val: string | Date = "") => {
      const d = new Date(val)
      if (Number.isNaN(d.getTime())) return
      setSelectedMonthDate(parseDate(d))
      setCalendarDate(d)
    },
    [setCalendarDate]
  )

  /* ── Shortcuts ────────────────────────────────────────────────────────── */

  React.useEffect(() => {
    if (!config.enableShortcuts) return
    const handler = (e: KeyboardEvent) => {
      if (document.querySelector(OVERLAY_SELECTOR)) return
      if (isTargetEditable(e)) return
      const view = VIEW_SHORTCUTS[e.key.toLowerCase()]
      if (view) setActiveView(view)
      if (e.key.toLowerCase() === "t") setCalendarDate()
      if (e.key === "ArrowLeft") decrement()
      if (e.key === "ArrowRight") increment()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [config.enableShortcuts, setCalendarDate, decrement, increment])

  /* ── CRUD + cell clicks ───────────────────────────────────────────────── */

  const [showEventModal, setShowEventModal] = React.useState(false)
  const [newEvent, setNewEvent] = React.useState<CalendarEvent>({})

  const propsBag = React.useMemo<EventPublicProps>(
    () => ({
      events: eventsProp,
      loading,
      config: configProp,
      onEventClick,
      onEventDblClick,
      onCellClick,
    }),
    [eventsProp, loading, configProp, onEventClick, onEventDblClick, onCellClick]
  )

  const createNewEvent = React.useCallback(
    (event: CalendarEvent) => {
      event.fromDateTime = event.fromDate + " " + event.fromTime
      event.toDateTime = event.toDate + " " + event.toTime
      setEvents((list) => [...list, event])
      onCreate?.(event)
    },
    [onCreate]
  )

  const updateEventState = React.useCallback(
    (event: CalendarEvent) => {
      event = stripPlacement(event)
      event.fromDateTime = event.fromDate + " " + event.fromTime
      event.toDateTime = event.toDate + " " + event.toTime
      setEvents((list) => {
        const idx = list.findIndex((e) => e.id === event.id)
        if (idx < 0) return list
        const next = [...list]
        next[idx] = event
        return next
      })
      onUpdate?.(event)
    },
    [onUpdate]
  )

  const deleteEvent = React.useCallback(
    (eventID: CalendarEvent["id"]) => {
      setEvents((list) => list.filter((event) => event.id !== eventID))
      onDelete?.(eventID)
    },
    [onDelete]
  )

  const handleCellClick = React.useCallback(
    (
      e: React.MouseEvent | MouseEvent,
      date: Date | string,
      time = "",
      isFullDay = false
    ) => {
      if (popoverGate.open) {
        popoverGate.open = false
        return
      }
      setActiveEvent("")

      const data: EventCellClickData = {
        e,
        view: activeViewRef.current,
        date,
        time,
        isFullDay,
      }

      if (onCellClick) {
        onCellClick(data)
        return
      }

      // The default: the new-event modal, in edit mode.
      if (!config.isEditMode) return
      const formattedDate = parseDate(new Date(date))
      const base: CalendarEvent = {
        date: formattedDate,
        fromDate: formattedDate,
        toDate: formattedDate,
        isFullDay,
        participant: "",
        venue: "",
        title: "",
      }
      if (data.view === "Month" || data.view === "Agenda") {
        setNewEvent(base)
        setShowEventModal(true)
        return
      }
      const toTime = convertMinutesToHours(calculateMinutes(time) + 60).slice(
        0,
        -3
      )
      setNewEvent({ ...base, fromTime: time, toTime })
      setShowEventModal(true)
    },
    [onCellClick, config.isEditMode]
  )

  const actions = React.useMemo(
    () => ({
      createNewEvent,
      updateEventState,
      deleteEvent,
      handleCellClick,
      updateActiveView,
      setCalendarDate,
      props: propsBag,
    }),
    [
      createNewEvent,
      updateEventState,
      deleteEvent,
      handleCellClick,
      updateActiveView,
      setCalendarDate,
      propsBag,
    ]
  )

  /* ── Title + range ────────────────────────────────────────────────────── */

  const agendaAnchor = selectedDay ?? new Date()

  const currentMonthYear = (() => {
    if (activeView === "Day") {
      const dayDate = dates[nav.dateIdx]
      if (dayDate) {
        return `${daysShort[dayDate.getDay()]}, ${dayDate.getDate()} ${monthList[
          dayDate.getMonth()
        ].slice(0, 3)} ${dayDate.getFullYear()}`
      }
    }
    if (activeView === "Agenda") {
      const { start, end } = agendaMonths(agendaAnchor)
      const short = (d: Date) => monthList[d.getMonth()].slice(0, 3)
      return start.getFullYear() === end.getFullYear()
        ? `${short(start)} – ${short(end)} ${end.getFullYear()}`
        : `${short(start)} ${start.getFullYear()} – ${short(end)} ${end.getFullYear()}`
    }
    if (activeView !== "Week") return formatMonthYear(nav.month, nav.year)
    const weekDates = weeks[nav.weekIdx] || []
    if (!weekDates.length) return formatMonthYear(nav.month, nav.year)
    const parts = getWeekMonthParts(weekDates)
    if (parts.length === 1) return formatMonthYear(parts[0].month, parts[0].year)
    const short = monthList.map((m) => m.slice(0, 3))
    const first = parts[0]
    const last = parts[parts.length - 1]
    return first.year === last.year
      ? `${short[first.month]} - ${short[last.month]} ${first.year}`
      : `${short[first.month]} ${first.year} - ${short[last.month]} ${last.year}`
  })()

  const lastRangeKey = React.useRef("")
  React.useEffect(() => {
    if (!onRangeChange) return
    const range = (() => {
      if (activeView === "Day") {
        const day = selectedDay
        if (!day) return null
        const key = parseDate(day)
        return { startDate: key, endDate: key }
      }
      if (activeView === "Week") {
        const weekDates = weeks[nav.weekIdx] || []
        if (!weekDates.length) return null
        const ordered = [...weekDates].sort((a, b) => a.getTime() - b.getTime())
        return {
          startDate: parseDate(ordered[0]),
          endDate: parseDate(ordered[ordered.length - 1]),
        }
      }
      if (activeView === "Agenda") {
        const { start, end } = agendaRange(agendaAnchor)
        return { startDate: parseDate(start), endDate: parseDate(end) }
      }
      const r = stripRange(nav.month, nav.year)
      return { startDate: parseDate(r.start), endDate: parseDate(r.end) }
    })()
    if (!range) return
    const key = `${activeView}-${range.startDate}-${range.endDate}`
    if (key === lastRangeKey.current) return
    lastRangeKey.current = key
    onRangeChange({ view: activeView, ...range })
  })

  /* ── Render ───────────────────────────────────────────────────────────── */

  const enabledModes = (
    ["Day", "Week", "Month", "Agenda"] as EventView[]
  ).filter((mode) => !config.disableModes.includes(mode))

  const slots: EventSlots = React.useMemo(
    () => ({
      eventPopoverContent,
      eventDescription,
      eventSuffix,
      eventParticipant,
      agendaDayLabel,
    }),
    [
      eventPopoverContent,
      eventDescription,
      eventSuffix,
      eventParticipant,
      agendaDayLabel,
    ]
  )

  const headerProps: EventHeaderSlotProps = {
    currentMonthYear,
    currentYear: nav.year,
    currentMonth: nav.month,
    enabledModes: enabledModes.map((value) => ({ label: value, value })),
    activeView,
    decrement,
    increment,
    updateActiveView,
    setCalendarDate,
    onMonthYearChange,
    selectedMonthDate,
  }

  const contextValue = React.useMemo(
    () => ({ config, actions, activeView, slots }),
    [config, actions, activeView, slots]
  )

  return (
    <EventContext.Provider value={contextValue}>
      <EventStyles />
      <div className={cn("ec-scope flex h-full flex-col", className)} style={style}>
        {header ? (
          header(headerProps)
        ) : (
          <DefaultHeader {...headerProps} actions={headerActions} />
        )}

        {activeView === "Month" && (
          <EventMonthly
            events={events}
            currentMonth={nav.month}
            currentYear={nav.year}
            currentDate={selectedDay}
            jumpDate={jumpDate}
            config={config}
          />
        )}
        {activeView === "Week" && (
          <EventWeekly
            events={events}
            weeklyDates={weeks[nav.weekIdx] ?? []}
            config={config}
          />
        )}
        {activeView === "Day" && selectedDay && (
          <EventDaily events={events} currentDate={selectedDay} config={config} />
        )}
        {activeView === "Agenda" && (
          <EventAgenda
            events={events}
            anchor={agendaAnchor}
            jump={agendaJump}
            loading={loading}
            slots={slots}
          />
        )}

        <NewEventModal
          open={showEventModal}
          onOpenChange={setShowEventModal}
          event={newEvent}
        />
      </div>
    </EventContext.Provider>
  )
}

const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/** The default header: month picker, movers, Today and the view switcher. */
const VIEW_ICONS: Record<EventView, React.ComponentType<{ className?: string }>> = {
  Day: DayIcon,
  Week: WeekIcon,
  Month: MonthIcon,
  Agenda: AgendaIcon,
}

const FULL_MONTH =
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g

/** "Oct 2026": the label without its weekday and day (Day view), months short. */
function shortMonthYear(label: string, view: EventView) {
  const s = view === "Day" ? label.replace(/^[^,]+,\s*\d+\s*/, "") : label
  return s.replace(FULL_MONTH, (m) => m.slice(0, 3))
}

// The event page's sub-header: the month with its picker, then ‹ Today ›
// and the view switcher (13px labels, 4px between the tabs), then any
// `actions` the app adds.
function DefaultHeader({
  currentMonthYear,
  enabledModes,
  activeView,
  decrement,
  increment,
  updateActiveView,
  setCalendarDate,
  onMonthYearChange,
  selectedMonthDate,
  actions,
}: EventHeaderSlotProps & { actions?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="mt-3.5 mb-4 flex h-8 shrink-0 items-center gap-8 pr-5 pl-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="group -ml-2 flex h-8 items-center gap-2 rounded-[8px] px-2 text-[16px] font-medium text-[color:var(--ec-ink-gray-7)] outline-none transition-colors hover:text-[color:var(--ec-ink-gray-6)] focus-visible:ring-2 focus-visible:ring-border-normal"
            >
              {shortMonthYear(currentMonthYear, activeView)}
              <ChevronDownIcon
                className={cn(
                  "size-4 text-[color:var(--ec-ink-gray-5)] transition-[color,rotate] group-hover:text-[color:var(--ec-ink-gray-4)]",
                  open && "rotate-180"
                )}
              />
            </button>
          }
        />
        <PopoverContent align="start" className="w-auto p-2">
          <MonthYearCalendar
            mode="single"
            selected={new Date(selectedMonthDate + "T00:00")}
            defaultMonth={new Date(selectedMonthDate + "T00:00")}
            onSelect={(date) => {
              if (date) onMonthYearChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Previous"
            onClick={decrement}
          >
            <ChevronLeftIcon />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setCalendarDate()}>
            Today
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Next"
            onClick={increment}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <Tabs
          value={activeView}
          onValueChange={(value) => updateActiveView(value as EventView)}
        >
          <TabsList size="sm" className="gap-1">
            <TabsIndicator />
            {enabledModes.map((mode) => {
              const Icon = VIEW_ICONS[mode.value]
              return (
                <TabsTrigger
                  key={mode.value}
                  value={mode.value}
                  className="text-[13px] leading-[16.1px]! tracking-[0.02em]"
                >
                  <Icon className="size-4 shrink-0" />
                  {mode.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
        {actions}
      </div>
    </div>
  )
}
