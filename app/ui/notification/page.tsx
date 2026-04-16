"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { notify } from "@/components/ui/notification"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const noop = () => {}

export default function NotificationPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Inline */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Inline</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
              })
            }
          >
            Simple
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                suffix: true,
              })
            }
          >
            With close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                prefix: <Info />,
              })
            }
          >
            With icon
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                prefix: <Info />,
                suffix: true,
              })
            }
          >
            Icon + close
          </Button>
        </div>
      </div>

      {/* Inline with action */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Inline — With Action</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
              })
            }
          >
            Action
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
                suffix: true,
              })
            }
          >
            Action + close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                prefix: <Info />,
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
              })
            }
          >
            Icon + action
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "inline",
                title: "Update available. Get new features!",
                prefix: <Info />,
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
                suffix: true,
              })
            }
          >
            Icon + action + close
          </Button>
        </div>
      </div>

      {/* Long text */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Long Text</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
              })
            }
          >
            Basic
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                suffix: true,
              })
            }
          >
            With close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
              })
            }
          >
            With icon
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                suffix: true,
              })
            }
          >
            Icon + close
          </Button>
        </div>
      </div>

      {/* Long text with actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Long Text — With Actions</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
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
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                suffix: true,
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Dual + close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Icon + dual
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                suffix: true,
                actionType: "dual",
                actions: [
                  { label: "Update now", onClick: noop },
                  { label: "Later", onClick: noop },
                ],
              })
            }
          >
            Icon + dual + close
          </Button>
        </div>
      </div>

      {/* Long text — Split */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Long Text — Split Action</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "Your trial ends soon!",
                description:
                  "Upgrade now to continue enjoying all features without interruption.",
                actionType: "split",
                actions: [
                  { label: "Update", onClick: noop },
                  { label: "View", onClick: noop },
                ],
              })
            }
          >
            Split
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "long-text",
                title: "Your trial ends soon!",
                description:
                  "Upgrade now to continue enjoying all features without interruption.",
                prefix: <Info />,
                actionType: "split",
                actions: [
                  { label: "Update", onClick: noop },
                  { label: "View", onClick: noop },
                ],
              })
            }
          >
            Split + icon
          </Button>
        </div>
      </div>

      {/* Notification (avatar) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Notification</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "notification",
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
                variant: "notification",
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
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "notification",
                title: "Jane Johnson",
                description: "Your task is due tomorrow",
                timestamp: "28 min ago",
                prefix: (
                  <Avatar size="xl">
                    <AvatarImage src="https://i.pravatar.cc/40?img=47" />
                    <AvatarFallback>JJ</AvatarFallback>
                  </Avatar>
                ),
                suffix: true,
              })
            }
          >
            With close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "notification",
                title: "Jane Johnson",
                description: "Your task is due tomorrow",
                timestamp: "28 min ago",
                prefix: (
                  <Avatar size="xl">
                    <AvatarImage src="https://i.pravatar.cc/40?img=47" />
                    <AvatarFallback>JJ</AvatarFallback>
                  </Avatar>
                ),
                suffix: true,
                actionType: "dual",
                actions: [
                  { label: "Join", onClick: noop },
                  { label: "Decline", onClick: noop },
                ],
              })
            }
          >
            Close + actions
          </Button>
        </div>
      </div>

      {/* Modal */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Modal</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "modal",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
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
                variant: "modal",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
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
        </div>
      </div>
    </div>
  )
}
