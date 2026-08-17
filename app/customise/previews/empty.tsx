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
              You&apos;re all caught up. New messages appear here.
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

      <PreviewCard label="Multiple actions">
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
              Try adjusting your search or filter.
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
    </PreviewGrid>
  )
}
