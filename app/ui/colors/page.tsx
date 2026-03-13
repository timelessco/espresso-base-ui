import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ColorsPage() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex items-center justify-center gap-2">
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-background"></div>
          <p className="text-sm">--background</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-foreground"></div>
          <p className="text-sm">--foreground</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-primary"></div>
          <p className="text-sm">--primary</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-secondary"></div>
          <p className="text-sm">--secondary</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-muted"></div>
          <p className="text-sm">--muted</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-accent"></div>
          <p className="text-sm">--accent</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-destructive"></div>
          <p className="text-sm">--destructive</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-chart-1"></div>
          <p className="text-sm">--chart-1</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-chart-2"></div>
          <p className="text-sm">--chart-2</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-chart-3"></div>
          <p className="text-sm">--chart-3</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-chart-4"></div>
          <p className="text-sm">--chart-4</p>
        </div>
        <div className="flex w-1/6 flex-col items-center justify-center gap-2">
          <div className="size-12 rounded-lg bg-chart-5"></div>
          <p className="text-sm">--chart-5</p>
        </div>
      </div>
      <Tooltip open={true}>
        <TooltipTrigger>Hover</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
