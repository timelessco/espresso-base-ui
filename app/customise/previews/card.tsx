"use client"

import * as React from "react"
import { ArrowRight, MoreHorizontal, PhoneIncoming, Star } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function CardPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Welcome back, Sally</CardTitle>
            <CardDescription>
              Three tasks are due today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cards group related content and actions into a single surface.
            </p>
          </CardContent>
        </Card>
      </PreviewCard>

      <PreviewCard label="With action">
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
                12 of 18 tasks
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
              Advanced analytics and SSO included.
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
              Tighter spacing and a smaller title.
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm">
                <Star />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Useful for dense layouts and dashboard widgets.
            </p>
          </CardContent>
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
                <span className="text-accent-foreground">Subject:</span> Package
                update
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">3d</span>
          </div>
          <p className="border-t border-border-soft pt-3 text-sm leading-lg text-foreground">
            Hi, we&apos;re writing to inform you about recent updates to your
            inventory package.
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
    </PreviewGrid>
  )
}
