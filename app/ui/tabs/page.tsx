"use client"

import { User, Lock, Settings, Bell } from "lucide-react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsIndicator,
  TabsContent,
} from "@/components/ui/tabs"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function TabsPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default Variant — sm */}
      <div className="flex flex-col gap-4">
        <SectionTitle>subtle — sm</SectionTitle>
        <Tabs defaultValue="tab-1">
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
      </div>

      {/* Default Variant — default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>subtle — default</SectionTitle>
        <Tabs defaultValue="tab-1">
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
      </div>

      {/* Outline — sm & default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Outline — sm</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="outline" size="sm">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col gap-4">
        <SectionTitle>Outline — default</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="outline" size="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>

      {/* Line — sm & default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Line — sm</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="line" size="sm">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col gap-4">
        <SectionTitle>Line — default</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="line" size="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>

      {/* Ghost — sm & default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Ghost — sm</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="ghost" size="sm">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col gap-4">
        <SectionTitle>Ghost — default</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="ghost" size="default">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>

      {/* Browser — sm & default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Browser — sm</SectionTitle>
        <Tabs defaultValue="tab-3">
          <TabsList variant="browser" size="sm">
            <TabsTrigger value="tab-1">Tab</TabsTrigger>
            <TabsTrigger value="tab-2">Tab</TabsTrigger>
            <TabsTrigger value="tab-3">Tab</TabsTrigger>
            <TabsTrigger value="tab-4">Tab</TabsTrigger>
            <TabsTrigger value="tab-5">Tab</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col gap-4">
        <SectionTitle>Browser — default</SectionTitle>
        <Tabs defaultValue="tab-3">
          <TabsList variant="browser" size="default">
            <TabsTrigger value="tab-1">Tab</TabsTrigger>
            <TabsTrigger value="tab-2">Tab</TabsTrigger>
            <TabsTrigger value="tab-3">Tab</TabsTrigger>
            <TabsTrigger value="tab-4">Tab</TabsTrigger>
            <TabsTrigger value="tab-5">Tab</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons</SectionTitle>
        <Tabs defaultValue="tab-1">
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
      </div>

      {/* With Icons — Line */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons — Line</SectionTitle>
        <Tabs defaultValue="tab-1">
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
      </div>

      {/* Icon Only */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Icon Only</SectionTitle>
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
      </div>

      {/* Line Variant */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Line Variant</SectionTitle>
        <Tabs defaultValue="tab-1">
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
      </div>

      {/* Disabled Tab */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Tab</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>
              Password
            </TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Disabled Tab — Line */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Tab — Line</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="line">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>
              Password
            </TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">
              Account settings content.
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">
              General settings content.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical</SectionTitle>
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
      </div>

      {/* Vertical — Line */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical — Line</SectionTitle>
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
      </div>

      {/* All Variants Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All Variants</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Variant
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Horizontal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Vertical
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Default
                </td>
                <td className="px-4 py-3">
                  <Tabs>
                    <TabsList>
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs orientation="vertical">
                    <TabsList>
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Line
                </td>
                <td className="px-4 py-3">
                  <Tabs>
                    <TabsList variant="line">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs orientation="vertical">
                    <TabsList variant="line">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Outline
                </td>
                <td className="px-4 py-3">
                  <Tabs>
                    <TabsList variant="outline">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs orientation="vertical">
                    <TabsList variant="outline">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Ghost
                </td>
                <td className="px-4 py-3">
                  <Tabs>
                    <TabsList variant="ghost">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs orientation="vertical">
                    <TabsList variant="ghost">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Browser
                </td>
                <td className="px-4 py-3">
                  <Tabs>
                    <TabsList variant="browser">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs orientation="vertical">
                    <TabsList variant="browser">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                      <TabsIndicator />
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
