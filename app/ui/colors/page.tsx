const semanticColors = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "card-foreground", className: "bg-card-foreground" },
  { name: "popover", className: "bg-popover" },
  { name: "popover-foreground", className: "bg-popover-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "primary-foreground", className: "bg-primary-foreground" },
  { name: "secondary", className: "bg-secondary" },
  { name: "secondary-foreground", className: "bg-secondary-foreground" },
  { name: "muted", className: "bg-muted" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "accent", className: "bg-accent" },
  { name: "accent-foreground", className: "bg-accent-foreground" },
  { name: "destructive", className: "bg-destructive" },
  { name: "destructive-foreground", className: "bg-destructive-foreground" },
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "ring", className: "bg-ring" },
]

const chartColors = [
  { name: "chart-1", className: "bg-chart-1" },
  { name: "chart-2", className: "bg-chart-2" },
  { name: "chart-3", className: "bg-chart-3" },
  { name: "chart-4", className: "bg-chart-4" },
  { name: "chart-5", className: "bg-chart-5" },
]

const sidebarColors = [
  { name: "sidebar", className: "bg-sidebar" },
  { name: "sidebar-foreground", className: "bg-sidebar-foreground" },
  { name: "sidebar-primary", className: "bg-sidebar-primary" },
  {
    name: "sidebar-primary-foreground",
    className: "bg-sidebar-primary-foreground",
  },
  { name: "sidebar-accent", className: "bg-sidebar-accent" },
  {
    name: "sidebar-accent-foreground",
    className: "bg-sidebar-accent-foreground",
  },
  { name: "sidebar-border", className: "bg-sidebar-border" },
  { name: "sidebar-ring", className: "bg-sidebar-ring" },
]

const colorPalettes: { name: string; shades: number[] }[] = [
  {
    name: "red",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "orange",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "amber",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "yellow",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  { name: "lime", shades: [50, 400, 500, 600, 900] },
  {
    name: "green",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  { name: "emerald", shades: [100, 400, 500, 600, 900] },
  {
    name: "teal",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "cyan",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  { name: "sky", shades: [50, 300, 500, 600, 700, 950] },
  {
    name: "blue",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "violet",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "purple",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "pink",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  { name: "rose", shades: [50, 300, 400, 500, 600, 700, 800, 900] },
  { name: "slate", shades: [50, 100, 200, 400, 500, 800, 900, 950] },
  {
    name: "gray",
    shades: [50, 100, 200, 300, 400, 450, 500, 600, 700, 800, 900, 950],
  },
  { name: "zinc", shades: [50, 100, 200, 400, 500, 800, 900, 950] },
  {
    name: "neutral",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "stone",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
]

const grayAlphaShades = [
  50, 100, 200, 300, 400, 450, 500, 550, 600, 700, 800, 900, 950, 1000,
]

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`size-12 rounded-lg border border-border ${className}`} />
      <p className="text-[10px] text-muted-foreground">{name}</p>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function ColorsPage() {
  return (
    <div className="flex flex-col gap-10 p-10">
      {/* Semantic colors */}
      <div className="flex flex-col gap-3">
        <SectionTitle>Semantic</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {semanticColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} className={c.className} />
          ))}
        </div>
      </div>

      {/* Chart colors */}
      <div className="flex flex-col gap-3">
        <SectionTitle>Chart</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {chartColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} className={c.className} />
          ))}
        </div>
      </div>

      {/* Sidebar colors */}
      <div className="flex flex-col gap-3">
        <SectionTitle>Sidebar</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {sidebarColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} className={c.className} />
          ))}
        </div>
      </div>

      {/* Color palettes */}
      {colorPalettes.map((palette) => (
        <div key={palette.name} className="flex flex-col gap-3">
          <SectionTitle>
            {palette.name.charAt(0).toUpperCase() + palette.name.slice(1)}
          </SectionTitle>
          <div className="flex flex-wrap gap-1">
            {palette.shades.map((shade) => (
              <div key={shade} className="flex flex-col items-center gap-1.5">
                <div
                  className="h-12 w-16 rounded-lg"
                  style={{
                    backgroundColor: `var(--color-${palette.name}-${shade})`,
                  }}
                />
                <p className="text-[10px] text-muted-foreground">{shade}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Gray alpha */}
      <div className="flex flex-col gap-3">
        <SectionTitle>Gray Alpha</SectionTitle>
        <div className="flex flex-wrap gap-1">
          {grayAlphaShades.map((shade) => (
            <div key={shade} className="flex flex-col items-center gap-1.5">
              <div
                className="h-12 w-16 rounded-lg"
                style={{
                  backgroundColor: `var(--color-gray-alpha-${shade})`,
                }}
              />
              <p className="text-[10px] text-muted-foreground">{shade}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic variable examples */}
      <div className="flex flex-col gap-3">
        <SectionTitle>Semantic Variable Examples</SectionTitle>
        <div className="flex flex-wrap gap-4">
          {/* Card */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
              <p className="text-sm font-medium">Card</p>
              <p className="text-xs">bg-card + text-card-foreground</p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --card / --card-foreground
            </p>
          </div>

          {/* Popover */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg border border-border bg-popover p-4 text-popover-foreground">
              <p className="text-sm font-medium">Popover</p>
              <p className="text-xs">bg-popover + text-popover-foreground</p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --popover / --popover-foreground
            </p>
          </div>

          {/* Primary */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg bg-primary p-4 text-primary-foreground">
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs">bg-primary + text-primary-foreground</p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --primary / --primary-foreground
            </p>
          </div>

          {/* Secondary */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg bg-secondary p-4 text-secondary-foreground">
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs">
                bg-secondary + text-secondary-foreground
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --secondary / --secondary-foreground
            </p>
          </div>

          {/* Muted */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg bg-muted p-4 text-muted-foreground">
              <p className="text-sm font-medium">Muted</p>
              <p className="text-xs">bg-muted + text-muted-foreground</p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --muted / --muted-foreground
            </p>
          </div>

          {/* Accent */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg bg-accent p-4 text-accent-foreground">
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs">bg-accent + text-accent-foreground</p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --accent / --accent-foreground
            </p>
          </div>

          {/* Destructive */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg bg-destructive p-4 text-destructive-foreground">
              <p className="text-sm font-medium">Destructive</p>
              <p className="text-xs">
                bg-destructive + text-destructive-foreground
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --destructive / --destructive-foreground
            </p>
          </div>

          {/* Background */}
          <div className="flex flex-col gap-1.5">
            <div className="rounded-lg border border-border bg-background p-4 text-foreground">
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs">bg-background + text-foreground</p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              --background / --foreground
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
