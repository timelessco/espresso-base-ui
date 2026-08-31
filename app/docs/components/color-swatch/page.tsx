"use client"

import * as React from "react"

import { ColorSwatch } from "@/components/ui/color-swatch"
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

function SelectedSwatchDemo() {
  const [selected, setSelected] = React.useState("#3b82f6")
  const colors = ["#3b82f6", "#ef4444", "#10b981"]

  return (
    <div className="flex items-center gap-3">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => setSelected(color)}
          className="rounded-full"
          aria-label={`Select ${color}`}
        >
          <ColorSwatch color={color} selected={selected === color} />
        </button>
      ))}
    </div>
  )
}

function colorSwatchPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    ` color="${v.color}"`,
    v.size !== "default" ? ` size="${v.size}"` : "",
    v.selected ? " selected" : "",
    v.disabled ? " disabled" : "",
  ].join("")
  return `<ColorSwatch${attrs} />`
}

function ColorSwatchPlaygroundPreview(v: PlaygroundValues) {
  return (
    <ColorSwatch
      color={v.color as string}
      size={v.size as "sm" | "default" | "lg"}
      selected={Boolean(v.selected)}
      disabled={Boolean(v.disabled)}
    />
  )
}

export default function ColorSwatchDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Color Swatch"
        description="A circular chip that previews a CSS color. Shows a checkerboard behind transparent values and a check mark when selected."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            color: { type: "text", defaultValue: "#3b82f6" },
            size: {
              type: "options",
              options: ["sm", "default", "lg"],
              defaultValue: "default",
            },
            selected: { type: "boolean", defaultValue: true },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={ColorSwatchPlaygroundPreview}
          renderCode={colorSwatchPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Pass any valid CSS color string – hex, <code>rgb()</code>,{" "}
          <code>hsl()</code>, <code>oklch()</code>, named colors or even CSS
          variables like <code>var(--primary)</code>.
        </DocProse>
        <DocExample
          code={`
<ColorSwatch color="#3b82f6" />
<ColorSwatch color="rgb(239, 68, 68)" />
<ColorSwatch color="hsl(160, 84%, 39%)" />
<ColorSwatch color="oklch(0.65 0.18 250)" />
<ColorSwatch color="dodgerblue" />`}
        >
          <div className="flex items-center gap-2">
            <ColorSwatch color="#3b82f6" />
            <ColorSwatch color="rgb(239, 68, 68)" />
            <ColorSwatch color="hsl(160, 84%, 39%)" />
            <ColorSwatch color="oklch(0.65 0.18 250)" />
            <ColorSwatch color="dodgerblue" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="color-swatch" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { ColorSwatch } from "@/components/ui/color-swatch"`}
        />
        <CodeBlock
          code={`
<ColorSwatch color="#3b82f6" selected />`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Three sizes: <code>sm</code> (24px), <code>default</code> (32px) and{" "}
          <code>lg</code> (48px).
        </DocProse>
        <DocExample
          code={`
<ColorSwatch color="#3b82f6" size="sm" />
<ColorSwatch color="#3b82f6" size="default" />
<ColorSwatch color="#3b82f6" size="lg" />`}
        >
          <div className="flex items-end gap-3">
            <ColorSwatch color="#3b82f6" size="sm" />
            <ColorSwatch color="#3b82f6" size="default" />
            <ColorSwatch color="#3b82f6" size="lg" />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Transparency">
        <DocProse>
          Colors with an alpha channel below 1 get a checkerboard backdrop so
          the transparency reads; <code>withoutTransparency</code> disables it
          and lets the color blend with the surface behind.
        </DocProse>
        <DocExample
          code={`
<ColorSwatch color="#3b82f680" />
<ColorSwatch color="rgba(239, 68, 68, 0.5)" />
<ColorSwatch color="transparent" />
<ColorSwatch color="#3b82f680" withoutTransparency />`}
        >
          <div className="flex items-center gap-3">
            <ColorSwatch color="#3b82f680" />
            <ColorSwatch color="rgba(239, 68, 68, 0.5)" />
            <ColorSwatch color="transparent" />
            <ColorSwatch color="#3b82f680" withoutTransparency />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Selected">
        <DocProse>
          <code>selected</code> springs in a white check mark and offsets an
          outline ring tinted with the swatch's own color – wrap swatches in
          buttons to build a palette picker.
        </DocProse>
        <DocExample
          code={`
const [selected, setSelected] = React.useState("#3b82f6")
const colors = ["#3b82f6", "#ef4444", "#10b981"]

{colors.map((color) => (
  <button
    key={color}
    type="button"
    onClick={() => setSelected(color)}
    className="rounded-full"
  >
    <ColorSwatch color={color} selected={selected === color} />
  </button>
))}`}
        >
          <SelectedSwatchDemo />
        </DocExample>
      </DocSection>

      <DocSection title="Empty, invalid and disabled">
        <DocProse>
          A missing or invalid <code>color</code> renders a diagonal
          strike-through – the "no color" affordance familiar from design tools
          – while <code>disabled</code> halves the opacity and blocks pointer
          events.
        </DocProse>
        <DocExample
          code={`
<ColorSwatch />
<ColorSwatch color="not-a-real-color" />
<ColorSwatch color="#3b82f6" disabled />`}
        >
          <div className="flex items-center gap-3">
            <ColorSwatch />
            <ColorSwatch color="not-a-real-color" />
            <ColorSwatch color="#3b82f6" disabled />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>ColorSwatch</code> renders a single <code>div</code> (or its
          child with <code>asChild</code>) and accepts <code>className</code>,{" "}
          <code>style</code> and all standard div props. Custom children replace
          the built-in check-mark indicator.
        </DocProse>
        <PropsTable
          title="ColorSwatch"
          rows={[
            {
              prop: "color",
              type: "string",
              description:
                "Any CSS color value. Omitted, empty or invalid values render the strike-through placeholder.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              defaultValue: '"default"',
              description: "Swatch diameter – 24px, 32px or 48px.",
            },
            {
              prop: "selected",
              type: "boolean",
              defaultValue: "false",
              description:
                "Shows the animated check mark and an offset outline tinted with the swatch color.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Halves opacity, blocks pointer events and sets aria-disabled.",
            },
            {
              prop: "withoutTransparency",
              type: "boolean",
              defaultValue: "false",
              description:
                "Skip the checkerboard backdrop for colors with an alpha channel.",
            },
            {
              prop: "asChild",
              type: "boolean",
              defaultValue: "false",
              description:
                "Merge the swatch's props and styling onto the child element instead of rendering a div.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The swatch renders <code>role="img"</code> with an{" "}
          <code>aria-label</code> announcing the current color value (or "No
          color selected"), and sets <code>forced-color-adjust: none</code> so
          the preview stays accurate in forced-colors modes. State surfaces as
          data attributes – <code>data-slot="color-swatch"</code>,{" "}
          <code>data-selected</code> and <code>data-disabled</code> – for CSS
          targeting. The swatch itself is not interactive; wrap it in a{" "}
          <code>button</code> (or use <code>asChild</code>) to make it clickable
          and focusable.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
