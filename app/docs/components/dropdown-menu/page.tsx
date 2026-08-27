"use client"

import * as React from "react"
import {
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

function CheckboxRadioDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [position, setPosition] = React.useState("bottom")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button className="w-fit" variant="outline" />}
      >
        View options
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function DropdownMenuDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Dropdown Menu"
        description="A menu of actions opened from a trigger, built on Base UI. Supports checkbox and radio items, nested submenus and four density sizes."
      />

      <DocSection title="Preview">
        <DocProse>
          <code>DropdownMenuTrigger</code> opens the menu – pass your button via
          the Base UI <code>render</code> prop. <code>DropdownMenuContent</code>{" "}
          positions the popup and items compose icons, text and{" "}
          <code>DropdownMenuShortcut</code> hints.
        </DocProse>
        <DocExample
          code={`
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Open Menu
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>
        <User />
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard />
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings />
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <LogOut />
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button className="w-fit" variant="outline" />}
            >
              Open Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="dropdown-menu" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`}
        />
        <CodeBlock
          code={`
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Open Menu
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Option One</DropdownMenuItem>
    <DropdownMenuItem>Option Two</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> on <code>DropdownMenuContent</code> sets the item
          density for the whole menu via context – <code>xs</code>,{" "}
          <code>sm</code> (default), <code>md</code> and <code>lg</code>.
          Submenus inherit it, and individual items can override it with their
          own <code>size</code> prop.
        </DocProse>
        <DocExample
          code={`
<DropdownMenuContent size="xs">...</DropdownMenuContent>
<DropdownMenuContent size="sm">...</DropdownMenuContent>
<DropdownMenuContent size="md">...</DropdownMenuContent>
<DropdownMenuContent size="lg">...</DropdownMenuContent>`}
        >
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <DropdownMenu key={size}>
              <DropdownMenuTrigger
                render={<Button className="w-fit" variant="outline" />}
              >
                {size}
              </DropdownMenuTrigger>
              <DropdownMenuContent size={size} className="w-44">
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </DocExample>
      </DocSection>

      <DocSection title="Checkbox and radio items">
        <DocProse>
          <code>DropdownMenuCheckboxItem</code> toggles independent options and{" "}
          <code>DropdownMenuRadioGroup</code> with{" "}
          <code>DropdownMenuRadioItem</code> picks one of a set – both show a
          trailing check indicator.
        </DocProse>
        <DocExample
          code={`
const [showStatusBar, setShowStatusBar] = React.useState(true)
const [position, setPosition] = React.useState("bottom")

<DropdownMenuCheckboxItem
  checked={showStatusBar}
  onCheckedChange={setShowStatusBar}
>
  Status Bar
</DropdownMenuCheckboxItem>

<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
        >
          <CheckboxRadioDemo />
        </DocExample>
      </DocSection>

      <DocSection title="Submenus">
        <DocProse>
          Nest a <code>DropdownMenuSub</code> with a{" "}
          <code>DropdownMenuSubTrigger</code> (it gets a trailing chevron
          automatically) and a <code>DropdownMenuSubContent</code> that opens to
          the side.
        </DocProse>
        <DocExample
          code={`
<DropdownMenuSub>
  <DropdownMenuSubTrigger>
    <UserPlus />
    Invite users
  </DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>
      <Mail />
      Email
    </DropdownMenuItem>
    <DropdownMenuItem>
      <MessageSquare />
      Message
    </DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button className="w-fit" variant="outline" />}
            >
              Team menu
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus />
                  Invite users
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare />
                    Message
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>DropdownMenu</code> is the Base UI Menu root and accepts its
          props – <code>open</code>, <code>defaultOpen</code>,{" "}
          <code>onOpenChange</code> and <code>modal</code>. The trigger supports
          the Base UI <code>render</code> prop; pass{" "}
          <code>nativeButton={`{false}`}</code> when the rendered element is not
          a native button.
        </DocProse>
        <PropsTable
          title="DropdownMenuContent"
          rows={[
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"sm"',
              description:
                "Item density for the whole menu, provided to items and submenus via context (reflected as data-size).",
            },
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              defaultValue: '"bottom"',
              description: "Which side of the trigger the menu opens on.",
            },
            {
              prop: "sideOffset",
              type: "number",
              defaultValue: "4",
              description: "Gap between the trigger and the menu.",
            },
            {
              prop: "align",
              type: '"start" | "center" | "end"',
              defaultValue: '"start"',
              description: "Alignment against the trigger.",
            },
            {
              prop: "alignOffset",
              type: "number",
              defaultValue: "0",
              description: "Offset along the alignment axis.",
            },
          ]}
        />
        <PropsTable
          title="DropdownMenuItem"
          rows={[
            {
              prop: "variant",
              type: '"default" | "destructive"',
              defaultValue: '"default"',
              description:
                "Destructive items render in the destructive color, including their icon and shortcut.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: "inherited",
              description:
                "Per-item override of the size inherited from DropdownMenuContent.",
            },
            {
              prop: "inset",
              type: "boolean",
              description:
                "Indent the item to line up with items that have a leading indicator.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Dims the item and removes it from navigation.",
            },
          ]}
        />
        <PropsTable
          title="DropdownMenuCheckboxItem"
          rows={[
            {
              prop: "checked / onCheckedChange",
              type: "boolean / (checked) => void",
              description:
                "Controlled checked state with a trailing check indicator.",
            },
            {
              prop: "inset",
              type: "boolean",
              description: "Indent to align with inset items.",
            },
          ]}
        />
        <PropsTable
          title="DropdownMenuRadioGroup"
          rows={[
            {
              prop: "value / onValueChange",
              type: "string / (value) => void",
              description:
                "Selected DropdownMenuRadioItem value and its change handler.",
            },
          ]}
        />
        <PropsTable
          title="DropdownMenuSubContent"
          rows={[
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              defaultValue: '"right"',
              description: "Side of the sub-trigger the submenu opens on.",
            },
            {
              prop: "alignOffset",
              type: "number",
              defaultValue: "-3",
              description:
                "Alignment offset tuned so submenu items line up with the parent item.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "DropdownMenuTrigger",
              description:
                'Opens the menu (data-slot="dropdown-menu-trigger"); compose your button via the render prop.',
            },
            {
              part: "DropdownMenuContent",
              description:
                'Portalled popup (data-slot="dropdown-menu-content") with slide/zoom animations and data-size.',
            },
            {
              part: "DropdownMenuGroup / DropdownMenuLabel",
              description:
                'Logical item group (data-slot="dropdown-menu-group") with a small heading (data-slot="dropdown-menu-label", supports inset).',
            },
            {
              part: "DropdownMenuItem",
              description:
                'Action row (data-slot="dropdown-menu-item") reflecting data-variant, data-size and data-inset.',
            },
            {
              part: "DropdownMenuCheckboxItem / DropdownMenuRadioItem",
              description:
                'Selectable items (data-slot="dropdown-menu-checkbox-item" / "dropdown-menu-radio-item") with trailing check indicators.',
            },
            {
              part: "DropdownMenuShortcut",
              description:
                'Right-aligned keyboard hint span (data-slot="dropdown-menu-shortcut").',
            },
            {
              part: "DropdownMenuSeparator",
              description:
                'Thin divider between groups (data-slot="dropdown-menu-separator").',
            },
            {
              part: "DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent",
              description:
                'Nested submenu: root (data-slot="dropdown-menu-sub"), trigger with auto chevron (data-slot="dropdown-menu-sub-trigger") and side-opening popup (data-slot="dropdown-menu-sub-content").',
            },
            {
              part: "DropdownMenuPortal",
              description:
                'Portals menu parts to the document body (data-slot="dropdown-menu-portal"); used internally by DropdownMenuContent.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI renders the popup with <code>role="menu"</code> and items as{" "}
          <code>menuitem</code> / <code>menuitemcheckbox</code> /{" "}
          <code>menuitemradio</code>, with full keyboard support – arrows move
          the highlight, typeahead jumps to items, Enter activates and Escape
          closes. Every part exposes a <code>data-slot</code> attribute, and
          items reflect state as <code>data-highlighted</code>,{" "}
          <code>data-disabled</code>, <code>data-inset</code>,{" "}
          <code>data-variant</code> and <code>data-size</code> – target these
          from CSS for app-level overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
