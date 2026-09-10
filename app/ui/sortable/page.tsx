"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"

import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/reui/sortable"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function SectionNote({ children }: { children: React.ReactNode }) {
  return <p className="max-w-prose text-sm text-muted-foreground">{children}</p>
}

function DragHandle() {
  return (
    <SortableItemHandle
      render={
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
        />
      }
    >
      <GripVertical className="size-4" />
    </SortableItemHandle>
  )
}

type Task = { id: string; title: string; status: string }

const initialTasks: Task[] = [
  { id: "task-1", title: "Audit color tokens", status: "In progress" },
  { id: "task-2", title: "Ship elevation ladder", status: "Done" },
  { id: "task-3", title: "Migrate data grid", status: "In progress" },
  { id: "task-4", title: "Write sortable docs", status: "Todo" },
  { id: "task-5", title: "Dark mode sweep", status: "Todo" },
]

function VerticalExample() {
  const [tasks, setTasks] = React.useState(initialTasks)
  return (
    <Sortable
      value={tasks}
      onValueChange={setTasks}
      getItemValue={(task) => task.id}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      {tasks.map((task) => (
        <SortableItem
          key={task.id}
          value={task.id}
          className="flex items-center gap-2 rounded-lg border border-border-soft bg-card px-3 py-2.5"
        >
          <DragHandle />
          <span className="flex-1 truncate text-base text-foreground">
            {task.title}
          </span>
          <Badge
            variant={
              task.status === "Done"
                ? "secondary"
                : task.status === "In progress"
                  ? "outline"
                  : "ghost"
            }
            size="sm"
          >
            {task.status}
          </Badge>
        </SortableItem>
      ))}
    </Sortable>
  )
}

type Member = { id: string; name: string; image: string }

const initialMembers: Member[] = [
  {
    id: "jenny",
    name: "Jenny Wilson",
    image: "https://i.pravatar.cc/40?u=jenny",
  },
  { id: "david", name: "David Lee", image: "https://i.pravatar.cc/40?u=david" },
  {
    id: "maria",
    name: "Maria Gomez",
    image: "https://i.pravatar.cc/40?u=maria",
  },
  { id: "liam", name: "Liam Brown", image: "https://i.pravatar.cc/40?u=liam" },
]

function HorizontalExample() {
  const [members, setMembers] = React.useState(initialMembers)
  return (
    <Sortable
      value={members}
      onValueChange={setMembers}
      getItemValue={(member) => member.id}
      strategy="horizontal"
      className="flex flex-wrap items-center gap-2"
    >
      {members.map((member) => (
        <SortableItem
          key={member.id}
          value={member.id}
          className="rounded-full"
        >
          <SortableItemHandle className="flex items-center gap-2 rounded-full border border-border-soft bg-card py-1 pr-3 pl-1">
            <Avatar size="xs">
              <AvatarImage src={member.image} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-secondary-foreground">
              {member.name}
            </span>
          </SortableItemHandle>
        </SortableItem>
      ))}
    </Sortable>
  )
}

type Tile = { id: string; label: string }

const initialTiles: Tile[] = Array.from({ length: 8 }, (_, i) => ({
  id: `tile-${i + 1}`,
  label: `Tile ${i + 1}`,
}))

function GridExample() {
  const [tiles, setTiles] = React.useState(initialTiles)
  return (
    <Sortable
      value={tiles}
      onValueChange={setTiles}
      getItemValue={(tile) => tile.id}
      strategy="grid"
      className="grid w-full max-w-md grid-cols-4 gap-2"
    >
      {tiles.map((tile) => (
        <SortableItem key={tile.id} value={tile.id} className="rounded-lg">
          <SortableItemHandle className="flex aspect-square items-center justify-center rounded-lg border border-border-soft bg-card text-sm text-secondary-foreground">
            {tile.label}
          </SortableItemHandle>
        </SortableItem>
      ))}
    </Sortable>
  )
}

type OptionValue = { id: string; value: string }
type OptionGroup = { id: string; name: string; values: OptionValue[] }

