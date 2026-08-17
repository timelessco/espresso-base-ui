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
      <PreviewCard label="Simple label">
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

      <PreviewCard label="Choice card — Radio">
        <FieldGroup className="max-w-sm">
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
        </FieldGroup>
      </PreviewCard>

      <PreviewCard label="Choice card — Switch">
        <FieldGroup className="max-w-sm">
          <FieldLabel>
            <Field orientation="horizontal">
              <Switch size="sm" />
              <FieldContent>
                <FieldTitle>Dark mode</FieldTitle>
                <FieldDescription>Use dark theme across the app.</FieldDescription>
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

      <PreviewCard label="FieldSet with legend">
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
          </FieldGroup>
        </FieldSet>
      </PreviewCard>

      <PreviewCard label="With separator">
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
          <FieldSeparator>or</FieldSeparator>
          <Field orientation="horizontal">
            <FieldLabel>
              <Checkbox size="sm" />
              <FieldContent>
                <FieldTitle>Option B</FieldTitle>
                <FieldDescription>Second option description.</FieldDescription>
              </FieldContent>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </PreviewCard>

      <PreviewCard label="Invalid">
        <Field
          orientation="vertical"
          data-invalid="true"
          className="max-w-sm"
        >
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
    </PreviewGrid>
  )
}
