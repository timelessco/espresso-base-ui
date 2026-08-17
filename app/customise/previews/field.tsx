"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
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

export default function FieldPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Simple Label">
        <FieldGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Choice Card — Checkbox">
        <FieldGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Choice Card — Radio">
        <FieldGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Choice Card — Switch">
        <FieldGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Simple Label — Radio">
        <RadioGroup defaultValue="notifications" className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Simple Label — Switch">
        <FieldGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Invalid — Checkbox">
        <Field orientation="vertical" data-invalid="true" className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Invalid — Radio">
        <RadioGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Invalid — Switch">
        <Field orientation="horizontal" data-invalid="true" className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Invalid — Choice Card">
        <RadioGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Field orientation="vertical" data-disabled="true" className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="FieldSet with Legend">
        <FieldSet className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Field Group with Separator">
        <FieldGroup className="max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Multiple Errors">
        <Field orientation="vertical" data-invalid="true" className="max-w-sm">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
