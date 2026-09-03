"use client"

import { ChevronRight, LoaderCircle, Mail, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

function buttonPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.variant !== "default" ? ` variant="${v.variant}"` : "",
    v.size !== "default" ? ` size="${v.size}"` : "",
    v.disabled ? ` disabled` : "",
  ].join("")

  if (v.icon) {
    return [`<Button${attrs}>`, `  <Mail /> ${v.label}`, `</Button>`].join("\n")
  }
  return `<Button${attrs}>${v.label}</Button>`
}

function ButtonPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Button
      variant={
        v.variant as
          | "default"
          | "secondary"
          | "outline"
          | "ghost"
          | "destructive"
          | "link"
      }
      size={v.size as "xs" | "sm" | "default" | "lg" | "xl" | "2xl"}
      disabled={Boolean(v.disabled)}
    >
      {Boolean(v.icon) && <Mail />}
      {v.label}
    </Button>
  )
}

export default function ButtonDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Button"
        description="Displays a button, built on Base UI. Eight variants and six sizes, each with a matching square icon-only size."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            label: { type: "text", defaultValue: "Button" },
            size: {
              type: "options",
              options: ["xs", "sm", "default", "lg", "xl", "2xl"],
              defaultValue: "default",
              labels: { default: "md" },
            },
            variant: {
              type: "options",
              options: [
                "default",
                "secondary",
                "outline",
                "ghost",
                "destructive",
                "link",
              ],
              defaultValue: "default",
            },
            icon: { type: "boolean", defaultValue: false },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={ButtonPlaygroundPreview}
          renderCode={buttonPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          <code>variant</code> sets the surface: solid <code>default</code> and{" "}
          <code>destructive</code>, soft <code>secondary</code>, bordered{" "}
          <code>outline</code>, bare <code>ghost</code>, and a text-only{" "}
          <code>link</code>. Two extra variants – <code>inverted</code> and{" "}
          <code>inverted-ghost</code> – are for sitting on dark or colored
          surfaces.
        </DocProse>
        <DocExample
          code={`
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="button" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock code={`import { Button } from "@/components/ui/button"`} />
        <CodeBlock
          code={`
<Button variant="secondary" size="sm">
  Save changes
</Button>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          Six text sizes step from <code>xs</code> (24px) through{" "}
          <code>default</code> (32px) up to <code>2xl</code> (52px), each with
          its own radius, typography and icon scale. The outline variant trims
          2px off each height so its shadow ring lines up with siblings.
        </DocProse>
        <DocExample
          code={`
<Button size="xs">xs</Button>
<Button size="sm">sm</Button>
<Button size="default">Default</Button>
<Button size="lg">lg</Button>
<Button size="xl">xl</Button>
<Button size="2xl">2xl</Button>`}
        >
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">Default</Button>
            <Button size="lg">lg</Button>
            <Button size="xl">xl</Button>
            <Button size="2xl">2xl</Button>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Icons">
        <DocProse>
          Drop an svg next to the label and it is auto-sized for the button
          size; the square <code>icon-*</code> sizes make icon-only buttons –
          give those an <code>aria-label</code>.
        </DocProse>
        <DocExample
          code={`
<Button>
  <Mail /> Send Email
</Button>

<Button variant="outline">
  Continue <ChevronRight />
</Button>

<Button size="icon" aria-label="Add item">
  <Plus />
</Button>

<Button variant="outline" size="icon-sm" aria-label="Add item">
  <Plus />
</Button>`}
        >
          <Button>
            <Mail /> Send Email
          </Button>
          <Button variant="outline">
            Continue <ChevronRight />
          </Button>
          <Button size="icon" aria-label="Add item">
            <Plus />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Add item">
            <Plus />
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled & loading">
        <DocProse>
          <code>disabled</code> mutes each variant&apos;s colors and blocks
          pointer events; for a loading state, disable the button and lead with
          a spinning icon.
        </DocProse>
        <DocExample
          code={`
<Button disabled>Default</Button>
<Button variant="secondary" disabled>
  Secondary
</Button>
<Button disabled>
  <LoaderCircle className="animate-spin" /> Loading...
</Button>`}
        >
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button disabled>
            <LoaderCircle className="animate-spin" /> Loading...
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Button</code> forwards everything to the Base UI Button
          primitive, so alongside the variant props you get{" "}
          <code>disabled</code> handling, the <code>render</code> prop for
          changing the underlying element, and <code>nativeButton</code> for
          non-button render targets – plus all standard button attributes.
        </DocProse>
        <PropsTable
          title="Button"
          rows={[
            {
              prop: "variant",
              type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link" | "inverted" | "inverted-ghost"',
              defaultValue: '"default"',
              description:
                "Visual style. inverted and inverted-ghost read their colors from the --btn-inverted-* CSS variables for use on dark or colored surfaces.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl" | "icon-2xl"',
              defaultValue: '"default"',
              description:
                "Height, padding, radius, typography and icon scale. icon-* sizes are square, for icon-only buttons.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Disables the button – pointer events are blocked and each variant swaps to its muted disabled palette.",
            },
            {
              prop: "render",
              type: "ReactElement | (props, state) => ReactElement",
              defaultValue: "–",
              description:
                "Base UI render prop. Replaces the default <button> with your element (an <a>, a Next.js Link, ...) while keeping styling and behavior.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The rendered element carries <code>data-slot="button"</code> and{" "}
          <code>data-variant</code> – compound components like ButtonGroup key
          their styles off these, and you can too. The{" "}
          <code>buttonVariants</code> cva helper is also exported for styling
          arbitrary elements as buttons:
        </DocProse>
        <CodeBlock
          code={`
import { buttonVariants } from "@/components/ui/button"

<a href="#" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
  Docs
</a>`}
        />
      </DocSection>
    </DocPage>
  )
}
