"use client"

import * as React from "react"
import { Bell, House, Search, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MobileNav,
  MobileNavItem,
  MobileShell,
  MobileShellContent,
  MobileShellHeader,
} from "@/components/ui/mobile-shell"
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

const tabs = [
  { id: "home", label: "Home", icon: <House />, iconName: "House" },
  { id: "search", label: "Search", icon: <Search />, iconName: "Search" },
  { id: "alerts", label: "Alerts", icon: <Bell />, iconName: "Bell" },
  { id: "profile", label: "Profile", icon: <User />, iconName: "User" },
]

function mobileShellPlaygroundCode(v: PlaygroundValues) {
  const lines = [
    `<MobileShell>`,
    `  <MobileShellHeader>${v.title}</MobileShellHeader>`,
    ``,
    `  <MobileShellContent>Scrollable page content</MobileShellContent>`,
    ``,
    `  <MobileNav>`,
  ]
  for (const tab of tabs) {
    const active = v.tab === tab.id ? " active" : ""
    lines.push(
      `    <MobileNavItem label="${tab.label}" icon={<${tab.iconName} />}${active} />`
    )
  }
  lines.push(`  </MobileNav>`, `</MobileShell>`)
  return lines.join("\n")
}

function MobileShellPlaygroundPreview(v: PlaygroundValues) {
  const active = v.tab as string
  const label = tabs.find((t) => t.id === active)?.label

  return (
    <div className="h-[320px] w-[210px] overflow-hidden rounded-3xl border-4 border-foreground/90 bg-background shadow-elevation-md">
      <MobileShell className="h-full">
        <MobileShellHeader>
          <span className="truncate text-sm font-medium text-foreground">
            {v.title}
          </span>
        </MobileShellHeader>

        <MobileShellContent className="flex flex-col gap-2 p-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border-soft bg-card p-2"
            >
              <Avatar className="size-7">
                <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-xs font-medium text-foreground">
                  {label} item {i + 1}
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                  Header and nav stay pinned.
                </span>
              </div>
            </div>
          ))}
        </MobileShellContent>

        <MobileNav>
          {tabs.map((tab) => (
            <MobileNavItem
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={active === tab.id}
            />
          ))}
        </MobileNav>
      </MobileShell>
    </div>
  )
}

function MobileShellDemo() {
  const [active, setActive] = React.useState("home")

  return (
    <div className="h-[380px] w-[230px] overflow-hidden rounded-3xl border-4 border-foreground/90 bg-background shadow-elevation-md">
      <MobileShell className="h-full">
        <MobileShellHeader>
          <span className="text-sm font-medium text-foreground capitalize">
            {active}
          </span>
        </MobileShellHeader>

        <MobileShellContent className="flex flex-col gap-2 p-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border-soft bg-card p-2"
            >
              <Avatar className="size-7">
                <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-xs font-medium text-foreground">
                  {tabs.find((t) => t.id === active)?.label} item {i + 1}
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                  Header and nav stay pinned.
                </span>
              </div>
            </div>
          ))}
        </MobileShellContent>

        <MobileNav>
          {tabs.map((tab) => (
            <MobileNavItem
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={active === tab.id}
              onClick={() => setActive(tab.id)}
            />
          ))}
        </MobileNav>
      </MobileShell>
    </div>
  )
}

export default function MobileShellDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Mobile Shell"
        description="A fixed mobile app frame with a pinned header, scrolling content area, and bottom tab bar. Render it below the md breakpoint via useIsMobile."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            title: { type: "text", defaultValue: "Inbox" },
            tab: {
              type: "options",
              options: ["home", "search", "alerts", "profile"],
              defaultValue: "home",
            },
          }}
          renderPreview={MobileShellPlaygroundPreview}
          renderCode={mobileShellPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          A <code>MobileShell</code> stacks <code>MobileShellHeader</code>,{" "}
          <code>MobileShellContent</code> and a <code>MobileNav</code> of{" "}
          <code>MobileNavItem</code> tabs. Scroll the list – the header and nav
          stay pinned. (Shown here inside a small device frame; in an app the
          shell fills the viewport with its default <code>h-dvh</code>.)
        </DocProse>
        <DocExample
          code={`
const [active, setActive] = useState("home")

<MobileShell>
  <MobileShellHeader>
    <span className="text-sm font-medium capitalize">{active}</span>
  </MobileShellHeader>

  <MobileShellContent className="flex flex-col gap-2 p-3">
    {items.map((item) => (
      <ListRow key={item.id} item={item} />
    ))}
  </MobileShellContent>

  <MobileNav>
    {tabs.map((tab) => (
      <MobileNavItem
        key={tab.id}
        label={tab.label}
        icon={tab.icon}
        active={active === tab.id}
        onClick={() => setActive(tab.id)}
      />
    ))}
  </MobileNav>
</MobileShell>`}
        >
          <MobileShellDemo />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="mobile-shell" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  MobileNav,
  MobileNavItem,
  MobileShell,
  MobileShellContent,
  MobileShellHeader,
} from "@/components/ui/mobile-shell"`}
        />
        <CodeBlock
          code={`
