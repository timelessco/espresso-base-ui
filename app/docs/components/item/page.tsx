"use client"

import {
  ArrowRight,
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  Folder,
  Music,
  Sparkles,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
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

function itemPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.variant !== "default" ? ` variant="${v.variant}"` : "",
    v.size !== "default" ? ` size="${v.size}"` : "",
  ].join("")

  const lines = [`<Item${attrs}>`]
  if (v.media) {
    lines.push(
      `  <ItemMedia variant="icon">`,
      `    <Sparkles />`,
      `  </ItemMedia>`
    )
  }
  lines.push(`  <ItemContent>`, `    <ItemTitle>Upgrade to Pro</ItemTitle>`)
  if (v.description) {
    lines.push(
      `    <ItemDescription>`,
      `      Unlock premium features and unlimited projects.`,
      `    </ItemDescription>`
    )
  }
  lines.push(`  </ItemContent>`)
  if (v.actions) {
    lines.push(
      `  <ItemActions>`,
      `    <Button size="sm">Upgrade</Button>`,
      `  </ItemActions>`
    )
  }
  lines.push(`</Item>`)
  return lines.join("\n")
}

function ItemPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-md">
      <Item
        variant={v.variant as "default" | "outline" | "muted"}
        size={v.size as "default" | "sm" | "xs"}
      >
        {Boolean(v.media) && (
          <ItemMedia variant="icon">
            <Sparkles />
          </ItemMedia>
        )}
        <ItemContent>
          <ItemTitle>Upgrade to Pro</ItemTitle>
          {Boolean(v.description) && (
            <ItemDescription>
              Unlock premium features and unlimited projects.
            </ItemDescription>
          )}
        </ItemContent>
        {Boolean(v.actions) && (
          <ItemActions>
            <Button size="sm">Upgrade</Button>
          </ItemActions>
        )}
      </Item>
    </div>
  )
}

