"use client"

import * as React from "react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsIndicator,
  TabsContent,
} from "@/components/ui/tabs"

export default function TabsPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">Account content.</TabsContent>
          <TabsContent value="tab-2">Password content.</TabsContent>
          <TabsContent value="tab-3">Settings content.</TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Line">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="line">
            <TabsTrigger value="tab-1">Overview</TabsTrigger>
            <TabsTrigger value="tab-2">Analytics</TabsTrigger>
            <TabsTrigger value="tab-3">Reports</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">Overview content.</TabsContent>
          <TabsContent value="tab-2">Analytics content.</TabsContent>
          <TabsContent value="tab-3">Reports content.</TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Ghost">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="ghost">
            <TabsTrigger value="tab-1">One</TabsTrigger>
            <TabsTrigger value="tab-2">Two</TabsTrigger>
            <TabsTrigger value="tab-3">Three</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">First panel.</TabsContent>
          <TabsContent value="tab-2">Second panel.</TabsContent>
          <TabsContent value="tab-3">Third panel.</TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Browser">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="browser">
            <TabsTrigger value="tab-1">Home</TabsTrigger>
            <TabsTrigger value="tab-2">Docs</TabsTrigger>
            <TabsTrigger value="tab-3">API</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">Home content.</TabsContent>
          <TabsContent value="tab-2">Docs content.</TabsContent>
          <TabsContent value="tab-3">API content.</TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Tabs defaultValue="tab-1">
            <TabsList size="sm">
              <TabsTrigger value="tab-1">Small</TabsTrigger>
              <TabsTrigger value="tab-2">Tabs</TabsTrigger>
              <TabsIndicator />
            </TabsList>
          </Tabs>
          <Tabs defaultValue="tab-1">
            <TabsList size="default">
              <TabsTrigger value="tab-1">Default</TabsTrigger>
              <TabsTrigger value="tab-2">Tabs</TabsTrigger>
              <TabsIndicator />
            </TabsList>
          </Tabs>
        </div>
      </PreviewCard>

      <PreviewCard label="Disabled tab">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="default">
            <TabsTrigger value="tab-1">Active</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>
              Disabled
            </TabsTrigger>
            <TabsTrigger value="tab-3">Enabled</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>
    </PreviewGrid>
  )
}
