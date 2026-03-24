"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function SwitchPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <div className="flex items-center gap-4">
          <Switch />
          <Switch defaultChecked />
        </div>
      </div>

      {/* Medium (md) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Medium (md)</SectionTitle>
        <div className="flex items-center gap-4">
          <Switch size="md" />
          <Switch size="md" defaultChecked />
        </div>
      </div>

      {/* Small (sm) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Small (sm)</SectionTitle>
        <div className="flex items-center gap-4">
          <Switch size="sm" />
          <Switch size="sm" defaultChecked />
        </div>
      </div>

      {/* With Label — default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (default)</SectionTitle>
        <div className="flex items-center gap-6">
          <Label size="md">
            <Switch />
            Label
          </Label>
          <Label size="md">
            <Switch defaultChecked />
            Label
          </Label>
        </div>
      </div>

      {/* With Label — md */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (md)</SectionTitle>
        <div className="flex items-center gap-6">
          <Label size="md">
            <Switch size="md" />
            Label
          </Label>
          <Label size="md">
            <Switch size="md" defaultChecked />
            Label
          </Label>
        </div>
      </div>

      {/* With Label — sm */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (sm)</SectionTitle>
        <div className="flex items-center gap-6">
          <Label size="sm">
            <Switch size="sm" />
            Label
          </Label>
          <Label size="sm">
            <Switch size="sm" defaultChecked />
            Label
          </Label>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <Label size="md">
              <Switch disabled />
              Label
            </Label>
            <Label size="md">
              <Switch disabled defaultChecked />
              Label
            </Label>
          </div>
          <div className="flex items-center gap-6">
            <Label size="md">
              <Switch size="md" disabled />
              Label
            </Label>
            <Label size="md">
              <Switch size="md" disabled defaultChecked />
              Label
            </Label>
          </div>
          <div className="flex items-center gap-6">
            <Label size="sm">
              <Switch size="sm" disabled />
              Label
            </Label>
            <Label size="sm">
              <Switch size="sm" disabled defaultChecked />
              Label
            </Label>
          </div>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">md</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">sm</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Off</td>
                <td className="px-4 py-3"><Switch /></td>
                <td className="px-4 py-3"><Switch size="md" /></td>
                <td className="px-4 py-3"><Switch size="sm" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">On</td>
                <td className="px-4 py-3"><Switch defaultChecked /></td>
                <td className="px-4 py-3"><Switch size="md" defaultChecked /></td>
                <td className="px-4 py-3"><Switch size="sm" defaultChecked /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Off</td>
                <td className="px-4 py-3"><Switch disabled /></td>
                <td className="px-4 py-3"><Switch size="md" disabled /></td>
                <td className="px-4 py-3"><Switch size="sm" disabled /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled On</td>
                <td className="px-4 py-3"><Switch disabled defaultChecked /></td>
                <td className="px-4 py-3"><Switch size="md" disabled defaultChecked /></td>
                <td className="px-4 py-3"><Switch size="sm" disabled defaultChecked /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
