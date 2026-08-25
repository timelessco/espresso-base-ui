"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const donutData = [
  { name: "d1", value: 11, fill: "var(--color-d1)" },
  { name: "d2", value: 17.2, fill: "var(--color-d2)" },
  { name: "d3", value: 8, fill: "var(--color-d3)" },
  { name: "d4", value: 14, fill: "var(--color-d4)" },
  { name: "d5", value: 14, fill: "var(--color-d5)" },
]

const donutConfig = {
  value: { label: "Value" },
  d1: { label: "Data (11%)", color: "var(--chart-8)" },
  d2: { label: "Data (17.2%)", color: "var(--chart-7)" },
  d3: { label: "Data (8%)", color: "var(--chart-6)" },
  d4: { label: "Data (14%)", color: "var(--chart-5)" },
  d5: { label: "Data (14%)", color: "var(--chart-4)" },
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
  sales: { label: "Sales", color: "var(--chart-7)" },
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

// Income per capita (illustrative), sorted high → low.
const incomeData = [
  { country: "India", income: 66000 },
  { country: "South Africa", income: 58000 },
  { country: "Japan", income: 54000 },
  { country: "Germany", income: 47000 },
  { country: "Canada", income: 44000 },
  { country: "Brazil", income: 39000 },
  { country: "Australia", income: 32000 },
  { country: "France", income: 24000 },
  { country: "Italy", income: 14000 },
  { country: "Spain", income: 11000 },
  { country: "United States", income: 7000 },
]

const incomeConfig = {
  income: { label: "Income per Capita", color: "var(--chart-7)" },
} satisfies ChartConfig

const incomeTicks = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000]

// Four series per (bi-monthly) category for a grouped bar chart.
const groupData = [
  { month: "2021-01", a: 18000, b: 14700, c: 6400, d: 1800 },
  { month: "2021-03", a: 9700, b: 7600, c: 5000, d: 2000 },
  { month: "2021-05", a: 15700, b: 12100, c: 6400, d: 4200 },
  { month: "2021-07", a: 12700, b: 7700, c: 10800, d: 6000 },
  { month: "2021-09", a: 13700, b: 8300, c: 9800, d: 8300 },
  { month: "2021-11", a: 11200, b: 4200, c: 6400, d: 4200 },
]

const groupConfig = {
  a: { label: "Series 1", color: "var(--chart-9)" },
  b: { label: "Series 2", color: "var(--chart-8)" },
  c: { label: "Series 3", color: "var(--chart-7)" },
  d: { label: "Series 4", color: "var(--chart-5)" },
} satisfies ChartConfig

// Label the year at January, month name otherwise.
function formatGroupAxis(value: string) {
  const [year, month] = value.split("-")
  return month === "01" ? year : MONTHS[Number(month) - 1]
}

// Five channel series per country for a horizontal grouped bar chart.
const channelData = [
  {
    country: "India",
    organic: 67000,
    paid: 48000,
    facebook: 32000,
    referral: 28000,
    others: 7000,
  },
  {
    country: "South Africa",
    organic: 49000,
    paid: 45000,
    facebook: 37000,
    referral: 18000,
    others: 3000,
  },
  {
    country: "Japan",
    organic: 37000,
    paid: 30000,
    facebook: 9000,
    referral: 4000,
    others: 2000,
  },
  {
    country: "Germany",
    organic: 25000,
    paid: 21000,
    facebook: 19000,
    referral: 12000,
    others: 4000,
  },
]

const channelConfig = {
  organic: { label: "Google organic", color: "var(--chart-9)" },
  paid: { label: "Google paid", color: "var(--chart-8)" },
  facebook: { label: "Facebook ads", color: "var(--chart-7)" },
  referral: { label: "Referral", color: "var(--chart-5)" },
  others: { label: "Others", color: "var(--chart-3)" },
} satisfies ChartConfig

// Monthly sales & orders (Jan 2021 → Jan 2023) for the line charts.
const lineData = [
  { date: "2021-01", sales: 12000, orders: 4200 },
  { date: "2021-02", sales: 14500, orders: 4500 },
  { date: "2021-03", sales: 13000, orders: 1700 },
  { date: "2021-04", sales: 15500, orders: 5000 },
  { date: "2021-05", sales: 14500, orders: 800 },
  { date: "2021-06", sales: 12000, orders: 4900 },
  { date: "2021-07", sales: 13500, orders: 3400 },
  { date: "2021-08", sales: 14500, orders: 4700 },
  { date: "2021-09", sales: 13000, orders: 1600 },
  { date: "2021-10", sales: 9800, orders: 2800 },
  { date: "2021-11", sales: 8700, orders: 1000 },
  { date: "2021-12", sales: 10200, orders: 1000 },
  { date: "2022-01", sales: 9000, orders: 2100 },
  { date: "2022-02", sales: 8700, orders: 2800 },
  { date: "2022-03", sales: 11000, orders: 800 },
  { date: "2022-04", sales: 12500, orders: 5000 },
  { date: "2022-05", sales: 10000, orders: 2400 },
  { date: "2022-06", sales: 9300, orders: 1000 },
  { date: "2022-07", sales: 11500, orders: 3400 },
  { date: "2022-08", sales: 14000, orders: 2800 },
  { date: "2022-09", sales: 11000, orders: 5000 },
  { date: "2022-10", sales: 13000, orders: 6300 },
  { date: "2022-11", sales: 14000, orders: 6500 },
  { date: "2022-12", sales: 12500, orders: 5000 },
  { date: "2023-01", sales: 11200, orders: 3700 },
]

