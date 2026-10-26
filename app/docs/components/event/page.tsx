"use client"

import * as React from "react"
import Link from "next/link"

import { Event, type CalendarEvent } from "@/components/ui/event"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PropsTable,
} from "../../_components/doc"

const pad = (n: number) => String(n).padStart(2, "0")
const day = (offset: number) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const DEMO_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Design review",
    fromDate: day(0),
    toDate: day(0),
    fromTime: "10:00",
    toTime: "11:00",
    color: "green",
    venue: "Studio",
  },
  {
    id: "2",
    title: "Interview",
    fromDate: day(0),
    toDate: day(0),
    fromTime: "11:30",
    toTime: "12:30",
    color: "violet",
  },
  {
    id: "3",
    title: "Team offsite",
    fromDate: day(1),
    toDate: day(3),
    isFullDay: true,
    color: "blue",
  },
  {
    id: "4",
    title: "Pipeline review",
    fromDate: day(2),
    toDate: day(2),
    fromTime: "15:00",
    toTime: "16:00",
    color: "amber",
  },
  {
    id: "5",
    title: "Month-end close",
    fromDate: day(4),
    toDate: day(4),
    fromTime: "16:00",
    toTime: "17:00",
    color: "gray",
  },
]

const USAGE = `import { Event } from "@/components/ui/event"

const events = [
  {
    id: "1",
    title: "Design review",
    fromDate: "2026-10-14",
    toDate: "2026-10-14",
    fromTime: "10:00",
    toTime: "11:00",
    color: "green",
  },
  {
    id: "2",
    title: "Team offsite",
    fromDate: "2026-10-15",
    toDate: "2026-10-17",
    isFullDay: true,
    color: "blue",
  },
]

export function TeamCalendar() {
  return (
    <Event
      events={events}
      config={{ defaultMode: "Week", isEditMode: true }}
      onCreate={(event) => console.log("created", event)}
      onUpdate={(event) => console.log("updated", event)}
      onDelete={(id) => console.log("deleted", id)}
    />
  )
}`

const HEADER_SLOT = `<Event
  events={events}
  header={({ currentMonthYear, decrement, increment, setCalendarDate }) => (
    <div className="flex items-center justify-between pb-3">
      <span className="text-lg font-medium">{currentMonthYear}</span>
      <div className="flex gap-1">
        <Button variant="ghost" onClick={decrement}>Prev</Button>
        <Button variant="ghost" onClick={() => setCalendarDate()}>Today</Button>
        <Button variant="ghost" onClick={increment}>Next</Button>
      </div>
    </div>
  )}
/>`

const PANEL_SLOT = `// Replace the built-in popover and modal with your own panel:
<Event
  events={events}
  onEventClick={({ calendarEvent }) => openPanel(calendarEvent)}
  onCellClick={({ date, time }) => openNewEventPanel(date, time)}
  onUpdate={(event) => keepChange(event)}
/>`

