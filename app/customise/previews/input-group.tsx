"use client"

import * as React from "react"
import {
  Search,
  Mail,
  Eye,
  Copy,
  AtSign,
  ChevronDown,
  Link,
  CircleCheck,
} from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const VARIANTS = ["outline", "subtle", "ghost"] as const
const SIZES = ["xs", "sm", "md", "lg"] as const

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const SIZE_LABEL: Record<(typeof SIZES)[number], string> = {
  xs: "Extra Small (xs)",
  sm: "Small (sm)",
  md: "Medium (md)",
  lg: "Large (lg)",
}

function SearchGroup({
  variant,
  size,
  ...props
}: {
  variant?: (typeof VARIANTS)[number]
  size?: (typeof SIZES)[number]
} & React.ComponentProps<typeof InputGroupInput>) {
  return (
    <InputGroup variant={variant} size={size}>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <Search />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput {...props} />
    </InputGroup>
  )
}

export default function InputGroupPreview() {
  return (
    <PreviewGrid>
      {VARIANTS.map((variant) => (
        <PreviewCard key={`sizes-${variant}`} label={`${cap(variant)} — Sizes`}>
          <div className="flex w-full max-w-sm flex-col gap-3">
            {SIZES.map((size) => (
              <SearchGroup
                key={size}
                variant={variant}
                size={size}
                placeholder={SIZE_LABEL[size]}
              />
            ))}
          </div>
        </PreviewCard>
      ))}

      <PreviewCard label="Icon — Inline Start">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
      </PreviewCard>

      <PreviewCard label="Icon — Inline End">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
              <InputGroupText>
                <Search />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Icons — Both Sides">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
      </PreviewCard>

      <PreviewCard label="Text Addon">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
      </PreviewCard>

      <PreviewCard label="Button Addon">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
      </PreviewCard>

      <PreviewCard label="Block Alignment">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
      </PreviewCard>

      <PreviewCard label="Textarea">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
      </PreviewCard>

      <PreviewCard label="Disabled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <SearchGroup variant="outline" placeholder="Outline disabled" disabled />
          <SearchGroup variant="subtle" placeholder="Subtle disabled" disabled />
        </div>
      </PreviewCard>

      {VARIANTS.map((variant) => (
        <PreviewCard
          key={`data-${variant}`}
          label={`${cap(variant)} — Data States`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            <InputGroup variant={variant} data-valid="true">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="Valid" />
            </InputGroup>
            <InputGroup variant={variant} data-invalid="true">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="Invalid" />
            </InputGroup>
            <InputGroup variant={variant} data-filled="true">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="Filled" />
            </InputGroup>
          </div>
        </PreviewCard>
      ))}
    </PreviewGrid>
  )
}
