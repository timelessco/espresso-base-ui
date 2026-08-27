"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import {
  MediaController,
  MediaControlBar,
  MediaDurationDisplay,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
} from "media-chrome/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl bg-secondary text-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[[data-slot=attachment-media][data-variant=link]]:h-47.5 has-[[data-slot=attachment-media][data-variant=link]]:w-55 has-[[data-slot=attachment-media][data-variant=link]]:flex-nowrap has-[[data-slot=attachment-media][data-variant=link]]:gap-0 has-[[data-slot=attachment-media][data-variant=link]]:overflow-hidden has-[[data-slot=attachment-media][data-variant=link]]:p-0 has-[[data-slot=attachment-media][data-variant=video]]:size-80 has-[[data-slot=attachment-media][data-variant=video]]:bg-transparent has-[[data-slot=attachment-media][data-variant=video]]:p-0 has-[[data-slot=attachment-media][data-variant=video]]:shadow-[0_0_1px_0_rgba(0,0,0,0.2),0_1px_3px_0_rgba(0,0,0,0.05),0_10px_24px_-3px_rgba(0,0,0,0.1)] has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-content]]:px-3 has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-content]]:py-2.5 has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-title]]:line-clamp-2 has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-title]]:text-base has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-title]]:leading-lg has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-title]]:font-normal has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-title]]:whitespace-normal has-[[data-slot=attachment-media][data-variant=link]]:[&_[data-slot=attachment-title]]:text-secondary-foreground",
  {
    variants: {
      size: {
        default:
          "gap-2 text-base has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
        lg: "max-h-47.5 min-h-47.5 max-w-35 min-w-35 gap-3 text-base has-[[data-slot=attachment-media][data-variant=icon]]:p-3 has-[[data-slot=attachment-media][data-variant=image]]:p-0 [&_[data-slot=attachment-actions]]:hidden has-[[data-slot=attachment-media][data-variant=image]]:[&_[data-slot=attachment-description]]:hidden has-[[data-slot=attachment-media][data-variant=image]]:[&_[data-slot=attachment-media]]:size-full has-[[data-slot=attachment-media][data-variant=image]]:[&_[data-slot=attachment-media]]:rounded-[inherit] has-[[data-slot=attachment-media][data-variant=image]]:[&_[data-slot=attachment-title]]:hidden has-[[data-slot=attachment-media][data-variant=image]]:[&_img]:size-full",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
  }
)

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
        // Full-bleed video player (media-chrome <media-controller>).
        video:
          "aspect-square! w-full! bg-black [&_media-controller]:size-full [&_media-controller]:overflow-hidden [&_media-controller]:rounded-[inherit] [&_video]:size-full [&_video]:object-cover",
        // Audio player pill (media-chrome <media-controller audio>).
        audio:
          "aspect-auto! h-auto! w-full! rounded-full bg-transparent [&_media-controller]:w-full",
        // Rich link preview thumbnail.
        link: "aspect-auto! h-29! w-full! rounded-none! *:[img]:size-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

// Deterministic bar heights (0–1) for the audio waveform, so it looks organic
// without needing to decode the audio.
const WAVEFORM_BARS = Array.from({ length: 44 }, (_, i) =>
  Math.max(0.18, Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.55)))
)

function AudioWaveform({
  progress,
  onSeek,
}: {
  progress: number
  onSeek: (fraction: number) => void
}) {
  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    onSeek(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)))
  }
  return (
    <div
      onClick={handleSeek}
      className="flex h-[15px] min-w-0 flex-1 cursor-pointer items-center justify-between"
    >
      {WAVEFORM_BARS.map((height, i) => (
        <span
          key={i}
          className={cn(
            "w-0.5 shrink-0 rounded-full transition-colors",
            (i + 0.5) / WAVEFORM_BARS.length <= progress
              ? "bg-white"
              : "bg-white/30"
          )}
          style={{ height: `${Math.round(height * 100)}%` }}
        />
      ))}
    </div>
  )
}

/**
 * Wraps a plain <video> / <audio> element in a media-chrome player so the
 * `video` and `audio` AttachmentMedia variants "just work" like image/icon.
 *
 * media-chrome elements are client-only custom elements that mutate their
 * slotted media on upgrade (adding tabindex, etc.), so the real player is only
 * rendered after mount — the server (and first client paint) shows a lightweight
 * fallback, which keeps hydration clean.
 */
