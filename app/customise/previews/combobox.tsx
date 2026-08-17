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
import { PreviewCard, PreviewGrid } from "./preview-card"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Orange", value: "orange" },
  { label: "Strawberry", value: "strawberry" },
]

const fruitsWithIcons = [
  { label: "Apple", value: "apple", icon: Apple },
  { label: "Banana", value: "banana", icon: Banana },
  { label: "Cherry", value: "cherry", icon: Cherry },
  { label: "Citrus", value: "citrus", icon: Citrus },
  { label: "Grape", value: "grape", icon: Grape },
]

const vegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
]

const timezones = [
  { label: "Eastern Standard Time (EST)", value: "est" },
  { label: "Central Standard Time (CST)", value: "cst" },
  { label: "Mountain Standard Time (MST)", value: "mst" },
  { label: "Pacific Standard Time (PST)", value: "pst" },
  { label: "Greenwich Mean Time (GMT)", value: "gmt" },
]

function ChipsSizeExample({ size }: { size: "xs" | "sm" | "md" | "lg" }) {
  const [value, setValue] = React.useState<string[]>([])
  const anchorRef = useComboboxAnchor()
  return (
    <Combobox
      variant="outline"
      size={size}
      multiple
      items={fruits}
      value={value}
      onValueChange={(v: unknown) => setValue(v as string[])}
    >
      <ComboboxChips ref={anchorRef} className="w-56">
        {value.map((v) => {
          const item = fruits.find((f) => f.value === v)
          return (
            <ComboboxChip key={v}>
              <ComboboxValue>{item?.label ?? v}</ComboboxValue>
            </ComboboxChip>
          )
        })}
        <ComboboxChipsInput placeholder={`Add fruits (${size})...`} />
      </ComboboxChips>
      <ComboboxContent anchor={anchorRef}>
        <ComboboxList>
          <ComboboxCollection>
            {(item: { label: string; value: string }) => (
              <ComboboxItem key={item.value} value={item.value}>
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

export default function ComboboxPreview() {
  const [singleValue, setSingleValue] = React.useState<string | null>(null)
  const [chips, setChips] = React.useState<string[]>(["apple", "grape"])
  const anchorRef = useComboboxAnchor()

  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <Combobox items={fruits}>
          <ComboboxInput placeholder="Pick a fruit..." className="w-56" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: { label: string; value: string }) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-56 flex-col gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <Combobox key={size} size={size} items={fruits}>
              <ComboboxInput placeholder={`Size ${size}...`} />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxCollection>
                    {(item: { label: string; value: string }) => (
                      <ComboboxItem key={item.value} value={item.value}>
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
      </PreviewCard>

      <PreviewCard label="Variants">
        <div className="flex w-56 flex-col gap-3">
          {(["outline", "subtle", "ghost"] as const).map((variant) => (
            <Combobox key={variant} variant={variant} items={fruits}>
              <ComboboxInput placeholder={`${variant}...`} />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxCollection>
                    {(item: { label: string; value: string }) => (
                      <ComboboxItem key={item.value} value={item.value}>
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
      </PreviewCard>

      <PreviewCard label="With icons">
        <Combobox items={fruitsWithIcons}>
          <ComboboxInput placeholder="Pick a fruit..." className="w-56" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: {
                  label: string
                  value: string
                  icon: React.ComponentType<{ className?: string }>
                }) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    <item.icon className="size-4" />
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </PreviewCard>

      <PreviewCard label="Controlled with clear button">
        <div className="flex w-56 flex-col gap-2">
          <Combobox
            items={timezones.map((t) => t.value)}
            itemToStringLabel={(v: unknown) =>
              timezones.find((t) => t.value === (v as string))?.label ?? ""
            }
            value={singleValue ?? ""}
            onValueChange={(v: unknown) => setSingleValue(v as string)}
          >
            <ComboboxInput
              placeholder="Search timezones..."
              showClear={!!singleValue}
              showTrigger={!singleValue}
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxCollection>
                  {(value: unknown) => {
                    const v = value as string
                    const item = timezones.find((t) => t.value === v)
                    return (
                      <ComboboxItem key={v} value={v}>
                        {item?.label ?? v}
                      </ComboboxItem>
                    )
                  }}
                </ComboboxCollection>
              </ComboboxList>
              <ComboboxEmpty>No timezones found.</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
          <p className="text-sm text-muted-foreground">
            Selected:{" "}
            <span className="font-medium">{singleValue ?? "none"}</span>
          </p>
        </div>
      </PreviewCard>

      <PreviewCard label="Grouped with labels">
        <Combobox>
          <ComboboxInput placeholder="Search produce..." className="w-56" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Fruits</ComboboxLabel>
                {fruits.slice(0, 4).map((item) => (
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
      </PreviewCard>

      <PreviewCard label="Multi-select chips">
        <div className="flex w-56 flex-col gap-2">
          <Combobox
            variant="outline"
            multiple
            items={fruits}
            value={chips}
            onValueChange={(v: unknown) => setChips(v as string[])}
          >
            <ComboboxChips ref={anchorRef}>
              {chips.map((v) => {
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
                <ComboboxCollection>
                  {(item: { label: string; value: string }) => (
                    <ComboboxItem key={item.value} value={item.value}>
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
              {chips.length ? chips.join(", ") : "none"}
            </span>
          </p>
        </div>
      </PreviewCard>

      <PreviewCard label="Multi-select chips — sizes">
        <div className="flex w-56 flex-col gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <ChipsSizeExample key={size} size={size} />
          ))}
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