const lineConfig = {
  sales: { label: "Sales", color: "var(--chart-9)" },
} satisfies ChartConfig

const multiConfig = {
  sales: { label: "Sales", color: "var(--chart-9)" },
  orders: { label: "Orders", color: "var(--chart-8)" },
} satisfies ChartConfig

// Price (x) vs Total sales (y), with No. of units driving bubble size (z).
const bubbleData = [
  { price: 2, sales: 17500, units: 500 },
  { price: 9, sales: 9000, units: 900 },
  { price: 18, sales: 12000, units: 1500 },
  { price: 33.4, sales: 21500, units: 1553 },
  { price: 36, sales: 6000, units: 700 },
  { price: 46, sales: 10200, units: 350 },
  { price: 62, sales: 6900, units: 800 },
  { price: 70, sales: 13000, units: 650 },
  { price: 76, sales: 4500, units: 850 },
  { price: 94, sales: 9700, units: 550 },
  { price: 102, sales: 3000, units: 700 },
  { price: 116, sales: 7000, units: 1600 },
  { price: 121, sales: 6000, units: 750 },
  { price: 132, sales: 19000, units: 450 },
  { price: 149, sales: 1700, units: 700 },
]

const bubbleConfig = {
  price: { label: "Price", color: "var(--chart-8)" },
  units: { label: "No. of units" },
  sales: { label: "Total sales" },
} satisfies ChartConfig

const areaConfig = {
  sales: { label: "Sales", color: "var(--chart-8)" },
} satisfies ChartConfig

// Four stacked series (bottom → top) for the stacked area chart.
const stackedData = [
  { date: "2021-01", a: 6000, b: 4000, c: 3500, d: 2000 },
  { date: "2021-02", a: 6300, b: 3800, c: 3200, d: 2500 },
  { date: "2021-03", a: 9000, b: 3000, c: 3000, d: 2000 },
  { date: "2021-04", a: 7300, b: 3500, c: 3200, d: 2500 },
  { date: "2021-05", a: 9200, b: 4000, c: 3000, d: 2200 },
  { date: "2021-06", a: 8200, b: 3200, c: 3500, d: 2600 },
  { date: "2021-07", a: 6000, b: 3800, c: 3200, d: 2400 },
  { date: "2021-08", a: 7600, b: 3500, c: 3000, d: 2800 },
  { date: "2021-09", a: 8800, b: 3200, c: 3400, d: 2200 },
  { date: "2021-10", a: 5000, b: 3500, c: 3000, d: 2500 },
  { date: "2021-11", a: 3000, b: 3000, c: 3200, d: 2400 },
  { date: "2021-12", a: 5500, b: 3200, c: 3000, d: 2000 },
  { date: "2022-01", a: 3000, b: 3500, c: 3200, d: 2600 },
  { date: "2022-02", a: 2700, b: 3000, c: 3400, d: 2200 },
  { date: "2022-03", a: 5000, b: 3800, c: 3000, d: 2400 },
  { date: "2022-04", a: 7500, b: 3200, c: 3200, d: 2800 },
  { date: "2022-05", a: 6000, b: 3500, c: 3000, d: 2000 },
  { date: "2022-06", a: 4000, b: 3000, c: 3400, d: 2600 },
  { date: "2022-07", a: 6500, b: 3800, c: 3000, d: 2200 },
  { date: "2022-08", a: 8000, b: 3200, c: 3200, d: 2400 },
  { date: "2022-09", a: 5000, b: 3500, c: 3400, d: 2800 },
  { date: "2022-10", a: 6800, b: 3000, c: 3000, d: 2000 },
  { date: "2022-11", a: 8000, b: 3800, c: 3200, d: 2600 },
  { date: "2022-12", a: 5000, b: 3200, c: 3400, d: 2200 },
  { date: "2023-01", a: 5300, b: 3000, c: 3000, d: 2400 },
]

const stackedConfig = {
  a: { label: "Direct", color: "var(--chart-9)" },
  b: { label: "Referral", color: "var(--chart-8)" },
  c: { label: "Organic", color: "var(--chart-7)" },
  d: { label: "Social", color: "var(--chart-5)" },
} satisfies ChartConfig

