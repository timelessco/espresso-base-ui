"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
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

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Orange", value: "orange" },
]

const vegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Spinach", value: "spinach" },
]

function FruitItems() {
  return (
    <ComboboxCollection>
      {(item: { label: string; value: string }) => (
        <ComboboxItem key={item.value} value={item.value}>
          {item.label}
        </ComboboxItem>
      )}
    </ComboboxCollection>
  )
}

function ChipsDemo() {
  const [value, setValue] = React.useState<string[]>(["apple", "cherry"])
  const anchorRef = useComboboxAnchor()
  return (
    <Combobox
      multiple
      items={fruits}
      value={value}
      onValueChange={(v: unknown) => setValue(v as string[])}
    >
      <ComboboxChips ref={anchorRef}>
        {value.map((v) => {
          const item = fruits.find((f) => f.value === v)
          return (
            <ComboboxChip key={v}>
              <ComboboxValue>{item?.label ?? v}</ComboboxValue>
            </ComboboxChip>
          )
        })}
        <ComboboxChipsInput placeholder="Add fruits..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchorRef}>
        <ComboboxList>
          <FruitItems />
        </ComboboxList>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}

export default function ComboboxDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Combobox"
        description="An autocomplete input that filters a popup list as you type, built on Base UI. Single or multiple selection, with a chips layout for multi-select."
      />

      <DocSection title="Preview">
        <DocProse>
          Pass <code>items</code> to the root, an <code>ComboboxInput</code> to
          type into, and a <code>ComboboxContent</code> popup with a{" "}
          <code>ComboboxCollection</code> render function for the filtered
          items.
        </DocProse>
        <DocExample
          code={`
const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
]

<Combobox items={fruits}>
  <ComboboxInput placeholder="Pick a fruit..." />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxCollection>
        {(item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxCollection>
    </ComboboxList>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`}
        >
          <div className="w-full max-w-60">
            <Combobox items={fruits}>
              <ComboboxInput placeholder="Pick a fruit..." />
              <ComboboxContent>
                <ComboboxList>
                  <FruitItems />
                </ComboboxList>
                <ComboboxEmpty>No results found.</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="combobox" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"`}
        />
        <CodeBlock
          code={`
<Combobox items={items}>
  <ComboboxInput placeholder="Search..." />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxCollection>
        {(item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxCollection>
    </ComboboxList>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> on the root styles the input surface:{" "}
          <code>outline</code> (default, raised background with shadow),{" "}
          <code>subtle</code> (filled secondary surface) and <code>ghost</code>{" "}
          (transparent until focused).
        </DocProse>
        <DocExample
          code={`
<Combobox variant="outline" items={fruits}>...</Combobox>
<Combobox variant="subtle" items={fruits}>...</Combobox>
<Combobox variant="ghost" items={fruits}>...</Combobox>`}
        >
          <div className="flex w-full max-w-60 flex-col gap-3">
            {(["outline", "subtle", "ghost"] as const).map((variant) => (
              <Combobox key={variant} variant={variant} items={fruits}>
                <ComboboxInput placeholder={variant} />
                <ComboboxContent>
                  <ComboboxList>
                    <FruitItems />
                  </ComboboxList>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            ))}
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> on the root scales the input, the popup radius and
          the item density: <code>xs</code>, <code>sm</code>, <code>md</code>{" "}
          (default) and <code>lg</code>.
        </DocProse>
        <DocExample
          code={`
<Combobox size="xs" items={fruits}>...</Combobox>
<Combobox size="sm" items={fruits}>...</Combobox>
<Combobox size="md" items={fruits}>...</Combobox>
<Combobox size="lg" items={fruits}>...</Combobox>`}
        >
          <div className="flex w-full max-w-60 flex-col gap-3">
            {(["xs", "sm", "md", "lg"] as const).map((size) => (
              <Combobox key={size} size={size} items={fruits}>
                <ComboboxInput placeholder={size} />
                <ComboboxContent>
                  <ComboboxList>
                    <FruitItems />
                  </ComboboxList>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            ))}
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Grouped items">
        <DocProse>
          Wrap items in <code>ComboboxGroup</code> with a{" "}
          <code>ComboboxLabel</code> heading, and divide groups with{" "}
          <code>ComboboxSeparator</code>.
        </DocProse>
        <DocExample
          code={`
<Combobox>
  <ComboboxInput placeholder="Search produce..." />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxGroup>
        <ComboboxLabel>Fruits</ComboboxLabel>
        <ComboboxItem value="apple">Apple</ComboboxItem>
        <ComboboxItem value="banana">Banana</ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup>
        <ComboboxLabel>Vegetables</ComboboxLabel>
        <ComboboxItem value="carrot">Carrot</ComboboxItem>
        <ComboboxItem value="spinach">Spinach</ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`}
        >
          <div className="w-full max-w-60">
            <Combobox>
              <ComboboxInput placeholder="Search produce..." />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxGroup>
                    <ComboboxLabel>Fruits</ComboboxLabel>
                    {fruits.slice(0, 3).map((item) => (
                      <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxGroup>
                  <ComboboxSeparator />
                  <ComboboxGroup>
                    <ComboboxLabel>Vegetables</ComboboxLabel>
                    {vegetables.map((item) => (
                      <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxGroup>
                </ComboboxList>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Multi-select chips">
        <DocProse>
          With <code>multiple</code>, render the selection as removable chips:{" "}
          <code>ComboboxChips</code> wraps <code>ComboboxChip</code> entries and
          a <code>ComboboxChipsInput</code>. Use the exported{" "}
          <code>useComboboxAnchor</code> ref so the popup anchors to the whole
          chips container instead of the inline input.
        </DocProse>
        <DocExample
          code={`
const [value, setValue] = React.useState(["apple", "cherry"])
const anchorRef = useComboboxAnchor()

<Combobox multiple items={fruits} value={value} onValueChange={setValue}>
  <ComboboxChips ref={anchorRef}>
    {value.map((v) => (
      <ComboboxChip key={v}>
        <ComboboxValue>{v}</ComboboxValue>
      </ComboboxChip>
    ))}
    <ComboboxChipsInput placeholder="Add fruits..." />
  </ComboboxChips>
  <ComboboxContent anchor={anchorRef}>
    <ComboboxList>...</ComboboxList>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`}
        >
          <div className="w-full max-w-sm">
            <ChipsDemo />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Combobox</code> wraps the Base UI Combobox root and shares its{" "}
          <code>variant</code> and <code>size</code> with every part via
          context. The root also accepts all Base UI root props –{" "}
          <code>items</code>, <code>value</code>, <code>defaultValue</code>,{" "}
          <code>onValueChange</code>, <code>multiple</code>,{" "}
          <code>disabled</code>, <code>itemToStringLabel</code> and friends.
        </DocProse>
        <PropsTable
          title="Combobox"
          rows={[
            {
              prop: "variant",
              type: '"outline" | "subtle" | "ghost"',
              defaultValue: '"outline"',
              description:
                "Input surface style, shared with all parts via context.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Scales the input, popup radius, item density and chips.",
            },
            {
              prop: "items",
              type: "TItem[]",
              description:
                "Options to filter as the user types. Objects with label/value work with the default filtering.",
            },
            {
              prop: "multiple",
              type: "boolean",
              defaultValue: "false",
              description:
                "Allow selecting several values; pair with the chips layout.",
            },
            {
              prop: "value / onValueChange",
              type: "TItemValue | TItemValue[]",
              description: "Controlled selection and its change handler.",
            },
          ]}
        />
        <PropsTable
          title="ComboboxInput"
          rows={[
            {
              prop: "showTrigger",
              type: "boolean",
              defaultValue: "true",
              description:
                "Show the chevron button that opens the popup at the trailing edge.",
            },
            {
              prop: "showClear",
              type: "boolean",
              defaultValue: "false",
              description:
                "Show a clear button that resets the selection. When visible it replaces the trigger chevron.",
            },
          ]}
        />
        <PropsTable
          title="ComboboxContent"
          rows={[
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              defaultValue: '"bottom"',
              description: "Which side of the anchor the popup opens on.",
            },
            {
              prop: "sideOffset",
              type: "number",
              defaultValue: "6",
              description: "Gap between the anchor and the popup.",
            },
            {
              prop: "align",
              type: '"start" | "center" | "end"',
              defaultValue: '"start"',
              description: "Alignment against the anchor.",
            },
            {
              prop: "alignOffset",
              type: "number",
              defaultValue: "0",
              description: "Offset along the alignment axis.",
            },
            {
              prop: "anchor",
              type: "React.RefObject<HTMLElement>",
              description:
                "Custom anchor element – pass the useComboboxAnchor ref to anchor the popup to a ComboboxChips container.",
            },
          ]}
        />
        <PropsTable
          title="ComboboxChip"
          rows={[
            {
              prop: "showRemove",
              type: "boolean",
              defaultValue: "true",
              description:
                "Render the small remove (x) button inside the chip.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "ComboboxInput",
              description:
                "Single-select text input rendered inside an InputGroup, with a built-in trigger chevron and optional clear button.",
            },
            {
              part: "ComboboxContent",
              description:
                'Portalled popup (data-slot="combobox-content") sized to the anchor width, with open/close animations.',
            },
            {
              part: "ComboboxList",
              description:
                'Scrollable option list (data-slot="combobox-list") with scroll fade and max height.',
            },
            {
              part: "ComboboxItem",
              description:
                'Selectable option (data-slot="combobox-item") with highlight styles and a trailing check indicator when selected.',
            },
            {
              part: "ComboboxCollection",
              description:
                'Render-function wrapper (data-slot="combobox-collection") that maps the filtered items to elements.',
            },
            {
              part: "ComboboxGroup / ComboboxLabel",
              description:
                'Option group (data-slot="combobox-group") with a small heading (data-slot="combobox-label").',
            },
            {
              part: "ComboboxSeparator",
              description:
                'Thin divider between groups (data-slot="combobox-separator").',
            },
            {
              part: "ComboboxEmpty",
              description:
                'Message shown when no items match the query (data-slot="combobox-empty").',
            },
            {
              part: "ComboboxChips / ComboboxChip / ComboboxChipsInput",
              description:
                'Multi-select layout: chips container (data-slot="combobox-chips"), a removable chip per value (data-slot="combobox-chip", remove button data-slot="combobox-chip-remove") and the inline input (data-slot="combobox-chip-input").',
            },
            {
              part: "ComboboxTrigger",
              description:
                'Standalone popup trigger with a chevron icon (data-slot="combobox-trigger"), used internally by ComboboxInput.',
            },
            {
              part: "ComboboxValue",
              description:
                'Renders the selected value label (data-slot="combobox-value"), e.g. inside a chip.',
            },
            {
              part: "useComboboxAnchor",
              description:
                "Convenience hook returning a ref to share between ComboboxChips and ComboboxContent anchor.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI wires up the full combobox ARIA pattern – the input gets{" "}
          <code>role="combobox"</code> with <code>aria-expanded</code>, the
          popup is a listbox whose options report <code>aria-selected</code>,
          and arrow keys, Enter and Escape work out of the box. Every part
          exposes a <code>data-slot</code> attribute (see the parts table
          above), variant-aware parts also reflect <code>data-variant</code> and{" "}
          <code>data-size</code>, and the popup carries Base UI state attributes
          like <code>data-open</code> and <code>data-side</code> – target these
          from CSS for app-level overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
