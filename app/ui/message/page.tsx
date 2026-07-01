import {
  CheckCheckIcon,
  CopyIcon,
  RotateCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function MessagePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Basic (avatar + received bubble)</SectionTitle>
        <Message>
          <MessageAvatar>
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>How can I help you today?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>

      {/* Header + footer */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>With header and footer</SectionTitle>
        <Message>
          <MessageAvatar>
            <Avatar className="size-8">
              <AvatarFallback>OL</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>Olivia</MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>I already checked the logs.</BubbleContent>
            </Bubble>
            <MessageFooter>Read · Yesterday</MessageFooter>
          </MessageContent>
        </Message>
      </div>

      {/* Alignment */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Alignment (start = received, end = sent)</SectionTitle>
        <div className="flex flex-col gap-3">
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
                  It&apos;s a one-line change — shipping now.
                </BubbleContent>
              </Bubble>
              <MessageFooter>
                <CheckCheckIcon className="size-3.5" /> Delivered
              </MessageFooter>
            </MessageContent>
          </Message>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Conversation (grouped consecutive messages)</SectionTitle>
        <div className="flex flex-col gap-3">
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

          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>
                  Perfect, see you then. I&apos;ll grab the meeting room.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </div>

      {/* With actions */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Assistant message with actions</SectionTitle>
        <Message>
          <MessageAvatar>
            <Avatar className="size-8">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>
                Sure - here&apos;s a summary of the three options with their
                trade-offs.
              </BubbleContent>
            </Bubble>
            <MessageFooter className="gap-0.5">
              <Button variant="ghost" size="icon-xs" aria-label="Copy message">
                <CopyIcon />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Regenerate response"
              >
                <RotateCcwIcon />
              </Button>
              <Button variant="ghost" size="icon-xs" aria-label="Good response">
                <ThumbsUpIcon />
              </Button>
              <Button variant="ghost" size="icon-xs" aria-label="Bad response">
                <ThumbsDownIcon />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>

      {/* With reactions */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>With reactions</SectionTitle>
        <Message align="end">
          <MessageContent>
            <Bubble className="mb-4">
              <BubbleContent>Just merged it 🎉</BubbleContent>
              <BubbleReactions>👍 3 ❤️ 2</BubbleReactions>
            </Bubble>
          </MessageContent>
        </Message>
      </div>

      {/* Bubble variants */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Bubble variants</SectionTitle>
        <div className="flex flex-col gap-3">
          {(
            [
              "default",
              "secondary",
              "muted",
              "tinted",
              "outline",
              "ghost",
              "destructive",
            ] as const
          ).map((variant) => (
            <Message key={variant}>
              <MessageContent>
                <Bubble variant={variant}>
                  <BubbleContent>
                    This is the <span className="font-medium">{variant}</span>{" "}
                    bubble variant.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          ))}
        </div>
      </div>
    </div>
  )
}
