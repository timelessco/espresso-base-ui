"use client"

import * as React from "react"
import { Search, Mail, Copy, Eye, AtSign, CircleCheck } from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export default function InputGroupPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <InputGroup variant="outline">
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Search />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Outline" />
          </InputGroup>
          <InputGroup variant="subtle">
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Search />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Subtle" />
          </InputGroup>
          <InputGroup variant="ghost">
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Search />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Ghost" />
          </InputGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <InputGroup key={size} size={size}>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder={size} />
            </InputGroup>
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="Addons">
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

      <PreviewCard label="Buttons">
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
        </div>
      </PreviewCard>

      <PreviewCard label="Block alignment">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <InputGroup>
            <InputGroupAddon align="block-start">
              <InputGroupText>Label on top</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Enter value..." />
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
      </PreviewCard>
    </PreviewGrid>
  )
}
