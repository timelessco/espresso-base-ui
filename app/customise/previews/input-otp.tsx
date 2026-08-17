"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

function OtpDemo({
  variant,
  size,
}: {
  variant?: "outline" | "subtle"
  size?: "xs" | "sm" | "md" | "lg"
}) {
  return (
    <InputOTP maxLength={6} variant={variant} size={size}>
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export default function InputOtpPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <div className="flex flex-col items-center gap-4">
          <OtpDemo variant="outline" />
          <OtpDemo variant="subtle" />
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex flex-col items-center gap-4">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <OtpDemo key={s} variant="outline" size={s} />
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="With separator">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <InputOTP maxLength={6} disabled>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </PreviewCard>

      <PreviewCard label="In a Field">
        <Field>
          <FieldLabel>Verification code</FieldLabel>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Field>
      </PreviewCard>

      <PreviewCard label="Invalid">
        <Field data-invalid="true">
          <FieldLabel>Verification code</FieldLabel>
          <InputOTP maxLength={6}>
            <InputOTPGroup aria-invalid>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <FieldError>Invalid code. Please try again.</FieldError>
        </Field>
      </PreviewCard>
    </PreviewGrid>
  )
}
