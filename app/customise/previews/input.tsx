"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Input } from "@/components/ui/input"
import { Field, FieldError } from "@/components/ui/field"

export default function InputPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input variant="outline" placeholder="Outline" />
          <Input variant="subtle" placeholder="Subtle" />
          <Input variant="ghost" placeholder="Ghost" />
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input size="xs" placeholder="Extra Small (xs)" />
          <Input size="sm" placeholder="Small (sm)" />
          <Input size="md" placeholder="Medium (md)" />
          <Input size="lg" placeholder="Large (lg)" />
        </div>
      </PreviewCard>

      <PreviewCard label="States">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input placeholder="Default" />
          <Input defaultValue="With value" />
          <Input data-valid="true" defaultValue="Valid" />
          <Input data-invalid="true" defaultValue="Invalid" />
        </div>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input disabled placeholder="Disabled" />
          <Input disabled defaultValue="Disabled with value" />
        </div>
      </PreviewCard>

      <PreviewCard label="Invalid via Field">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Field data-invalid="true">
            <Input variant="outline" defaultValue="Outline invalid" />
            <FieldError>This field is required.</FieldError>
          </Field>
          <Field data-invalid="true">
            <Input variant="subtle" defaultValue="Subtle invalid" />
            <FieldError>This field is required.</FieldError>
          </Field>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
