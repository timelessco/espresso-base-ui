"use client"

import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertHandlers,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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

export default function AlertDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Alert"
        description="An inline status message with a next step. Renders as a vertical card or a one-line banner."
      />

      <DocSection title="Preview">
        <DocProse>
          The default <code>type</code> renders a card. Compose it from an icon,{" "}
          <code>AlertTitle</code>, <code>AlertDescription</code>, action buttons
          in <code>AlertHandlers</code>, and an optional top-right control in{" "}
          <code>AlertAction</code>.
        </DocProse>
        <DocExample
          code={`
<Alert>
  <Info />
  <AlertTitle>Your trial ends soon!</AlertTitle>
  <AlertDescription>Upgrade to keep enjoying features.</AlertDescription>
  <AlertHandlers>
    <Button variant="secondary" size="sm" className="w-full">
      Update now
    </Button>
  </AlertHandlers>
  <AlertAction>
    <Button variant="ghost" size="icon-xs">
      <X />
    </Button>
  </AlertAction>
</Alert>`}
        >
          <div className="w-full max-w-[220px]">
            <Alert>
              <Info />
              <AlertTitle>Your trial ends soon!</AlertTitle>
              <AlertDescription>
                Upgrade to keep enjoying features.
              </AlertDescription>
              <AlertHandlers>
                <Button variant="secondary" size="sm" className="w-full">
                  Update now
                </Button>
              </AlertHandlers>
              <AlertAction>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="alert" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertHandlers,
  AlertTitle,
} from "@/components/ui/alert"`}
        />
        <CodeBlock
          code={`
<Alert variant="info">
  <Info />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can compose the parts freely.</AlertDescription>
  <AlertHandlers>
    <Button variant="secondary" size="sm">Got it</Button>
  </AlertHandlers>
</Alert>`}
        />
      </DocSection>

      <DocSection title="Variants">
        <DocProse>
          <code>variant</code> sets the tone: <code>default</code>,{" "}
          <code>success</code>, <code>info</code>, <code>warning</code> and{" "}
          <code>destructive</code>. It tints the leading icon – and in the card
          layout it also recolors the button inside{" "}
          <code>AlertHandlers</code> (background, hover and active states), so
          you pass a plain <code>secondary</code> Button and the alert themes
          it.
        </DocProse>
        <DocExample
          code={`
<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Success alert</AlertTitle>
  <AlertDescription>This is a success vertical alert.</AlertDescription>
  <AlertHandlers>
    <Button variant="secondary" size="sm" className="w-full">
      View changes
    </Button>
  </AlertHandlers>
</Alert>

<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Unsaved changes</AlertTitle>
  <AlertDescription>Save before navigating away.</AlertDescription>
  <AlertHandlers>
    <Button variant="secondary" size="sm" className="w-full">
      Save now
    </Button>
  </AlertHandlers>
</Alert>`}
        >
          <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
            <Alert variant="success">
              <CheckCircle2 />
              <AlertTitle>Success alert</AlertTitle>
              <AlertDescription>
                This is a success vertical alert.
              </AlertDescription>
              <AlertHandlers>
                <Button variant="secondary" size="sm" className="w-full">
                  View changes
                </Button>
              </AlertHandlers>
            </Alert>
            <Alert variant="warning">
              <TriangleAlert />
              <AlertTitle>Unsaved changes</AlertTitle>
              <AlertDescription>Save before navigating away.</AlertDescription>
              <AlertHandlers>
                <Button variant="secondary" size="sm" className="w-full">
                  Save now
                </Button>
              </AlertHandlers>
            </Alert>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Banner">
        <DocProse>
          <code>type="banner"</code> renders a page-wide notice on a neutral{" "}
          <code>bg-input</code> surface. Without <code>AlertHandlers</code> it
          collapses to a slim single row – the title grows to{" "}
          <code>text-normal</code> and <code>AlertAction</code> moves inline at
          the trailing edge instead of floating top-right.
        </DocProse>
        <DocExample
          code={`
<Alert type="banner">
  <Info />
  <AlertTitle>Your trial ends soon!</AlertTitle>
  <AlertAction>
    <Button variant="ghost" size="sm">
      Update
    </Button>
    <Button variant="ghost" size="icon-xs">
      <X />
    </Button>
  </AlertAction>