export default function EventDocsPage() {
  // The live demo derives everything from "now", which a server render
  // cannot agree with the client about.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <DocPage>
      <DocHeader
        title="Event"
        description="A full calendar: Month, Week, Day and Agenda views with drag to move, resize, overlap layout and an editable event model — frappe-ui's Calendar, ported to React on espresso primitives."
      />

      <DocSection title="Playground">
        <DocProse>
            The{" "}
            <Link href="/ui/event" className="text-foreground underline">
              showcase page
            </Link>{" "}
            runs the full pattern: an app header, a view switcher, a side panel
            that opens on a click or a drag, drag-to-create on the grids, and a
            card-in-hand while an event is moved.
        </DocProse>
        <DocExample>
          <div className="h-[520px] w-full">
            {mounted ? (
              <Event
                events={DEMO_EVENTS}
                config={{
                  defaultMode: "Week",
                  isEditMode: true,
                  hourHeight: 50,
                  scrollToHour: 9,
                }}
              />
            ) : null}
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="event" />
      </DocSection>

      <DocSection title="Usage">
        <DocProse>
            Hand the calendar a list of events. Each needs an <code>id</code>,
            a <code>title</code>, and its days as <code>fromDate</code>/
            <code>toDate</code> (<code>YYYY-MM-DD</code>) with{" "}
            <code>fromTime</code>/<code>toTime</code> (<code>HH:MM</code>) for
            timed events, or <code>isFullDay</code> for all-day ones. A
            multi-day event draws as one bar; a timed event shorter than a day
            that crosses midnight is split at it.
        </DocProse>
        <CodeBlock code={USAGE} />
      </DocSection>

      <DocSection title="Views">
        <DocProse>
            <strong>Month</strong> is a strip of week rows — three rows per day
            and an &ldquo;N more&rdquo; line past them. <strong>Week</strong>{" "}
            and <strong>Day</strong> are time grids with an all-day row;
            overlapping events are laid out in columns, each pill carrying a
            cut ring where it lies over another. <strong>Agenda</strong> lists
            three months as cards of weeks, days with nothing on them left
            out. Keyboard shortcuts: <code>m</code>/<code>w</code>/
            <code>d</code>/<code>a</code> switch views, <code>t</code> jumps to
            today, arrow keys page.
        </DocProse>
      </DocSection>

      <DocSection title="Custom header">
        <DocProse>
            The <code>header</code> render prop replaces the built-in month
            label, movers and view switcher, handing you everything they were
            wired to. To keep the built-in header and add your own buttons
            after the view switcher, pass them as <code>headerActions</code>{" "}
            instead.
        </DocProse>
        <CodeBlock code={HEADER_SLOT} />
      </DocSection>

      <DocSection title="Your own panel">
        <DocProse>
            By default a click opens a read popover and, in edit mode, a double
            click opens an edit modal and a cell click a new-event modal.
            Supply <code>onEventClick</code>, <code>onEventDblClick</code> and{" "}
            <code>onCellClick</code> to replace those with your own surface —
            the showcase routes all three into a side panel.
        </DocProse>
        <CodeBlock code={PANEL_SLOT} />
      </DocSection>

      <DocSection title="API">
        <PropsTable
          title="Event"
          rows={[
            {
              prop: "events",
              type: "CalendarEvent[]",
              defaultValue: "[]",
              description: "The events to render.",
            },
            {
              prop: "config",
              type: "Partial<EventConfig>",
              description:
                "Overrides: defaultMode, isEditMode, hourHeight, scrollToHour, timeFormat ('12h' | '24h'), disableModes, enableShortcuts, eventIcons, showIcon, noBorder.",
            },
            {
              prop: "loading",
              type: "boolean",
              description:
                "Whether the visible range's events are still on their way — read by the Agenda's empty state.",
            },
            {
              prop: "onEventClick",
              type: "({ e, calendarEvent }) => void",
              description: "Replaces the default popover on a single click.",
            },
            {
              prop: "onEventDblClick",
              type: "({ e, calendarEvent }) => void",
              description: "Replaces the default edit modal on a double click.",
            },
            {
              prop: "onCellClick",
              type: "(data: EventCellClickData) => void",
              description:
                "Replaces the default new-event modal on a cell click.",
            },
            {
              prop: "onCreate / onUpdate / onDelete",
              type: "(event) => void",
              description:
                "Fired when an event is created, moved, resized, edited or deleted.",
            },
            {
              prop: "onRangeChange",
              type: "({ view, startDate, endDate }) => void",
              description:
                "Fired when the visible range changes — the fetch window.",
            },
            {
              prop: "header",
              type: "(props: EventHeaderSlotProps) => ReactNode",
              description: "Replaces the built-in header.",
            },
            {
              prop: "headerActions",
              type: "ReactNode",
              description:
                "Extra controls at the end of the built-in header, after the view switcher — e.g. Refresh or New event.",
            },
            {
              prop: "eventPopoverContent",
              type: "(props) => ReactNode",
              description: "Replaces the popover's card for every event.",
            },
            {
              prop: "eventDescription / eventSuffix / eventParticipant",
              type: "(props: EventRowSlotProps) => ReactNode",
              description: "Fill the Agenda row's three open slots.",
            },
          ]}
        />
        <PropsTable
          title="CalendarEvent"
          rows={[
            {
              prop: "id",
              type: "string | number",
              description: "Required for editing, dragging and deleting.",
            },
            {
              prop: "title",
              type: "string",
              description: "What the pill and the row say.",
            },
            {
              prop: "fromDate / toDate",
              type: "string",
              description: "First and last day, inclusive, as YYYY-MM-DD.",
            },
            {
              prop: "fromTime / toTime",
              type: "string",
              description: "HH:MM. A toTime of 00:00 ends as toDate begins.",
            },
            {
              prop: "isFullDay",
              type: "boolean",
              description: "Ignores the times and covers the days whole.",
            },
            {
              prop: "color",
              type: "string",
              defaultValue: '"green"',
              description:
                "A palette name (gray, blue, green, amber, red, violet, pink, cyan, orange) or a hex the calendar derives a wash from.",
            },
            {
              prop: "type",
              type: "string",
              description:
                "Keys into config.eventIcons — a task mark beside the title.",
            },
            {
              prop: "isDraft / isDeclined",
              type: "boolean",
              description:
                "A draft draws as a plain tinted block; a declined event is struck through and claims no room in the grid.",
            },
            {
              prop: "participant / venue / description",
              type: "string",
              description: "What the popover and the Agenda's rows read.",
            },
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
