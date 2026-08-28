"use client"

import { Switch } from "@/components/ui/switch"
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

function switchPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.size !== "default" ? ` size="${v.size}"` : "",
    v.checked ? " defaultChecked" : "",
    v.disabled ? " disabled" : "",
  ].join("")
  return `<Switch${attrs} />`
}

function SwitchPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Switch
      key={switchPlaygroundCode(v)}
      size={v.size as "xs" | "sm" | "default"}
      defaultChecked={Boolean(v.checked)}
      disabled={Boolean(v.disabled)}
    />
  )
}

export default function SwitchDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Switch"
        description="A toggle for switching a setting on or off, built on Base UI. Three sizes, with a thumb that stretches while pressed."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            size: {
              type: "options",
              options: ["xs", "sm", "default"],
              defaultValue: "default",
            },
            checked: { type: "boolean", defaultValue: true },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={SwitchPlaygroundPreview}
          renderCode={switchPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Uncontrolled by default – set the initial state with{" "}
          <code>defaultChecked</code>, or control it with <code>checked</code>{" "}
          and <code>onCheckedChange</code>.
        </DocProse>
        <DocExample
          code={`
<Switch />
<Switch defaultChecked />`}
        >
          <Switch />
          <Switch defaultChecked />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="switch" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Switch } from "@/components/ui/switch"`}
        />
        <CodeBlock
          code={`
<Switch
  defaultChecked
  onCheckedChange={(checked) => console.log(checked)}
/>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Three sizes: <code>xs</code> (24×14), <code>sm</code> (26×16) and{" "}
          <code>default</code> (32×20). The thumb scales with the track.
        </DocProse>
        <DocExample
          code={`
<Switch size="xs" defaultChecked />
<Switch size="sm" defaultChecked />
<Switch size="default" defaultChecked />`}
        >
          <Switch size="xs" defaultChecked />
          <Switch size="sm" defaultChecked />
          <Switch size="default" defaultChecked />
        </DocExample>
      </DocSection>

      <DocSection title="Disabled">
        <DocProse>
          <code>disabled</code> mutes the track to <code>bg-muted</code> and
          blocks pointer events in both states.
        </DocProse>
        <DocExample
          code={`
<Switch disabled />
<Switch disabled defaultChecked />`}
        >
          <Switch disabled />
          <Switch disabled defaultChecked />
        </DocExample>
      </DocSection>

      <DocSection title="Invalid">
        <DocProse>
          Set <code>data-invalid</code> to show the destructive validation
          treatment – a red border with a soft red ring. The same styles also
          activate automatically inside a Field marked invalid via{" "}
          <code>group-data-[invalid=true]/field</code>.
        </DocProse>
        <DocExample
          code={`
<Switch data-invalid="true" />
<Switch data-invalid="true" defaultChecked />`}
        >
          <Switch data-invalid="true" />
          <Switch data-invalid="true" defaultChecked />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Switch</code> composes the Base UI Root and Thumb parts, so it
          accepts every Base UI <code>Switch.Root</code> prop –{" "}
          <code>checked</code>, <code>defaultChecked</code>,{" "}
          <code>onCheckedChange</code>, <code>disabled</code>,{" "}
          <code>required</code>, <code>readOnly</code>, <code>name</code> and{" "}
          <code>value</code> for forms – plus the ones below.
        </DocProse>
        <PropsTable
          title="Switch"
          rows={[
            {
              prop: "size",
              type: '"xs" | "sm" | "default"',
              defaultValue: '"default"',
              description:
                "Track and thumb size: xs 24×14 with a 10px thumb, sm 26×16 with a 12px thumb, default 32×20 with a 14px thumb.",
            },
            {
              prop: "checked",
              type: "boolean",
              defaultValue: "–",
              description:
                "Controlled on/off state; pair with onCheckedChange.",
            },
            {
              prop: "defaultChecked",
              type: "boolean",
              defaultValue: "false",
              description: "Initial state when uncontrolled.",
            },
            {
              prop: "onCheckedChange",
              type: "(checked, event) => void",
              defaultValue: "–",
              description: "Called with the next state on every toggle.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents interaction and renders the muted track style.",
            },
            {
              prop: "data-invalid",
              type: "string",
              defaultValue: "–",
              description:
                'Marks the control invalid: destructive border plus a destructive/20 ring. Typically "true".',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root renders a <code>button</code> with <code>role="switch"</code>{" "}
          and <code>aria-checked</code>, toggled with click, Space or Enter, and
          a hidden input keeps it form-compatible. An enlarged invisible hit
          area (<code>after:-inset-x-3 after:-inset-y-2</code>) makes the small
          control easy to tap. The root exposes <code>data-slot="switch"</code>{" "}
          and the thumb <code>data-slot="switch-thumb"</code>; both reflect
          state as <code>data-checked</code> / <code>data-unchecked</code>, and
          the root additionally carries <code>data-size</code>,{" "}
          <code>data-disabled</code> and <code>data-invalid</code> for CSS
          targeting. The <code>switchVariants</code> cva helper is exported for
          building custom switch-shaped controls.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
