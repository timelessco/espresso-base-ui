"use client"

import * as React from "react"
import { Apple, Banana, Cherry, Citrus, Diamond, Grape, ChevronsUpDown } from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
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
import { Field } from "@/components/ui/field"

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
  { label: "Kale", value: "kale" },
]

const fruitsWithIcons = [
  { label: "Select fruit", value: null, icon: Diamond },
  { label: "Apple", value: "apple", icon: Apple },
  { label: "Banana", value: "banana", icon: Banana },
  { label: "Cherry", value: "cherry", icon: Cherry },
  { label: "Citrus", value: "citrus", icon: Citrus },
  { label: "Grape", value: "grape", icon: Grape },
]

function FruitItems() {
  return (
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      {fruits.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  )
}

export default function SelectPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        {(["outline", "subtle", "ghost"] as const).map((variant) => (
          <Select key={variant} items={fruits}>
            <SelectTrigger variant={variant} className="w-40">
              <SelectValue placeholder={variant} />
            </SelectTrigger>
            <SelectContent>
              <FruitItems />
            </SelectContent>
          </Select>
        ))}
      </PreviewCard>

      <PreviewCard label="Sizes">
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <Select key={size} items={fruits} defaultValue="apple">
            <SelectTrigger size={size} className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <FruitItems />
            </SelectContent>
          </Select>
        ))}
      </PreviewCard>

      <PreviewCard label="With icons">
        <Select items={fruitsWithIcons} defaultValue="apple">
          <SelectTrigger className="w-48" suffix={<ChevronsUpDown />}>
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
      </PreviewCard>

      <PreviewCard label="With groups">
        <Select items={[...fruits, ...vegetables]}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select an item" />
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
      </PreviewCard>

      <PreviewCard label="States">
        <Select items={fruits} defaultValue="apple">
          <SelectTrigger data-valid="true" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <FruitItems />
          </SelectContent>
        </Select>
        <Field data-invalid="true">
          <Select items={fruits}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <FruitItems />
            </SelectContent>
          </Select>
        </Field>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Select items={fruits} disabled>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <FruitItems />
          </SelectContent>
        </Select>
      </PreviewCard>
    </PreviewGrid>
  )
}
