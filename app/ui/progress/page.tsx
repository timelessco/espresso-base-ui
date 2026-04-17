"use client"

import { useEffect, useState } from "react"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function ProgressPage() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Progress value={60} className="w-80" />
      </div>

      {/* With Label */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label</SectionTitle>
        <Progress value={45} className="w-80">
          <ProgressLabel>Uploading</ProgressLabel>
        </Progress>
      </div>

      {/* With Label and Value */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Label and Value</SectionTitle>
        <Progress value={72} className="w-80">
          <ProgressLabel>Downloading</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>

      {/* Animated */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Animated</SectionTitle>
        <Progress value={value} className="w-80">
          <ProgressLabel>Processing</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-col gap-4">
          <Progress value={60} size="sm" className="w-80">
            <ProgressLabel>Small</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="default" className="w-80">
            <ProgressLabel>Default</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="lg" className="w-80">
            <ProgressLabel>Large</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="xl" className="w-80">
            <ProgressLabel>Extra Large</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </div>

      {/* Edge Style */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Edge Style</SectionTitle>
        <div className="flex flex-col gap-4">
          <Progress value={60} size="lg" edge="round-edge" className="w-80">
            <ProgressLabel>Round Edge</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} size="lg" edge="square-edge" className="w-80">
            <ProgressLabel>Square Edge</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </div>

      {/* Segmented — Square Edge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Segmented — Square Edge</SectionTitle>
        <div className="flex flex-col gap-4">
          <Progress
            value={60}
            type="segmented"
            edge="square-edge"
            size="sm"
            className="w-80"
          >
            <ProgressLabel>Small</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress
            value={60}
            type="segmented"
            edge="square-edge"
            className="w-80"
          >
            <ProgressLabel>Default</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress
            value={60}
            type="segmented"
            edge="square-edge"
            size="lg"
            className="w-80"
          >
            <ProgressLabel>Large</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress
            value={60}
            type="segmented"
            edge="square-edge"
            size="xl"
            className="w-80"
          >
            <ProgressLabel>Extra Large</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </div>

      {/* Segmented — Round Edge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Segmented — Round Edge</SectionTitle>
        <div className="flex flex-col gap-4">
          <Progress value={60} type="segmented" size="sm" className="w-80">
            <ProgressLabel>Small</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" className="w-80">
            <ProgressLabel>Default</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" size="lg" className="w-80">
            <ProgressLabel>Large</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={60} type="segmented" size="xl" className="w-80">
            <ProgressLabel>Extra Large</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </div>

      {/* Values */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Values</SectionTitle>
        <div className="flex flex-col gap-4">
          <Progress value={0} className="w-80">
            <ProgressLabel>0%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={25} className="w-80">
            <ProgressLabel>25%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={50} className="w-80">
            <ProgressLabel>50%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={75} className="w-80">
            <ProgressLabel>75%</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={100} className="w-80">
            <ProgressLabel>Complete</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </div>

    </div>
  )
}
