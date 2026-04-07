"use client"

import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import {
  Alert,
  AlertAction,
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
      {/* Default */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>

      {/* Destructive */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Destructive</SectionTitle>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </div>

      {/* With Icon */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>With Icon</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is an informational alert with an icon.
          </AlertDescription>
        </Alert>
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
        <Alert>
          <TriangleAlert />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Your subscription will expire in 7 days.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem processing your request.
          </AlertDescription>
        </Alert>
      </div>

      {/* Title Only */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Title Only</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>This is a simple alert with only a title.</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Something went wrong.</AlertTitle>
        </Alert>
      </div>

      {/* With Action */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>With Action</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>New update available</AlertTitle>
          <AlertDescription>
            A new version of the app is available. Please refresh.
          </AlertDescription>
          <AlertAction>
            <Button variant="ghost" size="icon-xs">
              <X />
            </Button>
          </AlertAction>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Failed to save</AlertTitle>
          <AlertDescription>
            Could not save your changes. Try again.
          </AlertDescription>
          <AlertAction>
            <Button variant="ghost" size="icon-xs">
              <X />
            </Button>
          </AlertAction>
        </Alert>
      </div>

      {/* With Link */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>With Link</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>Documentation updated</AlertTitle>
          <AlertDescription>
            Check the latest changes in our <a href="#">documentation</a>.
          </AlertDescription>
        </Alert>
      </div>

      {/* Long Content */}
      <div className="flex max-w-xl flex-col gap-4">
        <SectionTitle>Long Content</SectionTitle>
        <Alert>
          <Info />
          <AlertTitle>
            This is a longer alert with multiple paragraphs
          </AlertTitle>
          <AlertDescription>
            <p>
              This alert demonstrates how the component handles longer content
              that spans multiple lines and paragraphs.
            </p>
            <p>
              You can include any content inside the description, including
              links, lists, and other inline elements.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