export default function ItemDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Item"
        description="A flexible list row with media, content, and action slots. Three variants, three sizes, and an ItemGroup for stacked lists with separators."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            variant: {
              type: "options",
              options: ["default", "outline", "muted"],
              defaultValue: "outline",
            },
            size: {
              type: "options",
              options: ["xs", "sm", "default"],
              defaultValue: "default",
              labels: { default: "md" },
            },
            media: { type: "boolean", defaultValue: true },
            description: { type: "boolean", defaultValue: true },
            actions: { type: "boolean", defaultValue: true },
          }}
          renderPreview={ItemPlaygroundPreview}
          renderCode={itemPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Compose a row from <code>ItemMedia</code>, <code>ItemContent</code>{" "}
          (holding <code>ItemTitle</code> and <code>ItemDescription</code>) and
          trailing <code>ItemActions</code>.
        </DocProse>
        <DocExample
          code={`
<Item variant="outline">
  <ItemMedia variant="icon">
    <Sparkles />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Upgrade to Pro</ItemTitle>
    <ItemDescription>
      Unlock premium features and unlimited projects.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm">Upgrade</Button>
  </ItemActions>
</Item>`}
        >
          <div className="w-full max-w-md">
            <Item variant="outline">
              <ItemMedia variant="icon">
                <Sparkles />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Upgrade to Pro</ItemTitle>
                <ItemDescription>
                  Unlock premium features and unlimited projects.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm">Upgrade</Button>
              </ItemActions>
            </Item>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="item" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"`}
        />
        <CodeBlock
          code={`
<Item variant="outline">
  <ItemMedia variant="icon">
    <Folder />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Documents</ItemTitle>
    <ItemDescription>128 files</ItemDescription>
  </ItemContent>
  <ItemActions>
    <ChevronRight className="size-4" />
  </ItemActions>
</Item>`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> sets the surface: <code>default</code> is
          transparent, <code>outline</code> adds the default shadow border, and{" "}
          <code>muted</code> fills with a soft muted background.
        </DocProse>
        <DocExample
          code={`
<Item variant="default">...</Item>
<Item variant="outline">...</Item>
<Item variant="muted">...</Item>`}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Item variant="default">
              <ItemMedia variant="icon">
                <Bell />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Default</ItemTitle>
                <ItemDescription>
                  Transparent border, no background.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <Bell />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Outline</ItemTitle>
                <ItemDescription>Visible border.</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="muted">
              <ItemMedia variant="icon">
                <Bell />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Muted</ItemTitle>
                <ItemDescription>Soft muted background.</ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> tunes padding and gaps: <code>default</code>,{" "}
          <code>sm</code> and <code>xs</code>. The <code>xs</code> size drops
          the description to <code>text-xs</code> and collapses padding inside
          dropdown menus.
        </DocProse>
        <DocExample
          code={`
<Item variant="outline" size="default">...</Item>
<Item variant="outline" size="sm">...</Item>
<Item variant="outline" size="xs">...</Item>`}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Item variant="outline" size="default">
              <ItemMedia variant="icon">
                <Folder />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Default size</ItemTitle>
                <ItemDescription>Roomy padding for list rows.</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm">
              <ItemMedia variant="icon">
                <Folder />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Small size</ItemTitle>
                <ItemDescription>Tighter spacing.</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="xs">
              <ItemMedia variant="icon">
                <Folder />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Extra small</ItemTitle>
                <ItemDescription>Compact for menus.</ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Media">
        <DocProse>
          <code>ItemMedia</code> takes a <code>variant</code>: <code>icon</code>{" "}
          auto-sizes a leading icon, <code>image</code> crops an image to a
          rounded square that scales with the item size, and the{" "}
          <code>default</code> variant renders children as-is – an avatar, for
          instance. When the item has a description, the media nudges down and
          aligns to the top.
        </DocProse>
        <DocExample
          code={`
<Item variant="outline">
  <ItemMedia variant="image">
    <img src="/album.jpg" alt="Album art" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Midnight Reverie</ItemTitle>
    <ItemDescription>Aria Vale · 3:42</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="icon-sm">
      <Music />
    </Button>
  </ItemActions>
</Item>

<Item variant="outline">
  <ItemMedia>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </ItemMedia>
  <ItemContent>
    <ItemTitle>shadcn</ItemTitle>
    <ItemDescription>m@example.com</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Badge variant="secondary">Owner</Badge>
  </ItemActions>
</Item>`}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Item variant="outline">
              <ItemMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop"
                  alt="Album art"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Midnight Reverie</ItemTitle>
                <ItemDescription>Aria Vale · 3:42</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-sm">
                  <Music />
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>shadcn</ItemTitle>
                <ItemDescription>m@example.com</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="secondary">Owner</Badge>
              </ItemActions>
            </Item>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Group with separators">
        <DocProse>
          Wrap items in <code>ItemGroup</code> for a stacked list – it renders{" "}
          <code>role="list"</code> and tightens its gap when the items use the{" "}
          <code>sm</code> or <code>xs</code> size. Drop an{" "}
          <code>ItemSeparator</code> between rows for a divided list.
        </DocProse>
        <DocExample
          code={`
<ItemGroup>
  <Item size="sm">
    <ItemMedia variant="icon">
      <User />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Profile</ItemTitle>
      <ItemDescription>Manage your account info.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <ChevronRight className="size-4 text-muted-foreground" />
    </ItemActions>
  </Item>
  <ItemSeparator />
  <Item size="sm">
    <ItemMedia variant="icon">
      <CreditCard />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Billing</ItemTitle>
      <ItemDescription>Plans and invoices.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <ChevronRight className="size-4 text-muted-foreground" />
    </ItemActions>
  </Item>
</ItemGroup>`}
        >
          <div className="w-full max-w-md rounded-lg shadow-default">
            <ItemGroup>
              <Item size="sm">
                <ItemMedia variant="icon">
                  <User />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Profile</ItemTitle>
                  <ItemDescription>Manage your account info.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item size="sm">
                <ItemMedia variant="icon">
                  <CreditCard />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Billing</ItemTitle>
                  <ItemDescription>Plans and invoices.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </ItemActions>
              </Item>
            </ItemGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="As a link">
        <DocProse>
          <code>Item</code> is built on Base UI&apos;s <code>useRender</code> –
          pass a <code>render</code> element to change the underlying tag.
          Anchor items get a muted hover background automatically.
        </DocProse>
        <DocExample
          code={`
<Item variant="outline" render={<a href="#" />}>
  <ItemMedia variant="icon">
    <FileText />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Read the documentation</ItemTitle>
    <ItemDescription>
      Learn how to compose items with media, content and actions.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <ArrowRight className="size-4 text-muted-foreground" />
  </ItemActions>
</Item>`}
        >
          <div className="w-full max-w-md">
            <Item variant="outline" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <FileText />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Read the documentation</ItemTitle>
                <ItemDescription>
                  Learn how to compose items with media, content and actions.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ArrowRight className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Item</code> is a compound component. The root carries the
          variant and size; every other part renders a plain element and accepts{" "}
          <code>className</code> plus its standard element props.{" "}
          <code>ItemHeader</code> and <code>ItemFooter</code> span the full
          width of the row, so combine them with{" "}
          <code>className="flex-col items-stretch"</code> on the root for
          card-like layouts.
        </DocProse>
        <PropsTable
          title="Item"
          rows={[
            {
              prop: "variant",
              type: '"default" | "outline" | "muted"',
              defaultValue: '"default"',
              description:
                "Surface – transparent (default), bordered with the default shadow (outline), or a soft muted fill (muted).",
            },
            {
              prop: "size",
              type: '"default" | "sm" | "xs"',
              defaultValue: '"default"',
              description:
                "Padding and gap scale. xs also shrinks the description to text-xs.",
            },
            {
              prop: "render",
              type: "ReactElement | (props, state) => ReactElement",
              description:
                "Base UI useRender prop – swaps the underlying div for another element, e.g. an anchor or button.",
            },
          ]}
        />
        <PropsTable
          title="ItemMedia"
          rows={[
            {
              prop: "variant",
              type: '"default" | "icon" | "image"',
              defaultValue: '"default"',
              description:
                "default renders children unchanged; icon auto-sizes an svg to size-4; image crops to a rounded square (size-10, smaller at sm/xs item sizes).",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "ItemGroup",
              description:
                'Vertical stack with role="list" (data-slot="item-group"). Gap tightens when it contains sm or xs items.',
            },
            {
              part: "ItemSeparator",
              description:
                'Horizontal Separator between rows (data-slot="item-separator").',
            },
            {
              part: "ItemContent",
              description:
                'Flexible middle column holding title and description (data-slot="item-content").',
            },
            {
              part: "ItemTitle",
              description:
                'Single-line medium-weight title (data-slot="item-title").',
            },
            {
              part: "ItemDescription",
              description:
                'Muted supporting copy, clamped to two lines; links inside are underlined (data-slot="item-description").',
            },
            {
              part: "ItemActions",
              description: 'Trailing controls row (data-slot="item-actions").',
            },
            {
              part: "ItemHeader",
              description:
                'Full-width top row with space-between alignment (data-slot="item-header").',
            },
            {
              part: "ItemFooter",
              description:
                'Full-width bottom row with space-between alignment (data-slot="item-footer").',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          <code>ItemGroup</code> announces as a list via{" "}
          <code>role="list"</code>. The root reflects its state as{" "}
          <code>data-slot="item"</code>, <code>data-variant</code> and{" "}
          <code>data-size</code>, and the parts expose their own{" "}
          <code>data-slot</code> attributes – the internal styles use these
          hooks (e.g. media aligning to the top when a description is present),
          and you can target them from CSS for app-level overrides. The root is
          focusable-styling ready: it shows a ring on <code>focus-visible</code>{" "}
          when rendered as an interactive element.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
