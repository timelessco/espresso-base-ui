"use client"

import { Spacer } from "@/components/ui/spacer"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function Block({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-primary px-3 py-1.5 text-xs text-primary">
      {label}
    </div>
  )
}

export default function SpacerPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Vertical sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Vertical — Sizes</SectionTitle>
        <div className="flex flex-col rounded-lg border border-border p-4">
          <Block label="above sm" />
          <Spacer size="sm" />
          <Block label="below sm" />
          <div className="h-6" />
          <Block label="above md" />
          <Spacer size="md" />
          <Block label="below md" />
          <div className="h-6" />
          <Block label="above lg" />
          <Spacer size="lg" />
          <Block label="below lg" />
          <div className="h-6" />
          <Block label="above xl" />
          <Spacer size="xl" />
          <Block label="below xl" />
          <div className="h-6" />
          <Block label="above 2xl" />
          <Spacer size="2xl" />
          <Block label="below 2xl" />
          <div className="h-6" />
          <Block label="above 3xl" />
          <Spacer size="3xl" />
          <Block label="below 3xl" />
          <div className="h-6" />
          <Block label="above 4xl" />
          <Spacer size="4xl" />
          <Block label="below 4xl" />
        </div>
      </div>

      {/* Horizontal sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Horizontal — Sizes</SectionTitle>
        <div className="flex flex-col gap-6 rounded-lg border border-border p-4">
          <div className="flex items-center">
            <Block label="left sm" />
            <Spacer orientation="horizontal" size="sm" />
            <Block label="right sm" />
          </div>
          <div className="flex items-center">
            <Block label="left md" />
            <Spacer orientation="horizontal" size="md" />
            <Block label="right md" />
          </div>
          <div className="flex items-center">
            <Block label="left lg" />
            <Spacer orientation="horizontal" size="lg" />
            <Block label="right lg" />
          </div>
          <div className="flex items-center">
            <Block label="left xl" />
            <Spacer orientation="horizontal" size="xl" />
            <Block label="right xl" />
          </div>
          <div className="flex items-center">
            <Block label="left 2xl" />
            <Spacer orientation="horizontal" size="2xl" />
            <Block label="right 2xl" />
          </div>
          <div className="flex items-center">
            <Block label="left 3xl" />
            <Spacer orientation="horizontal" size="3xl" />
            <Block label="right 3xl" />
          </div>
          <div className="flex items-center">
            <Block label="left 4xl" />
            <Spacer orientation="horizontal" size="4xl" />
            <Block label="right 4xl" />
          </div>
        </div>
      </div>

      {/* Mixed layout */}
      <div className="flex flex-col gap-4">
        <SectionTitle>In a Layout</SectionTitle>
        <div className="flex flex-col rounded-lg border border-border p-4">
          <Block label="Header" />
          <Spacer size="2xl" />
          <Block label="Hero" />
          <Spacer size="xl" />
          <div className="flex items-center">
            <Block label="Card 1" />
            <Spacer orientation="horizontal" size="lg" />
            <Block label="Card 2" />
            <Spacer orientation="horizontal" size="lg" />
            <Block label="Card 3" />
          </div>
          <Spacer size="2xl" />
          <Block label="Footer" />
        </div>
      </div>
    </div>
  )
}
