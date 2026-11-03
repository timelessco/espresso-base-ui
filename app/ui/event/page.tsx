"use client"

/**
 * The Event page, as the frappe espresso playground draws it: a 48px app
 * header, a 32px sub-header, then the calendar — 70px to the hour and 72 to
 * the gutter — with a side panel that opens on a click or a drag, and the
 * page's own drag systems laid over the grid.
 */
import * as React from "react"
import {
  CalendarIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { MonthYearCalendar } from "@/components/ui/event/month-year-calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Event,
  setActiveEvent,
  type CalendarEvent,
} from "@/components/ui/event"

import { AvatarStack } from "./avatar-stack"
import { EventPanel } from "./event-panel"
import {
  AgendaIcon,
  DayIcon,
  DotIcon,
  MonthIcon,
  TaskIcon,
  WeekIcon,
} from "./icons"
import {
  colourValue,
  eventsFor,
  nameOf,
  sources,
  type CalendarSource,
} from "./sample-events"
import {
  useDragShadow,
  useDragToCreate,
  useMonthDragSkeleton,
  useMonthDragToCreate,
  useMonthResize,
  type CalendarDraft,
  type MonthResize,
} from "./drag"

const HOUR_HEIGHT = 70
const DRAFT_ID = "__draft__"

const FULL_MONTH =
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g

/** "September 2026" → "Sep 2026"; "Thu, 25 Sep 2026" → "Sep 2026". */
function monthYear(label: string, view: string) {
  const s = view === "Day" ? label.replace(/^[^,]+,\s*\d+\s*/, "") : label
  return s.replace(FULL_MONTH, (m) => m.slice(0, 3))
}

/** The Day view's own band: the name, the number, whether it is today. */
function dayBand(label: string) {
  const m = label.match(/^([^,]+),\s*(\d+)\s+(\w+)\s+(\d+)/)
  if (!m) return { name: label, date: "", today: false }
  const [, name, day, month, year] = m
  const shown = new Date(`${month} ${day}, ${year}`)
  return {
    name,
    date: day,
    today: shown.toDateString() === new Date().toDateString(),
  }
}

const hhmm = (t?: unknown) => (t ? String(t).slice(0, 5) : "")
const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const minutesOf = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return (h || 0) * 60 + (m || 0)
}
const daysAcross = (from: string, to: string) =>
  Math.round((new Date(to).getTime() - new Date(from).getTime()) / 864e5) + 1

function startsAt(e: CalendarEvent, date: Date): string {
  if (e.isFullDay) return "All day"
  const key = dayKey(date)
  if (e.fromDate && e.fromDate < key) return "All day"
  return hhmm(e.segFromTime || e.fromTime) || "All day"
}

function lasts(e: CalendarEvent, date: Date): string {
  const days = e.fromDate && e.toDate ? daysAcross(e.fromDate, e.toDate) : 1
  if (days > 1) return `${days} days`
  if (e.isFullDay) return "All day"
  const from = hhmm(e.segFromTime || e.fromTime)
  const to = hhmm(e.segToTime || e.toTime)
  if (!from || !to) return startsAt(e, date)
  const mins = Math.max(0, minutesOf(to) - minutesOf(from))
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h && m ? `${h}h ${m}m` : h ? `${h}h` : `${m}m`
}

const noteOf = (e: CalendarEvent): string =>
  (e as { description?: string }).description?.trim() ?? ""

