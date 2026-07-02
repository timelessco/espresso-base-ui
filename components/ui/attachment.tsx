import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl bg-secondary text-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          "gap-2 text-base has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
        lg: "max-h-47.5 min-h-47.5 max-w-35 min-w-35 gap-3 p-0 text-base [&_[data-slot=attachment-actions]]:hidden [&_[data-slot=attachment-description]]:hidden [&_[data-slot=attachment-media]]:size-full [&_[data-slot=attachment-media]]:rounded-[inherit] [&_[data-slot=attachment-title]]:hidden [&_img]:size-full",
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
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
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
