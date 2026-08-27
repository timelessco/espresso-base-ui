"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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

function drawerPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.swipeDirection !== "down" ? ` swipeDirection="${v.swipeDirection}"` : "",
    v.showSwipeHandle ? " showSwipeHandle" : "",
    v.snapPoints ? " snapPoints={[0.4, 1]}" : "",
  ].join("")

  return `<Drawer${attrs}>
  <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer title</DrawerTitle>
      <DrawerDescription>
        A short description of the drawer contents.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline">Close</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`
}

function DrawerPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Drawer
      swipeDirection={v.swipeDirection as "down" | "up" | "left" | "right"}
      showSwipeHandle={Boolean(v.showSwipeHandle)}
      snapPoints={v.snapPoints ? [0.4, 1] : undefined}
    >
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>
            A short description of the drawer contents.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function DrawerDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Drawer"
        description="A swipe-dismissable panel that slides in from any screen edge, built on Base UI. Supports snap points, a grab handle and nested stacking."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            swipeDirection: {
              type: "options",
              options: ["down", "up", "left", "right"],
              defaultValue: "down",
            },
            showSwipeHandle: { type: "boolean", defaultValue: true },
            snapPoints: { type: "boolean", defaultValue: false },
          }}
          renderPreview={DrawerPlaygroundPreview}
          renderCode={drawerPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          The default drawer slides up from the bottom (
          <code>swipeDirection="down"</code> means it dismisses downward).
          Compose it from <code>DrawerHeader</code>, free-form content and a{" "}
          <code>DrawerFooter</code> pinned to the end.
        </DocProse>
        <DocExample
          code={`
<Drawer>
  <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer title</DrawerTitle>
      <DrawerDescription>
        A short description of the drawer contents.
      </DrawerDescription>
    </DrawerHeader>
    <div className="p-4 text-sm text-muted-foreground">
      Drag the drawer down or press the close button to dismiss.
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose render={<Button variant="outline">Cancel</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer>
            <DrawerTrigger
              render={<Button variant="outline">Open drawer</Button>}
            />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer title</DrawerTitle>
                <DrawerDescription>
                  A short description of the drawer contents.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 text-sm text-muted-foreground">
                Drag the drawer down or press the close button to dismiss.
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose
                  render={<Button variant="outline">Cancel</Button>}
                />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="drawer" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`}
        />
        <CodeBlock
          code={`
<Drawer>
  <DrawerTrigger render={<Button variant="outline">Open</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline">Close</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        />
      </DocSection>

      <DocSection title="Directions">
        <DocProse>
          <code>swipeDirection</code> sets the edge the drawer rests on and the
          direction it swipes away: <code>down</code> (default, bottom sheet),{" "}
          <code>up</code> (top sheet), <code>left</code> and <code>right</code>{" "}
          (side panels, 75% wide on mobile and 24rem on desktop).
        </DocProse>
        <DocExample
          code={`
<Drawer swipeDirection="down" showSwipeHandle>...</Drawer>
<Drawer swipeDirection="up" showSwipeHandle>...</Drawer>
<Drawer swipeDirection="left" showSwipeHandle>...</Drawer>
<Drawer swipeDirection="right" showSwipeHandle>...</Drawer>`}
        >
          {(["down", "up", "left", "right"] as const).map((direction) => (
            <Drawer key={direction} swipeDirection={direction} showSwipeHandle>
              <DrawerTrigger
                render={
                  <Button variant="outline" className="capitalize">
                    {direction}
                  </Button>
                }
              />
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="capitalize">
                    {direction} drawer
                  </DrawerTitle>
                  <DrawerDescription>
                    Swipe toward the {direction} edge to dismiss.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </DocExample>
      </DocSection>

      <DocSection title="Swipe handle">
        <DocProse>
          <code>showSwipeHandle</code> renders a small grab bar on the swipe
          edge that hints the drawer is draggable – it orients itself
          automatically to the active direction.
        </DocProse>
        <DocExample
          code={`
<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline">Open with handle</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Grab and drag</DrawerTitle>
      <DrawerDescription>
        The handle at the top hints that the drawer is draggable.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline">Close</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline">Open with handle</Button>}
            />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Grab and drag</DrawerTitle>
                <DrawerDescription>
                  The handle at the top hints that the drawer is draggable.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose
                  render={<Button variant="outline">Close</Button>}
                />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DocExample>
      </DocSection>

      <DocSection title="Snap points">
        <DocProse>
          <code>snapPoints</code> lets a vertical drawer rest at intermediate
          heights – pass fractions of the viewport and drag between them; the
          overlay keeps a minimum opacity while snapped.
        </DocProse>
        <DocExample
          code={`
<Drawer snapPoints={[0.4, 1]} showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline">Open with snap points</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Snap points</DrawerTitle>
      <DrawerDescription>
        Drag to snap between 40% and full height.
      </DrawerDescription>
    </DrawerHeader>
    <div className="flex flex-col gap-4 overflow-y-auto p-4">...</div>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer snapPoints={[0.4, 1]} showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline">Open with snap points</Button>}
            />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Snap points</DrawerTitle>
                <DrawerDescription>
                  Drag to snap between 40% and full height.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-4 overflow-y-auto p-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    Scrollable row {i + 1} – expand the drawer to full height to
                    read everything.
                  </p>
                ))}
              </div>
              <DrawerFooter>
                <DrawerClose
                  render={<Button variant="outline">Close</Button>}
                />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Drawer</code> wraps the Base UI Drawer root and shares{" "}
          <code>modal</code>, <code>showSwipeHandle</code>,{" "}
          <code>snapPoints</code> and <code>swipeDirection</code> with{" "}
          <code>DrawerContent</code> via context. It also accepts the Base UI
          root props – <code>open</code>, <code>defaultOpen</code>,{" "}
          <code>onOpenChange</code> and <code>dismissible</code>. Interactive
          parts (<code>DrawerTrigger</code>, <code>DrawerClose</code>) support
          the Base UI <code>render</code> prop to swap in your own element; pass{" "}
          <code>nativeButton={`{false}`}</code> if it is not a native button.
        </DocProse>
        <PropsTable
          title="Drawer"
          rows={[
            {
              prop: "swipeDirection",
              type: '"down" | "up" | "left" | "right"',
              defaultValue: '"down"',
              description:
                "Edge the drawer rests on and the direction it swipes away toward.",
            },
            {
              prop: "showSwipeHandle",
              type: "boolean",
              defaultValue: "false",
              description:
                "Render a grab bar (DrawerSwipeHandle) on the swipe edge of the popup.",
            },
            {
              prop: "snapPoints",
              type: "(number | string)[]",
              description:
                "Intermediate resting heights for vertical drawers, e.g. [0.4, 1].",
            },
            {
              prop: "modal",
              type: "boolean",
              defaultValue: "true",
              description:
                "Render the dimmed overlay and block interaction with the page behind; set false for a non-modal drawer.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "DrawerTrigger",
              description:
                'Opens the drawer (data-slot="drawer-trigger"); compose your button via the render prop.',
            },
            {
              part: "DrawerContent",
              description:
                'Renders the portal, overlay, viewport and the sliding popup (data-slot="drawer-popup") that wraps your content (data-slot="drawer-content").',
            },
            {
              part: "DrawerOverlay",
              description:
                'Backdrop (data-slot="drawer-overlay") whose opacity tracks the swipe progress; rendered automatically when modal.',
            },
            {
              part: "DrawerSwipeHandle",
              description:
                'Decorative grab bar (data-slot="drawer-swipe-handle", aria-hidden) that follows the swipe axis and direction.',
            },
            {
              part: "DrawerHeader",
              description:
                'Title/description stack (data-slot="drawer-header"); centered for vertical drawers, left-aligned on desktop.',
            },
            {
              part: "DrawerTitle",
              description:
                'Accessible heading (data-slot="drawer-title") announced when the drawer opens.',
            },
            {
              part: "DrawerDescription",
              description:
                'Muted supporting copy (data-slot="drawer-description").',
            },
            {
              part: "DrawerFooter",
              description:
                'Action stack pinned to the end (data-slot="drawer-footer").',
            },
            {
              part: "DrawerClose",
              description:
                'Dismisses the drawer (data-slot="drawer-close"); compose any button via the render prop.',
            },
            {
              part: "DrawerPortal",
              description:
                'Portals drawer parts to the document body (data-slot="drawer-portal"); used internally by DrawerContent.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI renders the drawer as a modal dialog – focus is trapped while
          open, Escape and backdrop click dismiss it, and{" "}
          <code>DrawerTitle</code> / <code>DrawerDescription</code> label it for
          screen readers. Every part exposes a <code>data-slot</code> attribute,
          and the popup reflects gesture state as{" "}
          <code>data-swipe-direction</code>, <code>data-swipe-axis</code>,{" "}
          <code>data-snap-points</code>, <code>data-swiping</code> and{" "}
          <code>data-nested-drawer-open</code>. CSS variables such as{" "}
          <code>--drawer-swipe-progress</code>, <code>--drawer-height</code> and{" "}
          <code>--drawer-inset</code> are available for advanced styling – the
          overlay, bleed and stacking effects are all driven by them.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
