"use client"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

export default function InputOTPDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Input OTP"
        description="A one-time-passcode input rendered as character slots with a fake caret. Outline and subtle variants across four slot sizes."
      />

      <DocSection title="Preview">
        <DocProse>
          Compose <code>InputOTP</code> (which owns <code>maxLength</code> and
          the value) with an <code>InputOTPGroup</code> of indexed{" "}
          <code>InputOTPSlot</code>s.
        </DocProse>
        <DocExample
          code={`
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        >
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
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="input-otp" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"`}
        />
        <CodeBlock
          code={`
<InputOTP maxLength={4} onComplete={(code) => verify(code)}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`}
        />
      </DocSection>

      <DocSection title="Variants and sizes">
        <DocProse>
          <code>variant</code> and <code>size</code> live on the container and
          cascade to every slot: <code>outline</code> gives each slot a shadow
          ring, <code>subtle</code> a filled surface, and sizes run{" "}
          <code>xs</code> through <code>lg</code>.
        </DocProse>
        <DocExample
          code={`
<InputOTP maxLength={4} variant="outline" size="lg">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>

<InputOTP maxLength={4} variant="subtle" size="sm">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`}
        >
          <div className="flex flex-col items-center gap-4">
            <InputOTP maxLength={4} variant="outline" size="lg">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <InputOTP maxLength={4} variant="subtle" size="sm">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Separator">
        <DocProse>
          Split the code into groups with <code>InputOTPSeparator</code>, which
          renders a minus icon between two <code>InputOTPGroup</code>s.
        </DocProse>
        <DocExample
          code={`
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
</InputOTP>`}
        >
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
        </DocExample>
      </DocSection>

      <DocSection title="Invalid">
        <DocProse>
          Set <code>aria-invalid</code> on the <code>InputOTPGroup</code> –
          typically inside a <code>Field</code> with{" "}
          <code>data-invalid="true"</code> – to tint every slot with the error
          surface.
        </DocProse>
        <DocExample
          code={`
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
</Field>`}
        >
          <div className="w-full max-w-xs">
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
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>InputOTP</code> forwards every prop of the underlying{" "}
          <code>input-otp</code> <code>OTPInput</code> – including{" "}
          <code>value</code>/<code>onChange</code> for controlled use,{" "}
          <code>onComplete</code>, <code>pattern</code> and{" "}
          <code>disabled</code> – while the variant props style the rendered
          slots.
        </DocProse>
        <PropsTable
          title="InputOTP"
          rows={[
            {
              prop: "maxLength",
              type: "number",
              defaultValue: "–",
              description: "Required. Number of characters in the code.",
            },
            {
              prop: "variant",
              type: '"outline" | "subtle"',
              defaultValue: '"outline"',
              description:
                "Slot surface – shadow ring (outline) or filled secondary background (subtle).",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Square slot size (24 / 28 / 32 / 40px) with matching text size and radius; outline trims 2px for its shadow ring.",
            },
            {
              prop: "value",
              type: "string",
              defaultValue: "–",
              description: "Controlled value; pair with onChange.",
            },
            {
              prop: "onChange",
              type: "(value: string) => void",
              defaultValue: "–",
              description: "Called on every value change.",
            },
            {
              prop: "onComplete",
              type: "(value: string) => void",
              defaultValue: "–",
              description: "Called when all maxLength characters are filled.",
            },
            {
              prop: "pattern",
              type: "string",
              defaultValue: "–",
              description:
                'Regex the value must match, e.g. "^\\\\d*$" for digits only.',
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables input and dims the slots.",
            },
            {
              prop: "containerClassName",
              type: "string",
              defaultValue: "–",
              description:
                "Class for the outer container (the element that carries the variant styles); className styles the hidden input.",
            },
          ]}
        />
        <PropsTable
          title="InputOTPSlot"
          rows={[
            {
              prop: "index",
              type: "number",
              defaultValue: "–",
              description:
                "Required. Which character of the value this slot displays.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "InputOTPGroup",
              description:
                'Row of adjacent slots (data-slot="input-otp-group"). Set aria-invalid here to switch all slots to the error surface.',
            },
            {
              part: "InputOTPSlot",
              description:
                'One character cell with a blinking fake caret when active (data-slot="input-otp-slot", data-active).',
            },
            {
              part: "InputOTPSeparator",
              description:
                'Minus-icon divider with role="separator" between groups (data-slot="input-otp-separator").',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Focus lands on a single real <code>input</code> element (rendered
          invisibly by <code>input-otp</code>), so typing, arrow keys, backspace
          and pasting a full code all behave natively while the slots are purely
          visual – the active slot shows a ring plus an animated fake caret.
          Label the control with a <code>FieldLabel</code> or{" "}
          <code>aria-label</code>, and reflect errors with{" "}
          <code>aria-invalid</code> on the group.
        </DocProse>
        <DocProse>
          Styling flows from the container: variant and size classes target{" "}
          <code>[data-slot=input-otp-slot]</code> descendants, the active slot
          exposes <code>data-active="true"</code>, and the parts carry{" "}
          <code>data-slot</code> attributes (<code>input-otp</code>,{" "}
          <code>input-otp-group</code>, <code>input-otp-slot</code>,{" "}
          <code>input-otp-separator</code>) for CSS overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