// Four stacked segments per month for the stacked bar chart.
const stackedBarData = [
  { date: "2021-01", a: 1100, b: 3400, c: 2200, d: 1500 },
  { date: "2021-02", a: 3900, b: 4000, c: 2500, d: 2500 },
  { date: "2021-03", a: 2200, b: 2800, c: 2300, d: 1800 },
  { date: "2021-04", a: 2500, b: 2000, c: 2300, d: 1800 },
  { date: "2021-05", a: 2300, b: 2200, c: 2200, d: 2300 },
  { date: "2021-06", a: 1900, b: 2300, c: 2300, d: 2300 },
  { date: "2021-07", a: 2300, b: 1300, c: 2300, d: 2300 },
  { date: "2021-08", a: 2300, b: 2300, c: 2300, d: 1600 },
  { date: "2021-09", a: 3300, b: 3300, c: 3200, d: 3300 },
  { date: "2021-10", a: 1900, b: 2200, c: 2300, d: 1300 },
  { date: "2021-11", a: 2300, b: 1900, c: 800, d: 1100 },
  { date: "2021-12", a: 1300, b: 2000, c: 2300, d: 1800 },
]

const stackedBarConfig = {
  a: { label: "Segment 1", color: "var(--chart-9)" },
  b: { label: "Segment 2", color: "var(--chart-8)" },
  c: { label: "Segment 3", color: "var(--chart-7)" },
  d: { label: "Segment 4", color: "var(--chart-5)" },
} satisfies ChartConfig

// Show the year at January and month names for other odd months.
function formatStackAxis(value: string) {
  const month = Number(value.split("-")[1])
  if (month === 1) return value.split("-")[0]
  return month % 2 === 1 ? MONTHS[month - 1] : ""
}

