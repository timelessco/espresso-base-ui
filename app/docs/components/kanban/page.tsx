"use client"

import * as React from "react"

import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/kibo-ui/kanban"
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

const demoColumns = [
  { id: "planned", name: "Planned", color: "#6B7280" },
  { id: "in-progress", name: "In Progress", color: "#F59E0B" },
  { id: "done", name: "Done", color: "#10B981" },
]

const demoTasks = [
  { id: "t1", name: "Design onboarding flow", column: "planned" },
  { id: "t2", name: "Draft pricing page", column: "planned" },
  { id: "t3", name: "Build settings screen", column: "in-progress" },
  { id: "t4", name: "Wire up billing API", column: "in-progress" },
  { id: "t5", name: "Ship dark mode", column: "done" },
]

function KanbanDemo() {
  const [tasks, setTasks] = React.useState(demoTasks)

  return (
    <div className="h-72 w-full">
      <KanbanProvider
        columns={demoColumns}
        data={tasks}
        onDataChange={setTasks}
      >
        {(column) => (
          <KanbanBoard id={column.id} key={column.id}>
            <KanbanHeader>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <span>{column.name}</span>
              </div>
            </KanbanHeader>
            <KanbanCards id={column.id}>
              {(task: (typeof tasks)[number]) => (
                <KanbanCard
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  column={column.id}
                />
              )}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>
    </div>
  )
}

export default function KanbanDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Kanban"
        description="A drag-and-drop board for moving cards between columns, built on dnd-kit. State is fully controlled through onDataChange."
      />

      <DocSection title="Preview">
        <DocProse>
          Keep the cards in a single flat array where each item points at its{" "}
          <code>column</code>. Drag a card between columns – the provider
          updates the array and hands it back via <code>onDataChange</code>.
        </DocProse>
        <DocExample
          code={`
const [tasks, setTasks] = useState(demoTasks)

<KanbanProvider columns={columns} data={tasks} onDataChange={setTasks}>
  {(column) => (
    <KanbanBoard id={column.id} key={column.id}>
      <KanbanHeader>{column.name}</KanbanHeader>
      <KanbanCards id={column.id}>
        {(task) => (
          <KanbanCard
            key={task.id}
            id={task.id}
            name={task.name}
            column={column.id}
          />
        )}
      </KanbanCards>
    </KanbanBoard>
  )}
</KanbanProvider>`}
        >
          <KanbanDemo />
        </DocExample>
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
  type DragEndEvent,
} from "@/components/kibo-ui/kanban"`}
        />
        <CodeBlock
          code={`
const columns = [
  { id: "todo", name: "Todo" },
  { id: "done", name: "Done" },
]

const [items, setItems] = useState([
  { id: "1", name: "Write docs", column: "todo" },
  { id: "2", name: "Review PR", column: "done" },
])

<KanbanProvider columns={columns} data={items} onDataChange={setItems}>
  {(column) => (
    <KanbanBoard id={column.id} key={column.id}>
      <KanbanHeader>{column.name}</KanbanHeader>
      <KanbanCards id={column.id}>
        {(item) => (
          <KanbanCard key={item.id} id={item.id} name={item.name} column={column.id} />
        )}
      </KanbanCards>
    </KanbanBoard>
  )}
</KanbanProvider>`}
        />
      </DocSection>

      <DocSection title="Custom card content">
        <DocProse>
          <code>KanbanCard</code> renders its <code>name</code> by default; pass
          children instead to lay out your own card body – the drag overlay
          clones whatever you render.
        </DocProse>
        <CodeBlock
          code={`
<KanbanCard key={task.id} id={task.id} name={task.name} column={column.id}>
  <div className="flex items-start justify-between gap-2">
    <p className="m-0 flex-1 text-sm font-medium">{task.name}</p>
    <Avatar className="h-4 w-4 shrink-0">
      <AvatarImage src={task.owner.image} />
      <AvatarFallback>{task.owner.initials}</AvatarFallback>
    </Avatar>
  </div>
  <p className="m-0 text-xs text-muted-foreground">{task.dueDate}</p>
</KanbanCard>`}
        />
      </DocSection>

      <DocSection title="Drag events">
        <DocProse>
          Beyond <code>onDataChange</code>, the provider forwards dnd-kit&apos;s{" "}
          <code>onDragStart</code>, <code>onDragOver</code> and{" "}
          <code>onDragEnd</code> – useful for persisting the move once the drag
          settles.
        </DocProse>
        <CodeBlock
          code={`
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event
  if (!over) return
  saveOrder(active.id, over.id)
}

