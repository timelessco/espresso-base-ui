"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
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
      {/* Simple Label (no interactive styles) */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Simple Label</SectionTitle>
        <FieldGroup>
          <Field orientation="vertical">
            <FieldLabel>
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
            <FieldLabel>
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

      {/* Choice Card — Checkbox */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Choice Card — Checkbox</SectionTitle>
        <FieldGroup>
          <FieldLabel>
            <Field orientation="horizontal">
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Accept terms</FieldTitle>
                <FieldDescription>
                  You agree to our terms of service and privacy policy.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal">
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Marketing emails</FieldTitle>
                <FieldDescription>
                  Receive emails about new products and features.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        </FieldGroup>
      </div>

      {/* Choice Card — Radio */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Choice Card — Radio</SectionTitle>
        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Compute Environment</FieldLegend>
            <FieldDescription>
              Select the compute environment for your cluster.
            </FieldDescription>
            <RadioGroup defaultValue="kubernetes">
              <FieldLabel htmlFor="kubernetes">
                <Field orientation="horizontal">
                  <RadioGroupItem value="kubernetes" id="kubernetes" />
                  <FieldContent>
                    <FieldTitle>Kubernetes</FieldTitle>
                    <FieldDescription>
                      Run GPU workloads on a K8s cluster.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="vm">
                <Field orientation="horizontal">
                  <RadioGroupItem value="vm" id="vm" />
                  <FieldContent>
                    <FieldTitle>Virtual Machine</FieldTitle>
                    <FieldDescription>
                      Access a cluster to run GPU workloads.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldSet>
        </FieldGroup>
      </div>

      {/* Choice Card — Switch */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Choice Card — Switch</SectionTitle>
        <FieldGroup>
          <FieldLabel>
            <Field orientation="horizontal">
              <Switch size="sm" />
              <FieldContent>
                <FieldTitle>Dark mode</FieldTitle>
                <FieldDescription>
                  Use dark theme across the app.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal">
              <Switch size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Compact mode</FieldTitle>
                <FieldDescription>Reduce spacing in the UI.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        </FieldGroup>
      </div>

      {/* Simple Label — Radio */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Simple Label — Radio</SectionTitle>
        <RadioGroup defaultValue="notifications">
          <FieldGroup>
            <Field orientation="vertical">
              <FieldLabel>
                <RadioGroupItem size="sm" value="notifications" />
                <FieldContent>
                  <FieldTitle>Notifications</FieldTitle>
                  <FieldDescription>
                    Get notified about activity in your account.
                  </FieldDescription>
                </FieldContent>
              </FieldLabel>
            </Field>
            <Field orientation="vertical">
              <FieldLabel>
                <RadioGroupItem size="sm" value="email" />
                <FieldContent>
                  <FieldTitle>Email digest</FieldTitle>
                  <FieldDescription>
                    Receive a weekly summary of activity.
                  </FieldDescription>
                </FieldContent>
              </FieldLabel>
            </Field>
          </FieldGroup>
        </RadioGroup>
      </div>

      {/* Simple Label — Switch */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Simple Label — Switch</SectionTitle>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldLabel>
              <Switch size="sm" />
              <FieldContent>
                <FieldTitle>Dark mode</FieldTitle>
                <FieldDescription>
                  Use dark theme across the app.
                </FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel>
              <Switch size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Compact mode</FieldTitle>
                <FieldDescription>Reduce spacing in the UI.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* Invalid — Checkbox */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Invalid — Checkbox</SectionTitle>
        <Field orientation="vertical" data-invalid="true">
          <FieldLabel>
            <Checkbox size="sm" />
            <FieldContent>
              <FieldTitle>Accept terms</FieldTitle>
              <FieldDescription>
                You must accept the terms to continue.
              </FieldDescription>
              <FieldError>This field is required.</FieldError>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>

      {/* Invalid — Radio */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Invalid — Radio</SectionTitle>
        <RadioGroup>
          <FieldGroup>
            <Field orientation="vertical" data-invalid="true">
              <FieldLabel>
                <RadioGroupItem size="sm" value="option-1" />
                <FieldContent>
                  <FieldTitle>Option one</FieldTitle>
                  <FieldDescription>
                    Select this option to continue.
                  </FieldDescription>
                  <FieldError>Please select an option.</FieldError>
                </FieldContent>
              </FieldLabel>
            </Field>
            <Field orientation="vertical" data-invalid="true">
              <FieldLabel>
                <RadioGroupItem size="sm" value="option-2" />
                <FieldContent>
                  <FieldTitle>Option two</FieldTitle>
                  <FieldDescription>
                    Or select this alternative.
                  </FieldDescription>
                </FieldContent>
              </FieldLabel>
            </Field>
          </FieldGroup>
        </RadioGroup>
      </div>

      {/* Invalid — Switch */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Invalid — Switch</SectionTitle>
        <Field orientation="horizontal" data-invalid="true">
          <FieldLabel>
            <Switch size="sm" />
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                You must enable notifications to proceed.
              </FieldDescription>
              <FieldError>This setting is required.</FieldError>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>

      {/* Invalid — Choice Card */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Invalid — Choice Card</SectionTitle>
        <RadioGroup>
          <FieldLabel>
            <Field orientation="horizontal" data-invalid="true">
              <RadioGroupItem size="sm" value="option-1" />
              <FieldContent>
                <FieldTitle>Option one</FieldTitle>
                <FieldDescription>
                  Select this option to continue.
                </FieldDescription>
                <FieldError>Please select an option.</FieldError>
              </FieldContent>
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal" data-invalid="true">
              <RadioGroupItem size="sm" value="option-2" />
              <FieldContent>
                <FieldTitle>Option two</FieldTitle>
                <FieldDescription>Or select this alternative.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <Field orientation="vertical" data-disabled="true">
          <FieldLabel>
            <Checkbox size="sm" disabled />
            <FieldContent>
              <FieldTitle>Disabled option</FieldTitle>
              <FieldDescription>
                This option is currently unavailable.
              </FieldDescription>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>

      {/* FieldSet with Legend */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>FieldSet with Legend</SectionTitle>
        <FieldSet>
          <FieldLegend>Preferences</FieldLegend>
          <FieldDescription>
            Choose your notification preferences.
          </FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldLabel>
                <Checkbox size="sm" defaultChecked />
                <FieldContent>
                  <FieldTitle>Push notifications</FieldTitle>
                </FieldContent>
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel>
                <Checkbox size="sm" />
                <FieldContent>
                  <FieldTitle>Email notifications</FieldTitle>
                </FieldContent>
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel>
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
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Field Group with Separator</SectionTitle>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldLabel>
              <Checkbox size="sm" defaultChecked />
              <FieldContent>
                <FieldTitle>Option A</FieldTitle>
                <FieldDescription>First option description.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldLabel>
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Option B</FieldTitle>
                <FieldDescription>Second option description.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
          <FieldSeparator>or</FieldSeparator>
          <Field orientation="horizontal">
            <FieldLabel>
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
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Multiple Errors</SectionTitle>
        <Field orientation="vertical" data-invalid="true">
          <FieldLabel>
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
