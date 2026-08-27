"use client"

import { Diamond } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PropsTable,
} from "../../_components/doc"

export default function BadgeDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Badge"
        description="A small pill for statuses, counts and labels. Six variants across three sizes, with leading and trailing icon slots."
      />

      <DocSection title="Preview">
        <DocProse>
          <code>variant</code> picks the surface: solid <code>default</code> and{" "}
          <code>destructive</code>, soft <code>secondary</code>, bordered{" "}
          <code>outline</code>, bare <code>ghost</code>, and <code>link</code>{" "}
          which underlines on hover.
        </DocProse>
        <DocExample
          code={`
<Badge>default</Badge>
<Badge variant="secondary">secondary</Badge>
<Badge variant="destructive">destructive</Badge>
<Badge variant="outline">outline</Badge>
<Badge variant="ghost">ghost</Badge>
<Badge variant="link">link</Badge>`}
        >
          <Badge>default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="ghost">ghost</Badge>
          <Badge variant="link">link</Badge>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="badge" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock code={`import { Badge } from "@/components/ui/badge"`} />
        <CodeBlock
          code={`
<Badge variant="secondary" size="md">
  Beta
</Badge>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Three sizes: <code>default</code> (16px), <code>md</code> (20px) and{" "}
          <code>lg</code> (24px, with slightly larger text). The outline variant
          trims 2px off each height to make room for its shadow ring.
        </DocProse>
        <DocExample
          code={`
<Badge size="default">default</Badge>
<Badge size="md">medium</Badge>
<Badge size="lg">large</Badge>`}
        >
          <Badge size="default">default</Badge>
          <Badge size="md">medium</Badge>
          <Badge size="lg">large</Badge>
        </DocExample>
      </DocSection>

      <DocSection title="With icons">
        <DocProse>
          Drop an icon before or after the text and tag it with{" "}
          <code>data-icon="inline-start"</code> or{" "}
          <code>data-icon="inline-end"</code> – the badge sizes the svg and
          balances the padding on that edge.
        </DocProse>
        <DocExample
          code={`
<Badge size="md">
  <Diamond data-icon="inline-start" />
  New
</Badge>

<Badge variant="secondary" size="md">
  Updates
  <Diamond data-icon="inline-end" />
</Badge>

<Badge size="md" className="bg-blue-600 text-blue-100">
  <Diamond data-icon="inline-start" />
  Blue
</Badge>`}
        >
          <Badge size="md">
            <Diamond data-icon="inline-start" />
            New
          </Badge>
          <Badge variant="secondary" size="md">
            Updates
            <Diamond data-icon="inline-end" />
          </Badge>
          <Badge size="md" className="bg-blue-600 text-blue-100">
            <Diamond data-icon="inline-start" />
            Blue
          </Badge>
        </DocExample>
      </DocSection>

      <DocSection title="As a link">
        <DocProse>
          The <code>render</code> prop swaps the underlying element – pass an
          anchor (or a router link) and the badge merges its classes and props
          onto it.
        </DocProse>
        <DocExample
          code={`
<Badge render={<a href="#" />}>default</Badge>
<Badge variant="outline" render={<a href="#" />}>
  outline
</Badge>`}
        >
          <Badge render={<a href="#" />}>default</Badge>
          <Badge variant="outline" render={<a href="#" />}>
            outline
          </Badge>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Badge</code> renders a <code>span</code> by default and accepts
          all standard span props plus <code>className</code>. Custom colors are
          just utility overrides – e.g.{" "}
          <code>className="bg-blue-600 text-blue-100"</code>.
        </DocProse>
        <PropsTable
          title="Badge"
          rows={[
            {
              prop: "variant",
              type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
              defaultValue: '"default"',
              description:
                "Visual style. outline draws a shadow ring on the background surface; link underlines on hover.",
            },
            {
              prop: "size",
              type: '"default" | "md" | "lg"',
              defaultValue: '"default"',
              description:
                "Pill height and typography: 16px / 20px / 24px, with matching icon sizes (10–12px).",
            },
            {
              prop: "render",
              type: "ReactElement | (props, state) => ReactElement",
              defaultValue: "–",
              description:
                "Base UI render prop. Replaces the default span with your element (an <a>, a Next.js Link, ...) while keeping the badge's classes and data attributes.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The rendered element carries <code>data-slot="badge"</code>,{" "}
          <code>data-variant</code> and <code>data-size</code> for CSS
          targeting. The <code>badgeVariants</code> cva helper is also exported
          for applying badge styles to arbitrary elements:
        </DocProse>
        <CodeBlock
          code={`
import { badgeVariants } from "@/components/ui/badge"

<a href="#" className={cn(badgeVariants({ variant: "outline", size: "lg" }))}>
  Docs
</a>`}
        />
      </DocSection>
    </DocPage>
  )
}
