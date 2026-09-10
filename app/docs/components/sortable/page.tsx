"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"

import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/reui/sortable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
]

function PreviewExample() {
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
      className="grid w-full max-w-xs grid-cols-4 gap-2"
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
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    values: [
      { id: "sizes-small", value: "Small" },
      { id: "sizes-large", value: "Large" },
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

export default function SortableDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Sortable"
        description="Drag-and-drop reordering for lists, grids and nested groups. Built on dnd-kit with Base UI composition, so every part styles through render props and data attributes."
      />

      <DocSection title="Preview">
        <DocProse>
          <code>Sortable</code> owns a controlled array; each{" "}
          <code>SortableItem</code> identifies itself with <code>value</code>{" "}
          and drags by its <code>SortableItemHandle</code>. The dragged item
          dims in place while a portal overlay follows the pointer, and drops
          commit through <code>onValueChange</code>.
        </DocProse>
        <DocExample
          code={`
const [tasks, setTasks] = React.useState(initialTasks)

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
      <SortableItemHandle
        render={<Button variant="ghost" size="icon-xs" />}
      >
        <GripVertical className="size-4" />
      </SortableItemHandle>
      <span className="flex-1 truncate">{task.title}</span>
    </SortableItem>
  ))}
</Sortable>`}
        >
          <PreviewExample />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="sortable" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable"`}
        />
        <DocProse>
          Item ids come from <code>getItemValue</code> and must be unique
          strings — the component warns in development when they collide.
          Reorders are computed with <code>arrayMove</code> and handed to{" "}
          <code>onValueChange</code>; pass <code>onMove</code> instead to take
          over the state transition yourself.
        </DocProse>
      </DocSection>

      <DocSection title="Strategies">
        <DocProse>
          <code>strategy</code> matches the layout: <code>"vertical"</code>{" "}
          (default) for columns, <code>"horizontal"</code> for rows, and{" "}
          <code>"grid"</code> for two-dimensional reordering — here inside a
          four-column CSS grid.
        </DocProse>
        <DocExample
          code={`
<Sortable
  value={tiles}
  onValueChange={setTiles}
  getItemValue={(tile) => tile.id}
  strategy="grid"
  className="grid w-full max-w-xs grid-cols-4 gap-2"
>
  {tiles.map((tile) => (
    <SortableItem key={tile.id} value={tile.id} className="rounded-lg">
      <SortableItemHandle className="flex aspect-square items-center justify-center rounded-lg border border-border-soft bg-card text-sm">
        {tile.label}
      </SortableItemHandle>
    </SortableItem>
  ))}
</Sortable>`}
        >
          <GridExample />
        </DocExample>
      </DocSection>

      <DocSection title="Nested groups">
        <DocProse>
          Sortables nest freely: an outer list reorders group containers while
          an inner Sortable inside each container reorders its own values.
          Handles keep the levels independent — each handle only drags the
          item whose context it sits in, so a child drag never moves its
          parent.
        </DocProse>
        <DocExample
          code={`
<Sortable value={groups} onValueChange={setGroups} getItemValue={(g) => g.id}>
  {groups.map((group) => (
    <SortableItem key={group.id} value={group.id}>
      <SortableItemHandle>…</SortableItemHandle>
      <h3>{group.name}</h3>
      <Sortable
        value={group.values}
        onValueChange={(values) => reorderValues(group.id, values)}
        getItemValue={(v) => v.id}
      >
        {group.values.map((value) => (
          <SortableItem key={value.id} value={value.id}>
            <SortableItemHandle>…</SortableItemHandle>
            {value.value}
          </SortableItem>
        ))}
      </Sortable>
    </SortableItem>
  ))}
</Sortable>`}
        >
          <NestedExample />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <PropsTable
          title="Sortable"
          rows={[
            {
              prop: "value",
              type: "T[]",
              description: "Controlled array of items in display order.",
            },
            {
              prop: "onValueChange",
              type: "(value: T[]) => void",
              description: "Receives the reordered array after a drop.",
            },
            {
              prop: "getItemValue",
              type: "(item: T) => string",
              description:
                "Maps an item to its unique id — must match the SortableItem value.",
            },
            {
              prop: "strategy",
              type: '"vertical" | "horizontal" | "grid"',
              defaultValue: '"vertical"',
              description: "Sorting strategy matching the layout direction.",
            },
            {
              prop: "onMove",
              type: "({ event, activeIndex, overIndex }) => void",
              description:
                "Replaces the built-in arrayMove commit for custom state transitions.",
            },
            {
              prop: "onValueCommit",
              type: "(value, meta) => void",
              description:
                "Fires after a commit with { event, activeIndex, overIndex, previousValue }.",
            },
            {
              prop: "collisionDetection",
              type: "CollisionDetection",
              defaultValue: "closestCenter",
              description:
                "dnd-kit collision algorithm; closestCenter keeps large items reliable in both directions.",
            },
            {
              prop: "modifiers",
              type: "Modifiers",
              description:
                "dnd-kit modifiers (e.g. restrictToVerticalAxis), also applied to the overlay.",
            },
            {
              prop: "onDragStart / onDragEnd / onDragCancel",
              type: "(event) => void",
              description: "Raw dnd-kit lifecycle callbacks.",
            },
          ]}
        />
        <PropsTable
          title="SortableItem"
          rows={[
            {
              prop: "value",
              type: "string",
              description: "Unique id matching getItemValue for this item.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Dims the item, disables its handle and pins it in place.",
            },
            {
              prop: "render",
              type: "ReactElement",
              description:
                "Base UI render prop — merge the sortable behavior onto any element or component.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "Sortable",
              description:
                'Root container (data-slot="sortable") providing the DndContext; sets data-dragging while a drag is live.',
            },
            {
              part: "SortableItem",
              description:
                'One draggable entry (data-slot="sortable-item") with data-value, data-dragging and data-disabled state attributes.',
            },
            {
              part: "SortableItemHandle",
              description:
                'The drag grip (data-slot="sortable-item-handle") carrying the pointer and keyboard listeners; grab/grabbing cursors built in.',
            },
            {
              part: "SortableOverlay",
              description:
                "Optional custom overlay portal — render-prop children receive the active item id. Without it, the active item is cloned automatically.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & sensors">
        <DocProse>
          Pointer drags activate after 10px of travel (250ms hold on touch),
          so taps and clicks inside items keep working. Handles are keyboard
          operable via dnd-kit: focus a handle, press Space or Enter to lift,
          move with the arrow keys and drop with Space/Enter or cancel with
          Escape, with positions announced to screen readers. Every part
          exposes <code>data-slot</code> plus drag-state data attributes for
          styling.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
