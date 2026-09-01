"use client"

import { Lock, Settings, User } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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

const playgroundTriggers = [
  { value: "account", label: "Account", icon: User, iconName: "User" },
  { value: "password", label: "Password", icon: Lock, iconName: "Lock" },
  {
    value: "settings",
    label: "Settings",
    icon: Settings,
    iconName: "Settings",
  },
] as const

function tabsPlaygroundCode(v: PlaygroundValues) {
  const rootAttrs =
    v.orientation === "vertical" ? ` orientation="vertical"` : ""
  const listAttrs = [
    v.variant !== "default" ? ` variant="${v.variant}"` : "",
    v.size !== "sm" ? ` size="${v.size}"` : "",
  ].join("")

  const lines = [
    `<Tabs defaultValue="account"${rootAttrs}>`,
    `  <TabsList${listAttrs}>`,
  ]
  for (const trigger of playgroundTriggers) {
    if (v.icons) {
      lines.push(
        `    <TabsTrigger value="${trigger.value}">`,
        `      <${trigger.iconName} /> ${trigger.label}`,
        `    </TabsTrigger>`
      )
    } else {
      lines.push(
        `    <TabsTrigger value="${trigger.value}">${trigger.label}</TabsTrigger>`
      )
    }
  }
  lines.push(`    <TabsIndicator />`, `  </TabsList>`, `</Tabs>`)
  return lines.join("\n")
}

function TabsPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Tabs
      key={`${v.variant}-${v.size}-${v.orientation}-${v.icons}`}
      defaultValue="account"
      orientation={v.orientation as "horizontal" | "vertical"}
    >
      <TabsList
        variant={v.variant as "default" | "line" | "ghost" | "browser"}
        size={v.size as "sm" | "default"}
      >
        {playgroundTriggers.map((trigger) => (
          <TabsTrigger key={trigger.value} value={trigger.value}>
            {Boolean(v.icons) && <trigger.icon />}
            {trigger.label}
          </TabsTrigger>
        ))}
        <TabsIndicator />
      </TabsList>
    </Tabs>
  )
}

