"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  Smile,
  User,
  UserPlus,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function CommandPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <Command className="w-full max-w-md rounded-xl shadow-5xs">
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
      </PreviewCard>

      <PreviewCard label="With icons">
        <Command className="w-full max-w-md rounded-xl shadow-5xs">
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
      </PreviewCard>

      <PreviewCard label="With shortcuts">
        <Command className="w-full max-w-md rounded-xl shadow-5xs">
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
      </PreviewCard>

      <PreviewCard label="Groups with separator">
        <Command className="w-full max-w-md rounded-xl shadow-5xs">
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
      </PreviewCard>

      <PreviewCard label="Disabled items">
        <Command className="w-full max-w-md rounded-xl shadow-5xs">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
