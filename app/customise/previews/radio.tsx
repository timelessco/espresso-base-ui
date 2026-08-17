"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem value="option-1" />
            <RadioGroupItem value="option-2" />
          </div>
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Extra Small (xs)">
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem size="xs" value="option-1" />
            <RadioGroupItem size="xs" value="option-2" />
          </div>
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Small (sm)">
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-4">
            <RadioGroupItem size="sm" value="option-1" />
            <RadioGroupItem size="sm" value="option-2" />
          </div>
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Disabled">
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
        <RadioGroup defaultValue="dis-6" disabled className="w-auto">
          <div className="flex items-center gap-4">
            <RadioGroupItem size="xs" value="dis-5" />
            <RadioGroupItem size="xs" value="dis-6" />
          </div>
        </RadioGroup>
      </PreviewCard>

      <PreviewCard label="Invalid">
        <RadioGroup value="" className="w-auto">
          <RadioGroupItem data-invalid="true" value="inv-1" />
        </RadioGroup>
        <RadioGroup value="inv-2" className="w-auto">
          <RadioGroupItem data-invalid="true" value="inv-2" />
        </RadioGroup>
        <RadioGroup value="" className="w-auto">
          <RadioGroupItem size="sm" data-invalid="true" value="inv-3" />
        </RadioGroup>
        <RadioGroup value="inv-4" className="w-auto">
          <RadioGroupItem size="sm" data-invalid="true" value="inv-4" />
        </RadioGroup>
        <RadioGroup value="" className="w-auto">
          <RadioGroupItem size="xs" data-invalid="true" value="inv-5" />
        </RadioGroup>
        <RadioGroup value="inv-6" className="w-auto">
          <RadioGroupItem size="xs" data-invalid="true" value="inv-6" />
        </RadioGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
