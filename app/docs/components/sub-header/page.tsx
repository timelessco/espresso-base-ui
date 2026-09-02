"use client"

import {
  ArrowUpDown,
  Bold,
  ChevronDown,
  Ellipsis,
  EyeOff,
  Italic,
  ListFilter,
  Minus,
  Plus,
  Underline,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SubHeader, SubHeaderSeparator } from "@/components/ui/sub-header"
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

function subHeaderPlaygroundCode(v: PlaygroundValues) {
  const lines = ["<SubHeader"]
  if (v.leftControls) {
    lines.push(
      "  leftControls={",
      "    <>",
      '      <Button variant="secondary" size="sm">',
      '        Lead owner <ChevronDown data-icon="inline-end" />',
      "      </Button>",
      '      <Button variant="secondary" size="sm">',
      '        Status <ChevronDown data-icon="inline-end" />',
      "      </Button>",
      "    </>",
      "  }"
    )
  }
  if (v.rightControls) {
    lines.push(
      "  rightControls={",
      "    <>",
      '      <Button variant="secondary" size="sm">',
      '        <ListFilter data-icon="inline-start" /> Filter',
      "      </Button>",
      '      <Button variant="secondary" size="sm">',
      '        <ArrowUpDown data-icon="inline-start" /> Sort',
      "      </Button>",
      '      <Button variant="secondary" size="icon-sm" aria-label="More">',
      "        <Ellipsis />",
      "      </Button>",
      "    </>",
      "  }"
    )
  }
  if (lines.length === 1) return "<SubHeader />"
  lines.push("/>")
  return lines.join("\n")
}

function SubHeaderPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <SubHeader
        leftControls={
          v.leftControls ? (
            <>
              <Button variant="secondary" size="sm">
                Lead owner <ChevronDown data-icon="inline-end" />
              </Button>
              <Button variant="secondary" size="sm">
                Status <ChevronDown data-icon="inline-end" />
              </Button>
            </>
          ) : undefined
        }
        rightControls={
          v.rightControls ? (
            <>
              <Button variant="secondary" size="sm">
                <ListFilter data-icon="inline-start" /> Filter
              </Button>
              <Button variant="secondary" size="sm">
                <ArrowUpDown data-icon="inline-start" /> Sort
              </Button>
              <Button variant="secondary" size="icon-sm" aria-label="More">
                <Ellipsis />
              </Button>
            </>
          ) : undefined
        }
      />
    </div>
  )
}