<MobileShell>
  <MobileShellHeader>Title</MobileShellHeader>
  <MobileShellContent>Scrollable page content</MobileShellContent>
  <MobileNav>
    <MobileNavItem label="Home" icon={<House />} href="/" active />
    <MobileNavItem label="Search" icon={<Search />} href="/search" />
  </MobileNav>
</MobileShell>`}
        />
      </DocSection>

      <DocSection title="Link or button items">
        <DocProse>
          <code>MobileNavItem</code> renders a Next.js <code>Link</code> when{" "}
          <code>href</code> is given, otherwise a <code>button</code> – use
          links for page navigation and buttons for in-place tab state. The nav
          is an equal-width grid, so it adapts to any number of items.
        </DocProse>
        <CodeBlock
          code={`
{/* Router navigation */}
<MobileNav>
  <MobileNavItem label="Home" icon={<House />} href="/" active={pathname === "/"} />
  <MobileNavItem label="Alerts" icon={<Bell />} href="/alerts" active={pathname === "/alerts"} />
</MobileNav>

{/* Local tab state */}
<MobileNav>
  <MobileNavItem
    label="Feed"
    icon={<House />}
    active={tab === "feed"}
    onClick={() => setTab("feed")}
  />
</MobileNav>`}
        />
      </DocSection>

      <DocSection title="Pairing with the desktop layout">
        <DocProse>
          Switch between the shell and the desktop Sidebar layout at the{" "}
          <code>md</code> breakpoint with <code>useIsMobile</code> – the shell
          replaces the sidebar wholesale rather than collapsing it.
        </DocProse>
        <CodeBlock
          code={`
const isMobile = useIsMobile()

if (isMobile) {
  return (
    <MobileShell>
      <MobileShellHeader>Inbox</MobileShellHeader>
      <MobileShellContent>{children}</MobileShellContent>
      <MobileNav>{tabs}</MobileNav>
    </MobileShell>
  )
}

return <DesktopSidebarLayout>{children}</DesktopSidebarLayout>`}
        />
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          The frame parts render semantic elements – <code>header</code>,{" "}
          <code>main</code> and <code>nav</code> – and accept{" "}
          <code>className</code> plus their standard element props. Only{" "}
          <code>MobileNavItem</code> has props of its own.
        </DocProse>
        <PropsTable
          title="MobileNavItem"
          rows={[
            {
              prop: "label",
              type: "ReactNode",
              description: "Tab caption rendered below the icon.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              description: "Tab icon; svgs are sized to size-5 automatically.",
            },
            {
              prop: "href",
              type: "string",
              description:
                "When set, the item renders a Next.js Link instead of a button.",
            },
            {
              prop: "active",
              type: "boolean",
              description:
                "Highlights the item in the primary color and sets aria-current, independently of the URL.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "MobileShell",
              description:
                'Full-height flex column (h-dvh, overflow-hidden) on the app background (data-slot="mobile-shell").',
            },
            {
              part: "MobileShellHeader",
              description:
                'Pinned h-14 header element with a bottom border; pads for the top safe-area inset (data-slot="mobile-shell-header").',
            },
            {
              part: "MobileShellContent",
              description:
                'The scrolling main element – min-h-0 flex-1 with overscroll containment and hidden scrollbars (data-slot="mobile-shell-content").',
            },
            {
              part: "MobileNav",
              description:
                'Bottom tab bar nav element – an equal-width grid with a top border; pads for the bottom safe-area inset (data-slot="mobile-nav").',
            },
            {
              part: "MobileNavItem",
              description:
                'One tab (data-slot="mobile-nav-item") – icon over a text-xs label. Renders a Link when href is set, otherwise a button.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The shell uses landmark elements (<code>header</code>,{" "}
          <code>main</code>, <code>nav</code>) so assistive tech can jump
          between regions, and the active tab announces itself with{" "}
          <code>aria-current="page"</code>. The active state is also reflected
          as <code>data-active="true"</code> on the item, alongside the{" "}
          <code>data-slot</code> attributes on every part – target these from
          CSS for app-level overrides. Header and nav respect the device
          safe-area insets via <code>env(safe-area-inset-*)</code> padding.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
