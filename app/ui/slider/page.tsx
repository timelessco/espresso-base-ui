"use client"

import { Slider } from "@/components/ui/slider"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function SliderPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Sizes */}
      <div className="flex max-w-sm flex-col gap-6">
        <SectionTitle>Sizes</SectionTitle>
        <Slider size="sm" defaultValue={[50]} />
        <Slider size="default" defaultValue={[50]} />
        <Slider size="lg" defaultValue={[50]} />
        <Slider size="xl" defaultValue={[50]} />
      </div>

      {/* Range */}
      <div className="flex max-w-sm flex-col gap-6">
        <SectionTitle>Range</SectionTitle>
        <Slider size="sm" defaultValue={[25, 75]} />
        <Slider size="default" defaultValue={[25, 75]} />
        <Slider size="lg" defaultValue={[25, 75]} />
        <Slider size="xl" defaultValue={[25, 75]} />
      </div>

      {/* Step */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Step (10)</SectionTitle>
        <Slider defaultValue={[50]} step={10} />
      </div>

      {/* Multiple Values */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Multiple Values</SectionTitle>
        <Slider defaultValue={[20, 50, 80]} />
      </div>

      {/* Disabled */}
      <div className="flex max-w-sm flex-col gap-6">
        <SectionTitle>Disabled</SectionTitle>
        <Slider size="sm" defaultValue={[50]} disabled />
        <Slider size="default" defaultValue={[50]} disabled />
        <Slider size="lg" defaultValue={[25, 75]} disabled />
        <Slider size="xl" defaultValue={[25, 75]} disabled />
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical</SectionTitle>
        <div className="flex h-40 items-center gap-8">
          <Slider size="sm" defaultValue={[50]} orientation="vertical" />
          <Slider size="default" defaultValue={[50]} orientation="vertical" />
          <Slider size="lg" defaultValue={[25, 75]} orientation="vertical" />
          <Slider size="xl" defaultValue={[25, 75]} orientation="vertical" />
          <Slider size="default" defaultValue={[50]} orientation="vertical" disabled />
        </div>
      </div>

      {/* All States */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All States</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">sm</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">default</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">lg</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">xl</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Default</td>
                <td className="px-4 py-3"><Slider size="sm" defaultValue={[50]} className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="default" defaultValue={[50]} className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="lg" defaultValue={[50]} className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="xl" defaultValue={[50]} className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Range</td>
                <td className="px-4 py-3"><Slider size="sm" defaultValue={[25, 75]} className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="default" defaultValue={[25, 75]} className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="lg" defaultValue={[25, 75]} className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="xl" defaultValue={[25, 75]} className="max-w-xs" /></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled</td>
                <td className="px-4 py-3"><Slider size="sm" defaultValue={[50]} disabled className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="default" defaultValue={[50]} disabled className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="lg" defaultValue={[50]} disabled className="max-w-xs" /></td>
                <td className="px-4 py-3"><Slider size="xl" defaultValue={[50]} disabled className="max-w-xs" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
