import { Button } from "@/components/ui/button";

export default function ButtonPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Button</h1>
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
      </div>
    </div>
  );
}
