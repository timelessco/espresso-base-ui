"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
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

const toastFns = {
  default: toast,
  success: toast.success,
  info: toast.info,
  warning: toast.warning,
  error: toast.error,
} as const

const playgroundDescription = "Sunday, December 03, 2023 at 9:00 AM"

function sonnerPlaygroundCode(v: PlaygroundValues) {
  const fn = v.type === "default" ? "toast" : `toast.${v.type}`
  if (!v.description) return `${fn}("${v.message}")`
  return [
    `${fn}("${v.message}", {`,
    `  description: "${playgroundDescription}",`,
    `})`,
  ].join("\n")
}

function SonnerPlaygroundPreview(v: PlaygroundValues) {
  const fire = () => {
    const fn = toastFns[v.type as keyof typeof toastFns]
    fn(
      v.message as string,
      v.description ? { description: playgroundDescription } : undefined
    )
  }
  return (
    <Button variant="outline" onClick={fire}>
      Show toast
    </Button>
  )
}

export default function SonnerDocsPage() {
  return (
    <DocPage>
      {/* The docs layout does not mount a Toaster, so this page provides one
          for the live demos. In an app, mount it once in the root layout. */}
      <Toaster />

      <DocHeader
        title="Sonner"
        description="An opinionated toast component wrapping the sonner library, themed to the design system. Fire toasts from anywhere with toast()."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            message: { type: "text", defaultValue: "Event has been created" },
            type: {
              type: "options",
              options: ["default", "success", "info", "warning", "error"],
              defaultValue: "default",
            },
            description: { type: "boolean", defaultValue: false },
          }}
          renderPreview={SonnerPlaygroundPreview}
          renderCode={sonnerPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Call <code>toast()</code> with a message – an optional{" "}
          <code>description</code> adds a second line. Toasts auto-dismiss after
          4 seconds by default.
        </DocProse>
        <DocExample
          code={`
<Button variant="outline" onClick={() => toast("Event has been created")}>
  Default
</Button>

<Button
  variant="outline"
  onClick={() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    })
  }
>
  With description
</Button>`}
        >
          <Button
            variant="outline"
            onClick={() => toast("Event has been created")}
          >
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            With description
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="sonner" />
      </DocSection>

      <DocSection title="Usage">
        <DocProse>
          Mount the <code>Toaster</code> once – typically in the root layout –
          then call <code>toast()</code> from any client component. This docs
          page mounts its own <code>Toaster</code> for the demos.
        </DocProse>
        <CodeBlock
          code={`
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`}
        />
        <CodeBlock
          code={`
import { toast } from "sonner"

<Button onClick={() => toast("Event has been created")}>
  Show toast
</Button>`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>toast.success</code>, <code>toast.info</code>,{" "}
          <code>toast.warning</code> and <code>toast.error</code> prepend a
          tinted lucide status icon; <code>toast.loading</code> shows a spinner.
        </DocProse>
        <DocExample
          code={`
toast.success("Changes saved successfully")
toast.info("New version available")
toast.warning("Your session will expire soon")
toast.error("Failed to save changes")`}
        >
          <Button
            variant="outline"
            onClick={() => toast.success("Changes saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("New version available")}
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Your session will expire soon")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Failed to save changes")}
          >
            Error
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Action and close button">
        <DocProse>
          <code>action</code> renders a trailing text button styled in the
          accent blue; <code>closeButton: true</code> adds the custom circular
          dismiss control at the right edge.
        </DocProse>
        <DocExample
          code={`
toast("Event has been created", {
  description: "December 03, 2023 at 9:00 AM",
  action: {
    label: "Undo",
    onClick: () => toast("Undone"),
  },
  closeButton: true,
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => toast("Undone"),
                },
                closeButton: true,
              })
            }
          >
            Close + Action
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Failed to save", {
                description: "Something went wrong on our end.",
                action: {
                  label: "Retry",
                  onClick: () => toast.success("Retrying..."),
                },
              })
            }
          >
            Retry action
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Promise">
        <DocProse>
          <code>toast.promise</code> tracks an async operation through loading,
          success and error states in a single toast.
        </DocProse>
        <DocExample
          code={`
const promise = new Promise((resolve) =>
  setTimeout(() => resolve({ name: "Sonner" }), 1500)
)

toast.promise(promise, {
  loading: "Loading...",
  success: (data) => data.name + " toast has been added",
  error: "Error",
})`}
        >
          <Button
            variant="outline"
            onClick={() => {
              const promise = new Promise<{ name: string }>((resolve) =>
                setTimeout(() => resolve({ name: "Sonner" }), 1500)
              )
              toast.promise(promise, {
                loading: "Loading...",
                success: (data) => data.name + " toast has been added",
                error: "Error",
              })
            }}
          >
            Run promise
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="Position">
        <DocProse>
          Toasts default to the bottom right; override per toast with{" "}
          <code>position</code>, or globally via the same prop on{" "}
          <code>Toaster</code>.
        </DocProse>
        <DocExample
          code={`
toast("Top center", { position: "top-center" })
toast("Bottom left", { position: "bottom-left" })`}
        >
          <Button
            variant="outline"
            onClick={() => toast("Top center", { position: "top-center" })}
          >
            Top center
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Bottom left", { position: "bottom-left" })}
          >
            Bottom left
          </Button>
          <Button variant="outline" onClick={() => toast.dismiss()}>
            Dismiss all
          </Button>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Toaster</code> forwards every prop to the underlying sonner{" "}
          <code>Toaster</code> – <code>position</code>, <code>expand</code>,{" "}
          <code>visibleToasts</code>, <code>richColors</code>,{" "}
          <code>offset</code> and the rest – after applying the design-system
          defaults below. The <code>toast()</code> API is re-exported unchanged
          from the sonner package.
        </DocProse>
        <PropsTable
          title="Toaster"
          rows={[
            {
              prop: "duration",
              type: "number",
              defaultValue: "4000",
              description:
                "Milliseconds a toast stays visible. Overridable per toast via the duration option.",
            },
            {
              prop: "theme",
              type: '"light" | "dark" | "system"',
              defaultValue: "useTheme().theme",
              description:
                "Resolved automatically from next-themes so toasts follow the app color scheme; pass explicitly to pin one.",
            },
            {
              prop: "position",
              type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
              defaultValue: '"bottom-right"',
              description: "Corner of the viewport where toasts stack.",
            },
            {
              prop: "icons",
              type: 'ToasterProps["icons"]',
              defaultValue: "lucide set",
              description:
                "Per-variant icons. Preset to tinted lucide icons: CircleCheck (success), Info, TriangleAlert (warning), OctagonX (error) and a spinning Loader2 (loading).",
            },
            {
              prop: "...props",
              type: "ToasterProps",
              defaultValue: "–",
              description:
                "All remaining sonner Toaster props pass through and can override the preset styling, class names and CSS variables.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Sonner renders toasts into an ARIA live region, so new toasts are
          announced by screen readers without stealing focus, and hovering a
          toast pauses its dismiss timer. The wrapper themes toasts through
          sonner CSS variables (<code>--normal-bg</code> mixes{" "}
          <code>--primary</code> with the background, <code>--normal-text</code>
          , <code>--normal-border</code>, <code>--border-radius</code>) and a{" "}
          <code>cn-toast</code> class on each toast – extend either via{" "}
          <code>style</code> and <code>toastOptions.classNames</code> for
          app-level overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
