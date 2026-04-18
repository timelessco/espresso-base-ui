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
import { Field, FieldError } from "@/components/ui/field"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function ChevronUpDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.85355 10.6464C5.65829 10.4512 5.34171 10.4512 5.14645 10.6464C4.95118 10.8417 4.95118 11.1583 5.14645 11.3536L7.64645 13.8536C7.84171 14.0488 8.15829 14.0488 8.35355 13.8536L10.8536 11.3536C11.0488 11.1583 11.0488 10.8417 10.8536 10.6464C10.6583 10.4512 10.3417 10.4512 10.1464 10.6464L8 12.7929L5.85355 10.6464ZM5.85355 5.35355C5.65829 5.54882 5.34171 5.54882 5.14645 5.35355C4.95118 5.15829 4.95118 4.84171 5.14645 4.64645L7.64645 2.14645C7.84171 1.95118 8.15829 1.95118 8.35355 2.14645L10.8536 4.64645C11.0488 4.84171 11.0488 5.15829 10.8536 5.35355C10.6583 5.54882 10.3417 5.54882 10.1464 5.35355L8 3.20711L5.85355 5.35355Z"
        fill="currentColor"
      />
    </svg>
  )
}

const fruits = [
  { label: "Select fruit", value: null, icon: Diamond },
  { label: "Apple", value: "apple", icon: Apple },
  { label: "Banana", value: "banana", icon: Banana },
  { label: "Cherry", value: "cherry", icon: Cherry },
  { label: "Citrus", value: "citrus", icon: Citrus },
  { label: "Grape", value: "grape", icon: Grape },
]

const options = [
  { label: "Select an option", value: null },
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
]

const groupedItems = [
  ...fruits,
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
]

export default function SelectPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Outline — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Outline — Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={fruits} variant="outline" size="sm">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} variant="outline" size="default">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} variant="outline" size="lg">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Subtle — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Subtle — Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={fruits} variant="subtle" size="sm">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} variant="subtle" size="default">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} variant="subtle" size="lg">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ghost — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Ghost — Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={fruits} variant="ghost" size="sm">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} variant="ghost" size="default">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} variant="ghost" size="lg">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Suffix Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Suffix Icon</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={options}>
            <SelectTrigger variant="outline" suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={options}>
            <SelectTrigger variant="subtle" suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={options}>
            <SelectTrigger variant="ghost" suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* With Default Value */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Default Value</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={fruits} defaultValue="cherry">
            <SelectTrigger variant="outline">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} defaultValue="cherry">
            <SelectTrigger variant="subtle">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={fruits} defaultValue="cherry">
            <SelectTrigger variant="ghost">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* With Groups */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Groups</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={groupedItems}>
            <SelectTrigger variant="outline">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruits
                  .filter((f) => f.value)
                  .map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.icon && <item.icon className="size-4" />}
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
                <SelectItem value="spinach">Spinach</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex items-center gap-4">
          <Select items={options} disabled>
            <SelectTrigger variant="outline">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={options} disabled>
            <SelectTrigger variant="subtle">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={options} disabled>
            <SelectTrigger variant="ghost">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Disabled Items */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Items</SectionTitle>
        <Select items={fruits}>
          <SelectTrigger variant="outline">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">
              <Apple className="size-4" /> Apple
            </SelectItem>
            <SelectItem value="banana" disabled>
              <Banana className="size-4" /> Banana (disabled)
            </SelectItem>
            <SelectItem value="cherry">
              <Cherry className="size-4" /> Cherry
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invalid via Field */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Invalid via Field</SectionTitle>
        <div className="flex items-start gap-4">
          <Field data-invalid="true">
            <Select items={fruits} defaultValue="apple">
              <SelectTrigger variant="outline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fruits
                  .filter((f) => f.value)
                  .map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.icon && <item.icon className="size-4" />}
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FieldError>Please select a valid option.</FieldError>
          </Field>
          <Field data-invalid="true">
            <Select items={fruits} defaultValue="apple">
              <SelectTrigger variant="subtle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fruits
                  .filter((f) => f.value)
                  .map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.icon && <item.icon className="size-4" />}
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FieldError>Please select a valid option.</FieldError>
          </Field>
          <Field data-invalid="true">
            <Select items={fruits} defaultValue="apple">
              <SelectTrigger variant="ghost">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fruits
                  .filter((f) => f.value)
                  .map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.icon && <item.icon className="size-4" />}
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FieldError>Please select a valid option.</FieldError>
          </Field>
        </div>
      </div>
    </div>
  )
}
