"use client"

import * as React from "react"
import { User, Lock, Settings, Bell } from "lucide-react"
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
      <PreviewCard label="Subtle — sm">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList size="sm">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">
              Password settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Subtle — default">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList size="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">
              Password settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Line — sm">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="line" size="sm">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Line — default">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="line" size="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Ghost — sm">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="ghost" size="sm">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Ghost — default">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList variant="ghost" size="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Browser — sm">
        <Tabs defaultValue="tab-3" className="w-full max-w-md">
          <TabsList variant="browser" size="sm">
            <TabsTrigger value="tab-1">Tab</TabsTrigger>
            <TabsTrigger value="tab-2">Tab</TabsTrigger>
            <TabsTrigger value="tab-3">Tab</TabsTrigger>
            <TabsTrigger value="tab-4">Tab</TabsTrigger>
            <TabsTrigger value="tab-5">Tab</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Browser — default">
        <Tabs defaultValue="tab-3" className="w-full max-w-md">
          <TabsList variant="browser" size="default">
            <TabsTrigger value="tab-1">Tab</TabsTrigger>
            <TabsTrigger value="tab-2">Tab</TabsTrigger>
            <TabsTrigger value="tab-3">Tab</TabsTrigger>
            <TabsTrigger value="tab-4">Tab</TabsTrigger>
            <TabsTrigger value="tab-5">Tab</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="With Icons">
        <Tabs defaultValue="tab-1" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="tab-1">
              <User /> Account
            </TabsTrigger>
            <TabsTrigger value="tab-2">
              <Lock /> Password
            </TabsTrigger>
            <TabsTrigger value="tab-3">
              <Settings /> Settings
            </TabsTrigger>
            <TabsTrigger value="tab-4">
              <Bell /> Notifications
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">
              Password settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-4">
            <p className="text-sm text-muted-foreground">
              Notification settings content.
            </p>
          </TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="With Icons — Line">
        <Tabs defaultValue="tab-1" className="w-full max-w-md">
          <TabsList variant="line">
            <TabsTrigger value="tab-1">
              <User /> Account
            </TabsTrigger>
            <TabsTrigger value="tab-2">
              <Lock /> Password
            </TabsTrigger>
            <TabsTrigger value="tab-3">
              <Settings /> Settings
            </TabsTrigger>
            <TabsTrigger value="tab-4">
              <Bell /> Notifications
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Icon Only">
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">
              <User />
            </TabsTrigger>
            <TabsTrigger value="tab-2">
              <Lock />
            </TabsTrigger>
            <TabsTrigger value="tab-3">
              <Settings />
            </TabsTrigger>
            <TabsTrigger value="tab-4">
              <Bell />
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Disabled Tab">
        <Tabs defaultValue="tab-1" className="w-full max-w-sm">
          <TabsList>
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>
              Password
            </TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Vertical">
        <Tabs defaultValue="tab-1" orientation="vertical">
          <TabsList>
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">
              Password settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
        </Tabs>
      </PreviewCard>

      <PreviewCard label="Vertical — Line">
        <Tabs defaultValue="tab-1" orientation="vertical">
          <TabsList variant="line">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">
              Password settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
        </Tabs>
      </PreviewCard>
    </PreviewGrid>
  )
}