<KanbanProvider
  columns={columns}
  data={items}
  onDataChange={setItems}
  onDragEnd={handleDragEnd}
>
  {...}
</KanbanProvider>`}
        />
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          The board is generic: card data extends{" "}
          <code>{"{ id: string; name: string; column: string }"}</code> and
          columns extend <code>{"{ id: string; name: string }"}</code> – any
          extra fields flow through to the render props untouched.{" "}
          <code>KanbanProvider</code> shares columns, data and the active card
          through context, so <code>KanbanCards</code> and{" "}
          <code>KanbanCard</code> must render inside it.
        </DocProse>
        <PropsTable
          title="KanbanProvider"
          rows={[
            {
              prop: "columns",
              type: "C[] extends { id, name }[]",
              description: "The board's columns, rendered in order.",
            },
            {
              prop: "data",
              type: "T[] extends { id, name, column }[]",
              description:
                "Flat array of all cards; each card's column field decides where it appears.",
            },
            {
              prop: "children",
              type: "(column: C) => ReactNode",
              description:
                "Render prop invoked once per column – return a KanbanBoard.",
            },
            {
              prop: "onDataChange",
              type: "(data: T[]) => void",
              description:
                "Called with the reordered array while dragging over and when a drag ends – wire it to your state setter.",
            },
            {
              prop: "onDragStart / onDragOver / onDragEnd",
              type: "(event) => void",
              description:
                "dnd-kit event callbacks, forwarded after the internal handlers run.",
            },
            {
              prop: "className",
              type: "string",
              description:
                "Extra classes for the column grid (auto-cols-fr grid-flow-col with gap-4).",
            },
          ]}
        />
        <PropsTable
          title="KanbanBoard"
          rows={[
            {
              prop: "id",
              type: "string",
              description:
                "Column id – registered as a droppable zone; a primary ring appears while a card hovers over it.",
            },
          ]}
        />
        <PropsTable
          title="KanbanCards"
          rows={[
            {
              prop: "id",
              type: "string",
              description:
                "Column id – filters the provider's data to this column and creates the sortable context.",
            },
            {
              prop: "children",
              type: "(item: T) => ReactNode",
              description:
                "Render prop invoked for each card in the column – return a KanbanCard.",
            },
          ]}
        />
        <PropsTable
          title="KanbanCard"
          rows={[
            {
              prop: "id",
              type: "string",
              description: "Unique card id used by the sortable context.",
            },
            {
              prop: "name",
              type: "string",
              description:
                "Card label – rendered as the default body when no children are passed, and read aloud in drag announcements.",
            },
            {
              prop: "column",
              type: "string",
              description: "The column the card currently belongs to.",
            },
            {
              prop: "children",
              type: "ReactNode",
              description: "Custom card body, replacing the default name text.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "KanbanBoard",
              description:
                "Droppable column surface on bg-secondary – rounded, divided rows, ring-primary highlight while a card is over it.",
            },
            {
              part: "KanbanHeader",
              description:
                "Column title row (font-semibold, p-2). Plain div – put a color dot, count or menu inside.",
            },
            {
              part: "KanbanCards",
              description:
                "Scrollable, sortable card stack for one column, wrapped in a ScrollArea.",
            },
            {
              part: "KanbanCard",
              description:
                "Draggable Card. While dragging, the in-place card dims and a clone follows the pointer in a DragOverlay portal.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility">
        <DocProse>
          The provider wires up mouse, touch and keyboard sensors, so cards can
          be picked up and moved from the keyboard. It also supplies dnd-kit{" "}
          <code>Announcements</code> for every drag phase – picked up, dragged
          over, dropped, cancelled – naming the card and column for screen
          readers.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
