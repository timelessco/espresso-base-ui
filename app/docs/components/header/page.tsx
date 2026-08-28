"use client"

import { ChevronDown, Play, Settings, Share2, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Header, HeaderSeparator } from "@/components/ui/header"
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

function AppIcon() {
  return (
    <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <Sparkles className="size-4" />
    </div>
  )
}

function headerPlaygroundCode(v: PlaygroundValues) {
  const lines = ["<Header"]
  if (v.leftControls) {
    lines.push(
      "  leftControls={",
      "    <>",
      "      <AppIcon />",
      '      <span className="text-sm font-medium">Builder</span>',
      "    </>",
      "  }"
    )
  }
  if (v.centerControls) {
    lines.push(
      "  centerControls={",
      '    <Button variant="ghost" size="sm" className="gap-1.5">',
      '      <span className="font-medium">My page</span>',
      "      <ChevronDown />",
      "    </Button>",
      "  }"
    )
  }
  if (v.rightControls) {
    lines.push(
      "  rightControls={",
      "    <>",
      '      <Button variant="secondary" size="sm">',
      "        <Share2 />",
      "        Share",
      "      </Button>",
      '      <Button size="sm">Publish</Button>',
      "    </>",
      "  }"
    )
  }
  if (lines.length === 1) return "<Header />"
  lines.push("/>")
  return lines.join("\n")
}

function HeaderPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-lg">
      <Header
        leftControls={
          v.leftControls ? (
            <>
              <AppIcon />
              <span className="text-sm font-medium">Builder</span>
            </>
          ) : undefined
        }
        centerControls={
          v.centerControls ? (
            <Button variant="ghost" size="sm" className="gap-1.5">
              <span className="font-medium">My page</span>
              <ChevronDown />
            </Button>
          ) : undefined
        }
        rightControls={
          v.rightControls ? (
            <>
              <Button variant="secondary" size="sm">
                <Share2 />
                Share
              </Button>
              <Button size="sm">Publish</Button>
            </>
          ) : undefined
        }
      />
    </div>
  )
}

export default function HeaderDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Header"
        description="A slim application top bar with left, center and right control slots. Fits breadcrumbs, selects, button groups and avatars."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            leftControls: { type: "boolean", defaultValue: true },
            centerControls: { type: "boolean", defaultValue: false },
            rightControls: { type: "boolean", defaultValue: true },
          }}
          renderPreview={HeaderPlaygroundPreview}
          renderCode={headerPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Pass content to the slots you need: <code>leftControls</code> hugs the
          leading edge, <code>rightControls</code> is pushed to the trailing
          edge with <code>ml-auto</code>, and each slot renders only when its
          prop is provided.
        </DocProse>
        <DocExample
          code={`
<Header
  leftControls={
    <>
      <AppIcon />
      <span className="text-sm font-medium">Builder</span>
    </>
  }
  rightControls={
    <>
      <Button variant="ghost" size="icon-sm">
        <Settings />
      </Button>
      <HeaderSeparator />
      <Button variant="secondary" size="sm">
        <Share2 />
        Share
      </Button>
      <Button size="sm">Publish</Button>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  }
/>`}
        >
          <div className="w-full overflow-hidden rounded-lg">
            <Header
              leftControls={
                <>
                  <AppIcon />
                  <span className="text-sm font-medium">Builder</span>
                </>
              }
              rightControls={
                <>
                  <Button variant="ghost" size="icon-sm">
                    <Settings />
                  </Button>
                  <HeaderSeparator />
                  <Button variant="secondary" size="sm">
                    <Share2 />
                    Share
                  </Button>
                  <Button size="sm">Publish</Button>
                  <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </>
              }
            />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="header" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Header, HeaderSeparator } from "@/components/ui/header"`}
        />
        <CodeBlock
          code={`
<Header
  leftControls={<Logo />}
  centerControls={<PageSwitcher />}
  rightControls={
    <>
      <Button variant="secondary" size="sm">Share</Button>
      <HeaderSeparator />
      <UserMenu />
    </>
  }
/>`}
        />
      </DocSection>

      <DocSection title="Center controls">
        <DocProse>
          <code>centerControls</code> takes the flexible middle of the bar (
          <code>flex-1</code>) and centers its content – ideal for an
          editor&apos;s document switcher between tool and action clusters.
        </DocProse>
        <DocExample
          code={`
<Header
  leftControls={<AppIcon />}
  centerControls={
    <Button variant="ghost" size="sm" className="gap-1.5">
      <span className="font-medium">My page</span>
      <span className="text-muted-foreground">- pages/my-page-c3c8</span>
      <ChevronDown />
    </Button>
  }
  rightControls={
    <>
      <Button variant="ghost" size="icon-sm">
        <Play />
      </Button>
      <Button size="sm">Publish</Button>
    </>
  }
/>`}
        >
          <div className="w-full overflow-hidden rounded-lg">
            <Header
              leftControls={<AppIcon />}
              centerControls={
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <span className="font-medium">My page</span>
                  <span className="text-muted-foreground">
                    - pages/my-page-c3c8
                  </span>
                  <ChevronDown />
                </Button>
              }
              rightControls={
                <>
                  <Button variant="ghost" size="icon-sm">
                    <Play />
                  </Button>
                  <Button size="sm">Publish</Button>
                </>
              }
            />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Separator">
        <DocProse>
          <code>HeaderSeparator</code> draws a 1px vertical rule to split
          control clusters within a slot – a labelled{" "}
          <code>role="separator"</code> rather than a plain border.
        </DocProse>
        <DocExample
          code={`
<Header
  leftControls={
    <>
      <span className="text-sm font-medium">Tasks</span>
      <HeaderSeparator />
      <span className="text-sm text-muted-foreground">4 / 6 complete</span>
    </>
  }
  rightControls={<Button size="sm">Mark complete</Button>}
/>`}
        >
          <div className="w-full overflow-hidden rounded-lg">
            <Header
              leftControls={
                <>
                  <span className="text-sm font-medium">Tasks</span>
                  <HeaderSeparator />
                  <span className="text-sm text-muted-foreground">
                    4 / 6 complete
                  </span>
                </>
              }
              rightControls={<Button size="sm">Mark complete</Button>}
            />
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Header</code> renders a semantic <code>header</code> element and
          accepts <code>className</code> plus all standard header props; any{" "}
          <code>children</code> render after the three slots.
        </DocProse>
        <PropsTable
          title="Header"
          rows={[
            {
              prop: "leftControls",
              type: "React.ReactNode",
              defaultValue: "–",
              description:
                'Leading cluster (data-slot="header-left") – logos, breadcrumbs, app switchers. Rendered only when provided.',
            },
            {
              prop: "centerControls",
              type: "React.ReactNode",
              defaultValue: "–",
              description:
                'Flexible centered middle cluster (data-slot="header-center"). Rendered only when provided.',
            },
            {
              prop: "rightControls",
              type: "React.ReactNode",
              defaultValue: "–",
              description:
                'Trailing cluster pushed to the edge with ml-auto (data-slot="header-right") – actions, avatars. Rendered only when provided.',
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "HeaderSeparator",
              description:
                'Vertical 1px divider between control clusters (data-slot="header-separator") with role="separator" and aria-orientation="vertical".',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root is a native <code>header</code> landmark, and{" "}
          <code>HeaderSeparator</code> announces itself as a vertical separator.
          The root and each slot expose <code>data-slot</code> attributes (
          <code>header</code>, <code>header-left</code>,{" "}
          <code>header-center</code>, <code>header-right</code>,{" "}
          <code>header-separator</code>) for CSS targeting.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
