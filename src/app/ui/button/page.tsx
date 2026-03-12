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
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="2xl">2X Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">With Icons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">
            <Diamond /> Discover <Diamond />
          </Button>
          <Button variant="secondary">
            <Diamond /> Discover <Diamond />
          </Button>
          <Button variant="outline">
            <Diamond /> Discover <Diamond />
          </Button>
          <Button variant="ghost">
            <Diamond /> Discover <Diamond />
          </Button>
          <Button variant="destructive">
            <Diamond /> Discover <Diamond />
          </Button>
        </div>
      </section>

      {/* Icon Only — Variants */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" iconOnly><Diamond /></Button>
          <Button variant="secondary" iconOnly><Diamond /></Button>
          <Button variant="outline" iconOnly><Diamond /></Button>
          <Button variant="ghost" iconOnly><Diamond /></Button>
          <Button variant="destructive" iconOnly><Diamond /></Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" iconOnly><Diamond /></Button>
          <Button size="md" iconOnly><Diamond /></Button>
          <Button size="lg" iconOnly><Diamond /></Button>
          <Button size="xl" iconOnly><Diamond /></Button>
          <Button size="2xl" iconOnly><Diamond /></Button>
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="destructive" disabled>Destructive</Button>
        </div>
      </section>

      {/* All Variants × Sizes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">All Variants × Sizes</h2>

        <div className="flex flex-col gap-10">
          {/* SM */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Small</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="primary" size="sm"><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="sm" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="sm" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm"><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="sm" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="sm" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm"><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="sm" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="sm" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm"><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="sm" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="sm" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="sm"><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="sm" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="sm" iconOnly><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* MD */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Medium</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="primary" size="md"><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="md" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="md" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="md"><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="md" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="md" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="md"><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="md" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="md" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="md"><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="md" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="md" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="md"><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="md" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="md" iconOnly><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* LG */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Large</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="primary" size="lg"><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="lg" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="lg" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="lg"><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="lg" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="lg" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="lg"><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="lg" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="lg" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="lg"><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="lg" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="lg" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="lg"><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="lg" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="lg" iconOnly><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* XL */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Extra Large</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="primary" size="xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="xl" iconOnly><Diamond /></Button>
              </div>
            </div>
          </div>

          {/* 2XL */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">2X Large</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <Button variant="primary" size="2xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="2xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="primary" size="2xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="2xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="2xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="secondary" size="2xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="2xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="2xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="outline" size="2xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="2xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="2xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="ghost" size="2xl" iconOnly><Diamond /></Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive" size="2xl"><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="2xl" disabled><Diamond />Discover<Diamond /></Button>
                <Button variant="destructive" size="2xl" iconOnly><Diamond /></Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
