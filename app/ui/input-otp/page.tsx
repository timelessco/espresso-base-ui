"use client"

import * as React from "react"
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const REGEXP_DIGITS = "^\\d*$"

export default function InputOTPPage() {
  const [value, setValue] = React.useState("")
  const [completedValue, setCompletedValue] = React.useState("")

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic 6-digit */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic (6 digits)</SectionTitle>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* With Separator */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Separator</SectionTitle>
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
      </div>

      {/* 4-digit */}
      <div className="flex flex-col gap-4">
        <SectionTitle>4 Digits</SectionTitle>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Numeric Only */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Numeric Only</SectionTitle>
        <InputOTP maxLength={6} pattern={REGEXP_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground">
          Only digits 0–9 are accepted.
        </p>
      </div>

      {/* Controlled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Controlled</SectionTitle>
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
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

      {/* onComplete */}
      <div className="flex flex-col gap-4">
        <SectionTitle>On Complete</SectionTitle>
        <InputOTP maxLength={6} onComplete={setCompletedValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground">
          Last completed:{" "}
          <span className="font-medium">{completedValue || "—"}</span>
        </p>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <InputOTP maxLength={6} disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* In a Field */}
      <div className="flex flex-col gap-4">
        <SectionTitle>In a Field</SectionTitle>
        <Field>
          <FieldLabel>Verification code</FieldLabel>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            Enter the 6-digit code we sent to your email.
          </FieldDescription>
        </Field>
      </div>

      {/* Invalid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Invalid</SectionTitle>
        <Field data-invalid="true">
          <FieldLabel>Verification code</FieldLabel>
          <InputOTP maxLength={6}>
            <InputOTPGroup aria-invalid>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldError>Invalid code. Please try again.</FieldError>
        </Field>
      </div>
    </div>
  )
}
