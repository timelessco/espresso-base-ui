"use client"

import * as React from "react"
import {
  CheckIcon,
  CircleDashedIcon,
  CodeIcon,
  GitBranchIcon,
  MessageSquareIcon,
  PhoneIncomingIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
      {/* CRM activity log (mixed item types) */}
      <div className="flex max-w-2xl flex-col gap-8">
        <SectionTitle>CRM activity log (mixed item types)</SectionTitle>
        <CrmActivityTimeline />
      </div>

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

      {/* Activity feed (avatars) */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Activity feed (avatars as indicators)</SectionTitle>
        <ActivityFeedTimeline />
      </div>
    </div>
  )
}

function CrmActivityTimeline() {
  return (
    <Timeline defaultValue={6}>
      {/* 1) Email card with attachments */}
      <TimelineItem
        step={1}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-full group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator
          className="size-7 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8"
          render={
            <Avatar className="size-7">
              <AvatarImage
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
                alt="Templeton Peck"
              />
              <AvatarFallback className="text-[10px]">TP</AvatarFallback>
            </Avatar>
          }
        />
        <TimelineContent>
          <Card variant="mail" className="-mt-2.5 gap-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-medium text-foreground">
                    Templeton Peck
                  </span>{" "}
                  <span className="text-sm text-accent-foreground">
                    &lt;templeton@frappe.io&gt;
                  </span>
                </p>
                <p className="text-base font-normal text-muted-foreground">
                  <span className="text-accent-foreground">To:</span> Jonathan
                  Higgins, sandeep@timeless.co, +4
                </p>
                <p className="text-base text-muted-foreground">
                  <span className="text-accent-foreground">Subject:</span>{" "}
                  Package update
                </p>
              </div>
              <span className="shrink-0 text-xs text-accent-foreground">
                3d ago
              </span>
            </div>
            <div className="mt-3.5 border-t border-border-soft pt-3.5 text-base text-foreground">
              <p className="pb-0.5">Hi Good morning,</p>
              <p>We hope this message finds you well.</p>
              <br></br>

              <p className="leading-lg">
                We are writing to inform you about recent updates to our
                inventory package that may affect your current and future
                orders. We’ve expanded our inventory with new items including
                Bose. These additions are now available for ordering and can be
                viewed on our Bose
              </p>
              <br></br>
              <p className="pb-0.5">Thanks &amp; Regards</p>
              <p>Templeton Peck</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <AttachmentChip
                icon="/images/svg/zip.svg"
                name="Satoshi.zip"
                meta="Zip · 5.4 MB"
              />
              <AttachmentChip
                icon="/images/svg/pdf.svg"
                name="Bose.PDF"
                meta="PDF · 44MB"
              />
              <AttachmentChip
                icon="/images/svg/document.svg"
                name="Supply_Update.doc"
                meta="Doc · 9.8 MB"
              />
            </div>
          </Card>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem
        step={2}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-full group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator
          className="size-7 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8"
          render={
            <Avatar className="size-7">
              <AvatarImage
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
                alt="Templeton Peck"
              />
              <AvatarFallback className="text-[10px]">TP</AvatarFallback>
            </Avatar>
          }
        />
        <TimelineContent>
          <Card variant="mail" className="-mt-2.5 gap-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <p>
                  <span className="font-medium text-foreground">
                    Templeton Peck
                  </span>{" "}
                  <span className="text-sm text-accent-foreground">
                    &lt;templeton@frappe.io&gt;
                  </span>
                </p>
              </div>
              <span className="shrink-0 text-xs text-accent-foreground">
                3d ago
              </span>
            </div>
            <p className="pt-1 leading-lg text-accent-foreground">
              Hi, I placed an order last week. I spoke with Marisa at the time.
              When will it be delivered?
            </p>
          </Card>
        </TimelineContent>
      </TimelineItem>

      {/* 2) Comment in chat bubble */}
      <TimelineItem
        step={3}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-full group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator className="flex size-8 items-center justify-center rounded-full border-none bg-secondary text-muted-foreground group-data-[orientation=vertical]/timeline:-left-8">
          <MessageSquareIcon className="size-3.5" />
        </TimelineIndicator>
        <TimelineContent className="mt-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <Avatar className="size-5">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80"
                  alt="Sanny Woven"
                />
                <AvatarFallback className="text-[9px]">SW</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">Sanny Woven</span>
              <span className="text-muted-foreground">added a comment</span>
            </div>
            <span className="text-xs text-accent-foreground">27 Jun</span>
          </div>
          <Card variant="message" className="mt-2 w-full text-base">
            <p className="max-w-lg leading-lg text-muted-foreground">
              <span className="font-medium text-secondary-foreground">
                @Sandra Bass
              </span>
              , I&apos;ve noticed that too. I think we need better forecasting.
              We often end up with either too much stock or not enough. Maybe we
              should look into some advanced forecasting software?
            </p>
          </Card>
        </TimelineContent>
      </TimelineItem>

      {/* 3) Compact activity log rows */}
      <TimelineItem
        step={4}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="h-full! bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator className="size-2 rounded-full border-0 bg-yellow-500 group-data-[orientation=vertical]/timeline:top-1 group-data-[orientation=vertical]/timeline:-left-9 group-data-[orientation=vertical]/timeline:translate-x-0" />
        <TimelineContent>
          <p className="text-sm font-medium text-foreground">
            Show +9 activities from last week
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Significa Well
                  </span>{" "}
                  updated deal status value from{" "}
                  <span className="font-medium text-foreground">
                    Prospecting
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">Qualified</span>
                </>
              }
              date="12 Jun"
            />
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Gleb Kuznetsov
                  </span>{" "}
                  created a task
                </>
              }
              date="19 Jun"
            />
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Zhenya Rynzhuk
                  </span>{" "}
                  added a note
                </>
              }
              date="19 Jun"
            />
            <ActivityRow
              text={
                <>
                  <span className="font-medium text-foreground">
                    Shariq Ansari
                  </span>{" "}
                  updated status from{" "}
                  <span className="font-medium text-foreground">Contacted</span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">Qualified</span>
                </>
              }
              date="20 Jun"
            />
          </ul>
        </TimelineContent>
      </TimelineItem>

      {/* 4) Single field change */}
      <TimelineItem
        step={5}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineSeparator className="h-full! bg-muted! group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:translate-y-0" />
        <TimelineIndicator className="size-2 rounded-full border-0 bg-yellow-500 group-data-[orientation=vertical]/timeline:top-1 group-data-[orientation=vertical]/timeline:-left-9 group-data-[orientation=vertical]/timeline:translate-x-0" />
        <TimelineContent>
          <p className="text-sm">
            <span className="font-medium text-foreground">Shariq Ansari</span>{" "}
            <span className="text-muted-foreground">added</span>{" "}
            <span className="font-medium text-foreground">Annual Revenue</span>{" "}
            <span className="text-muted-foreground">as</span>{" "}
            <span className="font-medium text-foreground">45,00,000.00</span>
          </p>
        </TimelineContent>
      </TimelineItem>

      {/* 6) Phone call card */}
      <TimelineItem
        step={6}
        className="group-data-[orientation=vertical]/timeline:ms-10"
      >
        <TimelineIndicator className="flex size-8 items-center justify-center rounded-full border-none bg-destructive/10 text-destructive group-data-[orientation=vertical]/timeline:-left-8">
          <PhoneIncomingIcon className="size-3.5" />
        </TimelineIndicator>
        <TimelineContent>
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <Avatar className="size-5">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80"
                  alt="Brian Robinson"
                />
                <AvatarFallback className="text-[9px]">BR</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">
                Brian Robinson
              </span>
              <span className="text-muted-foreground">
                has reached out to you.
              </span>
            </div>
            <span className="text-xs text-accent-foreground">14 May</span>
          </div>
          <Card variant="call" className="mt-2 gap-0">
            <p className="pb-1 text-sm font-medium text-foreground">
              Inbound Call
            </p>
            <p className="text-sm text-destructive">Missed call</p>
          </Card>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

