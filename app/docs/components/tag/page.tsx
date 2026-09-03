"use client"

import { useState } from "react"

import { Tag } from "@/components/ui/tag"
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

function tagPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.variant !== "primary" ? ` variant="${v.variant}"` : "",
    v.size !== "default" ? ` size="${v.size}"` : "",
    v.disabled ? ` disabled` : "",
    v.closable ? ` onClose={() => {}}` : "",
  ].join("")

  return `<Tag${attrs}>${v.label}</Tag>`
}

function TagPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Tag
      variant={
        v.variant as
          | "primary"
          | "secondary"
          | "outline"
          | "ghost"
          | "destructive"
      }
      size={v.size as "sm" | "default" | "lg"}
      disabled={Boolean(v.disabled)}
      onClose={v.closable ? () => {} : undefined}
    >
      {v.label}
    </Tag>
  )
}

export default function TagDocsPage() {
  const [tags, setTags] = useState(["React", "Next.js", "TypeScript"])

  return (
    <DocPage>
      <DocHeader
        title="Tag"
        description="A compact label for categorizing content. Five tonal variants, three sizes, and an optional close control for removable tags."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            label: { type: "text", defaultValue: "Design" },
            variant: {
              type: "options",
              options: [
                "primary",
                "secondary",
                "outline",
                "ghost",
                "destructive",
              ],
              defaultValue: "primary",
            },
            size: {
              type: "options",
              options: ["sm", "default", "lg"],
              defaultValue: "default",
              labels: { default: "md" },
            },
            closable: { type: "boolean", defaultValue: false },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={TagPlaygroundPreview}
          renderCode={tagPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          A single <code>Tag</code> renders an inline <code>span</code>. Pass{" "}
          <code>onClose</code> to append the remove button.
        </DocProse>
        <DocExample
          code={`
<Tag>Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="outline" onClose={() => {}}>
  Removable
</Tag>`}
        >
          <Tag>Primary</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="outline" onClose={() => {}}>
            Removable
          </Tag>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="tag" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock code={`import { Tag } from "@/components/ui/tag"`} />
        <CodeBlock
          code={`
<Tag variant="secondary" size="sm" onClose={() => remove(id)}>
  Design
</Tag>`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> sets the tone: <code>primary</code>,{" "}
          <code>secondary</code>, <code>outline</code>, <code>ghost</code> and{" "}
          <code>destructive</code> – each with hover, focus-visible and active
          states.
        </DocProse>
        <DocExample
          code={`
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="outline">Outline</Tag>
<Tag variant="ghost">Ghost</Tag>
<Tag variant="destructive">Destructive</Tag>`}
        >
          <Tag variant="primary">Primary</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="outline">Outline</Tag>
          <Tag variant="ghost">Ghost</Tag>
          <Tag variant="destructive">Destructive</Tag>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Three sizes: <code>sm</code> (20px), <code>default</code> (24px) and{" "}
          <code>lg</code> (28px). The <code>outline</code> variant trims 2px off
          each height to account for its outer shadow ring.
        </DocProse>
        <DocExample
          code={`
<Tag size="sm">Small</Tag>
<Tag size="default">Default</Tag>
<Tag size="lg">Large</Tag>`}
        >
          <Tag size="sm">Small</Tag>
          <Tag size="default">Default</Tag>
          <Tag size="lg">Large</Tag>
        </DocExample>
      </DocSection>

      <DocSection title="Removable">
        <DocProse>
          With <code>onClose</code> the tag becomes focusable and shows a
          trailing remove button – click it, or focus the tag and press{" "}
          <code>Backspace</code> or <code>Delete</code>.
        </DocProse>
        <DocExample
          code={`
const [tags, setTags] = useState(["React", "Next.js", "TypeScript"])

{tags.map((tag) => (
  <Tag
    key={tag}
    variant="secondary"
    onClose={() => setTags(tags.filter((t) => t !== tag))}
  >
    {tag}
  </Tag>
))}`}
        >
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="secondary"
              onClose={() => setTags(tags.filter((t) => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && (
            <button
              type="button"
              onClick={() => setTags(["React", "Next.js", "TypeScript"])}
              className="text-sm text-muted-foreground underline-offset-3 hover:underline"
            >
              Reset tags
            </button>
          )}
        </DocExample>
      </DocSection>

      <DocSection title="Disabled">
        <DocProse>
          <code>disabled</code> mutes the colors, blocks pointer events, hides
          the close button from assistive tech and removes the tag from the tab
          order.
        </DocProse>
        <DocExample
          code={`
<Tag variant="primary" disabled onClose={() => {}}>
  Primary
</Tag>
<Tag variant="outline" disabled onClose={() => {}}>
  Outline
</Tag>
<Tag variant="destructive" disabled onClose={() => {}}>
  Destructive
</Tag>`}
        >
          <Tag variant="primary" disabled onClose={() => {}}>
            Primary
          </Tag>
          <Tag variant="outline" disabled onClose={() => {}}>
            Outline
          </Tag>
          <Tag variant="destructive" disabled onClose={() => {}}>
            Destructive
          </Tag>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Tag</code> renders a <code>span</code> and accepts{" "}
          <code>className</code> plus standard span props. The exported{" "}
          <code>TagProps</code> type covers the full signature.
        </DocProse>
        <PropsTable
          title="Tag"
          rows={[
            {
              prop: "variant",
              type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"',
              defaultValue: '"primary"',
              description:
                "Tone – filled primary/destructive surfaces, a soft secondary, a bordered outline, or a transparent ghost.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              defaultValue: '"default"',
              description:
                "Height, padding, radius and type scale. Outline tags run 2px shorter per size to offset the shadow ring.",
            },
            {
              prop: "onClose",
              type: "() => void",
              defaultValue: "–",
              description:
                "Renders the trailing remove button and makes the tag focusable. Called on click or on Backspace/Delete while the tag has focus.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Disables interaction: sets aria-disabled and data-disabled, blocks pointer events and removes the tag from the tab order.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          A removable tag takes <code>tabIndex=0</code> so keyboard users can
          reach it and delete it with <code>Backspace</code> or{" "}
          <code>Delete</code>; the close control renders{" "}
          <code>role="button"</code> with <code>aria-label="Remove"</code>.
          Disabled tags expose <code>aria-disabled</code>. The root carries{" "}
          <code>data-slot="tag"</code> and reflects its props as{" "}
          <code>data-variant</code>, <code>data-size</code> and{" "}
          <code>data-disabled</code>; the close button is{" "}
          <code>data-slot="tag-close"</code> – target these from CSS for
          app-level overrides.
        </DocProse>
        <DocProse>
          The <code>tagVariants</code> cva helper is also exported for building
          custom tag-shaped surfaces with the same classes:
        </DocProse>
        <CodeBlock
          code={`
import { tagVariants } from "@/components/ui/tag"

<span className={cn(tagVariants({ variant: "outline", size: "sm" }))}>
  ...
</span>`}
        />
      </DocSection>
    </DocPage>
  )
}
