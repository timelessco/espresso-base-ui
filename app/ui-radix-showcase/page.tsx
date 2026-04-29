"use client"

import * as React from "react"
import {
  Calendar as CalendarIcon,
  Check,
  ChevronRight,
  CreditCard,
  LogOut,
  Mail,
  Plus,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react"

import { Badge } from "@/components/ui-radix/badge"
import { Button } from "@/components/ui-radix/button"
import { Calendar } from "@/components/ui-radix/calendar"
import { Checkbox } from "@/components/ui-radix/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui-radix/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui-radix/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui-radix/dropdown-menu"
import { Input } from "@/components/ui-radix/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui-radix/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-radix/select"
import { Separator } from "@/components/ui-radix/separator"
import { Skeleton } from "@/components/ui-radix/skeleton"
import { Textarea } from "@/components/ui-radix/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui-radix/tooltip"

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border bg-card p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </header>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function UiRadixShowcasePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [checked, setChecked] = React.useState(true)
  const [bookmarks, setBookmarks] = React.useState(true)
  const [position, setPosition] = React.useState("bottom")

  return (
    <TooltipProvider>
      <div className="fixed inset-0 overflow-y-auto bg-background p-6 md:p-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              shadcn radix UI showcase
            </h1>
            <p className="text-sm text-muted-foreground">
              All components installed in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                components/ui-radix
              </code>
              . Used by the diceui data grid.
            </p>
          </header>

          <Section
            title="Button"
            description="variants: default, secondary, destructive, outline, ghost, link / sizes: sm, default, lg, icon"
          >
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="add">
              <Plus />
            </Button>
            <Button disabled>Disabled</Button>
            <Button>
              <Mail />
              With icon
            </Button>
          </Section>

          <Section
            title="Badge"
            description="variants: default, secondary, destructive, outline, ghost, link"
          >
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
            <Badge>
              <Check />
              Verified
            </Badge>
          </Section>

          <Section title="Input">
            <div className="grid w-full max-w-md gap-3">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Search…" />
              <Input type="file" />
            </div>
          </Section>

          <Section title="Textarea">
            <Textarea
              placeholder="Type your message here."
              className="max-w-md"
            />
          </Section>

          <Section title="Checkbox">
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={checked}
                onCheckedChange={(v) => setChecked(v === true)}
              />
              <label htmlFor="terms" className="text-sm">
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="disabled" disabled />
              <label
                htmlFor="disabled"
                className="text-sm text-muted-foreground"
              >
                Disabled
              </label>
            </div>
          </Section>

          <Section title="Select">
            <Select open={true}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Vegetables</SelectLabel>
                  <SelectItem value="carrot">Carrot</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Section>

          <Section title="Calendar">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Section>

          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-2">
                  <Input placeholder="Name" defaultValue="Pedro Duarte" />
                  <Input placeholder="Username" defaultValue="@peduarte" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Section title="Dropdown menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                    <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={bookmarks}
                  onCheckedChange={setBookmarks}
                >
                  Show bookmarks
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Panel position</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Bottom
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Right
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ChevronRight />
                    More
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Invite users</DropdownMenuItem>
                    <DropdownMenuItem>New team</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          <Section title="Popover">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="mt-3 grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-sm">Width</span>
                    <Input defaultValue="100%" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-sm">Height</span>
                    <Input defaultValue="25px" className="col-span-2 h-8" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </Section>

          <Section title="Tooltip">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="search">
                  <Search />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search the docs</p>
              </TooltipContent>
            </Tooltip>
          </Section>

          <Section title="Command">
            <Command className="max-w-md rounded-lg border shadow-md">
              <CommandInput placeholder="Type a command or search…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <CalendarIcon />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile />
                    <span>Search Emoji</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Section>

          <Section title="Separator">
            <div className="w-full max-w-md">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Radix Primitives</h4>
                <p className="text-sm text-muted-foreground">
                  An open-source UI component library.
                </p>
              </div>
              <Separator className="my-3" />
              <div className="flex h-5 items-center gap-3 text-sm">
                <span>Blog</span>
                <Separator orientation="vertical" />
                <span>Docs</span>
                <Separator orientation="vertical" />
                <span>Source</span>
              </div>
            </div>
          </Section>

          <Section title="Skeleton">
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </TooltipProvider>
  )
}
