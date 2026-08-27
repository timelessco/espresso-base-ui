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

const noop = () => {}

export default function NotificationDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Notification"
        description="Imperative toast-style notifications fired with notify(). Four card layouts, from a one-line strip to a centered modal card."
      />

      <DocSection title="Preview">
        <DocProse>
          Call <code>notify()</code> from any event handler. The default{" "}
          <code>inline</code> variant is a single-row card; add a{" "}
          <code>prefix</code> icon, a close button with{" "}
          <code>suffix: true</code>, or a trailing action. A{" "}
          <code>NotificationToaster</code> must be mounted once in your app.
        </DocProse>
        <DocExample
          code={`
<Button
  variant="outline"
  onClick={() =>
    notify({
      variant: "inline",
      title: "Update available. Get new features!",
      prefix: <Info />,
      suffix: true,
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
                variant: "inline",
                title: "Update available. Get new features!",
                prefix: <Info />,
                suffix: true,
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

      <DocSection title="Long text with actions">
        <DocProse>
          <code>variant: "long-text"</code> stacks the title above a
          description. <code>actionType: "dual"</code> renders two side-by-side
          buttons in the content column; <code>actionType: "single"</code>{" "}
          renders one full-width button. Buttons close the notification after
          running their <code>onClick</code>.
        </DocProse>
        <DocExample
          code={`
notify({
  variant: "long-text",
  title: "System Update Available",
  description:
    "A new update is available for the app. Update now to enjoy new features and improvements.",
  prefix: <Info />,
  suffix: true,
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
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                suffix: true,
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

      <DocSection title="Notification with avatar">
        <DocProse>
          <code>variant: "notification"</code> is built for activity feeds: pass
          an avatar as <code>prefix</code>, a relative <code>timestamp</code>,
          and <code>unread: true</code> for a blue unread dot at the trailing
          edge.
        </DocProse>
        <DocExample
          code={`
notify({
  variant: "notification",
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
                variant: "notification",
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

      <DocSection title="Modal and split layouts">
        <DocProse>
          <code>variant: "modal"</code> centers the copy and lays the actions
          out full-width – stacked for <code>single</code>, side by side for{" "}
          <code>dual</code>. <code>actionType: "split"</code> (with any variant)
          moves the actions into a bordered column on the right, one button per
          row.
        </DocProse>
        <DocExample
          code={`
notify({
  variant: "modal",
  title: "System Update Available",
  description: "Update now to enjoy new features and improvements.",
  actionType: "dual",
  actions: [
    { label: "Update now", onClick: () => {} },
    { label: "Later", onClick: () => {} },
  ],
})

notify({
  variant: "long-text",
  title: "Your trial ends soon!",
  description: "Upgrade now to continue enjoying all features.",
  actionType: "split",
  actions: [
    { label: "Update", onClick: () => {} },
    { label: "View", onClick: () => {} },
  ],
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "modal",
                title: "System Update Available",
                description:
                  "Update now to enjoy new features and improvements.",
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Modal
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "Your trial ends soon!",
                description: "Upgrade now to continue enjoying all features.",
                actionType: "split",
                actions: [
                  { label: "Update", onClick: noop },
                  { label: "View", onClick: noop },
                ],
              })
            }
          >
            Split
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
              type: '"inline" | "long-text" | "notification" | "modal"',
              defaultValue: '"inline"',
              description:
                "Card layout – single row, stacked long text, avatar feed item, or centered modal card.",
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
              prop: "suffix",
              type: "boolean",
              defaultValue: "false",
              description:
                "Shows a close button – centered on the row for inline, top-right for other layouts. Ignored for split.",
            },
            {
              prop: "actionType",
              type: '"none" | "single" | "dual" | "split"',
              defaultValue: '"none"',
              description:
                "Action layout: one button, two buttons, or a bordered split column at the trailing edge.",
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
                'Small muted timestamp line (e.g. "28 min ago") – pairs with the notification variant.',
            },
            {
              prop: "unread",
              type: "boolean",
              description: "Shows a blue unread dot at the trailing edge.",
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
                "Optional Button variant override. Defaults per layout: secondary/outline pairs for dual and modal, ghost for inline and split.",
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
