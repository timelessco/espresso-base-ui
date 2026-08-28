"use client"

import * as React from "react"
import { Calculator, Calendar, Settings, Smile, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
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
import { ScrollScoped } from "../../_components/scroll-scoped"

function commandPlaygroundCode(v: PlaygroundValues) {
  const lines = [
    `<Command className="max-w-md rounded-xl shadow-5xs">`,
    `  <CommandInput placeholder="${v.placeholder}" />`,
    `  <CommandList>`,
    `    <CommandEmpty>No results found.</CommandEmpty>`,
    `    <CommandGroup heading="Suggestions">`,
    `      <CommandItem>`,
    `        <Calendar />`,
    `        Calendar`,
    `      </CommandItem>`,
    `      <CommandItem>`,
    `        <Smile />`,
    `        Search Emoji`,
    `      </CommandItem>`,
    `    </CommandGroup>`,
    `    <CommandSeparator />`,
    `    <CommandGroup heading="Settings">`,
    `      <CommandItem>`,
    `        <User />`,
    `        Profile`,
  ]
  if (v.shortcuts) lines.push(`        <CommandShortcut>⌘P</CommandShortcut>`)
  lines.push(
    `      </CommandItem>`,
    `      <CommandItem>`,
    `        <Settings />`,
    `        Settings`
  )
  if (v.shortcuts) lines.push(`        <CommandShortcut>⌘S</CommandShortcut>`)
  lines.push(
    `      </CommandItem>`,
    `    </CommandGroup>`,
    `  </CommandList>`,
    `</Command>`
  )
  return lines.join("\n")
}

function CommandPlaygroundPreview(v: PlaygroundValues) {
  return (
    <ScrollScoped>
      <Command className="w-full max-w-md rounded-xl shadow-5xs">
        <CommandInput placeholder={v.placeholder as string} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              Calendar
            </CommandItem>
            <CommandItem>
              <Smile />
              Search Emoji
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              Profile
              {Boolean(v.shortcuts) && <CommandShortcut>⌘P</CommandShortcut>}
            </CommandItem>
            <CommandItem>
              <Settings />
              Settings
              {Boolean(v.shortcuts) && <CommandShortcut>⌘S</CommandShortcut>}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </ScrollScoped>
  )
}

function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" className="w-fit" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <Calendar />
                Calendar
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Smile />
                Search Emoji
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Calculator />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <User />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export default function CommandDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Command"
        description="A command palette that filters actions as you type, built on cmdk. Use it inline or in CommandDialog for a ⌘K-style overlay."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            placeholder: {
              type: "text",
              defaultValue: "Type a command or search...",
            },
            shortcuts: { type: "boolean", defaultValue: true },
          }}
          renderPreview={CommandPlaygroundPreview}
          renderCode={commandPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          <code>Command</code> wires the <code>CommandInput</code> to the{" "}
          <code>CommandList</code> below it – typing filters items
          automatically, and <code>CommandEmpty</code> shows when nothing
          matches.
        </DocProse>
        <DocExample
          code={`
<Command className="max-w-md rounded-xl shadow-5xs">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar />
        Calendar
      </CommandItem>
      <CommandItem>
        <Smile />
        Search Emoji
      </CommandItem>
      <CommandItem>
        <Calculator />
        Calculator
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <ScrollScoped>
            <Command className="max-w-md rounded-xl shadow-5xs">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar />
                    Calendar
                  </CommandItem>
                  <CommandItem>
                    <Smile />
                    Search Emoji
                  </CommandItem>
                  <CommandItem>
                    <Calculator />
                    Calculator
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollScoped>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="command" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}
        />
        <CodeBlock
          code={`
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        />
      </DocSection>

      <DocSection title="Groups and shortcuts">
        <DocProse>
          Give each <code>CommandGroup</code> a <code>heading</code>, divide
          groups with <code>CommandSeparator</code>, and right-align key hints
          with <code>CommandShortcut</code>.
        </DocProse>
        <DocExample
          code={`
<Command className="max-w-md rounded-xl shadow-5xs">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar />
        Calendar
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User />
        Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings />
        Settings
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <ScrollScoped>
            <Command className="max-w-md rounded-xl shadow-5xs">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar />
                    Calendar
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User />
                    Profile
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings />
                    Settings
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollScoped>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled items">
        <DocProse>
          <code>disabled</code> on a <code>CommandItem</code> dims it and
          removes it from pointer and keyboard selection.
        </DocProse>
        <DocExample
          code={`
<CommandGroup heading="Unavailable">
  <CommandItem disabled>New Team (Pro plan)</CommandItem>
  <CommandItem disabled>Invite Members (Pro plan)</CommandItem>
</CommandGroup>`}
        >
          <ScrollScoped>
            <Command className="max-w-md rounded-xl shadow-5xs">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Available">
                  <CommandItem>Send Email</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Unavailable">
                  <CommandItem disabled>New Team (Pro plan)</CommandItem>
                  <CommandItem disabled>Invite Members (Pro plan)</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollScoped>
        </DocExample>
      </DocSection>

      <DocSection title="Command dialog">
        <DocProse>
          <code>CommandDialog</code> wraps the palette in a Dialog positioned at
          the upper third of the screen – control it with <code>open</code> /{" "}
          <code>onOpenChange</code> and bind it to a ⌘K keydown listener for a
          global palette.
        </DocProse>
        <DocExample
          code={`
const [open, setOpen] = React.useState(false)

<Button variant="outline" onClick={() => setOpen(true)}>
  Open command palette
</Button>

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem onSelect={() => setOpen(false)}>
          <Calendar />
          Calendar
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`}
        >
          <CommandDialogDemo />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Command</code> is the cmdk root and accepts all cmdk props –{" "}
          <code>value</code>, <code>onValueChange</code>,{" "}
          <code>shouldFilter</code>, <code>filter</code> and <code>loop</code>.
          Every other part takes <code>className</code> plus its cmdk primitive
          props.
        </DocProse>
        <PropsTable
          title="CommandDialog"
          rows={[
            {
              prop: "title",
              type: "string",
              defaultValue: '"Command Palette"',
              description:
                "Screen-reader-only dialog title (visually hidden DialogTitle).",
            },
            {
              prop: "description",
              type: "string",
              defaultValue: '"Search for a command to run..."',
              description: "Screen-reader-only dialog description.",
            },
            {
              prop: "showCloseButton",
              type: "boolean",
              defaultValue: "false",
              description:
                "Show the dialog's top-right close button inside the palette.",
            },
            {
              prop: "open / onOpenChange",
              type: "boolean / (open) => void",
              description:
                "Controlled open state, forwarded to the underlying Dialog.",
            },
          ]}
        />
        <PropsTable
          title="CommandItem"
          rows={[
            {
              prop: "value",
              type: "string",
              description:
                "Value used for filtering and selection; defaults to the item's text content.",
            },
            {
              prop: "onSelect",
              type: "(value: string) => void",
              description: "Called when the item is picked via click or Enter.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Dims the item and skips it during navigation.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "Command",
              description:
                'Filtering root (data-slot="command") on a popover surface; owns the search state.',
            },
            {
              part: "CommandInput",
              description:
                'Search field (data-slot="command-input") rendered inside an InputGroup with a trailing search icon; the wrapper carries data-slot="command-input-wrapper".',
            },
            {
              part: "CommandList",
              description:
                'Scrollable results container (data-slot="command-list") with a max height.',
            },
            {
              part: "CommandEmpty",
              description:
                'Placeholder (data-slot="command-empty") shown when no item matches the query.',
            },
            {
              part: "CommandGroup",
              description:
                'Item group (data-slot="command-group") with an optional heading styled via cmdk-group-heading.',
            },
            {
              part: "CommandItem",
              description:
                'Selectable row (data-slot="command-item") with icon support and a trailing check icon when data-checked is set.',
            },
            {
              part: "CommandShortcut",
              description:
                'Right-aligned keyboard hint span (data-slot="command-shortcut").',
            },
            {
              part: "CommandSeparator",
              description:
                'Full-width divider between groups (data-slot="command-separator").',
            },
            {
              part: "CommandDialog",
              description:
                "Dialog wrapper that positions the palette at the top third of the viewport with zero padding.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          cmdk renders the list with <code>role="listbox"</code>, keeps{" "}
          <code>aria-selected</code> on the highlighted option, and supports
          full keyboard navigation (arrows, Home/End, Enter). In{" "}
          <code>CommandDialog</code>, the underlying Dialog adds focus trapping
          and Escape-to-close, with a visually hidden title and description for
          screen readers. Every part exposes a <code>data-slot</code> attribute,
          and items reflect cmdk state as <code>data-selected</code> and{" "}
          <code>data-disabled</code> – target these from CSS for app-level
          overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
