"use client"

import { ArrowBigUp, Command, CornerDownLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
} from "../../_components/doc"

export default function KbdDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Kbd"
        description="Displays keyboard keys and shortcuts as muted chips. KbdGroup lines up multiple keys into a combination."
      />

      <DocSection title="Preview">
        <DocProse>
          Render one <code>Kbd</code> per key. Wrap a shortcut in{" "}
          <code>KbdGroup</code> to space the keys as a single combination.
        </DocProse>
        <DocExample
          code={`
<Kbd>Esc</Kbd>
<Kbd>Tab</Kbd>
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span className="text-xs text-muted-foreground">+</span>
  <Kbd>S</Kbd>
</KbdGroup>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>S</Kbd>
            </KbdGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="kbd" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`import { Kbd, KbdGroup } from "@/components/ui/kbd"`}
        />
        <CodeBlock
          code={`
<p>
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
</p>`}
        />
      </DocSection>

      <DocSection title="With icons">
        <DocProse>
          Pass an icon as the child – an svg without an explicit size class is
          auto-sized to <code>size-3</code>.
        </DocProse>
        <DocExample
          code={`
<KbdGroup>
  <Kbd>
    <Command />
  </Kbd>
  <span className="text-xs text-muted-foreground">+</span>
  <Kbd>
    <ArrowBigUp />
  </Kbd>
  <span className="text-xs text-muted-foreground">+</span>
  <Kbd>K</Kbd>
</KbdGroup>
<Kbd>
  <CornerDownLeft />
</Kbd>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <KbdGroup>
              <Kbd>
                <Command />
              </Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>
                <ArrowBigUp />
              </Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
            <Kbd>
              <CornerDownLeft />
            </Kbd>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="In buttons">
        <DocProse>
          Drop a <code>KbdGroup</code> at the trailing edge of a button to
          advertise its shortcut.
        </DocProse>
        <DocExample
          code={`
<Button variant="outline" size="sm" className="gap-6">
  <span className="flex items-center gap-2">
    <Search />
    Search
  </span>
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</Button>`}
        >
          <Button variant="outline" size="sm" className="gap-6">
            <span className="flex items-center gap-2">
              <Search />
              Search
            </span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="In tooltips">
        <DocProse>
          Inside a <code>TooltipContent</code>, <code>Kbd</code> detects the
          context and swaps to a translucent background so it reads on the
          inverted tooltip surface – no extra props needed.
        </DocProse>
        <DocExample
          code={`
<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
    Copy
  </TooltipTrigger>
  <TooltipContent>
    <span>Copy</span>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>C</Kbd>
    </KbdGroup>
  </TooltipContent>
</Tooltip>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Copy
              </TooltipTrigger>
              <TooltipContent>
                <span>Copy</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          Both parts are purely presentational – they take{" "}
          <code>className</code>, children and standard element props. There are
          no variants.
        </DocProse>
        <PartsTable
          rows={[
            {
              part: "Kbd",
              description:
                'A single key on a muted chip (data-slot="kbd"). Renders a native kbd element, minimum size-5, with pointer-events-none and select-none so it stays decorative. Auto-sizes svg children to size-3 and adapts its colors inside tooltip content.',
            },
            {
              part: "KbdGroup",
              description:
                'Inline row that groups keys into a combination with a 1-unit gap (data-slot="kbd-group"). Also renders a kbd element; mix in plain text like "+" or "then" between keys.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          <code>Kbd</code> renders the semantic HTML <code>kbd</code> element,
          so assistive technology understands the content as keyboard input. The
          chips are non-interactive by design (<code>pointer-events-none</code>,{" "}
          <code>select-none</code>) – pair them with a real control or text
          label rather than using them as buttons. Target{" "}
          <code>[data-slot="kbd"]</code> and{" "}
          <code>[data-slot="kbd-group"]</code> from CSS for app-level overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
