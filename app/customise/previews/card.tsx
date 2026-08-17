"use client"

import * as React from "react"
import {
  ArrowRight,
  MoreHorizontal,
  PhoneIncoming,
  Star,
} from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PreviewCard, PreviewGrid } from "./preview-card"

const STATS = [
  { label: "Revenue", value: "$12,430", delta: "+8.2%" },
  { label: "Active users", value: "2,041", delta: "+12.4%" },
  { label: "Churn", value: "1.8%", delta: "-0.3%" },
]

export default function CardPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Welcome back, Sally</CardTitle>
            <CardDescription>
              Pick up where you left off — three tasks are due today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cards group related content and actions into a single surface.
            </p>
          </CardContent>
        </Card>
      </PreviewCard>

      <PreviewCard label="With action (menu in header)">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Project Atlas</CardTitle>
            <CardDescription>Last updated 2 hours ago</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal />
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
      </PreviewCard>

      <PreviewCard label="With footer">
        <Card className="w-full max-w-sm">
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
              Upgrade <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </PreviewCard>

      <PreviewCard label="Size: sm">
        <Card size="sm" className="w-full max-w-sm">
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
      </PreviewCard>

      <PreviewCard label="Image at top">
        <Card className="w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&dpr=2&q=80"
            alt="Workspace"
            className="aspect-[16/9] object-cover"
          />
          <CardHeader>
            <CardTitle>Designing for focus</CardTitle>
            <CardDescription>
              A first-image child auto-rounds and loses top padding.
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
      </PreviewCard>

      <PreviewCard label="Product card (action + footer + image)">
        <Card className="w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
                <Star />
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
      </PreviewCard>

      <PreviewCard label="Variant: mail">
        <Card variant="mail" className="w-full max-w-md">
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
            updates to our inventory package.
          </p>
        </Card>
      </PreviewCard>

      <PreviewCard label="Variant: message">
        <Card variant="message" className="inline-block max-w-md self-start">
          <p className="text-sm">
            <span className="font-medium text-foreground">@Sandra Bass</span>,
            Great teamwork, everyone. Let&apos;s catch up with our findings.
          </p>
        </Card>
      </PreviewCard>

      <PreviewCard label="Variant: call">
        <Card variant="call" className="w-full max-w-md">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <PhoneIncoming className="size-3.5" />
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-sm font-medium text-foreground">
                Inbound Call
              </p>
              <p className="text-sm text-destructive">Missed call</p>
            </div>
            <span className="text-xs text-muted-foreground">14 May</span>
          </div>
        </Card>
      </PreviewCard>

      <PreviewCard label="Grid (3 stats)">
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
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
      </PreviewCard>
    </PreviewGrid>
  )
}
