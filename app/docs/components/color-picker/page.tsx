"use client"

import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"
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

function colorPickerPlaygroundCode(v: PlaygroundValues) {
  const size = v.size as string
  const attrs = [
    v.variant !== "outline" ? ` variant="${v.variant}"` : "",
    size !== "md" ? ` size="${size}"` : "",
  ].join("")
  return [
    `<ColorPicker defaultValue="#3b82f6">`,
    `  <ColorPickerTrigger${attrs}>`,
    `    <ColorPickerSwatch${size !== "md" ? ` size="${size}"` : ""} />`,
    `    ${v.label}`,
    `  </ColorPickerTrigger>`,
    `  <ColorPickerContent>`,
    `    <ColorPickerArea />`,
    `    <ColorPickerHueSlider />`,
    ...(v.withoutAlpha ? [] : [`    <ColorPickerAlphaSlider />`]),
    `    <ColorPickerFormatSelect className="w-full" />`,
    `    <ColorPickerInput className="flex-1"${v.withoutAlpha ? " withoutAlpha" : ""} />`,
    `  </ColorPickerContent>`,
    `</ColorPicker>`,
  ].join("\n")
}

function ColorPickerPlaygroundPreview(v: PlaygroundValues) {
  const size = v.size as "xs" | "sm" | "md" | "lg"
  return (
    <ColorPicker defaultValue="#3b82f6">
      <ColorPickerTrigger
        variant={v.variant as "outline" | "subtle" | "ghost"}
        size={size}
      >
        <ColorPickerSwatch size={size} />
        {v.label}
      </ColorPickerTrigger>
      <ColorPickerContent>
        <ColorPickerArea />
        <ColorPickerHueSlider />
        {!v.withoutAlpha && <ColorPickerAlphaSlider />}
        <ColorPickerFormatSelect className="w-full" />
        <ColorPickerInput
          className="flex-1"
          withoutAlpha={Boolean(v.withoutAlpha)}
        />
      </ColorPickerContent>
    </ColorPicker>
  )
}

