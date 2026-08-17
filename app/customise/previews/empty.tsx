"use client"

import * as React from "react"
import { ArrowRight, FileText, Inbox, Plus, Search, Users } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function EmptyPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create your first project to get started.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PreviewCard>

      <PreviewCard label="With icon media">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>Inbox is empty</EmptyTitle>
            <EmptyDescription>
              You&apos;re all caught up. New messages will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PreviewCard>

      <PreviewCard label="With action">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText />
            </EmptyMedia>
            <EmptyTitle>No documents</EmptyTitle>
            <EmptyDescription>
              Upload a document or create one from a template.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">
              <Plus />
              New document
            </Button>
          </EmptyContent>
        </Empty>
      </PreviewCard>

      <PreviewCard label="With multiple actions">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>No teammates yet</EmptyTitle>
            <EmptyDescription>
              Invite people to collaborate on this workspace.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex items-center gap-2">
              <Button size="sm">
                <Plus />
                Invite
              </Button>
              <Button variant="outline" size="sm">
                Learn more
                <ArrowRight />
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </PreviewCard>

      <PreviewCard label="With search input">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search again..." />
            </InputGroup>
          </EmptyContent>
        </Empty>
      </PreviewCard>

      <PreviewCard label="With link in description">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText />
            </EmptyMedia>
            <EmptyTitle>Nothing here yet</EmptyTitle>
            <EmptyDescription>
              Read the <a href="#">documentation</a> to learn how to get
              started.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Dashed border">
        <Empty className="w-full max-w-sm border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Plus />
            </EmptyMedia>
            <EmptyTitle>Drop files here</EmptyTitle>
            <EmptyDescription>
              Drag and drop files to upload, or click to browse.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Default media (custom illustration)">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia>
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <Inbox className="size-8 text-muted-foreground" />
              </div>
            </EmptyMedia>
            <EmptyTitle>All clear</EmptyTitle>
            <EmptyDescription>
              You have no pending notifications.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Avatar media">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia>
              <Avatar size="3xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </EmptyMedia>
            <EmptyTitle>No teammates yet</EmptyTitle>
            <EmptyDescription>
              Invite people to collaborate with you in this workspace.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">
              <Plus />
              Invite teammate
            </Button>
          </EmptyContent>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Avatar group media">
        <Empty className="w-full max-w-sm border">
          <EmptyHeader>
            <EmptyMedia>
              <div className="flex -space-x-2">
                <Avatar size="lg" className="ring-2 ring-background">
                  <AvatarImage src="https://i.pravatar.cc/80?u=1" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar size="lg" className="ring-2 ring-background">
                  <AvatarImage src="https://i.pravatar.cc/80?u=2" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar size="lg" className="ring-2 ring-background">
                  <AvatarImage src="https://i.pravatar.cc/80?u=3" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              </div>
            </EmptyMedia>
            <EmptyTitle>No shared projects</EmptyTitle>
            <EmptyDescription>
              Projects you share with others will show up here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Provider grid">
        <Empty className="w-full max-w-md min-h-[360px] border">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-transparent">
              <Plus />
            </EmptyMedia>
            <EmptyTitle>Add account</EmptyTitle>
            <EmptyDescription>
              Add a new account for easy profile switching.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-xl justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Google", src: "/images/svg/gmail.svg" },
                { label: "Frappe", src: "/images/svg/frappe.svg" },
                { label: "Outlook", src: "/images/svg/outlook.svg" },
                { label: "Google", src: "/images/svg/google.svg" },
                { label: "Yahoo", src: "/images/svg/yahoo.svg" },
                { label: "Custom email", src: "/images/svg/custom-mail.svg" },
              ].map((provider, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="xl"
                  className="w-[156px] justify-start gap-2.5 text-base"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={provider.src} alt={provider.label} />
                  {provider.label}
                </Button>
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Icon row">
        <Empty className="w-full max-w-md min-h-[360px] border">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-transparent">
              <Plus />
            </EmptyMedia>
            <EmptyTitle>Add account</EmptyTitle>
            <EmptyDescription>
              Add a new account for easy profile switching.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex items-center justify-center gap-4">
              {[
                { src: "/images/svg/avatar1.svg", size: "size-4" },
                { src: "/images/svg/avatar2.svg", size: "size-6" },
                { src: "/images/svg/avatar3.svg", size: "size-8" },
                { src: "/images/svg/avatar4.svg", size: "size-10" },
                { src: "/images/svg/avatar5.svg", size: "size-11.5" },
                { src: "/images/svg/avatar6.svg", size: "size-16" },
                { src: "/images/svg/avatar7.svg", size: "size-11.5" },
                { src: "/images/svg/avatar8.svg", size: "size-10" },
                { src: "/images/svg/avatar9.svg", size: "size-8" },
                { src: "/images/svg/avatar10.svg", size: "size-6" },
                { src: "/images/svg/avatar11.svg", size: "size-4" },
              ].map(({ src, size }, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`rounded-full ${size}`}
                />
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </PreviewCard>

      <PreviewCard label="Minimal">
        <Empty className="w-full max-w-md min-h-[360px] border">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-transparent">
              <Users />
            </EmptyMedia>
            <EmptyTitle>No leads found</EmptyTitle>
            <EmptyDescription className="max-w-[260px]">
              No leads found. Create a lead to start tracking opportunities.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary" size="sm">
              <Plus />
              New
            </Button>
          </EmptyContent>
        </Empty>
      </PreviewCard>
    </PreviewGrid>
  )
}
