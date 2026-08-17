"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Checkbox />
        <Checkbox defaultChecked />
      </PreviewCard>

      <PreviewCard label="Extra Small (xs)">
        <Checkbox size="xs" />
        <Checkbox size="xs" defaultChecked />
      </PreviewCard>

      <PreviewCard label="Small (sm)">
        <Checkbox size="sm" />
        <Checkbox size="sm" defaultChecked />
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Checkbox disabled />
        <Checkbox disabled defaultChecked />
        <Checkbox size="sm" disabled />
        <Checkbox size="sm" disabled defaultChecked />
        <Checkbox size="xs" disabled />
        <Checkbox size="xs" disabled defaultChecked />
      </PreviewCard>

      <PreviewCard label="Indeterminate">
        <Checkbox indeterminate />
        <Checkbox size="sm" indeterminate />
        <Checkbox size="xs" indeterminate />
        <Checkbox indeterminate disabled />
        <Checkbox size="sm" indeterminate disabled />
        <Checkbox size="xs" indeterminate disabled />
      </PreviewCard>

      <PreviewCard label="Invalid">
        <Checkbox data-invalid="true" />
        <Checkbox data-invalid="true" defaultChecked />
        <Checkbox size="sm" data-invalid="true" />
        <Checkbox size="sm" data-invalid="true" defaultChecked />
        <Checkbox size="xs" data-invalid="true" />
        <Checkbox size="xs" data-invalid="true" defaultChecked />
      </PreviewCard>
    </PreviewGrid>
  )
}