function AttachmentChip({
  icon,
  name,
  meta,
}: {
  icon: string
  name: string
  meta: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
      {/* biome-ignore lint/performance/noImgElement: static SVG from /public, no optimization needed */}

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium text-foreground">{name}</p>
        <div className="flex items-center gap-2 pt-1">
          <img src={icon} alt="" className="size-4 shrink-0" />
          <p className="truncate text-xs text-muted-foreground">{meta}</p>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({ text, date }: { text: React.ReactNode; date: string }) {
  return (
    <li className="flex items-center justify-between gap-3 text-accent-foreground">
      <span>{text}</span>
      <span className="shrink-0 text-xs">{date}</span>
    </li>
  )
}

const activities = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    action: "pushed 3 commits to",
    target: "main",
    date: "5 minutes ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    action: "opened pull request",
    target: "#284 — Add dark mode",
    date: "20 minutes ago",
  },
  {
    id: 3,
    user: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    action: "commented on",
    target: "Issue #142",
    date: "1 hour ago",
  },
  {
    id: 4,
    user: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    action: "deployed to",
    target: "production",
    date: "2 hours ago",
  },
  {
    id: 5,
    user: "Michael Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    action: "merged branch",
    target: "feat/notifications",
    date: "3 hours ago",
  },
]

function ActivityFeedTimeline() {
  return (
    <Timeline defaultValue={5}>
      {activities.map((activity) => (
        <TimelineItem
          key={activity.id}
          step={activity.id}
          className="group-data-[orientation=vertical]/timeline:ms-10"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.25rem)] group-data-[orientation=vertical]/timeline:translate-y-8" />
            <TimelineIndicator
              className="size-7 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8"
              render={
                <Avatar className="size-7">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback className="text-[10px]">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              }
            />
          </TimelineHeader>
          <TimelineContent>
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <TimelineDate className="mt-0.5 mb-0">{activity.date}</TimelineDate>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
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
