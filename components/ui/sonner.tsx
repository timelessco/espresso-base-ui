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
      duration={90000}
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
            "cn-toast data-[styled=true]:px-4! data-[styled=true]:py-2.5! data-[styled=true]:text-base! data-[styled=true]:leading-base! data-[styled=true]:font-medium! data-[styled=true]:tracking-normal! data-[styled=true]:shadow-3xl! data-[styled=true]:border-none! data-[styled=true]:has-[[data-close-button]]:pr-12! data-[styled=true]:gap-2!",
          description:
            "text-primary-foreground! text-base! leading-base! font-medium! tracking-normal!",
          actionButton:
            "bg-transparent! text-[var(--color-blue-400)]! p-0! text-base! leading-base! font-medium! tracking-normal!",
          closeButton:
            "text-primary-foreground! bg-secondary-foreground! border-none! right-4! transform! -translate-y-1/2! left-auto! top-1/2! [transform:translateY(-50%)!important] size-5! p-0.5! [&_svg]:hidden! after:content-[''] after:block after:size-4 after:bg-current after:[mask-image:url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.8563%203.14638C12.6611%202.95125%2012.3445%202.95116%2012.1493%203.14638L8.00192%207.29378L3.85452%203.14638C3.65929%202.95116%203.34276%202.95125%203.14748%203.14638C2.95222%203.34165%202.95222%203.65815%203.14748%203.85342L7.29488%208.00082L3.14638%2012.1493C2.95116%2012.3445%202.95125%2012.6611%203.14638%2012.8563C3.34165%2013.0516%203.65815%2013.0516%203.85342%2012.8563L8.00192%208.70785L12.1504%2012.8563C12.3457%2013.0516%2012.6622%2013.0516%2012.8574%2012.8563C13.0526%2012.6611%2013.0527%2012.3445%2012.8574%2012.1493L8.70895%208.00082L12.8563%203.85342C13.0516%203.65815%2013.0516%203.34165%2012.8563%203.14638Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E')] after:[mask-size:contain] after:[mask-repeat:no-repeat] after:[mask-position:center]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
