import { Diamond } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function BadgePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="default">default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="ghost">ghost</Badge>
          <Badge variant="link">link</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="default">default</Badge>
          <Badge size="md">medium</Badge>
          <Badge size="lg">large</Badge>
        </div>
      </div>

      {/* Sizes x Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes x Variants</SectionTitle>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">default</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="default">default</Badge>
              <Badge variant="secondary" size="default">secondary</Badge>
              <Badge variant="destructive" size="default">destructive</Badge>
              <Badge variant="outline" size="default">outline</Badge>
              <Badge variant="ghost" size="default">ghost</Badge>
              <Badge variant="link" size="default">link</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">md</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="md">default</Badge>
              <Badge variant="secondary" size="md">secondary</Badge>
              <Badge variant="destructive" size="md">destructive</Badge>
              <Badge variant="outline" size="md">outline</Badge>
              <Badge variant="ghost" size="md">ghost</Badge>
              <Badge variant="link" size="md">link</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">lg</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="lg">default</Badge>
              <Badge variant="secondary" size="lg">secondary</Badge>
              <Badge variant="destructive" size="lg">destructive</Badge>
              <Badge variant="outline" size="lg">outline</Badge>
              <Badge variant="ghost" size="lg">ghost</Badge>
              <Badge variant="link" size="lg">link</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* With Icon Start */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon Start</SectionTitle>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">default</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="default"><Diamond data-icon="inline-start" />default</Badge>
              <Badge variant="secondary" size="default"><Diamond data-icon="inline-start" />secondary</Badge>
              <Badge variant="destructive" size="default"><Diamond data-icon="inline-start" />destructive</Badge>
              <Badge variant="outline" size="default"><Diamond data-icon="inline-start" />outline</Badge>
              <Badge variant="ghost" size="default"><Diamond data-icon="inline-start" />ghost</Badge>
              <Badge variant="link" size="default"><Diamond data-icon="inline-start" />link</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">md</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="md"><Diamond data-icon="inline-start" />default</Badge>
              <Badge variant="secondary" size="md"><Diamond data-icon="inline-start" />secondary</Badge>
              <Badge variant="destructive" size="md"><Diamond data-icon="inline-start" />destructive</Badge>
              <Badge variant="outline" size="md"><Diamond data-icon="inline-start" />outline</Badge>
              <Badge variant="ghost" size="md"><Diamond data-icon="inline-start" />ghost</Badge>
              <Badge variant="link" size="md"><Diamond data-icon="inline-start" />link</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">lg</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="lg"><Diamond data-icon="inline-start" />default</Badge>
              <Badge variant="secondary" size="lg"><Diamond data-icon="inline-start" />secondary</Badge>
              <Badge variant="destructive" size="lg"><Diamond data-icon="inline-start" />destructive</Badge>
              <Badge variant="outline" size="lg"><Diamond data-icon="inline-start" />outline</Badge>
              <Badge variant="ghost" size="lg"><Diamond data-icon="inline-start" />ghost</Badge>
              <Badge variant="link" size="lg"><Diamond data-icon="inline-start" />link</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* With Icon End */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon End</SectionTitle>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">default</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="default">default<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="secondary" size="default">secondary<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="destructive" size="default">destructive<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="outline" size="default">outline<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="ghost" size="default">ghost<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="link" size="default">link<Diamond data-icon="inline-end" /></Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">md</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="md">default<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="secondary" size="md">secondary<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="destructive" size="md">destructive<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="outline" size="md">outline<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="ghost" size="md">ghost<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="link" size="md">link<Diamond data-icon="inline-end" /></Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">lg</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="lg">default<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="secondary" size="lg">secondary<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="destructive" size="lg">destructive<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="outline" size="lg">outline<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="ghost" size="lg">ghost<Diamond data-icon="inline-end" /></Badge>
              <Badge variant="link" size="lg">link<Diamond data-icon="inline-end" /></Badge>
            </div>
          </div>
        </div>
      </div>

      {/* As Link */}
      <div className="flex flex-col gap-4">
        <SectionTitle>As Link</SectionTitle>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="default" render={<a href="#" />}>default</Badge>
          <Badge variant="secondary" render={<a href="#" />}>secondary</Badge>
          <Badge variant="destructive" render={<a href="#" />}>destructive</Badge>
          <Badge variant="outline" render={<a href="#" />}>outline</Badge>
          <Badge variant="ghost" render={<a href="#" />}>ghost</Badge>
          <Badge variant="link" render={<a href="#" />}>link</Badge>
        </div>
      </div>

      {/* Color Badges */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Color Badges</SectionTitle>
        <div className="flex gap-12">
          {/* default size */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-muted-foreground">default</span>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="default" className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue</Badge>
              <Badge size="default" className="bg-blue-600 text-blue-100">Blue<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-blue-600 text-blue-100">Blue</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="default" className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green</Badge>
              <Badge size="default" className="bg-green-600 text-green-100">Green<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-green-600 text-green-100">Green</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="default" className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber</Badge>
              <Badge size="default" className="bg-amber-600 text-amber-100">Amber<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-amber-600 text-amber-100">Amber</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="default" className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet</Badge>
              <Badge size="default" className="bg-violet-600 text-violet-100">Violet<Diamond data-icon="inline-end" /></Badge>
              <Badge size="default" className="bg-violet-600 text-violet-100">Violet</Badge>
            </div>
          </div>

          {/* md size */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-muted-foreground">md</span>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="md" className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue</Badge>
              <Badge size="md" className="bg-blue-600 text-blue-100">Blue<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-blue-600 text-blue-100">Blue</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="md" className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green</Badge>
              <Badge size="md" className="bg-green-600 text-green-100">Green<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-green-600 text-green-100">Green</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="md" className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber</Badge>
              <Badge size="md" className="bg-amber-600 text-amber-100">Amber<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-amber-600 text-amber-100">Amber</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="md" className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet</Badge>
              <Badge size="md" className="bg-violet-600 text-violet-100">Violet<Diamond data-icon="inline-end" /></Badge>
              <Badge size="md" className="bg-violet-600 text-violet-100">Violet</Badge>
            </div>
          </div>

          {/* lg size */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-muted-foreground">lg</span>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="lg" className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue</Badge>
              <Badge size="lg" className="bg-blue-600 text-blue-100">Blue<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-blue-600 text-blue-100">Blue</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="lg" className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green</Badge>
              <Badge size="lg" className="bg-green-600 text-green-100">Green<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-green-600 text-green-100">Green</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="lg" className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber</Badge>
              <Badge size="lg" className="bg-amber-600 text-amber-100">Amber<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-amber-600 text-amber-100">Amber</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="lg" className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet</Badge>
              <Badge size="lg" className="bg-violet-600 text-violet-100">Violet<Diamond data-icon="inline-end" /></Badge>
              <Badge size="lg" className="bg-violet-600 text-violet-100">Violet</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* All Variants Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All Variants</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">default</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">secondary</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">destructive</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">outline</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">ghost</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">link</th>
              </tr>
            </thead>
            <tbody>
              {/* default size */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">default</td>
                <td className="px-4 py-3"><Badge variant="default" size="default">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="default">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="default">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="default">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="default">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="default">Badge</Badge></td>
              </tr>
              {/* md size */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">md</td>
                <td className="px-4 py-3"><Badge variant="default" size="md">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="md">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="md">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="md">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="md">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="md">Badge</Badge></td>
              </tr>
              {/* lg size */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">lg</td>
                <td className="px-4 py-3"><Badge variant="default" size="lg">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="lg">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="lg">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="lg">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="lg">Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="lg">Badge</Badge></td>
              </tr>
              {/* default + icon start */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">default + Icon Start</td>
                <td className="px-4 py-3"><Badge variant="default" size="default"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="default"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="default"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="default"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="default"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="default"><Diamond data-icon="inline-start" />Badge</Badge></td>
              </tr>
              {/* md + icon start */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">md + Icon Start</td>
                <td className="px-4 py-3"><Badge variant="default" size="md"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="md"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="md"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="md"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="md"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="md"><Diamond data-icon="inline-start" />Badge</Badge></td>
              </tr>
              {/* lg + icon start */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">lg + Icon Start</td>
                <td className="px-4 py-3"><Badge variant="default" size="lg"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="lg"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="lg"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="lg"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="lg"><Diamond data-icon="inline-start" />Badge</Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="lg"><Diamond data-icon="inline-start" />Badge</Badge></td>
              </tr>
              {/* default + icon end */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">default + Icon End</td>
                <td className="px-4 py-3"><Badge variant="default" size="default">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="default">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="default">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="default">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="default">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="default">Badge<Diamond data-icon="inline-end" /></Badge></td>
              </tr>
              {/* md + icon end */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">md + Icon End</td>
                <td className="px-4 py-3"><Badge variant="default" size="md">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="md">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="md">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="md">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="md">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="md">Badge<Diamond data-icon="inline-end" /></Badge></td>
              </tr>
              {/* lg + icon end */}
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">lg + Icon End</td>
                <td className="px-4 py-3"><Badge variant="default" size="lg">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="secondary" size="lg">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="destructive" size="lg">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="outline" size="lg">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="ghost" size="lg">Badge<Diamond data-icon="inline-end" /></Badge></td>
                <td className="px-4 py-3"><Badge variant="link" size="lg">Badge<Diamond data-icon="inline-end" /></Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
