"use client"

import * as React from "react"
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

export default function TimelinePreview() {
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
    </PreviewGrid>
  )
}
