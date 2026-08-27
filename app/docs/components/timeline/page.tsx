"use client"

import * as React from "react"
import { CheckIcon, CircleDashedIcon } from "lucide-react"

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline"
import { Button } from "@/components/ui/button"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

const releaseSteps = [
  {
    step: 1,
    date: "Jan 2026",
    title: "Project initialized",
    body: "Bootstrapped the repository and set up CI.",
  },
  {
    step: 2,
    date: "Feb 2026",
    title: "Beta release",
    body: "Shipped to internal testers for feedback.",
  },
  {
    step: 3,
    date: "Mar 2026",
    title: "Public launch",
    body: "Docs published and signups open.",
  },
]

function ReleaseItems() {
  return (
    <>
      {releaseSteps.map((s) => (
        <TimelineItem key={s.step} step={s.step}>
          <TimelineHeader>
            <TimelineDate>{s.date}</TimelineDate>
            <TimelineTitle>{s.title}</TimelineTitle>
          </TimelineHeader>
          <TimelineIndicator />
          <TimelineSeparator />
          <TimelineContent>{s.body}</TimelineContent>
        </TimelineItem>
      ))}
    </>
  )
}

function ControlledDemo() {
  const [active, setActive] = React.useState(1)
  const max = releaseSteps.length

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Timeline value={active} onValueChange={setActive}>
        <ReleaseItems />
      </Timeline>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActive((v) => Math.max(1, v - 1))}
          disabled={active <= 1}
        >
          Back
        </Button>
        <Button
          size="sm"
          onClick={() => setActive((v) => Math.min(max, v + 1))}
          disabled={active >= max}
        >
          {active >= max ? "Done" : "Next"}
        </Button>
        <span className="ml-auto text-sm text-muted-foreground">
          Step <span className="font-medium text-foreground">{active}</span> of{" "}
          {max}
        </span>
      </div>
    </div>
  )
}

const iconSteps = [
  { step: 1, date: "10:02", title: "Branch created" },
  { step: 2, date: "10:18", title: "Component scaffolded" },
  { step: 3, date: "10:45", title: "Shipped" },
]

