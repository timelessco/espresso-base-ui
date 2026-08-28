"use client"

import { Bold, ChevronDown, Italic, Minus, Plus, Underline } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
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

function buttonGroupPlaygroundCode(v: PlaygroundValues) {
  const isVertical = v.orientation === "vertical"
  const attrs = [
    isVertical ? ` orientation="vertical"` : "",
    v.size !== "default" ? ` size="${v.size}"` : "",
    v.detached ? ` detached` : "",
  ].join("")
  const button = (label: string) =>
    v.variant !== "default"
      ? `  <Button variant="${v.variant}">${label}</Button>`
      : `  <Button>${label}</Button>`
  const separator = isVertical
    ? `  <ButtonGroupSeparator orientation="horizontal" />`
    : `  <ButtonGroupSeparator />`
  const showSeparator = Boolean(v.separator) && !v.detached

  const lines = [`<ButtonGroup${attrs}>`, button("Left")]
  if (showSeparator) lines.push(separator)
  lines.push(button("Center"))
  if (showSeparator) lines.push(separator)
  lines.push(button("Right"), `</ButtonGroup>`)
  return lines.join("\n")
}

function ButtonGroupPlaygroundPreview(v: PlaygroundValues) {
  const isVertical = v.orientation === "vertical"
  const variant = v.variant as "default" | "outline" | "secondary"
  const showSeparator = Boolean(v.separator) && !v.detached
  const separator = (
    <ButtonGroupSeparator
      orientation={isVertical ? "horizontal" : "vertical"}
    />
  )

  return (
    <ButtonGroup
      orientation={isVertical ? "vertical" : "horizontal"}
      size={v.size as "sm" | "default" | "lg"}
      detached={Boolean(v.detached)}
    >
      <Button variant={variant}>Left</Button>
      {showSeparator && separator}
      <Button variant={variant}>Center</Button>
      {showSeparator && separator}
      <Button variant={variant}>Right</Button>
    </ButtonGroup>
  )
}

