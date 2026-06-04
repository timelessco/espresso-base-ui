"use client"

import {
  ArrowRight,
  AtSign,
  Cloud,
  FileText,
  Inbox,
  MessageSquare,
  Plus,
  Search,
  Send,
  Ticket,
  Users,
  Workflow,
  Mail,
} from "lucide-react"
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function EmptyPage() {
  return (
    <div className="flex max-w-[764px] flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create your first project to get started.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>

      {/* With Icon Media */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icon Media</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* With Action */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Action</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* With Multiple Actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Multiple Actions</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* With Search Input */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Search Input</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* With Link */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Link in Description</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* Dashed Border */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Dashed Border</SectionTitle>
        <Empty className="border border-dashed">
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
      </div>

      {/* Default Media (no background) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default Media (custom illustration)</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* Avatar Media */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Avatar Media</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* Avatar Group Media */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Avatar Group Media</SectionTitle>
        <Empty className="border">
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
      </div>

      {/* Provider Grid */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Provider Grid</SectionTitle>
        <Empty className="min-h-[450px] border">
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
                {
                  label: "Custom email",
                  src: "/images/svg/custom-mail.svg",
                },
              ].map((provider, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="xl"
                  className="w-[156px] justify-start gap-2.5 text-base"
                >
                  <img src={provider.src} alt={provider.label} />
                  {provider.label}
                </Button>
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </div>

      {/* Icon Row */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Icon Row</SectionTitle>
        <Empty className="min-h-[450px] border">
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
                { icon: Mail, color: "bg-blue-500", size: "size-4" },
                { icon: Ticket, color: "bg-purple-500", size: "size-6" },
                { icon: Send, color: "bg-blue-700", size: "size-8" },
                { icon: Cloud, color: "bg-sky-400", size: "size-10" },
                { icon: Inbox, color: "bg-fuchsia-500", size: "size-11.5" },
                { icon: FileText, color: "bg-foreground", size: "size-16" },
                { icon: AtSign, color: "bg-blue-500", size: "size-11.5" },
                {
                  icon: MessageSquare,
                  color: "bg-orange-500",
                  size: "size-10",
                },
                { icon: Workflow, color: "bg-indigo-500", size: "size-8" },
                { icon: Inbox, color: "bg-teal-700", size: "size-6" },
                { icon: Mail, color: "bg-emerald-700", size: "size-4" },
              ].map(({ icon: Icon, color, size }, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center rounded-full ${color} ${size}`}
                >
                  <Icon className="size-1/2 text-white" />
                </div>
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </div>

      {/* Minimal */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Minimal</SectionTitle>
        <Empty className="min-h-[450px] border">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-transparent">
              <Users />
            </EmptyMedia>
            <EmptyTitle>No leads found</EmptyTitle>
            <EmptyDescription>
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
      </div>
    </div>
  )
}
