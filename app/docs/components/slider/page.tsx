"use client"

import { Slider } from "@/components/ui/slider"
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
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

function sliderPlaygroundValue(v: PlaygroundValues) {
  const start = Number(v.defaultValue)
  return v.range ? [start, Math.min(start + 25, 100)] : [start]
}

function sliderPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    ` defaultValue={[${sliderPlaygroundValue(v).join(", ")}]}`,
    v.size !== "default" ? ` size="${v.size}"` : "",
    v.disabled ? " disabled" : "",
  ].join("")
  return `<Slider${attrs} />`
}

function SliderPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-sm">
      <Slider
        key={sliderPlaygroundCode(v)}
        defaultValue={sliderPlaygroundValue(v)}
        size={v.size as "sm" | "default" | "lg" | "xl"}
        disabled={Boolean(v.disabled)}
      />
    </div>
  )
}

export default function SliderDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Slider"
        description="An input for selecting a value or range by dragging thumbs along a track. Built on Base UI with four sizes and a vertical orientation."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            size: {
              type: "options",
              options: ["sm", "default", "lg", "xl"],
              defaultValue: "default",
              labels: { default: "md" },
            },
            defaultValue: {
              type: "options",
              options: ["25", "50", "75"],
              defaultValue: "50",
            },
            range: { type: "boolean", defaultValue: false },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={SliderPlaygroundPreview}
          renderCode={sliderPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Pass <code>defaultValue</code> as an array – one entry per thumb. A
          single-entry array renders one thumb with the filled range starting at{" "}
          <code>min</code>.
        </DocProse>
        <DocExample
          code={`
<Slider defaultValue={[50]} className="max-w-sm" />`}
        >
          <Slider defaultValue={[50]} className="max-w-sm" />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="slider" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Slider } from "@/components/ui/slider"`}
        />
        <CodeBlock
          code={`
<Slider defaultValue={[25, 75]} min={0} max={100} step={1} />`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> scales the track thickness and thumb together:{" "}
          <code>sm</code>, <code>default</code>, <code>lg</code> and{" "}
          <code>xl</code>.
        </DocProse>
        <DocExample
          code={`
<Slider size="sm" defaultValue={[50]} />
<Slider size="default" defaultValue={[50]} />
<Slider size="lg" defaultValue={[50]} />
<Slider size="xl" defaultValue={[50]} />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Slider size="sm" defaultValue={[50]} />
            <Slider size="default" defaultValue={[50]} />
            <Slider size="lg" defaultValue={[50]} />
            <Slider size="xl" defaultValue={[50]} />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Range and multiple thumbs">
        <DocProse>
          Two values make a range slider; the filled indicator spans between the
          thumbs. Any number of entries works – each value gets its own thumb.
        </DocProse>
        <DocExample
          code={`
<Slider defaultValue={[25, 75]} />
<Slider defaultValue={[20, 50, 80]} />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Slider defaultValue={[25, 75]} />
            <Slider defaultValue={[20, 50, 80]} />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Vertical">
        <DocProse>
          <code>orientation="vertical"</code> flips the axis. The control
          enforces a minimum height of <code>min-h-40</code>; give the wrapper
          an explicit height to size it.
        </DocProse>
        <DocExample
          code={`
<div className="flex h-40 items-center gap-8">
  <Slider defaultValue={[50]} orientation="vertical" />
  <Slider size="lg" defaultValue={[25, 75]} orientation="vertical" />
</div>`}
        >
          <div className="flex h-40 items-center gap-8">
            <Slider defaultValue={[50]} orientation="vertical" />
            <Slider size="lg" defaultValue={[25, 75]} orientation="vertical" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Step and disabled">
        <DocProse>
          <code>step</code> snaps values to an increment; <code>disabled</code>{" "}
          mutes the thumb, drops its shadow and blocks pointer interaction.
        </DocProse>
        <DocExample
          code={`
<Slider defaultValue={[50]} step={10} />
<Slider defaultValue={[25, 75]} disabled />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Slider defaultValue={[50]} step={10} />
            <Slider defaultValue={[25, 75]} disabled />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Slider</code> is a single component that composes the Base UI
          Root, Control, Track, Indicator and Thumb parts internally – it
          accepts every Base UI <code>Slider.Root</code> prop (
          <code>onValueChange</code>, <code>onValueCommitted</code>,{" "}
          <code>name</code>, <code>largeStep</code>, …) plus the ones below.
          Thumbs are derived from the length of <code>value</code> /{" "}
          <code>defaultValue</code>.
        </DocProse>
        <PropsTable
          title="Slider"
          rows={[
            {
              prop: "size",
              type: '"sm" | "default" | "lg" | "xl"',
              defaultValue: '"default"',
              description:
                "Scales track thickness (2px to 10px) and thumb diameter (14px to 24px) together.",
            },
            {
              prop: "value",
              type: "number | number[]",
              defaultValue: "–",
              description:
                "Controlled value(s). Use an array with one entry per thumb, paired with onValueChange.",
            },
            {
              prop: "defaultValue",
              type: "number | number[]",
              defaultValue: "[min, max]",
              description:
                "Uncontrolled initial value(s). When omitted, both a min and a max thumb are rendered.",
            },
            {
              prop: "min",
              type: "number",
              defaultValue: "0",
              description: "Smallest selectable value.",
            },
            {
              prop: "max",
              type: "number",
              defaultValue: "100",
              description: "Largest selectable value.",
            },
            {
              prop: "step",
              type: "number",
              defaultValue: "1",
              description: "Granularity the values snap to while dragging.",
            },
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description:
                "Axis of the track. Vertical sliders fill the container height (min-h-40).",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Blocks interaction and renders the thumb in a muted, shadowless style.",
            },
          ]}
        />
        <DocProse>
          The internal parts are exposed through <code>data-slot</code>{" "}
          attributes for styling:
        </DocProse>
        <PartsTable
          rows={[
            {
              part: "Root",
              description:
                'data-slot="slider". Also reflects the active size as data-size and orientation as data-horizontal / data-vertical.',
            },
            {
              part: "Track",
              description:
                'data-slot="slider-track". The rounded bg-secondary rail behind the thumbs.',
            },
            {
              part: "Range",
              description:
                'data-slot="slider-range". The bg-primary filled indicator between min (or the lowest thumb) and the active thumb.',
            },
            {
              part: "Thumb",
              description:
                'data-slot="slider-thumb". White circular handle; stretches along the drag axis while active via a spring transition and grows a ring on hover, active and focus-visible.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Each thumb renders a hidden native input, so the slider works with
          forms and keyboard navigation out of the box – arrow keys move by{" "}
          <code>step</code>, Page Up/Down by <code>largeStep</code>, Home/End
          jump to the bounds, and Base UI wires up the slider ARIA semantics
          (min, max and current value). Every thumb has an enlarged invisible
          hit area (<code>after:-inset-2</code>) for touch. State is mirrored as{" "}
          <code>data-disabled</code>, <code>data-dragging</code>,{" "}
          <code>data-horizontal</code> and <code>data-vertical</code> attributes
          for CSS targeting.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
