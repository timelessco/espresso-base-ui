"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Switch } from "@/components/ui/switch"

export default function SwitchPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Sizes">
        <Switch size="xs" defaultChecked />
        <Switch size="sm" defaultChecked />
        <Switch size="default" defaultChecked />
      </PreviewCard>

      <PreviewCard label="On / Off">
        <Switch defaultChecked />
        <Switch />
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Switch disabled defaultChecked />
        <Switch disabled />
      </PreviewCard>

      <PreviewCard label="Invalid">
        <Switch data-invalid="true" defaultChecked />
        <Switch data-invalid="true" />
      </PreviewCard>

      <PreviewCard label="With label">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch defaultChecked />
          Notifications
        </label>
      </PreviewCard>
    </PreviewGrid>
  )
}