const initialOptionGroups: OptionGroup[] = [
  {
    id: "colors",
    name: "Colors",
    values: [
      { id: "colors-white", value: "White" },
      { id: "colors-black", value: "Black" },
      { id: "colors-grey", value: "Grey" },
      { id: "colors-green", value: "Green" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    values: [
      { id: "sizes-small", value: "Small" },
      { id: "sizes-medium", value: "Medium" },
      { id: "sizes-large", value: "Large" },
    ],
  },
  {
    id: "materials",
    name: "Materials",
    values: [
      { id: "materials-cotton", value: "Cotton" },
      { id: "materials-polyester", value: "Polyester" },
      { id: "materials-wool", value: "Wool" },
    ],
  },
]

function NestedExample() {
  const [groups, setGroups] = React.useState(initialOptionGroups)

  const reorderValues = (groupId: string, values: OptionValue[]) => {
    setGroups((previous) =>
      previous.map((group) =>
        group.id === groupId ? { ...group, values } : group
      )
    )
  }

  return (
    <Sortable
      value={groups}
      onValueChange={setGroups}
      getItemValue={(group) => group.id}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      {groups.map((group) => (
        <SortableItem
          key={group.id}
          value={group.id}
          className="rounded-xl border border-border-soft bg-card p-3"
        >
          <div className="mb-2 flex items-center gap-2">
            <DragHandle />
            <h3 className="text-base font-medium text-foreground">
              {group.name}
            </h3>
          </div>
          <Sortable
            value={group.values}
            onValueChange={(values) => reorderValues(group.id, values)}
            getItemValue={(value) => value.id}
            className="flex flex-col gap-2"
          >
            {group.values.map((value) => (
              <SortableItem
                key={value.id}
                value={value.id}
                className="flex items-center gap-2 rounded-lg border border-border-soft bg-card px-2 py-1.5"
              >
                <DragHandle />
                <span className="flex-1 truncate text-base text-secondary-foreground">
                  {value.value}
                </span>
              </SortableItem>
            ))}
          </Sortable>
        </SortableItem>
      ))}
    </Sortable>
  )
}

const initialSteps = [
  { id: "step-1", title: "Connect your repository", locked: false },
  { id: "step-2", title: "Configure the build", locked: false },
  { id: "step-3", title: "Production deploy (locked)", locked: true },
  { id: "step-4", title: "Invite your team", locked: false },
]

function DisabledExample() {
  const [steps, setSteps] = React.useState(initialSteps)
  return (
    <Sortable
      value={steps}
      onValueChange={setSteps}
      getItemValue={(step) => step.id}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      {steps.map((step) => (
        <SortableItem
          key={step.id}
          value={step.id}
          disabled={step.locked}
          className="flex items-center gap-2 rounded-lg border border-border-soft bg-card px-3 py-2.5"
        >
          <DragHandle />
          <span className="flex-1 truncate text-base text-foreground">
            {step.title}
          </span>
        </SortableItem>
      ))}
    </Sortable>
  )
}

export default function SortablePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <SectionNote>
          A vertical list reordered by dragging the grip handle. The dragged row
          dims in place while a portal overlay follows the pointer; keyboard
          users can focus the handle and move items with the arrow keys.
        </SectionNote>
        <VerticalExample />
      </div>

      {/* Horizontal */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Horizontal</SectionTitle>
        <SectionNote>
          <code className="font-mono text-xs">strategy="horizontal"</code> for
          rows of chips — each chip is its own drag handle.
        </SectionNote>
        <HorizontalExample />
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Grid</SectionTitle>
        <SectionNote>
          <code className="font-mono text-xs">strategy="grid"</code> reorders in
          two dimensions inside a CSS grid.
        </SectionNote>
        <GridExample />
      </div>

      {/* Nested groups */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Nested Groups</SectionTitle>
        <SectionNote>
          Two independent levels: an outer Sortable reorders the group cards by
          the handle in each header, and an inner Sortable inside every card
          reorders its own values. Handles keep the levels separate — a child
          drag never moves its parent.
        </SectionNote>
        <NestedExample />
      </div>

      {/* Disabled item */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Item</SectionTitle>
        <SectionNote>
          <code className="font-mono text-xs">disabled</code> on a{" "}
          <code className="font-mono text-xs">SortableItem</code> pins it: it
          dims, cannot be dragged, and other items cannot displace it.
        </SectionNote>
        <DisabledExample />
      </div>
    </div>
  )
}
