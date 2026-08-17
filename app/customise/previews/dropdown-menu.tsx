"use client"

import * as React from "react"
import {
  Bold,
  Cloud,
  CreditCard,
  Github,
  Italic,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Underline,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function DropdownMenuPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Open Menu</Button>} />
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard />
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users />
                Team
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus />
                  Invite users
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare />
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle />
                    More...
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus />
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github />
              GitHub
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cloud />
              API
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewCard>

      <PreviewCard label="Sizes">
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <DropdownMenu key={size}>
            <DropdownMenuTrigger render={<Button variant="outline">{size}</Button>} />
            <DropdownMenuContent size={size} className="w-48">
              <DropdownMenuItem>
                <User />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </PreviewCard>

      <PreviewCard label="Simple">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Simple Menu</Button>} />
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>Option One</DropdownMenuItem>
            <DropdownMenuItem>Option Two</DropdownMenuItem>
            <DropdownMenuItem>Option Three</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewCard>

      <PreviewCard label="With icons & shortcuts">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">With Icons</Button>} />
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <Bold />
              Bold
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Italic />
              Italic
              <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Underline />
              Underline
              <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewCard>
    </PreviewGrid>
  )
}