export default function ButtonGroupDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Button Group"
        description="Joins related buttons into one segmented control. Horizontal or vertical, in three sizes, with an optional detached spacing mode."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            variant: {
              type: "options",
              options: ["outline", "secondary", "default"],
              defaultValue: "outline",
            },
            orientation: {
              type: "options",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
            },
            size: {
              type: "options",
              options: ["sm", "default", "lg"],
              defaultValue: "default",
            },
            detached: { type: "boolean", defaultValue: false },
            separator: { type: "boolean", defaultValue: false },
          }}
          renderPreview={ButtonGroupPlaygroundPreview}
          renderCode={buttonGroupPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Put outline buttons side by side inside a <code>ButtonGroup</code> and
          they fuse into one segmented control – inner corners squared, shared
          edges collapsed.
        </DocProse>
        <DocExample
          code={`
<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="button-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"`}
        />
        <CodeBlock
          code={`
<ButtonGroup>
  <Button variant="outline">Save</Button>
  <Button variant="outline" size="icon" aria-label="More save options">
    <ChevronDown />
  </Button>
</ButtonGroup>`}
        />
      </DocSection>

      <DocSection title="With text and icons">
        <DocProse>
          Mix icon buttons with a <code>ButtonGroupText</code> insert for
          stepper- or toolbar-style controls; drop in a{" "}
          <code>ButtonGroupSeparator</code> to divide segments explicitly.
        </DocProse>
        <DocExample
          code={`
<ButtonGroup>
  <Button variant="outline" size="icon" aria-label="Decrease">
    <Minus />
  </Button>
  <ButtonGroupText className="bg-transparent">10</ButtonGroupText>
  <Button variant="outline" size="icon" aria-label="Increase">
    <Plus />
  </Button>
</ButtonGroup>

<ButtonGroup>
  <Button variant="secondary" size="icon" aria-label="Bold">
    <Bold />
  </Button>
  <ButtonGroupSeparator />
  <Button variant="secondary" size="icon" aria-label="Italic">
    <Italic />
  </Button>
  <ButtonGroupSeparator />
  <Button variant="secondary" size="icon" aria-label="Underline">
    <Underline />
  </Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Decrease">
              <Minus />
            </Button>
            <ButtonGroupText className="bg-transparent">10</ButtonGroupText>
            <Button variant="outline" size="icon" aria-label="Increase">
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary" size="icon" aria-label="Bold">
              <Bold />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="icon" aria-label="Italic">
              <Italic />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="icon" aria-label="Underline">
              <Underline />
            </Button>
          </ButtonGroup>
        </DocExample>
      </DocSection>

      <DocSection title="Vertical">
        <DocProse>
          <code>orientation="vertical"</code> stacks the segments and joins them
          along the horizontal edges instead.
        </DocProse>
        <DocExample
          code={`
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`}
        >
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> on the group overrides the height, padding and
          typography of every child button, so you size the control in one
          place.
        </DocProse>
        <DocExample
          code={`
<ButtonGroup size="sm">
  <Button variant="outline">Small</Button>
  <Button variant="outline">Group</Button>
</ButtonGroup>

<ButtonGroup size="default">
  <Button variant="outline">Default</Button>
  <Button variant="outline">Group</Button>
</ButtonGroup>

<ButtonGroup size="lg">
  <Button variant="outline">Large</Button>
  <Button variant="outline">Group</Button>
</ButtonGroup>`}
        >
          <div className="flex flex-col items-center gap-3">
            <ButtonGroup size="sm">
              <Button variant="outline">Small</Button>
              <Button variant="outline">Group</Button>
            </ButtonGroup>
            <ButtonGroup size="default">
              <Button variant="outline">Default</Button>
              <Button variant="outline">Group</Button>
            </ButtonGroup>
            <ButtonGroup size="lg">
              <Button variant="outline">Large</Button>
              <Button variant="outline">Group</Button>
            </ButtonGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Detached">
        <DocProse>
          <code>detached</code> keeps each button standalone with a size-tuned
          gap – useful for related-but-separate action rows; add{" "}
          <code>wrapLayout</code> to let a long row wrap onto multiple centered
          lines.
        </DocProse>
        <DocExample
          code={`
<ButtonGroup detached>
  <Button>Default</Button>
  <Button>Default</Button>
  <Button>Default</Button>
</ButtonGroup>

<ButtonGroup detached wrapLayout size="sm">
  <Button>Button</Button>
  <Button>Button</Button>
  <Button>Button</Button>
  <Button>Button</Button>
  <Button>Button</Button>
</ButtonGroup>`}
        >
          <div className="flex max-w-xs flex-col items-center gap-4">
            <ButtonGroup detached>
              <Button>Default</Button>
              <Button>Default</Button>
              <Button>Default</Button>
            </ButtonGroup>
            <ButtonGroup detached wrapLayout size="sm">
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
            </ButtonGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>ButtonGroup</code> styles its children purely through CSS
          selectors keyed on their <code>data-slot</code> attributes, so
          Buttons, dropdown/popover/tooltip triggers, selects and inputs all
          join seamlessly. All parts render a <code>div</code> and accept{" "}
          <code>className</code> plus standard div props.
        </DocProse>
        <PropsTable
          title="ButtonGroup"
          rows={[
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description:
                "Row or column. Controls which edges are joined and which corners stay rounded in the attached layout.",
            },
            {
              prop: "detached",
              type: "boolean",
              defaultValue: "false",
              description:
                "Skip the joined styling and space the children with a size-tuned gap instead. Buttons inside attached groups also get a stronger active state.",
            },
            {
              prop: "wrapLayout",
              type: "boolean",
              defaultValue: "false",
              description:
                "Allow the group to wrap onto multiple lines with centered rows. Pair with detached.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              defaultValue: '"default"',
              description:
                "Overrides child Button height, padding and typography (28px / native / 40px) and sets the detached gap.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "ButtonGroupText",
              description:
                'Static text cell that sits flush between segments (data-slot="button-group-text"), e.g. the value in a stepper. Renders a div; use render to swap the element.',
            },
            {
              part: "ButtonGroupSeparator",
              description:
                'Thin divider between segments (data-slot="button-group-separator"). A vertical Separator by default; set orientation="horizontal" inside vertical groups.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root renders <code>role="group"</code>, so assistive tech
          announces the buttons as one related cluster – add an{" "}
          <code>aria-label</code> when the grouping needs a name. It exposes{" "}
          <code>data-slot="button-group"</code> and reflects its props as{" "}
          <code>data-orientation</code>, <code>data-size</code>, and{" "}
          <code>data-detached</code> / <code>data-wrap</code> (present only when
          true) – Button itself reads these to adjust its radius and active
          state inside attached groups. The <code>buttonGroupVariants</code> cva
          helper is also exported for building custom grouped surfaces:
        </DocProse>
        <CodeBlock
          code={`
import { buttonGroupVariants } from "@/components/ui/button-group"

<div className={cn(buttonGroupVariants({ orientation: "vertical" }))}>
  ...
</div>`}
        />
      </DocSection>
    </DocPage>
  )
}
