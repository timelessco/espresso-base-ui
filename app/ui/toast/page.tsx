"use client"

import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/toast"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function ToastPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => toast.add({ title: "Event has been created" })}
          >
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Event has been created",
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            With description
          </Button>
        </div>
      </div>

      {/* Types */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Types</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                type: "success",
                title: "Changes saved successfully",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ type: "info", title: "New version available" })
            }
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                type: "warning",
                title: "Your session will expire soon",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ type: "error", title: "Failed to save changes" })
            }
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                type: "loading",
                title: "Processing your request",
              })
            }
          >
            Loading
          </Button>
        </div>
      </div>

      {/* With action */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Action</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              const id = toast.add({
                title: "Event has been created",
                description: "Sunday, December 03, 2023 at 9:00 AM",
                actionProps: {
                  children: "Undo",
                  onClick: () => {
                    toast.close(id)
                    toast.add({ title: "Undone" })
                  },
                },
              })
            }}
          >
            Undo action
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const id = toast.add({
                type: "error",
                title: "Failed to save",
                description: "Something went wrong on our end.",
                actionProps: {
                  children: "Retry",
                  onClick: () => {
                    toast.close(id)
                    toast.add({ type: "success", title: "Retrying..." })
                  },
                },
              })
            }}
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
                setTimeout(() => resolve({ name: "Toast" }), 1500)
              )
              toast.promise(promise, {
                loading: "Loading...",
                success: (data) => `${data.name} has been added`,
                error: "Error",
              })
            }}
          >
            Run promise
          </Button>
        </div>
      </div>

      {/* Duration & dismiss */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Duration &amp; Dismiss</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Custom duration",
                description: "This toast stays for 10 seconds",
                timeout: 10000,
              })
            }
          >
            Long duration
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Persistent toast",
                description: "This toast won't auto-dismiss",
                timeout: 0,
              })
            }
          >
            No auto-dismiss
          </Button>
          <Button variant="outline" onClick={() => toast.close()}>
            Dismiss all
          </Button>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
