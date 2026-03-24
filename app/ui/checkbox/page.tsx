"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function CheckboxPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default (sm) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default (sm)</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox size="sm" />
          <Checkbox size="sm" defaultChecked />
        </div>
      </div>

      {/* Medium (md) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Medium (md)</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox size="md" />
          <Checkbox size="md" defaultChecked />
        </div>
      </div>

      {/* With Label — sm */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (sm)</SectionTitle>
        <div className="flex items-center gap-6">
          <Label size="sm">
            <Checkbox size="sm" />
            Label
          </Label>
          <Label size="sm">
            <Checkbox size="sm" defaultChecked />
            Label
          </Label>
          <Label size="sm">
            <Checkbox size="sm" indeterminate />
            Label
          </Label>
        </div>
      </div>

      {/* With Label — md */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (md)</SectionTitle>
        <div className="flex items-center gap-6">
          <Label size="md">
            <Checkbox size="md" />
            Label
          </Label>
          <Label size="md">
            <Checkbox size="md" defaultChecked />
            Label
          </Label>
          <Label size="md">
            <Checkbox size="md" indeterminate />
            Label
          </Label>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <Label size="sm">
              <Checkbox size="sm" disabled />
              Label
            </Label>
            <Label size="sm">
              <Checkbox size="sm" disabled defaultChecked />
              Label
            </Label>
          </div>
          <div className="flex items-center gap-6">
            <Label size="md">
              <Checkbox size="md" disabled />
              Label
            </Label>
            <Label size="md">
              <Checkbox size="md" disabled defaultChecked />
              Label
            </Label>
          </div>
        </div>
      </div>

      {/* Indeterminate */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Indeterminate</SectionTitle>
        <div className="flex items-center gap-4">
          <Checkbox size="sm" indeterminate />
          <Checkbox size="md" indeterminate />
        </div>
      </div>

      {/* Indeterminate with Label */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Indeterminate with Label</SectionTitle>
        <div className="flex flex-col gap-3">
          <Label size="sm">
            <Checkbox size="sm" indeterminate />
            Select all (sm)
          </Label>
          <Label size="md">
            <Checkbox size="md" indeterminate />
            Select all (md)
          </Label>
        </div>
      </div>

      {/* Multiple Options */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple Options</SectionTitle>
        <div className="flex flex-col gap-3">
          <Label size="sm">
            <Checkbox size="sm" defaultChecked />
            Notifications
          </Label>
          <Label size="sm">
            <Checkbox size="sm" />
            Email updates
          </Label>
          <Label size="sm">
            <Checkbox size="sm" defaultChecked />
            SMS alerts
          </Label>
          <Label size="sm">
            <Checkbox size="sm" />
            Push notifications
          </Label>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">sm</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">md</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Unchecked</td>
                <td className="px-4 py-3"><Checkbox size="sm" /></td>
                <td className="px-4 py-3"><Checkbox size="md" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Checked</td>
                <td className="px-4 py-3"><Checkbox size="sm" defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="md" defaultChecked /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Indeterminate</td>
                <td className="px-4 py-3"><Checkbox size="sm" indeterminate /></td>
                <td className="px-4 py-3"><Checkbox size="md" indeterminate /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Indeterminate</td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled indeterminate /></td>
                <td className="px-4 py-3"><Checkbox size="md" disabled indeterminate /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Unchecked</td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled /></td>
                <td className="px-4 py-3"><Checkbox size="md" disabled /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Checked</td>
                <td className="px-4 py-3"><Checkbox size="sm" disabled defaultChecked /></td>
                <td className="px-4 py-3"><Checkbox size="md" disabled defaultChecked /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
