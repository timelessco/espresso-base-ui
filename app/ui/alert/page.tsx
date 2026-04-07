"use client"

import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertButton,
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
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Vertical (default)</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>Your trial end soon!</AlertTitle>
          <AlertDescription>Upgrade to keep enjoying features.</AlertDescription>
          <AlertButton>
            <Button variant="outline" className="w-full">Update now</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
      </div>

      {/* Vertical — Variants */}
      <div className="flex max-w-xs flex-col gap-4">
        <SectionTitle>Vertical — Variants</SectionTitle>
        <Alert variant="default">
          <Info />
          <AlertTitle>Default alert</AlertTitle>
          <AlertDescription>This is a default vertical alert.</AlertDescription>
          <AlertButton>
            <Button variant="outline" className="w-full">Take action</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert variant="info">
          <Info />
          <AlertTitle>Info alert</AlertTitle>
          <AlertDescription>This is an info vertical alert.</AlertDescription>
          <AlertButton>
            <Button variant="outline" className="w-full">Learn more</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert variant="warning">
          <TriangleAlert />
          <AlertTitle>Warning alert</AlertTitle>
          <AlertDescription>This is a warning vertical alert.</AlertDescription>
          <AlertButton>
            <Button variant="outline" className="w-full">Review</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Destructive alert</AlertTitle>
          <AlertDescription>This is a destructive vertical alert.</AlertDescription>
          <AlertButton>
            <Button variant="outline" className="w-full">Try again</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
      </div>

      {/* Banner (horizontal) */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Banner (horizontal)</SectionTitle>
        <Alert type="banner">
          <AlertTitle>Your trial ends soon!</AlertTitle>
          <AlertAction>
            <X className="size-4" />
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
          <AlertButton>
            <Button>Explore now</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="success">
          <CheckCircle2 />
          <AlertTitle>Changes saved successfully</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
          <AlertButton>
            <Button>View changes</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="info">
          <Info />
          <AlertTitle>New Feature Available</AlertTitle>
          <AlertDescription>
            Discover the new feature to enhance your experience.
          </AlertDescription>
          <AlertButton>
            <Button>Explore now</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="warning">
          <TriangleAlert />
          <AlertTitle>Subscription expiring soon</AlertTitle>
          <AlertDescription>
            Your subscription will expire in 7 days.
          </AlertDescription>
          <AlertButton>
            <Button>Renew now</Button>
            <Button variant="ghost">Remind me later</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
        <Alert type="banner" variant="destructive">
          <AlertCircle />
          <AlertTitle>Failed to save changes</AlertTitle>
          <AlertDescription>
            There was a problem processing your request.
          </AlertDescription>
          <AlertButton>
            <Button>Try again</Button>
            <Button variant="ghost">Dismiss</Button>
          </AlertButton>
          <AlertAction>
            <X className="size-4" />
          </AlertAction>
        </Alert>
      </div>
    </div>
  )
}