const namesOf = (e: CalendarEvent): string[] =>
  String(e.participant || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .map(nameOf)

const headerPeople = [
  "Sally Potter",
  "Emily Taylor",
  "Shariq Ansari",
  "Faris Ansari",
  "Gowtham Sivakumar",
]

const views = [
  { label: "Day", value: "Day", Icon: DayIcon },
  { label: "Week", value: "Week", Icon: WeekIcon },
  { label: "Month", value: "Month", Icon: MonthIcon },
  { label: "Agenda", value: "Agenda", Icon: AgendaIcon },
]

export default function EventPage() {
  const [calendars] = React.useState<CalendarSource[]>(
    sources.map((s) => ({ ...s }))
  )
  const [created, setCreated] = React.useState<CalendarEvent[]>([])
  const [hidden, setHidden] = React.useState<string[]>([])

  const [panel, setPanel] = React.useState<{
    event: CalendarEvent | null
    draft: CalendarDraft | null
    kind: "Event" | "Task"
  } | null>(null)
  const [draftTitle, setDraftTitle] = React.useState("")
  const [draftColour, setDraftColour] = React.useState("gray")
  const lastDragEnded = React.useRef(0)

  /** The span being filled in, drawn on the grid while the panel is open. */
  const draftEvent = React.useMemo<CalendarEvent | null>(() => {
    const d = panel?.draft
    if (!d || panel?.event) return null
    return {
      id: DRAFT_ID,
      title: draftTitle || "New event",
      fromDate: d.fromDate,
      toDate: d.toDate,
      fromTime: d.allDay ? undefined : d.fromTime,
      toTime: d.allDay ? undefined : d.toTime,
      isFullDay: d.allDay,
      isDraft: true,
      color: colourValue(draftColour),
    }
  }, [panel, draftTitle, draftColour])

  const events = React.useMemo(
    () => [
      ...eventsFor(calendars).filter((e) => !hidden.includes(String(e.id))),
      ...created,
      ...(draftEvent ? [draftEvent] : []),
    ],
    [calendars, hidden, created, draftEvent]
  )

  /* ── The panel's ways in ──────────────────────────────────────────────── */

  const openEvent = React.useCallback(
    ({ calendarEvent }: { calendarEvent: CalendarEvent }) => {
      if (String(calendarEvent.id) === DRAFT_ID) return
      setPanel({ event: calendarEvent, draft: null, kind: "Event" })
    },
    []
  )

  // The event is marked open for as long as its panel is (the component marks
  // it on the click); the panel closed — by its ×, a delete or anything else —
  // the mark goes too, or the card kept its open fill with nothing open.
  const panelEvent = panel?.event ?? null
  React.useEffect(() => {
    if (!panelEvent) setActiveEvent("")
  }, [panelEvent])

  const openNewOf = (kind: "Event" | "Task") => {
    setDraftTitle("")
    setDraftColour("gray")
    setPanel({ event: null, draft: null, kind })
  }

  const openDraft = React.useCallback((draft: CalendarDraft) => {
    lastDragEnded.current = Date.now()
    setDraftTitle("")
    setDraftColour("gray")
    setPanel({ event: null, draft, kind: "Event" })
  }, [])

  const onDraftChange = React.useCallback((draft: CalendarDraft) => {
    setPanel((p) => (p ? { ...p, draft } : p))
  }, [])

  const openFromCell = React.useCallback(
    (data: { date?: Date | string; time?: string; isFullDay?: boolean }) => {
      if (Date.now() - lastDragEnded.current < 400) return
      const d = data.date ? new Date(data.date) : new Date()
      if (Number.isNaN(d.getTime())) return
      const pad = (n: number) => String(n).padStart(2, "0")
      const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
      const from = data.time && /^\d/.test(data.time) ? data.time : "09:00"
      const [h, m] = from.split(":").map(Number)
      const to = `${pad(((h ?? 9) + 1) % 24)}:${pad(m ?? 0)}`
      openDraft({
        fromDate: iso,
        toDate: iso,
        fromTime: from,
        toTime: to,
        allDay: false,
      })
    },
    [openDraft]
  )

  /* ── Changes, kept ────────────────────────────────────────────────────── */

  const remember = React.useCallback(
    (ev: CalendarEvent, patch: Partial<CalendarEvent>) => {
      const id = String(ev.id)
      setCreated((list) => {
        if (list.some((e) => String(e.id) === id)) {
          return list.map((e) => (String(e.id) === id ? { ...e, ...patch } : e))
        }
        setHidden((h) => [...h, id])
        return [...list, { ...ev, ...patch }]
      })
    },
    []
  )

  const eventsRef = React.useRef(events)
  eventsRef.current = events

  const rememberMove = React.useCallback(
    (ev: CalendarEvent) => {
      if (!ev || ev.isDraft || String(ev.id) === DRAFT_ID) return
      const held = eventsRef.current.find((e) => String(e.id) === String(ev.id))
      if (!held) return
      const patch = {
        fromDate: ev.fromDate,
        toDate: ev.toDate,
        fromTime: ev.fromTime,
        toTime: ev.toTime,
      }
      const same =
        String(held.fromDate) === String(patch.fromDate) &&
        String(held.toDate) === String(patch.toDate) &&
        String(held.fromTime) === String(patch.fromTime) &&
        String(held.toTime) === String(patch.toTime)
      if (same) return
      remember(held, patch)
    },
    [remember]
  )

  const saveEvent = React.useCallback(
    (payload: CalendarEvent) => {
      const id = String(payload.id)
      const next = {
        ...payload,
        color: colourValue(String(payload.color ?? "gray")),
      }
      setCreated((list) => {
        if (list.some((e) => String(e.id) === id)) {
          return list.map((e) => (String(e.id) === id ? { ...e, ...next } : e))
        }
        setHidden((h) => [...h, id])
        return [...list, { ...next }]
      })
    },
    []
  )

  const createEvent = React.useCallback((payload: CalendarEvent) => {
    setCreated((list) => [
      ...list,
      {
        ...payload,
        id: `made-${Date.now()}`,
        isDraft: false,
        color: colourValue(String(payload.color ?? "gray")),
      },
    ])
    setPanel(null)
    setDraftTitle("")
  }, [])

  const removeEvent = React.useCallback((id: string | number | undefined) => {
    setCreated((list) => list.filter((e) => String(e.id) !== String(id)))
    setHidden((h) => [...h, String(id)])
    setPanel(null)
  }, [])

  /** How many days an event covers, for picking the tightest fit. */
  const span = (e: CalendarEvent) => {
    const from = new Date(`${String(e.fromDate)}T00:00`).getTime()
    const to = new Date(`${String(e.toDate ?? e.fromDate)}T00:00`).getTime()
    return Number.isNaN(from) || Number.isNaN(to) ? 0 : to - from
  }

  /** A month bar's edge, pulled: the span it stands for follows it. */
  const applyResize = React.useCallback(
    ({ title, from: barFrom, to: barTo, edge, date }: MonthResize) => {
      setPanel((p) => {
        const d = p?.draft
        if (
          d &&
          (draftTitle || "New event") === title &&
          d.fromDate <= barTo &&
          d.toDate >= barFrom
        ) {
          const next =
            edge === "start"
              ? { ...d, fromDate: date <= d.toDate ? date : d.toDate }
              : { ...d, toDate: date >= d.fromDate ? date : d.fromDate }
          if (next.fromDate === d.fromDate && next.toDate === d.toDate) return p
          return { ...p!, draft: next }
        }
        return p
      })

      const ev = eventsRef.current
        .filter(
          (e) =>
            !e.isDraft &&
            e.title === title &&
            String(e.fromDate) <= barFrom &&
            String(e.toDate ?? e.fromDate) >= barTo
        )
        .sort((a, b) => span(a) - span(b))[0]
      if (!ev) return
      const from = String(ev.fromDate)
      const to = String(ev.toDate ?? ev.fromDate)
      const patch =
        edge === "start"
          ? { fromDate: date <= to ? date : to }
          : { toDate: date >= from ? date : from }
      if (patch.fromDate === from || patch.toDate === to) return
      remember(ev, patch)
    },
    [draftTitle, remember]
  )

  /* ── The drag systems over the grid ───────────────────────────────────── */

  // The page is a live calendar: everything on it derives from "now", which
  // a server render cannot agree with the client about. Client-only.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const calendarEl = React.useRef<HTMLDivElement | null>(null)
  const band = useDragToCreate(calendarEl, HOUR_HEIGHT, openDraft, mounted)
  const monthBands = useMonthDragToCreate(calendarEl, openDraft, mounted)
  const carried = useDragShadow(calendarEl, mounted)
  const monthSlot = useMonthDragSkeleton(calendarEl, mounted)
  useMonthResize(calendarEl, applyResize, mounted)

  const dropSlot = carried.slot ?? monthSlot.slot
  const heldCard = carried.carrying ?? monthSlot.carrying
  const heldLanding = carried.landing || monthSlot.landing

  /** Nothing in the agenda is picked up. */
  React.useEffect(() => {
    void mounted
    const el = calendarEl.current
    if (!el) return
    const noAgendaDrag = (e: DragEvent) => {
      if (!(e.target instanceof Element)) return
      if (!e.target.closest(".calendar-row")) return
      e.preventDefault()
      e.stopImmediatePropagation()
    }

    // A card let go of after a drag or a stretch goes back to its resting
    // fill, even with the pointer still on it: hover fill while it is held,
    // the default the moment it is released. The hover fill returns once the
    // pointer has left it and come back. A plain click changes nothing.
    let pressed: HTMLElement | null = null
    let pressedAt = { x: 0, y: 0 }
    const onCardUp = (e: PointerEvent) => {
      const pill = pressed
      pressed = null
      if (!pill) return
      const moved =
        Math.abs(e.clientX - pressedAt.x) + Math.abs(e.clientY - pressedAt.y) >
        2
      if (!moved) return
      // On the next frame: the component re-lays the card on release, and
      // the mark goes on whichever element then carries this event.
      requestAnimationFrame(() => {
        const at = document.elementFromPoint(e.clientX, e.clientY)
        const now =
          at?.closest<HTMLElement>("[data-time-grid] .event") ?? pill
        now.setAttribute("data-rested", "")
        now.addEventListener(
          "pointerleave",
          () => now.removeAttribute("data-rested"),
          { once: true }
        )
      })
    }
    const onCardDown = (e: PointerEvent) => {
      const pill = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-time-grid] .event"
      )
      pill?.removeAttribute("data-rested")
      pressed = pill
      pressedAt = { x: e.clientX, y: e.clientY }
      if (pill) window.addEventListener("pointerup", onCardUp, { once: true })
    }

    // Hovering one piece of an event that runs across weeks (Month) or past
    // midnight (Week, Day) lights every piece of it, as opening it already
    // marks every piece. The pieces carry no id, so they are walked from the
    // hovered one: the same title and fill, each running on from the last —
    // a piece cut square on its trailing side followed by one cut square on
    // its leading side.
    const HOVER_GROUP = "data-hover-group"
    const piecesOf = (pill: HTMLElement) => {
      const month = !!pill.closest("[data-week-row]")
      const scope = month ? "[data-week-row] .event" : "[data-time-grid] .event"
      const [lead, trail] = month
        ? ["rounded-l-none", "rounded-r-none"]
        : ["rounded-t-none", "rounded-b-none"]
      const title = (n: HTMLElement) => n.innerText.trim().split("\n")[0]
      const bg = pill.style.getPropertyValue("--bg")
      const same = [...el.querySelectorAll<HTMLElement>(scope)].filter(
        (n) => title(n) === title(pill) && n.style.getPropertyValue("--bg") === bg
      )
      const at = same.indexOf(pill)
      if (at < 0) return [pill]
      const group = [pill]
      for (let i = at; i > 0; i--) {
        if (!same[i].classList.contains(lead)) break
        if (!same[i - 1].classList.contains(trail)) break
        group.push(same[i - 1])
      }
      for (let i = at; i < same.length - 1; i++) {
        if (!same[i].classList.contains(trail)) break
        if (!same[i + 1].classList.contains(lead)) break
        group.push(same[i + 1])
      }
      return group
    }
    const clearHoverGroup = () => {
      for (const n of el.querySelectorAll(`[${HOVER_GROUP}]`))
        n.removeAttribute(HOVER_GROUP)
    }
    const onCardOver = (e: PointerEvent) => {
      const pill = (e.target as HTMLElement).closest<HTMLElement>(".event")
      if (pill?.hasAttribute(HOVER_GROUP)) return
      clearHoverGroup()
      if (!pill || pill.closest(".calendar-row")) return
      const group = piecesOf(pill)
      if (group.length < 2) return
      for (const n of group) n.setAttribute(HOVER_GROUP, "")
    }

    el.addEventListener("pointerdown", onCardDown, true)
    el.addEventListener("pointerover", onCardOver)
    el.addEventListener("pointerleave", clearHoverGroup)
    el.addEventListener("dragstart", noAgendaDrag, true)
    return () => {
      el.removeEventListener("pointerover", onCardOver)
      el.removeEventListener("pointerleave", clearHoverGroup)
      el.removeEventListener("pointerdown", onCardDown, true)
      el.removeEventListener("dragstart", noAgendaDrag, true)
      window.removeEventListener("pointerup", onCardUp)
    }
  }, [mounted])

  /* ── Today, in the Agenda: the week rather than the day ───────────────── */

  const parkAgenda = React.useCallback(() => {
    const park = () => {
      const list = calendarEl.current?.querySelector<HTMLElement>(".ec-agenda")
      const here = [
        ...(list?.querySelectorAll<HTMLElement>(".calendar-week-label") ?? []),
      ].find((l) => l.textContent?.trim().startsWith("This week"))
      if (!list || !here) return
      list.scrollTop +=
        here.getBoundingClientRect().top - list.getBoundingClientRect().top
    }
    requestAnimationFrame(() => requestAnimationFrame(park))
    setTimeout(park, 160)
  }, [])

  const [switcherOpen, setSwitcherOpen] = React.useState(false)

  if (!mounted) return <div className="h-dvh w-full bg-background" />

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <div className="flex min-w-0 flex-1 flex-col">
        {/* The app header: 48 tall, a rule along the bottom. */}
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-[color:var(--ec-outline-gray-1,var(--border-soft))] py-2.5 pr-5 pl-[18px]">
          {/* The page's one crumb, as the playground's Breadcrumbs draws it. */}
          <Breadcrumb size="md">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="px-0.5 text-lg font-medium text-foreground">
                  Event
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2">
            <AvatarStack names={headerPeople} />
            <Button size="sm" variant="outline">
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button size="sm" className="gap-1.5">
                    <PlusIcon className="size-4" />
                    New
                    <ChevronDownIcon className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuItem onClick={() => openNewOf("Event")}>
                  <CalendarIcon className="size-4" />
                  Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openNewOf("Task")}>
                  <CheckCircle2Icon className="size-4" />
                  Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <div
            ref={calendarEl}
            className={cn(
              "flex min-w-0 flex-1 flex-col",
              "ec-agenda-flat",
              heldLanding && "ec-landing"
            )}
          >
            <Event
              events={events}
              className="min-w-0 flex-1"
              onEventClick={openEvent}
              onEventDblClick={openEvent}
              onCellClick={openFromCell}
              onUpdate={rememberMove}
              config={{
                defaultMode: "Week",
                isEditMode: true,
                enableShortcuts: true,
                timeFormat: "12h",
                hourHeight: HOUR_HEIGHT,
                noBorder: true,
                eventIcons: { task: TaskIcon },
              }}
              header={({
                currentMonthYear,
                activeView,
                decrement,
                increment,
                updateActiveView,
                onMonthYearChange,
                selectedMonthDate,
                setCalendarDate,
              }) => (
                <>
                  {/* The sub-header: the month, the movers, the views. */}
                  <div className="mt-3.5 mb-4 flex h-8 shrink-0 items-center gap-8 pr-5 pl-5">
                    <Popover open={switcherOpen} onOpenChange={setSwitcherOpen}>
                      <PopoverTrigger
                        render={
                          <button
                            type="button"
                            className="group -ml-2 flex h-8 items-center gap-2 rounded-[8px] px-2 text-[16px] font-medium text-[color:var(--ec-ink-gray-7)] outline-none transition-colors hover:text-[color:var(--ec-ink-gray-6)] focus-visible:ring-2 focus-visible:ring-border-normal"
                          >
                            {/* Hovered, the word and its chevron each go a
                                token lighter. */}
                            {monthYear(currentMonthYear, activeView)}
                            <ChevronDownIcon
                              className={cn(
                                "size-4 text-[color:var(--ec-ink-gray-5)] transition-[color,rotate] group-hover:text-[color:var(--ec-ink-gray-4)]",
                                switcherOpen && "rotate-180"
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
                            setSwitcherOpen(false)
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
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setCalendarDate()
                            if (activeView === "Agenda") parkAgenda()
                          }}
                        >
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
                        onValueChange={(v) => {
                          const value = String(v) as
                            | "Day"
                            | "Week"
                            | "Month"
                            | "Agenda"
                          updateActiveView(value)
                          if (value === "Agenda") parkAgenda()
                        }}
                      >
                        {/* The playground's switcher: 13px labels, 4 between
                            the tabs. */}
                        <TabsList size="sm" className="gap-1">
                          <TabsIndicator />
                          {views.map(({ label, value, Icon }) => (
                            <TabsTrigger
                              key={value}
                              value={value}
                              className="text-[13px] leading-[16.1px]! tracking-[0.02em]"
                            >
                              <Icon className="size-4 shrink-0" />
                              {label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>

                  {/* The Day view's own band. */}
                  {activeView === "Day" &&
                    (() => {
                      const band = dayBand(currentMonthYear)
                      return (
                        <div className="flex h-8 shrink-0 items-center gap-1 border-b border-[color:var(--ec-outline-gray-1)] pr-[13px] pl-5 text-[14px] text-[color:var(--ec-ink-gray-6)]">
                          <span
                            className={cn(
                              band.today && "text-[color:var(--ec-ink-gray-7)]"
                            )}
                          >
                            {band.name}
                          </span>
                          {band.today ? (
                            <span className="ml-1 inline-flex h-6 w-[26px] items-center justify-center rounded-[6px] bg-[color:var(--ec-surface-red-7)] text-white">
                              {band.date}
                            </span>
                          ) : (
                            <span>{band.date}</span>
                          )}
                        </div>
                      )
                    })()}
                </>
              )}
              eventSuffix={
                ({ calendarEvent, date }) => (
                  <span className="agenda-lead flex items-center gap-2 pl-2">
                    <span className="grid w-[52px] shrink-0 text-[13px] tabular-nums text-[color:var(--ec-ink-gray-6)]">
                      <span className="agenda-when col-start-1 row-start-1">
                        {startsAt(calendarEvent, date)}
                      </span>
                      <span className="agenda-lasts invisible col-start-1 row-start-1">
                        {lasts(calendarEvent, date)}
                      </span>
                    </span>
                    <DotIcon className="agenda-dot shrink-0 [color:var(--border)]" />
                  </span>
                )
              }
              eventDescription={
                ({ calendarEvent, description }) =>
                  noteOf(calendarEvent) || description ? (
                    <>
                      {noteOf(calendarEvent) ? (
                        <span className="min-w-0 truncate">
                          {noteOf(calendarEvent)}
                        </span>
                      ) : null}
                      {noteOf(calendarEvent) && description ? (
                        <span className="size-0.5 shrink-0 self-center rounded-full bg-current" />
                      ) : null}
                      {description ? (
                        <span className="shrink-0">{description}</span>
                      ) : null}
                    </>
                  ) : null
              }
              agendaDayLabel={
                (date, isToday) => ({
                  primary: `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][date.getMonth()]} ${date.getDate()}`,
                  secondary: isToday
                    ? "Today"
                    : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][date.getDay()],
                })
              }
              eventParticipant={
                ({ calendarEvent }) =>
                  namesOf(calendarEvent).length ? (
                    <AvatarStack
                      names={namesOf(calendarEvent)}
                      size="sm"
                      max={2}
                      keep={1}
                    />
                  ) : null
              }
            />
          </div>

          {/* The span being drawn: a quiet wash following the pointer. */}
          {band ? (
            <div
              className="pointer-events-none fixed z-30 rounded-[8px] bg-[color:var(--ec-surface-gray-1,#f8f8f8)]"
              style={{
                left: band.left,
                top: band.top,
                width: band.width,
                height: band.height,
              }}
            />
          ) : null}

          {/* The same card in the Month view, one per row the span runs over. */}
          {monthBands.map((b, i) => (
            <div
              key={i}
              className="pointer-events-none fixed z-30 rounded-[8px] bg-[color:var(--ec-surface-gray-1,#f8f8f8)]"
              style={{
                left: b.left,
                top: b.top,
                width: b.width,
                height: b.height,
              }}
            />
          ))}

          {/* B — where the card would land: an empty slot. */}
          {dropSlot ? (
            <div
              aria-hidden="true"
              className="ec-scope pointer-events-none fixed z-[24] rounded-[8px] bg-[color:var(--ec-surface-gray-1,#f8f8f8)]"
              style={{
                left: dropSlot.left,
                top: dropSlot.top,
                width: dropSlot.width,
                height: dropSlot.height,
              }}
            />
          ) : null}

          {/* …and where it was before it was picked up. */}
          {carried.ghost ? (
            <div
              aria-hidden="true"
              className="ec-scope pointer-events-none fixed z-[25] opacity-40 [&>.event]:!mx-0"
              style={{
                left: carried.ghost.rect.left,
                top: carried.ghost.rect.top,
                width: carried.ghost.rect.width,
                height: carried.ghost.rect.height,
              }}
              dangerouslySetInnerHTML={{ __html: carried.ghost.html }}
            />
          ) : null}

          {/* …and the card itself, in hand: in its hover fill while it is
              held — a copy never takes :hover — easing back to the resting
              fill on its way to the slot. `!mx-0`: the copy is placed by the
              card's own box, and the card's 1px side margins pushed it a
              pixel right of its frame, where the shadow showed a white line
              down the card's left side. */}
          {heldCard ? (
            <div
              aria-hidden="true"
              className={cn(
                "ec-scope pointer-events-none fixed z-30 rounded-[8px] shadow-md [&>.event]:!mx-0",
                heldLanding
                  ? "transition-all duration-[180ms] ease-out"
                  : "[&>.event]:![background-color:var(--bg-active)]"
              )}
              style={{
                left: heldCard.rect.left,
                top: heldCard.rect.top,
                width: heldCard.rect.width,
                height: heldCard.rect.height,
              }}
              dangerouslySetInnerHTML={{ __html: heldCard.html }}
            />
          ) : null}

          {/* The panel arrives rather than appears. */}
          {panel ? (
            <EventPanel
              event={panel.event}
              draft={panel.draft}
              kind={panel.kind}
              titleModel={draftTitle}
              colourModel={draftColour}
              onTitleModel={setDraftTitle}
              onColourModel={setDraftColour}
              onDraftChange={onDraftChange}
              onClose={() => setPanel(null)}
              onCreate={createEvent}
              onSave={saveEvent}
              onDelete={removeEvent}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
