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
import { PreviewCard, PreviewGrid } from "./preview-card"
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

const releaseSteps = [
  {
    step: 1,
    date: "Jan 2026",
    title: "Project initialized",
    body: "Bootstrapped the repository and locked the design system.",
  },
  {
    step: 2,
    date: "Feb 2026",
    title: "Design system finalized",
    body: "Tokens, typography, and primitives reviewed and approved.",
  },
  {
    step: 3,
    date: "Mar 2026",
    title: "Beta release",
    body: "Shipped to internal testers; collected first feedback.",
  },
  {
    step: 4,
    date: "Apr 2026",
    title: "Public launch",
    body: "Marketing site live and signups open.",
  },
]

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

export default function TimelinePreview() {
  const active = 3

  return (
    <PreviewGrid>
      <PreviewCard label="Vertical">
        <Timeline defaultValue={2} className="w-full max-w-md">
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
      </PreviewCard>

      <PreviewCard label="Custom indicators (icons)">
        <Timeline value={active} className="w-full max-w-md">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
