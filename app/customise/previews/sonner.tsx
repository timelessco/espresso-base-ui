"use client"

import * as React from "react"
import { toast } from "sonner"
import { BellIcon } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

export default function SonnerPreview() {
  return (
    <>
      <Toaster />
      <PreviewGrid>
        <PreviewCard label="Basic">
          <Button
            variant="outline"
            onClick={() => toast("Event has been created")}
          >
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            With description
          </Button>
        </PreviewCard>

        <PreviewCard label="With prefix icon">
          <Button
            variant="outline"
            onClick={() =>
              toast("You have a new notification", {
                icon: <BellIcon className="size-4" />,
              })
            }
          >
            Notification
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Dismissible notification", {
                duration: 90000,
                icon: <BellIcon className="size-4" />,
                closeButton: true,
              })
            }
          >
            With close icon
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => toast("Undone"),
                },
                closeButton: true,
              })
            }
          >
            Close + Action
          </Button>
        </PreviewCard>

        <PreviewCard label="Variants">
          <Button
            variant="outline"
            onClick={() => toast.success("Changes saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("New version available")}
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Your session will expire soon")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Failed to save changes")}
          >
            Error
          </Button>
        </PreviewCard>

        <PreviewCard label="With action">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => toast("Undone"),
                },
              })
            }
          >
            Undo action
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Failed to save", {
                description: "Something went wrong on our end.",
                action: {
                  label: "Retry",
                  onClick: () => toast.success("Retrying..."),
                },
              })
            }
          >
            Retry action
          </Button>
        </PreviewCard>

        <PreviewCard label="Promise">
          <Button
            variant="outline"
            onClick={() => {
              const promise = new Promise<{ name: string }>((resolve) =>
                setTimeout(() => resolve({ name: "Sonner" }), 1500)
              )
              toast.promise(promise, {
                loading: "Loading...",
                success: (data) => `${data.name} toast has been added`,
                error: "Error",
              })
            }}
          >
            Run promise
          </Button>
        </PreviewCard>

        <PreviewCard label="Position">
          <Button
            variant="outline"
            onClick={() => toast("Top left", { position: "top-left" })}
          >
            Top left
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Top center", { position: "top-center" })}
          >
            Top center
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Top right", { position: "top-right" })}
          >
            Top right
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Bottom left", { position: "bottom-left" })}
          >
            Bottom left
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Bottom center", { position: "bottom-center" })
            }
          >
            Bottom center
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Bottom right", { position: "bottom-right" })}
          >
            Bottom right
          </Button>
        </PreviewCard>

        <PreviewCard label="Custom">
          <Button
            variant="outline"
            onClick={() =>
              toast("Custom duration", {
                description: "This toast stays for 10 seconds",
                duration: 10000,
              })
            }
          >
            Long duration
          </Button>
          <Button variant="outline" onClick={() => toast.dismiss()}>
            Dismiss all
          </Button>
        </PreviewCard>
      </PreviewGrid>
    </>
  )
}
