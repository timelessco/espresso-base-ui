"use client"

import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/toast"
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

export default function ToastDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Toast"
        description="Stacked, swipeable notifications built on Base UI's toast manager. Mount the Toaster once, then fire toasts imperatively from anywhere."
      />

      <DocSection title="Preview">
        <DocProse>
          Call <code>toast.add</code> with a <code>title</code> and optional{" "}
          <code>description</code>. New toasts stack behind the frontmost one
          and expand when you hover or focus the stack.
        </DocProse>
        <DocExample
          code={`
<Button
  variant="outline"
  onClick={() =>
    toast.add({
      title: "Event has been created",
      description: "Sunday, December 03, 2023 at 9:00 AM",
    })
  }
>
  Show toast
</Button>

<Toaster />`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Event has been created",
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            Show toast
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="toast" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  createToastManager,
  toast,
  useToastManager,
} from "@/components/ui/toast"`}
        />
        <CodeBlock
          code={`
// Mount once – e.g. in your root layout
<Toaster />

// Then fire toasts from anywhere, even outside React
toast.add({
  type: "success",
  title: "Changes saved",
  description: "Your profile has been updated.",
})`}
        />
      </DocSection>

      <DocSection title="Types">
        <DocProse>
          <code>type</code> picks the leading icon: <code>success</code>,{" "}
          <code>info</code>, <code>warning</code>, <code>error</code>, or a
          spinning <code>loading</code> indicator. Omit it for a plain toast.
        </DocProse>
        <DocExample
          code={`
toast.add({ type: "success", title: "Changes saved successfully" })
toast.add({ type: "info", title: "New version available" })
toast.add({ type: "warning", title: "Your session will expire soon" })
toast.add({ type: "error", title: "Failed to save changes" })
toast.add({ type: "loading", title: "Processing your request" })`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                type: "success",
                title: "Changes saved successfully",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ type: "info", title: "New version available" })
            }
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                type: "warning",
                title: "Your session will expire soon",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ type: "error", title: "Failed to save changes" })
            }
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ type: "loading", title: "Processing your request" })
            }
          >
            Loading
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="With action">
        <DocProse>
          <code>actionProps</code> renders a text button inside the toast – pass
          any button props, typically <code>children</code> and{" "}
          <code>onClick</code>. <code>toast.add</code> returns the toast id so
          the action can close it.
        </DocProse>
        <DocExample
          code={`
const id = toast.add({
  title: "Event has been created",
  description: "Sunday, December 03, 2023 at 9:00 AM",
  actionProps: {
    children: "Undo",
    onClick: () => {
      toast.close(id)
      toast.add({ title: "Undone" })
    },
  },
})`}
        >
          <Button
            variant="outline"
            onClick={() => {
              const id = toast.add({
                title: "Event has been created",
                description: "Sunday, December 03, 2023 at 9:00 AM",
                actionProps: {
                  children: "Undo",
                  onClick: () => {
                    toast.close(id)
                    toast.add({ title: "Undone" })
                  },
                },
              })
            }}
          >
            Undo action
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Promise">
        <DocProse>
          <code>toast.promise</code> shows a <code>loading</code> toast, then
          updates it in place to the <code>success</code> or <code>error</code>{" "}
          state. Each state takes a string, an options object, or a callback
          receiving the resolved value / error.
        </DocProse>
        <DocExample
          code={`
const promise = new Promise((resolve) =>
  setTimeout(() => resolve({ name: "Toast" }), 1500)
)

toast.promise(promise, {
  loading: "Loading...",
  success: (data) => data.name + " has been added",
  error: "Error",
})`}
        >
          <Button
            variant="outline"
            onClick={() => {
              const promise = new Promise<{ name: string }>((resolve) =>
                setTimeout(() => resolve({ name: "Toast" }), 1500)
              )
              toast.promise(promise, {
                loading: "Loading...",
                success: (data) => data.name + " has been added",
                error: "Error",
              })
            }}
          >
            Run promise
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Duration & dismiss">
        <DocProse>
          <code>timeout</code> overrides the 5 second auto-dismiss per toast –{" "}
          <code>0</code> keeps it open until closed. <code>toast.close()</code>{" "}
          without an id dismisses every open toast.
        </DocProse>
        <DocExample
          code={`
toast.add({
  title: "Persistent toast",
  description: "This toast won't auto-dismiss",
  timeout: 0,
})

