"use client"

import {
  ArrowUpDown,
  Bold,
  Ellipsis,
  EyeOff,
  Italic,
  ListFilter,
  Minus,
  Plus,
  Underline,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

const leadOwnerItems = [
  { label: "Alicia Kim", value: "alicia" },
  { label: "Marcus Reid", value: "marcus" },
  { label: "Priya Patel", value: "priya" },
]

const statusItems = [
  { label: "Open", value: "open" },
  { label: "In progress", value: "in-progress" },
  { label: "Won", value: "won" },
]

const organizationItems = [
  { label: "Acme Inc", value: "acme" },
  { label: "Globex", value: "globex" },
  { label: "Initech", value: "initech" },
]

const fontItems = [
  { label: "Inter", value: "inter" },
  { label: "Geist", value: "geist" },
  { label: "SF Pro", value: "sf-pro" },
]

type ToolbarSelectProps = {
  items: { label: string; value: string }[]
  defaultValue: string
  variant?: React.ComponentProps<typeof SelectTrigger>["variant"]
}

function ToolbarSelect({
  items,
  defaultValue,
  variant = "subtle",
}: ToolbarSelectProps) {
  return (
    <Select items={items} defaultValue={defaultValue}>
      <SelectTrigger variant={variant} size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="secondary" size="icon-sm" aria-label="More" />}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem>Import</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const selectSnippet = (
  itemsName: string,
  defaultValue: string,
  indent: string
) =>
  [
    `${indent}<Select items={${itemsName}} defaultValue="${defaultValue}">`,
    `${indent}  <SelectTrigger variant="subtle" size="sm">`,
    `${indent}    <SelectValue />`,
    `${indent}  </SelectTrigger>`,
    `${indent}  <SelectContent>`,
    `${indent}    <SelectGroup>`,
    `${indent}      {${itemsName}.map((item) => (`,
    `${indent}        <SelectItem key={item.value} value={item.value}>`,
    `${indent}          {item.label}`,
    `${indent}        </SelectItem>`,
    `${indent}      ))}`,
    `${indent}    </SelectGroup>`,
    `${indent}  </SelectContent>`,
    `${indent}</Select>`,
  ].join("\n")

function subHeaderPlaygroundCode(v: PlaygroundValues) {
  const lines = ["<SubHeader"]
  if (v.leftControls) {
    lines.push(
      "  leftControls={",
      "    <>",
      selectSnippet("leadOwnerItems", "alicia", "      "),
      selectSnippet("statusItems", "open", "      "),
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
      "      <DropdownMenu>",
      "        <DropdownMenuTrigger",
      "          render={",
      '            <Button variant="secondary" size="icon-sm" aria-label="More" />',
      "          }",
      "        >",
      "          <Ellipsis />",
      "        </DropdownMenuTrigger>",
      '        <DropdownMenuContent align="end">',
      "          <DropdownMenuItem>Import</DropdownMenuItem>",
      "          <DropdownMenuItem>Export</DropdownMenuItem>",
      "          <DropdownMenuItem>Settings</DropdownMenuItem>",
      "        </DropdownMenuContent>",
      "      </DropdownMenu>",
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
              <ToolbarSelect items={leadOwnerItems} defaultValue="alicia" />
              <ToolbarSelect items={statusItems} defaultValue="open" />
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
              <MoreMenu />
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
${selectSnippet("leadOwnerItems", "alicia", "      ")}
${selectSnippet("statusItems", "open", "      ")}
    </>
  }
  rightControls={
    <>
      <Button variant="secondary" size="sm">
        <ListFilter data-icon="inline-start" /> Filter
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="secondary" size="icon-sm" aria-label="More" />
          }
        >
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Import</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  }
/>`}
          className="p-0 sm:p-0"
        >
          <SubHeader
            className="w-full"
            leftControls={
              <>
                <ToolbarSelect items={leadOwnerItems} defaultValue="alicia" />
                <ToolbarSelect items={statusItems} defaultValue="open" />
              </>
            }
            rightControls={
              <>
                <Button variant="secondary" size="sm">
                  <ListFilter data-icon="inline-start" /> Filter
                </Button>
                <MoreMenu />
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
      <Select items={fontItems} defaultValue="inter">
        <SelectTrigger variant="ghost" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{/* font items */}</SelectContent>
      </Select>
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
                <ToolbarSelect
                  items={fontItems}
                  defaultValue="inter"
                  variant="ghost"
                />
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
    <Select items={organizationItems} defaultValue="acme">
      <SelectTrigger variant="subtle" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>{/* organization items */}</SelectContent>
    </Select>
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
              <ToolbarSelect items={organizationItems} defaultValue="acme" />
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
          The root exposes <code>data-slot=&quot;sub-header&quot;</code> and the
          slots <code>data-slot=&quot;sub-header-left&quot;</code> /{" "}
          <code>data-slot=&quot;sub-header-right&quot;</code> for CSS targeting
          – the dashboards use these to make crowded toolbars horizontally
          scrollable. The separator renders{" "}
          <code>role=&quot;separator&quot;</code> with{" "}
          <code>aria-orientation=&quot;vertical&quot;</code>; give icon-only
          buttons an <code>aria-label</code>.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
