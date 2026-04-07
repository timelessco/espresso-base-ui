"use client"

import { Spinner } from "@/components/ui/spinner"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function SpinnerPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <div className="flex items-center gap-4">
          <Spinner />
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="default" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>

      {/* With Track */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Track</SectionTitle>
        <div className="flex items-center gap-4">
          <Spinner size="sm" track />
          <Spinner size="default" track />
          <Spinner size="lg" track />
          <Spinner size="xl" track />
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Colors</SectionTitle>
        <div className="flex items-center gap-4">
          <Spinner size="xl" className="text-blue-500" />
          <Spinner size="xl" className="text-green-500" />
          <Spinner size="xl" className="text-amber-500" />
          <Spinner size="xl" className="text-red-500" />
        </div>
      </div>

      {/* Colors with Track */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Colors with Track</SectionTitle>
        <div className="flex items-center gap-4">
          <Spinner size="xl" track className="text-blue-500" />
          <Spinner size="xl" track className="text-green-500" />
          <Spinner size="xl" track className="text-amber-500" />
          <Spinner size="xl" track className="text-red-500" />
        </div>
      </div>

      {/* On Background */}
      <div className="flex flex-col gap-4">
        <SectionTitle>On Background</SectionTitle>
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary">
            <Spinner size="xl" className="text-primary-foreground" />
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-secondary">
            <Spinner size="xl" className="text-secondary-foreground" />
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-destructive">
            <Spinner size="xl" className="text-destructive-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}
