"use client"

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { useEventContext } from "./context"
import { EventPopover } from "./event-popover"
import { useEventBase } from "./use-event-base"
import { useNow } from "./hooks"
import {
  agendaMonths,
  agendaRangeLabel,
  agendaWeeks,
  type AgendaRow,
  type AgendaWeek,
} from "./agenda-days"
import { hasEnded, rowDescription, rowTimeLabel, rowTiming } from "./row"
import { daysList, daysListFull, monthList, parseDate } from "./utils"
import { shortMonth } from "./month-strip"
import type {
  CalendarEvent,
  EventRowSlotProps,
  EventSlots,
} from "./types"

const NARROW_LIST = 640

/** One listed event in the Agenda, read as a row rather than a pill. */
function EventAgendaRow({
  event,
  date,
  narrow,
  slots,
}: {
  event: CalendarEvent
  date: Date
  narrow?: boolean
  slots: EventSlots
}) {
  const context = useEventContext("EventAgendaRow")
  const {
    config,
    actions,
    bgStyle,
    isActive,
    markActive,
    handleEventClick,
    handleEventEdit,
    handleEventDelete,
    registerDeleteShortcut,
    unregisterDeleteShortcut,
  } = useEventBase(event)
  void context

  const [isPopoverOpen, setPopoverOpen] = React.useState(false)
  const now = useNow()

  const timeLabel = rowTimeLabel(event, config.timeFormat, date)
  const description = rowDescription(event, date)
  const timing = rowTiming(event, date, now)
  const isPast = hasEnded(event, date, now)

  const slotProps: EventRowSlotProps = {
    calendarEvent: event,
    date,
    description,
    timing,
  }

  const hasDescription = !!description || !!slots.eventDescription
  const hasParticipant = !!slots.eventParticipant

  const togglePopover = () => setPopoverOpen((o) => !o)

  function onKeydown(e: React.KeyboardEvent) {
    if (e.key !== "Enter" && e.key !== " ") return
    e.preventDefault()
    markActive()
    if (actions.props.onEventClick) {
      actions.props.onEventClick({
        e: e as unknown as KeyboardEvent,
        calendarEvent: event,
      })
    } else togglePopover()
  }

  return (
    <EventPopover
      open={isPopoverOpen}
      onOpenChange={setPopoverOpen}
      side="bottom"
      calendarEvent={event}
      date={date}
      onOpen={registerDeleteShortcut}
      onClose={unregisterDeleteShortcut}
      onEdit={handleEventEdit}
      onDelete={handleEventDelete}
    >
      <div
        className={cn(
          "event calendar-row flex w-full gap-1.5 rounded-[8px] pr-3 pl-1.5 text-left",
          narrow ? "narrow py-2.5" : "py-1.5",
          isActive && "active",
          isPast && "past",
          !!event.isDraft && "event-draft"
        )}
        style={{ ...bgStyle, width: "100%" }}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleEventClick(e, togglePopover, isPopoverOpen)
        }}
        onDoubleClick={(e) => {
          e.preventDefault()
          handleEventEdit(e)
        }}
        onKeyDown={onKeydown}
      >
        <span
          className={cn(
            "event-border my-px w-[2px] shrink-0 self-stretch rounded-[8px]",
            event.isDraft && "invisible"
          )}
        />
        <div
          className={cn(
            "flex min-w-0 flex-1",
            narrow ? "items-center gap-3" : "items-baseline gap-2.5"
          )}
        >
          {!narrow && (
            <span className="calendar-row-time w-[132px] shrink-0 text-[12px]/[1.35] whitespace-nowrap tabular-nums text-[color:var(--ec-ink-gray-7)]">
              {timeLabel}
            </span>
          )}
          <span
            className={cn(
              "flex min-w-0 flex-1",
              narrow ? "flex-col gap-0.5" : "items-baseline gap-2"
            )}
          >
            <span
              className={cn(
                narrow ? "flex min-w-0 items-baseline gap-2" : "contents"
              )}
            >
              <span
                className={cn(
                  // The size carries its own 20px line: a bare `leading-5`
                  // beside it is merged away, and 13px on a 14.95 line box
                  // let truncate slice the descender off a g or a y.
                  "calendar-row-title truncate",
                  narrow
                    ? "min-w-0 text-[14px]/5 font-medium"
                    : "shrink-0 text-[13px]/5 font-medium",
                  event.isDeclined &&
                    "text-[color:var(--ec-ink-gray-5)]! line-through"
                )}
              >
                {event.title || "[No title]"}
              </span>
              {!narrow && hasDescription ? (
                <span className="calendar-row-description event-subtitle min-w-0 truncate text-[12px] leading-4">
                  {slots.eventDescription
                    ? slots.eventDescription(slotProps)
                    : description}
                </span>
              ) : null}
              <span className="flex shrink-0 items-center gap-1 empty:hidden">
                {slots.eventSuffix ? slots.eventSuffix(slotProps) : null}
              </span>
            </span>
            {narrow ? (
              <span className="event-subtitle flex min-w-0 items-baseline gap-1.5 text-[13px] leading-4">
                <span className="calendar-row-time shrink-0 whitespace-nowrap tabular-nums text-[color:var(--ec-ink-gray-7)]">
                  {timeLabel}
                </span>
                {hasDescription ? (
                  <span className="calendar-row-description min-w-0 truncate">
                    {slots.eventDescription
                      ? slots.eventDescription(slotProps)
                      : description}
                  </span>
                ) : null}
              </span>
            ) : null}
          </span>
          {hasParticipant ? (
            <span className="calendar-row-participant event-subtitle flex shrink-0 items-center gap-1.5 self-center text-[12px] leading-4 whitespace-nowrap">
              {slots.eventParticipant!(slotProps)}
            </span>
          ) : null}
        </div>
      </div>
    </EventPopover>
  )
}

