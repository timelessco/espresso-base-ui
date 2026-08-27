"use client"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

export default function ProgressDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Progress"
        description="Displays completion progress as a bar, built on Base UI. Four sizes, a segmented type, and optional label and value parts."
      />

      <DocSection title="Preview">
        <DocProse>
          <code>Progress</code> renders the bar automatically – pass{" "}
          <code>ProgressLabel</code> and <code>ProgressValue</code> as children
          to add the caption row. <code>ProgressValue</code> shows the current
          percentage.
        </DocProse>
        <DocExample
          code={`
<Progress value={72} className="w-80">
  <ProgressLabel>Downloading</ProgressLabel>
  <ProgressValue />
</Progress>`}
        >
          <Progress value={72} className="w-80">
            <ProgressLabel>Downloading</ProgressLabel>
            <ProgressValue />
          </Progress>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="progress" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressSegments,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"`}
        />
        <CodeBlock code={`<Progress value={60} className="w-80" />`} />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> controls the bar height: <code>sm</code> (2px),{" "}
          <code>default</code> (4px), <code>lg</code> (8px) and <code>xl</code>{" "}
          (12px).
        </DocProse>
        <DocExample
          code={`
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
</Progress>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-4">
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
        </DocExample>
      </DocSection>

      <DocSection title="Edge style">
        <DocProse>
          <code>edge</code> switches the indicator between{" "}
          <code>round-edge</code> (fully rounded) and <code>square-edge</code>{" "}
          (square leading edge); the track itself stays pill-shaped.
        </DocProse>
        <DocExample
          code={`
<Progress value={60} size="lg" edge="round-edge" className="w-80">
  <ProgressLabel>Round Edge</ProgressLabel>
  <ProgressValue />
</Progress>
<Progress value={60} size="lg" edge="square-edge" className="w-80">
  <ProgressLabel>Square Edge</ProgressLabel>
  <ProgressValue />
</Progress>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-4">
            <Progress value={60} size="lg" edge="round-edge">
              <ProgressLabel>Round Edge</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={60} size="lg" edge="square-edge">
              <ProgressLabel>Square Edge</ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Segmented">
        <DocProse>
          <code>type="segmented"</code> replaces the continuous track with five
          equal segments; the filled count is rounded from the current
          percentage. It combines with <code>size</code> and <code>edge</code> –
          square-edge segments keep rounded outer corners.
        </DocProse>
        <DocExample
          code={`
<Progress value={60} type="segmented" className="w-80">
  <ProgressLabel>Default</ProgressLabel>
  <ProgressValue />
</Progress>
<Progress value={60} type="segmented" edge="square-edge" size="lg" className="w-80">
  <ProgressLabel>Large</ProgressLabel>
  <ProgressValue />
</Progress>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-4">
            <Progress value={60} type="segmented">
              <ProgressLabel>Default</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={60} type="segmented" edge="square-edge" size="lg">
              <ProgressLabel>Large</ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Progress</code> accepts all Base UI progress root props plus the
          variant props below. Children render before the bar in a flex-wrap
          row, so a label/value pair forms a caption line above the full-width
          track. The track, indicator and segment parts are exported for fully
          custom composition but are rendered automatically by the root.
        </DocProse>
        <PropsTable
          title="Progress"
          rows={[
            {
              prop: "value",
              type: "number | null",
              description:
                "Current value. Pass null for an indeterminate progress bar.",
            },
            {
              prop: "min",
              type: "number",
              defaultValue: "0",
              description: "Minimum of the range.",
            },
            {
              prop: "max",
              type: "number",
              defaultValue: "100",
              description: "Maximum of the range.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg" | "xl"',
              defaultValue: '"default"',
              description: "Bar height: 2px, 4px, 8px or 12px.",
            },
            {
              prop: "edge",
              type: '"round-edge" | "square-edge"',
              defaultValue: '"round-edge"',
              description:
                "Indicator (and segment) corner style – rounded or square.",
            },
            {
              prop: "type",
              type: '"default" | "segmented"',
              defaultValue: '"default"',
              description:
                "Continuous track with indicator, or five discrete segments.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "ProgressLabel",
              description:
                'Caption text (data-slot="progress-label"), announced as the bar’s accessible label by Base UI.',
            },
            {
              part: "ProgressValue",
              description:
                'Formatted current value (data-slot="progress-value"), pushed to the trailing edge with ml-auto.',
            },
            {
              part: "ProgressTrack",
              description:
                'Full-width background rail (data-slot="progress-track"). Height follows the root size via group data attributes.',
            },
            {
              part: "ProgressIndicator",
              description:
                'Filled portion of the track (data-slot="progress-indicator"), width managed by Base UI with a transition.',
            },
            {
              part: "ProgressSegments",
              description:
                'Five-segment bar (data-slot="progress-segments"); each segment (data-slot="progress-segment") sets data-filled when active.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI renders the root with <code>role="progressbar"</code> and
          keeps <code>aria-valuenow</code>, <code>aria-valuemin</code> and{" "}
          <code>aria-valuemax</code> in sync with your props. The root reflects
          its variants as <code>data-size</code>, <code>data-edge</code> and{" "}
          <code>data-type</code>, and every part exposes a{" "}
          <code>data-slot</code> attribute. The <code>progressVariants</code>{" "}
          cva helper is also exported.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
