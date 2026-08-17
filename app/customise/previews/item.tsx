"use client"

import * as React from "react"
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  ChevronRight,
  Cloud,
  CreditCard,
  FileText,
  Folder,
  MoreHorizontal,
  Music,
  Settings,
  Sparkles,
  User,
} from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function ItemPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Item className="w-full max-w-sm">
          <ItemMedia variant="icon">
            <Sparkles />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Upgrade to Pro</ItemTitle>
            <ItemDescription>
              Unlock premium features and unlimited projects.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">Upgrade</Button>
          </ItemActions>
        </Item>
      </PreviewCard>

      <PreviewCard label="Variants">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Item variant="default">
            <ItemMedia variant="icon">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
              <ItemDescription>
                Transparent border, no background.
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Outline</ItemTitle>
              <ItemDescription>Visible border.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Muted</ItemTitle>
              <ItemDescription>Soft muted background.</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Item variant="outline" size="default">
            <ItemMedia variant="icon">
              <Folder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
              <ItemDescription>Roomy padding for list rows.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <Folder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
              <ItemDescription>Tighter spacing.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="xs">
            <ItemMedia variant="icon">
              <Folder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Extra small</ItemTitle>
              <ItemDescription>Compact for menus.</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </PreviewCard>

      <PreviewCard label="Media — icon">
        <Item variant="outline" className="w-full max-w-sm">
          <ItemMedia variant="icon">
            <CreditCard />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Billing</ItemTitle>
            <ItemDescription>
              Manage your subscription and invoices.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ItemActions>
        </Item>
      </PreviewCard>

      <PreviewCard label="Media — image">
        <Item variant="outline" className="w-full max-w-sm">
          <ItemMedia variant="image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop"
              alt="Album art"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Midnight Reverie</ItemTitle>
            <ItemDescription>Aria Vale · 3:42</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon-sm">
              <Music />
            </Button>
          </ItemActions>
        </Item>
      </PreviewCard>

      <PreviewCard label="Media — avatar">
        <Item variant="outline" className="w-full max-w-sm">
          <ItemMedia>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>shadcn</ItemTitle>
            <ItemDescription>m@example.com</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Tag variant="secondary" size="sm">
              Owner
            </Tag>
          </ItemActions>
        </Item>
      </PreviewCard>

      <PreviewCard label="With header / footer">
        <Item variant="outline" className="w-full max-w-sm flex-col items-stretch">
          <ItemHeader>
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Design Spec v2.pdf</span>
            </div>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal />
            </Button>
          </ItemHeader>
          <ItemContent>
            <ItemDescription>
              Updated 2 hours ago · 4.2 MB · Shared with 3 people
            </ItemDescription>
          </ItemContent>
          <ItemFooter>
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-[var(--color-green-400)]" />
              <span className="text-xs text-muted-foreground">Approved</span>
            </div>
            <Button variant="outline" size="sm">
              Open
              <ArrowRight />
            </Button>
          </ItemFooter>
        </Item>
      </PreviewCard>

      <PreviewCard label="Group — with separators">
        <div className="w-full max-w-sm rounded-lg border border-border p-1.5">
          <ItemGroup>
            <Item size="sm">
              <ItemMedia variant="icon">
                <User />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Profile</ItemTitle>
                <ItemDescription>Manage your account info.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRight className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
            <ItemSeparator />
            <Item size="sm">
              <ItemMedia variant="icon">
                <Bell />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Notifications</ItemTitle>
                <ItemDescription>Email and push preferences.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRight className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
            <ItemSeparator />
            <Item size="sm">
              <ItemMedia variant="icon">
                <Settings />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Preferences</ItemTitle>
                <ItemDescription>Theme and layout options.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRight className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
          </ItemGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Group — muted stack">
        <ItemGroup className="max-w-sm">
          <Item variant="muted">
            <ItemMedia variant="icon">
              <Cloud />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Cloud backup</ItemTitle>
              <ItemDescription>Enabled · Last sync 5 min ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge>On</Badge>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <BadgeCheck />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Two-factor auth</ItemTitle>
              <ItemDescription>
                Extra security on sign-in attempts.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge>On</Badge>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Weekly digest</ItemTitle>
              <ItemDescription>
                Summary email every Monday morning.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="secondary">Off</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      </PreviewCard>

      <PreviewCard label="As link">
        <Item variant="outline" className="w-full max-w-sm" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <FileText />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Read the documentation</ItemTitle>
            <ItemDescription>
              Learn how to compose items with media, content and actions.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ArrowRight className="size-4 text-muted-foreground" />
          </ItemActions>
        </Item>
      </PreviewCard>
    </PreviewGrid>
  )
}
