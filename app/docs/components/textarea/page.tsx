"use client"

import { Textarea } from "@/components/ui/textarea"
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
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

function textareaPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.variant !== "outline" ? ` variant="${v.variant}"` : "",
    v.size !== "md" ? ` size="${v.size}"` : "",
    ` placeholder="${v.placeholder}"`,
    v.disabled ? ` disabled` : "",
    v.invalid ? ` data-invalid="true"` : "",
  ].join("")

  return `<Textarea${attrs} />`
}

function TextareaPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-sm">
      <Textarea
        variant={v.variant as "outline" | "subtle" | "ghost"}
        size={v.size as "xs" | "sm" | "md" | "lg"}
        placeholder={v.placeholder as string}
        disabled={Boolean(v.disabled)}
        data-invalid={v.invalid ? "true" : undefined}
      />
    </div>
  )
}

export default function TextareaDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Textarea"
        description="A multi-line text input that grows with its content. Three surface variants – outline, subtle, and ghost – in four sizes."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            placeholder: {
              type: "text",
              defaultValue: "Write a short bio...",
            },
            variant: {
              type: "options",
              options: ["outline", "subtle", "ghost"],
              defaultValue: "outline",
            },
            size: {
              type: "options",
              options: ["xs", "sm", "md", "lg"],
              defaultValue: "md",
            },
            disabled: { type: "boolean", defaultValue: false },
            invalid: { type: "boolean", defaultValue: false },
          }}
          renderPreview={TextareaPlaygroundPreview}
          renderCode={textareaPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          A styled native <code>textarea</code>. Thanks to{" "}
          <code>field-sizing-content</code> it auto-grows from its size&apos;s
          minimum height as you type.
        </DocProse>
        <DocExample code={`<Textarea placeholder="Write a short bio..." />`}>
          <div className="w-full max-w-sm">
            <Textarea placeholder="Write a short bio..." />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="textarea" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`import { Textarea } from "@/components/ui/textarea"`}
        />
        <CodeBlock
          code={`<Textarea variant="subtle" size="sm" placeholder="Leave a comment" />`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> picks the surface: <code>outline</code> draws a
          shadow ring on a transparent background, <code>subtle</code> sits on a
          filled <code>bg-secondary</code> surface, and <code>ghost</code> is
          fully transparent until hovered – all three lift to a raised,
          white-surfaced state on focus.
        </DocProse>
        <DocExample
          code={`
<Textarea variant="outline" placeholder="Outline" />
<Textarea variant="subtle" placeholder="Subtle" />
<Textarea variant="ghost" placeholder="Ghost" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Textarea variant="outline" size="sm" placeholder="Outline" />
            <Textarea variant="subtle" size="sm" placeholder="Subtle" />
            <Textarea variant="ghost" size="sm" placeholder="Ghost" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Four sizes scale the minimum height, padding, radius and type:{" "}
          <code>xs</code>, <code>sm</code>, <code>md</code> and <code>lg</code>.
          The <code>outline</code> variant trims 2px off each minimum height to
          account for its shadow ring.
        </DocProse>
        <DocExample
          code={`
<Textarea size="xs" placeholder="Extra Small (xs)" />
<Textarea size="sm" placeholder="Small (sm)" />
<Textarea size="md" placeholder="Medium (md)" />
<Textarea size="lg" placeholder="Large (lg)" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Textarea size="xs" placeholder="Extra Small (xs)" />
            <Textarea size="sm" placeholder="Small (sm)" />
            <Textarea size="md" placeholder="Medium (md)" />
            <Textarea size="lg" placeholder="Large (lg)" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Validation states">
        <DocProse>
          Set <code>data-valid</code> or <code>data-invalid</code> to tint the
          field green or red – outline recolors its ring, subtle and ghost swap
          to <code>bg-success</code> / <code>bg-error</code> surfaces.{" "}
          <code>data-filled</code> marks a settled value. Inside a{" "}
          <code>Field</code> group the invalid ring also follows{" "}
          <code>group-data-[invalid]</code> automatically.
        </DocProse>
        <DocExample
          code={`
<Textarea data-valid="true" defaultValue="Valid" />
<Textarea data-invalid="true" defaultValue="Invalid" />
<Textarea data-filled="true" defaultValue="Filled" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Textarea size="sm" data-valid="true" defaultValue="Valid" />
            <Textarea size="sm" data-invalid="true" defaultValue="Invalid" />
            <Textarea size="sm" data-filled="true" defaultValue="Filled" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled">
        <DocProse>
          The native <code>disabled</code> attribute blocks interaction, shows a
          not-allowed cursor and washes out the text and placeholder; outline
          and ghost stay transparent while subtle drops to <code>bg-input</code>
          .
        </DocProse>
        <DocExample
          code={`
<Textarea variant="outline" disabled placeholder="Outline disabled" />
<Textarea variant="subtle" disabled placeholder="Subtle disabled" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Textarea
              variant="outline"
              size="sm"
              disabled
              placeholder="Outline disabled"
            />
            <Textarea
              variant="subtle"
              size="sm"
              disabled
              placeholder="Subtle disabled"
            />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Textarea</code> renders a native <code>textarea</code> and
          accepts <code>className</code> plus all standard textarea attributes (
          <code>placeholder</code>, <code>disabled</code>, <code>rows</code>,{" "}
          <code>value</code>, ...).
        </DocProse>
        <PropsTable
          title="Textarea"
          rows={[
            {
              prop: "variant",
              type: '"outline" | "subtle" | "ghost"',
              defaultValue: '"outline"',
              description:
                "Surface – shadow-ringed outline, filled subtle, or transparent ghost. All raise to a focused surface with shadow-raised.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Minimum height, padding, radius and type scale. The field auto-grows past the minimum with its content.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The element carries <code>data-slot="textarea"</code> and reflects its
          props as <code>data-variant</code> and <code>data-size</code>. It also
          styles itself off consumer-set state attributes –{" "}
          <code>data-filled</code>, <code>data-invalid</code> and{" "}
          <code>data-valid</code> – so form libraries can drive appearance
          without extra classes. The <code>textareaVariants</code> cva helper is
          exported for custom compositions:
        </DocProse>
        <CodeBlock
          code={`
import { textareaVariants } from "@/components/ui/textarea"

<textarea className={cn(textareaVariants({ variant: "subtle", size: "sm" }))} />`}
        />
      </DocSection>
    </DocPage>
  )
}
