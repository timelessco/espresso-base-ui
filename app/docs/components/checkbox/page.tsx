"use client"

import { Checkbox } from "@/components/ui/checkbox"
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

export default function CheckboxDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Checkbox"
        description="A control for toggling between checked and unchecked, built on Base UI. Supports an indeterminate state and three sizes."
      />

      <DocSection title="Preview">
        <DocProse>
          A single self-contained component – no separate indicator part to
          compose. Use <code>defaultChecked</code> for uncontrolled state or{" "}
          <code>checked</code> / <code>onCheckedChange</code> for controlled
          state.
        </DocProse>
        <DocExample
          code={`
<Checkbox />
<Checkbox defaultChecked />`}
        >
          <div className="flex items-center gap-4">
            <Checkbox />
            <Checkbox defaultChecked />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="checkbox" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Checkbox } from "@/components/ui/checkbox"`}
        />
        <CodeBlock
          code={`
<Checkbox
  defaultChecked
  onCheckedChange={(checked) => console.log(checked)}
/>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> offers <code>default</code> (16px), <code>sm</code>{" "}
          (14px) and <code>xs</code> (13px); the indicator icon scales with the
          box. An invisible hit area extends well beyond the box on every size.
        </DocProse>
        <DocExample
          code={`
<Checkbox size="xs" defaultChecked />
<Checkbox size="sm" defaultChecked />
<Checkbox defaultChecked />`}
        >
          <div className="flex items-center gap-4">
            <Checkbox size="xs" defaultChecked />
            <Checkbox size="sm" defaultChecked />
            <Checkbox defaultChecked />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Indeterminate">
        <DocProse>
          The <code>indeterminate</code> prop renders a filled box with a dash –
          use it for "select all" controls when only some children are checked.
        </DocProse>
        <DocExample
          code={`
<Checkbox indeterminate />
<Checkbox size="sm" indeterminate />
<Checkbox indeterminate disabled />`}
        >
          <div className="flex items-center gap-4">
            <Checkbox indeterminate />
            <Checkbox size="sm" indeterminate />
            <Checkbox indeterminate disabled />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled and invalid">
        <DocProse>
          <code>disabled</code> mutes the box and blocks pointer events. Set{" "}
          <code>data-invalid</code> (or place the checkbox inside a Field marked
          invalid) for a destructive border and ring.
        </DocProse>
        <DocExample
          code={`
<Checkbox disabled />
<Checkbox disabled defaultChecked />
<Checkbox data-invalid="true" />
<Checkbox data-invalid="true" defaultChecked />`}
        >
          <div className="flex items-center gap-4">
            <Checkbox disabled />
            <Checkbox disabled defaultChecked />
            <Checkbox data-invalid="true" />
            <Checkbox data-invalid="true" defaultChecked />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Checkbox</code> forwards every Base UI{" "}
          <code>Checkbox.Root</code> prop – including <code>name</code>,{" "}
          <code>value</code>, <code>required</code> and <code>inputRef</code>{" "}
          for form integration – and adds the props below.
        </DocProse>
        <PropsTable
          title="Checkbox"
          rows={[
            {
              prop: "size",
              type: '"xs" | "sm" | "default"',
              defaultValue: '"default"',
              description:
                "Box size – 13px, 14px or 16px – with a matching indicator icon size.",
            },
            {
              prop: "checked",
              type: "boolean",
              description:
                "Controlled checked state; pair with onCheckedChange.",
            },
            {
              prop: "defaultChecked",
              type: "boolean",
              defaultValue: "false",
              description: "Initial checked state when uncontrolled.",
            },
            {
              prop: "onCheckedChange",
              type: "(checked, event) => void",
              description: "Called when the checked state changes.",
            },
            {
              prop: "indeterminate",
              type: "boolean",
              defaultValue: "false",
              description:
                'Mixed state – fills the box with a dash indicator and reports aria-checked="mixed".',
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents interaction and applies the muted disabled styling.",
            },
            {
              prop: "data-invalid",
              type: "string",
              description:
                'Marks the checkbox invalid ("true") for destructive border and ring styling.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI renders a <code>button</code> with{" "}
          <code>role="checkbox"</code> and the correct <code>aria-checked</code>{" "}
          value (<code>"mixed"</code> when indeterminate), plus a hidden input
          for form submission. State is mirrored as data attributes –{" "}
          <code>data-checked</code>, <code>data-unchecked</code>,{" "}
          <code>data-indeterminate</code>, <code>data-disabled</code> –
          alongside <code>data-slot="checkbox"</code> and <code>data-size</code>{" "}
          on the root and <code>data-slot="checkbox-indicator"</code> on the
          indicator. When nested in a Field, the{" "}
          <code>group-data-[invalid=true]/field</code> selectors pick up the
          field's invalid state automatically. The <code>checkboxVariants</code>{" "}
          cva helper is also exported:
        </DocProse>
        <CodeBlock
          code={`
import { checkboxVariants } from "@/components/ui/checkbox"

<span className={cn(checkboxVariants({ size: "sm" }))} />`}
        />
      </DocSection>
    </DocPage>
  )
}
