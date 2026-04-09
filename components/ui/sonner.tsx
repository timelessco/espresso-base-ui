"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-[var(--color-green-400)]" />
        ),
        info: <InfoIcon className="size-4 text-[var(--color-blue-400)]" />,
        warning: (
          <TriangleAlertIcon className="size-4 text-[var(--color-amber-400)]" />
        ),
        error: <OctagonXIcon className="size-4 text-[var(--color-red-400)]" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--secondary-foreground)",
          "--normal-text": "var(--primary-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast px-4! py-2.5! text-base! leading-base! font-medium! tracking-normal! shadow-3xl! border-none!",
          description:
            "text-primary-foreground! text-base! leading-base! font-medium! tracking-normal!",
          actionButton:
            "bg-transparent! text-[var(--color-blue-400)]! p-0! text-base! leading-base! font-medium! tracking-normal!",
          closeButton:
            "text-primary-foreground! bg-secondary-foreground! border-border-soft!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
