"use client"

import {
  Apple,
  Banana,
  Cherry,
  Citrus,
  Diamond,
  Grape,
  ChevronsUpDown,
} from "lucide-react"
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
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

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
  // North America
  { label: "Eastern Standard Time (EST)", value: "est" },
  { label: "Central Standard Time (CST)", value: "cst" },
  { label: "Mountain Standard Time (MST)", value: "mst" },
  { label: "Pacific Standard Time (PST)", value: "pst" },
  { label: "Alaska Standard Time (AKST)", value: "akst" },
  { label: "Hawaii Standard Time (HST)", value: "hst" },
  // Europe & Africa
  { label: "Greenwich Mean Time (GMT)", value: "gmt" },
  { label: "Central European Time (CET)", value: "cet" },
  { label: "Eastern European Time (EET)", value: "eet" },
  { label: "Western European Summer Time (WEST)", value: "west" },
  { label: "Central Africa Time (CAT)", value: "cat" },
  { label: "Eastern Africa Time (EAT)", value: "eat" },
  // Asia
  { label: "Moscow Time (MSK)", value: "msk" },
  { label: "India Standard Time (IST)", value: "ist" },
  { label: "China Standard Time (CST_CN)", value: "cst_cn" },
  { label: "Japan Standard Time (JST)", value: "jst" },
  { label: "Korea Standard Time (KST)", value: "kst" },
  { label: "Indonesia Central Standard Time (WITA)", value: "ist_id" },
  // Australia & Pacific
  { label: "Australian Western Standard Time (AWST)", value: "awst" },
  { label: "Australian Central Standard Time (ACST)", value: "acst" },
  { label: "Australian Eastern Standard Time (AEST)", value: "aest" },
  { label: "New Zealand Standard Time (NZST)", value: "nzst" },
  { label: "Fiji Time (FJT)", value: "fjt" },
  // South America
  { label: "Argentina Time (ART)", value: "art" },
  { label: "Bolivia Time (BOT)", value: "bot" },
  { label: "Brasilia Time (BRT)", value: "brt" },
  { label: "Chile Standard Time (CLT)", value: "clt" },
]

export default function SelectPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Select items={fruits}>
          <SelectTrigger
            className="w-full max-w-48"
            suffix={<ChevronsUpDown />}
          >
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
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons</SectionTitle>

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
      </div>

      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={fruits}>
            <SelectTrigger variant="outline" className="w-48">
              <SelectValue placeholder="Outline" />
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
          <Select items={fruits}>
            <SelectTrigger variant="subtle" className="w-48">
              <SelectValue placeholder="Subtle" />
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
          <Select items={fruits}>
            <SelectTrigger variant="ghost" className="w-48">
              <SelectValue placeholder="Ghost" />
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
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={fruits}>
            <SelectTrigger size="sm" className="w-48">
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
          <Select items={fruits}>
            <SelectTrigger size="default" className="w-48">
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
          <Select items={fruits}>
            <SelectTrigger size="lg" className="w-48">
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
        </div>
      </div>

      {/* With default value */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Default Value</SectionTitle>
        <Select items={fruits} defaultValue="blueberry">
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
      </div>

      {/* With groups */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Groups</SectionTitle>
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
      </div>

      {/* Scrollable (timezones — based on shadcn example) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Scrollable</SectionTitle>

        <Select items={timezones} defaultValue="ist">
          <SelectTrigger className="w-72">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Timezones</SelectLabel>
              {timezones.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Disabled trigger */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <Select items={fruits} disabled>
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
      </div>

      {/* Disabled items */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Items</SectionTitle>
        <Select items={fruits}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {fruits.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  disabled={item.value === "banana" || item.value === "grapes"}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Data States */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Data States</SectionTitle>

        <div className="flex gap-32">
          {/* Invalid — via Field (group-data-[invalid=true]/field) */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Invalid (Field)
            </span>
            <div className="flex w-48 flex-col gap-3">
              <Field data-invalid="true">
                <Select items={fruits}>
                  <SelectTrigger variant="outline" className="w-48">
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
              </Field>
              <Field data-invalid="true">
                <Select items={fruits}>
                  <SelectTrigger variant="subtle" className="w-48">
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
              </Field>
              <Field data-invalid="true">
                <Select items={fruits}>
                  <SelectTrigger variant="ghost" className="w-48">
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
              </Field>
            </div>
          </div>

          {/* Valid — via data-valid on trigger */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Valid
            </span>
            <div className="flex flex-col gap-3">
              <Select items={fruits} defaultValue="apple">
                <SelectTrigger
                  variant="outline"
                  data-valid="true"
                  className="w-48"
                >
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
              <Select items={fruits} defaultValue="apple">
                <SelectTrigger
                  variant="subtle"
                  data-valid="true"
                  className="w-48"
                >
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
              <Select items={fruits} defaultValue="apple">
                <SelectTrigger
                  variant="ghost"
                  data-valid="true"
                  className="w-48"
                >
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
            </div>
          </div>

          {/* Disabled */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Disabled
            </span>
            <div className="flex flex-col gap-3">
              <Select items={fruits} disabled>
                <SelectTrigger variant="outline" className="w-48">
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
              <Select items={fruits} disabled>
                <SelectTrigger variant="subtle" className="w-48">
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
              <Select items={fruits} disabled>
                <SelectTrigger variant="ghost" className="w-48">
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
            </div>
          </div>
        </div>
      </div>

      {/* Sides */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sides</SectionTitle>

        <div className="flex items-center gap-4">
          <Select items={fruits}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Top" />
            </SelectTrigger>
            <SelectContent side="top" alignItemWithTrigger={false}>
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
          <Select items={fruits}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Right" />
            </SelectTrigger>
            <SelectContent side="right" alignItemWithTrigger={false}>
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
          <Select items={fruits}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Bottom" />
            </SelectTrigger>
            <SelectContent side="bottom" alignItemWithTrigger={false}>
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
          <Select items={fruits}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Left" />
            </SelectTrigger>
            <SelectContent side="left" alignItemWithTrigger={false}>
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
        </div>
      </div>
    </div>
  )
}
