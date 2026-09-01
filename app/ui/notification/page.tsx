"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { notify, NotificationToaster } from "@/components/ui/notification"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const noop = () => {}

export default function NotificationPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "default",
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
                variant: "default",
                title: "Update available. Get new features!",
                showClose: true,
              })
            }
          >
            With close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "default",
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
                variant: "default",
                title: "Update available. Get new features!",
                prefix: <Info />,
                showClose: true,
              })
            }
          >
            Icon + close
          </Button>
        </div>
      </div>

      {/* Default with action */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default — With Action</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
            Action
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "default",
                title: "Update available. Get new features!",
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
                showClose: true,
              })
            }
          >
            Action + close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "default",
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
                variant: "default",
                title: "Update available. Get new features!",
                prefix: <Info />,
                actionType: "single",
                actions: [{ label: "Update", onClick: noop }],
                showClose: true,
              })
            }
          >
            Icon + action + close
          </Button>
        </div>
      </div>

      {/* Banner */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Banner</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "banner",
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
                variant: "banner",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                showClose: true,
              })
            }
          >
            With close
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "banner",
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
                variant: "banner",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                showClose: true,
              })
            }
          >
            Icon + close
          </Button>
        </div>
      </div>

      {/* Banner with actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Banner — With Actions</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "banner",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                actionType: "single",
                actions: [{ label: "Update now", onClick: noop }],
              })
            }
          >
            Single action
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "banner",
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
                variant: "banner",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                showClose: true,
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
                variant: "banner",
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
                variant: "banner",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                prefix: <Info />,
                showClose: true,
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

      {/* Avatar */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Avatar</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
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
                showClose: true,
              })
            }
          >
            With close
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
                showClose: true,
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

      {/* Compact */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Compact</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "compact",
                title: "System Update Available",
                description:
                  "A new update is available for the app. Update now to enjoy new features and improvements.",
                actionType: "single",
                actions: [{ label: "Update now", onClick: noop }],
              })
            }
          >
            Single
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                variant: "compact",
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

      <NotificationToaster />
    </div>
  )
}
