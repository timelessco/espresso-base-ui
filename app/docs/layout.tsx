"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

// Published component docs. Extend as pages are written under
// app/docs/components/<slug>/page.tsx.
const docsComponents = [
  { label: "Alert", href: "/docs/components/alert" },
  { label: "Attachment", href: "/docs/components/attachment" },
  { label: "Avatar", href: "/docs/components/avatar" },
  { label: "Badge", href: "/docs/components/badge" },
  { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
  { label: "Button", href: "/docs/components/button" },
  { label: "Button Group", href: "/docs/components/button-group" },
  { label: "Calendar", href: "/docs/components/calendar" },
  { label: "Card", href: "/docs/components/card" },
  { label: "Chart", href: "/docs/components/chart" },
  { label: "Checkbox", href: "/docs/components/checkbox" },
  { label: "Color Picker", href: "/docs/components/color-picker" },
  { label: "Color Swatch", href: "/docs/components/color-swatch" },
  { label: "Combobox", href: "/docs/components/combobox" },
  { label: "Command", href: "/docs/components/command" },
  { label: "Dialog", href: "/docs/components/dialog" },
  { label: "Drawer", href: "/docs/components/drawer" },
  { label: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
  { label: "Empty", href: "/docs/components/empty" },
  { label: "Field", href: "/docs/components/field" },
  { label: "File Upload", href: "/docs/components/file-upload" },
  { label: "Header", href: "/docs/components/header" },
  { label: "Input", href: "/docs/components/input" },
  { label: "Input Group", href: "/docs/components/input-group" },
  { label: "Input OTP", href: "/docs/components/input-otp" },
  { label: "Item", href: "/docs/components/item" },
  { label: "Kanban", href: "/docs/components/kanban" },
  { label: "Kbd", href: "/docs/components/kbd" },
  { label: "Message", href: "/docs/components/message" },
  { label: "Message Scroller", href: "/docs/components/message-scroller" },
  { label: "Mobile Shell", href: "/docs/components/mobile-shell" },
  { label: "Notification", href: "/docs/components/notification" },
  { label: "Popover", href: "/docs/components/popover" },
  { label: "Progress", href: "/docs/components/progress" },
  { label: "Radio Group", href: "/docs/components/radio-group" },
  { label: "Rating", href: "/docs/components/rating" },
  { label: "Select", href: "/docs/components/select" },
  { label: "Separator", href: "/docs/components/separator" },
  { label: "Sidebar", href: "/docs/components/sidebar" },
  { label: "Slider", href: "/docs/components/slider" },
  { label: "Sonner", href: "/docs/components/sonner" },
  { label: "Spinner", href: "/docs/components/spinner" },
  { label: "Switch", href: "/docs/components/switch" },
  { label: "Table", href: "/docs/components/table" },
  { label: "Tabs", href: "/docs/components/tabs" },
  { label: "Tag", href: "/docs/components/tag" },
  { label: "Textarea", href: "/docs/components/textarea" },
  { label: "Timeline", href: "/docs/components/timeline" },
  { label: "Toast", href: "/docs/components/toast" },
  { label: "Tooltip", href: "/docs/components/tooltip" },
]

function DocsSidebar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { isMobile, setOpenMobile } = useSidebar()

  React.useEffect(() => setMounted(true), [])

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between pt-1 pr-1 pl-2">
          <Link
            href="/"
            className="text-base font-semibold text-foreground"
            onClick={closeMobileSidebar}
          >
            Espresso UI
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {docsComponents.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} />}
                    onClick={closeMobileSidebar}
                  >
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const activeComponent =
    docsComponents.find((item) => item.href === pathname)?.label ?? "Docs"

  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset className="relative flex h-screen min-w-0 flex-col overflow-hidden">
        {/* Mobile-only header: sidebar toggle left, page name centered. */}
        <header className="relative flex h-12 shrink-0 items-center border-b border-border-soft bg-background px-2 md:hidden">
          <SidebarTrigger />
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-base font-medium text-foreground">
            {activeComponent}
          </span>
        </header>
        <main className="scrollbar-hide min-h-0 min-w-0 flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
