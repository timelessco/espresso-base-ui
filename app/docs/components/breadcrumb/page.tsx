"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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

function breadcrumbPlaygroundCode(v: PlaygroundValues) {
  const attrs = v.size !== "sm" ? ` size="${v.size}"` : ""
  const separator =
    v.separator === "slash"
      ? `<BreadcrumbSeparator>/</BreadcrumbSeparator>`
      : `<BreadcrumbSeparator />`

  const lines = [
    `<Breadcrumb${attrs}>`,
    `  <BreadcrumbList>`,
    `    <BreadcrumbItem>`,
    `      <BreadcrumbLink href="#">Home</BreadcrumbLink>`,
    `    </BreadcrumbItem>`,
    `    ${separator}`,
    `    <BreadcrumbItem>`,
    v.ellipsis
      ? `      <BreadcrumbEllipsis />`
      : `      <BreadcrumbLink href="#">Components</BreadcrumbLink>`,
    `    </BreadcrumbItem>`,
    `    ${separator}`,
    `    <BreadcrumbItem>`,
    `      <BreadcrumbPage>${v.page}</BreadcrumbPage>`,
    `    </BreadcrumbItem>`,
    `  </BreadcrumbList>`,
    `</Breadcrumb>`,
  ]
  return lines.join("\n")
}

function BreadcrumbPlaygroundPreview(v: PlaygroundValues) {
  const separator =
    v.separator === "slash" ? (
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
    ) : (
      <BreadcrumbSeparator />
    )

  return (
    <Breadcrumb size={v.size as "sm" | "md"}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {separator}
        <BreadcrumbItem>
          {v.ellipsis ? (
            <BreadcrumbEllipsis />
          ) : (
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {separator}
        <BreadcrumbItem>
          <BreadcrumbPage>{v.page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default function BreadcrumbDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Breadcrumb"
        description="Displays the path to the current page as a trail of links. Swappable separators and an ellipsis for collapsed segments, in two sizes."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            page: { type: "text", defaultValue: "Breadcrumb" },
            size: {
              type: "options",
              options: ["sm", "md"],
              defaultValue: "sm",
            },
            separator: {
              type: "options",
              options: ["chevron", "slash"],
              defaultValue: "chevron",
            },
            ellipsis: { type: "boolean", defaultValue: false },
          }}
          renderPreview={BreadcrumbPlaygroundPreview}
          renderCode={breadcrumbPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Compose <code>BreadcrumbItem</code>s inside a{" "}
          <code>BreadcrumbList</code>, separated by{" "}
          <code>BreadcrumbSeparator</code>, and end with a{" "}
          <code>BreadcrumbPage</code> for the current location.
        </DocProse>
        <DocExample
          code={`
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="breadcrumb" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}
        />
        <CodeBlock
          code={`
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size="md"</code> bumps the trail to larger, medium-weight text
          with bigger separators; the default <code>sm</code> is compact.
        </DocProse>
        <DocExample
          code={`
<Breadcrumb size="md">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb size="md">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DocExample>
      </DocSection>

      <DocSection title="Custom separator">
        <DocProse>
          <code>BreadcrumbSeparator</code> renders a chevron by default – pass
          children to swap in any icon or text glyph.
        </DocProse>
        <DocExample
          code={`
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ArrowRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ArrowRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DocExample>
      </DocSection>

      <DocSection title="Collapsed with ellipsis">
        <DocProse>
          Replace middle segments of a long trail with{" "}
          <code>BreadcrumbEllipsis</code> – it can also serve as a dropdown
          trigger to reveal the hidden pages.
        </DocProse>
        <DocExample
          code={`
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Profile</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Edit</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Profile</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DocExample>
      </DocSection>

      <DocSection title="With a routing link">
        <DocProse>
          <code>BreadcrumbLink</code> renders an <code>a</code> by default; use
          the <code>render</code> prop to compose it with your router&apos;s
          link component.
        </DocProse>
        <DocExample
          code={`
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/ui" />}>UI</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/ui" />}>UI</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Breadcrumb</code> is a compound component: the root takes the{" "}
          <code>size</code> prop and shares it via a data attribute, so the
          list, links, page and separators all resize together. Every part
          accepts <code>className</code> plus the standard props of its element.
        </DocProse>
        <PropsTable
          title="Breadcrumb"
          rows={[
            {
              prop: "size",
              type: '"sm" | "md"',
              defaultValue: '"sm"',
              description:
                "Trail scale – sm is compact text with 12px separators; md uses larger medium-weight text and 16px separators.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "BreadcrumbList",
              description:
                'Ordered list (<ol>) that lays the trail out with wrapping (data-slot="breadcrumb-list").',
            },
            {
              part: "BreadcrumbItem",
              description:
                'List item wrapper for a link, page or ellipsis (data-slot="breadcrumb-item").',
            },
            {
              part: "BreadcrumbLink",
              description:
                'Interactive segment with hover, focus-visible and active styles (data-slot="breadcrumb-link"). Renders an <a>; use render to swap in a router link.',
            },
            {
              part: "BreadcrumbPage",
              description:
                'Non-interactive current page (data-slot="breadcrumb-page"). Marked role="link", aria-disabled and aria-current="page".',
            },
            {
              part: "BreadcrumbSeparator",
              description:
                'Divider between items (data-slot="breadcrumb-separator"). Chevron by default, any children accepted; aria-hidden presentation.',
            },
            {
              part: "BreadcrumbEllipsis",
              description:
                'Three-dot placeholder for collapsed segments with an sr-only "More" label (data-slot="breadcrumb-ellipsis"). aria-hidden presentation.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root renders a <code>nav</code> with{" "}
          <code>aria-label="breadcrumb"</code>, so assistive tech announces it
          as a navigation landmark. <code>BreadcrumbPage</code> carries{" "}
          <code>aria-current="page"</code> and <code>aria-disabled</code>, while
          separators and the ellipsis are hidden from the accessibility tree
          with <code>role="presentation"</code> and <code>aria-hidden</code>.
          Every part exposes a <code>data-slot</code> attribute and the root
          reflects its size as <code>data-size</code> – target these from CSS
          for app-level overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
