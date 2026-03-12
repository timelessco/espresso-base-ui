import { Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonPage() {
  return (
    <div className="flex flex-1 flex-col gap-12 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Button</h1>

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">With Icons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">
            <Diamond data-icon="inline-start" />
            Discover
            <Diamond data-icon="inline-end" />
          </Button>
          <Button variant="secondary">
            <Diamond data-icon="inline-start" />
            Discover
            <Diamond data-icon="inline-end" />
          </Button>
          <Button variant="outline">
            <Diamond data-icon="inline-start" />
            Discover
            <Diamond data-icon="inline-end" />
          </Button>
          <Button variant="ghost">
            <Diamond data-icon="inline-start" />
            Discover
            <Diamond data-icon="inline-end" />
          </Button>
          <Button variant="destructive">
            <Diamond data-icon="inline-start" />
            Discover
            <Diamond data-icon="inline-end" />
          </Button>
        </div>
      </section>

      {/* Icon Only */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default" size="icon">
            <Diamond />
          </Button>
          <Button variant="secondary" size="icon">
            <Diamond />
          </Button>
          <Button variant="outline" size="icon">
            <Diamond />
          </Button>
          <Button variant="ghost" size="icon">
            <Diamond />
          </Button>
          <Button variant="destructive" size="icon">
            <Diamond />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="icon-xs">
            <Diamond />
          </Button>
          <Button size="icon-sm">
            <Diamond />
          </Button>
          <Button size="icon">
            <Diamond />
          </Button>
          <Button size="icon-lg">
            <Diamond />
          </Button>
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default" disabled>
            Default
          </Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </div>
      </section>

      {/* All Variants × Sizes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">All Variants × Sizes</h2>

        <div className="flex flex-col gap-10">
          {/* XS */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Extra Small</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="default" size="xs"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="xs" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="icon-xs"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="xs"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="xs" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="icon-xs"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="xs"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="xs" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="icon-xs"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="xs"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="xs" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="icon-xs"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="xs"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="xs" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="icon-xs"><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* SM */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Small</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="default" size="sm"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="sm" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="icon-sm"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="sm" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="icon-sm"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="sm" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="icon-sm"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="sm" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="icon-sm"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="sm"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="sm" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="icon-sm"><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* Default */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Default</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="default" size="default"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="default" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="icon"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="default"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="default" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="icon"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="default"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="default" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="icon"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="default"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="default" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="icon"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="default"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="default" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="icon"><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* LG */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Large</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="default" size="lg"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="lg" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="default" size="icon-lg"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="lg"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="lg" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="secondary" size="icon-lg"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="lg"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="lg" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="outline" size="icon-lg"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="lg"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="lg" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="ghost" size="icon-lg"><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="lg"><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="lg" disabled><Diamond data-icon="inline-start" />Discover<Diamond data-icon="inline-end" /></Button>
                <Button variant="destructive" size="icon-lg"><Diamond /></Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
