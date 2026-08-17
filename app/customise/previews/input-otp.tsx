"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"

const REGEXP_DIGITS = "^\\d*$"

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
  const [value, setValue] = React.useState("")
  const [completedValue, setCompletedValue] = React.useState("")

  return (
    <PreviewGrid>
      <PreviewCard label="Basic (6 digits)">
        <OtpDemo />
      </PreviewCard>

      <PreviewCard label="Variants">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Outline</span>
            <OtpDemo variant="outline" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Subtle</span>
            <OtpDemo variant="subtle" />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes — Outline">
        <div className="flex flex-col items-center gap-4">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">{s}</span>
              <OtpDemo variant="outline" size={s} />
            </div>
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes — Subtle">
        <div className="flex flex-col items-center gap-4">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">{s}</span>
              <OtpDemo variant="subtle" size={s} />
            </div>
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="With Separator">
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

      <PreviewCard label="4 Digits">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </PreviewCard>

      <PreviewCard label="Numeric Only">
        <div className="flex flex-col items-center gap-3">
          <InputOTP maxLength={6} pattern={REGEXP_DIGITS}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Only digits 0–9 are accepted.
          </p>
        </div>
      </PreviewCard>

      <PreviewCard label="Controlled">
        <div className="flex flex-col items-center gap-3">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Value: <span className="font-medium">{value || "—"}</span>
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setValue("")}
            className="w-fit"
          >
            Reset
          </Button>
        </div>
      </PreviewCard>

      <PreviewCard label="On Complete">
        <div className="flex flex-col items-center gap-3">
          <InputOTP maxLength={6} onComplete={setCompletedValue}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Last completed:{" "}
            <span className="font-medium">{completedValue || "—"}</span>
          </p>
        </div>
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
          <FieldDescription>
            Enter the 6-digit code we sent to your email.
          </FieldDescription>
        </Field>
      </PreviewCard>

      <PreviewCard label="Invalid">
        <div className="flex flex-col gap-4">
          <Field data-invalid="true">
            <FieldLabel>Verification code (outline)</FieldLabel>
            <InputOTP maxLength={6}>
              <InputOTPGroup aria-invalid>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldError>Invalid code. Please try again.</FieldError>
          </Field>
          <Field data-invalid="true">
            <FieldLabel>Verification code (subtle)</FieldLabel>
            <InputOTP maxLength={6} variant="subtle">
              <InputOTPGroup aria-invalid>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldError>Invalid code. Please try again.</FieldError>
          </Field>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
