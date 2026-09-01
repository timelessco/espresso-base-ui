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

import { DocsSearch } from "./_components/docs-search"
import { DocsToc } from "./_components/docs-toc"
import { docsComponents, docsGettingStarted } from "./_components/nav"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}

function DocsSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center pt-1 pl-2">
          <Link
            href="/"
            className="text-base font-semibold text-foreground"
            onClick={closeMobileSidebar}
          >
            Espresso UI
          </Link>
        </div>
        <div className="px-1 pt-1 md:hidden">
          <DocsSearch />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {docsGettingStarted.map((item) => (
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
    [...docsGettingStarted, ...docsComponents].find(
      (item) => item.href === pathname
    )?.label ?? "Docs"

  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset className="relative flex h-screen min-w-0 flex-col overflow-hidden">
        {/* Mobile-only header: sidebar toggle left, page name centered,
            theme toggle right. */}
        <header className="relative flex h-12 shrink-0 items-center justify-between border-b border-border-soft bg-background px-2 md:hidden">
          <SidebarTrigger />
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-base font-medium text-foreground">
            {activeComponent}
          </span>
          <ThemeToggle />
        </header>
        {/* Desktop header: docs search centered, theme toggle top-right. */}
        <header className="relative hidden h-14 shrink-0 items-center justify-center bg-background px-6 md:flex">
          <DocsSearch className="max-w-sm" />
          <div className="absolute right-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex min-h-0 flex-1">
          <main
            id="docs-scroll-container"
            className="scrollbar-hide min-h-0 min-w-0 flex-1 overflow-auto"
          >
            {children}
          </main>
          <div className="hidden xl:block">
            <DocsToc />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
