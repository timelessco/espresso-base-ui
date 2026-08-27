"use client"

import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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

export default function InputDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Input"
        description="A single-line text input built on Base UI. Outline, subtle and ghost variants across four sizes."
      />

      <DocSection title="Preview">
        <DocProse>
          The default <code>outline</code> variant draws a soft shadow ring that
          lifts on hover and focus.
        </DocProse>
        <DocExample
          code={`
<Input placeholder="Email address" type="email" />`}
        >
          <div className="w-full max-w-xs">
            <Input placeholder="Email address" type="email" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="input" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Input } from "@/components/ui/input"`}
        />
        <CodeBlock
          code={`
<Input variant="subtle" size="sm" placeholder="Search..." />`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> picks the resting surface: <code>outline</code>{" "}
          shows a shadow ring, <code>subtle</code> sits on a secondary
          background, and <code>ghost</code> is transparent until hovered or
          focused.
        </DocProse>
        <DocExample
          code={`
<Input variant="outline" placeholder="Outline" />
<Input variant="subtle" placeholder="Subtle" />
<Input variant="ghost" placeholder="Ghost" />`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <Input variant="outline" placeholder="Outline" />
            <Input variant="subtle" placeholder="Subtle" />
            <Input variant="ghost" placeholder="Ghost" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Four sizes from <code>xs</code> (24px) to <code>lg</code> (40px); text
          and radius scale with the height. The outline variant trims 2px to
          make room for its outer shadow ring.
        </DocProse>
        <DocExample
          code={`
<Input size="xs" placeholder="Extra Small (xs)" />
<Input size="sm" placeholder="Small (sm)" />
<Input size="md" placeholder="Medium (md)" />
<Input size="lg" placeholder="Large (lg)" />`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <Input size="xs" placeholder="Extra Small (xs)" />
            <Input size="sm" placeholder="Small (sm)" />
            <Input size="md" placeholder="Medium (md)" />
            <Input size="lg" placeholder="Large (lg)" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="States">
        <DocProse>
          <code>disabled</code> mutes the text and blocks interaction, while{" "}
          <code>data-valid</code>, <code>data-invalid</code> and{" "}
          <code>data-filled</code> force the success, error and filled surfaces
          for static or externally validated states.
        </DocProse>
        <DocExample
          code={`
<Input disabled placeholder="Disabled" />
<Input data-valid="true" defaultValue="Valid" />
<Input data-invalid="true" defaultValue="Invalid" />
<Input data-filled="true" defaultValue="Filled" />`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <Input disabled placeholder="Disabled" />
            <Input data-valid="true" defaultValue="Valid" />
            <Input data-invalid="true" defaultValue="Invalid" />
            <Input data-filled="true" defaultValue="Filled" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Invalid via Field">
        <DocProse>
          Inside a <code>Field</code> with <code>data-invalid="true"</code>, the
          input picks up the error surface automatically – pair it with{" "}
          <code>FieldError</code> for the message.
        </DocProse>
        <DocExample
          code={`
<Field data-invalid="true">
  <Input defaultValue="hello@invalid" />
  <FieldError>This field is required.</FieldError>
</Field>`}
        >
          <div className="w-full max-w-xs">
            <Field data-invalid="true">
              <Input defaultValue="hello@invalid" />
              <FieldError>This field is required.</FieldError>
            </Field>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Input</code> accepts every standard input prop (
          <code>type</code>, <code>placeholder</code>, <code>disabled</code>,{" "}
          <code>defaultValue</code>, …) except the native <code>size</code>{" "}
          attribute, which is replaced by the size variant below.
        </DocProse>
        <PropsTable
          title="Input"
          rows={[
            {
              prop: "variant",
              type: '"outline" | "subtle" | "ghost"',
              defaultValue: '"outline"',
              description:
                "Visual style – shadow ring (outline), filled secondary surface (subtle), or transparent until interaction (ghost).",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Control height (24 / 28 / 32 / 40px) with matching text size and radius.",
            },
            {
              prop: "data-invalid",
              type: "string",
              defaultValue: "–",
              description:
                'Set to "true" to force the error surface (also inherited from a Field with data-invalid).',
            },
            {
              prop: "data-disabled",
              type: "string",
              defaultValue: "–",
              description:
                'Set to "true" to apply the disabled styling without the native disabled attribute.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Associate a visible label via <code>htmlFor</code>/<code>id</code> (or
          the Field component&apos;s <code>FieldLabel</code>), and set{" "}
          <code>aria-invalid</code> alongside <code>data-invalid</code> when
          reporting validation errors so assistive tech hears the state too. The
          element exposes <code>data-slot="input"</code>,{" "}
          <code>data-variant</code> and <code>data-size</code>, and responds to{" "}
          <code>data-filled</code>, <code>data-valid</code> and{" "}
          <code>data-invalid</code> state attributes – including autofill
          styling via <code>:-webkit-autofill</code>.
        </DocProse>
        <DocProse>
          The <code>inputVariants</code> cva helper is exported for building
          custom controls with the same surfaces:
        </DocProse>
        <CodeBlock
          code={`
import { inputVariants } from "@/components/ui/input"

<input className={cn(inputVariants({ variant: "subtle", size: "sm" }))} />`}
        />
      </DocSection>
    </DocPage>
  )
}
