"use client"

import { Checkbox } from "@/components/ui/checkbox"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function CheckboxPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox />
          <Checkbox defaultChecked />
        </div>
      </div>

      {/* Small (sm) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Small (sm)</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox size="sm" />
          <Checkbox size="sm" defaultChecked />
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
          <Checkbox size="sm" disabled />
          <Checkbox size="sm" disabled defaultChecked />
        </div>
      </div>

      {/* All States */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All States</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">default</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">sm</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Unchecked</td>
                <td className="px-4 py-3"><Checkbox /></td>
                <td className="px-4 py-3"><Checkbox size="sm" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Checked</td>
                <td className="px-4 py-3"><Checkbox defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="sm" defaultChecked /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Unchecked</td>
                <td className="px-4 py-3"><Checkbox disabled /></td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Checked</td>
                <td className="px-4 py-3"><Checkbox disabled defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled defaultChecked /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
