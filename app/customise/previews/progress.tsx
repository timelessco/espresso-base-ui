"use client"

import * as React from "react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function ProgressPreview() {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 800)
    return () => clearInterval(id)
  }, [])

  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Progress value={60} className="w-72" />
      </PreviewCard>

      <PreviewCard label="With Label">
        <Progress value={45} className="w-72">
          <ProgressLabel>Uploading</ProgressLabel>
        </Progress>
      </PreviewCard>

      <PreviewCard label="With Label and Value">
        <Progress value={72} className="w-72">
          <ProgressLabel>Downloading</ProgressLabel>
          <ProgressValue />
        </Progress>
      </PreviewCard>

      <PreviewCard label="Animated">
        <Progress value={value} className="w-72">
          <ProgressLabel>Processing</ProgressLabel>
          <ProgressValue />
        </Progress>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-72 flex-col gap-4">
          <Progress value={60} size="sm">
            <ProgressLabel>Small</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="default">
            <ProgressLabel>Default</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="lg">
            <ProgressLabel>Large</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="xl">
            <ProgressLabel>Extra Large</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>

      <PreviewCard label="Edge Style">
        <div className="flex w-72 flex-col gap-4">
          <Progress value={60} size="lg" edge="round-edge">
            <ProgressLabel>Round Edge</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="lg" edge="square-edge">
            <ProgressLabel>Square Edge</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>

      <PreviewCard label="Segmented — Square Edge">
        <div className="flex w-72 flex-col gap-4">
          <Progress value={60} type="segmented" edge="square-edge" size="sm">
            <ProgressLabel>Small</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" edge="square-edge">
            <ProgressLabel>Default</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" edge="square-edge" size="lg">
            <ProgressLabel>Large</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" edge="square-edge" size="xl">
            <ProgressLabel>Extra Large</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>

      <PreviewCard label="Segmented — Round Edge">
        <div className="flex w-72 flex-col gap-4">
          <Progress value={60} type="segmented" size="sm">
            <ProgressLabel>Small</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented">
            <ProgressLabel>Default</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" size="lg">
            <ProgressLabel>Large</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" size="xl">
            <ProgressLabel>Extra Large</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>

      <PreviewCard label="Values">
        <div className="flex w-72 flex-col gap-4">
          <Progress value={0}>
            <ProgressLabel>0%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={25}>
            <ProgressLabel>25%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={50}>
            <ProgressLabel>50%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={75}>
            <ProgressLabel>75%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={100}>
            <ProgressLabel>Complete</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
