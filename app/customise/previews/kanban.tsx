"use client"

import * as React from "react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/kibo-ui/kanban"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const columns = [
  { id: "planned", name: "Planned", color: "#6B7280" },
  { id: "in-progress", name: "In Progress", color: "#F59E0B" },
  { id: "done", name: "Done", color: "#10B981" },
]

type Feature = {
  id: string
  name: string
  column: string
  owner: string
  due: string
}

const initialFeatures: Feature[] = [
  {
    id: "1",
    name: "Design onboarding flow",
    column: "planned",
    owner: "AB",
    due: "May 12",
  },
  {
    id: "2",
    name: "Refactor billing API",
    column: "in-progress",
    owner: "CJ",
    due: "May 18",
  },
  {
    id: "3",
    name: "Migrate to Tailwind v4",
    column: "in-progress",
    owner: "DL",
    due: "May 20",
  },
  {
    id: "4",
    name: "Ship dark mode",
    column: "done",
    owner: "EM",
    due: "May 04",
  },
]

export default function KanbanPreview() {
  const [features, setFeatures] = React.useState(initialFeatures)

  return (
    <PreviewGrid>
      <PreviewCard label="Board">
        <div className="h-80 w-full">
          <KanbanProvider
            columns={columns}
            data={features}
            onDataChange={setFeatures}
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
                  {(feature: Feature) => (
                    <KanbanCard
                      column={column.id}
                      id={feature.id}
                      key={feature.id}
                      name={feature.name}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="m-0 flex-1 text-sm font-medium">
                          {feature.name}
                        </p>
                        <Avatar className="h-4 w-4 shrink-0">
                          <AvatarFallback>{feature.owner}</AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="m-0 text-xs text-muted-foreground">
                        Due {feature.due}
                      </p>
                    </KanbanCard>
                  )}
                </KanbanCards>
              </KanbanBoard>
            )}
          </KanbanProvider>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
