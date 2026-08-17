"use client"

import * as React from "react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function ProgressPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Progress value={60} className="w-64" />
      </PreviewCard>

      <PreviewCard label="With label and value">
        <Progress value={72} className="w-64">
          <ProgressLabel>Downloading</ProgressLabel>
          <ProgressValue />
        </Progress>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-64 flex-col gap-4">
          <Progress value={60} size="sm" />
          <Progress value={60} size="default" />
          <Progress value={60} size="lg" />
          <Progress value={60} size="xl" />
        </div>
      </PreviewCard>

      <PreviewCard label="Edge style">
        <div className="flex w-64 flex-col gap-4">
          <Progress value={60} size="lg" edge="round-edge">
            <ProgressLabel>Round</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="lg" edge="square-edge">
            <ProgressLabel>Square</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>

      <PreviewCard label="Segmented">
        <div className="flex w-64 flex-col gap-4">
          <Progress value={60} type="segmented" size="lg">
            <ProgressLabel>Round</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress
            value={60}
            type="segmented"
            edge="square-edge"
            size="lg"
          >
            <ProgressLabel>Square</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>

      <PreviewCard label="Values">
        <div className="flex w-64 flex-col gap-4">
          <Progress value={25} className="w-64">
            <ProgressLabel>25%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={50} className="w-64">
            <ProgressLabel>50%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={100} className="w-64">
            <ProgressLabel>Complete</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
