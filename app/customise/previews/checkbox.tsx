"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Sizes">
        <Checkbox size="xs" defaultChecked />
        <Checkbox size="sm" defaultChecked />
        <Checkbox size="default" defaultChecked />
      </PreviewCard>

      <PreviewCard label="Checked / Unchecked">
        <Checkbox defaultChecked />
        <Checkbox />
      </PreviewCard>

      <PreviewCard label="Indeterminate">
        <Checkbox indeterminate />
        <Checkbox size="sm" indeterminate />
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Checkbox disabled defaultChecked />
        <Checkbox disabled />
      </PreviewCard>

      <PreviewCard label="Invalid">
        <Checkbox data-invalid="true" defaultChecked />
        <Checkbox data-invalid="true" />
      </PreviewCard>

      <PreviewCard label="With label">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox defaultChecked />
          Accept terms
        </label>
      </PreviewCard>
    </PreviewGrid>
  )
}
