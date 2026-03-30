"use client"

import { Input } from "@/components/ui/input"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function InputPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Outline — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — Sizes</SectionTitle>
        <Input variant="outline" size="sm" placeholder="Small (sm)" />
        <Input variant="outline" size="md" placeholder="Medium (md)" />
        <Input variant="outline" size="lg" placeholder="Large (lg)" />
        <Input variant="outline" size="xl" placeholder="Extra Large (xl)" />
      </div>

      {/* Subtle — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — Sizes</SectionTitle>
        <Input variant="subtle" size="sm" placeholder="Small (sm)" />
        <Input variant="subtle" size="md" placeholder="Medium (md)" />
        <Input variant="subtle" size="lg" placeholder="Large (lg)" />
        <Input variant="subtle" size="xl" placeholder="Extra Large (xl)" />
      </div>

      {/* Outline — States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — States</SectionTitle>
        <Input variant="outline" placeholder="Default" />
        <Input variant="outline" defaultValue="With value" />
        <Input variant="outline" disabled placeholder="Disabled" />
        <Input variant="outline" disabled defaultValue="Disabled with value" />
        <Input variant="outline" aria-invalid="true" defaultValue="Invalid" />
      </div>

      {/* Subtle — States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — States</SectionTitle>
        <Input variant="subtle" placeholder="Default" />
        <Input variant="subtle" defaultValue="With value" />
        <Input variant="subtle" disabled placeholder="Disabled" />
        <Input variant="subtle" disabled defaultValue="Disabled with value" />
        <Input variant="subtle" aria-invalid="true" defaultValue="Invalid" />
      </div>

      {/* All States Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All States</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Outline</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Subtle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Default</td>
                <td className="px-4 py-3"><Input variant="outline" placeholder="Default" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" placeholder="Default" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">With Value</td>
                <td className="px-4 py-3"><Input variant="outline" defaultValue="Value" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" defaultValue="Value" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled</td>
                <td className="px-4 py-3"><Input variant="outline" disabled placeholder="Disabled" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" disabled placeholder="Disabled" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Invalid</td>
                <td className="px-4 py-3"><Input variant="outline" aria-invalid="true" defaultValue="Invalid" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" aria-invalid="true" defaultValue="Invalid" className="max-w-xs" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
