"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Textarea } from "@/components/ui/textarea"

const VARIANTS = ["outline", "subtle", "ghost"] as const
const SIZES = ["xs", "sm", "md", "lg"] as const

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const SIZE_LABEL: Record<(typeof SIZES)[number], string> = {
  xs: "Extra Small (xs)",
  sm: "Small (sm)",
  md: "Medium (md)",
  lg: "Large (lg)",
}

export default function TextareaPreview() {
  return (
    <PreviewGrid>
      {VARIANTS.map((variant) => (
        <PreviewCard key={`sizes-${variant}`} label={`${cap(variant)} — Sizes`}>
          <div className="flex w-full max-w-sm flex-col gap-3">
            {SIZES.map((size) => (
              <Textarea
                key={size}
                variant={variant}
                size={size}
                placeholder={SIZE_LABEL[size]}
              />
            ))}
          </div>
        </PreviewCard>
      ))}

      <PreviewCard label="Disabled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea variant="outline" disabled placeholder="Outline disabled" />
          <Textarea variant="subtle" disabled placeholder="Subtle disabled" />
          <Textarea variant="ghost" disabled placeholder="Ghost disabled" />
        </div>
      </PreviewCard>

      <PreviewCard label="With Value">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea
            variant="outline"
            defaultValue="Outline with content that spans multiple lines to show how the component handles text."
          />
          <Textarea
            variant="subtle"
            defaultValue="Subtle with content that spans multiple lines to show how the component handles text."
          />
          <Textarea
            variant="ghost"
            defaultValue="Ghost with content that spans multiple lines to show how the component handles text."
          />
        </div>
      </PreviewCard>

      {VARIANTS.map((variant) => (
        <PreviewCard
          key={`data-${variant}`}
          label={`${cap(variant)} — Data States`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Textarea
              variant={variant}
              data-valid="true"
              defaultValue="Valid"
            />
            <Textarea
              variant={variant}
              data-invalid="true"
              defaultValue="Invalid"
            />
            <Textarea
              variant={variant}
              data-filled="true"
              defaultValue="Filled"
            />
          </div>
        </PreviewCard>
      ))}

      <PreviewCard label="All States">
        <div className="w-full max-w-md overflow-x-auto">
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
                  <Textarea variant="outline" placeholder="Default" />
                </td>
                <td className="px-4 py-3">
                  <Textarea variant="subtle" placeholder="Default" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Valid
                </td>
                <td className="px-4 py-3">
                  <Textarea
                    variant="outline"
                    data-valid="true"
                    defaultValue="Valid"
                  />
                </td>
                <td className="px-4 py-3">
                  <Textarea
                    variant="subtle"
                    data-valid="true"
                    defaultValue="Valid"
                  />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Invalid
                </td>
                <td className="px-4 py-3">
                  <Textarea
                    variant="outline"
                    data-invalid="true"
                    defaultValue="Invalid"
                  />
                </td>
                <td className="px-4 py-3">
                  <Textarea
                    variant="subtle"
                    data-invalid="true"
                    defaultValue="Invalid"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