export default function ColorPickerDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Color Picker"
        description="A popover color picker with saturation area, hue and alpha sliders and an eye-dropper. Switches between hex, RGB, HSL and HSB formats."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            label: { type: "text", defaultValue: "Pick a color" },
            variant: {
              type: "options",
              options: ["outline", "subtle", "ghost"],
              defaultValue: "outline",
            },
            size: {
              type: "options",
              options: ["xs", "sm", "md", "lg"],
              defaultValue: "md",
            },
            withoutAlpha: { type: "boolean", defaultValue: false },
          }}
          renderPreview={ColorPickerPlaygroundPreview}
          renderCode={colorPickerPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Compose the parts inside <code>ColorPicker</code>:{" "}
          <code>ColorPickerTrigger</code> opens the popover, and{" "}
          <code>ColorPickerContent</code> stacks the area, sliders and inputs.{" "}
          <code>ColorPickerSwatch</code> previews the current color anywhere –
          here inside the trigger.
        </DocProse>
        <DocExample
          code={`
<ColorPicker defaultValue="#3b82f6">
  <ColorPickerTrigger>
    <ColorPickerSwatch className="size-5" />
    Pick a color
  </ColorPickerTrigger>
  <ColorPickerContent>
    <ColorPickerArea />
    <ColorPickerHueSlider />
    <ColorPickerFormatSelect className="w-full" />
    <ColorPickerInput className="flex-1" />
  </ColorPickerContent>
</ColorPicker>`}
        >
          <ColorPicker defaultValue="#3b82f6">
            <ColorPickerTrigger>
              <ColorPickerSwatch className="size-5" />
              Pick a color
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <ColorPickerHueSlider />
              <ColorPickerFormatSelect className="w-full" />
              <ColorPickerInput className="flex-1" />
            </ColorPickerContent>
          </ColorPicker>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="color-picker" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"`}
        />
        <CodeBlock
          code={`
const [color, setColor] = React.useState("#3b82f6")

<ColorPicker value={color} onValueChange={setColor}>
  <ColorPickerTrigger>
    <ColorPickerSwatch className="size-5" />
    {color}
  </ColorPickerTrigger>
  <ColorPickerContent>
    <ColorPickerArea />
    <ColorPickerHueSlider />
    <ColorPickerInput />
  </ColorPickerContent>
</ColorPicker>`}
        />
      </DocSection>

      <DocSection title="Trigger variants and sizes">
        <DocProse>
          <code>ColorPickerTrigger</code> maps onto the design system Button:{" "}
          <code>variant</code> picks <code>outline</code>, <code>subtle</code>{" "}
          or <code>ghost</code>, and <code>size</code> spans <code>xs</code> to{" "}
          <code>lg</code>. Pass the matching size to the swatch inside.
        </DocProse>
        <DocExample
          code={`
<ColorPicker defaultValue="#3b82f6">
  <ColorPickerTrigger variant="subtle" size="sm">
    <ColorPickerSwatch size="sm" />
    #3b82f6
  </ColorPickerTrigger>
  ...
</ColorPicker>

<ColorPicker defaultValue="#10b981">
  <ColorPickerTrigger variant="ghost" size="lg">
    <ColorPickerSwatch size="lg" />
    #10b981
  </ColorPickerTrigger>
  ...
</ColorPicker>`}
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <ColorPicker defaultValue="#3b82f6">
              <ColorPickerTrigger variant="subtle" size="sm">
                <ColorPickerSwatch size="sm" />
                #3b82f6
              </ColorPickerTrigger>
              <ColorPickerContent>
                <ColorPickerArea />
                <ColorPickerHueSlider />
                <ColorPickerFormatSelect className="w-full" />
                <ColorPickerInput className="flex-1" />
              </ColorPickerContent>
            </ColorPicker>
            <ColorPicker defaultValue="#10b981">
              <ColorPickerTrigger variant="ghost" size="lg">
                <ColorPickerSwatch size="lg" />
                #10b981
              </ColorPickerTrigger>
              <ColorPickerContent>
                <ColorPickerArea />
                <ColorPickerHueSlider />
                <ColorPickerFormatSelect className="w-full" />
                <ColorPickerInput className="flex-1" />
              </ColorPickerContent>
            </ColorPicker>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Alpha and eye dropper">
        <DocProse>
          Add <code>ColorPickerAlphaSlider</code> for transparency and{" "}
          <code>ColorPickerEyeDropper</code> to sample any pixel on screen – the
          eye-dropper button renders only in browsers that support the{" "}
          <code>EyeDropper</code> API.
        </DocProse>
        <DocExample
          code={`
<ColorPicker defaultValue="#ef4444">
  <ColorPickerTrigger>
    <ColorPickerSwatch className="size-5" />
    Pick / Sample
  </ColorPickerTrigger>
  <ColorPickerContent>
    <ColorPickerArea />
    <ColorPickerHueSlider />
    <ColorPickerAlphaSlider />
    <div className="flex items-center gap-2">
      <ColorPickerEyeDropper />
      <ColorPickerFormatSelect className="w-full" />
    </div>
    <ColorPickerInput className="flex-1" />
  </ColorPickerContent>
</ColorPicker>`}
        >
          <ColorPicker defaultValue="#ef4444">
            <ColorPickerTrigger>
              <ColorPickerSwatch className="size-5" />
              Pick / Sample
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <ColorPickerHueSlider />
              <ColorPickerAlphaSlider />
              <div className="flex items-center gap-2">
                <ColorPickerEyeDropper />
                <ColorPickerFormatSelect className="w-full" />
              </div>
              <ColorPickerInput className="flex-1" />
            </ColorPickerContent>
          </ColorPicker>
        </DocExample>
      </DocSection>

      <DocSection title="Inline">
        <DocProse>
          The <code>inline</code> prop drops the popover entirely and renders{" "}
          <code>ColorPickerContent</code> as a plain panel – useful for sidebars
          and settings pages.
        </DocProse>
        <DocExample
          code={`
<ColorPicker inline defaultValue="#f59e0b">
  <ColorPickerContent className="w-full rounded-lg border bg-popover">
    <ColorPickerArea />
    <ColorPickerHueSlider />
    <ColorPickerAlphaSlider />
    <div className="flex items-center gap-2">
      <ColorPickerSwatch />
      <ColorPickerFormatSelect className="w-full flex-1" />
    </div>
    <ColorPickerInput className="flex-1" />
  </ColorPickerContent>
</ColorPicker>`}
        >
          <div className="w-full max-w-[260px]">
            <ColorPicker inline defaultValue="#f59e0b">
              <ColorPickerContent className="w-full rounded-lg border bg-popover">
                <ColorPickerArea />
                <ColorPickerHueSlider />
                <ColorPickerAlphaSlider />
                <div className="flex items-center gap-2">
                  <ColorPickerSwatch />
                  <ColorPickerFormatSelect className="w-full flex-1" />
                </div>
                <ColorPickerInput className="flex-1" />
              </ColorPickerContent>
            </ColorPicker>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>ColorPicker</code> holds all state in an external store and
          shares it with the parts via context. Inside a <code>form</code> it
          renders a hidden input with the current hex value, so{" "}
          <code>name</code> / <code>required</code> work like a native field.
          The <code>ColorPickerProps</code> type and a{" "}
          <code>useColorPicker(selector)</code> hook (for reading store state in
          custom parts) are also exported.
        </DocProse>
        <PropsTable
          title="ColorPicker"
          rows={[
            {
              prop: "value",
              type: "string",
              description:
                "Controlled color, parsed from hex, rgb(a), hsl(a) or hsb(a) strings.",
            },
            {
              prop: "defaultValue",
              type: "string",
              defaultValue: '"#000000"',
              description: "Initial color when uncontrolled.",
            },
            {
              prop: "onValueChange",
              type: "(value: string) => void",
              description:
                "Called with the color serialized in the active format.",
            },
            {
              prop: "format / defaultFormat",
              type: '"hex" | "rgb" | "hsl" | "hsb"',
              defaultValue: '"hex"',
              description:
                "Active output format – controlled via format + onFormatChange, or switched in the UI by ColorPickerFormatSelect.",
            },
            {
              prop: "open / defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description:
                "Popover open state; pair the controlled form with onOpenChange.",
            },
            {
              prop: "inline",
              type: "boolean",
              defaultValue: "false",
              description:
                "Render without a popover – ColorPickerContent becomes a plain div panel.",
            },
            {
              prop: "modal",
              type: "boolean",
              description: "Forwarded to the underlying Popover.",
            },
            {
              prop: "name",
              type: "string",
              description: "Name for the hidden form input (submitted as hex).",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Disables the trigger and every part inside the content.",
            },
            {
              prop: "readOnly / required",
              type: "boolean",
              description: "Forwarded to the hidden form input.",
            },
            {
              prop: "dir",
              type: '"ltr" | "rtl"',
              description:
                "Text direction; falls back to the Direction provider.",
            },
            {
              prop: "asChild",
              type: "boolean",
              defaultValue: "false",
              description: "Merge the root's props onto the child element.",
            },
          ]}
        />
        <PropsTable
          title="ColorPickerTrigger"
          rows={[
            {
              prop: "variant",
              type: '"outline" | "subtle" | "ghost"',
              defaultValue: '"outline"',
              description:
                "Visual style, mapped to the corresponding Button variant.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Trigger height, text size and radius.",
            },
          ]}
        />
        <PropsTable
          title="ColorPickerInput"
          rows={[
            {
              prop: "withoutAlpha",
              type: "boolean",
              defaultValue: "false",
              description:
                "Hide the alpha field from the grouped channel inputs.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "ColorPickerTrigger",
              description:
                'Popover trigger button (data-slot="color-picker-trigger", plus data-variant and data-size).',
            },
            {
              part: "ColorPickerContent",
              description:
                'Panel that stacks the parts (data-slot="color-picker-content"). A PopoverContent normally, a plain div in inline mode.',
            },
            {
              part: "ColorPickerArea",
              description:
                'Draggable saturation/brightness square (data-slot="color-picker-area") with a floating thumb.',
            },
            {
              part: "ColorPickerHueSlider",
              description:
                'Hue slider, 0–360, over a rainbow track (data-slot="color-picker-hue-slider").',
            },
            {
              part: "ColorPickerAlphaSlider",
              description:
                'Alpha slider, 0–100, over a checkerboard track (data-slot="color-picker-alpha-slider").',
            },
            {
              part: "ColorPickerSwatch",
              description:
                'Live preview circle (data-slot="color-picker-swatch", role="img" with a spoken color label). Shows a checkerboard behind transparent colors.',
            },
            {
              part: "ColorPickerEyeDropper",
              description:
                'Screen-sampling button (data-slot="color-picker-eye-dropper"). Renders only when the browser exposes the EyeDropper API.',
            },
            {
              part: "ColorPickerFormatSelect",
              description:
                'Tabs that switch the active format between HEX, RGB, HSL and HSB (data-slot="color-picker-format-select").',
            },
            {
              part: "ColorPickerInput",
              description:
                'Format-aware value inputs (data-slot="color-picker-input") – a hex + alpha pair, or grouped channel fields for rgb / hsl / hsb, each with a descriptive aria-label.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