</Alert>`}
        >
          <div className="w-full max-w-xl">
            <Alert type="banner">
              <Info />
              <AlertTitle>Your trial ends soon!</AlertTitle>
              <AlertAction>
                <Button variant="ghost" size="sm">
                  Update
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Banner variants">
        <DocProse>
          Banners take the same <code>variant</code> values. Tint the text
          action to match with a text color utility.
        </DocProse>
        <DocExample
          code={`
<Alert type="banner" variant="success">
  <CheckCircle2 />
  <AlertTitle>Source successfully added</AlertTitle>
  <AlertAction>
    <Button variant="ghost" size="sm" className="text-green-600 dark:text-green-300">
      Explore now
    </Button>
    <Button variant="ghost" size="icon-xs">
      <X />
    </Button>
  </AlertAction>
</Alert>

<Alert type="banner" variant="destructive">
  <XCircle />
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertAction>
    <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-300">
      Retry
    </Button>
    <Button variant="ghost" size="icon-xs">
      <X />
    </Button>
  </AlertAction>
</Alert>`}
        >
          <div className="flex w-full max-w-xl flex-col gap-3">
            <Alert type="banner" variant="success">
              <CheckCircle2 />
              <AlertTitle>Source successfully added</AlertTitle>
              <AlertAction>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-600 dark:text-green-300"
                >
                  Explore now
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
            <Alert type="banner" variant="destructive">
              <XCircle />
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertAction>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 dark:text-red-300"
                >
                  Retry
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Alert</code> is a compound component – the root takes the
          layout and tone props and shares them via context, so{" "}
          <code>AlertTitle</code> and <code>AlertDescription</code>{" "}
          automatically adapt their typography to the active layout. All parts
          render a <code>div</code> and accept <code>className</code> plus
          standard div props.
        </DocProse>
        <PropsTable
          title="Alert"
          rows={[
            {
              prop: "type",
              type: '"default" | "banner"',
              defaultValue: '"default"',
              description:
                "Layout – vertical card with shadow (default), or a page-wide banner on a bg-input surface.",
            },
            {
              prop: "variant",
              type: '"default" | "success" | "destructive" | "warning" | "info"',
              defaultValue: '"default"',
              description:
                "Tone – tints the leading icon and, in the card layout, recolors the AlertHandlers button.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "AlertTitle",
              description:
                "Heading line. Context-sized: text-sm in the card, text-base in the banner. Links inside are underlined.",
            },
            {
              part: "AlertDescription",
              description:
                "Supporting copy in muted text. Context-sized: text-xs in the card, text-base in the banner. Supports multiple paragraphs and underlined links.",
            },
            {
              part: "AlertHandlers",
              description:
                "Action-buttons row (data-slot=\"alert-button\"). Buttons stretch full-width in the card layout; in banners a secondary button gets a raised surface background.",
            },
            {
              part: "AlertAction",
              description:
                "Floating top-right container (data-slot=\"alert-action\") – typically the close button. In a banner without AlertHandlers it flows inline at the trailing edge.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Icon">
        <DocProse>
          Pass any icon as a direct child of <code>Alert</code>. A direct{" "}
          <code>svg</code> child is auto-sized to <code>size-4</code> (unless it
          carries its own size class) and tinted by the active{" "}
          <code>variant</code>; the title and description shift into the second
          grid column to sit beside it. Omit the icon and the content spans the
          full width.
        </DocProse>
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The root renders <code>role="alert"</code>, so screen readers
          announce it as a live status message. Every part exposes a{" "}
          <code>data-slot</code> attribute (<code>alert</code>,{" "}
          <code>alert-title</code>, <code>alert-description</code>,{" "}
          <code>alert-button</code>, <code>alert-action</code>), and the root
          also reflects its props as <code>data-type</code> and{" "}
          <code>data-variant</code> – target these from CSS for app-level
          overrides.
        </DocProse>
        <DocProse>
          The <code>alertVariants</code> cva helper is also exported for
          building custom alert surfaces with the same layout and tone classes:
        </DocProse>
        <CodeBlock
          code={`
import { alertVariants } from "@/components/ui/alert"

<div className={cn(alertVariants({ type: "banner", variant: "info" }))}>
  ...
</div>`}
        />
      </DocSection>
    </DocPage>
  )
}
