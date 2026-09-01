"use client"

import { Info } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { notify, NotificationToaster } from "@/components/ui/notification"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PropsTable,
} from "../../_components/doc"
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

const noop = () => {}

function playgroundActions(actionType: string) {
  return actionType === "single"
    ? [{ label: "Update", onClick: noop }]
    : [
        { label: "Update", onClick: noop },
        { label: "Later", onClick: noop },
      ]
}

function notificationPlaygroundCode(v: PlaygroundValues) {
  const actionType = v.actionType as string
  const lines = [`notify({`]
  if (v.variant !== "default") lines.push(`  variant: "${v.variant}",`)
  lines.push(`  title: "${v.title}",`)
  if (v.description) lines.push(`  description: "${v.description}",`)
  if (v.variant === "avatar") {
    lines.push(
      `  timestamp: "28 min ago",`,
      `  prefix: (`,
      `    <Avatar size="xl">`,
      `      <AvatarImage src="https://i.pravatar.cc/40?img=47" />`,
      `      <AvatarFallback>JJ</AvatarFallback>`,
      `    </Avatar>`,
      `  ),`
    )
  }
  if (v.showClose) lines.push(`  showClose: true,`)
  if (actionType !== "none") {
    lines.push(`  actionType: "${actionType}",`)
    if (actionType === "single") {
      lines.push(`  actions: [{ label: "Update", onClick: () => {} }],`)
    } else {
      lines.push(
        `  actions: [`,
        `    { label: "Update", onClick: () => {} },`,
        `    { label: "Later", onClick: () => {} },`,
        `  ],`
      )
    }
  }
  lines.push(`})`)
  return lines.join("\n")
}

function NotificationPlaygroundPreview(v: PlaygroundValues) {
  const actionType = v.actionType as "none" | "single" | "dual"
  return (
    <Button
      variant="outline"
      onClick={() =>
        notify({
          variant: v.variant as "default" | "banner" | "avatar" | "compact",
          title: v.title as string,
          description: (v.description as string) || undefined,
          ...(v.variant === "avatar" && {
            timestamp: "28 min ago",
            prefix: (
              <Avatar size="xl">
                <AvatarImage src="https://i.pravatar.cc/40?img=47" />
                <AvatarFallback>JJ</AvatarFallback>
              </Avatar>
            ),
          }),
          showClose: Boolean(v.showClose),
          actionType,
          actions: actionType === "none" ? [] : playgroundActions(actionType),
        })
      }
    >
      Notify
    </Button>
  )
}

export default function NotificationDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Notification"
        description="Imperative toast-style notifications fired with notify(). Four card layouts, from a one-line strip to a centered compact card."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            title: {
              type: "text",
              defaultValue: "System Update Available",
            },
            description: {
              type: "text",
              defaultValue: "Update now to enjoy new features.",
            },
            variant: {
              type: "options",
              options: ["default", "banner", "avatar", "compact"],
              defaultValue: "default",
            },
            actionType: {
              type: "options",
              options: ["none", "single", "dual"],
              defaultValue: "single",
            },
            showClose: { type: "boolean", defaultValue: false },
          }}
          renderPreview={NotificationPlaygroundPreview}
          renderCode={notificationPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Call <code>notify()</code> from any event handler. The{" "}
          <code>default</code> variant is a single-row card; add a{" "}
          <code>prefix</code> icon, a close button with{" "}
          <code>showClose: true</code>, or a trailing action. A{" "}
          <code>NotificationToaster</code> must be mounted once in your app.
        </DocProse>
        <DocExample
          code={`
<Button
  variant="outline"
  onClick={() =>
    notify({
      title: "Update available. Get new features!",
      prefix: <Info />,
      showClose: true,
      actionType: "single",
      actions: [{ label: "Update", onClick: () => {} }],
    })
  }
>
  Notify
</Button>

<NotificationToaster />`}
        >
          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Update available. Get new features!",
                prefix: <Info />,
                showClose: true,
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
              })
            }
          >
            Notify
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="notification" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  notify,
  NotificationToaster,
  notificationVariants,
  type NotificationOptions,
  type NotificationAction,
} from "@/components/ui/notification"`}
        />
        <CodeBlock
          code={`
// Mount the toaster once (e.g. in your root layout)
<NotificationToaster />

// Then fire notifications from anywhere
notify({
  title: "Saved",
  description: "Your changes are safe.",
})`}
        />
      </DocSection>

      <DocSection title="Banner with actions">
        <DocProse>
          <code>variant: "banner"</code> stacks the title above a description.{" "}
          <code>actionType: "dual"</code> renders two side-by-side buttons below
          the copy; <code>actionType: "single"</code> renders just the first
          one. Buttons close the notification after running their{" "}
          <code>onClick</code>.
        </DocProse>
        <DocExample
          code={`
