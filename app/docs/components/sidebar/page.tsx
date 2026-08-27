"use client"

import {
  CodeBlock,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

export default function SidebarDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Sidebar"
        description="A composable application sidebar with cookie-persisted state and a Cmd/Ctrl+B toggle. Three variants, three collapse modes, and a Sheet on mobile."
      />

      <DocSection title="Structure">
        <DocProse>
          Wrap the page in <code>SidebarProvider</code>, render a{" "}
          <code>Sidebar</code> beside a <code>SidebarInset</code> for the main
          content, and put a <code>SidebarTrigger</code> anywhere inside the
          provider. This page documents the API with code only – the sidebar
          takes over the full viewport, so see the showcase for a live demo.
        </DocProse>
        <CodeBlock
          code={`
<SidebarProvider>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <header className="flex h-14 items-center border-b px-4">
      <SidebarTrigger />
    </header>
    <div className="p-6">Page content</div>
  </SidebarInset>
</SidebarProvider>`}
        />
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="sidebar" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"`}
        />
        <DocProse>
          The provider usually lives in a layout so the sidebar persists across
          routes. It reads and writes a <code>sidebar_state</code> cookie (7-day
          max-age), so you can restore the last state on the server:
        </DocProse>
        <CodeBlock
          code={`
// app/layout.tsx
import { cookies } from "next/headers"

export default async function Layout({ children }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}`}
        />
      </DocSection>

      <DocSection title="Collapsible modes">
        <DocProse>
          <code>collapsible</code> controls what happens when the sidebar
          closes: <code>offcanvas</code> (default) slides it fully out of view,{" "}
          <code>icon</code> shrinks it to a 3rem icon rail – menu buttons show
          their <code>tooltip</code> and labels, badges and submenus hide – and{" "}
          <code>none</code> renders a fixed, non-collapsing column.
        </DocProse>
        <CodeBlock
          code={`
<Sidebar collapsible="offcanvas" />  // slides out of view (default)
<Sidebar collapsible="icon" />       // collapses to a 3rem icon rail
<Sidebar collapsible="none" />       // always expanded`}
        />
        <DocProse>
          <code>side</code> and <code>variant</code> combine with any mode:{" "}
          <code>floating</code> wraps the content in a padded, rounded,
          ring-bordered card and <code>inset</code> pairs with{" "}
          <code>SidebarInset</code> to render the main content as a raised,
          rounded panel.
        </DocProse>
        <CodeBlock
          code={`
<Sidebar side="right" variant="floating" collapsible="icon">
  ...
</Sidebar>`}
        />
      </DocSection>

      <DocSection title="Menus">
        <DocProse>
          <code>SidebarMenu</code> renders a <code>ul</code> of{" "}
          <code>SidebarMenuItem</code>s. A menu button takes{" "}
          <code>isActive</code> for the current route, <code>tooltip</code> for
          the icon-collapsed state, and hosts an optional trailing{" "}
          <code>SidebarMenuAction</code> or <code>SidebarMenuBadge</code>;
          nested links go in a <code>SidebarMenuSub</code>.
        </DocProse>
        <CodeBlock
          code={`
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton tooltip="Inbox" isActive>
      <Inbox />
      <span>Inbox</span>
    </SidebarMenuButton>
    <SidebarMenuBadge>12</SidebarMenuBadge>
  </SidebarMenuItem>

  <SidebarMenuItem>
    <SidebarMenuButton tooltip="Projects">
      <Folder />
      <span>Projects</span>
    </SidebarMenuButton>
    <SidebarMenuAction showOnHover title="Add project">
      <Plus />
    </SidebarMenuAction>
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton href="#" isActive>
          <span>Design System</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton href="#">
          <span>Marketing Site</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</SidebarMenu>`}
        />
        <DocProse>
          Parts that render interactive elements (<code>SidebarMenuButton</code>
          , <code>SidebarMenuSubButton</code>, <code>SidebarMenuAction</code>,{" "}
          <code>SidebarGroupLabel</code>, <code>SidebarGroupAction</code>)
          accept a Base UI <code>render</code> prop to swap the underlying tag –
          for example a Next.js <code>Link</code> or a{" "}
          <code>DropdownMenuTrigger</code>:
        </DocProse>
        <CodeBlock
          code={`
<SidebarMenuButton render={<Link href="/dashboard" />}>
  <Home />
  <span>Dashboard</span>
</SidebarMenuButton>`}
        />
        <DocProse>
          While data loads, <code>SidebarMenuSkeleton</code> renders a
          placeholder row with a random 50–90% text width:
        </DocProse>
        <CodeBlock
          code={`
<SidebarMenu>
  {Array.from({ length: 5 }).map((_, i) => (
    <SidebarMenuItem key={i}>
      <SidebarMenuSkeleton showIcon />
    </SidebarMenuItem>
  ))}
</SidebarMenu>`}
        />
      </DocSection>

      <DocSection title="useSidebar">
        <DocProse>
          Any component under the provider can read and drive the sidebar
          through the <code>useSidebar</code> hook. It throws if called outside
          a <code>SidebarProvider</code>.
        </DocProse>
        <CodeBlock
          code={`
function CloseOnNavigate() {
  const { isMobile, setOpenMobile, toggleSidebar } = useSidebar()

  return (
    <SidebarMenuButton
      onClick={() => {
        if (isMobile) setOpenMobile(false)
      }}
    >
      ...
    </SidebarMenuButton>
  )
}`}
        />
        <PropsTable
          title="useSidebar()"
          rows={[
            {
              prop: "state",
              type: '"expanded" | "collapsed"',
              defaultValue: '"expanded"',
              description:
                "Derived desktop state; mirrors open and is reflected on the sidebar as data-state.",
            },
            {
              prop: "open",
              type: "boolean",
              defaultValue: "true",
              description: "Desktop open state.",
            },
            {
              prop: "setOpen",
              type: "(open: boolean) => void",
              defaultValue: "–",
              description:
                "Sets the desktop state and persists it in the sidebar_state cookie.",
            },
            {
              prop: "openMobile",
              type: "boolean",
              defaultValue: "false",
              description: "Whether the mobile Sheet is open.",
            },
            {
              prop: "setOpenMobile",
              type: "(open: boolean) => void",
              defaultValue: "–",
              description: "Opens or closes the mobile Sheet.",
            },
            {
              prop: "isMobile",
              type: "boolean",
              defaultValue: "false",
              description:
                "True below the 768px breakpoint, via the useIsMobile hook (false during the first render, before the media query resolves).",
            },
            {
              prop: "toggleSidebar",
              type: "() => void",
              defaultValue: "–",
              description:
                "Toggles the sidebar for the current device – desktop open state or the mobile Sheet. Also bound to Cmd/Ctrl+B.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          Two components take configuration props; every other part is a styled
          wrapper that accepts <code>className</code> and the props of the
          element it renders.
        </DocProse>
        <PropsTable
          title="SidebarProvider"
          rows={[
            {
              prop: "defaultOpen",
              type: "boolean",
              defaultValue: "true",
              description: "Initial desktop open state when uncontrolled.",
            },
            {
              prop: "open",
              type: "boolean",
              defaultValue: "–",
              description:
                "Controlled open state; pair with onOpenChange. Cookie persistence still runs on change.",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              defaultValue: "–",
              description: "Called with the next state on every toggle.",
            },
            {
              prop: "style",
              type: "CSSProperties",
              defaultValue: "–",
              description:
                "Merged over the wrapper's CSS variables – override --sidebar-width (16rem) and --sidebar-width-icon (3rem) here to resize the sidebar.",
            },
          ]}
        />
        <PropsTable
          title="Sidebar"
          rows={[
            {
              prop: "side",
              type: '"left" | "right"',
              defaultValue: '"left"',
              description: "Which edge of the viewport the sidebar docks to.",
            },
            {
              prop: "variant",
              type: '"sidebar" | "floating" | "inset"',
              defaultValue: '"sidebar"',
              description:
                "Visual treatment: flush full-height column with a border, a floating rounded card, or the inset layout where SidebarInset renders the page as a raised panel.",
            },
            {
              prop: "collapsible",
              type: '"offcanvas" | "icon" | "none"',
              defaultValue: '"offcanvas"',
              description:
                "Collapse behavior when closed: slide fully away, shrink to an icon rail, or never collapse.",
            },
          ]}
        />
        <PropsTable
          title="SidebarMenuButton"
          rows={[
            {
              prop: "isActive",
              type: "boolean",
              defaultValue: "false",
              description:
                "Marks the current item – raised surface background, foreground text and a shadow, reflected as data-active.",
            },
            {
              prop: "variant",
              type: '"default" | "outline"',
              defaultValue: '"default"',
              description:
                "Default is transparent with an accent hover; outline adds a background and a hairline shadow ring.",
            },
            {
              prop: "size",
              type: '"default" | "sm" | "lg"',
              defaultValue: '"default"',
              description:
                "Row height and text size: h-8, h-7 with text-xs, or h-10 for header-style rows with avatars.",
            },
            {
              prop: "tooltip",
              type: "string | TooltipContent props",
              defaultValue: "–",
              description:
                "Tooltip shown to the right of the button, only while the sidebar is icon-collapsed on desktop.",
            },
            {
              prop: "render",
              type: "ReactElement | function",
              defaultValue: "–",
              description:
                "Base UI render prop to replace the default button element, e.g. a Link.",
            },
          ]}
        />
        <PropsTable
          title="SidebarMenuSubButton"
          rows={[
            {
              prop: "isActive",
              type: "boolean",
              defaultValue: "false",
              description:
                "Accent background and text for the current sub-item, reflected as data-active.",
            },
            {
              prop: "size",
              type: '"sm" | "md"',
              defaultValue: '"md"',
              description:
                "Text size of the sub-link: text-xs or text-sm (both rows are h-7).",
            },
            {
              prop: "render",
              type: "ReactElement | function",
              defaultValue: "–",
              description:
                "Base UI render prop to replace the default anchor element.",
            },
          ]}
        />
        <PropsTable
          title="SidebarMenuAction"
          rows={[
            {
              prop: "showOnHover",
              type: "boolean",
              defaultValue: "false",
              description:
                "On desktop, keeps the action invisible until the row is hovered or focused (always visible on touch).",
            },
          ]}
        />
        <PropsTable
          title="SidebarMenuSkeleton"
          rows={[
            {
              prop: "showIcon",
              type: "boolean",
              defaultValue: "false",
              description:
                "Adds a square icon placeholder before the text bar.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Parts">
        <DocProse>
          Every part tags itself with a <code>data-slot</code> attribute (and
          most with a legacy <code>data-sidebar</code> attribute) for CSS
          targeting:
        </DocProse>
        <PartsTable
          rows={[
            {
              part: "SidebarProvider",
              description:
                'Context provider and flex wrapper (data-slot="sidebar-wrapper"). Defines --sidebar-width and --sidebar-width-icon and binds the Cmd/Ctrl+B shortcut.',
            },
            {
              part: "Sidebar",
              description:
                'The sidebar itself (data-slot="sidebar"). On desktop renders a gap element plus a fixed container (data-slot="sidebar-gap", "sidebar-container", "sidebar-inner"); on mobile renders a Sheet.',
            },
            {
              part: "SidebarTrigger",
              description:
                'Ghost icon Button with a PanelLeft icon and sr-only label that calls toggleSidebar (data-slot="sidebar-trigger").',
            },
            {
              part: "SidebarRail",
              description:
                'Invisible grab strip along the sidebar edge that toggles on click, with directional resize cursors (data-slot="sidebar-rail").',
            },
            {
              part: "SidebarInset",
              description:
                'The main element for page content (data-slot="sidebar-inset"). With variant="inset" it becomes a rounded, shadowed panel.',
            },
            {
              part: "SidebarHeader / SidebarFooter",
              description:
                'Sticky top and bottom zones of the column (data-slot="sidebar-header" / "sidebar-footer").',
            },
            {
              part: "SidebarContent",
              description:
                'Scrollable middle region with a scroll-driven shadow mask (data-slot="sidebar-content").',
            },
            {
              part: "SidebarInput",
              description:
                'Input restyled for the sidebar surface (data-slot="sidebar-input").',
            },
            {
              part: "SidebarSeparator",
              description:
                'Separator on the sidebar border color with horizontal margins (data-slot="sidebar-separator").',
            },
            {
              part: "SidebarGroup",
              description:
                'Padded section within the content area (data-slot="sidebar-group").',
            },
            {
              part: "SidebarGroupLabel",
              description:
                'Small heading row; fades and slides away in icon mode (data-slot="sidebar-group-label"). Accepts render.',
            },
            {
              part: "SidebarGroupAction",
              description:
                'Icon button in the group\'s top-right corner; hidden in icon mode (data-slot="sidebar-group-action"). Accepts render.',
            },
            {
              part: "SidebarGroupContent",
              description:
                'Plain wrapper for the group body (data-slot="sidebar-group-content").',
            },
            {
              part: "SidebarMenu / SidebarMenuItem",
              description:
                'ul and li primitives for a menu list (data-slot="sidebar-menu" / "sidebar-menu-item").',
            },
            {
              part: "SidebarMenuButton",
              description:
                'The main row control (data-slot="sidebar-menu-button"). Reflects data-size and data-active; shrinks to a square icon button in icon mode.',
            },
            {
              part: "SidebarMenuAction",
              description:
                'Trailing icon button positioned over the row (data-slot="sidebar-menu-action"), aligned per button size.',
            },
            {
              part: "SidebarMenuBadge",
              description:
                'Non-interactive count pinned to the row edge; hidden in icon mode (data-slot="sidebar-menu-badge").',
            },
            {
              part: "SidebarMenuSkeleton",
              description:
                'Loading placeholder row with optional icon and a randomized text width (data-slot="sidebar-menu-skeleton").',
            },
            {
              part: "SidebarMenuSub / SidebarMenuSubItem",
              description:
                'Nested list for child links; hidden in icon mode (data-slot="sidebar-menu-sub" / "sidebar-menu-sub-item").',
            },
            {
              part: "SidebarMenuSubButton",
              description:
                'Indented anchor row for a child link (data-slot="sidebar-menu-sub-button"). Reflects data-size and data-active.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Behavior & styling hooks">
        <DocProse>
          The provider listens for <code>Cmd/Ctrl+B</code> to toggle the sidebar
          and writes every change to a <code>sidebar_state</code> cookie with a
          7-day max-age. Below 768px (<code>useIsMobile</code>) the sidebar
          renders inside a <code>Sheet</code> with an sr-only title and
          description, controlled by <code>openMobile</code> instead of{" "}
          <code>open</code>. On desktop the outer element exposes{" "}
          <code>data-state="expanded | collapsed"</code>,{" "}
          <code>data-collapsible</code> (set only while collapsed),{" "}
          <code>data-variant</code> and <code>data-side</code> – internal parts
          style themselves against these via{" "}
          <code>group-data-[collapsible=icon]</code>-style selectors, and you
          can target them the same way. Widths come from the{" "}
          <code>--sidebar-width</code> and <code>--sidebar-width-icon</code> CSS
          variables, and colors from the <code>bg-sidebar</code> theme token
          family.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