function formatStackLabel(value: React.ReactNode) {
  return `$${(Number(value) / 1000).toFixed(1)}k`
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
                margin={{ top: 12, left: 0, right: 12 }}
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
                  width={40}
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

      {/* Horizontal Bar Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Horizontal</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Horizontal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={incomeConfig}
              className="aspect-auto h-[283px] w-full"
            >
              <BarChart
                accessibilityLayer
                layout="vertical"
                data={incomeData}
                margin={{ top: 8, right: 16, bottom: 24, left: 0 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="4 4" />
                <XAxis
                  type="number"
                  dataKey="income"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 70000]}
                  ticks={incomeTicks}
                  tickFormatter={(value) => `$${value / 1000}k`}
                >
                  <Label
                    value="Income per Capita (USD)"
                    position="insideBottom"
                    offset={-16}
                  />
                </XAxis>
                <YAxis
                  type="category"
                  dataKey="country"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={132}
                  interval={0}
                >
                  <Label
                    value="Top countries"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="income"
                  fill="var(--color-income)"
                  barSize={12}
                  radius={[0, 2, 2, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grouped Bar Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Group stack</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Group stack</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={groupConfig}
              className="aspect-auto h-[360px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={groupData}
                barGap={2}
                barCategoryGap={40}
                margin={{ top: 12, left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  tickFormatter={formatGroupAxis}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
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
                <Bar dataKey="a" fill="var(--color-a)" barSize={10} radius={[2, 2, 0, 0]} />
                <Bar dataKey="b" fill="var(--color-b)" barSize={10} radius={[2, 2, 0, 0]} />
                <Bar dataKey="c" fill="var(--color-c)" barSize={10} radius={[2, 2, 0, 0]} />
                <Bar dataKey="d" fill="var(--color-d)" barSize={10} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Horizontal Grouped Bar Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Horizontal group</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Horizontal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-center text-sm text-muted-foreground">
              Channel Revenue per Country (USD $k)
            </p>
            <ChartContainer
              config={channelConfig}
              className="aspect-auto h-[302px] w-full"
            >
              <BarChart
                accessibilityLayer
                layout="vertical"
                data={channelData}
                barGap={2}
                margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="4 4" />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 70000]}
                  ticks={incomeTicks}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="country"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={110}
                  interval={0}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="organic"
                  fill="var(--color-organic)"
                  barSize={6}
                />
                <Bar
                  dataKey="paid"
                  fill="var(--color-paid)"
                  barSize={6}
                />
                <Bar
                  dataKey="facebook"
                  fill="var(--color-facebook)"
                  barSize={6}
                />
                <Bar
                  dataKey="referral"
                  fill="var(--color-referral)"
                  barSize={6}
                />
                <Bar
                  dataKey="others"
                  fill="var(--color-others)"
                  barSize={6}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Line chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Line chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={lineConfig}
              className="aspect-auto h-[360px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={lineData}
                margin={{ top: 12, left: 0, right: 12 }}
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
                  width={40}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ChartTooltip
                  content={<ChartTooltipContent labelFormatter={formatSalesDate} />}
                />
                <Line
                  dataKey="sales"
                  type="linear"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Multi Line Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Multi Line Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Multi Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={multiConfig}
              className="aspect-auto h-[360px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={lineData}
                margin={{ top: 12, left: 0, right: 12 }}
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
                  width={40}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ChartTooltip
                  content={<ChartTooltipContent labelFormatter={formatSalesDate} />}
                />
                <Line
                  dataKey="sales"
                  type="linear"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="orders"
                  type="linear"
                  stroke="var(--color-orders)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bubble Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Bubble Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Bubble Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={bubbleConfig}
              className="aspect-auto h-[400px] w-full"
            >
              <ScatterChart margin={{ top: 12, left: 0, right: 12, bottom: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  type="number"
                  dataKey="price"
                  name="Price"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 150]}
                  ticks={[0, 30, 60, 90, 120, 150]}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <YAxis
                  type="number"
                  dataKey="sales"
                  name="Total sales"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ZAxis
                  type="number"
                  dataKey="units"
                  name="No. of units"
                  range={[80, 1600]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel hideIndicator />}
                />
                <Scatter
                  data={bubbleData}
                  fill="var(--color-price)"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Area Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Overall Sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={areaConfig}
              className="aspect-auto h-[360px] w-full"
            >
              <AreaChart
                accessibilityLayer
                data={lineData}
                margin={{ top: 12, left: 0, right: 12 }}
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
                  width={40}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ChartTooltip
                  content={<ChartTooltipContent labelFormatter={formatSalesDate} />}
                />
                <Area
                  dataKey="sales"
                  type="linear"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  fill="var(--color-sales)"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stacked Area Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Area Chart (stacked)</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Overall Sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={stackedConfig}
              className="aspect-auto h-[360px] w-full"
            >
              <AreaChart
                accessibilityLayer
                data={stackedData}
                margin={{ top: 12, left: 0, right: 12 }}
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
                  width={40}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ChartTooltip
                  content={<ChartTooltipContent labelFormatter={formatSalesDate} />}
                />
                <Area
                  dataKey="a"
                  type="linear"
                  stackId="1"
                  stroke="var(--color-a)"
                  fill="var(--color-a)"
                  fillOpacity={0.7}
                />
                <Area
                  dataKey="b"
                  type="linear"
                  stackId="1"
                  stroke="var(--color-b)"
                  fill="var(--color-b)"
                  fillOpacity={0.6}
                />
                <Area
                  dataKey="c"
                  type="linear"
                  stackId="1"
                  stroke="var(--color-c)"
                  fill="var(--color-c)"
                  fillOpacity={0.5}
                />
                <Area
                  dataKey="d"
                  type="linear"
                  stackId="1"
                  stroke="var(--color-d)"
                  fill="var(--color-d)"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stacked Bar Chart (in a card) */}
      <div className="flex max-w-[612px] flex-col gap-4">
        <SectionTitle>Stacked Bar Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Stacked Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={stackedBarConfig}
              className="aspect-auto h-[400px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={stackedBarData}
                barSize={28}
                margin={{ top: 12, left: 0, right: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  interval={0}
                  tickFormatter={formatStackAxis}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                  domain={[0, 24000]}
                  ticks={salesTicks}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent labelFormatter={formatSalesDate} />}
                />
                <Bar dataKey="a" stackId="s" fill="var(--color-a)">
                  <LabelList
                    dataKey="a"
                    position="center"
                    fill="#fff"
                    fontSize={10}
                    formatter={formatStackLabel}
                  />
                </Bar>
                <Bar dataKey="b" stackId="s" fill="var(--color-b)">
                  <LabelList
                    dataKey="b"
                    position="center"
                    fill="#fff"
                    fontSize={10}
                    formatter={formatStackLabel}
                  />
                </Bar>
                <Bar dataKey="c" stackId="s" fill="var(--color-c)">
                  <LabelList
                    dataKey="c"
                    position="center"
                    fill="#fff"
                    fontSize={10}
                    formatter={formatStackLabel}
                  />
                </Bar>
                <Bar dataKey="d" stackId="s" fill="var(--color-d)">
                  <LabelList
                    dataKey="d"
                    position="center"
                    fill="#171717"
                    fontSize={10}
                    formatter={formatStackLabel}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Doughnut Chart (in a card) */}
      <div className="flex max-w-3xl flex-col gap-4">
        <SectionTitle>Doughnut Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Doughnut Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={donutConfig}
              className="mx-auto aspect-square max-h-[360px]"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" hideLabel />}
                />
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={3}
                  cornerRadius={6}
                  strokeWidth={0}
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="flex-wrap gap-x-4 gap-y-2"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
