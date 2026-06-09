"use client"

import {
  Search,
  Mail,
  Eye,
  Copy,
  X,
  AtSign,
  ChevronDown,
  Link,
  CircleCheck,
} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function InputGroupPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Outline — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — Sizes</SectionTitle>
        <InputGroup variant="outline" size="sm">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Small (sm)" />
        </InputGroup>
        <InputGroup variant="outline" size="md">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Medium (md)" />
        </InputGroup>
        <InputGroup variant="outline" size="lg">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Large (lg)" />
        </InputGroup>
        <InputGroup variant="outline" size="xl">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Extra Large (xl)" />
        </InputGroup>
      </div>

      {/* Subtle — Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — Sizes</SectionTitle>
        <InputGroup variant="subtle" size="sm">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Small (sm)" />
        </InputGroup>
        <InputGroup variant="subtle" size="md">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Medium (md)" />
        </InputGroup>
        <InputGroup variant="subtle" size="lg">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Large (lg)" />
        </InputGroup>
        <InputGroup variant="subtle" size="xl">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Extra Large (xl)" />
        </InputGroup>
      </div>

      {/* Icon Positions */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Icon — Inline Start</SectionTitle>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Mail />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Email" type="email" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Link />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="URL" type="url" />
        </InputGroup>
      </div>

      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Icon — Inline End</SectionTitle>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Icons — Both Sides</SectionTitle>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Mail />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Email" type="email" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>
              <CircleCheck />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Text Addon */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Text Addon</SectionTitle>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <AtSign />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Username" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Button Addon */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Button Addon</SectionTitle>
        <InputGroup>
          <InputGroupInput placeholder="Enter value..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs">
              <Copy /> Copy
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Password" type="password" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs">
              <Eye />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupButton size="xs">
              <ChevronDown /> Select
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput placeholder="Enter value..." />
        </InputGroup>
      </div>

      {/* Block Alignment */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Block Alignment</SectionTitle>
        <InputGroup>
          <InputGroupAddon align="block-start">
            <InputGroupText>Label on top</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Enter value..." />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Enter value..." />
          <InputGroupAddon align="block-end">
            <InputGroupText>Helper text below</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Textarea */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Textarea</SectionTitle>
        <InputGroup>
          <InputGroupTextarea placeholder="Write a message..." rows={3} />
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Write a message..." rows={3} />
          <InputGroupAddon align="block-end">
            <InputGroupButton size="xs">Send</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Disabled */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <InputGroup variant="outline">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Outline disabled" disabled />
        </InputGroup>
        <InputGroup variant="subtle">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Subtle disabled" disabled />
        </InputGroup>
      </div>

      {/* Data States — Outline */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Outline — Data States</SectionTitle>
        <InputGroup variant="outline" data-valid="true">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="Valid" />
        </InputGroup>
        <InputGroup variant="outline" data-invalid="true">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="Invalid" />
        </InputGroup>
        <InputGroup variant="outline" data-filled="true">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="Filled" />
        </InputGroup>
      </div>

      {/* Data States — Subtle */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Subtle — Data States</SectionTitle>
        <InputGroup variant="subtle" data-valid="true">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="Valid" />
        </InputGroup>
        <InputGroup variant="subtle" data-invalid="true">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="Invalid" />
        </InputGroup>
        <InputGroup variant="subtle" data-filled="true">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="Filled" />
        </InputGroup>
      </div>

      {/* All States Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All States</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  State
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Outline
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Subtle
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Default
                </td>
                <td className="px-4 py-3">
                  <InputGroup variant="outline" className="max-w-xs">
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Default" />
                  </InputGroup>
                </td>
                <td className="px-4 py-3">
                  <InputGroup variant="subtle" className="max-w-xs">
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Default" />
                  </InputGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Disabled
                </td>
                <td className="px-4 py-3">
                  <InputGroup variant="outline" className="max-w-xs">
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Disabled" disabled />
                  </InputGroup>
                </td>
                <td className="px-4 py-3">
                  <InputGroup variant="subtle" className="max-w-xs">
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Disabled" disabled />
                  </InputGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Valid
                </td>
                <td className="px-4 py-3">
                  <InputGroup
                    variant="outline"
                    data-valid="true"
                    className="max-w-xs"
                  >
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput defaultValue="Valid" />
                  </InputGroup>
                </td>
                <td className="px-4 py-3">
                  <InputGroup
                    variant="subtle"
                    data-valid="true"
                    className="max-w-xs"
                  >
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput defaultValue="Valid" />
                  </InputGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Invalid
                </td>
                <td className="px-4 py-3">
                  <InputGroup
                    variant="outline"
                    data-invalid="true"
                    className="max-w-xs"
                  >
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput defaultValue="Invalid" />
                  </InputGroup>
                </td>
                <td className="px-4 py-3">
                  <InputGroup
                    variant="subtle"
                    data-invalid="true"
                    className="max-w-xs"
                  >
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput defaultValue="Invalid" />
                  </InputGroup>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Filled
                </td>
                <td className="px-4 py-3">
                  <InputGroup
                    variant="outline"
                    data-filled="true"
                    className="max-w-xs"
                  >
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput defaultValue="Filled" />
                  </InputGroup>
                </td>
                <td className="px-4 py-3">
                  <InputGroup
                    variant="subtle"
                    data-filled="true"
                    className="max-w-xs"
                  >
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <Search />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput defaultValue="Filled" />
                  </InputGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
