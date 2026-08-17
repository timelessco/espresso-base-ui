"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function DialogPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Dialog>
          <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>
                A short description of the dialog contents.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              This is the main content of the dialog.
            </p>
          </DialogContent>
        </Dialog>
      </PreviewCard>

      <PreviewCard label="With form">
        <Dialog>
          <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here.
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
      </PreviewCard>

      <PreviewCard label="Confirm destructive">
        <Dialog>
          <DialogTrigger
            render={
              <Button variant="destructive">
                <Trash2 />
                Delete account
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button variant="destructive">Delete</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PreviewCard>

      <PreviewCard label="Sizes">
        {(["sm", "default", "lg"] as const).map((size) => (
          <Dialog key={size}>
            <DialogTrigger render={<Button variant="outline">{size}</Button>} />
            <DialogContent size={size}>
              <DialogHeader>
                <DialogTitle>Size = {size}</DialogTitle>
                <DialogDescription>
                  This dialog uses the {size} size variant.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </PreviewCard>
    </PreviewGrid>
  )
}
