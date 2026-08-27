"use client"

import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
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

function popoverPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.side !== "bottom" ? ` side="${v.side}"` : "",
    v.align !== "center" ? ` align="${v.align}"` : "",
  ].join("")
  return `<Popover>
  <PopoverTrigger render={<Button variant="outline">Open</Button>} />
  <PopoverContent${attrs}>
    <PopoverHeader>
      <PopoverTitle>${v.title}</PopoverTitle>
      <PopoverDescription>${v.description}</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`
}

function PopoverPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open</Button>} />
      <PopoverContent
        side={v.side as "top" | "right" | "bottom" | "left"}
        align={v.align as "start" | "center" | "end"}
      >
        <PopoverHeader>
          <PopoverTitle>{v.title}</PopoverTitle>
          <PopoverDescription>{v.description}</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

export default function PopoverDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Popover"
        description="A floating card anchored to a trigger, built on the Base UI popover. Composes headers, forms, or toolbars with side and alignment controls."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            title: { type: "text", defaultValue: "Popover title" },
            description: {
              type: "text",
              defaultValue: "A short description of this popover.",
            },
            side: {
              type: "options",
              options: ["top", "right", "bottom", "left"],
              defaultValue: "bottom",
            },
            align: {
              type: "options",
              options: ["start", "center", "end"],
              defaultValue: "center",
            },
          }}
          renderPreview={PopoverPlaygroundPreview}
          renderCode={popoverPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Wrap a trigger and content in <code>Popover</code>. Use the{" "}
          <code>render</code> prop on <code>PopoverTrigger</code> to render your
          own element (like a <code>Button</code>) as the trigger, and compose
          the popup from <code>PopoverHeader</code>, <code>PopoverTitle</code>{" "}
          and <code>PopoverDescription</code>.
        </DocProse>
        <DocExample
          code={`
<Popover>
  <PopoverTrigger render={<Button variant="outline">Open</Button>} />
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Popover title</PopoverTitle>
      <PopoverDescription>
        A short description of what this popover is for.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Open</Button>} />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Popover title</PopoverTitle>
                <PopoverDescription>
                  A short description of what this popover is for.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="popover" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"`}
        />
        <CodeBlock
          code={`
<Popover>
  <PopoverTrigger render={<Button variant="outline">Open</Button>} />
  <PopoverContent side="bottom" align="center">
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
        />
      </DocSection>

      <DocSection title="With form">
        <DocProse>
          The content is a plain flex column (<code>gap-2.5</code>), so form
          fields drop straight in below the header.
        </DocProse>
        <DocExample
          code={`
<Popover>
  <PopoverTrigger
    render={
      <Button variant="outline">
        <Settings2 />
        Dimensions
      </Button>
    }
  />
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
    </PopoverHeader>
    <Field>
      <FieldLabel>Width</FieldLabel>
      <Input defaultValue="100%" />
    </Field>
    <Field>
      <FieldLabel>Height</FieldLabel>
      <Input defaultValue="25px" />
    </Field>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline">
                  <Settings2 />
                  Dimensions
                </Button>
              }
            />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>
                  Set the dimensions for the layer.
                </PopoverDescription>
              </PopoverHeader>
              <Field>
                <FieldLabel>Width</FieldLabel>
                <Input defaultValue="100%" />
              </Field>
              <Field>
                <FieldLabel>Height</FieldLabel>
                <Input defaultValue="25px" />
              </Field>
            </PopoverContent>
          </Popover>
        </DocExample>
      </DocSection>

      <DocSection title="Positioning">
        <DocProse>
          <code>PopoverContent</code> forwards <code>side</code>,{" "}
          <code>sideOffset</code>, <code>align</code> and{" "}
          <code>alignOffset</code> to the positioner. The popup slides in from
          the chosen side.
        </DocProse>
        <DocExample
          code={`
<Popover>
  <PopoverTrigger render={<Button variant="outline">Top</Button>} />
  <PopoverContent side="top">...</PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger render={<Button variant="outline">Start</Button>} />
  <PopoverContent align="start">...</PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Top</Button>} />
            <PopoverContent side="top">
              <PopoverHeader>
                <PopoverTitle>Top side</PopoverTitle>
                <PopoverDescription>
                  Opens above the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Right</Button>} />
            <PopoverContent side="right">
              <PopoverHeader>
                <PopoverTitle>Right side</PopoverTitle>
                <PopoverDescription>
                  Opens to the right of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline">Start</Button>} />
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>Align start</PopoverTitle>
                <PopoverDescription>
                  Aligned to the start of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline">End</Button>} />
            <PopoverContent align="end">
              <PopoverHeader>
                <PopoverTitle>Align end</PopoverTitle>
                <PopoverDescription>
                  Aligned to the end of the trigger.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Popover</code> wraps the Base UI popover root and shares open
          state with its children. <code>PopoverContent</code> renders the
          portal, positioner and popup in one component; the remaining parts are
          styled wrappers that accept <code>className</code> and their
          underlying element props.
        </DocProse>
        <PropsTable
          title="Popover"
          rows={[
            {
              prop: "open",
              type: "boolean",
              description: "Controlled open state.",
            },
            {
              prop: "defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Initial open state when uncontrolled.",
            },
            {
              prop: "onOpenChange",
              type: "(open, eventDetails) => void",
              description: "Called when the popover opens or closes.",
            },
            {
              prop: "modal",
              type: "boolean",
              defaultValue: "false",
              description:
                "When true, traps focus and blocks interaction outside the popup.",
            },
          ]}
        />
        <PropsTable
          title="PopoverContent"
          rows={[
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"',
              defaultValue: '"bottom"',
              description: "Which side of the trigger the popup opens on.",
            },
            {
              prop: "sideOffset",
              type: "number",
              defaultValue: "4",
              description: "Gap between the trigger and the popup.",
            },
            {
              prop: "align",
              type: '"start" | "center" | "end"',
              defaultValue: '"center"',
              description: "Alignment along the trigger edge.",
            },
            {
              prop: "alignOffset",
              type: "number",
              defaultValue: "0",
              description: "Extra offset along the alignment axis.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "PopoverTrigger",
              description:
                'Opens the popup (data-slot="popover-trigger"). Use the render prop to compose it onto your own element, e.g. a Button.',
            },
            {
              part: "PopoverContent",
              description:
                'Portalled popup card (data-slot="popover-content") – w-72 bg-card surface with fade/zoom/slide animations driven by data-open, data-closed and data-side.',
            },
            {
              part: "PopoverHeader",
              description:
                'Tight column for title and description (data-slot="popover-header").',
            },
            {
              part: "PopoverTitle",
              description:
                'Popup heading (data-slot="popover-title"). Wired to the popup via aria-labelledby by Base UI.',
            },
            {
              part: "PopoverDescription",
              description:
                'Supporting copy (data-slot="popover-description"). Wired to the popup via aria-describedby by Base UI.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI handles the accessibility contract: the trigger gets{" "}
          <code>aria-haspopup</code>/<code>aria-expanded</code>, the popup is
          labelled by <code>PopoverTitle</code> and described by{" "}
          <code>PopoverDescription</code>, and Escape or an outside click
          dismisses it. For styling, every part exposes a <code>data-slot</code>{" "}
          attribute, and the popup reflects its state and placement as{" "}
          <code>data-open</code>/<code>data-closed</code> and{" "}
          <code>data-side</code> – the built-in animations key off these.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
