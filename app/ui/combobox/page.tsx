"use client"

import * as React from "react"
import { Apple, Banana, Cherry, Citrus, Grape } from "lucide-react"
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
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

// Items pass the whole { value, label } object as the ComboboxItem value –
// Base UI displays `label` in the input and submits `value` automatically.
type Produce = { label: string; value: string }

function ChipsSizeExample({ size }: { size: "xs" | "sm" | "md" | "lg" }) {
  const [value, setValue] = React.useState<Produce[]>([])
  const anchorRef = useComboboxAnchor()
  return (
    <Combobox
      variant="outline"
      size={size}
      multiple
      items={fruits}
      value={value}
      onValueChange={(v: unknown) => setValue(v as Produce[])}
    >
      <ComboboxChips ref={anchorRef}>
        {value.map((item) => (
          <ComboboxChip key={item.value}>
            <ComboboxValue>{item.label}</ComboboxValue>
          </ComboboxChip>
        ))}
        <ComboboxChipsInput placeholder={`Add fruits (${size})...`} />
      </ComboboxChips>
      <ComboboxContent anchor={anchorRef}>
        <ComboboxList>
          <ComboboxCollection>
            {(item: Produce) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxList>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}

const fruits: Produce[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Mango", value: "mango" },
  { label: "Orange", value: "orange" },
  { label: "Pear", value: "pear" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Watermelon", value: "watermelon" },
]

const fruitsWithIcons = [
  { label: "Apple", value: "apple", icon: Apple },
  { label: "Banana", value: "banana", icon: Banana },
  { label: "Cherry", value: "cherry", icon: Cherry },
  { label: "Citrus", value: "citrus", icon: Citrus },
  { label: "Grape", value: "grape", icon: Grape },
]

const vegetables: Produce[] = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
  { label: "Kale", value: "kale" },
]

const recents: Produce[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
]

const timezones: Produce[] = [
  { label: "Eastern Standard Time (EST)", value: "est" },
  { label: "Central Standard Time (CST)", value: "cst" },
  { label: "Mountain Standard Time (MST)", value: "mst" },
  { label: "Pacific Standard Time (PST)", value: "pst" },
  { label: "Greenwich Mean Time (GMT)", value: "gmt" },
  { label: "Central European Time (CET)", value: "cet" },
  { label: "Eastern European Time (EET)", value: "eet" },
  { label: "Indian Standard Time (IST)", value: "ist" },
  { label: "China Standard Time (CST-CN)", value: "cst-cn" },
  { label: "Japan Standard Time (JST)", value: "jst" },
  { label: "Australian Eastern Time (AET)", value: "aet" },
]

export default function ComboboxPage() {
  const [singleValue, setSingleValue] = React.useState<Produce | null>(null)
  const [chipsValue, setChipsValue] = React.useState<Produce[]>([])
  const [chipsSubtleValue, setChipsSubtleValue] = React.useState<Produce[]>([])
  const [chipsGhostValue, setChipsGhostValue] = React.useState<Produce[]>([])
  const anchorRef = useComboboxAnchor()
  const anchorSubtleRef = useComboboxAnchor()
  const anchorGhostRef = useComboboxAnchor()

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <Combobox items={fruits}>
          <ComboboxInput placeholder="Pick a fruit..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Sizes */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <Combobox key={size} size={size} items={fruits}>
            <ComboboxInput placeholder={`Size ${size}...`} />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxCollection>
                  {(item: Produce) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxList>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ))}
      </div>

      {/* Outline variant (default) */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Outline (default)</SectionTitle>
        <Combobox variant="outline" items={fruits}>
          <ComboboxInput placeholder="Pick a fruit..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Subtle variant */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Subtle</SectionTitle>
        <Combobox variant="subtle" items={fruits}>
          <ComboboxInput placeholder="Pick a fruit..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Ghost variant */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Ghost</SectionTitle>
        <Combobox variant="ghost" items={fruits}>
          <ComboboxInput placeholder="Pick a fruit..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* With Icons */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>With Icons</SectionTitle>
        <Combobox items={fruitsWithIcons}>
          <ComboboxInput placeholder="Pick a fruit..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: {
                  label: string
                  value: string
                  icon: React.ComponentType<{ className?: string }>
                }) => (
                  <ComboboxItem key={item.value} value={item}>
                    <item.icon className="size-4" />
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Controlled with Clear Button */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Controlled with Clear Button</SectionTitle>
        <Combobox
          items={timezones}
          value={singleValue}
          onValueChange={(v: unknown) => setSingleValue(v as Produce | null)}
        >
          <ComboboxInput
            placeholder="Search timezones..."
            showClear={!!singleValue}
            showTrigger={!singleValue}
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No timezones found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium">{singleValue?.value ?? "none"}</span>
        </p>
      </div>

      {/* Grouped with Labels and Separator */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Grouped with Labels</SectionTitle>
        <Combobox>
          <ComboboxInput placeholder="Search produce..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Fruits</ComboboxLabel>
                {fruits.slice(0, 5).map((item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxLabel>Vegetables</ComboboxLabel>
                {vegetables.map((item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Recent + All sections */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Recents Section</SectionTitle>
        <Combobox>
          <ComboboxInput placeholder="Pick a fruit..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Recent</ComboboxLabel>
                {recents.map((item) => (
                  <ComboboxItem key={`recent-${item.value}`} value={item}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxLabel>All fruits</ComboboxLabel>
                {fruits.map((item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Disabled */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <Combobox items={fruits} disabled>
          <ComboboxInput placeholder="Disabled..." disabled />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Multi-select with Chips — Outline */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Multi-select Chips — Outline</SectionTitle>
        <Combobox
          variant="outline"
          multiple
          items={fruits}
          value={chipsValue}
          onValueChange={(v: unknown) => setChipsValue(v as Produce[])}
        >
          <ComboboxChips ref={anchorRef}>
            {chipsValue.map((item) => (
              <ComboboxChip key={item.value}>
                <ComboboxValue>{item.label}</ComboboxValue>
              </ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Add fruits..." />
          </ComboboxChips>
          <ComboboxContent anchor={anchorRef}>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium">
            {chipsValue.length
              ? chipsValue.map((i) => i.value).join(", ")
              : "none"}
          </span>
        </p>
      </div>

      {/* Multi-select with Chips — Subtle */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Multi-select Chips — Subtle</SectionTitle>
        <Combobox
          variant="subtle"
          multiple
          items={fruits}
          value={chipsSubtleValue}
          onValueChange={(v: unknown) => setChipsSubtleValue(v as Produce[])}
        >
          <ComboboxChips ref={anchorSubtleRef}>
            {chipsSubtleValue.map((item) => (
              <ComboboxChip key={item.value}>
                <ComboboxValue>{item.label}</ComboboxValue>
              </ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Add fruits..." />
          </ComboboxChips>
          <ComboboxContent anchor={anchorSubtleRef}>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium">
            {chipsSubtleValue.length
              ? chipsSubtleValue.map((i) => i.value).join(", ")
              : "none"}
          </span>
        </p>
      </div>

      {/* Multi-select with Chips — Ghost */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Multi-select Chips — Ghost</SectionTitle>
        <Combobox
          variant="ghost"
          multiple
          items={fruits}
          value={chipsGhostValue}
          onValueChange={(v: unknown) => setChipsGhostValue(v as Produce[])}
        >
          <ComboboxChips ref={anchorGhostRef}>
            {chipsGhostValue.map((item) => (
              <ComboboxChip key={item.value}>
                <ComboboxValue>{item.label}</ComboboxValue>
              </ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Add fruits..." />
          </ComboboxChips>
          <ComboboxContent anchor={anchorGhostRef}>
            <ComboboxList>
              <ComboboxCollection>
                {(item: Produce) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium">
            {chipsGhostValue.length
              ? chipsGhostValue.map((i) => i.value).join(", ")
              : "none"}
          </span>
        </p>
      </div>

      {/* Multi-select with Chips — Sizes */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Multi-select Chips — Sizes</SectionTitle>
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <ChipsSizeExample key={size} size={size} />
        ))}
      </div>

      {/* In a Field with label + description */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>In a Field</SectionTitle>
        <Field>
          <FieldLabel>Favorite fruit</FieldLabel>
          <Combobox items={fruits}>
            <ComboboxInput placeholder="Search..." />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxCollection>
                  {(item: Produce) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxList>
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>
            Pick the fruit you would eat every day.
          </FieldDescription>
        </Field>
      </div>

      {/* Invalid Field */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Invalid Field</SectionTitle>
        <Field data-invalid="true">
          <FieldLabel>Required selection</FieldLabel>
          <Combobox items={fruits}>
            <ComboboxInput placeholder="Pick one..." />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxCollection>
                  {(item: Produce) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxList>
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
          <FieldError>This field is required.</FieldError>
        </Field>
      </div>
    </div>
  )
}
