"use client"

import { Input } from "@/components/ui/input"
import { Field, FieldError } from "@/components/ui/field"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function InputPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Outline — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — Sizes</SectionTitle>
        <Input variant="outline" size="xs" placeholder="Extra Small (xs)" />
        <Input variant="outline" size="sm" placeholder="Small (sm)" />
        <Input variant="outline" size="md" placeholder="Medium (md)" />
        <Input variant="outline" size="lg" placeholder="Large (lg)" />
      </div>

      {/* Subtle — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — Sizes</SectionTitle>
        <Input variant="subtle" size="xs" placeholder="Extra Small (xs)" />
        <Input variant="subtle" size="sm" placeholder="Small (sm)" />
        <Input variant="subtle" size="md" placeholder="Medium (md)" />
        <Input variant="subtle" size="lg" placeholder="Large (lg)" />
      </div>

      {/* Ghost — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Ghost — Sizes</SectionTitle>
        <Input variant="ghost" size="xs" placeholder="Extra Small (xs)" />
        <Input variant="ghost" size="sm" placeholder="Small (sm)" />
        <Input variant="ghost" size="md" placeholder="Medium (md)" />
        <Input variant="ghost" size="lg" placeholder="Large (lg)" />
      </div>

      {/* Outline — States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — States</SectionTitle>
        <Input variant="outline" placeholder="Default" />
        <Input variant="outline" defaultValue="With value" />
        <Input variant="outline" disabled placeholder="Disabled" />
        <Input variant="outline" disabled defaultValue="Disabled with value" />
      </div>

      {/* Subtle — States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — States</SectionTitle>
        <Input variant="subtle" placeholder="Default" />
        <Input variant="subtle" defaultValue="With value" />
        <Input variant="subtle" disabled placeholder="Disabled" />
        <Input variant="subtle" disabled defaultValue="Disabled with value" />
      </div>

      {/* Ghost — States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Ghost — States</SectionTitle>
        <Input variant="ghost" placeholder="Default" />
        <Input variant="ghost" defaultValue="With value" />
        <Input variant="ghost" disabled placeholder="Disabled" />
        <Input variant="ghost" disabled defaultValue="Disabled with value" />
      </div>

      {/* Outline — Data States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — Data States</SectionTitle>
        <Input variant="outline" data-valid="true" defaultValue="Valid" />
        <Input variant="outline" data-invalid="true" defaultValue="Invalid" />
        <Input variant="outline" data-filled="true" defaultValue="Filled" />
      </div>

      {/* Subtle — Data States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — Data States</SectionTitle>
        <Input variant="subtle" data-valid="true" defaultValue="Valid" />
        <Input variant="subtle" data-invalid="true" defaultValue="Invalid" />
        <Input variant="subtle" data-filled="true" defaultValue="Filled" />
      </div>

      {/* Ghost — Data States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Ghost — Data States</SectionTitle>
        <Input variant="ghost" data-valid="true" defaultValue="Valid" />
        <Input variant="ghost" data-invalid="true" defaultValue="Invalid" />
        <Input variant="ghost" data-filled="true" defaultValue="Filled" />
      </div>

      {/* Invalid via Field */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Invalid via Field</SectionTitle>
        <Field data-invalid="true">
          <Input variant="outline" defaultValue="Outline invalid" />
          <FieldError>This field is required.</FieldError>
        </Field>
        <Field data-invalid="true">
          <Input variant="subtle" defaultValue="Subtle invalid" />
          <FieldError>This field is required.</FieldError>
        </Field>
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
                <td className="px-4 py-3 text-xs text-muted-foreground">Valid</td>
                <td className="px-4 py-3"><Input variant="outline" data-valid="true" defaultValue="Valid" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" data-valid="true" defaultValue="Valid" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Invalid</td>
                <td className="px-4 py-3"><Input variant="outline" data-invalid="true" defaultValue="Invalid" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" data-invalid="true" defaultValue="Invalid" className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Filled</td>
                <td className="px-4 py-3"><Input variant="outline" data-filled="true" defaultValue="Filled" className="max-w-xs" /></td>
                <td className="px-4 py-3"><Input variant="subtle" data-filled="true" defaultValue="Filled" className="max-w-xs" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
