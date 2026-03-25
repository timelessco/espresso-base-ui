"use client"

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function RadioPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default (sm) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default (sm)</SectionTitle>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem size="sm" value="option-1" />
            <RadioGroupItem size="sm" value="option-2" />
          </div>
        </RadioGroup>
      </div>

      {/* Medium (md) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Medium (md)</SectionTitle>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem size="md" value="option-1" />
            <RadioGroupItem size="md" value="option-2" />
          </div>
        </RadioGroup>
      </div>

      {/* With Label — sm */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (sm)</SectionTitle>
        <RadioGroup defaultValue="sm-1">
          <div className="flex items-center gap-6">
            <Label size="sm">
              <RadioGroupItem size="sm" value="sm-1" />
              Option one
            </Label>
            <Label size="sm">
              <RadioGroupItem size="sm" value="sm-2" />
              Option two
            </Label>
            <Label size="sm">
              <RadioGroupItem size="sm" value="sm-3" />
              Option three
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* With Label — md */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label (md)</SectionTitle>
        <RadioGroup defaultValue="md-1">
          <div className="flex items-center gap-6">
            <Label size="md">
              <RadioGroupItem size="md" value="md-1" />
              Option one
            </Label>
            <Label size="md">
              <RadioGroupItem size="md" value="md-2" />
              Option two
            </Label>
            <Label size="md">
              <RadioGroupItem size="md" value="md-3" />
              Option three
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <RadioGroup defaultValue="dis-2" disabled>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-6">
              <Label size="sm">
                <RadioGroupItem size="sm" value="dis-1" />
                Label
              </Label>
              <Label size="sm">
                <RadioGroupItem size="sm" value="dis-2" />
                Label
              </Label>
            </div>
            <div className="flex items-center gap-6">
              <Label size="md">
                <RadioGroupItem size="md" value="dis-3" />
                Label
              </Label>
              <Label size="md">
                <RadioGroupItem size="md" value="dis-4" />
                Label
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Vertical Group */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical Group</SectionTitle>
        <RadioGroup defaultValue="notifications">
          <div className="flex flex-col gap-3">
            <Label size="sm">
              <RadioGroupItem size="sm" value="notifications" />
              Notifications
            </Label>
            <Label size="sm">
              <RadioGroupItem size="sm" value="email" />
              Email updates
            </Label>
            <Label size="sm">
              <RadioGroupItem size="sm" value="sms" />
              SMS alerts
            </Label>
            <Label size="sm">
              <RadioGroupItem size="sm" value="push" />
              Push notifications
            </Label>
          </div>
        </RadioGroup>
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
                <td className="px-4 py-3">
                  <RadioGroup value="">
                    <RadioGroupItem size="sm" value="unchecked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="">
                    <RadioGroupItem size="md" value="unchecked" />
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Checked</td>
                <td className="px-4 py-3">
                  <RadioGroup value="checked">
                    <RadioGroupItem size="sm" value="checked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="checked">
                    <RadioGroupItem size="md" value="checked" />
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Unchecked</td>
                <td className="px-4 py-3">
                  <RadioGroup value="" disabled>
                    <RadioGroupItem size="sm" value="dis-unchecked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="" disabled>
                    <RadioGroupItem size="md" value="dis-unchecked" />
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled Checked</td>
                <td className="px-4 py-3">
                  <RadioGroup value="dis-checked" disabled>
                    <RadioGroupItem size="sm" value="dis-checked" />
                  </RadioGroup>
                </td>
                <td className="px-4 py-3">
                  <RadioGroup value="dis-checked" disabled>
                    <RadioGroupItem size="md" value="dis-checked" />
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
