"use client"

import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertHandlers,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function AlertPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Vertical (default) */}
      {/* <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Vertical (default)</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>Your trial end soon!</AlertTitle>
          <AlertDescription>
            Upgrade to keep enjoying features.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary" size="sm" className="w-full">
              Update now
            </Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
      </div> */}

      {/* Vertical — Variants */}
      <div className="flex max-w-[204px] flex-col gap-4">
        <SectionTitle>Vertical — Variants</SectionTitle>
        <Alert variant="default">
          <Info />
          <AlertTitle>Your trial ends soon!</AlertTitle>
          <AlertDescription>
            Upgrade to keep enjoying features.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary" size="sm" className="w-full">
              Update now
            </Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert variant="success">
          <CheckCircle2 />
          <AlertTitle>Success alert</AlertTitle>
          <AlertDescription>This is a success vertical alert.</AlertDescription>
          <AlertHandlers>
            <Button variant="secondary" size="sm" className="w-full">
              View changes
            </Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert variant="info">
          <Info />
          <AlertTitle>Maintenance Notice</AlertTitle>
          <AlertDescription>
            Planned maintenance from 12 AM to 3 AM. Some features may be
            unavailable.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary" size="sm" className="w-full">
              Learn more
            </Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert variant="warning">
          <TriangleAlert />
          <AlertTitle>Unsaved Changes</AlertTitle>
          <AlertDescription>
            You have unsaved work. Save before navigating away to prevent data
            loss.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary" size="sm" className="w-full">
              Save Now
            </Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Unsaved Changes</AlertTitle>
          <AlertDescription>
            You have unsaved work. Save before navigating away to prevent data
            loss.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary" size="sm" className="w-full">
              Retry
            </Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
      </div>

      {/* Banner (horizontal) */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Banner (horizontal)</SectionTitle>
        <Alert type="banner">
          <AlertTitle>Your trial ends soon!</AlertTitle>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
      </div>

      {/* Banner — Variants with Buttons */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Banner — Variants</SectionTitle>
        <Alert type="banner" variant="default">
          <Info />
          <AlertTitle>New Feature Available</AlertTitle>
          <AlertDescription>
            Discover the new feature to enhance your experience.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary">Explore now</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="success">
          <CheckCircle2 />
          <AlertTitle>Changes saved successfully</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
          <AlertHandlers>
            <Button variant="secondary">View changes</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="info">
          <Info />
          <AlertTitle>New Feature Available</AlertTitle>
          <AlertDescription>
            Discover the new feature to enhance your experience.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary">Explore now</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="warning">
          <TriangleAlert />
          <AlertTitle>Subscription expiring soon</AlertTitle>
          <AlertDescription>
            Your subscription will expire in 7 days.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary">Renew now</Button>
            <Button variant="ghost">Remind me later</Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="destructive">
          <AlertCircle />
          <AlertTitle>Failed to save changes</AlertTitle>
          <AlertDescription>
            There was a problem processing your request.
          </AlertDescription>
          <AlertHandlers>
            <Button variant="secondary">Try again</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertHandlers>
          <AlertAction>
            <X />
          </AlertAction>
        </Alert>
      </div>
    </div>
  )
}
