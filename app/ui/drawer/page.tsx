"use client"

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
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function DrawerPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col items-start gap-4">
        <SectionTitle>Basic</SectionTitle>
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
      </div>

      {/* Directions */}
      <div className="flex flex-col items-start gap-4">
        <SectionTitle>Directions</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
                    Slides in from the {direction}. Swipe toward the {direction}{" "}
                    edge to dismiss.
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
        </div>
      </div>

      {/* With swipe handle */}
      <div className="flex flex-col items-start gap-4">
        <SectionTitle>With Swipe Handle</SectionTitle>
        <Drawer showSwipeHandle>
          <DrawerTrigger
            render={<Button variant="outline">Open with handle</Button>}
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Grab and drag</DrawerTitle>
              <DrawerDescription>
                The handle at the top hints that the drawer is draggable.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-sm text-muted-foreground">
              Drag the handle down to dismiss, or use the close button.
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Snap points */}
      <div className="flex flex-col items-start gap-4">
        <SectionTitle>Snap Points</SectionTitle>
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
                  Scrollable row {i + 1} — expand the drawer to full height to
                  read everything.
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* With form */}
      <div className="flex flex-col items-start gap-4">
        <SectionTitle>With Form</SectionTitle>
        <Drawer>
          <DrawerTrigger
            render={<Button variant="outline">Edit profile</Button>}
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 p-4">
              <Field>
                <FieldLabel htmlFor="drawer-name">Name</FieldLabel>
                <Input id="drawer-name" defaultValue="Sally Potter" />
              </Field>
              <Field>
                <FieldLabel htmlFor="drawer-username">Username</FieldLabel>
                <Input id="drawer-username" defaultValue="@sally" />
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
      </div>
    </div>
  )
}
