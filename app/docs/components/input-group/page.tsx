"use client"

import { Copy, Eye, Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
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

export default function InputGroupDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Input Group"
        description="An input with attached addons – icons, text, buttons or keyboard hints – inline or as block rows. The whole group focuses as one control."
      />

      <DocSection title="Preview">
        <DocProse>
          Wrap an <code>InputGroupInput</code> with addons aligned{" "}
          <code>inline-start</code> or <code>inline-end</code>; clicking an
          addon focuses the input.
        </DocProse>
        <DocExample
          code={`
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>`}
        >
          <div className="w-full max-w-xs">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="input-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"`}
        />
        <CodeBlock
          code={`
<InputGroup variant="subtle" size="sm">
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`}
        />
      </DocSection>

      <DocSection title="Text and button addons">
        <DocProse>
          <code>InputGroupText</code> renders static prefixes or suffixes, while{" "}
          <code>InputGroupButton</code> is a compact ghost Button tuned to sit
          inside the group.
        </DocProse>
        <DocExample
          code={`
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>

<InputGroup>
  <InputGroupInput placeholder="Enter value..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">
      <Copy /> Copy
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>

<InputGroup>
  <InputGroupInput placeholder="Password" type="password" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs">
      <Eye />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Enter value..." />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs">
                  <Copy /> Copy
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Password" type="password" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs">
                  <Eye />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Variants and sizes">
        <DocProse>
          The group takes the same <code>variant</code> and <code>size</code>{" "}
          scales as Input – <code>outline</code>, <code>subtle</code> and{" "}
          <code>ghost</code> across <code>xs</code> to <code>lg</code> – and
          sizes the inner control to match.
        </DocProse>
        <DocExample
          code={`
<InputGroup variant="outline" size="md">
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Outline (md)" />
</InputGroup>

<InputGroup variant="subtle" size="sm">
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Subtle (sm)" />
</InputGroup>

<InputGroup variant="ghost" size="lg">
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Ghost (lg)" />
</InputGroup>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <InputGroup variant="outline" size="md">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Outline (md)" />
            </InputGroup>
            <InputGroup variant="subtle" size="sm">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Subtle (sm)" />
            </InputGroup>
            <InputGroup variant="ghost" size="lg">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Ghost (lg)" />
            </InputGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Block alignment and textarea">
        <DocProse>
          <code>block-start</code> and <code>block-end</code> addons become
          full-width rows above or below the control, and the group switches to
          a column – swap in <code>InputGroupTextarea</code> for multi-line
          composers with an action row.
        </DocProse>
        <DocExample
          code={`
<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>Label on top</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Enter value..." />
</InputGroup>

<InputGroup>
  <InputGroupTextarea placeholder="Write a message..." rows={3} />
  <InputGroupAddon align="block-end">
    <InputGroupButton size="xs">Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <InputGroup>
              <InputGroupAddon align="block-start">
                <InputGroupText>Label on top</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Enter value..." />
            </InputGroup>
            <InputGroup>
              <InputGroupTextarea placeholder="Write a message..." rows={3} />
              <InputGroupAddon align="block-end">
                <InputGroupButton size="xs">Send</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="States">
        <DocProse>
          Disable the inner control and the whole group follows; set{" "}
          <code>data-valid</code>, <code>data-invalid</code> or{" "}
          <code>data-filled</code> on the group to force those surfaces.
        </DocProse>
        <DocExample
          code={`
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Disabled" disabled />
</InputGroup>

<InputGroup data-invalid="true">
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput defaultValue="Invalid" />
</InputGroup>

<InputGroup data-valid="true">
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput defaultValue="Valid" />
</InputGroup>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Disabled" disabled />
            </InputGroup>
            <InputGroup data-invalid="true">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="Invalid" />
            </InputGroup>
            <InputGroup data-valid="true">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="Valid" />
            </InputGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          The group root carries the visual props; addons carry alignment; the
          input and textarea are restyled versions of Input and Textarea that
          drop their own borders and shadows so the group reads as one field.
        </DocProse>
        <PropsTable
          title="InputGroup"
          rows={[
            {
              prop: "variant",
              type: '"outline" | "subtle" | "ghost"',
              defaultValue: '"outline"',
              description:
                "Surface of the whole group – shadow ring, filled secondary background, or transparent until interaction.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Group height (24 / 28 / 32 / 40px); the inner control inherits matching height, padding and text size via data-size.",
            },
          ]}
        />
        <PropsTable
          title="InputGroupAddon"
          rows={[
            {
              prop: "align",
              type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
              defaultValue: '"inline-start"',
              description:
                "Placement – inline at either end of the control, or as a full-width row above (block-start) / below (block-end), which switches the group to a column layout.",
            },
          ]}
        />
        <PropsTable
          title="InputGroupButton"
          rows={[
            {
              prop: "variant",
              type: "Button variant",
              defaultValue: '"ghost"',
              description: "Forwarded to the underlying Button.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
              defaultValue: '"xs"',
              description:
                "Compact sizes tuned for in-group use, including square icon-only options.",
            },
            {
              prop: "type",
              type: '"button" | "submit" | "reset"',
              defaultValue: '"button"',
              description:
                "Button type – defaults to button to avoid accidental form submits.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "InputGroup",
              description:
                'Group root with role="group" (data-slot="input-group"); reflects data-variant and data-size and reacts to data-filled / data-invalid / data-valid.',
            },
            {
              part: "InputGroupAddon",
              description:
                'Addon container (data-slot="input-group-addon", data-align). Clicking it focuses the input unless a button was clicked.',
            },
            {
              part: "InputGroupText",
              description:
                "Muted inline text or icon span for static prefixes and suffixes.",
            },
            {
              part: "InputGroupButton",
              description:
                "Ghost Button preconfigured with compact in-group sizing.",
            },
            {
              part: "InputGroupInput",
              description:
                'Borderless Input wired to the group (data-slot="input-group-control"); accepts all Input props except size.',
            },
            {
              part: "InputGroupTextarea",
              description:
                'Borderless Textarea wired to the group (data-slot="input-group-control") for multi-line layouts.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root and each addon render <code>role="group"</code>, and the
          focus ring is drawn on the group when the inner{" "}
          <code>data-slot="input-group-control"</code> receives focus – so one
          visual control matches one focus target. Setting{" "}
          <code>aria-invalid</code> on the control adds a destructive ring to
          the whole group; label the control itself via <code>htmlFor</code>/
          <code>id</code> or a wrapping Field. The{" "}
          <code>inputGroupVariants</code> cva helper is also exported for custom
          composite fields.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
