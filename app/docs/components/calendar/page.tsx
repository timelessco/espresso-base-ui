"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

export default function CalendarDocsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 7, 5),
    to: new Date(2026, 7, 14),
  })
  const [picked, setPicked] = React.useState<Date | undefined>(undefined)
  const [weekday, setWeekday] = React.useState<Date | undefined>(undefined)

  return (
    <DocPage>
      <DocHeader
        title="Calendar"
        description="A date grid built on react-day-picker. Supports single, multiple and range selection, and composes into date pickers inside a Popover."
      />

      <DocSection title="Preview">
        <DocProse>
          The default composition: pass <code>mode="single"</code> with a
          controlled <code>selected</code> date and an <code>onSelect</code>{" "}
          handler. The root renders as a floating card on a{" "}
          <code>bg-popover</code> surface with an elevation shadow.
        </DocProse>
        <DocExample
          code={`
const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar mode="single" selected={date} onSelect={setDate} />`}
        >
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="calendar" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"`}
        />
        <CodeBlock
          code={`
const [date, setDate] = React.useState<Date | undefined>(new Date())

return <Calendar mode="single" selected={date} onSelect={setDate} />`}
        />
      </DocSection>

      <DocSection title="Range selection">
        <DocProse>
          <code>mode="range"</code> selects a start and end date. The span
          between them gets a continuous <code>bg-muted</code> track while the
          endpoints fill with the primary color; add <code>numberOfMonths</code>{" "}
          to show months side by side.
        </DocProse>
        <DocExample
          code={`
const [range, setRange] = React.useState<DateRange | undefined>({
  from: new Date(2026, 7, 5),
  to: new Date(2026, 7, 14),
})

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
  defaultMonth={range?.from}
/>`}
        >
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            defaultMonth={range?.from}
          />
        </DocExample>
      </DocSection>

      <DocSection title="Date picker in a popover">
        <DocProse>
          The most common real-world composition wraps the calendar in a{" "}
          <code>Popover</code> behind an outline <code>Button</code> trigger.
          Strip the calendar's own surface with{" "}
          <code>border-0 shadow-none</code> – inside a popover it already sits
          on a popover background.
        </DocProse>
        <DocExample
          code={`
<Popover>
  <PopoverTrigger
    render={
      <Button variant="outline" className="w-56 justify-start gap-2 font-normal">
        <CalendarIcon />
        {picked ? format(picked, "PPP") : "Pick a date"}
      </Button>
    }
  />
  <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
    <Calendar
      mode="single"
      selected={picked}
      onSelect={setPicked}
      className="border-0 shadow-none"
    />
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className="w-56 justify-start gap-2 font-normal"
                >
                  <CalendarIcon />
                  {picked ? format(picked, "PPP") : "Pick a date"}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
              <Calendar
                mode="single"
                selected={picked}
                onSelect={setPicked}
                className="border-0 shadow-none"
              />
            </PopoverContent>
          </Popover>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled dates">
        <DocProse>
          The <code>disabled</code> prop takes any DayPicker matcher – an array
          of dates, a range, or a <code>dayOfWeek</code> rule. Disabled cells
          drop to 50% opacity and stop receiving pointer events.
        </DocProse>
        <DocExample
          code={`
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={{ dayOfWeek: [0, 6] }}
/>`}
        >
          <Calendar
            mode="single"
            selected={weekday}
            onSelect={setWeekday}
            disabled={{ dayOfWeek: [0, 6] }}
          />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Calendar</code> wraps <code>DayPicker</code> from{" "}
          <code>react-day-picker</code> and forwards every DayPicker prop –{" "}
          <code>mode</code>, <code>selected</code>, <code>onSelect</code>,{" "}
          <code>month</code>, <code>onMonthChange</code>,{" "}
          <code>defaultMonth</code>, <code>locale</code>,{" "}
          <code>formatters</code>, <code>components</code>,{" "}
          <code>classNames</code> and friends. The props below are the ones the
          wrapper defaults or adds.
        </DocProse>
        <PropsTable
          title="Calendar"
          rows={[
            {
              prop: "mode",
              type: '"single" | "multiple" | "range"',
              description:
                "Selection behavior (from react-day-picker). Pair with selected / onSelect for controlled state.",
            },
            {
              prop: "showOutsideDays",
              type: "boolean",
              defaultValue: "true",
              description:
                "Render the leading and trailing days of adjacent months in muted text.",
            },
            {
              prop: "captionLayout",
              type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
              defaultValue: '"label"',
              description:
                "Month caption style – a static label or native month/year dropdowns (short month names by default).",
            },
            {
              prop: "buttonVariant",
              type: "Button variant",
              defaultValue: '"ghost"',
              description:
                "Button variant applied to the previous/next month navigation buttons.",
            },
            {
              prop: "numberOfMonths",
              type: "number",
              defaultValue: "1",
              description:
                "Months rendered side by side. With more than one, the caption centers instead of left-aligning.",
            },
            {
              prop: "showWeekNumber",
              type: "boolean",
              defaultValue: "false",
              description:
                "Adds an ISO week-number column; the grid widens by one cell.",
            },
            {
              prop: "disabled",
              type: "Matcher | Matcher[]",
              description:
                "DayPicker matcher(s) for un-selectable days: dates, ranges, or { dayOfWeek: [...] }.",
            },
            {
              prop: "locale",
              type: "Locale",
              description:
                "date-fns locale; also drives the built-in short-month and narrow-weekday formatters.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "Calendar",
              description:
                'Root wrapper (data-slot="calendar"). Popover-style card surface that turns transparent inside card or popover content.',
            },
            {
              part: "CalendarDayButton",
              description:
                "The day-cell Button used via the DayPicker components override. Exposes data-day, data-selected-single, data-range-start, data-range-middle and data-range-end for styling; auto-focuses when DayPicker marks it focused.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks & accessibility">
        <DocProse>
          Cell geometry is driven by two CSS variables set on the root:{" "}
          <code>--cell-size</code> (default <code>1.5rem</code>) and{" "}
          <code>--cell-radius</code>. Override them from <code>className</code>{" "}
          – e.g. <code>[--cell-size:2.75rem]</code> for a larger grid. Day
          buttons reflect their selection state as data attributes (
          <code>data-selected-single</code>, <code>data-range-start</code>,{" "}
          <code>data-range-middle</code>, <code>data-range-end</code>), and the
          navigation chevrons flip automatically in RTL layouts. Keyboard
          navigation, focus management and aria roles come from
          react-day-picker; nav buttons expose <code>aria-disabled</code> when
          no previous/next month is available.
        </DocProse>
        <CodeBlock
          code={`
<Calendar
  mode="single"
  className="[--cell-size:2.75rem]"
/>`}
        />
      </DocSection>
    </DocPage>
  )
}
