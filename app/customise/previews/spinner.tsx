"use client"

import * as React from "react"

import { Spinner } from "@/components/ui/spinner"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function SpinnerPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Sizes">
        <Spinner size="sm" />
        <Spinner size="default" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </PreviewCard>

      <PreviewCard label="With track">
        <Spinner size="sm" track />
        <Spinner size="default" track />
        <Spinner size="lg" track />
        <Spinner size="xl" track />
      </PreviewCard>

      <PreviewCard label="Colors">
        <Spinner size="xl" className="text-blue-500" />
        <Spinner size="xl" className="text-green-500" />
        <Spinner size="xl" className="text-amber-500" />
        <Spinner size="xl" className="text-red-500" />
      </PreviewCard>

      <PreviewCard label="On background">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary">
          <Spinner size="xl" className="text-primary-foreground" />
        </div>
        <div className="flex size-12 items-center justify-center rounded-lg bg-secondary">
          <Spinner size="xl" className="text-secondary-foreground" />
        </div>
        <div className="flex size-12 items-center justify-center rounded-lg bg-destructive">
          <Spinner size="xl" className="text-destructive-foreground" />
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
