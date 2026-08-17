"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Input } from "@/components/ui/input"
import { Field, FieldError } from "@/components/ui/field"

const VARIANTS = ["outline", "subtle", "ghost"] as const
const SIZES = ["xs", "sm", "md", "lg"] as const

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const SIZE_LABEL: Record<(typeof SIZES)[number], string> = {
  xs: "Extra Small (xs)",
  sm: "Small (sm)",
  md: "Medium (md)",
  lg: "Large (lg)",
}

export default function InputPreview() {
  return (
    <PreviewGrid>
      {VARIANTS.map((variant) => (
        <PreviewCard key={`sizes-${variant}`} label={`${cap(variant)} — Sizes`}>
          <div className="flex w-full max-w-sm flex-col gap-3">
            {SIZES.map((size) => (
              <Input
                key={size}
                variant={variant}
                size={size}
                placeholder={SIZE_LABEL[size]}
              />
            ))}
          </div>
        </PreviewCard>
      ))}

      {VARIANTS.map((variant) => (
        <PreviewCard
          key={`states-${variant}`}
          label={`${cap(variant)} — States`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Input variant={variant} placeholder="Default" />
            <Input variant={variant} defaultValue="With value" />
            <Input variant={variant} disabled placeholder="Disabled" />
            <Input
              variant={variant}
              disabled
              defaultValue="Disabled with value"
            />
          </div>
        </PreviewCard>
      ))}

      {VARIANTS.map((variant) => (
        <PreviewCard
          key={`data-${variant}`}
          label={`${cap(variant)} — Data States`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Input variant={variant} data-valid="true" defaultValue="Valid" />
            <Input
              variant={variant}
              data-invalid="true"
              defaultValue="Invalid"
            />
            <Input variant={variant} data-filled="true" defaultValue="Filled" />
          </div>
        </PreviewCard>
      ))}

      <PreviewCard label="Invalid via Field">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Field data-invalid="true">
            <Input variant="outline" defaultValue="Outline invalid" />
            <FieldError>This field is required.</FieldError>
          </Field>
          <Field data-invalid="true">
            <Input variant="subtle" defaultValue="Subtle invalid" />
            <FieldError>This field is required.</FieldError>
          </Field>
        </div>
      </PreviewCard>

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
                  <Input variant="outline" placeholder="Default" />
                </td>
                <td className="px-4 py-3">
                  <Input variant="subtle" placeholder="Default" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Valid
                </td>
                <td className="px-4 py-3">
                  <Input
                    variant="outline"
                    data-valid="true"
                    defaultValue="Valid"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
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
                  <Input
                    variant="outline"
                    data-invalid="true"
                    defaultValue="Invalid"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    variant="subtle"
                    data-invalid="true"
                    defaultValue="Invalid"
                  />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Disabled
                </td>
                <td className="px-4 py-3">
                  <Input variant="outline" disabled placeholder="Disabled" />
                </td>
                <td className="px-4 py-3">
                  <Input variant="subtle" disabled placeholder="Disabled" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
