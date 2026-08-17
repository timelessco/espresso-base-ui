"use client"

import * as React from "react"
import { User, Moon } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

const AVATAR_SIZES = ["xs", "sm", "default", "lg", "xl", "2xl", "3xl"] as const
const AVATAR_SRC = "https://github.com/shadcn.png"

export default function AvatarPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Sizes">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="Fallback">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="Icon">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size}>
            <User className="text-muted-foreground" />
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="Square">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size} variant="square">
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="With badge">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>N</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="Badge with icon">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>N</AvatarFallback>
            <AvatarBadge className="bg-blue-500">
              <Moon />
            </AvatarBadge>
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="Square with badge">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size} variant="square">
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        ))}
      </PreviewCard>

      <PreviewCard label="Group — images">
        <AvatarGroup>
          <Avatar>
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={AVATAR_SRC} alt="User" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </PreviewCard>

      <PreviewCard label="Group — icons">
        <AvatarGroup>
          <Avatar>
            <User className="text-muted-foreground" />
          </Avatar>
          <Avatar>
            <User className="text-muted-foreground" />
          </Avatar>
          <Avatar>
            <User className="text-muted-foreground" />
          </Avatar>
          <AvatarGroupCount>+5</AvatarGroupCount>
        </AvatarGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
