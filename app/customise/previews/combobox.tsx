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

export default function ComboboxPreview() {
  const [chips, setChips] = React.useState<string[]>(["apple", "grape"])
  const anchorRef = useComboboxAnchor()

  return (
    <PreviewGrid>
      <PreviewCard label="Default">
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

      <PreviewCard label="Grouped">
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
        <Combobox
          multiple
          items={fruits}
          value={chips}
          onValueChange={(v: unknown) => setChips(v as string[])}
        >
          <ComboboxChips ref={anchorRef} className="w-56">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