export default function TabsDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Tabs"
        description="A set of layered panels with one visible at a time, built on Base UI. Four list variants and a sliding indicator that animates between triggers."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            variant: {
              type: "options",
              options: ["default", "line", "ghost", "browser"],
              defaultValue: "default",
            },
            size: {
              type: "options",
              options: ["sm", "default"],
              defaultValue: "sm",
            },
            orientation: {
              type: "options",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
            },
            icons: { type: "boolean", defaultValue: false },
          }}
          renderPreview={TabsPlaygroundPreview}
          renderCode={tabsPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Compose <code>TabsList</code> with <code>TabsTrigger</code>s and a{" "}
          <code>TabsIndicator</code>, then match each trigger&apos;s{" "}
          <code>value</code> with a <code>TabsContent</code> panel.
        </DocProse>
        <DocExample
          code={`
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="account">Account settings content.</TabsContent>
  <TabsContent value="password">Password settings content.</TabsContent>
  <TabsContent value="settings">General settings content.</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="account" className="w-full max-w-sm">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsIndicator />
            </TabsList>
            <TabsContent value="account">
              <p className="text-sm text-muted-foreground">
                Account settings content.
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-sm text-muted-foreground">
                Password settings content.
              </p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-sm text-muted-foreground">
                General settings content.
              </p>
            </TabsContent>
          </Tabs>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="tabs" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"`}
        />
        <CodeBlock
          code={`
<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="one">First panel.</TabsContent>
  <TabsContent value="two">Second panel.</TabsContent>
</Tabs>`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>TabsList</code> takes a <code>variant</code>:{" "}
          <code>default</code> (raised segment on a secondary surface),{" "}
          <code>line</code> (underline indicator on a bottom border),{" "}
          <code>ghost</code> (raised segment, no track background), and{" "}
          <code>browser</code> (bordered browser-style tabs). The indicator
          restyles itself per variant.
        </DocProse>
        <DocExample
          code={`
<Tabs defaultValue="account">
  <TabsList variant="line">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsIndicator />
  </TabsList>
</Tabs>

<Tabs defaultValue="account">
  <TabsList variant="ghost">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsIndicator />
  </TabsList>
</Tabs>

<Tabs defaultValue="account">
  <TabsList variant="browser">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsIndicator />
  </TabsList>
</Tabs>`}
        >
          <div className="flex flex-col items-center gap-6">
            <Tabs defaultValue="account">
              <TabsList variant="line">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
            <Tabs defaultValue="account">
              <TabsList variant="ghost">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
            <Tabs defaultValue="account">
              <TabsList variant="browser">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> on <code>TabsList</code> is <code>sm</code> by
          default; <code>default</code> is slightly taller with roomier padding
          and medium-weight labels.
        </DocProse>
        <DocExample
          code={`
<Tabs defaultValue="account">
  <TabsList size="sm">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsIndicator />
  </TabsList>
</Tabs>

<Tabs defaultValue="account">
  <TabsList size="default">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsIndicator />
  </TabsList>
</Tabs>`}
        >
          <div className="flex flex-col items-center gap-6">
            <Tabs defaultValue="account">
              <TabsList size="sm">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
            <Tabs defaultValue="account">
              <TabsList size="default">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="With icons">
        <DocProse>
          Drop an icon before the label – <code>svg</code> children are
          auto-sized to <code>size-4</code>. A trigger can also be icon-only,
          and <code>disabled</code> dims it and blocks activation.
        </DocProse>
        <DocExample
          code={`
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">
      <User /> Account
    </TabsTrigger>
    <TabsTrigger value="password" disabled>
      <Lock /> Password
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Settings /> Settings
    </TabsTrigger>
    <TabsIndicator />
  </TabsList>
</Tabs>`}
        >
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">
                <User /> Account
              </TabsTrigger>
              <TabsTrigger value="password" disabled>
                <Lock /> Password
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings /> Settings
              </TabsTrigger>
              <TabsIndicator />
            </TabsList>
          </Tabs>
        </DocExample>
      </DocSection>

      <DocSection title="Vertical">
        <DocProse>
          <code>orientation="vertical"</code> stacks the triggers in a column
          beside the panel; the <code>line</code> variant moves its border and
          indicator to the right edge of the list, and <code>browser</code>{" "}
          wraps the active tab so it opens into the panel.
        </DocProse>
        <DocExample
          code={`
<Tabs defaultValue="account" orientation="vertical" className="w-full max-w-md">
  <TabsList variant="line">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="account">Account settings content.</TabsContent>
  <TabsContent value="password">Password settings content.</TabsContent>
  <TabsContent value="settings">General settings content.</TabsContent>
</Tabs>

<Tabs defaultValue="account" orientation="vertical" className="w-full max-w-md">
  <TabsList variant="browser">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="account">Account settings content.</TabsContent>
  <TabsContent value="password">Password settings content.</TabsContent>
  <TabsContent value="settings">General settings content.</TabsContent>
</Tabs>`}
        >
          <div className="flex w-full flex-col gap-8">
            <Tabs
              defaultValue="account"
              orientation="vertical"
              className="w-full max-w-md"
            >
              <TabsList variant="line">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsIndicator />
              </TabsList>
              <TabsContent value="account">
                <p className="text-sm text-muted-foreground">
                  Account settings content.
                </p>
              </TabsContent>
              <TabsContent value="password">
                <p className="text-sm text-muted-foreground">
                  Password settings content.
                </p>
              </TabsContent>
              <TabsContent value="settings">
                <p className="text-sm text-muted-foreground">
                  General settings content.
                </p>
              </TabsContent>
            </Tabs>
            <Tabs
              defaultValue="account"
              orientation="vertical"
              className="w-full max-w-md"
            >
              <TabsList variant="browser">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsIndicator />
              </TabsList>
              <TabsContent value="account">
                <p className="text-sm text-muted-foreground">
                  Account settings content.
                </p>
              </TabsContent>
              <TabsContent value="password">
                <p className="text-sm text-muted-foreground">
                  Password settings content.
                </p>
              </TabsContent>
              <TabsContent value="settings">
                <p className="text-sm text-muted-foreground">
                  General settings content.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          Each part wraps its Base UI Tabs counterpart (<code>Root</code>,{" "}
          <code>List</code>, <code>Tab</code>, <code>Indicator</code>,{" "}
          <code>Panel</code>) and accepts that primitive&apos;s full prop set
          plus <code>className</code>. Styling props live on{" "}
          <code>TabsList</code> and are read by the triggers and indicator via
          group data attributes.
        </DocProse>
        <PropsTable
          title="Tabs"
          rows={[
            {
              prop: "defaultValue",
              type: "any",
              description:
                "Value of the tab selected on first render (uncontrolled).",
            },
            {
              prop: "value",
              type: "any",
              description:
                "Controlled selected value; pair with onValueChange.",
            },
            {
              prop: "onValueChange",
              type: "(value, eventDetails) => void",
              description: "Called when the selected tab changes.",
            },
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description:
                "Layout direction – horizontal stacks list above panels; vertical places a column of triggers beside them.",
            },
          ]}
        />
        <PropsTable
          title="TabsList"
          rows={[
            {
              prop: "variant",
              type: '"default" | "line" | "ghost" | "browser"',
              defaultValue: '"default"',
              description:
                "Track style – secondary-surface segment, underline, borderless segment, or bordered browser tabs. Also restyles the indicator.",
            },
            {
              prop: "size",
              type: '"sm" | "default"',
              defaultValue: '"sm"',
              description:
                "Trigger height, padding and font weight for the whole list.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "TabsTrigger",
              description:
                'The tab button (data-slot="tabs-trigger"). Takes value and disabled; svg children are auto-sized to size-4. Active text color comes from data-active.',
            },
            {
              part: "TabsIndicator",
              description:
                'Sliding active-tab highlight (data-slot="tabs-indicator"), positioned with Base UI\'s --active-tab-* CSS variables. Render it once inside TabsList, after the triggers.',
            },
            {
              part: "TabsContent",
              description:
                'The panel (data-slot="tabs-content") shown when its value matches the selected tab.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI wires up the tabs pattern: the list renders{" "}
          <code>role="tablist"</code>, triggers are <code>tab</code>s linked to
          their <code>tabpanel</code> via <code>aria-controls</code>/
          <code>aria-selected</code>, and arrow keys move activation (Up/Down in
          vertical orientation). Every part exposes a <code>data-slot</code>{" "}
          attribute (<code>tabs</code>, <code>tabs-list</code>,{" "}
          <code>tabs-trigger</code>, <code>tabs-indicator</code>,{" "}
          <code>tabs-content</code>); the root reflects{" "}
          <code>data-orientation</code>, the list reflects{" "}
          <code>data-variant</code> and <code>data-size</code>, and the active
          trigger carries <code>data-active</code> – target these from CSS for
          app-level overrides.
        </DocProse>
        <DocProse>
          The <code>tabsListVariants</code> cva helper is also exported for
          building custom tab strips with the same track classes:
        </DocProse>
        <CodeBlock
          code={`
import { tabsListVariants } from "@/components/ui/tabs"

<div className={cn(tabsListVariants({ variant: "line", size: "default" }))}>
  ...
</div>`}
        />
      </DocSection>
    </DocPage>
  )
}
