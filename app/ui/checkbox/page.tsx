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

      {/* Extra Small (xs) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Extra Small (xs)</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox size="xs" />
          <Checkbox size="xs" defaultChecked />
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
          <Checkbox size="xs" disabled />
          <Checkbox size="xs" disabled defaultChecked />
        </div>
      </div>

      {/* Indeterminate */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Indeterminate</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox indeterminate />
          <Checkbox size="sm" indeterminate />
          <Checkbox size="xs" indeterminate />
          <Checkbox indeterminate disabled />
          <Checkbox size="sm" indeterminate disabled />
          <Checkbox size="xs" indeterminate disabled />
        </div>
      </div>

      {/* Invalid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Invalid</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox data-invalid="true" />
          <Checkbox data-invalid="true" defaultChecked />
          <Checkbox size="sm" data-invalid="true" />
          <Checkbox size="sm" data-invalid="true" defaultChecked />
          <Checkbox size="xs" data-invalid="true" />
          <Checkbox size="xs" data-invalid="true" defaultChecked />
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
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">xs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Unchecked</td>
                <td className="px-4 py-3"><Checkbox /></td>
                <td className="px-4 py-3"><Checkbox size="sm" /></td>
                <td className="px-4 py-3"><Checkbox size="xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Checked</td>
                <td className="px-4 py-3"><Checkbox defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="sm" defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="xs" defaultChecked /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Indeterminate</td>
                <td className="px-4 py-3"><Checkbox indeterminate /></td>
                <td className="px-4 py-3"><Checkbox size="sm" indeterminate /></td>
                <td className="px-4 py-3"><Checkbox size="xs" indeterminate /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Indeterminate</td>
                <td className="px-4 py-3"><Checkbox indeterminate disabled /></td>
                <td className="px-4 py-3"><Checkbox size="sm" indeterminate disabled /></td>
                <td className="px-4 py-3"><Checkbox size="xs" indeterminate disabled /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Unchecked</td>
                <td className="px-4 py-3"><Checkbox disabled /></td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled /></td>
                <td className="px-4 py-3"><Checkbox size="xs" disabled /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Checked</td>
                <td className="px-4 py-3"><Checkbox disabled defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="xs" disabled defaultChecked /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Invalid Unchecked</td>
                <td className="px-4 py-3"><Checkbox data-invalid="true" /></td>
                <td className="px-4 py-3"><Checkbox size="sm" data-invalid="true" /></td>
                <td className="px-4 py-3"><Checkbox size="xs" data-invalid="true" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Invalid Checked</td>
                <td className="px-4 py-3"><Checkbox data-invalid="true" defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="sm" data-invalid="true" defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="xs" data-invalid="true" defaultChecked /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
