import { X, Circle, ArrowRight } from "lucide-react"
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

export default function BadgePage() {
  return (
    <div className="flex flex-col gap-12 p-10">
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

      {/* With Icon Start */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon Start</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              <Circle data-icon="inline-start" />
              {variant}
            </Badge>
          ))}
        </div>
      </div>

      {/* With Icon End */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon End</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
              <ArrowRight data-icon="inline-end" />
            </Badge>
          ))}
        </div>
      </div>

      {/* With Close Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Close Icon</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
              <X data-icon="inline-end" />
            </Badge>
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
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Default
                </td>
                {variants.map((variant) => (
                  <td key={variant} className="px-4 py-3">
                    <Badge variant={variant}>Badge</Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Icon Start
                </td>
                {variants.map((variant) => (
                  <td key={variant} className="px-4 py-3">
                    <Badge variant={variant}>
                      <Circle data-icon="inline-start" />
                      Badge
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Icon End
                </td>
                {variants.map((variant) => (
                  <td key={variant} className="px-4 py-3">
                    <Badge variant={variant}>
                      Badge
                      <ArrowRight data-icon="inline-end" />
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Close
                </td>
                {variants.map((variant) => (
                  <td key={variant} className="px-4 py-3">
                    <Badge variant={variant}>
                      Badge
                      <X data-icon="inline-end" />
                    </Badge>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
