"use client"

import * as React from "react"
import { Info } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notify, NotificationToaster } from "@/components/ui/notification"

const noop = () => {}

export default function NotificationPreview() {
  return (
    <>
      <PreviewGrid>
        <PreviewCard label="Inline">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "default",
                title: "Update available. Get new features!",
                prefix: <Info />,
                showClose: true,
              })
            }
          >
            Icon + close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "default",
                title: "Update available. Get new features!",
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
              })
            }
          >
            With action
          </Button>
        </PreviewCard>

        <PreviewCard label="Long text">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "banner",
                title: "System Update Available",
                description:
                  "A new update is available. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Dual action
          </Button>
        </PreviewCard>

        <PreviewCard label="Notification">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "avatar",
                title: "Jane Johnson",
                description: "Your task is due tomorrow",
                timestamp: "28 min ago",
                prefix: (
                  <Avatar size="xl">
                    <AvatarImage src="https://i.pravatar.cc/40?img=47" />
                    <AvatarFallback>JJ</AvatarFallback>
                  </Avatar>
                ),
                unread: true,
              })
            }
          >
            Unread
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "avatar",
                title: "Jane Johnson",
                description: "Your task is due tomorrow",
                timestamp: "28 min ago",
                prefix: (
                  <Avatar size="xl">
                    <AvatarImage src="https://i.pravatar.cc/40?img=47" />
                    <AvatarFallback>JJ</AvatarFallback>
                  </Avatar>
                ),
                actionType: "dual",
                actions: [
                  { label: "Join", onClick: noop },
                  { label: "Decline", onClick: noop },
                ],
              })
            }
          >
            With actions
          </Button>
        </PreviewCard>

        <PreviewCard label="Modal">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "compact",
                title: "System Update Available",
                description:
                  "A new update is available. Update now to enjoy new features and improvements.",
                actionType: "single",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Update now", onClick: noop },
                ],
              })
            }
          >
            Stacked
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "compact",
                title: "System Update Available",
                description:
                  "A new update is available. Update now to enjoy new features and improvements.",
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Side by side
          </Button>
        </PreviewCard>
      </PreviewGrid>

      <NotificationToaster />
    </>
  )
}
