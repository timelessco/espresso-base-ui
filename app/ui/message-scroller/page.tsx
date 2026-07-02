"use client"

import { ArrowDownToLineIcon, ArrowUpToLineIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "@/components/ui/message-scroller"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  name: string
  initials: string
  text: string
  time: string
}

const conversation: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    name: "You",
    initials: "YO",
    text: "Can you walk me through how the message scroller keeps things anchored?",
    time: "9:41 AM",
  },
  {
    id: "m2",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "Of course. Each row is wrapped in a MessageScrollerItem so the viewport can measure and preserve its position.",
    time: "9:41 AM",
  },
  {
    id: "m3",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "When you mark an item with scrollAnchor, it's treated as a conversation turn — the viewport parks it near the top.",
    time: "9:42 AM",
  },
  {
    id: "m4",
    role: "user",
    name: "You",
    initials: "YO",
    text: "So the last thing I sent stays pinned while the reply streams in?",
    time: "9:43 AM",
  },
  {
    id: "m5",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "Exactly. With autoScroll on, streamed replies stay in view as long as you're at the live edge.",
    time: "9:43 AM",
  },
  {
    id: "m6",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "If you scroll up to read older messages, auto-scroll pauses so you aren't yanked back down.",
    time: "9:44 AM",
  },
  {
    id: "m7",
    role: "user",
    name: "You",
    initials: "YO",
    text: "Nice. And the floating button?",
    time: "9:45 AM",
  },
  {
    id: "m8",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "MessageScrollerButton appears when there's content below (or above). Tap it to jump back to the latest message.",
    time: "9:45 AM",
  },
  {
    id: "m9",
    role: "user",
    name: "You",
    initials: "YO",
    text: "What about really long threads — does it render everything?",
    time: "9:46 AM",
  },
  {
    id: "m10",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "It uses content-visibility so rows far off-screen skip layout work, but stay in the DOM for search and accessibility.",
    time: "9:47 AM",
  },
  {
    id: "m11",
    role: "user",
    name: "You",
    initials: "YO",
    text: "Great — that covers it. Let me scroll up to double-check the anchoring.",
    time: "9:48 AM",
  },
  {
    id: "m12",
    role: "assistant",
    name: "Assistant",
    initials: "AI",
    text: "Go for it. Notice the previous turn peeks above the anchored row so you keep your context.",
    time: "9:48 AM",
  },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function ChatRow({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  return (
    <Message align={isUser ? "end" : "start"}>
      {!isUser && (
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>{message.initials}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      )}
      <MessageContent>
        <MessageHeader>{message.name}</MessageHeader>
        <Bubble variant={isUser ? "default" : "secondary"}>
          <BubbleContent>{message.text}</BubbleContent>
        </Bubble>
        <MessageFooter>{message.time}</MessageFooter>
      </MessageContent>
    </Message>
  )
}

function Transcript() {
  return (
    <MessageScrollerViewport className="px-4 py-5">
      <MessageScrollerContent>
        {conversation.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <ChatRow message={message} />
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
  )
}

/* External controls — must live inside MessageScrollerProvider */
function ScrollControls() {
  const { scrollToStart, scrollToEnd } = useMessageScroller()
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => scrollToStart()}>
        <ArrowUpToLineIcon /> Top
      </Button>
      <Button variant="outline" size="sm" onClick={() => scrollToEnd()}>
        <ArrowDownToLineIcon /> Latest
      </Button>
    </div>
  )
}

function ActiveTurn() {
  const { currentAnchorId } = useMessageScrollerVisibility()
  return (
    <span className="text-xs text-muted-foreground">
      Active turn:{" "}
      <span className="font-medium text-foreground">
        {currentAnchorId ?? "—"}
      </span>
    </span>
  )
}

export default function MessageScrollerPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic transcript */}
      <div className="flex max-w-lg flex-col gap-4">
        <SectionTitle>
          Auto-scrolling transcript (with jump-to-latest button)
        </SectionTitle>
        <MessageScrollerProvider
          autoScroll
          defaultScrollPosition="end"
          scrollPreviousItemPeek={64}
        >
          <div className="h-96 overflow-hidden rounded-xl border border-border bg-card">
            <MessageScroller>
              <Transcript />
              <MessageScrollerButton />
            </MessageScroller>
          </div>
        </MessageScrollerProvider>
      </div>

      {/* External controls + visibility */}
      <div className="flex max-w-lg flex-col gap-4">
        <SectionTitle>
          External controls (useMessageScroller + useMessageScrollerVisibility)
        </SectionTitle>
        <MessageScrollerProvider defaultScrollPosition="start">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <ActiveTurn />
              <ScrollControls />
            </div>
            <div className="h-96 overflow-hidden rounded-xl border border-border bg-card">
              <MessageScroller>
                <Transcript />
                <MessageScrollerButton />
              </MessageScroller>
            </div>
          </div>
        </MessageScrollerProvider>
      </div>
    </div>
  )
}