function AttachmentMediaPlayer({
  variant,
  children,
}: {
  variant: "video" | "audio"
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)
  const mediaRef = React.useRef<HTMLMediaElement>(null)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Track playback progress off the <audio> element to drive the waveform.
  React.useEffect(() => {
    if (variant !== "audio") return
    const el = mediaRef.current
    if (!el) return
    const update = () =>
      setProgress(el.duration ? el.currentTime / el.duration : 0)
    el.addEventListener("timeupdate", update)
    el.addEventListener("loadedmetadata", update)
    update()
    return () => {
      el.removeEventListener("timeupdate", update)
      el.removeEventListener("loadedmetadata", update)
    }
  }, [variant, mounted])

  const child = React.isValidElement(children)
    ? (children as React.ReactElement<{ poster?: string }>)
    : null

  if (!mounted) {
    if (variant === "video") {
      const poster = child?.props?.poster
      return (
        <div
          className="size-full bg-black bg-cover bg-center"
          style={poster ? { backgroundImage: `url(${poster})` } : undefined}
        />
      )
    }
    return <div className="h-9 w-full rounded-full bg-[#2b2b2b]" />
  }

  const cloneProps: Record<string, unknown> = { slot: "media" }
  if (variant === "audio") cloneProps.ref = mediaRef
  const media = child
    ? React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        cloneProps
      )
    : children

  if (variant === "audio") {
    return (
      <MediaController
        audio
        className="block h-7 w-full rounded-full bg-[#2b2b2b] px-1.5 [--media-button-icon-height:16px] [--media-button-icon-width:16px] [--media-control-background:transparent] [--media-control-hover-background:transparent] [--media-control-padding:6px] [--media-font-size:12px] [--media-primary-color:white]"
      >
        {media}
        <MediaControlBar className="flex h-full w-full items-center gap-2">
          <MediaPlayButton />
          <AudioWaveform
            progress={progress}
            onSeek={(fraction) => {
              const el = mediaRef.current
              if (el?.duration) el.currentTime = fraction * el.duration
            }}
          />
          <MediaDurationDisplay className="pr-2 text-sm [--media-font-size:0.875rem] [--media-primary-color:var(--muted)]" />
        </MediaControlBar>
      </MediaController>
    )
  }

  return (
    <MediaController className="block size-full [--media-control-background:transparent] [--media-control-hover-background:rgba(255,255,255,0.12)] [--media-font-size:12px] [--media-primary-color:white] [--media-range-thumb-height:10px] [--media-range-thumb-width:10px] [--media-range-track-height:4px]">
      {media}
      <MediaControlBar className="flex w-full items-center gap-1 bg-linear-to-t from-black/70 to-transparent px-2 pt-8 pb-2">
        <MediaPlayButton className="p-1.5" />
        <MediaTimeRange className="min-w-0 flex-1" />
        <MediaTimeDisplay showDuration className="whitespace-nowrap" />
        <MediaMuteButton className="p-1.5" />
      </MediaControlBar>
    </MediaController>
  )
}

function AttachmentMedia({
  className,
  variant = "icon",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  const isPlayer = variant === "video" || variant === "audio"
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    >
      {isPlayer ? (
        <AttachmentMediaPlayer variant={variant}>
          {children}
        </AttachmentMediaPlayer>
      ) : (
        children
      )}
    </div>
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80",
        "max-w-full",
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
        className
      )}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant,
  size = "icon-xs",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: render ? type : (type ?? "button"),
        className: cn("absolute inset-0 z-10 outline-none", className),
      },
      props
    ),
    render,
    state: {
      slot: "attachment-trigger",
    },
  })
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        "scrollbar-none flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        // When the group contains lg attachments, pile the cards on top of each
        // other and fan them out. The first child is the front of the pile (kept
        // in normal flow so it sets the footprint, lifted with a higher z-index);
        // the rest are absolutely overlaid behind it, each rotated more from the
        // bottom edge.
        "has-[[data-size=lg]]:relative has-[[data-size=lg]]:isolate has-[[data-size=lg]]:w-fit has-[[data-size=lg]]:overflow-visible has-[[data-size=lg]]:scroll-fade-none has-[[data-size=lg]]:*:data-[slot=attachment]:absolute has-[[data-size=lg]]:*:data-[slot=attachment]:inset-0 has-[[data-size=lg]]:*:data-[slot=attachment]:origin-bottom has-[[data-size=lg]]:*:data-[slot=attachment]:shadow-[0_0_1px_0_rgba(0,0,0,0.2),0_1px_3px_0_rgba(0,0,0,0.05),0_10px_24px_-3px_rgba(0,0,0,0.1)] has-[[data-size=lg]]:*:data-[slot=attachment]:transition-transform has-[[data-size=lg]]:[&>[data-slot=attachment]:first-child]:relative has-[[data-size=lg]]:[&>[data-slot=attachment]:first-child]:inset-auto has-[[data-size=lg]]:[&>[data-slot=attachment]:first-child]:z-10 has-[[data-size=lg]]:[&>[data-slot=attachment]:first-child]:-rotate-[6deg] has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(2)]:top-1.5 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(2)]:left-1 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(2)]:z-20 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(2)]:rotate-3 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(3)]:top-3 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(3)]:left-1.5 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(3)]:z-30 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(3)]:rotate-18 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(4)]:z-40 has-[[data-size=lg]]:[&>[data-slot=attachment]:nth-child(4)]:rotate-[18deg]",
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
