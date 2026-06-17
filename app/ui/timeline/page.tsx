"use client"

import * as React from "react"
import {
  CheckIcon,
  CircleDashedIcon,
  CodeIcon,
  GitBranchIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const releaseSteps = [
  {
    step: 1,
    date: "Jan 2026",
    title: "Project initialized",
    body: "Bootstrapped the repository, set up CI, and locked the design system.",
  },
  {
    step: 2,
    date: "Feb 2026",
    title: "Design system finalized",
    body: "Tokens, typography, and component primitives reviewed and approved.",
  },
  {
    step: 3,
    date: "Mar 2026",
    title: "Beta release",
    body: "Shipped to internal testers; collected first round of feedback.",
  },
  {
    step: 4,
    date: "Apr 2026",
    title: "Public launch",
    body: "Marketing site live, public docs published, signups open.",
  },
]

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Vertical (default) */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Vertical (default, defaultValue=2)</SectionTitle>
        <Timeline defaultValue={2}>
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
        </Timeline>
      </div>

      {/* Horizontal */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Horizontal (defaultValue=3)</SectionTitle>
        <Timeline orientation="horizontal" defaultValue={3}>
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
        </Timeline>
      </div>

      {/* Controlled stepper */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Controlled stepper</SectionTitle>
        <ControlledTimeline />
      </div>

      {/* Custom indicators (icons) */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Custom indicators (icons)</SectionTitle>
        <CustomIndicatorTimeline />
      </div>
    </div>
  )
}

function ControlledTimeline() {
  const [active, setActive] = React.useState(1)
  const max = releaseSteps.length

  return (
    <div className="flex flex-col gap-4">
      <Timeline value={active} onValueChange={setActive}>
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
  {
    step: 1,
    date: "10:02",
    title: "Branch created",
    body: "feature/timeline branched off main.",
    icon: GitBranchIcon,
  },
  {
    step: 2,
    date: "10:18",
    title: "Component scaffolded",
    body: "Initial Timeline primitives committed.",
    icon: CodeIcon,
  },
  {
    step: 3,
    date: "10:45",
    title: "Variants added",
    body: "Horizontal, controlled, and custom indicator examples wired up.",
    icon: SparklesIcon,
  },
  {
    step: 4,
    date: "11:03",
    title: "Shipped",
    body: "Merged and deployed to the showcase.",
    icon: RocketIcon,
  },
]

function CustomIndicatorTimeline() {
  const [active] = React.useState(3)
  return (
    <Timeline value={active}>
      {iconSteps.map((s) => {
        const completed = s.step <= active
        const Icon = completed ? CheckIcon : CircleDashedIcon
        return (
          <TimelineItem key={s.step} step={s.step}>
            <TimelineHeader>
              <TimelineDate>{s.date}</TimelineDate>
              <TimelineTitle className="flex items-center gap-1.5">
                <s.icon className="size-3.5 text-muted-foreground" />
                {s.title}
              </TimelineTitle>
            </TimelineHeader>
            <TimelineIndicator className="flex items-center justify-center border-0 bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground">
              <Icon className="size-2.5" />
            </TimelineIndicator>
            <TimelineSeparator />
            <TimelineContent>{s.body}</TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}
