"use client"

import * as React from "react"
import {
  CopyIcon,
  EllipsisIcon,
  PencilIcon,
  ReplyIcon,
  SmilePlusIcon,
  Trash2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
} from "@/components/ui/emoji-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// A bubble that takes reactions: hovering the message shows a react button
// and a more-actions menu beside the bubble (on the outer side for sent
// messages); the react button opens the emoji picker, and each pick is counted into reaction pills on the bubble's edge,
// where every pill is a button that adds or takes back your own reaction.
function ReactableBubble({
  variant,
  defaultReactions = [],
  children,
}: {
  variant?: React.ComponentProps<typeof Bubble>["variant"]
  defaultReactions?: string[]
  children: React.ReactNode
}) {
  // per emoji: how many reacted, and whether one of them is you
  const [reactions, setReactions] = React.useState(() => {
    const counts = new Map<string, number>()
    for (const emoji of defaultReactions)
      counts.set(emoji, (counts.get(emoji) ?? 0) + 1)
    return [...counts].map(([emoji, count]) => ({ emoji, count, mine: false }))
  })
  const [open, setOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // a pick or a click on a pill: adds your reaction, or takes it back
  const toggle = (emoji: string, fromPicker = false) =>
    setReactions((prev) => {
      const hit = prev.find((r) => r.emoji === emoji)
      if (!hit) return [...prev, { emoji, count: 1, mine: true }]
      if (hit.mine && fromPicker) return prev
      return prev
        .map((r) =>
          r.emoji === emoji
            ? { ...r, count: r.count + (r.mine ? -1 : 1), mine: !r.mine }
            : r
        )
        .filter((r) => r.count > 0)
    })

  return (
    <div
      className={cn(
        "flex w-fit max-w-full min-w-0 items-center gap-1 group-data-[align=end]/message:flex-row-reverse group-data-[align=end]/message:self-end",
        reactions.length > 0 && "mb-4"
      )}
    >
      <Bubble variant={variant} className="min-w-0">
        <BubbleContent ref={contentRef}>{children}</BubbleContent>
        {reactions.length > 0 && (
          <BubbleReactions className="gap-px bg-transparent ring-0">
            {reactions.map(({ emoji, count, mine }) => (
              // the card-coloured ring sits behind the button as a solid
              // backing, so the pill's edge blends into it (an outline ring
              // leaves a hairline of bubble showing where the two meet)
              <span key={emoji} className="flex rounded-full bg-card p-[3px]">
                <Button
                  variant="secondary"
                  size="xs"
                  aria-pressed={mine}
                  aria-label={`${emoji} ${count}, ${mine ? "remove" : "add"} your reaction`}
                  onClick={() => toggle(emoji)}
                  className="h-auto gap-1 rounded-full px-1.5 py-0.5"
                >
                  {emoji}
                  {count > 1 && <span className="tabular-nums">{count}</span>}
                </Button>
              </span>
            ))}
          </BubbleReactions>
        )}
      </Bubble>
      {/* hover actions: shown while the message is hovered, focused, or
          one of their popups is open */}
      <div
        data-open={open || menuOpen || undefined}
        className="flex shrink-0 items-center opacity-0 transition-opacity group-hover/message:opacity-100 group-data-[align=end]/message:flex-row-reverse has-focus-visible:opacity-100 data-open:opacity-100"
      >
        <EmojiPicker
          value=""
          open={open}
          onOpenChange={setOpen}
          onValueChange={(emoji) => toggle(emoji, true)}
        >
          <EmojiPickerTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Add reaction"
                className="rounded-full text-muted-foreground"
              >
                <SmilePlusIcon />
              </Button>
            }
          />
          <EmojiPickerContent />
        </EmojiPicker>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="More actions"
                className="rounded-full text-muted-foreground"
              >
                <EllipsisIcon />
              </Button>
            }
          />
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>
              <ReplyIcon />
              Reply
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard?.writeText(
                  contentRef.current?.textContent ?? ""
                )
              }
            >
              <CopyIcon />
              Copy text
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export { ReactableBubble }
