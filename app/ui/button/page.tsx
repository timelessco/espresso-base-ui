import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LoaderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export default function ButtonPage() {
  return (
    <div className="flex flex-col gap-12 p-10">
      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="default">Default (md)</Button>
          <Button size="lg">lg</Button>
          <Button size="xl">xl</Button>
          <Button size="2xl">2xl</Button>
        </div>
      </div>

      {/* Icon buttons - Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Icon Only</SectionTitle>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="icon-xs"><PlusIcon /></Button>
          <Button size="icon-sm"><PlusIcon /></Button>
          <Button size="icon"><PlusIcon /></Button>
          <Button size="icon-lg"><PlusIcon /></Button>
          <Button size="icon-xl"><PlusIcon /></Button>
          <Button size="icon-2xl"><PlusIcon /></Button>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Button variant="outline" size="icon-xs"><PlusIcon /></Button>
          <Button variant="outline" size="icon-sm"><PlusIcon /></Button>
          <Button variant="outline" size="icon"><PlusIcon /></Button>
          <Button variant="outline" size="icon-lg"><PlusIcon /></Button>
          <Button variant="outline" size="icon-xl"><PlusIcon /></Button>
          <Button variant="outline" size="icon-2xl"><PlusIcon /></Button>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Button variant="ghost" size="icon-xs"><PlusIcon /></Button>
          <Button variant="ghost" size="icon-sm"><PlusIcon /></Button>
          <Button variant="ghost" size="icon"><PlusIcon /></Button>
          <Button variant="ghost" size="icon-lg"><PlusIcon /></Button>
          <Button variant="ghost" size="icon-xl"><PlusIcon /></Button>
          <Button variant="ghost" size="icon-2xl"><PlusIcon /></Button>
        </div>
      </div>

      {/* With icons - Leading */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons</SectionTitle>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs"><MailIcon /> Send Email</Button>
          <Button size="sm"><MailIcon /> Send Email</Button>
          <Button size="default"><MailIcon /> Send Email</Button>
          <Button size="lg"><MailIcon /> Send Email</Button>
          <Button size="xl"><MailIcon /> Send Email</Button>
          <Button size="2xl"><MailIcon /> Send Email</Button>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Button variant="outline" size="xs">Continue <ChevronRightIcon /></Button>
          <Button variant="outline" size="sm">Continue <ChevronRightIcon /></Button>
          <Button variant="outline" size="default">Continue <ChevronRightIcon /></Button>
          <Button variant="outline" size="lg">Continue <ChevronRightIcon /></Button>
          <Button variant="outline" size="xl">Continue <ChevronRightIcon /></Button>
          <Button variant="outline" size="2xl">Continue <ChevronRightIcon /></Button>
        </div>
      </div>

      {/* All variant x size combinations */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All Variant + Size Combinations</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Variant</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">xs</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">sm</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">md</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">lg</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">xl</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">2xl</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">default</td>
                <td className="px-4 py-3"><Button variant="default" size="xs">Button</Button></td>
                <td className="px-4 py-3"><Button variant="default" size="sm">Button</Button></td>
                <td className="px-4 py-3"><Button variant="default" size="default">Button</Button></td>
                <td className="px-4 py-3"><Button variant="default" size="lg">Button</Button></td>
                <td className="px-4 py-3"><Button variant="default" size="xl">Button</Button></td>
                <td className="px-4 py-3"><Button variant="default" size="2xl">Button</Button></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">secondary</td>
                <td className="px-4 py-3"><Button variant="secondary" size="xs">Button</Button></td>
                <td className="px-4 py-3"><Button variant="secondary" size="sm">Button</Button></td>
                <td className="px-4 py-3"><Button variant="secondary" size="default">Button</Button></td>
                <td className="px-4 py-3"><Button variant="secondary" size="lg">Button</Button></td>
                <td className="px-4 py-3"><Button variant="secondary" size="xl">Button</Button></td>
                <td className="px-4 py-3"><Button variant="secondary" size="2xl">Button</Button></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">outline</td>
                <td className="px-4 py-3"><Button variant="outline" size="xs">Button</Button></td>
                <td className="px-4 py-3"><Button variant="outline" size="sm">Button</Button></td>
                <td className="px-4 py-3"><Button variant="outline" size="default">Button</Button></td>
                <td className="px-4 py-3"><Button variant="outline" size="lg">Button</Button></td>
                <td className="px-4 py-3"><Button variant="outline" size="xl">Button</Button></td>
                <td className="px-4 py-3"><Button variant="outline" size="2xl">Button</Button></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">ghost</td>
                <td className="px-4 py-3"><Button variant="ghost" size="xs">Button</Button></td>
                <td className="px-4 py-3"><Button variant="ghost" size="sm">Button</Button></td>
                <td className="px-4 py-3"><Button variant="ghost" size="default">Button</Button></td>
                <td className="px-4 py-3"><Button variant="ghost" size="lg">Button</Button></td>
                <td className="px-4 py-3"><Button variant="ghost" size="xl">Button</Button></td>
                <td className="px-4 py-3"><Button variant="ghost" size="2xl">Button</Button></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">destructive</td>
                <td className="px-4 py-3"><Button variant="destructive" size="xs">Button</Button></td>
                <td className="px-4 py-3"><Button variant="destructive" size="sm">Button</Button></td>
                <td className="px-4 py-3"><Button variant="destructive" size="default">Button</Button></td>
                <td className="px-4 py-3"><Button variant="destructive" size="lg">Button</Button></td>
                <td className="px-4 py-3"><Button variant="destructive" size="xl">Button</Button></td>
                <td className="px-4 py-3"><Button variant="destructive" size="2xl">Button</Button></td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">link</td>
                <td className="px-4 py-3"><Button variant="link" size="xs">Button</Button></td>
                <td className="px-4 py-3"><Button variant="link" size="sm">Button</Button></td>
                <td className="px-4 py-3"><Button variant="link" size="default">Button</Button></td>
                <td className="px-4 py-3"><Button variant="link" size="lg">Button</Button></td>
                <td className="px-4 py-3"><Button variant="link" size="xl">Button</Button></td>
                <td className="px-4 py-3"><Button variant="link" size="2xl">Button</Button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" disabled>Default</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </div>

      {/* Loading */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Loading</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled><LoaderIcon /> Loading...</Button>
          <Button variant="secondary" disabled><LoaderIcon /> Loading...</Button>
          <Button variant="outline" disabled><LoaderIcon /> Loading...</Button>
          <Button variant="destructive" disabled><LoaderIcon /> Loading...</Button>
        </div>
      </div>
    </div>
  )
}
