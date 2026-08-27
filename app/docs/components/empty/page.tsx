"use client"

import { ArrowRight, FileText, Inbox, Plus, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
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

export default function EmptyDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Empty"
        description="A centered placeholder for states with nothing to show. Composes a media slot, title, description and an area for actions."
      />

      <DocSection title="Preview">
        <DocProse>
          Stack <code>EmptyMedia</code>, <code>EmptyTitle</code> and{" "}
          <code>EmptyDescription</code> inside an <code>EmptyHeader</code>, then
          put calls to action in <code>EmptyContent</code>.
        </DocProse>
        <DocExample
          code={`
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FileText />
    </EmptyMedia>
    <EmptyTitle>No documents</EmptyTitle>
    <EmptyDescription>
      Upload a document or create one from a template.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">
      <Plus />
      New document
    </Button>
  </EmptyContent>
</Empty>`}
        >
          <div className="w-full max-w-md">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileText />
                </EmptyMedia>
                <EmptyTitle>No documents</EmptyTitle>
                <EmptyDescription>
                  Upload a document or create one from a template.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">
                  <Plus />
                  New document
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="empty" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"`}
        />
        <CodeBlock
          code={`
<Empty>
  <EmptyHeader>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>
      Create your first project to get started.
    </EmptyDescription>
  </EmptyHeader>
</Empty>`}
        />
      </DocSection>

      <DocSection title="Media variants">
        <DocProse>
          <code>EmptyMedia</code> takes a <code>variant</code>:{" "}
          <code>icon</code> renders a small muted tile that auto-sizes an svg
          child, while the <code>default</code> variant is an unstyled slot for
          larger artwork – illustrations, avatars or avatar groups.
        </DocProse>
        <DocExample
          code={`
<EmptyMedia variant="icon">
  <Inbox />
</EmptyMedia>

<EmptyMedia>
  <div className="flex size-16 items-center justify-center rounded-full bg-muted">
    <Inbox className="size-8 text-muted-foreground" />
  </div>
</EmptyMedia>`}
        >
          <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Inbox />
                </EmptyMedia>
                <EmptyTitle>Inbox is empty</EmptyTitle>
                <EmptyDescription>
                  New messages will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                    <Inbox className="size-8 text-muted-foreground" />
                  </div>
                </EmptyMedia>
                <EmptyTitle>All clear</EmptyTitle>
                <EmptyDescription>
                  You have no pending notifications.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="With actions">
        <DocProse>
          <code>EmptyContent</code> centers whatever follows the header – pair a
          primary and a secondary button, or drop in a search input for
          no-results states.
        </DocProse>
        <DocExample
          code={`
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Users />
    </EmptyMedia>
    <EmptyTitle>No teammates yet</EmptyTitle>
    <EmptyDescription>
      Invite people to collaborate on this workspace.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <div className="flex items-center gap-2">
      <Button size="sm">
        <Plus />
        Invite
      </Button>
      <Button variant="outline" size="sm">
        Learn more
        <ArrowRight />
      </Button>
    </div>
  </EmptyContent>
</Empty>`}
        >
          <div className="w-full max-w-md">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Users />
                </EmptyMedia>
                <EmptyTitle>No teammates yet</EmptyTitle>
                <EmptyDescription>
                  Invite people to collaborate on this workspace.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex items-center gap-2">
                  <Button size="sm">
                    <Plus />
                    Invite
                  </Button>
                  <Button variant="outline" size="sm">
                    Learn more
                    <ArrowRight />
                  </Button>
                </div>
              </EmptyContent>
            </Empty>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="No results">
        <DocProse>
          For filtered views, pair a <code>Search</code> icon tile with a search
          input in <code>EmptyContent</code>; links inside{" "}
          <code>EmptyDescription</code> are underlined automatically.
        </DocProse>
        <DocExample
          code={`
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Search />
    </EmptyMedia>
    <EmptyTitle>No results found</EmptyTitle>
    <EmptyDescription>
      Try adjusting your search or filter to find what you are looking for.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <InputGroup>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search again..." />
    </InputGroup>
  </EmptyContent>
</Empty>`}
        >
          <div className="w-full max-w-md">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search />
                </EmptyMedia>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search or filter to find what you are
                  looking for.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <InputGroup>
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search again..." />
                </InputGroup>
              </EmptyContent>
            </Empty>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          All parts render plain <code>div</code>s and accept{" "}
          <code>className</code> plus standard div props – only{" "}
          <code>EmptyMedia</code> has a variant. The root draws a dashed rounded
          border by default; override it with <code>className</code> (e.g.{" "}
          <code>border-solid</code> or <code>border-none</code>) to match the
          surrounding surface.
        </DocProse>
        <PropsTable
          title="EmptyMedia"
          rows={[
            {
              prop: "variant",
              type: '"default" | "icon"',
              defaultValue: '"default"',
              description:
                "icon renders a size-7 muted rounded tile that auto-sizes an svg child to size-4; default is a transparent free-form slot.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "Empty",
              description:
                'Centered flex container (data-slot="empty") with a dashed border, rounded corners and balanced text.',
            },
            {
              part: "EmptyHeader",
              description:
                'Vertical stack for media, title and description (data-slot="empty-header").',
            },
            {
              part: "EmptyMedia",
              description:
                'Media slot above the title (data-slot="empty-icon"), reflecting its variant as data-variant.',
            },
            {
              part: "EmptyTitle",
              description:
                'Medium-weight heading line (data-slot="empty-title").',
            },
            {
              part: "EmptyDescription",
              description:
                'Muted supporting copy (data-slot="empty-description") with underlined links that highlight on hover.',
            },
            {
              part: "EmptyContent",
              description:
                'Centered action area below the header (data-slot="empty-content") for buttons, inputs or custom content.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          Every part exposes a <code>data-slot</code> attribute (
          <code>empty</code>, <code>empty-header</code>, <code>empty-icon</code>
          , <code>empty-title</code>, <code>empty-description</code>,{" "}
          <code>empty-content</code>) and <code>EmptyMedia</code> also reflects{" "}
          <code>data-variant</code> – target these from CSS for app-level
          overrides. The component is purely presentational, so give the
          surrounding region an accessible name or status role if the empty
          state should be announced.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
