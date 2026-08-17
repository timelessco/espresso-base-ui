import * as React from "react"

// A bordered showcase card with a bottom-left label (component preview grid).
export function PreviewCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-64 flex-col rounded-xl border border-border-soft bg-background">
      <div className="flex flex-1 flex-wrap items-center justify-center gap-3 p-10">
        {children}
      </div>
      <div className="border-t border-border-soft px-4 py-3 text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

// Scrollable 2-column grid that hosts a component's PreviewCards.
export function PreviewGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto bg-secondary p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">{children}</div>
    </div>
  )
}
