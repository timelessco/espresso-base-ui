"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const browserData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const browserConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

// Monthly sales from Jan 2021 through Jan 2023.
const salesData = [
  { date: "2021-01", sales: 6500 },
  { date: "2021-02", sales: 18000 },
  { date: "2021-03", sales: 7300 },
  { date: "2021-04", sales: 10000 },
  { date: "2021-05", sales: 23000 },
  { date: "2021-06", sales: 6800 },
  { date: "2021-07", sales: 15500 },
  { date: "2021-08", sales: 8900 },
  { date: "2021-09", sales: 19000 },
  { date: "2021-10", sales: 3000 },
  { date: "2021-11", sales: 5302 },
  { date: "2021-12", sales: 12000 },
  { date: "2022-01", sales: 5500 },
  { date: "2022-02", sales: 17000 },
  { date: "2022-03", sales: 4100 },
  { date: "2022-04", sales: 2000 },
  { date: "2022-05", sales: 4000 },
  { date: "2022-06", sales: 6100 },
  { date: "2022-07", sales: 1800 },
  { date: "2022-08", sales: 9700 },
  { date: "2022-09", sales: 8000 },
  { date: "2022-10", sales: 3000 },
  { date: "2022-11", sales: 6500 },
  { date: "2022-12", sales: 7800 },
  { date: "2023-01", sales: 3000 },
]

const salesConfig = {
  sales: { label: "Sales", color: "var(--chart-2)" },
} satisfies ChartConfig

const salesTicks = [0, 3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000]

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

// Only label year boundaries (January) and mid-year (July) on the X axis.
function formatSalesAxis(value: string) {
  const [year, month] = value.split("-")
  if (month === "01") return year
  if (month === "07") return "Jul"
  return ""
}

function formatSalesDate(value: unknown) {
  if (typeof value !== "string") return value as string
  const [year, month] = value.split("-")
  return `${MONTHS[Number(month) - 1]} ${year}`
}

export default function ChartPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default Bar Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Default Bar Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Default Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={salesConfig}
              className="aspect-auto h-[360px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={salesData}
                barCategoryGap={10}
                margin={{ top: 12, left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  interval={0}
                  tickFormatter={formatSalesAxis}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={44}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent labelFormatter={formatSalesDate} />
                  }
                />
                <Bar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  barSize={14}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bar */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Bar</SectionTitle>
        <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Line */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Line</SectionTitle>
        <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={32}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Area (stacked) */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Area (stacked)</SectionTitle>
        <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="mobile"
              type="natural"
              stackId="a"
              stroke="var(--color-mobile)"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
            />
            <Area
              dataKey="desktop"
              type="natural"
              stackId="a"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      {/* Donut */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Donut</SectionTitle>
        <ChartContainer
          config={browserConfig}
          className="mx-auto aspect-square min-h-[240px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="browser" hideLabel />}
            />
            <Pie
              data={browserData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              {browserData.map((entry) => (
                <Cell key={entry.browser} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  )
}