export default function SubHeaderDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Sub Header"
        description="A secondary toolbar row below the Header, with left and right control slots for filters, titles, toolbars and view controls."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            leftControls: { type: "boolean", defaultValue: true },
            rightControls: { type: "boolean", defaultValue: true },
          }}
          renderPreview={SubHeaderPlaygroundPreview}
          renderCode={subHeaderPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Pass toolbar content to the <code>leftControls</code> and{" "}
          <code>rightControls</code> slots – each renders as a horizontal group
          with consistent spacing, and the right slot pins to the trailing edge.
          Unlike <code>Header</code>, there is no bottom border by default.
        </DocProse>
        <DocExample
          code={`
<SubHeader
  leftControls={
    <>
      <Button variant="secondary" size="sm">
        Lead owner <ChevronDown data-icon="inline-end" />
      </Button>
      <Button variant="secondary" size="sm">
        Status <ChevronDown data-icon="inline-end" />
      </Button>
    </>
  }
  rightControls={
    <>
      <Button variant="secondary" size="sm">
        <ListFilter data-icon="inline-start" /> Filter
      </Button>
      <Button variant="secondary" size="icon-sm" aria-label="More">
        <Ellipsis />
      </Button>
    </>
  }
/>`}
          className="p-0 sm:p-0"
        >
          <SubHeader
            className="w-full"
            leftControls={
              <>
                <Button variant="secondary" size="sm">
                  Lead owner <ChevronDown data-icon="inline-end" />
                </Button>
                <Button variant="secondary" size="sm">
                  Status <ChevronDown data-icon="inline-end" />
                </Button>
              </>
            }
            rightControls={
              <>
                <Button variant="secondary" size="sm">
                  <ListFilter data-icon="inline-start" /> Filter
                </Button>
                <Button variant="secondary" size="icon-sm" aria-label="More">
                  <Ellipsis />
                </Button>
              </>
            }
          />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="sub-header" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { SubHeader, SubHeaderSeparator } from "@/components/ui/sub-header"`}
        />
        <CodeBlock
          code={`
<SubHeader
  leftControls={<>{/* filters, title, toolbar */}</>}
  rightControls={<>{/* view controls, actions */}</>}
/>`}
        />
      </DocSection>

      <DocSection title="Toolbar with separators">
        <DocProse>
          Group related controls in the left slot and divide the groups with{" "}
          <code>SubHeaderSeparator</code> – a vertical hairline that matches the
          toolbar height.
        </DocProse>
        <DocExample
          code={`
<SubHeader
  leftControls={
    <>
      <Button variant="ghost" size="sm">
        Inter <ChevronDown data-icon="inline-end" />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Decrease size">
        <Minus />
      </Button>
      <span className="text-sm text-secondary-foreground">18</span>
      <Button variant="ghost" size="icon-sm" aria-label="Increase size">
        <Plus />
      </Button>
      <SubHeaderSeparator />
      <Button variant="ghost" size="icon-sm" aria-label="Bold">
        <Bold />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Italic">
        <Italic />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Underline">
        <Underline />
      </Button>
    </>
  }
/>`}
          className="p-0 sm:p-0"
        >
          <SubHeader
            className="w-full"
            leftControls={
              <>
                <Button variant="ghost" size="sm">
                  Inter <ChevronDown data-icon="inline-end" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Decrease size"
                >
                  <Minus />
                </Button>
                <span className="text-sm text-secondary-foreground">18</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Increase size"
                >
                  <Plus />
                </Button>
                <SubHeaderSeparator />
                <Button variant="ghost" size="icon-sm" aria-label="Bold">
                  <Bold />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Italic">
                  <Italic />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Underline">
                  <Underline />
                </Button>
              </>
            }
          />
        </DocExample>
      </DocSection>

      <DocSection title="View controls">
        <DocProse>
          The right slot pins view-level actions – column visibility, grouping,
          filtering and sorting – to the trailing edge while filters stay on the
          left.
        </DocProse>
        <DocExample
          code={`
<SubHeader
  leftControls={
    <Button variant="secondary" size="sm">
      Organization <ChevronDown data-icon="inline-end" />
    </Button>
  }
  rightControls={
    <>
      <Button variant="secondary" size="sm">
        <EyeOff data-icon="inline-start" /> Columns
      </Button>
      <Button variant="secondary" size="sm">
        <ListFilter data-icon="inline-start" /> Filter
      </Button>
      <Button variant="secondary" size="sm">
        <ArrowUpDown data-icon="inline-start" /> Sort
      </Button>
    </>
  }
/>`}
          className="p-0 sm:p-0"
        >
          <SubHeader
            className="w-full"
            leftControls={
              <Button variant="secondary" size="sm">
                Organization <ChevronDown data-icon="inline-end" />
              </Button>
            }
            rightControls={
              <>
                <Button variant="secondary" size="sm">
                  <EyeOff data-icon="inline-start" /> Columns
                </Button>
                <Button variant="secondary" size="sm">
                  <ListFilter data-icon="inline-start" /> Filter
                </Button>
                <Button variant="secondary" size="sm">
                  <ArrowUpDown data-icon="inline-start" /> Sort
                </Button>
              </>
            }
          />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>SubHeader</code> renders a <code>div</code> and accepts all div
          props; slots render only when provided. Overflowing toolbars can
          scroll by adding <code>overflow-x-auto</code> plus{" "}
          <code>shrink-0</code> on the slot children via <code>className</code>.
        </DocProse>
        <PropsTable
          title="SubHeader"
          rows={[
            {
              prop: "leftControls",
              type: "React.ReactNode",
              description:
                'Leading slot (data-slot="sub-header-left") – filters, a title or a toolbar. Flex row with an 8px gap.',
            },
            {
              prop: "rightControls",
              type: "React.ReactNode",
              description:
                'Trailing slot (data-slot="sub-header-right") pinned to the right edge – view controls and overflow actions.',
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "SubHeaderSeparator",
              description:
                'Vertical hairline divider between control groups (data-slot="sub-header-separator"). 20px tall, role="separator".',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root exposes <code>data-slot="sub-header"</code> and the slots{" "}
          <code>data-slot="sub-header-left"</code> /{" "}
          <code>data-slot="sub-header-right"</code> for CSS targeting – the
          dashboards use these to make crowded toolbars horizontally scrollable.
          The separator renders <code>role="separator"</code> with{" "}
          <code>aria-orientation="vertical"</code>; give icon-only buttons an{" "}
          <code>aria-label</code>.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
