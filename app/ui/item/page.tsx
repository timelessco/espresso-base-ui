"use client"

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function ItemPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Item>
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
      </div>

      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-col gap-3">
          <Item variant="default">
            <ItemMedia variant="icon">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
              <ItemDescription>Transparent border, no background.</ItemDescription>
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
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-col gap-3">
          <Item variant="outline" size="default">
            <ItemMedia variant="icon">
              <Folder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
              <ItemDescription>
                Roomy padding for list rows.
              </ItemDescription>
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
      </div>

      {/* Media — Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Media — Icon</SectionTitle>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <CreditCard />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Billing</ItemTitle>
            <ItemDescription>Manage your subscription and invoices.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ItemActions>
        </Item>
      </div>

      {/* Media — Image */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Media — Image</SectionTitle>
        <Item variant="outline">
          <ItemMedia variant="image">
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
      </div>

      {/* Media — Avatar */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Media — Avatar</SectionTitle>
        <Item variant="outline">
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
      </div>

      {/* With Header / Footer */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Header / Footer</SectionTitle>
        <Item variant="outline" className="flex-col items-stretch">
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
      </div>

      {/* Item Group — With Separators */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Item Group — With Separators</SectionTitle>
        <div className="rounded-lg border border-border p-1.5">
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
      </div>

      {/* Item Group — Muted Stack */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Item Group — Muted Stack</SectionTitle>
        <ItemGroup>
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
      </div>

      {/* As Link */}
      <div className="flex flex-col gap-4">
        <SectionTitle>As Link</SectionTitle>
        <Item variant="outline" render={<a href="#" />}>
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
      </div>
    </div>
  )
}
