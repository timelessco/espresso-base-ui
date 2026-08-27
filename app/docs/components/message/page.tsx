"use client"

import { CheckCheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"
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

export default function MessageDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Message"
        description="The layout shell for a chat message row – an avatar beside a content column. The align prop flips between received and sent."
      />

      <DocSection title="Preview">
        <DocProse>
          Compose a row from <code>MessageAvatar</code> and{" "}
          <code>MessageContent</code>, with a <code>Bubble</code> as the body
          and optional <code>MessageHeader</code> and <code>MessageFooter</code>{" "}
          lines around it.
        </DocProse>
        <DocExample
          code={`
<Message>
  <MessageAvatar>
    <Avatar className="size-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Olivia</MessageHeader>
    <Bubble variant="secondary">
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
    <MessageFooter>Read · Yesterday</MessageFooter>
  </MessageContent>
</Message>`}
        >
          <div className="w-full max-w-sm">
            <Message>
              <MessageAvatar>
                <Avatar className="size-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Olivia</MessageHeader>
                <Bubble variant="secondary">
                  <BubbleContent>How can I help you today?</BubbleContent>
                </Bubble>
                <MessageFooter>Read · Yesterday</MessageFooter>
              </MessageContent>
            </Message>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="message" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"`}
        />
        <CodeBlock
          code={`
<Message align="end">
  <MessageContent>
    <Bubble>
      <BubbleContent>Shipping now.</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`}
        />
      </DocSection>

      <DocSection title="Alignment">
        <DocProse>
          <code>align="start"</code> (the default) lays out a received message;{" "}
          <code>align="end"</code> mirrors the row for sent messages – the
          content right-aligns and the footer follows it.
        </DocProse>
        <DocExample
          code={`
<Message>
  <MessageContent>
    <Bubble variant="secondary">
      <BubbleContent>Did you get a chance to review it?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>

<Message align="end">
  <MessageContent>
    <Bubble>
      <BubbleContent>It's a one-line change – shipping now.</BubbleContent>
    </Bubble>
    <MessageFooter>
      <CheckCheckIcon className="size-3.5" /> Delivered
    </MessageFooter>
  </MessageContent>
</Message>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Message>
              <MessageContent>
                <Bubble variant="secondary">
                  <BubbleContent>
                    Did you get a chance to review it?
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>
                    It&apos;s a one-line change – shipping now.
                  </BubbleContent>
                </Bubble>
                <MessageFooter>
                  <CheckCheckIcon className="size-3.5" /> Delivered
                </MessageFooter>
              </MessageContent>
            </Message>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Grouped messages">
        <DocProse>
          Wrap consecutive messages from the same sender in{" "}
          <code>MessageGroup</code>; leave an empty <code>MessageAvatar</code>{" "}
          on the follow-ups so the bubbles stay column-aligned without repeating
          the avatar.
        </DocProse>
        <DocExample
          code={`
<MessageGroup>
  <Message>
    <MessageAvatar>
      <Avatar className="size-8">
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <MessageHeader>Sarah Chen</MessageHeader>
      <Bubble variant="secondary">
        <BubbleContent>Hey! Are we still on for 3pm?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message>
    <MessageAvatar />
    <MessageContent>
      <Bubble variant="secondary">
        <BubbleContent>I'll bring the design mocks.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`}
        >
          <div className="w-full max-w-sm">
            <MessageGroup>
              <Message>
                <MessageAvatar>
                  <Avatar className="size-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader>Sarah Chen</MessageHeader>
                  <Bubble variant="secondary">
                    <BubbleContent>Hey! Are we still on for 3pm?</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message>
                <MessageAvatar />
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>
                      I&apos;ll bring the design mocks.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageGroup>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Footer actions">
        <DocProse>
          The footer is a plain flex row – use it for icon actions on assistant
          replies instead of a timestamp.
        </DocProse>
        <DocExample
          code={`
<Message>
  <MessageAvatar>
    <Avatar className="size-8">
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble variant="secondary">
      <BubbleContent>
        Sure – here's a summary of the three options.
      </BubbleContent>
    </Bubble>
    <MessageFooter className="gap-0.5">
      <Button variant="ghost" size="icon-xs" aria-label="Copy message">
        <CopyIcon />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label="Regenerate response">
        <RotateCcwIcon />
      </Button>
    </MessageFooter>
  </MessageContent>
</Message>`}
        >
          <div className="w-full max-w-sm">
            <Message>
              <MessageAvatar>
                <Avatar className="size-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="secondary">
                  <BubbleContent>
                    Sure – here&apos;s a summary of the three options.
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Copy message"
                  >
                    <CopyIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Regenerate response"
                  >
                    <RotateCcwIcon />
                  </Button>
                </MessageFooter>
              </MessageContent>
            </Message>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          Every part renders a <code>div</code> and accepts{" "}
          <code>className</code> plus standard div props. Only the{" "}
          <code>Message</code> root has a prop of its own.
        </DocProse>
        <PropsTable
          title="Message"
          rows={[
            {
              prop: "align",
              type: '"start" | "end"',
              defaultValue: '"start"',
              description:
                "Row direction – start for received messages (avatar leading), end for sent messages (row reversed, content right-aligned).",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "MessageGroup",
              description:
                'Vertical stack for consecutive messages from one sender (data-slot="message-group").',
            },
            {
              part: "MessageAvatar",
              description:
                'Rounded avatar slot aligned to the bottom of the row (data-slot="message-avatar"). Reserves min-w-8, so an empty one keeps grouped bubbles aligned; it shifts up automatically when the message has a footer.',
            },
            {
              part: "MessageContent",
              description:
                'Column holding header, bubble and footer (data-slot="message-content"). In an end-aligned message its direct slotted children self-align to the right.',
            },
            {
              part: "MessageHeader",
              description:
                'Sender name line above the bubble (data-slot="message-header"). Horizontal padding drops to zero next to ghost bubbles.',
            },
            {
              part: "MessageFooter",
              description:
                'Meta line below the bubble – timestamps, delivery state or actions (data-slot="message-footer"). Right-aligns in end-aligned messages.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          The root exposes <code>data-slot="message"</code> and reflects its
          alignment as <code>data-align</code>; the other parts carry their own{" "}
          <code>data-slot</code> attributes. The internal styles key off these –
          for example the avatar lifts by <code>-translate-y-8</code> when a{" "}
          <code>data-slot="message-footer"</code> is present – and you can
          target the same attributes from CSS for app-level overrides.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