function CustomIndicatorDemo() {
  const active = 2

  return (
    <Timeline value={active} className="w-full max-w-sm">
      {iconSteps.map((s) => {
        const Icon = s.step <= active ? CheckIcon : CircleDashedIcon
        return (
          <TimelineItem key={s.step} step={s.step}>
            <TimelineHeader>
              <TimelineDate>{s.date}</TimelineDate>
              <TimelineTitle>{s.title}</TimelineTitle>
            </TimelineHeader>
            <TimelineIndicator className="flex items-center justify-center border-0 bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground">
              <Icon className="size-2.5" />
            </TimelineIndicator>
            <TimelineSeparator />
            <TimelineContent>
              Step {s.step} of the release pipeline.
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

export default function TimelineDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Timeline"
        description="An ordered list of steps connected by indicators and separator lines. Tracks an active step and lays out vertically or horizontally."
      />

      <DocSection title="Preview">
        <DocProse>
          The default <code>orientation</code> stacks items vertically. Each{" "}
          <code>TimelineItem</code> takes a <code>step</code> number and
          composes a <code>TimelineHeader</code> (with <code>TimelineDate</code>{" "}
          and <code>TimelineTitle</code>), the dot{" "}
          <code>TimelineIndicator</code>, the connecting{" "}
          <code>TimelineSeparator</code>, and <code>TimelineContent</code>.
        </DocProse>
        <DocExample
          code={`
<Timeline defaultValue={2}>
  <TimelineItem step={1}>
    <TimelineHeader>
      <TimelineDate>Jan 2026</TimelineDate>
      <TimelineTitle>Project initialized</TimelineTitle>
    </TimelineHeader>
    <TimelineIndicator />
    <TimelineSeparator />
    <TimelineContent>Bootstrapped the repository and set up CI.</TimelineContent>
  </TimelineItem>
  <TimelineItem step={2}>
    <TimelineHeader>
      <TimelineDate>Feb 2026</TimelineDate>
      <TimelineTitle>Beta release</TimelineTitle>
    </TimelineHeader>
    <TimelineIndicator />
    <TimelineSeparator />
    <TimelineContent>Shipped to internal testers for feedback.</TimelineContent>
  </TimelineItem>
  <TimelineItem step={3}>
    <TimelineHeader>
      <TimelineDate>Mar 2026</TimelineDate>
      <TimelineTitle>Public launch</TimelineTitle>
    </TimelineHeader>
    <TimelineIndicator />
    <TimelineSeparator />
    <TimelineContent>Docs published and signups open.</TimelineContent>
  </TimelineItem>
</Timeline>`}
        >
          <Timeline defaultValue={2} className="w-full max-w-sm">
            <ReleaseItems />
          </Timeline>
        </DocExample>
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline"`}
        />
        <CodeBlock
          code={`
<Timeline defaultValue={1}>
  <TimelineItem step={1}>
    <TimelineHeader>
      <TimelineDate>Today</TimelineDate>
      <TimelineTitle>Order placed</TimelineTitle>
    </TimelineHeader>
    <TimelineIndicator />
    <TimelineSeparator />
    <TimelineContent>Your order is being prepared.</TimelineContent>
  </TimelineItem>
</Timeline>`}
        />
      </DocSection>

      <DocSection title="Horizontal">
        <DocProse>
          <code>orientation="horizontal"</code> lays the steps out in a row –
          indicators and separators move above the content, and each item
          stretches with <code>flex-1</code>.
        </DocProse>
        <DocExample
          code={`
<Timeline orientation="horizontal" defaultValue={2}>
  <TimelineItem step={1}>
    <TimelineHeader>
      <TimelineDate>Jan 2026</TimelineDate>
      <TimelineTitle>Project initialized</TimelineTitle>
    </TimelineHeader>
    <TimelineIndicator />
    <TimelineSeparator />
    <TimelineContent>Bootstrapped the repository and set up CI.</TimelineContent>
  </TimelineItem>
  {/* ...more items */}
</Timeline>`}
        >
          <Timeline orientation="horizontal" defaultValue={2}>
            <ReleaseItems />
          </Timeline>
        </DocExample>
      </DocSection>

      <DocSection title="Controlled">
        <DocProse>
          Pass <code>value</code> and <code>onValueChange</code> to drive the
          active step from your own state – useful for steppers and wizards.
        </DocProse>
        <DocExample
          code={`
const [active, setActive] = React.useState(1)

<Timeline value={active} onValueChange={setActive}>
  {steps.map((s) => (
    <TimelineItem key={s.step} step={s.step}>
      <TimelineHeader>
        <TimelineDate>{s.date}</TimelineDate>
        <TimelineTitle>{s.title}</TimelineTitle>
      </TimelineHeader>
      <TimelineIndicator />
      <TimelineSeparator />
      <TimelineContent>{s.body}</TimelineContent>
    </TimelineItem>
  ))}
</Timeline>

<Button onClick={() => setActive((v) => v + 1)}>Next</Button>`}
        >
          <ControlledDemo />
        </DocExample>
      </DocSection>

      <DocSection title="Custom indicators">
        <DocProse>
          <code>TimelineIndicator</code> accepts children, a{" "}
          <code>className</code>, and a <code>render</code> prop – swap the
          plain dot for icons, avatars or status colors, and style the completed
          state through the <code>group-data-completed/timeline-item</code>{" "}
          variant.
        </DocProse>
        <DocExample
          code={`
<TimelineIndicator className="flex items-center justify-center border-0 bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground">
  <CheckIcon className="size-2.5" />
</TimelineIndicator>

// or render any element in place of the dot
<TimelineIndicator
  className="size-7 rounded-full border-none"
  render={<Avatar className="size-7">...</Avatar>}
/>`}
        >
          <CustomIndicatorDemo />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Timeline</code> is a compound component. The root holds the
          active step in context (uncontrolled via <code>defaultValue</code>,
          controlled via <code>value</code>) and each <code>TimelineItem</code>{" "}
          compares its <code>step</code> against it to derive the completed
          state. All parts render plain elements and accept{" "}
          <code>className</code> plus standard props.
        </DocProse>
        <PropsTable
          title="Timeline"
          rows={[
            {
              prop: "defaultValue",
              type: "number",
              defaultValue: "1",
              description:
                "Initial active step for uncontrolled usage. Items whose step is at or before it are marked completed.",
            },
            {
              prop: "value",
              type: "number",
              description:
                "Controlled active step. When set, internal state is bypassed.",
            },
            {
              prop: "onValueChange",
              type: "(value: number) => void",
              description: "Called when the active step changes.",
            },
            {
              prop: "orientation",
              type: '"vertical" | "horizontal"',
              defaultValue: '"vertical"',
              description:
                "Layout axis – reflected on the root as data-orientation, which every part reads for its positioning.",
            },
          ]}
        />
        <PropsTable
          title="TimelineItem"
          rows={[
            {
              prop: "step",
              type: "number",
              description:
                "This item's position in the sequence. When step <= the active step, the item gets data-completed, which fills its indicator border and the previous separator.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "TimelineHeader",
              description:
                'Wrapper for the date and title above the content (data-slot="timeline-header").',
            },
            {
              part: "TimelineDate",
              description:
                "Small muted timestamp rendered as a time element. Supports a render prop to swap the tag.",
            },
            {
              part: "TimelineTitle",
              description:
                'Step heading rendered as an h3 (data-slot="timeline-title").',
            },
            {
              part: "TimelineIndicator",
              description:
                "The circular marker (aria-hidden). Border fills with the primary color when the item is completed. Supports children and a render prop for icons or avatars.",
            },
            {
              part: "TimelineSeparator",
              description:
                'Connecting line between indicators (data-slot="timeline-separator", aria-hidden). Hidden on the last item; turns solid primary when the following item is completed.',
            },
            {
              part: "TimelineContent",
              description:
                'Body copy for the step (data-slot="timeline-content").',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The root exposes <code>data-slot="timeline"</code> and{" "}
          <code>data-orientation</code>; items expose{" "}
          <code>data-slot="timeline-item"</code> and, when at or before the
          active step, <code>data-completed</code>. Parts position themselves
          with group variants (<code>group/timeline</code>,{" "}
          <code>group/timeline-item</code>), so you can re-position an
          individual indicator or separator per item by overriding the same{" "}
          <code>group-data-[orientation=...]</code> utilities – the showcase
          uses this to build avatar feeds and activity logs. The indicator and
          separator are <code>aria-hidden</code>, keeping the accessible output
          to the dates, titles and content.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
