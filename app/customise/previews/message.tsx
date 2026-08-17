"use client"

import * as React from "react"
import { CheckCheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
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

export default function MessagePreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Received">
        <Message className="max-w-sm">
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
        </Message>
      </PreviewCard>

      <PreviewCard label="Alignment">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Message>
            <MessageContent>
              <Bubble variant="secondary">
                <BubbleContent>Did you review it?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>One-line change — shipping now.</BubbleContent>
              </Bubble>
              <MessageFooter>
                <CheckCheckIcon className="size-3.5" /> Delivered
              </MessageFooter>
            </MessageContent>
          </Message>
        </div>
      </PreviewCard>

      <PreviewCard label="Conversation">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
                  <BubbleContent>Hey! Still on for 3pm?</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar />
              <MessageContent>
                <Bubble variant="secondary">
                  <BubbleContent>I&apos;ll bring the mocks.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>Perfect, see you then.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </PreviewCard>

      <PreviewCard label="With actions & reactions">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Message>
            <MessageAvatar>
              <Avatar className="size-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="secondary">
                <BubbleContent>
                  Here&apos;s a summary of the three options.
                </BubbleContent>
              </Bubble>
              <MessageFooter className="gap-0.5">
                <Button variant="ghost" size="icon-xs" aria-label="Copy">
                  <CopyIcon />
                </Button>
                <Button variant="ghost" size="icon-xs" aria-label="Regenerate">
                  <RotateCcwIcon />
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble className="mb-4">
                <BubbleContent>Just merged it 🎉</BubbleContent>
                <BubbleReactions>👍 3 ❤️ 2</BubbleReactions>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
