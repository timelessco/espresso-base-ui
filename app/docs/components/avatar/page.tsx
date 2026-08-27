"use client"

import { User } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
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

const avatarSrc = "https://github.com/shadcn.png"

export default function AvatarDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Avatar"
        description="An image element with a fallback for representing a user. Seven sizes, circle or square, with status badges and overlapping groups."
      />

      <DocSection title="Preview">
        <DocProse>
          <code>AvatarImage</code> renders once the image loads;{" "}
          <code>AvatarFallback</code> shows initials until then (or forever, if
          there is no image). Add an <code>AvatarBadge</code> for a status dot.
        </DocProse>
        <DocExample
          code={`
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge />
</Avatar>`}
        >
          <Avatar>
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="avatar" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"`}
        />
        <CodeBlock
          code={`
<Avatar size="lg">
  <AvatarImage src="/avatars/user.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> runs from <code>xs</code> (16px) to <code>3xl</code>{" "}
          (46px). The fallback text, icon sizing, badge and group overlap all
          scale with it automatically.
        </DocProse>
        <DocExample
          code={`
<Avatar size="xs"><AvatarFallback>CN</AvatarFallback></Avatar>
<Avatar size="sm"><AvatarFallback>CN</AvatarFallback></Avatar>
<Avatar size="default"><AvatarFallback>CN</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>CN</AvatarFallback></Avatar>
<Avatar size="xl"><AvatarFallback>CN</AvatarFallback></Avatar>
<Avatar size="2xl"><AvatarFallback>CN</AvatarFallback></Avatar>
<Avatar size="3xl"><AvatarFallback>CN</AvatarFallback></Avatar>`}
        >
          {(["xs", "sm", "default", "lg", "xl", "2xl", "3xl"] as const).map(
            (size) => (
              <Avatar key={size} size={size}>
                <AvatarImage src={avatarSrc} alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )
          )}
        </DocExample>
      </DocSection>

      <DocSection title="Square">
        <DocProse>
          <code>variant="square"</code> swaps the circle for a rounded square
          whose corner radius steps up with the size token.
        </DocProse>
        <DocExample
          code={`
<Avatar variant="square">
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<Avatar variant="square" size="2xl">
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<Avatar variant="square" size="2xl">
  <User className="text-muted-foreground" />
  <AvatarBadge />
</Avatar>`}
        >
          <Avatar variant="square">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar variant="square" size="2xl">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar variant="square" size="2xl">
            <User className="text-muted-foreground" />
            <AvatarBadge />
          </Avatar>
        </DocExample>
      </DocSection>

      <DocSection title="Icon">
        <DocProse>
          Pass an icon as a direct child of <code>Avatar</code> (or inside{" "}
          <code>AvatarFallback</code>) – the root centers it and sizes the svg
          per size token.
        </DocProse>
        <DocExample
          code={`
<Avatar size="lg">
  <User className="text-muted-foreground" />
</Avatar>

<Avatar size="lg">
  <AvatarFallback>
    <User className="text-muted-foreground" />
  </AvatarFallback>
</Avatar>`}
        >
          <Avatar size="lg">
            <User className="text-muted-foreground" />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>
              <User className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </DocExample>
      </DocSection>

      <DocSection title="Group">
        <DocProse>
          <code>AvatarGroup</code> overlaps its children by each size&apos;s{" "}
          <code>--overlap</code> amount, ringed in the background color and
          stacked first-on-top; close with an <code>AvatarGroupCount</code> for
          the overflow.
        </DocProse>
        <DocExample
          code={`
<AvatarGroup>
  <Avatar size="xl">
    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar size="xl">
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar size="xl">
    <User className="text-muted-foreground" />
  </Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`}
        >
          <AvatarGroup>
            <Avatar size="xl">
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <User className="text-muted-foreground" />
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          Built on the Base UI Avatar primitive – <code>Avatar</code>,{" "}
          <code>AvatarImage</code> and <code>AvatarFallback</code> forward all
          of their Base UI props (like <code>AvatarImage</code>&apos;s{" "}
          <code>onLoadingStatusChange</code>), and every part accepts{" "}
          <code>className</code>.
        </DocProse>
        <PropsTable
          title="Avatar"
          rows={[
            {
              prop: "variant",
              type: '"circle" | "square"',
              defaultValue: '"circle"',
              description:
                "Shape. square applies a per-size corner radius (rounded-2xs at xs up to rounded-lg at 3xl).",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl"',
              defaultValue: '"default"',
              description:
                "Diameter from 16px (xs) to 46px (3xl). Also scales fallback typography, icon size, badge size and group overlap.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "AvatarImage",
              description:
                'The user image (data-slot="avatar-image"). Object-cover, inherits the root radius; unmounts while loading or on error so the fallback shows.',
            },
            {
              part: "AvatarFallback",
              description:
                'Initials or icon shown when the image is unavailable (data-slot="avatar-fallback"). Text and svg sizes track the root size.',
            },
            {
              part: "AvatarBadge",
              description:
                'Status dot pinned to the bottom-right corner (data-slot="avatar-badge"). Green by default – recolor with className and drop in an icon at larger sizes.',
            },
            {
              part: "AvatarGroup",
              description:
                'Overlapping stack (data-slot="avatar-group"). Rings each avatar with the background color and z-stacks the first child on top.',
            },
            {
              part: "AvatarGroupCount",
              description:
                'Overflow counter styled like a fallback avatar (data-slot="avatar-group-count"). Matches the size of the avatars in the group.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The root exposes <code>data-slot="avatar"</code> plus{" "}
          <code>data-size</code> and <code>data-variant</code>, and each part
          has its own <code>data-slot</code> – the badge, fallback and group
          count all key their styles off these, and you can too. The{" "}
          <code>avatarVariants</code> cva helper is exported for building custom
          avatar-shaped surfaces:
        </DocProse>
        <CodeBlock
          code={`
import { avatarVariants } from "@/components/ui/avatar"

<span className={cn(avatarVariants({ variant: "square", size: "lg" }))}>
  ...
</span>`}
        />
      </DocSection>
    </DocPage>
  )
}
