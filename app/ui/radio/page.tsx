"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function RadioPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem value="option-1" />
            <RadioGroupItem value="option-2" />
          </div>
        </RadioGroup>
      </div>

      {/* Small (sm) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Small (sm)</SectionTitle>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem size="sm" value="option-1" />
            <RadioGroupItem size="sm" value="option-2" />
          </div>
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex items-center gap-4">
          <RadioGroup defaultValue="dis-2" disabled className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem value="dis-1" />
              <RadioGroupItem value="dis-2" />
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="dis-4" disabled className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem size="sm" value="dis-3" />
              <RadioGroupItem size="sm" value="dis-4" />
            </div>
          </RadioGroup>
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
                <td className="px-4 py-3">
                  <RadioGroup value="">
                    <RadioGroupItem value="unchecked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="">
                    <RadioGroupItem size="sm" value="unchecked" />
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Checked</td>
                <td className="px-4 py-3">
                  <RadioGroup value="checked">
                    <RadioGroupItem value="checked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="checked">
                    <RadioGroupItem size="sm" value="checked" />
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Unchecked</td>
                <td className="px-4 py-3">
                  <RadioGroup value="" disabled>
                    <RadioGroupItem value="dis-unchecked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="" disabled>
                    <RadioGroupItem size="sm" value="dis-unchecked" />
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Checked</td>
                <td className="px-4 py-3">
                  <RadioGroup value="dis-checked" disabled>
                    <RadioGroupItem value="dis-checked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="dis-checked" disabled>
                    <RadioGroupItem size="sm" value="dis-checked" />
                  </RadioGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
