import { Button } from "@/components/ui/button"
import {
  Plus,
  Search,
  Settings,
  Heart,
  Share2,
  Download,
  Upload,
  Trash2,
  Copy,
  RefreshCw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Mail,
  Bell,
  Star,
  Edit3,
  Eye,
} from "lucide-react"

const colorTokens = [
  { name: "--background", className: "bg-background" },
  { name: "--foreground", className: "bg-foreground" },
  { name: "--primary", className: "bg-primary" },
  { name: "--primary-foreground", className: "bg-primary-foreground" },
  { name: "--secondary", className: "bg-secondary" },
  { name: "--secondary-foreground", className: "bg-secondary-foreground" },
  { name: "--muted", className: "bg-muted" },
  { name: "--muted-foreground", className: "bg-muted-foreground" },
  { name: "--accent", className: "bg-accent" },
  { name: "--accent-foreground", className: "bg-accent-foreground" },
  { name: "--destructive", className: "bg-destructive" },
  { name: "--destructive-foreground", className: "bg-destructive-foreground" },
  { name: "--border", className: "bg-border" },
  { name: "--input", className: "bg-input" },
  { name: "--card", className: "bg-card" },
  { name: "--card-foreground", className: "bg-card-foreground" },
  { name: "--popover", className: "bg-popover" },
  { name: "--popover-foreground", className: "bg-popover-foreground" },
]

export default function PlaygroundPage() {
  return (
    <div className="flex w-full flex-col gap-10 p-10">
      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
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
              <Button variant="link" disabled>
                Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="flex flex-col gap-3">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button size="icon" variant="default">
                <Plus />
              </Button>
              <Button size="icon" variant="default">
                <Search />
              </Button>
              <Button size="icon" variant="default">
                <Settings />
              </Button>
              <Button size="icon" variant="default">
                <Heart />
              </Button>
              <Button size="icon" variant="default">
                <Share2 />
              </Button>
              <Button size="icon" variant="default">
                <Download />
              </Button>
              <Button size="icon" variant="default">
                <Upload />
              </Button>
              <Button size="icon" variant="default">
                <Trash2 />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="icon" variant="outline">
                <Copy />
              </Button>
              <Button size="icon" variant="outline">
                <RefreshCw />
              </Button>
              <Button size="icon" variant="outline">
                <MoreHorizontal />
              </Button>
              <Button size="icon" variant="outline">
                <ChevronLeft />
              </Button>
              <Button size="icon" variant="outline">
                <ChevronRight />
              </Button>
              <Button size="icon" variant="outline">
                <ChevronDown />
              </Button>
              <Button size="icon" variant="outline">
                <ChevronUp />
              </Button>
              <Button size="icon" variant="outline">
                <ArrowRight />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="icon" variant="ghost">
                <ArrowLeft />
              </Button>
              <Button size="icon" variant="ghost">
                <Check />
              </Button>
              <Button size="icon" variant="ghost">
                <X />
              </Button>
              <Button size="icon" variant="ghost">
                <Mail />
              </Button>
              <Button size="icon" variant="ghost">
                <Bell />
              </Button>
              <Button size="icon" variant="ghost">
                <Star />
              </Button>
              <Button size="icon" variant="ghost">
                <Edit3 />
              </Button>
              <Button size="icon" variant="ghost">
                <Eye />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Color Tokens */}
      <div className="flex flex-col gap-3">
        <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {colorTokens.map((token) => (
              <div
                key={token.name}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`size-12 rounded-lg border border-border ${token.className}`}
                />
                <span className="max-w-14 truncate text-[10px] text-muted-foreground">
                  {token.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
