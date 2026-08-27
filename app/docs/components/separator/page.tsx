"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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

function separatorPlaygroundCode(v: PlaygroundValues) {
  const orientationAttr =
    v.orientation === "vertical" ? ` orientation="vertical"` : ""
  const slotText = (v.slot as string).trim()
  if (!slotText) return `<Separator${orientationAttr} />`
  const alignAttr =
    v.slotAlign !== "center" ? ` slotAlign="${v.slotAlign}"` : ""
  return [
    `<Separator${orientationAttr} slot${alignAttr}>`,
    `  <Button size="sm">${slotText}</Button>`,
    `</Separator>`,
  ].join("\n")
}

function SeparatorPlaygroundPreview(v: PlaygroundValues) {
  const orientation = v.orientation as "horizontal" | "vertical"
  const slotText = (v.slot as string).trim()

  const separator = slotText ? (
    <Separator
      orientation={orientation}
      slot
      slotAlign={v.slotAlign as "start" | "center" | "end"}
    >
      <Button size="sm">{slotText}</Button>
    </Separator>
  ) : (
    <Separator orientation={orientation} />
  )

  return orientation === "vertical" ? (
    <div className="flex h-44 items-stretch">{separator}</div>
  ) : (
    <div className="w-full max-w-sm">{separator}</div>
  )
}

export default function SeparatorDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Separator"
        description="A thin rule that divides content horizontally or vertically. A slot mode floats any element on the line with start, center, or end alignment."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            slot: { type: "text", defaultValue: "Continue" },
            orientation: {
              type: "options",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
            },
            slotAlign: {
              type: "options",
              options: ["start", "center", "end"],
              defaultValue: "center",
            },
          }}
          renderPreview={SeparatorPlaygroundPreview}
          renderCode={separatorPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          The default render is a hairline on the <code>border-soft</code>{" "}
          color. Horizontal separators span the full width; vertical ones
          stretch to the height of their flex row.
        </DocProse>
        <DocExample
          code={`
<div>
  <div className="pb-2 text-sm font-medium">Espresso UI</div>
  <div className="text-sm text-muted-foreground">
    An open-source UI component library.
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center gap-4 text-sm text-muted-foreground">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
</div>`}
        >
          <div className="w-full max-w-sm">
            <div className="pb-2 text-sm font-medium text-foreground">
              Espresso UI
            </div>
            <div className="text-sm text-muted-foreground">
              An open-source UI component library.
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center gap-4 text-sm text-muted-foreground">
              <span>Blog</span>
              <Separator orientation="vertical" />
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Source</span>
            </div>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="separator" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Separator } from "@/components/ui/separator"`}
        />
        <CodeBlock
          code={`
<div>
  <p>Above the line.</p>
  <Separator className="my-4" />
  <p>Below the line.</p>
</div>`}
        />
      </DocSection>

      <DocSection title="Vertical">
        <DocProse>
          Set <code>orientation="vertical"</code> inside a flex row – the rule
          self-stretches to the row height, so give the container an explicit
          height or aligned content.
        </DocProse>
        <DocExample
          code={`
<div className="flex h-16 items-center gap-4">
  <div className="text-sm text-muted-foreground">Left</div>
  <Separator orientation="vertical" />
  <div className="text-sm text-muted-foreground">Middle</div>
  <Separator orientation="vertical" />
  <div className="text-sm text-muted-foreground">Right</div>
</div>`}
        >
          <div className="flex h-16 items-center gap-4">
            <div className="text-sm text-muted-foreground">Left</div>
            <Separator orientation="vertical" />
            <div className="text-sm text-muted-foreground">Middle</div>
            <Separator orientation="vertical" />
            <div className="text-sm text-muted-foreground">Right</div>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Slot">
        <DocProse>
          Pass <code>slot</code> and children to float content on top of the
          rule; <code>slotAlign</code> places it at the <code>start</code>,{" "}
          <code>center</code> (default) or <code>end</code>, inset by a fixed
          margin from the edge.
        </DocProse>
        <DocExample
          code={`
<Separator slot slotAlign="start">
  <Button size="sm">Continue</Button>
</Separator>

<Separator slot slotAlign="center">
  <Button size="sm">Continue</Button>
</Separator>

<Separator slot slotAlign="end">
  <Button size="sm">
    <Check />
    Finished
  </Button>
</Separator>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-6">
            <Separator slot slotAlign="start">
              <Button size="sm">Continue</Button>
            </Separator>
            <Separator slot slotAlign="center">
              <Button size="sm">Continue</Button>
            </Separator>
            <Separator slot slotAlign="end">
              <Button size="sm">
                <Check />
                Finished
              </Button>
            </Separator>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Vertical slot">
        <DocProse>
          Slot mode composes with <code>orientation="vertical"</code> too – the
          separator fills the container height and <code>slotAlign</code> maps
          to top, middle and bottom.
        </DocProse>
        <DocExample
          code={`
<div className="flex h-64 items-stretch gap-20">
  <Separator orientation="vertical" slot slotAlign="start">
    <Button size="sm">Continue</Button>
  </Separator>
  <Separator orientation="vertical" slot slotAlign="center">
    <Button size="sm">Continue</Button>
  </Separator>
  <Separator orientation="vertical" slot slotAlign="end">
    <Button size="sm">Continue</Button>
  </Separator>
</div>`}
        >
          <div className="flex h-64 items-stretch gap-20">
            <Separator orientation="vertical" slot slotAlign="start">
              <Button size="sm">Continue</Button>
            </Separator>
            <Separator orientation="vertical" slot slotAlign="center">
              <Button size="sm">Continue</Button>
            </Separator>
            <Separator orientation="vertical" slot slotAlign="end">
              <Button size="sm">Continue</Button>
            </Separator>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Separator</code> wraps the Base UI Separator primitive, so it
          accepts <code>className</code> and every primitive prop in addition to
          the ones below.
        </DocProse>
        <PropsTable
          title="Separator"
          rows={[
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description:
                "Axis of the rule. Horizontal fills the available width; vertical is a 1px column that self-stretches in a flex row.",
            },
            {
              prop: "slot",
              type: "boolean",
              defaultValue: "false",
              description:
                "Switches to slot mode: the rule becomes an absolutely-positioned hairline behind the children you pass.",
            },
            {
              prop: "slotAlign",
              type: '"start" | "center" | "end"',
              defaultValue: '"center"',
              description:
                "Where the slotted content sits along the rule. Start and end are inset by a fixed margin from the edge.",
            },
            {
              prop: "slotClassName",
              type: "string",
              defaultValue: "–",
              description:
                "Extra classes for the inner span that wraps the slotted content.",
            },
            {
              prop: "children",
              type: "ReactNode",
              defaultValue: "–",
              description:
                "Content rendered on top of the rule. Only used when slot is true.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root renders <code>role="separator"</code> with the correct{" "}
          <code>aria-orientation</code> via the Base UI primitive; in slot mode
          the visible hairline is <code>aria-hidden</code> so assistive tech
          only announces one separator. The root exposes{" "}
          <code>data-slot="separator"</code> plus the primitive&apos;s{" "}
          <code>data-horizontal</code> / <code>data-vertical</code> state
          attributes, slot mode adds <code>data-align</code> with the active
          alignment, and the content wrapper carries{" "}
          <code>data-slot="separator-slot"</code> – target any of these from
          CSS. A <code>separatorSlotVariants</code> cva helper is also exported.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