notify({
  variant: "banner",
  title: "Update available. Get new features!",
  description:
    "A new update is available for the app. Update now to enjoy new features and improvements.",
  prefix: <Info />,
  showClose: true,
  actionType: "dual",
  actions: [
    { label: "Update now", onClick: () => {} },
    { label: "Later", onClick: () => {} },
  ],
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "banner",
                title: "Update available. Get new features!",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                showClose: true,
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Dual action
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Avatar">
        <DocProse>
          <code>variant: "avatar"</code> is built for activity feeds: pass an
          avatar as <code>prefix</code>, a relative <code>timestamp</code>, and{" "}
          <code>unread: true</code> for a blue unread dot at the top-right
          corner (the close button takes that spot when both are enabled).
        </DocProse>
        <DocExample
          code={`
notify({
  variant: "avatar",
  title: "Jane Johnson",
  description: "Your task is due tomorrow",
  timestamp: "28 min ago",
  prefix: (
    <Avatar size="xl">
      <AvatarImage src="https://i.pravatar.cc/40?img=47" />
      <AvatarFallback>JJ</AvatarFallback>
    </Avatar>
  ),
  unread: true,
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "avatar",
                title: "Jane Johnson",
                description: "Your task is due tomorrow",
                timestamp: "28 min ago",
                prefix: (
                  <Avatar size="xl">
                    <AvatarImage src="https://i.pravatar.cc/40?img=47" />
                    <AvatarFallback>JJ</AvatarFallback>
                  </Avatar>
                ),
                unread: true,
              })
            }
          >
            Unread
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Compact">
        <DocProse>
          <code>variant: "compact"</code> centers the copy and lays the actions
          out full-width – one full-width button for <code>single</code>, side
          by side for <code>dual</code>.
        </DocProse>
        <DocExample
          code={`
notify({
  variant: "compact",
  title: "System Update Available",
  description:
    "A new update is available for the app. Update now to enjoy new features and improvements.",
  actionType: "dual",
  actions: [
    { label: "Update now", onClick: () => {} },
    { label: "Later", onClick: () => {} },
  ],
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "compact",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Compact
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>notify(options)</code> queues a notification on a dedicated
          toast manager (independent of the standard toast Toaster) and returns
          the toast id. <code>NotificationToaster</code> renders the queue –
          mount it exactly once. All fields below belong to the{" "}
          <code>NotificationOptions</code> object.
        </DocProse>
        <PropsTable
          title="notify(options: NotificationOptions)"
          rows={[
            {
              prop: "variant",
              type: '"default" | "banner" | "avatar" | "compact"',
              defaultValue: '"default"',
              description:
                "Card layout – single row, stacked banner, avatar feed item, or centered compact card.",
            },
            {
              prop: "title",
              type: "string",
              description: "Required heading text.",
            },
            {
              prop: "description",
              type: "string",
              description:
                "Supporting copy in muted text below (or beside) the title.",
            },
            {
              prop: "prefix",
              type: "React.ReactNode",
              description:
                "Leading visual – an icon (auto-sized to size-4) or an Avatar.",
            },
            {
              prop: "showClose",
              type: "boolean",
              defaultValue: "false",
              description:
                "Shows a close (✕) button – inline at the row's end for default, top-right for the other layouts.",
            },
            {
              prop: "actionType",
              type: '"none" | "single" | "dual"',
              defaultValue: '"none"',
              description:
                "How many action buttons render: none, the first one, or the first two.",
            },
            {
              prop: "actions",
              type: "NotificationAction[]",
              defaultValue: "[]",
              description:
                "Buttons to render. Each closes the notification after its onClick runs.",
            },
            {
              prop: "timestamp",
              type: "string",
              description:
                'Small muted timestamp line (e.g. "28 min ago") – pairs with the avatar variant.',
            },
            {
              prop: "unread",
              type: "boolean",
              description:
                "Shows a blue unread dot at the top-right corner (avatar variant, hidden when showClose is set).",
            },
            {
              prop: "duration",
              type: "number",
              defaultValue: "90000",
              description: "Auto-dismiss timeout in milliseconds.",
            },
            {
              prop: "position",
              type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
              description:
                "Declared viewport-corner option on NotificationOptions; placement is ultimately controlled by the toaster viewport.",
            },
          ]}
        />
        <PropsTable
          title="NotificationAction"
          rows={[
            {
              prop: "label",
              type: "string",
              description: "Button text.",
            },
            {
              prop: "onClick",
              type: "() => void",
              description:
                "Handler – the notification closes itself afterwards.",
            },
            {
              prop: "variant",
              type: 'Button["variant"]',
              description:
                "Optional Button variant override. Defaults per layout: secondary/outline pairs for dual actions, ghost for the default row.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          Each card renders with <code>data-slot="notification"</code> and{" "}
          <code>data-variant</code> reflecting the active layout – target these
          from CSS for app-level overrides. Cards are rendered inside the Toast
          primitives, so they inherit the toast stacking and slide animations.
          The <code>notificationVariants</code> cva helper is exported for
          building custom cards with the same layout classes.
        </DocProse>
      </DocSection>

      <NotificationToaster />
    </DocPage>
  )
}
