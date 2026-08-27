"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
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

const chartData = [
  { month: "Jan", sales: 186 },
  { month: "Feb", sales: 305 },
  { month: "Mar", sales: 237 },
  { month: "Apr", sales: 73 },
  { month: "May", sales: 209 },
  { month: "Jun", sales: 214 },
]

const chartConfig = {
  sales: { label: "Sales", color: "var(--chart-7)" },
} satisfies ChartConfig

export default function ChartDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Chart"
        description="Recharts wrappers with themed grid, tooltip and legend. A config maps each series to a label, icon and color exposed as CSS variables."
      />

      <DocSection title="Preview">
        <DocProse>
          Wrap any recharts chart in <code>ChartContainer</code> with a{" "}
          <code>config</code>. Each config key becomes a <code>--color-*</code>{" "}
          CSS variable scoped to the chart, referenced from the series{" "}
          <code>fill</code>.
        </DocProse>
        <DocExample
          code={`
const chartData = [
  { month: "Jan", sales: 186 },
  { month: "Feb", sales: 305 },
  { month: "Mar", sales: 237 },
  { month: "Apr", sales: 73 },
  { month: "May", sales: 209 },
  { month: "Jun", sales: 214 },
]

const chartConfig = {
  sales: { label: "Sales", color: "var(--chart-7)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} strokeDasharray="4 4" />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
    <Bar dataKey="sales" fill="var(--color-sales)" barSize={24} radius={[2, 2, 0, 0]} />
  </BarChart>
</ChartContainer>`}
        >
          <div className="w-full max-w-lg">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[220px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  barSize={24}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="chart" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"`}
        />
        <CodeBlock
          code={`
const config = {
  sales: { label: "Sales", color: "var(--chart-7)" },
} satisfies ChartConfig

<ChartContainer config={config}>
  <BarChart accessibilityLayer data={data}>
    <Bar dataKey="sales" fill="var(--color-sales)" />
  </BarChart>
</ChartContainer>`}
        />
      </DocSection>

      <DocSection title="Chart config">
        <DocProse>
          <code>ChartConfig</code> maps each data key to a <code>label</code>,
          an optional <code>icon</code> component, and either a single{" "}
          <code>color</code> or a per-theme <code>theme</code> record.{" "}
          <code>ChartStyle</code> (rendered automatically by the container)
          emits the values as <code>--color-*</code> variables, switching the
          theme record under the <code>.dark</code> selector.
        </DocProse>
        <CodeBlock
          code={`
const config = {
  desktop: {
    label: "Desktop",
    theme: { light: "#2563eb", dark: "#60a5fa" },
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig`}
        />
      </DocSection>

      <DocSection title="Tooltip">
        <DocProse>
          <code>ChartTooltip</code> is the recharts <code>Tooltip</code> with
          position animation disabled; pass <code>ChartTooltipContent</code> as
          its <code>content</code> to get config-driven labels, indicator dots
          and formatted numeric values. The indicator can be a dot, a line or
          dashed, and the label row can be hidden or reformatted.
        </DocProse>
        <CodeBlock
          code={`
<ChartTooltip
  cursor={false}
  content={
    <ChartTooltipContent
      indicator="line"
      labelFormatter={(value) => "Month: " + value}
    />
  }
/>`}
        />
      </DocSection>

      <DocSection title="Legend">
        <DocProse>
          <code>ChartLegend</code> re-exports the recharts <code>Legend</code>;
          give it <code>ChartLegendContent</code> to render color chips (or the
          config's icons) with labels from the chart config.
        </DocProse>
        <CodeBlock
          code={`
<ChartLegend content={<ChartLegendContent />} />`}
        />
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>ChartContainer</code> provides the config through context –{" "}
          <code>ChartTooltipContent</code> and <code>ChartLegendContent</code>{" "}
          must render inside it. The exported <code>ChartConfig</code> type
          keeps configs type-safe with <code>satisfies</code>.
        </DocProse>
        <PropsTable
          title="ChartContainer"
          rows={[
            {
              prop: "config",
              type: "ChartConfig",
              description:
                "Required. Maps series keys to label, icon and color / theme. Shared with tooltip and legend content via context.",
            },
            {
              prop: "children",
              type: "ReactElement",
              description:
                "A single recharts chart, rendered inside a ResponsiveContainer.",
            },
            {
              prop: "initialDimension",
              type: "{ width: number; height: number }",
              defaultValue: "{ width: 320, height: 200 }",
              description:
                "Initial size for the ResponsiveContainer before measurement (avoids SSR layout jumps).",
            },
          ]}
        />
        <PropsTable
          title="ChartTooltipContent"
          rows={[
            {
              prop: "indicator",
              type: '"dot" | "line" | "dashed"',
              defaultValue: '"dot"',
              description: "Shape of the per-series color indicator.",
            },
            {
              prop: "hideLabel",
              type: "boolean",
              defaultValue: "false",
              description: "Hide the tooltip's heading row.",
            },
            {
              prop: "hideIndicator",
              type: "boolean",
              defaultValue: "false",
              description: "Hide the color indicator next to each series.",
            },
            {
              prop: "labelFormatter",
              type: "(value, payload) => ReactNode",
              description: "Custom renderer for the heading row.",
            },
            {
              prop: "formatter",
              type: "(value, name, item, index, payload) => ReactNode",
              description:
                "Fully custom renderer for each series row, replacing the default indicator + label + value.",
            },
            {
              prop: "nameKey",
              type: "string",
              description:
                "Payload key used to look up each series in the chart config (defaults to the series name / dataKey).",
            },
            {
              prop: "labelKey",
              type: "string",
              description:
                "Payload key used to look up the heading label in the chart config.",
            },
          ]}
        />
        <PropsTable
          title="ChartLegendContent"
          rows={[
            {
              prop: "hideIcon",
              type: "boolean",
              defaultValue: "false",
              description:
                "Show the plain color chip even when the config defines an icon.",
            },
            {
              prop: "verticalAlign",
              type: '"top" | "bottom"',
              defaultValue: '"bottom"',
              description:
                "Where the legend sits – controls whether spacing is added above or below.",
            },
            {
              prop: "nameKey",
              type: "string",
              description:
                "Payload key used to look up legend items in the chart config.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "ChartContainer",
              description:
                'Root wrapper (data-slot="chart", plus a unique data-chart id). Applies all recharts overrides and renders ChartStyle + ResponsiveContainer.',
            },
            {
              part: "ChartTooltip",
              description:
                "recharts Tooltip with isAnimationActive defaulted to false so the tooltip doesn't replay from the origin on hover-driven re-renders.",
            },
            {
              part: "ChartTooltipContent",
              description:
                "Themed tooltip panel – reads labels, icons and colors from the chart config.",
            },
            {
              part: "ChartLegend",
              description: "Alias of the recharts Legend component.",
            },
            {
              part: "ChartLegendContent",
              description:
                "Themed legend row of color chips / icons with config labels.",
            },
            {
              part: "ChartStyle",
              description:
                "Emits the config's colors as scoped --color-* CSS variables per theme; rendered automatically by ChartContainer.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Pass recharts' <code>accessibilityLayer</code> prop to your chart for
          keyboard navigation and screen-reader access to the data. The
          container scopes its color variables with a <code>data-chart</code> id
          and tags itself <code>data-slot="chart"</code>; series colors resolve
          per theme, so charts restyle automatically in dark mode. Reference any
          config key anywhere inside the chart as <code>var(--color-key)</code>{" "}
          – fills, strokes, even per-cell colors.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
