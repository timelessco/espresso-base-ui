"use client"

import { Textarea } from "@/components/ui/textarea"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function TextareaPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Outline — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — Sizes</SectionTitle>
        <Textarea variant="outline" size="sm" placeholder="Small (sm)" />
        <Textarea variant="outline" size="default" placeholder="Default" />
        <Textarea variant="outline" size="lg" placeholder="Large (lg)" />
      </div>

      {/* Subtle — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — Sizes</SectionTitle>
        <Textarea variant="subtle" size="sm" placeholder="Small (sm)" />
        <Textarea variant="subtle" size="default" placeholder="Default" />
        <Textarea variant="subtle" size="lg" placeholder="Large (lg)" />
      </div>

      {/* Ghost — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Ghost — Sizes</SectionTitle>
        <Textarea variant="ghost" size="sm" placeholder="Small (sm)" />
        <Textarea variant="ghost" size="default" placeholder="Default" />
        <Textarea variant="ghost" size="lg" placeholder="Large (lg)" />
      </div>

      {/* Disabled */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <Textarea variant="outline" disabled placeholder="Outline disabled" />
        <Textarea variant="subtle" disabled placeholder="Subtle disabled" />
        <Textarea variant="ghost" disabled placeholder="Ghost disabled" />
      </div>

      {/* With Value */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>With Value</SectionTitle>
        <Textarea variant="outline" defaultValue="Outline with content that spans multiple lines to show how the component handles text." />
        <Textarea variant="subtle" defaultValue="Subtle with content that spans multiple lines to show how the component handles text." />
        <Textarea variant="ghost" defaultValue="Ghost with content that spans multiple lines to show how the component handles text." />
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
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Ghost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Default</td>
                <td className="px-4 py-3"><Textarea variant="outline" placeholder="Default" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Textarea variant="subtle" placeholder="Default" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Textarea variant="ghost" placeholder="Default" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">With Value</td>
                <td className="px-4 py-3"><Textarea variant="outline" defaultValue="Value" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Textarea variant="subtle" defaultValue="Value" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Textarea variant="ghost" defaultValue="Value" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled</td>
                <td className="px-4 py-3"><Textarea variant="outline" disabled placeholder="Disabled" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Textarea variant="subtle" disabled placeholder="Disabled" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Textarea variant="ghost" disabled placeholder="Disabled" className="max-w-xs" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
