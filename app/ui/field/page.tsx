"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function FieldPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Size Variants — SM */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Size — SM</SectionTitle>
        <FieldGroup>
          <Field orientation="vertical">
            <FieldLabel size="sm">
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Accept terms</FieldTitle>
                <FieldDescription>
                  You agree to our terms of service and privacy policy.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="vertical">
            <FieldLabel size="sm">
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Marketing emails</FieldTitle>
                <FieldDescription>
                  Receive emails about new products and features.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* Size Variants — MD */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Size — MD</SectionTitle>
        <FieldGroup>
          <Field orientation="vertical">
            <FieldLabel size="md">
              <Checkbox size="md" />
              <FieldContent>
                <FieldTitle>Accept terms</FieldTitle>
                <FieldDescription>
                  You agree to our terms of service and privacy policy.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="vertical">
            <FieldLabel size="md">
              <Checkbox size="md" defaultChecked />
              <FieldContent>
                <FieldTitle>Marketing emails</FieldTitle>
                <FieldDescription>
                  Receive emails about new products and features.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* Orientation — Vertical */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Orientation — Vertical</SectionTitle>
        <FieldGroup>
          <Field orientation="vertical">
            <FieldLabel size="sm">
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Notifications</FieldTitle>
                <FieldDescription>
                  Get notified about activity in your account.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="vertical">
            <FieldLabel size="sm">
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Email digest</FieldTitle>
                <FieldDescription>
                  Receive a weekly summary of activity.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="vertical">
            <FieldLabel size="sm">
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>SMS alerts</FieldTitle>
                <FieldDescription>
                  Get text messages for urgent updates.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* Orientation — Horizontal */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Orientation — Horizontal</SectionTitle>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldLabel size="sm">
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Dark mode</FieldTitle>
                <FieldDescription>Use dark theme across the app.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel size="sm">
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Compact mode</FieldTitle>
                <FieldDescription>Reduce spacing in the UI.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* States — Invalid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>State — Invalid</SectionTitle>
        <Field orientation="vertical" data-invalid="true">
          <FieldLabel size="sm">
            <Checkbox size="sm" />
            <FieldContent>
              <FieldTitle>Accept terms</FieldTitle>
              <FieldDescription>You must accept the terms to continue.</FieldDescription>
              <FieldError>This field is required.</FieldError>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>

      {/* States — Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>State — Disabled</SectionTitle>
        <Field orientation="vertical" data-disabled="true">
          <FieldLabel size="sm">
            <Checkbox size="sm" disabled />
            <FieldContent>
              <FieldTitle>Disabled option</FieldTitle>
              <FieldDescription>This option is currently unavailable.</FieldDescription>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>

      {/* FieldSet with Legend */}
      <div className="flex flex-col gap-4">
        <SectionTitle>FieldSet with Legend</SectionTitle>
        <FieldSet>
          <FieldLegend>Preferences</FieldLegend>
          <FieldDescription>Choose your notification preferences.</FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldLabel size="sm">
                <Checkbox size="sm" defaultChecked />
                <FieldContent>
                  <FieldTitle>Push notifications</FieldTitle>
                </FieldContent>
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel size="sm">
                <Checkbox size="sm" />
                <FieldContent>
                  <FieldTitle>Email notifications</FieldTitle>
                </FieldContent>
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel size="sm">
                <Checkbox size="sm" defaultChecked />
                <FieldContent>
                  <FieldTitle>SMS notifications</FieldTitle>
                </FieldContent>
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>

      {/* Field Group with Separator */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Field Group with Separator</SectionTitle>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldLabel size="sm">
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Option A</FieldTitle>
                <FieldDescription>First option description.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldLabel size="sm">
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Option B</FieldTitle>
                <FieldDescription>Second option description.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <FieldSeparator>or</FieldSeparator>
          <Field orientation="horizontal">
            <FieldLabel size="sm">
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Option C</FieldTitle>
                <FieldDescription>Third option description.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* Multiple Errors */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple Errors</SectionTitle>
        <Field orientation="vertical" data-invalid="true">
          <FieldLabel size="sm">
            <Checkbox size="sm" />
            <FieldContent>
              <FieldTitle>Terms and conditions</FieldTitle>
              <FieldDescription>Please review and accept.</FieldDescription>
              <FieldError
                errors={[
                  { message: "You must accept the terms." },
                  { message: "Age verification is required." },
                ]}
              />
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>
    </div>
  )
}
