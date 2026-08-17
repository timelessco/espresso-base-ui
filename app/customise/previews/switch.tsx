"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Switch } from "@/components/ui/switch"

export default function SwitchPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Switch />
        <Switch defaultChecked />
      </PreviewCard>

      <PreviewCard label="Extra Small (xs)">
        <Switch size="xs" />
        <Switch size="xs" defaultChecked />
      </PreviewCard>

      <PreviewCard label="Small (sm)">
        <Switch size="sm" />
        <Switch size="sm" defaultChecked />
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Switch disabled />
        <Switch disabled defaultChecked />
        <Switch size="sm" disabled />
        <Switch size="sm" disabled defaultChecked />
        <Switch size="xs" disabled />
        <Switch size="xs" disabled defaultChecked />
      </PreviewCard>

      <PreviewCard label="Invalid">
        <Switch data-invalid="true" />
        <Switch data-invalid="true" defaultChecked />
        <Switch size="sm" data-invalid="true" />
        <Switch size="sm" data-invalid="true" defaultChecked />
        <Switch size="xs" data-invalid="true" />
        <Switch size="xs" data-invalid="true" defaultChecked />
      </PreviewCard>
    </PreviewGrid>
  )
}
