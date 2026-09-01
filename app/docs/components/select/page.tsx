"use client"

import { Apple, Banana, Cherry, Citrus, Diamond, Grape } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

const fruits = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const vegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
]

const fruitsWithIcons = [
  { label: "Select fruit", value: null, icon: Diamond },
  { label: "Apple", value: "apple", icon: Apple },
  { label: "Banana", value: "banana", icon: Banana },
  { label: "Cherry", value: "cherry", icon: Cherry },
  { label: "Citrus", value: "citrus", icon: Citrus },
  { label: "Grape", value: "grape", icon: Grape },
]

function selectPlaygroundCode(v: PlaygroundValues) {
  const itemsName = v.icons ? "fruitsWithIcons" : "fruits"
  const attrs = [
    v.variant !== "outline" ? ` variant="${v.variant}"` : "",
    v.size !== "md" ? ` size="${v.size}"` : "",
  ].join("")
  return `<Select items={${itemsName}}>
  <SelectTrigger${attrs} className="w-48">
    <SelectValue placeholder="${v.placeholder}" />
  </SelectTrigger>
  <SelectContent>
    {${itemsName}.map((item) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`
}

function SelectPlaygroundPreview(v: PlaygroundValues) {
  const items = v.icons ? fruitsWithIcons : fruits
  return (
    <Select key={String(v.icons)} items={items}>
      <SelectTrigger
        variant={v.variant as "outline" | "subtle" | "ghost"}
        size={v.size as "xs" | "sm" | "md" | "lg"}
        className="w-48"
      >
        <SelectValue placeholder={v.placeholder as string} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function SelectDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Select"
        description="A dropdown for picking one value from a list, built on Base UI. Driven by an items array, with three trigger variants and four sizes."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            placeholder: { type: "text", defaultValue: "Select a fruit" },
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
            icons: { type: "boolean", defaultValue: false },
          }}
          renderPreview={SelectPlaygroundPreview}
          renderCode={selectPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Pass <code>items</code> (an array of <code>label / value</code>{" "}
          objects) to <code>Select</code>, then map them to{" "}
          <code>SelectItem</code>s inside <code>SelectContent</code>. An item
          with <code>value: null</code> acts as the placeholder row.
        </DocProse>
        <DocExample
          code={`
const fruits = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

<Select items={fruits}>
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      {fruits.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <Select items={fruits}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="select" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
        />
        <CodeBlock
          code={`
<Select items={items} defaultValue="apple">
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {items.map((item) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`}
        />
      </DocSection>

      <DocSection title="Items with icons">
        <DocProse>
          Add an <code>icon</code> component to any entry in the{" "}
          <code>items</code> array and it renders automatically:{" "}
          <code>SelectItem</code> looks its value up in the shared items context
          and prepends the icon, and a childless <code>SelectValue</code>{" "}
          renders the selected item's icon next to its label in the trigger.
        </DocProse>
        <DocExample
          code={`
const fruitsWithIcons = [
  { label: "Select fruit", value: null, icon: Diamond },
  { label: "Apple", value: "apple", icon: Apple },
  { label: "Banana", value: "banana", icon: Banana },
]

<Select items={fruitsWithIcons}>
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {fruitsWithIcons.map((item) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`}
        >
          <Select items={fruitsWithIcons}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruitsWithIcons.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DocExample>
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> on the trigger picks the surface:{" "}
          <code>outline</code> (bordered shadow, the default),{" "}
          <code>subtle</code> (filled secondary) and <code>ghost</code>{" "}
          (transparent until hovered).
        </DocProse>
        <DocExample
          code={`
<SelectTrigger variant="outline" className="w-48">
  <SelectValue placeholder="Outline" />
</SelectTrigger>

<SelectTrigger variant="subtle" className="w-48">
  <SelectValue placeholder="Subtle" />
</SelectTrigger>

<SelectTrigger variant="ghost" className="w-48">
  <SelectValue placeholder="Ghost" />
</SelectTrigger>`}
        >
          <Select items={fruits}>
            <SelectTrigger variant="outline" className="w-40">
              <SelectValue placeholder="Outline" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select items={fruits}>
            <SelectTrigger variant="subtle" className="w-40">
              <SelectValue placeholder="Subtle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select items={fruits}>
            <SelectTrigger variant="ghost" className="w-40">
              <SelectValue placeholder="Ghost" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> sets the trigger height and radius: <code>xs</code>{" "}
          (24px, rounded-sm), <code>sm</code> (28px, rounded-md),{" "}
          <code>md</code> (32px, rounded-md, the default) and <code>lg</code>{" "}
          (40px, rounded-lg with larger text).
        </DocProse>
        <DocExample
          code={`
<SelectTrigger size="xs" className="w-48"><SelectValue /></SelectTrigger>
<SelectTrigger size="sm" className="w-48"><SelectValue /></SelectTrigger>
<SelectTrigger size="md" className="w-48"><SelectValue /></SelectTrigger>
<SelectTrigger size="lg" className="w-48"><SelectValue /></SelectTrigger>`}
        >
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <Select key={size} items={fruits}>
              <SelectTrigger size={size} className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {fruits.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ))}
        </DocExample>
      </DocSection>

      <DocSection title="Groups">
        <DocProse>
          Wrap related items in <code>SelectGroup</code> with a{" "}
          <code>SelectLabel</code>, and divide groups with{" "}
          <code>SelectSeparator</code>. Long lists scroll, with gradient scroll
          arrows built into the popup.
        </DocProse>
        <DocExample
          code={`
<Select items={[...fruits, ...vegetables]}>
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      {fruits.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      {vegetables.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <Select items={[...fruits, ...vegetables]}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruits
                  .filter((f) => f.value !== null)
                  .map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                {vegetables.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Select</code> wraps the Base UI select root and shares the{" "}
          <code>items</code> array with its descendants via context – that is
          what powers automatic labels and icons. Each item is{" "}
          <code>
            &#123; label: string; value: string | null; icon?: Component &#125;
          </code>
          .
        </DocProse>
        <PropsTable
          title="Select"
          rows={[
            {
              prop: "items",
              type: "SelectOption[]",
              description:
                "Option list shared via context; used by SelectValue and SelectItem to resolve labels and icons.",
            },
            {
              prop: "value",
              type: "string | null",
              description: "Controlled selected value.",
            },
            {
              prop: "defaultValue",
              type: "string | null",
              description: "Initially selected value when uncontrolled.",
            },
            {
              prop: "onValueChange",
              type: "(value, eventDetails) => void",
              description: "Called when the selection changes.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the whole select.",
            },
            {
              prop: "name",
              type: "string",
              description:
                "Name submitted with the owning form (renders a hidden input).",
            },
          ]}
        />
        <PropsTable
          title="SelectTrigger"
          rows={[
            {
              prop: "variant",
              type: '"outline" | "subtle" | "ghost"',
              defaultValue: '"outline"',
              description:
                "Trigger surface – bordered shadow, filled secondary, or transparent.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Trigger height (24 / 28 / 32 / 40px) and radius (sm / md / md / lg).",
            },
            {
              prop: "suffix",
              type: "React.ReactElement",
              defaultValue: "<ChevronDownIcon />",
              description:
                "Custom trailing icon rendered through the select's Icon slot.",
            },
          ]}
        />
        <PropsTable
          title="SelectContent"
          rows={[
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"',
              defaultValue: '"bottom"',
              description: "Side of the trigger the popup opens on.",
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
            {
              prop: "alignItemWithTrigger",
              type: "boolean",
              defaultValue: "true",
              description:
                "Overlaps the popup so the selected item lines up with the trigger (native-select style). Set false for plain dropdown positioning with slide animations.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "SelectValue",
              description:
                'Selected-value display inside the trigger (data-slot="select-value"). With no children and an items array, renders the selected item\'s icon and label; accepts a placeholder prop.',
            },
            {
              part: "SelectGroup",
              description:
                'Groups related items (data-slot="select-group") for labelling.',
            },
            {
              part: "SelectLabel",
              description:
                'Non-interactive group heading (data-slot="select-label").',
            },
            {
              part: "SelectItem",
              description:
                'A selectable option (data-slot="select-item"). Auto-prepends the matching items-array icon and shows a check indicator when selected. Supports disabled.',
            },
            {
              part: "SelectSeparator",
              description:
                'Thin divider between groups (data-slot="select-separator").',
            },
            {
              part: "SelectScrollUpButton / SelectScrollDownButton",
              description:
                'Gradient scroll arrows pinned to the popup edges (data-slot="select-scroll-up-button" / "select-scroll-down-button"); rendered automatically by SelectContent.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI provides the combobox/listbox semantics, typeahead and full
          keyboard navigation, plus a hidden input for form submission. The
          trigger reflects <code>data-variant</code>, <code>data-size</code>,{" "}
          <code>data-placeholder</code> and <code>data-disabled</code>, and
          styles <code>data-invalid</code>/<code>data-valid</code> with error
          and success outlines – it also inherits invalid styling from a
          surrounding <code>Field data-invalid="true"</code>. Items expose{" "}
          <code>data-highlighted</code> and <code>data-disabled</code>, and
          every part carries a <code>data-slot</code> attribute for CSS
          targeting.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
