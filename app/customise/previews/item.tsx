"use client"

import * as React from "react"
import {
  Bell,
  ChevronRight,
  CreditCard,
  Folder,
  Music,
  Sparkles,
  User,
} from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function ItemPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Item variant="outline" className="w-full max-w-sm">
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
              <ItemDescription>Transparent border.</ItemDescription>
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
            <Badge variant="secondary">Owner</Badge>
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

      <PreviewCard label="Group with separators">
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
                <CreditCard />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Billing</ItemTitle>
                <ItemDescription>Plans and invoices.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRight className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
            <ItemSeparator />
            <Item size="sm">
              <ItemMedia variant="icon">
                <Folder />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Projects</ItemTitle>
                <ItemDescription>All your workspaces.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRight className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
          </ItemGroup>
        </div>
      </PreviewCard>

      <PreviewCard label="Muted stack">
        <ItemGroup className="max-w-sm">
          <Item variant="muted">
            <ItemMedia variant="icon">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Weekly digest</ItemTitle>
              <ItemDescription>Summary email every Monday.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="secondary">Off</Badge>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <CreditCard />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Cloud backup</ItemTitle>
              <ItemDescription>Last sync 5 min ago.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge>On</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
