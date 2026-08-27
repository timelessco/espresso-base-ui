"use client"

import { Spinner } from "@/components/ui/spinner"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PropsTable,
} from "../../_components/doc"

export default function SpinnerDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Spinner"
        description="An animated loading indicator with a conic-gradient arc. Inherits the current text color and comes in four sizes."
      />

      <DocSection title="Preview">
        <DocProse>
          Drop it anywhere loading state needs to be shown – inside buttons,
          empty states or full-page loaders. The default size is{" "}
          <code>size-3.5</code> (14px).
        </DocProse>
        <DocExample
          code={`
<Spinner />`}
        >
          <Spinner />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="spinner" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Spinner } from "@/components/ui/spinner"`}
        />
        <CodeBlock
          code={`
<Button disabled>
  <Spinner />
  Saving...
</Button>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> steps through <code>sm</code> (12px),{" "}
          <code>default</code> (14px), <code>lg</code> (16px) and{" "}
          <code>xl</code> (20px).
        </DocProse>
        <DocExample
          code={`
<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        >
          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="default" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Track">
        <DocProse>
          <code>track</code> renders a static ring behind the arc at 25% opacity
          – useful on busy surfaces where the spinning arc alone is hard to
          follow.
        </DocProse>
        <DocExample
          code={`
<Spinner size="sm" track />
<Spinner size="default" track />
<Spinner size="lg" track />
<Spinner size="xl" track />`}
        >
          <div className="flex items-center gap-4">
            <Spinner size="sm" track />
            <Spinner size="default" track />
            <Spinner size="lg" track />
            <Spinner size="xl" track />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Colors">
        <DocProse>
          Both the arc and the track are drawn with <code>currentColor</code>,
          so any text color utility recolors the spinner – including the track,
          which stays at 25% opacity of the same hue.
        </DocProse>
        <DocExample
          code={`
<Spinner size="xl" className="text-blue-500" />
<Spinner size="xl" className="text-green-500" />
<Spinner size="xl" track className="text-amber-500" />
<Spinner size="xl" track className="text-red-500" />

<div className="flex size-12 items-center justify-center rounded-lg bg-primary">
  <Spinner size="xl" className="text-primary-foreground" />
</div>`}
        >
          <div className="flex items-center gap-4">
            <Spinner size="xl" className="text-blue-500" />
            <Spinner size="xl" className="text-green-500" />
            <Spinner size="xl" track className="text-amber-500" />
            <Spinner size="xl" track className="text-red-500" />
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary">
              <Spinner size="xl" className="text-primary-foreground" />
            </div>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Spinner</code> renders a single <code>svg</code> element and
          accepts every standard SVG prop alongside the ones below.
        </DocProse>
        <PropsTable
          title="Spinner"
          rows={[
            {
              prop: "size",
              type: '"sm" | "default" | "lg" | "xl"',
              defaultValue: '"default"',
              description:
                "Rendered size: sm is size-3 (12px), default size-3.5 (14px), lg size-4 (16px), xl size-5 (20px).",
            },
            {
              prop: "track",
              type: "boolean",
              defaultValue: "false",
              description:
                "Draws a static background ring behind the arc at 25% stroke opacity in the current color.",
            },
            {
              prop: "className",
              type: "string",
              defaultValue: "–",
              description:
                "Merged onto the svg – use text color utilities to tint, or a size utility to override the size variant.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The svg renders <code>role="status"</code> with{" "}
          <code>aria-label="Loading"</code>, so assistive tech announces it as a
          live status; pass your own <code>aria-label</code> for more specific
          copy. It also exposes <code>data-slot="spinner"</code> for CSS
          targeting, and the <code>spinnerVariants</code> cva helper is exported
          for reusing the size classes on custom indicators.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
