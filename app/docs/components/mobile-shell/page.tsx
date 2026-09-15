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
      <MobileShell className="relative h-full">
        <MobileShellHeader className="[--mobile-header-height:44px]">
          <span className="text-sm">{v.title}</span>
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
      <MobileShell className="relative h-full">
        <MobileShellHeader className="[--mobile-header-height:44px]">
          <span className="text-sm capitalize">{active}</span>
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
          shell is fixed to the viewport — <code>relative h-full</code> scopes
          it to a frame.)
        </DocProse>
        <DocExample
          code={`
const [active, setActive] = useState("home")

<MobileShell>
  <MobileShellHeader>
    <span className="capitalize">{active}</span>
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
          <code>className</code> plus their standard element props.{" "}
          <code>MobileShellHeader</code> and <code>MobileNavItem</code> add
          props of their own.
        </DocProse>
        <PropsTable
          title="MobileShellHeader"
          rows={[
            {
              prop: "children",
              type: "ReactNode",
              description:
                "The title — centered on a single line and truncated; the header height is fixed (--mobile-header-height, 64px) so a long title never reflows the page.",
            },
            {
              prop: "prefix",
              type: "ReactNode",
              description:
                "A control leading the title — usually a back button. Sits in a side column with a 40px touch-target floor.",
            },
            {
              prop: "suffix",
              type: "ReactNode",
              description:
                "A control trailing the title — usually an action button or menu.",
            },
          ]}
        />
        <PropsTable
          title="MobileNavItem"
          rows={[
            {
              prop: "label",
              type: "ReactNode",
              description: "Accessible name for the icon-only tab (aria-label).",
            },
            {
              prop: "icon",
              type: "ReactNode",
              description: "Tab icon; svgs are sized to size-6 automatically.",
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
                "Highlights the item and sets aria-current, independently of the URL. Tapping the active item scrolls the shell content back to the top instead of re-navigating.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "MobileShell",
              description:
                'Fixed, full-viewport flex column (fixed inset-0, overflow-hidden) on the app background (data-slot="mobile-shell").',
            },
            {
              part: "MobileShellHeader",
              description:
                'Pinned fixed-height header (--mobile-header-height, 64px) with a centered single-line title and prefix/suffix slots; clears the top safe-area inset in an installed PWA (data-slot="mobile-shell-header").',
            },
            {
              part: "MobileShellContent",
              description:
                'The scrolling main element – min-h-0 flex-1 with native momentum scrolling (data-slot="mobile-shell-content").',
            },
            {
              part: "MobileNav",
              description:
                'Bottom tab bar nav element – a 64px equal-width grid with a top border on the card surface; clears the home indicator in an installed PWA (data-slot="mobile-nav").',
            },
            {
              part: "MobileNavItem",
              description:
                'One icon-only tab filling the 64px bar (data-slot="mobile-nav-item") – a size-6 icon with a press-scale; label becomes the aria-label. Renders a Link when href is set and inactive, otherwise a button.',
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
          safe-area insets via <code>env(safe-area-inset-*)</code> padding when
          running as an installed PWA.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
