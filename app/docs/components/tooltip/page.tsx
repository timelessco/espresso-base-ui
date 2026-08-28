"use client"

import { Diamond } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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

function tooltipPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.variant !== "default" ? ` variant="${v.variant}"` : "",
    v.side !== "top" ? ` side="${v.side}"` : "",
  ].join("")

  return [
    `<Tooltip>`,
    `  <TooltipTrigger render={<Button variant="outline" />}>`,
    `    Hover me`,
    `  </TooltipTrigger>`,
    `  <TooltipContent${attrs}>${v.content}</TooltipContent>`,
    `</Tooltip>`,
  ].join("\n")
}

function TooltipPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipContent
        variant={v.variant as "default" | "plain" | "subtle"}
        side={v.side as "top" | "bottom" | "left" | "right"}
      >
        {v.content}
      </TooltipContent>
    </Tooltip>
  )
}

export default function TooltipDocsPage() {
  return (
    <TooltipProvider>
      <DocPage>
        <DocHeader
          title="Tooltip"
          description="A popup that labels its trigger on hover or focus, built on Base UI. Positioned on any side, with an arrow by default."
        />

        <DocSection title="Playground">
          <DocPlayground
            controls={{
              content: {
                type: "text",
                defaultValue: "Open source by default",
              },
              variant: {
                type: "options",
                options: ["default", "plain", "subtle"],
                defaultValue: "default",
              },
              side: {
                type: "options",
                options: ["top", "bottom", "left", "right"],
                defaultValue: "top",
              },
            }}
            renderPreview={TooltipPlaygroundPreview}
            renderCode={tooltipPlaygroundCode}
          />
        </DocSection>

        <DocSection title="Preview">
          <DocProse>
            Wrap the app (or a subtree) in <code>TooltipProvider</code>, then
            compose <code>Tooltip</code>, <code>TooltipTrigger</code> and{" "}
            <code>TooltipContent</code>. The trigger&apos;s <code>render</code>{" "}
            prop merges it onto your own element.
          </DocProse>
          <DocExample
            code={`
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>
      Hover me
    </TooltipTrigger>
    <TooltipContent>
      Open source by default <Diamond className="size-3 shrink-0" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
          >
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Hover me
              </TooltipTrigger>
              <TooltipContent>
                Open source by default <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          </DocExample>
        </DocSection>

        <DocSection title="Installation">
          <DocInstall name="tooltip" />
        </DocSection>

        <DocSection title="Usage">
          <CodeBlock
            code={`
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"`}
          />
          <CodeBlock
            code={`
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>
      Trigger
    </TooltipTrigger>
    <TooltipContent side="bottom">Label</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
          />
        </DocSection>

        <DocSection title="Variants">
          <DocProse>
            <code>variant</code> on <code>TooltipContent</code>:{" "}
            <code>default</code> is the primary-colored bubble with an arrow,{" "}
            <code>plain</code> drops the arrow, and <code>subtle</code> swaps to
            a background-colored surface.
          </DocProse>
          <DocExample
            code={`
<TooltipContent variant="default">Default variant</TooltipContent>
<TooltipContent variant="plain">Plain variant</TooltipContent>
<TooltipContent variant="subtle">Subtle variant</TooltipContent>`}
          >
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                With arrow
              </TooltipTrigger>
              <TooltipContent variant="default">
                Default variant <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Without arrow
              </TooltipTrigger>
              <TooltipContent variant="plain">
                Plain variant <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Subtle
              </TooltipTrigger>
              <TooltipContent variant="subtle">
                Subtle variant <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
          </DocExample>
        </DocSection>

        <DocSection title="Placement">
          <DocProse>
            <code>side</code> places the tooltip on any edge of the trigger,{" "}
            <code>align</code> shifts it along that edge, and{" "}
            <code>sideOffset</code> / <code>alignOffset</code> fine-tune the
            distance – the enter animation follows the chosen side.
          </DocProse>
          <DocExample
            code={`
<TooltipContent side="top">Top tooltip</TooltipContent>
<TooltipContent side="bottom">Bottom tooltip</TooltipContent>
<TooltipContent side="right" align="start" sideOffset={8}>
  Right, aligned to start
</TooltipContent>`}
          >
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Top
              </TooltipTrigger>
              <TooltipContent side="top">
                Top tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Bottom
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Bottom tooltip <Diamond className="size-3 shrink-0" />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Right
              </TooltipTrigger>
              <TooltipContent side="right" align="start" sideOffset={8}>
                Right, aligned to start
              </TooltipContent>
            </Tooltip>
          </DocExample>
        </DocSection>

        <DocSection title="Custom triggers">
          <DocProse>
            Any element works as a trigger via <code>render</code> – here an
            inline text span; long content wraps within the bubble&apos;s{" "}
            <code>max-w-xs</code>.
          </DocProse>
          <DocExample
            code={`
<p>
  Hover over the{" "}
  <Tooltip>
    <TooltipTrigger
      render={<span className="cursor-help underline decoration-dotted" />}
    >
      underlined text
    </TooltipTrigger>
    <TooltipContent>This is an inline tooltip</TooltipContent>
  </Tooltip>{" "}
  to see the tooltip.
</p>`}
          >
            <p className="text-sm text-muted-foreground">
              Hover over the{" "}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="cursor-help underline decoration-dotted" />
                  }
                >
                  underlined text
                </TooltipTrigger>
                <TooltipContent>
                  This is an inline tooltip{" "}
                  <Diamond className="size-3 shrink-0" />
                </TooltipContent>
              </Tooltip>{" "}
              to see the tooltip.
            </p>
          </DocExample>
        </DocSection>

        <DocSection title="API reference">
          <DocProse>
            All four parts are thin wrappers around the Base UI tooltip and
            accept its full prop surface – <code>TooltipProvider</code> and{" "}
            <code>Tooltip</code> configure timing and open state,{" "}
            <code>TooltipContent</code> bundles the portal, positioner, popup
            and arrow into one styled component.
          </DocProse>
          <PropsTable
            title="TooltipProvider"
            rows={[
              {
                prop: "delay",
                type: "number",
                defaultValue: "150",
                description:
                  "Milliseconds to wait before opening a tooltip; tooltips under one provider share it and skip the delay when moving between triggers.",
              },
            ]}
          />
          <PropsTable
            title="TooltipContent"
            rows={[
              {
                prop: "variant",
                type: '"default" | "plain" | "subtle"',
                defaultValue: '"default"',
                description:
                  "default: primary bubble with arrow. plain: same bubble, no arrow. subtle: background-colored surface with arrow.",
              },
              {
                prop: "side",
                type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
                defaultValue: '"top"',
                description: "Which side of the trigger to place against.",
              },
              {
                prop: "sideOffset",
                type: "number",
                defaultValue: "4",
                description: "Gap in pixels between trigger and tooltip.",
              },
              {
                prop: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"center"',
                description: "Alignment along the chosen side.",
              },
              {
                prop: "alignOffset",
                type: "number",
                defaultValue: "0",
                description: "Extra offset in pixels along the align axis.",
              },
            ]}
          />
          <PartsTable
            rows={[
              {
                part: "TooltipProvider",
                description:
                  'Shares open delay and timing across tooltips (data-slot="tooltip-provider"). Mount once around the subtree.',
              },
              {
                part: "Tooltip",
                description:
                  'Root that pairs one trigger with its content (data-slot="tooltip"). Accepts Base UI root props like open, onOpenChange and defaultOpen.',
              },
              {
                part: "TooltipTrigger",
                description:
                  'The hoverable/focusable element (data-slot="tooltip-trigger"). Use render to merge onto your own element, e.g. a Button.',
              },
              {
                part: "TooltipContent",
                description:
                  'Portalled, positioned popup (data-slot="tooltip-content") that also reflects data-variant. Renders the arrow unless variant="plain".',
              },
            ]}
          />
        </DocSection>

        <DocSection title="Accessibility & styling hooks">
          <DocProse>
            The Base UI primitive wires the trigger and popup together with the
            proper ARIA attributes, opens on keyboard focus as well as hover,
            and closes on <code>Escape</code> – so tooltip content stays
            discoverable without a pointer. Keep the content to a short label;
            interactive controls don&apos;t belong in a tooltip. For styling,
            every part exposes its <code>data-slot</code>, and the popup
            reflects Base UI state as <code>data-open</code> /{" "}
            <code>data-closed</code> plus <code>data-side</code> for
            per-placement animation – embedded <code>Kbd</code> elements
            (matched via <code>data-slot="kbd"</code>) get tightened trailing
            padding automatically.
          </DocProse>
        </DocSection>
      </DocPage>
    </TooltipProvider>
  )
}
