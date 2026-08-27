"use client"

import { ArrowDownToLineIcon, ArrowUpToLineIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/components/ui/message-scroller"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

const demoMessages = [
  { id: "m1", role: "user", text: "Can you summarize the launch checklist?" },
  {
    id: "m2",
    role: "assistant",
    text: "Sure – QA sign-off, changelog entry, and the status page update.",
  },
  { id: "m3", role: "user", text: "Who owns the status page update?" },
  {
    id: "m4",
    role: "assistant",
    text: "Ops does. It goes out five minutes before the deploy starts.",
  },
  { id: "m5", role: "user", text: "Great – anything left after that?" },
  {
    id: "m6",
    role: "assistant",
    text: "Just the post-launch metrics review on Friday. You're all set.",
  },
]

function DemoRow({
  role,
  children,
}: {
  role: string
  children: React.ReactNode
}) {
  const isUser = role === "user"
  return (
    <Message align={isUser ? "end" : "start"}>
      {!isUser && (
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      )}
      <MessageContent>
        <Bubble variant={isUser ? "default" : "secondary"}>
          <BubbleContent>{children}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

function Transcript() {
  return (
    <MessageScrollerViewport className="px-4 py-4">
      <MessageScrollerContent>
        {demoMessages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <DemoRow role={message.role}>{message.text}</DemoRow>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
  )
}

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

export default function MessageScrollerDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Message Scroller"
        description="A chat viewport that starts at the latest message, auto-scrolls while replies stream in, and pauses when the reader scrolls up."
      />

      <DocSection title="Preview">
        <DocProse>
          Wrap the tree in <code>MessageScrollerProvider</code>, put the
          viewport, content and a floating <code>MessageScrollerButton</code>{" "}
          inside <code>MessageScroller</code>, and wrap each row in a{" "}
          <code>MessageScrollerItem</code>. Scroll up – the jump-to-latest
          button appears.
        </DocProse>
        <DocExample
          code={`
<MessageScrollerProvider autoScroll defaultScrollPosition="end">
  <MessageScroller>
    <MessageScrollerViewport className="px-4 py-4">
      <MessageScrollerContent>
        {messages.map((message) => (
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
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`}
        >
          <MessageScrollerProvider autoScroll defaultScrollPosition="end">
            <div className="h-72 w-full max-w-md overflow-hidden rounded-xl border border-border bg-card">
              <MessageScroller>
                <Transcript />
                <MessageScrollerButton />
              </MessageScroller>
            </div>
          </MessageScrollerProvider>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="message-scroller" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@/components/ui/message-scroller"`}
        />
        <CodeBlock
          code={`
<MessageScrollerProvider autoScroll defaultScrollPosition="end">
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        <MessageScrollerItem messageId="m1">...</MessageScrollerItem>
        <MessageScrollerItem messageId="m2" scrollAnchor>
          ...
        </MessageScrollerItem>
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`}
        />
      </DocSection>

      <DocSection title="External controls">
        <DocProse>
          Components rendered anywhere inside the provider can drive the
          viewport with <code>useMessageScroller</code> –{" "}
          <code>scrollToStart</code>, <code>scrollToEnd</code> and{" "}
          <code>scrollToMessage</code>.
        </DocProse>
        <DocExample
          code={`
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

<MessageScrollerProvider defaultScrollPosition="start">
  <ScrollControls />
  <MessageScroller>...</MessageScroller>
</MessageScrollerProvider>`}
        >
          <MessageScrollerProvider defaultScrollPosition="start">
            <div className="flex w-full max-w-md flex-col gap-3">
              <div className="flex justify-end">
                <ScrollControls />
              </div>
              <div className="h-72 overflow-hidden rounded-xl border border-border bg-card">
                <MessageScroller>
                  <Transcript />
                  <MessageScrollerButton />
                </MessageScroller>
              </div>
            </div>
          </MessageScrollerProvider>
        </DocExample>
      </DocSection>

      <DocSection title="Anchored turns">
        <DocProse>
          Mark the rows that begin a conversation turn – typically the
          user&apos;s messages – with <code>scrollAnchor</code>. When that
          message is scrolled to, the viewport parks it near the top, with{" "}
          <code>scrollPreviousItemPeek</code> letting a slice of the previous
          row peek above it for context.
        </DocProse>
        <CodeBlock
          code={`
<MessageScrollerProvider
  autoScroll
  defaultScrollPosition="last-anchor"
  scrollPreviousItemPeek={64}
>
  ...
  <MessageScrollerItem messageId={message.id} scrollAnchor={message.role === "user"}>
    <ChatRow message={message} />
  </MessageScrollerItem>
  ...
</MessageScrollerProvider>`}
        />
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          The wrapper re-exports the primitive&apos;s hooks:{" "}
          <code>useMessageScroller</code> returns <code>scrollToStart</code>,{" "}
          <code>scrollToEnd</code> and{" "}
          <code>scrollToMessage(messageId, options)</code>;{" "}
          <code>useMessageScrollerScrollable</code> reports whether content
          extends beyond the <code>start</code> or <code>end</code> edge; and{" "}
          <code>useMessageScrollerVisibility</code> exposes{" "}
          <code>currentAnchorId</code> and <code>visibleMessageIds</code>. All
          hooks must be called under <code>MessageScrollerProvider</code>.
        </DocProse>
        <PropsTable
          title="MessageScrollerProvider"
          rows={[
            {
              prop: "autoScroll",
              type: "boolean",
              description:
                "Follow new content while the reader is at the live edge; scrolling away pauses it.",
            },
            {
              prop: "defaultScrollPosition",
              type: '"start" | "end" | "last-anchor"',
              description:
                "Where the viewport starts on mount – the top, the latest message, or the last anchored item.",
            },
            {
              prop: "scrollEdgeThreshold",
              type: "number",
              description:
                "Distance in pixels from the edge within which the viewport still counts as at the live edge.",
            },
            {
              prop: "scrollPreviousItemPeek",
              type: "number",
              description:
                "Pixels of the previous item left visible above an anchored row after an anchor scroll.",
            },
            {
              prop: "scrollMargin",
              type: "number",
              description: "Extra margin applied to programmatic scrolls.",
            },
          ]}
        />
        <PropsTable
          title="MessageScrollerViewport"
          rows={[
            {
              prop: "preserveScrollOnPrepend",
              type: "boolean",
              description:
                "Keep the reading position stable when older messages are prepended (infinite history).",
            },
          ]}
        />
        <PropsTable
          title="MessageScrollerContent"
          rows={[
            {
              prop: "spacerClassName",
              type: "string",
              description:
                "Classes for the internal spacer that pads short conversations to the full viewport height.",
            },
          ]}
        />
        <PropsTable
          title="MessageScrollerItem"
          rows={[
            {
              prop: "messageId",
              type: "string",
              description:
                "Stable id for the row – used by scrollToMessage and the visibility hook.",
            },
            {
              prop: "scrollAnchor",
              type: "boolean",
              defaultValue: "false",
              description:
                "Marks the row as a conversation turn that parks near the top of the viewport when scrolled to.",
            },
          ]}
        />
        <PropsTable
          title="MessageScrollerButton"
          rows={[
            {
              prop: "direction",
              type: '"start" | "end"',
              defaultValue: '"end"',
              description:
                "Which edge the button jumps to. It only appears while more content lies in that direction; the icon flips for start.",
            },
            {
              prop: "behavior",
              type: "ScrollBehavior",
              description: "Scroll behavior for the jump, e.g. smooth.",
            },
            {
              prop: "variant / size",
              type: "Button variant and size",
              defaultValue: '"secondary" / "icon-sm"',
              description:
                "Forwarded to the underlying Button used as the default render.",
            },
            {
              prop: "render",
              type: "ReactElement | (props, state) => ReactElement",
              description: "Replace the default Button element entirely.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "MessageScrollerProvider",
              description:
                "Context provider owning scroll state and behavior – hooks and every other part must live inside it.",
            },
            {
              part: "MessageScroller",
              description:
                'Relative, overflow-hidden root that positions the floating button (data-slot="message-scroller").',
            },
            {
              part: "MessageScrollerViewport",
              description:
                'The scrollable element (data-slot="message-scroller-viewport") – thin scrollbar, bottom scroll fade, and a data-autoscrolling attribute that hides the scrollbar while auto-scroll drives it.',
            },
            {
              part: "MessageScrollerContent",
              description:
                'Column of rows with gap-6 (data-slot="message-scroller-content").',
            },
            {
              part: "MessageScrollerItem",
              description:
                'Wrapper for one row (data-slot="message-scroller-item"). Uses content-visibility so far off-screen rows skip layout work while staying in the DOM.',
            },
            {
              part: "MessageScrollerButton",
              description:
                'Floating jump button (data-slot="message-scroller-button") with data-direction, data-active, data-variant and data-size attributes driving its slide-and-fade transitions. Includes a screen-reader label.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The default button content includes an <code>sr-only</code> label
          (&quot;Scroll to end&quot; or &quot;Scroll to start&quot;), and
          off-screen rows remain in the DOM – <code>content-visibility</code>{" "}
          only skips rendering work, so find-in-page and assistive tech still
          see the full transcript. Each part exposes a <code>data-slot</code>{" "}
          attribute, the viewport reflects <code>data-autoscrolling</code>, and
          the button reflects <code>data-active</code> and{" "}
          <code>data-direction</code> – target these from CSS for app-level
          overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
