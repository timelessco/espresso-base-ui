"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
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
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

function fieldPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.orientation !== "vertical" ? ` orientation="${v.orientation}"` : "",
    v.invalid ? ` data-invalid="true"` : "",
  ].join("")

  const lines = [
    `<Field${attrs}>`,
    `  <FieldLabel>${v.label}</FieldLabel>`,
    `  <Input placeholder="you@example.com" />`,
  ]
  if (v.description) {
    lines.push(`  <FieldDescription>${v.description}</FieldDescription>`)
  }
  if (v.invalid) {
    lines.push(`  <FieldError>This field is required.</FieldError>`)
  }
  lines.push(`</Field>`)
  return lines.join("\n")
}

function FieldPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-sm">
      <Field
        orientation={v.orientation as "vertical" | "horizontal" | "responsive"}
        data-invalid={v.invalid ? "true" : undefined}
      >
        <FieldLabel>{v.label}</FieldLabel>
        <Input placeholder="you@example.com" />
        {Boolean(v.description) && (
          <FieldDescription>{v.description}</FieldDescription>
        )}
        {Boolean(v.invalid) && <FieldError>This field is required.</FieldError>}
      </Field>
    </div>
  )
}

export default function FieldDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Field"
        description="Layout primitives that wrap any control with a label, description and error message. Stacks vertically, inline or responsively."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            label: { type: "text", defaultValue: "Email address" },
            description: {
              type: "text",
              defaultValue: "We'll never share your email.",
            },
            orientation: {
              type: "options",
              options: ["vertical", "horizontal", "responsive"],
              defaultValue: "vertical",
            },
            invalid: { type: "boolean", defaultValue: false },
          }}
          renderPreview={FieldPlaygroundPreview}
          renderCode={fieldPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          The default composition places the control inside a{" "}
          <code>FieldLabel</code> next to a <code>FieldContent</code> column
          holding <code>FieldTitle</code> and <code>FieldDescription</code>.
          Clicking anywhere on the label toggles the control.
        </DocProse>
        <DocExample
          code={`
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
</Field>`}
        >
          <div className="w-full max-w-sm">
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
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="field" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"`}
        />
        <CodeBlock
          code={`
<FieldGroup>
  <Field>
    <FieldLabel>
      <Checkbox size="sm" />
      <FieldContent>
        <FieldTitle>Marketing emails</FieldTitle>
        <FieldDescription>Receive product updates.</FieldDescription>
      </FieldContent>
    </FieldLabel>
  </Field>
</FieldGroup>`}
        />
      </DocSection>

      <DocSection title="Choice cards">
        <DocProse>
          Invert the nesting – a <code>Field</code> inside a{" "}
          <code>FieldLabel</code> – and the label becomes a padded, hoverable
          card. Group radio cards under a <code>FieldSet</code> with a{" "}
          <code>FieldLegend</code>.
        </DocProse>
        <DocExample
          code={`
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
</FieldSet>`}
        >
          <div className="w-full max-w-sm">
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
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Horizontal orientation">
        <DocProse>
          <code>orientation="horizontal"</code> lays the label and control out
          in a row – the classic settings-page switch. Use{" "}
          <code>responsive</code> to stack on narrow containers and go
          horizontal from the <code>@md</code> container breakpoint.
        </DocProse>
        <DocExample
          code={`
<FieldGroup>
  <Field orientation="horizontal">
    <FieldLabel>
      <Switch size="sm" />
      <FieldContent>
        <FieldTitle>Dark mode</FieldTitle>
        <FieldDescription>Use dark theme across the app.</FieldDescription>
      </FieldContent>
    </FieldLabel>
  </Field>
  <FieldSeparator />
  <Field orientation="horizontal">
    <FieldLabel>
      <Switch size="sm" defaultChecked />
      <FieldContent>
        <FieldTitle>Compact mode</FieldTitle>
        <FieldDescription>Reduce spacing in the UI.</FieldDescription>
      </FieldContent>
    </FieldLabel>
  </Field>
</FieldGroup>`}
        >
          <div className="w-full max-w-sm">
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
              <FieldSeparator />
              <Field orientation="horizontal">
                <FieldLabel>
                  <Switch size="sm" defaultChecked />
                  <FieldContent>
                    <FieldTitle>Compact mode</FieldTitle>
                    <FieldDescription>
                      Reduce spacing in the UI.
                    </FieldDescription>
                  </FieldContent>
                </FieldLabel>
              </Field>
            </FieldGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Invalid and disabled">
        <DocProse>
          Set <code>data-invalid="true"</code> on the <code>Field</code> to tint
          it destructive and render a <code>FieldError</code>;{" "}
          <code>data-disabled="true"</code> dims the label and blocks pointer
          events on choice cards.
        </DocProse>
        <DocExample
          code={`
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
</Field>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
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
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          All parts render plain elements (<code>div</code>, <code>label</code>,{" "}
          <code>fieldset</code>, <code>legend</code>, <code>p</code>) and accept{" "}
          <code>className</code> plus the standard props of their element. Only
          the parts below take extra props.
        </DocProse>
        <PropsTable
          title="Field"
          rows={[
            {
              prop: "orientation",
              type: '"vertical" | "horizontal" | "responsive"',
              defaultValue: '"vertical"',
              description:
                "Stacks label and control (vertical), lays them out in a row (horizontal), or stacks then switches to a row at the @md container breakpoint (responsive). Reflected as data-orientation.",
            },
          ]}
        />
        <PropsTable
          title="FieldLegend"
          rows={[
            {
              prop: "variant",
              type: '"legend" | "label"',
              defaultValue: '"legend"',
              description:
                "Typography of the legend – text-base for a section legend, text-sm to match a field label. Reflected as data-variant.",
            },
          ]}
        />
        <PropsTable
          title="FieldError"
          rows={[
            {
              prop: "errors",
              type: "Array<{ message?: string } | undefined>",
              defaultValue: "–",
              description:
                "Error objects (e.g. from react-hook-form). One message renders inline; multiple unique messages render as a bulleted list. Ignored when children are passed; renders nothing when empty.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "FieldSet",
              description:
                'Native fieldset wrapper for a group of related fields (data-slot="field-set").',
            },
            {
              part: "FieldLegend",
              description:
                'Native legend for a FieldSet (data-slot="field-legend").',
            },
            {
              part: "FieldGroup",
              description:
                'Vertical stack of fields and a container-query context for the responsive orientation (data-slot="field-group").',
            },
            {
              part: "Field",
              description:
                'One field row with role="group" (data-slot="field"). Styling reacts to data-invalid and data-disabled.',
            },
            {
              part: "FieldLabel",
              description:
                'Label built on the Label component (data-slot="field-label"). Wrapping a Field turns it into an interactive choice card with hover, active and focus-within surfaces.',
            },
            {
              part: "FieldContent",
              description:
                'Column that groups title, description and error next to the control (data-slot="field-content").',
            },
            {
              part: "FieldTitle",
              description:
                'Title line in label typography (shares data-slot="field-label") for use inside FieldContent.',
            },
            {
              part: "FieldDescription",
              description:
                'Muted supporting copy (data-slot="field-description"). Links inside are underlined.',
            },
            {
              part: "FieldSeparator",
              description:
                'Horizontal rule between fields (data-slot="field-separator"), with optional inline content such as "or".',
            },
            {
              part: "FieldError",
              description:
                'Destructive-colored message with role="alert" (data-slot="field-error").',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          <code>Field</code> renders <code>role="group"</code> and{" "}
          <code>FieldError</code> renders <code>role="alert"</code> so
          validation messages are announced. <code>FieldLabel</code> is a real{" "}
          <code>label</code> – nest the control inside it or pass{" "}
          <code>htmlFor</code> pointing at the control&apos;s <code>id</code>{" "}
          (as in the radio choice cards) for label association.
        </DocProse>
        <DocProse>
          State flows through data attributes rather than context:{" "}
          <code>data-invalid="true"</code> on a Field turns the whole group
          destructive (and tints inputs inside it), and{" "}
          <code>data-disabled="true"</code> fades the label. Every part exposes
          its <code>data-slot</code> attribute for CSS targeting, and Field
          reflects <code>data-orientation</code>.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
