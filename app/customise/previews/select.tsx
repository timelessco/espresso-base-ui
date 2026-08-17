"use client"

import * as React from "react"
import {
  Apple,
  Banana,
  Cherry,
  Citrus,
  Diamond,
  Grape,
  ChevronsUpDown,
} from "lucide-react"
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

const timezones = [
  { label: "Select a timezone", value: null },
  { label: "Eastern Standard Time (EST)", value: "est" },
  { label: "Central Standard Time (CST)", value: "cst" },
  { label: "Mountain Standard Time (MST)", value: "mst" },
  { label: "Pacific Standard Time (PST)", value: "pst" },
  { label: "Greenwich Mean Time (GMT)", value: "gmt" },
  { label: "Central European Time (CET)", value: "cet" },
  { label: "Eastern European Time (EET)", value: "eet" },
  { label: "Moscow Time (MSK)", value: "msk" },
  { label: "India Standard Time (IST)", value: "ist" },
  { label: "Japan Standard Time (JST)", value: "jst" },
  { label: "Korea Standard Time (KST)", value: "kst" },
  { label: "Australian Eastern Standard Time (AEST)", value: "aest" },
  { label: "New Zealand Standard Time (NZST)", value: "nzst" },
  { label: "Brasilia Time (BRT)", value: "brt" },
  { label: "Argentina Time (ART)", value: "art" },
]

function FruitItems() {
  return (
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      {fruits.map((item) => (
        <SelectItem key={item.value ?? "placeholder"} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  )
}

export default function SelectPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Select items={fruits}>
          <SelectTrigger className="w-48" suffix={<ChevronsUpDown />}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <FruitItems />
          </SelectContent>
        </Select>
      </PreviewCard>

      <PreviewCard label="With Icons">
        <Select items={fruitsWithIcons}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {fruitsWithIcons.map((item) => (
                <SelectItem
                  key={item.value ?? "placeholder"}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PreviewCard>

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

      <PreviewCard label="With Default Value">
        <Select items={fruits} defaultValue="blueberry">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <FruitItems />
          </SelectContent>
        </Select>
      </PreviewCard>

      <PreviewCard label="With Groups">
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

      <PreviewCard label="Scrollable">
        <Select items={timezones} defaultValue="ist">
          <SelectTrigger className="w-72">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Timezones</SelectLabel>
              {timezones.map((item) => (
                <SelectItem
                  key={item.value ?? "placeholder"}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Select items={fruits} disabled>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <FruitItems />
          </SelectContent>
        </Select>
      </PreviewCard>

      <PreviewCard label="Disabled Items">
        <Select items={fruits}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {fruits.map((item) => (
                <SelectItem
                  key={item.value ?? "placeholder"}
                  value={item.value}
                  disabled={item.value === "banana" || item.value === "grapes"}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PreviewCard>

      <PreviewCard label="Data States">
        <div className="flex items-start gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Invalid (Field)
            </span>
            {(["outline", "subtle", "ghost"] as const).map((variant) => (
              <Field key={variant} data-invalid="true">
                <Select items={fruits}>
                  <SelectTrigger variant={variant} className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <FruitItems />
                  </SelectContent>
                </Select>
              </Field>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Valid
            </span>
            {(["outline", "subtle", "ghost"] as const).map((variant) => (
              <Select key={variant} items={fruits} defaultValue="apple">
                <SelectTrigger
                  variant={variant}
                  data-valid="true"
                  className="w-40"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <FruitItems />
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>
      </PreviewCard>

      <PreviewCard label="Sides">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Select key={side} items={fruits}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={side} />
            </SelectTrigger>
            <SelectContent side={side} alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruits.map((item) => (
                  <SelectItem
                    key={item.value ?? "placeholder"}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </PreviewCard>
    </PreviewGrid>
  )
}
