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
              This is the main content of the dialog. You can place any
              children here.
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
              <DialogClose render={<Button variant="destructive">Delete</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
