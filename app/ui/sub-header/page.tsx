"use client"

import {
  ArrowUpDown,
  Activity as ActivityIcon,
  AlignLeft,
  Bold,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Code,
  Ellipsis,
  EyeOff,
  FileText,
  Italic,
  Link2,
  List,
  ListFilter,
  ListOrdered,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  SmilePlus,
  Strikethrough,
  TextQuote,
  Underline,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SubHeader, SubHeaderSeparator } from "@/components/ui/sub-header"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function SubHeaderPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Filters */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Filters</SectionTitle>
        <SubHeader
          leftControls={
            <>
              <Button variant="secondary" size="sm">
                Lead owner <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="secondary" size="sm">
                Status <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="secondary" size="sm">
                Organization <ChevronDown data-icon="inline-end" />
              </Button>
            </>
          }
          rightControls={
            <>
              <Button variant="secondary" size="sm">
                <EyeOff data-icon="inline-start" /> Columns
              </Button>
              <Button variant="secondary" size="sm">
                <List data-icon="inline-start" /> Group
              </Button>
              <Button variant="secondary" size="sm">
                <ListFilter data-icon="inline-start" /> Filter
              </Button>
              <Button variant="secondary" size="sm">
                <ArrowUpDown data-icon="inline-start" /> Sort
              </Button>
              <Button variant="secondary" size="icon-sm" aria-label="More">
                <Ellipsis />
              </Button>
            </>
          }
        />
      </div>

      {/* Calendar */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Calendar</SectionTitle>
        <SubHeader
          leftControls={
            <Button variant="ghost" size="sm" className="text-lg font-semibold">
              August 2025 <ChevronDown data-icon="inline-end" />
            </Button>
          }
          rightControls={
            <>
              <Button variant="ghost" size="icon-sm" aria-label="Previous">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="sm">
                Today
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Next">
                <ChevronRight />
              </Button>
              <Button variant="secondary" size="sm">
                Week <ChevronDown data-icon="inline-end" />
              </Button>
              <Tabs defaultValue="all">
                <TabsList size="sm">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsIndicator />
                </TabsList>
              </Tabs>
              <Button variant="secondary" size="sm">
                <Users data-icon="inline-start" /> Lead{" "}
                <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="More">
                <Ellipsis />
              </Button>
            </>
          }
        />
      </div>

      {/* Editor toolbar */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Editor Toolbar</SectionTitle>
        <SubHeader
          leftControls={
            <>
              <Button variant="ghost" size="sm">
                Text <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="ghost" size="sm">
                Inter <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Decrease size">
                <Minus />
              </Button>
              <span className="text-sm text-secondary-foreground">18</span>
              <Button variant="ghost" size="icon-sm" aria-label="Increase size">
                <Plus />
              </Button>
              <SubHeaderSeparator />
              <Button variant="ghost" size="icon-sm" aria-label="Emoji">
                <SmilePlus />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Comment">
                <MessageCircle />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Bold">
                <Bold />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Italic">
                <Italic />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Underline">
                <Underline />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Strikethrough">
                <Strikethrough />
              </Button>
              <SubHeaderSeparator />
              <Button variant="ghost" size="icon-sm" aria-label="Code">
                <Code />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Quote">
                <TextQuote />
              </Button>
              <SubHeaderSeparator />
              <Button variant="ghost" size="sm" aria-label="Link">
                <Link2 /> <ChevronDown data-icon="inline-end" />
              </Button>
              <SubHeaderSeparator />
              <Button variant="ghost" size="sm" aria-label="Ordered list">
                <ListOrdered /> <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Bullet list">
                <List /> <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Alignment">
                <AlignLeft /> <ChevronDown data-icon="inline-end" />
              </Button>
            </>
          }
        />
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Tabs Navigation</SectionTitle>
        <SubHeader
          className="border-b border-border-soft px-5 py-0"
          leftControls={
            <Tabs defaultValue="activity">
              {/* the list's own border is dropped so the SubHeader's border is
                  the single underline; the indicator overlaps it exactly */}
              <TabsList
                variant="line"
                size="sm"
                className="h-10! gap-6 border-b-0! [&_[data-slot=tabs-trigger]]:h-full! [&_[data-slot=tabs-trigger]]:px-0!"
              >
                <TabsTrigger value="activity">
                  <ActivityIcon data-icon="inline-start" /> Activity
                </TabsTrigger>
                <TabsTrigger value="emails">
                  <Mail data-icon="inline-start" /> Emails
                </TabsTrigger>
                <TabsTrigger value="calls">
                  <Phone data-icon="inline-start" /> Calls
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar data-icon="inline-start" /> Events
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  <CircleCheck data-icon="inline-start" /> Tasks
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <FileText data-icon="inline-start" /> Notes
                </TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
          }
        />
      </div>
    </div>
  )
}
