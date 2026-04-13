"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
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

export default function DialogPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline">Open dialog</Button>}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>
                A short description of the dialog contents.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              This is the main content of the dialog. You can place any children
              here.
            </p>
          </DialogContent>
        </Dialog>
      </div>

      {/* With form */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Form</SectionTitle>
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline">Edit profile</Button>}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input defaultValue="@peduarte" />
              </Field>
            </div>
            <DialogFooter showCloseButton>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Confirm / destructive */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Confirm Destructive</SectionTitle>
        <Dialog>
          <DialogTrigger
            render={<Button variant="destructive">Delete account</Button>}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose
                render={<Button variant="destructive">Delete</Button>}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* With Tabs */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Tabs</SectionTitle>
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline">Account settings</Button>}
          />
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Account settings</DialogTitle>
              <DialogDescription>
                Manage your account preferences and profile information.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="profile">
              <TabsList className={"w-full"}>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsIndicator />
              </TabsList>
              <TabsContent value="profile">
                <div className="flex flex-col gap-3 pt-4">
                  <Field>
                    <FieldLabel>Display name</FieldLabel>
                    <Input defaultValue="Pedro Duarte" />
                  </Field>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input defaultValue="pedro@example.com" type="email" />
                  </Field>
                  <Field>
                    <FieldLabel>Bio</FieldLabel>
                    <Input defaultValue="Design engineer at Acme" />
                  </Field>
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div className="flex flex-col gap-3 pt-4">
                  <Field>
                    <FieldLabel>Current password</FieldLabel>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>New password</FieldLabel>
                    <Input type="password" placeholder="Enter new password" />
                  </Field>
                  <Field>
                    <FieldLabel>Confirm password</FieldLabel>
                    <Input type="password" placeholder="Confirm new password" />
                  </Field>
                </div>
              </TabsContent>
              <TabsContent value="notifications">
                <div className="flex flex-col gap-2 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Choose how you want to be notified about updates.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Email notifications are sent to your primary email address.
                    Push notifications appear on your device.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter showCloseButton>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Small (sm)</Button>}
            />
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Small dialog</DialogTitle>
                <DialogDescription>
                  This dialog uses the sm size variant (max-w-sm).
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Default</Button>}
            />
            <DialogContent size="default">
              <DialogHeader>
                <DialogTitle>Default dialog</DialogTitle>
                <DialogDescription>
                  This dialog uses the default size variant (max-w-md).
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Large (lg)</Button>}
            />
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Large dialog</DialogTitle>
                <DialogDescription>
                  This dialog uses the lg size variant (max-w-2xl). Ideal for
                  forms or content that needs more horizontal space.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Without close button */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Without Close Button</SectionTitle>
        <Dialog>
          <DialogTrigger render={<Button variant="outline">Open</Button>} />
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Custom close handling</DialogTitle>
              <DialogDescription>
                The top-right close button is hidden — dismiss via the footer
                action.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button>Got it</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
