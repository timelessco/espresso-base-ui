"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

const faq = [
  {
    value: "shipping",
    question: "How long does shipping take?",
    answer:
      "Orders ship within 24 hours and arrive in 3–5 business days. Express delivery arrives the next business day.",
  },
  {
    value: "returns",
    question: "What is the return policy?",
    answer:
      "Every purchase can be returned within 30 days in its original condition for a full refund.",
  },
  {
    value: "warranty",
    question: "Is there a warranty?",
    answer:
      "All products carry a two-year limited warranty covering manufacturing defects.",
  },
]

function accordionPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.multiple ? "" : " multiple={false}",
    v.disabled ? " disabled" : "",
  ].join("")
  return `<Accordion className="w-96"${attrs}>
  <AccordionItem value="shipping">
    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
  {/* more items */}
</Accordion>`
}

function AccordionPlaygroundPreview(v: PlaygroundValues) {
  return (
    <Accordion
      key={`${v.multiple}-${v.disabled}`}
      className="w-80"
      multiple={Boolean(v.multiple)}
      disabled={Boolean(v.disabled)}
    >
      {faq.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default function AccordionDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Accordion"
        description="Vertically stacked disclosure sections built on Base UI. Single or multiple open panels, animated height, and full keyboard support."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            multiple: { type: "boolean", defaultValue: true },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={AccordionPlaygroundPreview}
          renderCode={accordionPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Each <code>AccordionItem</code> pairs an{" "}
          <code>AccordionTrigger</code> with an <code>AccordionContent</code>{" "}
          panel. The trigger swaps its chevron while expanded, and the panel
          animates its height open and closed.
        </DocProse>
        <DocExample
          code={`
<Accordion className="w-96" multiple={false}>
  <AccordionItem value="shipping">
    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
    <AccordionContent>
      <p>Orders ship within 24 hours and arrive in 3–5 business days.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>What is the return policy?</AccordionTrigger>
    <AccordionContent>
      <p>Every purchase can be returned within 30 days.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion className="w-96" multiple={false}>
            {faq.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="accordion" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`}
        />
        <CodeBlock
          code={`
<Accordion multiple={false}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </DocSection>

      <DocSection title="Multiple open">
        <DocProse>
          Panels open independently by default (<code>multiple</code> is{" "}
          <code>true</code>). Pass <code>defaultValue</code> an array of item
          values to pre-expand panels; pass <code>multiple=&#123;false&#125;</code>{" "}
          for the classic one-at-a-time accordion.
        </DocProse>
        <DocExample
          code={`
<Accordion className="w-96" defaultValue={["shipping", "returns"]}>
  {/* items */}
</Accordion>`}
        >
          <Accordion className="w-96" defaultValue={["shipping", "returns"]}>
            {faq.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DocExample>
      </DocSection>

      <DocSection title="Disabled item">
        <DocProse>
          Disable a single item with <code>disabled</code> on{" "}
          <code>AccordionItem</code> – it dims, ignores pointer input and is
          skipped by keyboard navigation. The same prop on the root disables
          the whole accordion.
        </DocProse>
        <DocExample
          code={`
<AccordionItem value="locked" disabled>
  <AccordionTrigger>Disabled question</AccordionTrigger>
  <AccordionContent>Never visible.</AccordionContent>
</AccordionItem>`}
        >
          <Accordion className="w-96" multiple={false}>
            <AccordionItem value="available">
              <AccordionTrigger>Available question</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  This item opens and closes as usual.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="locked" disabled>
              <AccordionTrigger>Disabled question</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">Never visible.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Accordion</code> forwards all Base UI accordion root props.
          Item values default to their index, so <code>value</code> is only
          required for controlled state or non-positional identity.
        </DocProse>
        <PropsTable
          title="Accordion"
          rows={[
            {
              prop: "multiple",
              type: "boolean",
              defaultValue: "true",
              description:
                "Whether several panels can be open at once. false gives one-at-a-time behavior.",
            },
            {
              prop: "defaultValue",
              type: "any[]",
              description: "Item values expanded on first render (uncontrolled).",
            },
            {
              prop: "value",
              type: "any[]",
              description: "Controlled list of expanded item values.",
            },
            {
              prop: "onValueChange",
              type: "(value: any[]) => void",
              description: "Fires with the next expanded values.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables every item in the accordion.",
            },
          ]}
        />
        <PropsTable
          title="AccordionItem"
          rows={[
            {
              prop: "value",
              type: "any",
              description:
                "Identity of the item within the root value array. Defaults to the item's index.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables just this item.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "Accordion",
              description:
                'Root flex column (data-slot="accordion"), owns the expanded-value state.',
            },
            {
              part: "AccordionItem",
              description:
                'One section (data-slot="accordion-item") with a bottom border between items.',
            },
            {
              part: "AccordionTrigger",
              description:
                'Header button (data-slot="accordion-trigger") with automatic up/down chevrons; wrapped in the Base UI heading element.',
            },
            {
              part: "AccordionContent",
              description:
                'Collapsible panel (data-slot="accordion-content") animating between 0 and --accordion-panel-height.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Base UI wires the trigger and panel with{" "}
          <code>aria-expanded</code> and <code>aria-controls</code>, renders
          the trigger inside a heading, and supports Arrow keys, Home and End
          between triggers. State is exposed as <code>data-open</code> /{" "}
          <code>data-closed</code> on the panel and{" "}
          <code>aria-expanded</code> on the trigger; every part carries a{" "}
          <code>data-slot</code> attribute for styling.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
