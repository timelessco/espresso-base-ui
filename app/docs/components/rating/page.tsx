"use client"

import * as React from "react"
import { Heart, Sparkles, Star, ThumbsUp, Zap } from "lucide-react"

import { Rating, RatingButton } from "@/components/ui/rating"
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

function ratingPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.readOnly ? ` value={${v.value}} readOnly` : ` defaultValue={${v.value}}`,
    v.disabled ? " disabled" : "",
  ].join("")
  return `<Rating${attrs}>
  {Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={Star} />
  ))}
</Rating>`
}

function RatingPlaygroundPreview(v: PlaygroundValues) {
  const value = Number(v.value)
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={Star} />
  ))
  if (v.readOnly) {
    return (
      <Rating value={value} readOnly disabled={Boolean(v.disabled)}>
        {stars}
      </Rating>
    )
  }
  return (
    <Rating key={value} defaultValue={value} disabled={Boolean(v.disabled)}>
      {stars}
    </Rating>
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <div className="flex items-center gap-3">
      <Rating value={value} onValueChange={setValue}>
        {Array.from({ length: 5 }).map((_, i) => (
          <RatingButton
            key={i}
            icon={ThumbsUp}
            className="data-filled:text-blue-500"
          />
        ))}
      </Rating>
      <span className="text-sm text-muted-foreground">Rated {value} of 5</span>
    </div>
  )
}

export default function RatingDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Rating"
        description="An interactive star-rating control with hover preview and any Lucide icon as the shape. Supports read-only, disabled, and form modes."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            value: {
              type: "options",
              options: ["2", "3", "4", "5"],
              defaultValue: "3",
            },
            readOnly: { type: "boolean", defaultValue: false },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={RatingPlaygroundPreview}
          renderCode={ratingPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Render one <code>RatingButton</code> per step – buttons index
          themselves automatically, and hovering previews the value before you
          click.
        </DocProse>
        <DocExample
          code={`
<Rating defaultValue={3}>
  {Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={Star} />
  ))}
</Rating>`}
        >
          <Rating defaultValue={3}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} icon={Star} />
            ))}
          </Rating>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="rating" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import { Rating, RatingButton } from "@/components/ui/rating"`}
        />
        <CodeBlock
          code={`
<Rating defaultValue={3} max={5}>
  <RatingButton />
  <RatingButton />
  <RatingButton />
  <RatingButton />
  <RatingButton />
</Rating>`}
        />
      </DocSection>

      <DocSection title="Custom icon and color">
        <DocProse>
          Pass any Lucide icon via <code>icon</code> and recolor the filled
          state through the <code>data-filled</code> attribute – the default
          filled tint is <code>text-amber-500</code>.
        </DocProse>
        <DocExample
          code={`
<Rating defaultValue={3}>
  {Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={Heart} className="data-filled:text-rose-500" />
  ))}
</Rating>`}
        >
          <Rating defaultValue={3}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                key={i}
                icon={Heart}
                className="data-filled:text-rose-500"
              />
            ))}
          </Rating>
        </DocExample>
      </DocSection>

      <DocSection title="Controlled">
        <DocProse>
          Pass <code>value</code> and <code>onValueChange</code> to control the
          rating from your own state.
        </DocProse>
        <DocExample
          code={`
const [value, setValue] = React.useState(3)

<Rating value={value} onValueChange={setValue}>
  {Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={ThumbsUp} className="data-filled:text-blue-500" />
  ))}
</Rating>`}
        >
          <ControlledDemo />
        </DocExample>
      </DocSection>

      <DocSection title="Read-only and disabled">
        <DocProse>
          <code>readOnly</code> displays a fixed value with no hover or click
          handling; <code>disabled</code> blocks interaction and dims the whole
          control to 50% opacity.
        </DocProse>
        <DocExample
          code={`
<Rating value={4} readOnly>
  {Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={Zap} className="data-filled:text-amber-400" />
  ))}
</Rating>

<Rating value={3} disabled>
  {Array.from({ length: 5 }).map((_, i) => (
    <RatingButton key={i} icon={Sparkles} className="data-filled:text-purple-500" />
  ))}
</Rating>`}
        >
          <div className="flex flex-col items-center gap-3">
            <Rating value={4} readOnly>
              {Array.from({ length: 5 }).map((_, i) => (
                <RatingButton
                  key={i}
                  icon={Zap}
                  className="data-filled:text-amber-400"
                />
              ))}
            </Rating>
            <Rating value={3} disabled>
              {Array.from({ length: 5 }).map((_, i) => (
                <RatingButton
                  key={i}
                  icon={Sparkles}
                  className="data-filled:text-purple-500"
                />
              ))}
            </Rating>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Rating</code> renders a <code>div</code> and provides context;{" "}
          <code>RatingButton</code> renders a <code>button</code>. Give the root
          a <code>name</code> and it renders a hidden input so the value submits
          with a form. Buttons must be used inside a <code>Rating</code> – they
          throw otherwise.
        </DocProse>
        <PropsTable
          title="Rating"
          rows={[
            {
              prop: "defaultValue",
              type: "number",
              defaultValue: "0",
              description: "Initial value when uncontrolled.",
            },
            {
              prop: "value",
              type: "number",
              description: "Controlled value.",
            },
            {
              prop: "onValueChange",
              type: "(value: number) => void",
              description: "Called with the new value on selection.",
            },
            {
              prop: "max",
              type: "number",
              defaultValue: "5",
              description:
                "Upper bound used for the accessible label – render one RatingButton per step.",
            },
            {
              prop: "readOnly",
              type: "boolean",
              defaultValue: "false",
              description:
                'Display-only mode: role="img" with an accessible "Rated x out of max" label.',
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Blocks interaction and dims the control to 50% opacity.",
            },
            {
              prop: "name",
              type: "string",
              description:
                "Renders a hidden input with the current value for form submission.",
            },
            {
              prop: "required",
              type: "boolean",
              description: "Marks the hidden input as required.",
            },
          ]}
        />
        <PropsTable
          title="RatingButton"
          rows={[
            {
              prop: "index",
              type: "number",
              description:
                "1-based position. Auto-detected from sibling order when omitted.",
            },
            {
              prop: "size",
              type: "number",
              defaultValue: "24",
              description: "Icon size in pixels.",
            },
            {
              prop: "icon",
              type: "LucideIcon",
              defaultValue: "Star",
              description: "Icon used for both filled and empty states.",
            },
            {
              prop: "filledIcon",
              type: "LucideIcon",
              description: "Overrides the icon when this step is filled.",
            },
            {
              prop: "emptyIcon",
              type: "LucideIcon",
              description: "Overrides the icon when this step is empty.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Interactive ratings render as a <code>radiogroup</code> of{" "}
          <code>radio</code> buttons with <code>aria-checked</code> on the
          selected step and per-button labels like "3 stars"; buttons respond to
          Enter and Space and preview on focus. In <code>readOnly</code> mode
          the root becomes <code>role="img"</code> with a summary label. For
          styling, the root exposes <code>data-slot="rating"</code>,{" "}
          <code>data-value</code>, <code>data-readonly</code> and{" "}
          <code>data-disabled</code>; each button exposes{" "}
          <code>data-slot="rating-button"</code>, <code>data-index</code> and{" "}
          <code>data-filled</code>.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
