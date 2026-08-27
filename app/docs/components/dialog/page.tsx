"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

export default function DialogDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Dialog"
        description="A modal window layered over the page, built on Base UI. A centered card with header, content and footer in three width presets."
      />

      <DocSection title="Preview">
        <DocProse>
          <code>DialogTrigger</code> opens the dialog – pass your button via the
          Base UI <code>render</code> prop. <code>DialogContent</code> portals
          the card over a dimmed overlay and includes a top-right close button
          by default.
        </DocProse>
        <DocExample
          code={`
<Dialog>
  <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog title</DialogTitle>
      <DialogDescription>
        A short description of the dialog contents.
      </DialogDescription>
    </DialogHeader>
    <p className="text-sm text-muted-foreground">
      This is the main content of the dialog.
    </p>
    <DialogFooter>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Open dialog</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogDescription>
                  A short description of the dialog contents.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is the main content of the dialog.
              </p>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="dialog" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`}
        />
        <CodeBlock
          code={`
<Dialog>
  <DialogTrigger render={<Button variant="outline">Open</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter showCloseButton>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <DocProse>
          <code>size</code> on <code>DialogContent</code> sets the width preset:{" "}
          <code>sm</code> (max-w-sm), <code>default</code> (max-w-md) and{" "}
          <code>lg</code> (max-w-2xl) – all clamp to the viewport on small
          screens.
        </DocProse>
        <DocExample
          code={`
<DialogContent size="sm">...</DialogContent>
<DialogContent size="default">...</DialogContent>
<DialogContent size="lg">...</DialogContent>`}
        >
          {(["sm", "default", "lg"] as const).map((size) => (
            <Dialog key={size}>
              <DialogTrigger
                render={<Button variant="outline">{size}</Button>}
              />
              <DialogContent size={size}>
                <DialogHeader>
                  <DialogTitle>Dialog size: {size}</DialogTitle>
                  <DialogDescription>
                    This dialog uses the {size} width preset.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </DocExample>
      </DocSection>

      <DocSection title="Destructive confirmation">
        <DocProse>
          Compose <code>DialogClose</code> with the <code>render</code> prop to
          make any button dismiss the dialog – a common pattern for
          cancel/confirm footers.
        </DocProse>
        <DocExample
          code={`
<Dialog>
  <DialogTrigger render={<Button variant="destructive">Delete account</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <DialogClose render={<Button variant="destructive">Delete</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <Dialog>
            <DialogTrigger
              render={<Button variant="destructive">Delete account</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
                <DialogClose
                  render={<Button variant="destructive">Delete</Button>}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DocExample>
      </DocSection>

      <DocSection title="Without close button">
        <DocProse>
          <code>showCloseButton={`{false}`}</code> hides the built-in top-right
          close control when dismissal should go through an explicit action.
        </DocProse>
        <DocExample
          code={`
<DialogContent showCloseButton={false}>
  <DialogHeader>
    <DialogTitle>Custom close handling</DialogTitle>
    <DialogDescription>
      The top-right close button is hidden – dismiss via the footer action.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose render={<Button>Got it</Button>} />
  </DialogFooter>
</DialogContent>`}
        >
          <Dialog>
            <DialogTrigger render={<Button variant="outline">Open</Button>} />
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Custom close handling</DialogTitle>
                <DialogDescription>
                  The top-right close button is hidden – dismiss via the footer
                  action.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button>Got it</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Dialog</code> is the Base UI root and accepts its props –{" "}
          <code>open</code>, <code>defaultOpen</code>, <code>onOpenChange</code>
          , <code>modal</code> and <code>dismissible</code>. Interactive parts (
          <code>DialogTrigger</code>, <code>DialogClose</code>) support the Base
          UI <code>render</code> prop to swap in your own element; when the
          rendered element is not a native button, also pass{" "}
          <code>nativeButton={`{false}`}</code>.
        </DocProse>
        <PropsTable
          title="DialogContent"
          rows={[
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              defaultValue: '"default"',
              description:
                "Width preset: max-w-sm, max-w-md or max-w-2xl (reflected as data-size).",
            },
            {
              prop: "showCloseButton",
              type: "boolean",
              defaultValue: "true",
              description:
                "Render the ghost icon close button in the top-right corner.",
            },
          ]}
        />
        <PropsTable
          title="DialogFooter"
          rows={[
            {
              prop: "showCloseButton",
              type: "boolean",
              defaultValue: "false",
              description:
                'Append an outline "Close" button that dismisses the dialog after your custom actions.',
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "DialogTrigger",
              description:
                'Opens the dialog (data-slot="dialog-trigger"); compose your button via the render prop.',
            },
            {
              part: "DialogContent",
              description:
                'Centered popup card (data-slot="dialog-content") rendered in a portal above the overlay, with zoom/fade animations.',
            },
            {
              part: "DialogOverlay",
              description:
                'Dimmed backdrop (data-slot="dialog-overlay") rendered automatically by DialogContent.',
            },
            {
              part: "DialogHeader",
              description:
                'Vertical stack for title and description (data-slot="dialog-header").',
            },
            {
              part: "DialogTitle",
              description:
                'Accessible heading (data-slot="dialog-title") announced when the dialog opens.',
            },
            {
              part: "DialogDescription",
              description:
                'Muted supporting copy (data-slot="dialog-description") with underlined links.',
            },
            {
              part: "DialogFooter",
              description:
                'Action row (data-slot="dialog-footer"): stacked on mobile, right-aligned on desktop.',
            },
            {
              part: "DialogClose",
              description:
                'Dismisses the dialog (data-slot="dialog-close"); compose any button via the render prop.',
            },
            {
              part: "DialogPortal",
              description:
                'Portals dialog parts to the document body (data-slot="dialog-portal"); used internally by DialogContent.',
            },
          ]}
        />
        <DocProse>
          The <code>dialogContentVariants</code> cva helper is also exported for
          building custom dialog surfaces with the same size classes.
        </DocProse>
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI renders the popup with <code>role="dialog"</code> and{" "}
          <code>aria-modal</code>, wires <code>aria-labelledby</code> /{" "}
          <code>aria-describedby</code> to <code>DialogTitle</code> and{" "}
          <code>DialogDescription</code>, traps focus while open, and closes on
          Escape or backdrop click. Every part exposes a <code>data-slot</code>{" "}
          attribute, the content reflects its size as <code>data-size</code>,
          and open/close state is exposed as <code>data-open</code> /{" "}
          <code>data-closed</code> for animation and styling hooks.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
