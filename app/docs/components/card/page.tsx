"use client"

import { MoreHorizontalIcon, PhoneIncomingIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

function cardPlaygroundCode(v: PlaygroundValues) {
  const size = v.size as string
  const lines = [
    `<Card${size !== "md" ? ` size="${size}"` : ""}>`,
    `  <CardHeader>`,
    `    <CardTitle>${v.title}</CardTitle>`,
  ]
  if (v.description) {
    lines.push(`    <CardDescription>${v.description}</CardDescription>`)
  }
  if (v.action) {
    lines.push(
      `    <CardAction>`,
      `      <Button variant="ghost" size="icon-sm">`,
      `        <MoreHorizontalIcon />`,
      `      </Button>`,
      `    </CardAction>`
    )
  }
  lines.push(
    `  </CardHeader>`,
    `  <CardContent>`,
    `    <p className="text-sm text-muted-foreground">`,
    `      Cards group related content and actions into a single surface.`,
    `    </p>`,
    `  </CardContent>`
  )
  if (v.footer) {
    lines.push(
      `  <CardFooter>`,
      `    <Button className="w-full">View project</Button>`,
      `  </CardFooter>`
    )
  }
  lines.push(`</Card>`)
  return lines.join("\n")
}

function CardPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-sm">
      <Card size={v.size as "sm" | "md" | "lg" | "xl"}>
        <CardHeader>
          <CardTitle>{v.title}</CardTitle>
          {Boolean(v.description) && (
            <CardDescription>{v.description}</CardDescription>
          )}
          {Boolean(v.action) && (
            <CardAction>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontalIcon />
              </Button>
            </CardAction>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cards group related content and actions into a single surface.
          </p>
        </CardContent>
        {Boolean(v.footer) && (
          <CardFooter>
            <Button className="w-full">View project</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default function CardDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Card"
        description="Displays a card with header, content and footer. Four sizes, plus mail, message and call variants."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            title: { type: "text", defaultValue: "Welcome back, Sally" },
            description: {
              type: "text",
              defaultValue: "Three tasks are due today.",
            },
            size: {
              type: "options",
              options: ["sm", "md", "lg", "xl"],
              defaultValue: "md",
            },
            action: { type: "boolean", defaultValue: true },
            footer: { type: "boolean", defaultValue: false },
          }}
          renderPreview={CardPlaygroundPreview}
          renderCode={cardPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          The default <code>variant</code> renders a rounded{" "}
          <code>bg-card</code> surface. <code>CardHeader</code> lays out{" "}
          <code>CardTitle</code> and <code>CardDescription</code> on a grid;{" "}
          <code>CardContent</code> holds the body.
        </DocProse>
        <DocExample
          code={`
<Card>
  <CardHeader>
    <CardTitle>Welcome back, Sally</CardTitle>
    <CardDescription>
      Pick up where you left off – three tasks are due today.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Cards group related content and actions into a single surface.
    </p>
  </CardContent>
</Card>`}
        >
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, Sally</CardTitle>
                <CardDescription>
                  Pick up where you left off – three tasks are due today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cards group related content and actions into a single surface.
                </p>
              </CardContent>
            </Card>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="card" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`}
        />
        <CodeBlock
          code={`
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`}
        />
      </DocSection>

      <DocSection title="Action and footer">
        <DocProse>
          <code>CardAction</code> pins a control to the header's top-right
          corner via a two-column grid; <code>CardFooter</code> adds a padded
          bottom row (the card drops its own bottom padding when a footer is
          present).
        </DocProse>
        <DocExample
          code={`
<Card>
  <CardHeader>
    <CardTitle>Project Atlas</CardTitle>
    <CardDescription>Last updated 2 hours ago</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm">
        <MoreHorizontalIcon />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <Badge variant="secondary">In progress</Badge>
  </CardContent>
  <CardFooter>
    <Button className="w-full">View project</Button>
  </CardFooter>
</Card>`}
        >
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Project Atlas</CardTitle>
                <CardDescription>Last updated 2 hours ago</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontalIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">In progress</Badge>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View project</Button>
              </CardFooter>
            </Card>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          Beyond <code>default</code>, three compact variants target common
          feeds: <code>mail</code> and <code>call</code> are tighter{" "}
          <code>bg-card</code> rows, while <code>message</code> sits on a{" "}
          <code>bg-input</code> surface for chat bubbles. Their content is
          free-form – the header/content parts are optional.
        </DocProse>
        <DocExample
          code={`
<Card variant="message" className="inline-block self-start">
  <p className="text-sm">
    <span className="font-medium text-foreground">@Sandra Bass</span>,
    Great teamwork, everyone!
  </p>
</Card>

<Card variant="call">
  <div className="flex items-center gap-3">
    <div className="flex size-8 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <PhoneIncomingIcon className="size-3.5" />
    </div>
    <div className="flex flex-1 flex-col">
      <p className="text-sm font-medium text-foreground">Inbound Call</p>
      <p className="text-sm text-destructive">Missed call</p>
    </div>
    <span className="text-xs text-muted-foreground">14 May</span>
  </div>
</Card>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Card variant="message" className="inline-block self-start">
              <p className="text-sm">
                <span className="font-medium text-foreground">
                  @Sandra Bass
                </span>
                , Great teamwork, everyone!
              </p>
            </Card>
            <Card variant="call">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <PhoneIncomingIcon className="size-3.5" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-medium text-foreground">
                    Inbound Call
                  </p>
                  <p className="text-sm text-destructive">Missed call</p>
                </div>
                <span className="text-xs text-muted-foreground">14 May</span>
              </div>
            </Card>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> scales gap, padding and title typography together
          across <code>sm</code>, <code>md</code>, <code>lg</code> and{" "}
          <code>xl</code> – the parts read the size from the root via group data
          attributes, so nothing else changes in your markup.
        </DocProse>
        <DocExample
          code={`
<Card size="sm">
  <CardHeader>
    <CardDescription>Revenue</CardDescription>
    <CardTitle className="text-2xl">$12,430</CardTitle>
  </CardHeader>
  <CardContent>
    <span className="text-xs text-success-foreground">+8.2% this week</span>
  </CardContent>
</Card>`}
        >
          <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
            {[
              { label: "Revenue", value: "$12,430", delta: "+8.2%" },
              { label: "Active users", value: "2,041", delta: "+12.4%" },
            ].map((s) => (
              <Card key={s.label} size="sm">
                <CardHeader>
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl">{s.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-success-foreground">
                    {s.delta} this week
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Card</code> is a compound component of plain <code>div</code>s –
          every part accepts <code>className</code> and standard div props. Only
          the root takes configuration; the parts read size and variant from it
          through group data attributes.
        </DocProse>
        <PropsTable
          title="Card"
          rows={[
            {
              prop: "variant",
              type: '"default" | "mail" | "message" | "call"',
              defaultValue: '"default"',
              description:
                "Surface style – the padded default card, or the compact mail / message / call rows.",
            },
            {
              prop: "size",
              type: '"sm" | "md" | "lg" | "xl"',
              defaultValue: '"md"',
              description:
                "Scales the internal gap, horizontal padding and CardTitle type size in the default variant.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "CardHeader",
              description:
                'Grid header (data-slot="card-header"). Grows a second column when a CardAction is present and a second row for CardDescription.',
            },
            {
              part: "CardTitle",
              description:
                'Heading line (data-slot="card-title"). Sizes with the card: text-sm (sm) up to text-xl (xl).',
            },
            {
              part: "CardDescription",
              description:
                'Muted supporting copy under the title (data-slot="card-description").',
            },
            {
              part: "CardAction",
              description:
                'Top-right header slot (data-slot="card-action") for icon buttons or menus – spans both header rows and aligns to the end.',
            },
            {
              part: "CardContent",
              description:
                'Main body (data-slot="card-content") with size-aware horizontal padding.',
            },
            {
              part: "CardFooter",
              description:
                'Bottom row (data-slot="card-footer"). Its presence removes the card\'s own bottom padding.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The root exposes <code>data-slot="card"</code>, <code>data-size</code>{" "}
          and <code>data-variant</code> for CSS targeting. A first-child{" "}
          <code>img</code> automatically loses the card's top padding and gains
          rounded top corners – handy for cover images. The{" "}
          <code>cardVariants</code> cva helper is exported for building custom
          card surfaces:
        </DocProse>
        <CodeBlock
          code={`
import { cardVariants } from "@/components/ui/card"

<div className={cn(cardVariants({ variant: "message" }))}>
  ...
</div>`}
        />
      </DocSection>
    </DocPage>
  )
}
