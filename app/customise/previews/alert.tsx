"use client"

import * as React from "react"
import { Info, CircleCheck, CircleX, TriangleAlert, X } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertHandlers,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Alert variant="default">
            <Info />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              This is a default informational alert.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Payment received</AlertTitle>
            <AlertDescription>Your invoice has been paid.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Storage almost full</AlertTitle>
            <AlertDescription>You have used 90% of space.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <CircleX />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Please try again later.</AlertDescription>
          </Alert>
        </div>
      </PreviewCard>

      <PreviewCard label="With actions">
        <div className="flex flex-wrap items-start justify-center gap-3">
          <Alert variant="info" className="w-full max-w-[220px]">
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
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
          <Alert variant="success" className="w-full max-w-[220px]">
            <CircleCheck />
            <AlertTitle>Source added</AlertTitle>
            <AlertDescription>
              Your data source is now connected.
            </AlertDescription>
            <AlertHandlers>
              <Button variant="secondary" size="sm" className="w-full">
                View changes
              </Button>
            </AlertHandlers>
            <AlertAction>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
        </div>
      </PreviewCard>

      <PreviewCard label="Banner">
        <div className="flex w-full max-w-xl flex-col gap-3">
          <Alert type="banner">
            <Info />
            <AlertTitle>Your trial ends soon!</AlertTitle>
            <AlertAction>
              <Button variant="ghost" size="sm">
                Update
              </Button>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
          <Alert type="banner" variant="info">
            <Info />
            <AlertTitle>Your trial ends soon!</AlertTitle>
            <AlertAction>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 dark:text-blue-300"
              >
                Explore now
              </Button>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
          <Alert type="banner" variant="success">
            <CircleCheck />
            <AlertTitle>Source successfully added</AlertTitle>
            <AlertAction>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 dark:text-green-300"
              >
                Explore now
              </Button>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
          <Alert type="banner" variant="warning">
            <TriangleAlert />
            <AlertTitle>Changes will affect all warehouses</AlertTitle>
            <AlertAction>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-600 dark:text-amber-300"
              >
                Confirm
              </Button>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
          <Alert type="banner" variant="destructive">
            <CircleX />
            <AlertTitle>Changes will affect all warehouses</AlertTitle>
            <AlertAction>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 dark:text-red-300"
              >
                Retry
              </Button>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
        </div>
      </PreviewCard>

      <PreviewCard label="Banner — with description">
        <div className="flex w-full max-w-xl flex-col gap-3">
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
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
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
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
          <Alert type="banner" variant="destructive">
            <CircleX />
            <AlertTitle>Failed to save changes</AlertTitle>
            <AlertDescription>
              There was a problem processing your request.
            </AlertDescription>
            <AlertHandlers>
              <Button variant="secondary">Try again</Button>
              <Button variant="ghost">Dismiss</Button>
            </AlertHandlers>
            <AlertAction>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </AlertAction>
          </Alert>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
