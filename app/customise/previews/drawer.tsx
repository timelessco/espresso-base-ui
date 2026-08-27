"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function DrawerPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <Drawer>
          <DrawerTrigger
            render={<Button variant="outline">Open drawer</Button>}
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer title</DrawerTitle>
              <DrawerDescription>
                A short description of the drawer contents.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-sm text-muted-foreground">
              This is the main content of the drawer. Drag it down or press the
              close button to dismiss.
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose
                render={<Button variant="outline">Cancel</Button>}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PreviewCard>

      <PreviewCard label="Directions">
        {(["down", "up", "left", "right"] as const).map((direction) => (
          <Drawer key={direction} swipeDirection={direction} showSwipeHandle>
            <DrawerTrigger
              render={
                <Button variant="outline" className="capitalize">
                  {direction}
                </Button>
              }
            />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="capitalize">
                  {direction} drawer
                </DrawerTitle>
                <DrawerDescription>
                  Slides in from the {direction}.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 text-sm text-muted-foreground">
                Content for the {direction} drawer.
              </div>
              <DrawerFooter>
                <DrawerClose
                  render={<Button variant="outline">Close</Button>}
                />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </PreviewCard>

      <PreviewCard label="Snap points">
        <Drawer snapPoints={[0.4, 1]} showSwipeHandle>
          <DrawerTrigger
            render={<Button variant="outline">Open with snap points</Button>}
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Snap points</DrawerTitle>
              <DrawerDescription>
                Drag to snap between 40% and full height.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 overflow-y-auto p-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  Scrollable row {i + 1}.
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PreviewCard>

      <PreviewCard label="With form">
        <Drawer>
          <DrawerTrigger
            render={<Button variant="outline">Edit profile</Button>}
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 p-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="Sally Potter" />
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input defaultValue="@sally" />
              </Field>
            </div>
            <DrawerFooter>
              <Button>Save changes</Button>
              <DrawerClose
                render={<Button variant="outline">Cancel</Button>}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PreviewCard>
    </PreviewGrid>
  )
}
