"use client"

import { toast } from "sonner"
import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function SonnerPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* With prefix icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Prefix Icon</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* Variants */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Variants</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* With action */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Action</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* Promise */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Promise</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* Position */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Position</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* Custom */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Custom</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>
    </div>
  )
}
