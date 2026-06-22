import {
  ArrowRightIcon,
  MoreHorizontalIcon,
  PhoneIncomingIcon,
  StarIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function CardPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, Sally</CardTitle>
            <CardDescription>
              Pick up where you left off — three tasks are due today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cards group related content and actions into a single surface.
              Use them for product previews, dashboard tiles, and form
              containers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* With Action */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>With Action (menu in header)</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Project Atlas</CardTitle>
            <CardDescription>Last updated 2 hours ago</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontalIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">In progress</Badge>
              <span className="text-xs text-muted-foreground">
                12 of 18 tasks complete
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* With Footer */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>With Footer</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Pro plan</CardTitle>
            <CardDescription>
              Everything in Starter, plus advanced analytics and SSO.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">
              $29
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Upgrade <ArrowRightIcon />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Size sm */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Size: sm (tighter spacing + smaller title)</SectionTitle>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Compact card</CardTitle>
            <CardDescription>
              Uses gap-3 / py-3 / px-3 and a smaller title.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Useful for dense layouts — sidebars, list rows, dashboard widgets.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Image top */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Image at top (auto-rounds, no top padding)</SectionTitle>
        <Card>
          {/* biome-ignore lint/performance/noImgElement: showcase only */}
          <img
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&dpr=2&q=80"
            alt="Workspace"
            className="aspect-[16/9] object-cover"
          />
          <CardHeader>
            <CardTitle>Designing for focus</CardTitle>
            <CardDescription>
              A first-image child automatically loses top padding and gets a
              rounded-top via the Card&apos;s child selector.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="size-7">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80"
                  alt="Sarah Chen"
                />
                <AvatarFallback className="text-[10px]">SC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Sarah Chen
                </span>
                <span className="text-xs text-muted-foreground">
                  Designer · 5 min read
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product card */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Product card (action + footer + image)</SectionTitle>
        <Card>
          {/* biome-ignore lint/performance/noImgElement: showcase only */}
          <img
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&dpr=2&q=80"
            alt="Wireless headphones"
            className="aspect-[4/3] object-cover"
          />
          <CardHeader>
            <CardTitle>Aurora Wireless Headphones</CardTitle>
            <CardDescription>Studio-grade, 40h battery</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm">
                <StarIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">
                $249
              </span>
              <span className="text-sm text-muted-foreground line-through">
                $299
              </span>
              <Badge variant="secondary" className="ml-auto">
                Sale
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Variant: mail */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Variant: mail</SectionTitle>
        <Card variant="mail">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <p>
                <span className="font-medium text-foreground">
                  Templeton Peck
                </span>{" "}
                <span className="text-sm text-accent-foreground">
                  &lt;templeton@frappe.io&gt;
                </span>
              </p>
              <p className="text-base text-muted-foreground">
                <span className="text-accent-foreground">To:</span> Jonathan
                Higgins, sandeep@timeless.co, +4
              </p>
              <p className="text-base text-muted-foreground">
                <span className="text-accent-foreground">Subject:</span> Package
                update
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              3d ago
            </span>
          </div>
          <p className="border-t border-border-soft pt-3 text-sm leading-lg text-foreground">
            Hi Good morning, we&apos;re writing to inform you about recent
            updates to our inventory package that may affect your current and
            future orders.
          </p>
        </Card>
      </div>

      {/* Variant: message */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Variant: message</SectionTitle>
        <Card variant="message" className="inline-block self-start">
          <p className="text-sm">
            <span className="font-medium text-foreground">@Sandra Bass</span>,
            Great teamwork, everyone. Let&apos;s catch up with our findings.
          </p>
        </Card>
      </div>

      {/* Variant: call */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Variant: call</SectionTitle>
        <Card variant="call">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <PhoneIncomingIcon className="size-3.5" />
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-sm font-medium text-foreground">Inbound Call</p>
              <p className="text-sm text-destructive">Missed call</p>
            </div>
            <span className="text-xs text-muted-foreground">14 May</span>
          </div>
        </Card>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Grid (3 stats)</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Revenue", value: "$12,430", delta: "+8.2%" },
            { label: "Active users", value: "2,041", delta: "+12.4%" },
            { label: "Churn", value: "1.8%", delta: "-0.3%" },
          ].map((s) => (
            <Card key={s.label} size="sm">
              <CardHeader>
                <CardDescription>{s.label}</CardDescription>
                <CardTitle className="text-2xl">{s.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-success-foreground">
                  {s.delta} this week
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