/** Three months as a list of weeks, each week a card of its days. */
export function EventAgenda({
  events,
  anchor,
  jump,
  loading,
  slots,
}: {
  events: CalendarEvent[]
  /** The day the list runs from. */
  anchor: Date
  /** Bumped each time the calendar is told to go to a date. */
  jump?: number
  loading?: boolean
  slots: EventSlots
}) {
  const { actions } = useEventContext("EventAgenda")
  const scroller = React.useRef<HTMLDivElement | null>(null)
  const [listWidth, setListWidth] = React.useState(0)

  React.useEffect(() => {
    const el = scroller.current
    if (!el || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(([entry]) =>
      setListWidth(entry?.contentRect.width ?? 0)
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isNarrow = !!listWidth && listWidth < NARROW_LIST

  const now = useNow()
  const weeks = React.useMemo(
    () => agendaWeeks(events, anchor, now),
    [events, anchor, now]
  )
  const isEmpty = !weeks.length

  const anchoredOnThisMonth =
    anchor.getFullYear() === now.getFullYear() &&
    anchor.getMonth() === now.getMonth()

  const spanKey = `${anchor.getFullYear()}-${anchor.getMonth()}|${jump ?? 0}`
  const positionKey = `${spanKey}|${isNarrow}`
  const positionedFor = React.useRef("")
  // where the list was opened to, so the fade waits for the reader's own scroll
  const openedAt = React.useRef<number | null>(null)

  const openMargin = isNarrow ? 16 : 0

  const positionList = React.useCallback(() => {
    const box = scroller.current
    if (!box) return
    if (!weeks.length) return
    if (!listWidth) return

    positionedFor.current = positionKey
    if (!anchoredOnThisMonth) {
      box.scrollTop = 0
      openedAt.current = box.scrollTop
      return
    }

    const todayKey = parseDate(now)
    const target = Array.from(
      box.querySelectorAll<HTMLElement>("[data-strip-date]")
    ).find((el) => (el.dataset.stripDate ?? "") >= todayKey)
    if (!target) return

    const previous =
      target.previousElementSibling ??
      target.parentElement?.previousElementSibling
    const top = previous?.hasAttribute("data-strip-week") ? previous : target

    box.scrollTop +=
      top.getBoundingClientRect().top -
      box.getBoundingClientRect().top -
      openMargin
    openedAt.current = box.scrollTop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeks.length, listWidth, positionKey, anchoredOnThisMonth, openMargin])

  React.useEffect(() => {
    if (positionedFor.current === positionKey) return
    const frame = requestAnimationFrame(positionList)
    return () => cancelAnimationFrame(frame)
  }, [positionKey, positionList, weeks.length, listWidth])

  /** Which week labels are stuck to the top of the list, for the fade. */
  const onScroll = React.useCallback(() => {
    const list = scroller.current
    if (!list) return
    const top = list.getBoundingClientRect().top
    const opened = list.scrollTop === openedAt.current
    for (const label of list.querySelectorAll<HTMLElement>(
      ".calendar-week-label"
    )) {
      // stuck only once its week has slid up beneath it (a label resting at
      // the top has nothing under it to fade), and not at the spot the list
      // opened to, where today's earlier rows sit under the label unscrolled
      const r = label.getBoundingClientRect()
      const week = label.parentElement?.getBoundingClientRect()
      const stuck =
        !opened &&
        r.top <= top + 0.5 &&
        r.bottom > top &&
        (week?.top ?? top) < top - 0.5
      if (stuck) label.setAttribute("data-stuck", "")
      else label.removeAttribute("data-stuck")
    }
  }, [])

  const spanLabel = (() => {
    const { start, end } = agendaMonths(anchor)
    const name = (d: Date) => monthList[d.getMonth()]
    return start.getFullYear() === end.getFullYear()
      ? `${name(start)} and ${name(end)}`
      : `${name(start)} ${start.getFullYear()} and ${name(end)} ${end.getFullYear()}`
  })()

  const openDay = (date: Date) => {
    actions.setCalendarDate(date)
    actions.updateActiveView("Day", date)
  }

  const openWeek = (start: Date) => {
    actions.setCalendarDate(start)
    requestAnimationFrame(() => actions.updateActiveView("Week", start))
  }

  const weekday = (date: Date) => daysListFull[date.getDay()]

  const dayLabel = (row: AgendaRow) => {
    const date = `${row.date.getDate()} ${shortMonth(row.date)}`
    return row.isToday ? `${daysList[row.date.getDay()]}, ${date}` : date
  }

  const weekName = (week: AgendaWeek) => {
    if (week.isCurrent) return "This week"
    if (week.isNext) return "Next week"
    if (week.isPrevious) return "Last week"
    return null
  }

  return (
    <div
      ref={scroller}
      onScroll={onScroll}
      className={cn(
        "ec-agenda flex min-h-0 flex-1 flex-col overflow-y-auto bg-[color:var(--ec-surface-base)]",
        !isNarrow && "pb-5 pl-5 pr-5"
      )}
    >
      {isEmpty && loading ? (
        <div className="flex justify-center p-10">
          <Spinner className="size-6 text-[color:var(--ec-ink-gray-4)]" />
        </div>
      ) : isEmpty ? (
        <p className="p-10 text-center text-[13px] text-[color:var(--ec-ink-gray-4)]">
          Nothing on between {spanLabel}.
        </p>
      ) : (
        <div className={cn("flex flex-col gap-5", isNarrow && "px-4 pb-4")}>
          {weeks.map((week) => (
            <div key={week.key}>
              {/* The week's heading: a link, sticky while its week is in view. */}
              <button
                type="button"
                data-strip-week=""
                className={cn(
                  "calendar-week-label sticky top-0 z-[2] flex w-full cursor-pointer bg-[color:var(--ec-surface-base)] pb-3 text-[color:var(--ec-ink-gray-8)] hover:text-[color:var(--ec-ink-gray-6)]",
                  week.isPast && "past",
                  isNarrow
                    ? "flex-col items-start gap-0.5 pt-1.5 pl-3.5 text-[16px] font-semibold"
                    : "items-baseline gap-2 pt-1.5 pl-[4px] text-[14px] font-medium"
                )}
                onClick={() => openWeek(week.start)}
              >
                {weekName(week) ?? agendaRangeLabel(week.start, week.end)}
                {weekName(week) ? (
                  <span
                    className={cn(
                      isNarrow
                        ? "text-[13px] font-[420] text-[color:var(--ec-ink-gray-5)]"
                        : "text-[12px] font-[420] text-[color:var(--ec-ink-gray-4)]"
                    )}
                  >
                    {agendaRangeLabel(week.start, week.end)}
                  </span>
                ) : null}
                <ChevronRightIcon className="size-4 self-center text-[color:var(--ec-ink-gray-5)]" />
              </button>

              <div
                className={cn(
                  isNarrow
                    ? "flex flex-col gap-4"
                    : "overflow-hidden rounded-[10px] border border-[color:var(--ec-outline-gray-1)] bg-[color:var(--ec-surface-base)]"
                )}
              >
                {week.days.map((row, index) => (
                  <div
                    key={row.key}
                    data-strip-date={row.key}
                    data-today={row.isToday || undefined}
                    className={cn(
                      "flex",
                      isNarrow && "flex-col gap-1",
                      index &&
                        !isNarrow &&
                        "border-t border-[color:var(--ec-outline-gray-1)]"
                    )}
                  >
                    <button
                      type="button"
                      className={cn(
                        "calendar-day-header flex shrink-0 cursor-pointer items-baseline gap-2 text-left",
                        isNarrow
                          ? "px-3.5 py-1"
                          : "m-1.5 w-[168px] rounded-[6px] px-2 py-1.5",
                        row.isPast && "past"
                      )}
                      onClick={() => openDay(row.date)}
                    >
                      <span
                        className={cn(
                          "shrink-0 text-[color:var(--ec-ink-gray-8)]",
                          isNarrow
                            ? "text-[14px]/5 font-medium"
                            : "text-[13px]/5 font-medium"
                        )}
                      >
                        {slots.agendaDayLabel
                          ? slots.agendaDayLabel(row.date, row.isToday).primary
                          : row.isToday
                            ? "Today"
                            : weekday(row.date)}
                      </span>
                      <span className="min-w-0 truncate text-[13px] leading-5 text-[color:var(--ec-ink-gray-5)]">
                        {slots.agendaDayLabel
                          ? slots.agendaDayLabel(row.date, row.isToday).secondary
                          : dayLabel(row)}
                      </span>
                    </button>

                    <div
                      className={cn(
                        "flex min-w-0 flex-1 flex-col gap-1",
                        !isNarrow && "py-1.5 pr-1.5"
                      )}
                    >
                      {row.events.map((event) => (
                        <EventAgendaRow
                          key={String(event.id ?? event.name)}
                          event={event}
                          date={row.date}
                          narrow={isNarrow}
                          slots={slots}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
