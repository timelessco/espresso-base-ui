"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
} from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function CommandPage() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <Command className="max-w-md rounded-xl shadow-5xs">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons</SectionTitle>
        <Command className="max-w-md rounded-xl shadow-5xs">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                Calendar
              </CommandItem>
              <CommandItem>
                <Smile />
                Search Emoji
              </CommandItem>
              <CommandItem>
                <Calculator />
                Calculator
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* With Shortcuts */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Shortcuts</SectionTitle>
        <Command className="max-w-md rounded-xl shadow-5xs">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* With Groups and Separator */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Groups with Separator</SectionTitle>
        <Command className="max-w-md rounded-xl shadow-5xs">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                Calendar
              </CommandItem>
              <CommandItem>
                <Smile />
                Search Emoji
              </CommandItem>
              <CommandItem>
                <Calculator />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* Disabled Item */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Item</SectionTitle>
        <Command className="max-w-md rounded-xl shadow-5xs">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Available">
              <CommandItem>
                <Mail />
                Send Email
              </CommandItem>
              <CommandItem>
                <MessageSquare />
                Send Message
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Unavailable">
              <CommandItem disabled>
                <PlusCircle />
                New Team (Pro plan)
              </CommandItem>
              <CommandItem disabled>
                <UserPlus />
                Invite Members (Pro plan)
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* Command Dialog */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Command Dialog (⌘K)</SectionTitle>
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium">
            ⌘ K
          </kbd>{" "}
          (or Ctrl+K) to open the command palette.
        </p>
        <Button
          variant="outline"
          className="w-fit"
          onClick={() => setOpen(true)}
        >
          Open Command Palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem onSelect={() => setOpen(false)}>
                  <Calendar />
                  Calendar
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Smile />
                  Search Emoji
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Calculator />
                  Calculator
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem onSelect={() => setOpen(false)}>
                  <User />
                  Profile
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <CreditCard />
                  Billing
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Settings />
                  Settings
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => setOpen(false)}>
                  <Plus />
                  Create New
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  )
}