toast.close() // dismiss all`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Persistent toast",
                description: "This toast won't auto-dismiss",
                timeout: 0,
              })
            }
          >
            No auto-dismiss
          </Button>
          <Button variant="outline" onClick={() => toast.close()}>
            Dismiss all
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          The module exports a ready-made <code>toast</code> manager (created
          with <code>createToastManager</code>) and a <code>Toaster</code> that
          wires the provider, portal, viewport and a styled toast list to it.
          Call <code>createToastManager</code> yourself for a scoped manager
          (pass it to <code>Toaster</code> via <code>toastManager</code>), or
          drop down to the individual parts with <code>useToastManager</code> to
          build a fully custom renderer.
        </DocProse>
        <PropsTable
          title="toast"
          rows={[
            {
              prop: "add",
              type: "(options) => string",
              description:
                "Creates a toast and returns its id. Passing an existing id updates that toast in place and refreshes its timer.",
            },
            {
              prop: "close",
              type: "(id?: string) => void",
              description:
                "Closes the toast with the given id – or every open toast when called without one.",
            },
            {
              prop: "update",
              type: "(id, options) => void",
              description:
                "Patches an open toast with any subset of the add options.",
            },
            {
              prop: "promise",
              type: "(promise, { loading, success, error }) => Promise",
              description:
                "Tracks a promise through loading, success and error states in a single toast. Each state accepts a string, an options object, or a callback receiving the result / error.",
            },
          ]}
        />
        <PropsTable
          title="toast.add options"
          rows={[
            {
              prop: "title",
              type: "ReactNode",
              description: "Heading line of the toast.",
            },
            {
              prop: "description",
              type: "ReactNode",
              description: "Supporting copy below the title.",
            },
            {
              prop: "type",
              type: '"success" | "info" | "warning" | "error" | "loading"',
              description:
                "Picks the leading icon (tinted per type; loading spins). Omit for no icon.",
            },
            {
              prop: "timeout",
              type: "number",
              defaultValue: "5000",
              description:
                "Milliseconds before auto-dismiss. 0 keeps the toast open until closed manually.",
            },
            {
              prop: "priority",
              type: '"low" | "high"',
              defaultValue: '"low"',
              description:
                "How screen readers announce the toast – politely (low) or urgently (high).",
            },
            {
              prop: "actionProps",
              type: "ButtonHTMLAttributes",
              description:
                "Props for the inline action button (children, onClick, …). The action renders only when provided.",
            },
            {
              prop: "onClose",
              type: "() => void",
              description: "Called when the toast is closed.",
            },
            {
              prop: "onRemove",
              type: "() => void",
              description:
                "Called after the toast is removed from the list once its exit animation finishes.",
            },
          ]}
        />
        <PropsTable
          title="Toaster"
          rows={[
            {
              prop: "toastManager",
              type: "ToastManager",
              defaultValue: "toast",
              description:
                "The manager whose toasts this Toaster renders. Defaults to the exported module-level manager.",
            },
            {
              prop: "timeout",
              type: "number",
              defaultValue: "5000",
              description:
                "Default auto-dismiss time (ms) for toasts without their own timeout.",
            },
            {
              prop: "limit",
              type: "number",
              defaultValue: "3",
              description:
                "Maximum toasts displayed at once – the oldest is removed to make room.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "Toaster",
              description:
                "All-in-one mount: ToastProvider + ToastPortal + ToastViewport + a styled list of the manager's toasts.",
            },
            {
              part: "ToastProvider",
              description:
                "Context provider for manual composition. Takes toastManager, timeout and limit.",
            },
            {
              part: "ToastPortal",
              description:
                'Portals the viewport to the document body (data-slot="toast-portal").',
            },
            {
              part: "ToastViewport",
              description:
                'Fixed bottom-right landmark that positions the stack (data-slot="toast-viewport").',
            },
            {
              part: "Toast",
              description:
                'Root surface for one toast (data-slot="toast"). Owns the stacking, swipe and enter/exit transforms.',
            },
            {
              part: "ToastContent",
              description:
                'Inner row layout for icon, text and buttons (data-slot="toast-content"). Fades out when behind the frontmost toast.',
            },
            {
              part: "ToastTitle",
              description:
                'Renders the toast\'s title from the manager (data-slot="toast-title").',
            },
            {
              part: "ToastDescription",
              description:
                'Renders the toast\'s description (data-slot="toast-description").',
            },
            {
              part: "ToastAction",
              description:
                'Blue-tinted text action rendered as a ghost Button (data-slot="toast-action"). Appears only when the toast has actionProps.',
            },
            {
              part: "ToastClose",
              description:
                'Icon close button with aria-label="Close toast" and an enlarged hit area (data-slot="toast-close").',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Toasts are announced by screen readers according to their{" "}
          <code>priority</code>, the close button carries{" "}
          <code>aria-label="Close toast"</code>, and every part exposes a{" "}
          <code>data-slot</code> attribute (including the internal{" "}
          <code>toast-icon</code> wrapper) for CSS overrides. The stack is
          driven by Base UI state attributes – <code>data-expanded</code> while
          the viewport is hovered or focused, <code>data-starting-style</code> /{" "}
          <code>data-ending-style</code> during enter and exit,{" "}
          <code>data-swipe-direction</code> while swiping to dismiss, and{" "}
          <code>data-limited</code> when a toast exceeds the limit – together
          with CSS variables like <code>--toast-index</code> and{" "}
          <code>--toast-height</code>, so the collapse, peek and swipe
          animations can be retuned entirely in CSS.
        </DocProse>
      </DocSection>

      <Toaster />
    </DocPage>
  )
}
