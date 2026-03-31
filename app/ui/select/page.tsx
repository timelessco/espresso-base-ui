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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
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
