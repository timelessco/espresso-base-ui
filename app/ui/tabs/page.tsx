"use client"

import { User, Lock, Settings, Bell } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function TabsPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1"><User /> Account</TabsTrigger>
            <TabsTrigger value="tab-2"><Lock /> Password</TabsTrigger>
            <TabsTrigger value="tab-3"><Settings /> Settings</TabsTrigger>
            <TabsTrigger value="tab-4"><Bell /> Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
          <TabsContent value="tab-4">
            <p className="text-sm text-muted-foreground">Notification settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* With Icons — Line */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Icons — Line</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="line">
            <TabsTrigger value="tab-1"><User /> Account</TabsTrigger>
            <TabsTrigger value="tab-2"><Lock /> Password</TabsTrigger>
            <TabsTrigger value="tab-3"><Settings /> Settings</TabsTrigger>
            <TabsTrigger value="tab-4"><Bell /> Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
          <TabsContent value="tab-4">
            <p className="text-sm text-muted-foreground">Notification settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Outline Variant */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Outline Variant</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="outline">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Outline with Icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Outline with Icons</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="outline">
            <TabsTrigger value="tab-1"><User /> Account</TabsTrigger>
            <TabsTrigger value="tab-2"><Lock /> Password</TabsTrigger>
            <TabsTrigger value="tab-3"><Settings /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ghost Variant */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Ghost Variant</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="ghost">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Browser Variant */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Browser Variant</SectionTitle>
        <Tabs defaultValue="tab-3">
          <TabsList variant="browser">
            <TabsTrigger value="tab-1">Tab</TabsTrigger>
            <TabsTrigger value="tab-2">Tab</TabsTrigger>
            <TabsTrigger value="tab-3">Tab</TabsTrigger>
            <TabsTrigger value="tab-4">Tab</TabsTrigger>
            <TabsTrigger value="tab-5">Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Tab 1 content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Tab 2 content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">Tab 3 content.</p>
          </TabsContent>
          <TabsContent value="tab-4">
            <p className="text-sm text-muted-foreground">Tab 4 content.</p>
          </TabsContent>
          <TabsContent value="tab-5">
            <p className="text-sm text-muted-foreground">Tab 5 content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Icon Only */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Icon Only</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1"><User /></TabsTrigger>
            <TabsTrigger value="tab-2"><Lock /></TabsTrigger>
            <TabsTrigger value="tab-3"><Settings /></TabsTrigger>
            <TabsTrigger value="tab-4"><Bell /></TabsTrigger>
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
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Disabled Tab */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Tab</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Disabled Tab — Line */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Tab — Line</SectionTitle>
        <Tabs defaultValue="tab-1">
          <TabsList variant="line">
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>Password</TabsTrigger>
            <TabsTrigger value="tab-3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
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
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
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
          </TabsList>
          <TabsContent value="tab-1">
            <p className="text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-sm text-muted-foreground">Password settings content.</p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-sm text-muted-foreground">General settings content.</p>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Variant</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Horizontal</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Vertical</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Default</td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1">
                    <TabsList>
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1" orientation="vertical">
                    <TabsList>
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Line</td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1">
                    <TabsList variant="line">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1" orientation="vertical">
                    <TabsList variant="line">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Outline</td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1">
                    <TabsList variant="outline">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1" orientation="vertical">
                    <TabsList variant="outline">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Ghost</td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1">
                    <TabsList variant="ghost">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1" orientation="vertical">
                    <TabsList variant="ghost">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Browser</td>
                <td className="px-4 py-3">
                  <Tabs defaultValue="t1">
                    <TabsList variant="browser">
                      <TabsTrigger value="t1">Tab 1</TabsTrigger>
                      <TabsTrigger value="t2">Tab 2</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
