import { Diamond } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

const sizes = ["default", "md", "lg"] as const

const sizeLabels: Record<string, string> = {
  default: "default",
  md: "medium",
  lg: "large",
}

const colorBadges = [
  { label: "Blue", bg: "bg-blue-600", text: "text-blue-100" },
  { label: "Green", bg: "bg-green-600", text: "text-green-100" },
  { label: "Amber", bg: "bg-amber-600", text: "text-amber-100" },
  { label: "Violet", bg: "bg-violet-600", text: "text-violet-100" },
] as const

export default function BadgePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* All Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          {sizes.map((size) => (
            <Badge key={size} size={size}>
              {sizeLabels[size]}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sizes x Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes x Variants</SectionTitle>
        <div className="flex flex-col gap-6">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">{size}</span>
              <div className="flex flex-wrap items-center gap-4">
                {variants.map((variant) => (
                  <Badge key={variant} variant={variant} size={size}>
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* With Icon Start */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon Start</SectionTitle>
        <div className="flex flex-col gap-6">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">{size}</span>
              <div className="flex flex-wrap items-center gap-4">
                {variants.map((variant) => (
                  <Badge key={variant} variant={variant} size={size}>
                    <Diamond data-icon="inline-start" />
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* With Icon End */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon End</SectionTitle>
        <div className="flex flex-col gap-6">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">{size}</span>
              <div className="flex flex-wrap items-center gap-4">
                {variants.map((variant) => (
                  <Badge key={variant} variant={variant} size={size}>
                    {variant}
                    <Diamond data-icon="inline-end" />
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* As Link */}
      <div className="flex flex-col gap-4">
        <SectionTitle>As Link</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant} render={<a href="#" />}>
              {variant}
            </Badge>
          ))}
        </div>
      </div>

      {/* Color Badges */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Color Badges</SectionTitle>
        <div className="flex gap-12">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-3">
              <span className="text-xs text-muted-foreground">{size}</span>
              {colorBadges.map((color) => (
                <div
                  key={color.label}
                  className="flex flex-wrap items-center gap-2"
                >
                  <Badge size={size} className={`${color.bg} ${color.text}`}>
                    <Diamond data-icon="inline-start" />
                    {color.label}
                    <Diamond data-icon="inline-end" />
                  </Badge>
                  <Badge size={size} className={`${color.bg} ${color.text}`}>
                    <Diamond data-icon="inline-start" />
                    {color.label}
                  </Badge>
                  <Badge size={size} className={`${color.bg} ${color.text}`}>
                    {color.label}
                    <Diamond data-icon="inline-end" />
                  </Badge>
                  <Badge size={size} className={`${color.bg} ${color.text}`}>
                    {color.label}
                  </Badge>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* All Variants Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All Variants</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Type
                </th>
                {variants.map((variant) => (
                  <th
                    key={variant}
                    className="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
                  >
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={`${size}`} className="border-t border-border">
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {size}
                  </td>
                  {variants.map((variant) => (
                    <td key={variant} className="px-4 py-3">
                      <Badge variant={variant} size={size}>
                        Badge
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
              {sizes.map((size) => (
                <tr
                  key={`icon-start-${size}`}
                  className="border-t border-border"
                >
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {size} + Icon Start
                  </td>
                  {variants.map((variant) => (
                    <td key={variant} className="px-4 py-3">
                      <Badge variant={variant} size={size}>
                        <Diamond data-icon="inline-start" />
                        Badge
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
              {sizes.map((size) => (
                <tr key={`icon-end-${size}`} className="border-t border-border">
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {size} + Icon End
                  </td>
                  {variants.map((variant) => (
                    <td key={variant} className="px-4 py-3">
                      <Badge variant={variant} size={size}>
                        Badge
                        <Diamond data-icon="inline-end" />
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
