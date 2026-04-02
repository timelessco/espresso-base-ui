"use client"

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

function DiamondIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_63_109864)">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.50504 0.787869C7.77841 0.514501 8.22162 0.514503 8.49499 0.787869L15.2121 7.50503C15.4855 7.77839 15.4855 8.22161 15.2121 8.49498L11.8536 11.8536L8.49499 15.2121C8.22162 15.4855 7.7784 15.4855 7.50504 15.2121L4.14646 11.8536L0.78788 8.49498C0.514513 8.22161 0.514514 7.77839 0.787881 7.50503L4.14646 4.14645L7.50504 0.787869ZM8.00001 1.70711L4.85357 4.85355L1.70712 8L4.85357 11.1464L8.00001 14.2929L11.1465 11.1464L14.2929 8L8.00001 1.70711Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_63_109864">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

function ChevronUpDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.85355 10.6464C5.65829 10.4512 5.34171 10.4512 5.14645 10.6464C4.95118 10.8417 4.95118 11.1583 5.14645 11.3536L7.64645 13.8536C7.84171 14.0488 8.15829 14.0488 8.35355 13.8536L10.8536 11.3536C11.0488 11.1583 11.0488 10.8417 10.8536 10.6464C10.6583 10.4512 10.3417 10.4512 10.1464 10.6464L8 12.7929L5.85355 10.6464ZM5.85355 5.35355C5.65829 5.54882 5.34171 5.54882 5.14645 5.35355C4.95118 5.15829 4.95118 4.84171 5.14645 4.64645L7.64645 2.14645C7.84171 1.95118 8.15829 1.95118 8.35355 2.14645L10.8536 4.64645C11.0488 4.84171 11.0488 5.15829 10.8536 5.35355C10.6583 5.54882 10.3417 5.54882 10.1464 5.35355L8 3.20711L5.85355 5.35355Z" fill="currentColor"/>
    </svg>
  )
}

const options = (
  <>
    <SelectItem value="option-1">Option 1</SelectItem>
    <SelectItem value="option-2">Option 2</SelectItem>
    <SelectItem value="option-3">Option 3</SelectItem>
  </>
)

export default function SelectPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Outline — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Outline — Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="outline" size="sm">
              <SelectValue placeholder="Small (sm)" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="outline" size="default">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="outline" size="lg">
              <SelectValue placeholder="Large (lg)" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Subtle — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Subtle — Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="subtle" size="sm">
              <SelectValue placeholder="Small (sm)" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="subtle" size="default">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="subtle" size="lg">
              <SelectValue placeholder="Large (lg)" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Ghost — Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Ghost — Sizes</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="ghost" size="sm">
              <SelectValue placeholder="Small (sm)" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="ghost" size="default">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="ghost" size="lg">
              <SelectValue placeholder="Large (lg)" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Prefix Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Prefix Icon</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="outline" prefixIcon={<DiamondIcon />}>
              <SelectValue placeholder="Outline" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="subtle" prefixIcon={<DiamondIcon />}>
              <SelectValue placeholder="Subtle" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="ghost" prefixIcon={<DiamondIcon />}>
              <SelectValue placeholder="Ghost" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Suffix Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Suffix Icon</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="outline" suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue placeholder="Outline" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="subtle" suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue placeholder="Subtle" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="ghost" suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue placeholder="Ghost" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Both Icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Both Icons</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="outline" prefixIcon={<DiamondIcon />} suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue placeholder="Outline" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="subtle" prefixIcon={<DiamondIcon />} suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue placeholder="Subtle" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="ghost" prefixIcon={<DiamondIcon />} suffixIcon={<ChevronUpDownIcon />}>
              <SelectValue placeholder="Ghost" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* With Default Value */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Default Value</SectionTitle>
        <div className="flex items-center gap-4">
          <Select defaultValue="option-2">
            <SelectTrigger variant="outline">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-2">
            <SelectTrigger variant="subtle">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-2">
            <SelectTrigger variant="ghost">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* With Groups */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Groups</SectionTitle>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger variant="outline">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
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
          <Select disabled>
            <SelectTrigger variant="outline">
              <SelectValue placeholder="Outline" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger variant="subtle">
              <SelectValue placeholder="Subtle" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger variant="ghost">
              <SelectValue placeholder="Ghost" />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Disabled Items */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Items</SectionTitle>
        <Select>
          <SelectTrigger variant="outline">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option-1">Option 1</SelectItem>
            <SelectItem value="option-2" disabled>Option 2 (disabled)</SelectItem>
            <SelectItem value="option-3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invalid via Field */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Invalid via Field</SectionTitle>
        <div className="flex items-start gap-4">
          <Field data-invalid="true">
            <Select defaultValue="option-1">
              <SelectTrigger variant="outline"><SelectValue /></SelectTrigger>
              <SelectContent>{options}</SelectContent>
            </Select>
            <FieldError>Please select a valid option.</FieldError>
          </Field>
          <Field data-invalid="true">
            <Select defaultValue="option-1">
              <SelectTrigger variant="subtle"><SelectValue /></SelectTrigger>
              <SelectContent>{options}</SelectContent>
            </Select>
            <FieldError>Please select a valid option.</FieldError>
          </Field>
          <Field data-invalid="true">
            <Select defaultValue="option-1">
              <SelectTrigger variant="ghost"><SelectValue /></SelectTrigger>
              <SelectContent>{options}</SelectContent>
            </Select>
            <FieldError>Please select a valid option.</FieldError>
          </Field>
        </div>
      </div>

      {/* Data States */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Data States</SectionTitle>
        <div className="flex items-center gap-4">
          <Select defaultValue="option-1">
            <SelectTrigger variant="outline" data-valid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-1">
            <SelectTrigger variant="subtle" data-valid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-1">
            <SelectTrigger variant="ghost" data-valid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="option-1">
            <SelectTrigger variant="outline" data-invalid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-1">
            <SelectTrigger variant="subtle" data-invalid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-1">
            <SelectTrigger variant="ghost" data-invalid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="option-1">
            <SelectTrigger variant="outline" data-filled="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-1">
            <SelectTrigger variant="subtle" data-filled="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
          <Select defaultValue="option-1">
            <SelectTrigger variant="ghost" data-filled="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
      </div>

      {/* All States Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All States</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Outline</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Subtle</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Ghost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Placeholder</td>
                <td className="px-4 py-3">
                  <Select><SelectTrigger variant="outline"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select><SelectTrigger variant="subtle"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select><SelectTrigger variant="ghost"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">With Value</td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="outline"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="subtle"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="ghost"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Disabled</td>
                <td className="px-4 py-3">
                  <Select disabled><SelectTrigger variant="outline"><SelectValue placeholder="Disabled" /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select disabled><SelectTrigger variant="subtle"><SelectValue placeholder="Disabled" /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select disabled><SelectTrigger variant="ghost"><SelectValue placeholder="Disabled" /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Valid</td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="outline" data-valid="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="subtle" data-valid="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="ghost" data-valid="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Invalid</td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="outline" data-invalid="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="subtle" data-invalid="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="ghost" data-invalid="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Filled</td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="outline" data-filled="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="subtle" data-filled="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
                <td className="px-4 py-3">
                  <Select defaultValue="option-1"><SelectTrigger variant="ghost" data-filled="true"><SelectValue /></SelectTrigger><SelectContent>{options}</SelectContent></Select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
