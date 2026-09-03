"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

function radioGroupPlaygroundCode(v: PlaygroundValues) {
  const sizeAttr = v.size !== "default" ? ` size="${v.size}"` : ""
  const items = Array.from(
    { length: Number(v.options) },
    (_, i) => `    <RadioGroupItem${sizeAttr} value="option-${i + 1}" />`
  )
  return [
    `<RadioGroup defaultValue="option-1"${v.disabled ? " disabled" : ""}>`,
    `  <div className="flex items-center gap-4">`,
    ...items,
    `  </div>`,
    `</RadioGroup>`,
  ].join("\n")
}

function RadioGroupPlaygroundPreview(v: PlaygroundValues) {
  const count = Number(v.options)
  return (
    <RadioGroup
      key={count}
      defaultValue="option-1"
      disabled={Boolean(v.disabled)}
      className="w-auto"
    >
      <div className="flex items-center gap-4">
        {Array.from({ length: count }, (_, i) => (
          <RadioGroupItem
            key={i}
            size={v.size as "xs" | "sm" | "default"}
            value={`option-${i + 1}`}
          />
        ))}
      </div>
    </RadioGroup>
  )
}

export default function RadioGroupDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Radio Group"
        description="A set of mutually exclusive radio buttons built on Base UI. Three sizes, with automatic invalid styling inside a Field."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            size: {
              type: "options",
              options: ["xs", "sm", "default"],
              defaultValue: "default",
              labels: { default: "md" },
            },
            options: {
              type: "options",
              options: ["2", "3"],
              defaultValue: "2",
            },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={RadioGroupPlaygroundPreview}
          renderCode={radioGroupPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Wrap <code>RadioGroupItem</code>s in a <code>RadioGroup</code> and
          give each a <code>value</code>. Use <code>defaultValue</code> for the
          initial selection.
        </DocProse>
        <DocExample
          code={`
<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-4">
    <RadioGroupItem value="option-1" />
    <RadioGroupItem value="option-2" />
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="option-1" className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem value="option-1" />
              <RadioGroupItem value="option-2" />
            </div>
          </RadioGroup>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="radio-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
        />
        <CodeBlock
          code={`
<RadioGroup defaultValue="comfortable" onValueChange={(value) => console.log(value)}>
  <RadioGroupItem value="compact" />
  <RadioGroupItem value="comfortable" />
</RadioGroup>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> on the item scales the circle and its dot:{" "}
          <code>xs</code> (13px), <code>sm</code> (14px) and{" "}
          <code>default</code> (16px).
        </DocProse>
        <DocExample
          code={`
<RadioGroup defaultValue="a">
  <RadioGroupItem size="xs" value="a" />
  <RadioGroupItem size="xs" value="b" />
</RadioGroup>

<RadioGroup defaultValue="a">
  <RadioGroupItem size="sm" value="a" />
  <RadioGroupItem size="sm" value="b" />
</RadioGroup>

<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" />
  <RadioGroupItem value="b" />
</RadioGroup>`}
        >
          <RadioGroup defaultValue="a" className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem size="xs" value="a" />
              <RadioGroupItem size="xs" value="b" />
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="a" className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem size="sm" value="a" />
              <RadioGroupItem size="sm" value="b" />
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="a" className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem value="a" />
              <RadioGroupItem value="b" />
            </div>
          </RadioGroup>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled">
        <DocProse>
          Set <code>disabled</code> on the group (or a single item) – items
          become non-interactive with muted checked and unchecked styling.
        </DocProse>
        <DocExample
          code={`
<RadioGroup defaultValue="dis-2" disabled>
  <div className="flex items-center gap-4">
    <RadioGroupItem value="dis-1" />
    <RadioGroupItem value="dis-2" />
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="dis-2" disabled className="w-auto">
            <div className="flex items-center gap-4">
              <RadioGroupItem value="dis-1" />
              <RadioGroupItem value="dis-2" />
            </div>
          </RadioGroup>
        </DocExample>
      </DocSection>

      <DocSection title="Invalid">
        <DocProse>
          Set <code>data-invalid="true"</code> on an item for a destructive
          border and ring – or place the group inside a{" "}
          <code>Field data-invalid="true"</code> and every item inherits the
          invalid styling from the field context.
        </DocProse>
        <DocExample
          code={`
<RadioGroup value="">
  <RadioGroupItem data-invalid="true" value="inv-1" />
</RadioGroup>

<RadioGroup value="inv-2">
  <RadioGroupItem data-invalid="true" value="inv-2" />
</RadioGroup>`}
        >
          <RadioGroup value="" className="w-auto">
            <RadioGroupItem data-invalid="true" value="inv-1" />
          </RadioGroup>
          <RadioGroup value="inv-2" className="w-auto">
            <RadioGroupItem data-invalid="true" value="inv-2" />
          </RadioGroup>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>RadioGroup</code> wraps the Base UI radio group and accepts all
          of its props; <code>RadioGroupItem</code> wraps the radio root and
          renders its own indicator dot. Both accept <code>className</code>.
        </DocProse>
        <PropsTable
          title="RadioGroup"
          rows={[
            {
              prop: "value",
              type: "string",
              description: "Controlled value of the selected item.",
            },
            {
              prop: "defaultValue",
              type: "string",
              description: "Initially selected value when uncontrolled.",
            },
            {
              prop: "onValueChange",
              type: "(value, eventDetails) => void",
              description: "Called when the selection changes.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables every item in the group.",
            },
            {
              prop: "name",
              type: "string",
              description:
                "Name submitted with the owning form (renders a hidden input).",
            },
          ]}
        />
        <PropsTable
          title="RadioGroupItem"
          rows={[
            {
              prop: "value",
              type: "string",
              description:
                "The value this radio represents within the group. Required.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "default"',
              defaultValue: '"default"',
              description:
                "Circle size – 13px, 14px or 16px, with a matching indicator dot.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables this item only.",
            },
            {
              prop: "data-invalid",
              type: "string",
              description:
                'Set to "true" for destructive border and ring styling on this item.',
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "RadioGroup",
              description:
                'Group container (data-slot="radio-group"), rendered with role="radiogroup" and a grid gap-2 layout.',
            },
            {
              part: "RadioGroupItem",
              description:
                'The radio control (data-slot="radio-group-item", role="radio"). Reflects size as data-size and state as data-checked / data-unchecked / data-disabled. Includes an enlarged invisible hit area.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI provides the <code>radiogroup</code>/<code>radio</code> roles
          with arrow-key navigation between items, and a hidden input for form
          submission when <code>name</code> is set. Style against the state
          attributes – <code>data-checked</code>, <code>data-unchecked</code>,{" "}
          <code>data-disabled</code>, <code>data-invalid</code> and{" "}
          <code>data-size</code> – or reuse the exported{" "}
          <code>radioGroupItemVariants</code> cva helper for custom radio
          surfaces.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
