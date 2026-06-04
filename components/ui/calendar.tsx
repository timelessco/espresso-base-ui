"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()
  const gridColsClass = props.showWeekNumber
    ? "grid-cols-[var(--cell-size)_repeat(7,var(--cell-size))]"
    : "grid-cols-[repeat(7,var(--cell-size))]"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar rounded-xl bg-popover p-3.5 shadow-5xl [--cell-radius:var(--radius-xs)] [--cell-size:calc(var(--spacing)*6)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        formatWeekdayName: (date) =>
          date.toLocaleDateString(locale?.code, { weekday: "narrow" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit overflow-visible", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 overflow-visible md:flex-row",
          defaultClassNames.months
        ),
        month: cn(
          "flex w-full flex-col gap-4 overflow-visible",
          defaultClassNames.month
        ),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-end gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center leading-base tracking-normal text-secondary-foreground!",
          (props.numberOfMonths ?? 1) > 1 ? "justify-center" : "justify-start",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table: "border-collapse",
        weekdays: cn(
          "grid gap-0.5",
          gridColsClass,
          defaultClassNames.weekdays
        ),
        weekday: cn(
          "rounded-(--cell-radius) text-center text-xs leading-base font-medium tracking-normal text-card-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn(
          "mt-0.5 grid gap-0.5 overflow-visible",
          gridColsClass,
          defaultClassNames.week
        ),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative h-[var(--cell-size)] w-[var(--cell-size)] rounded-(--cell-radius) p-0 text-center select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-(--cell-radius) rounded-r-none bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("bg-muted", defaultClassNames.range_middle),
        range_end: cn(
          "rounded-l-none rounded-r-(--cell-radius) bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-(--cell-radius) [&_button:not([data-selected-single=true])]:bg-muted [&_button:not([data-selected-single=true])]:text-foreground [&_button[data-selected-single=true]]:bg-primary [&_button[data-selected-single=true]]:text-primary-foreground",
          defaultClassNames.today
        ),
        outside: cn(
          "[&_button]:text-card-foreground! aria-selected:[&_button]:text-foreground/50! [&_button[data-range-end=true]]:text-primary-foreground! [&_button[data-range-start=true]]:text-primary-foreground! [&_button[data-selected-single=true]]:text-primary-foreground!",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex h-[var(--cell-size)]! w-[var(--cell-size)]! flex-col gap-1 rounded-(--cell-radius) border-0 text-xs leading-base font-medium tracking-normal focus-visible:relative focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // range start
        "data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[range-start=true]:after:absolute data-[range-start=true]:after:top-0 data-[range-start=true]:after:-right-0.5 data-[range-start=true]:after:bottom-0 data-[range-start=true]:after:-z-10 data-[range-start=true]:after:w-1 data-[range-start=true]:after:bg-muted data-[range-start=true]:after:content-['']",
        // range middle
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground",
        "data-[range-middle=true]:before:absolute data-[range-middle=true]:before:top-0 data-[range-middle=true]:before:bottom-0 data-[range-middle=true]:before:-left-0.5 data-[range-middle=true]:before:-z-10 data-[range-middle=true]:before:w-1 data-[range-middle=true]:before:bg-muted data-[range-middle=true]:before:content-['']",
        "data-[range-middle=true]:after:absolute data-[range-middle=true]:after:top-0 data-[range-middle=true]:after:-right-0.5 data-[range-middle=true]:after:bottom-0 data-[range-middle=true]:after:-z-10 data-[range-middle=true]:after:w-1 data-[range-middle=true]:after:bg-muted data-[range-middle=true]:after:content-['']",
        // range end
        "data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "data-[range-end=true]:before:absolute data-[range-end=true]:before:top-0 data-[range-end=true]:before:bottom-0 data-[range-end=true]:before:-left-0.5 data-[range-end=true]:before:-z-10 data-[range-end=true]:before:w-1 data-[range-end=true]:before:bg-muted data-[range-end=true]:before:content-['']",
        // hide pseudo-element bridges at row edges and round the range edges
        "[:first-child>&]:rounded-l-(--cell-radius) [:first-child>&]:before:hidden",
        "[:last-child>&]:rounded-r-(--cell-radius) [:last-child>&]:after:hidden",
        // same-day range (start === end): full rounded, no bridges
        "[&[data-range-start=true][data-range-end=true]]:rounded-(--cell-radius)!",
        "[&[data-range-start=true][data-range-end=true]]:before:hidden",
        "[&[data-range-start=true][data-range-end=true]]:after:hidden",
        // single selected
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
