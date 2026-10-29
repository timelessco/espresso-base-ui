import {
  CheckCheckIcon,
  CopyIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  GlobeIcon,
  RotateCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
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

import { ReactableBubble } from "./reactable-bubble"

const STACK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=320&dpr=2&q=80",
    name: "cat.jpg",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=320&dpr=2&q=80",
    name: "landscape.jpg",
  },
  {
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=320&dpr=2&q=80",
    name: "pup.jpg",
  },
]

// A file card for a bubble: type icon, name, type · size, and a download
// button; `inverted` for the dark sent bubble.
function FileAttachment({
  icon: Icon,
  name,
  meta,
  inverted,
}: {
  icon: React.ComponentType
  name: string
  meta: string
  inverted?: boolean
}) {
  return (
    <Attachment
      className={
        inverted
          ? "w-64 rounded-xl bg-white/12 text-primary-foreground *:data-[slot=attachment-media]:bg-white/15 *:data-[slot=attachment-media]:text-primary-foreground [&_[data-slot=attachment-action]]:text-primary-foreground [&_[data-slot=attachment-action]]:hover:bg-white/15 [&_[data-slot=attachment-description]]:text-primary-foreground/70"
          : "w-64 rounded-xl bg-background"
      }
    >
      <AttachmentMedia>
        <Icon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{name}</AttachmentTitle>
        <AttachmentDescription>{meta}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label={`Download ${name}`}>
          <DownloadIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}

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

      {/* Attachments */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>
          Attachments (image, audio, video, image stack, link, files)
        </SectionTitle>
        <div className="flex flex-col gap-3">
          {/* single image */}
          <Message>
            <MessageAvatar>
              <Avatar className="size-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="secondary">
                <BubbleContent className="w-min p-1">
                  <Attachment
                    size="lg"
                    orientation="vertical"
                    className="rounded-xl"
                  >
                    <AttachmentMedia variant="image">
                      {/* biome-ignore lint/performance/noImgElement: showcase only */}
                      <img
                        src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=320&dpr=2&q=80"
                        alt="desk.jpg"
                      />
                    </AttachmentMedia>
                  </Attachment>
                  <p className="px-1.5 pt-1.5 pb-0.5">
                    Here&apos;s the new desk setup — finally got the second
                    monitor.
                  </p>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* voice note */}
          <Message align="end">
            <MessageContent>
              <Bubble align="end">
                <BubbleContent className="p-1">
                  <Attachment className="w-64">
                    <AttachmentMedia variant="audio">
                      <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                    </AttachmentMedia>
                  </Attachment>
                </BubbleContent>
              </Bubble>
              <MessageFooter>
                <CheckCheckIcon className="size-3.5" /> Delivered
              </MessageFooter>
            </MessageContent>
          </Message>

          {/* video */}
          <Message>
            <MessageAvatar>
              <Avatar className="size-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="secondary">
                <BubbleContent className="w-min p-1">
                  <Attachment orientation="vertical" className="rounded-xl">
                    <AttachmentMedia variant="video">
                      {/* biome-ignore lint/a11y/useMediaCaption: showcase only */}
                      <video
                        playsInline
                        poster="/videos/message-video-poster.jpg"
                        src="/videos/message-video.mp4"
                      />
                    </AttachmentMedia>
                  </Attachment>
                  <p className="px-1.5 pt-1.5 pb-0.5">
                    Draft of the intro animation for the launch video. Thoughts
                    on the pacing?
                  </p>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* stacked images */}
          <Message>
            <MessageAvatar>
              <Avatar className="size-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="secondary">
                {/* overflow-visible keeps the fanned cards' shadows */}
                <BubbleContent className="w-min overflow-visible p-2">
                  <AttachmentGroup>
                    {STACK_IMAGES.map((file) => (
                      <Attachment
                        key={file.name}
                        size="lg"
                        orientation="vertical"
                      >
                        <AttachmentMedia variant="image">
                          {/* biome-ignore lint/performance/noImgElement: showcase only */}
                          <img src={file.src} alt={file.name} />
                        </AttachmentMedia>
                      </Attachment>
                    ))}
                  </AttachmentGroup>
                  <p className="px-0.5 pt-1.5 pb-0.5">
                    A few photos from the offsite. The rest are in the shared
                    album.
                  </p>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* link preview */}
          <Message>
            <MessageAvatar>
              <Avatar className="size-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="secondary">
                <BubbleContent className="w-min p-1">
                  <Attachment
                    orientation="vertical"
                    className="rounded-xl bg-background"
                  >
                    <AttachmentMedia variant="link">
                      {/* biome-ignore lint/performance/noImgElement: showcase only */}
                      <img
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=640&dpr=2&q=80"
                        alt="Event cover"
                      />
                    </AttachmentMedia>
                    <AttachmentContent className="flex min-h-0 flex-1 flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-sm font-normal text-accent-foreground">
                        <GlobeIcon className="size-3.5" />
                        <span className="truncate">luma.com</span>
                      </div>
                      <AttachmentTitle className="mt-0.5">
                        DevRev Leadership Circle Bengaluru
                      </AttachmentTitle>
                    </AttachmentContent>
                    <AttachmentTrigger
                      render={
                        <a
                          href="https://luma.com/lc-blr-2026"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open DevRev Leadership Circle Bengaluru"
                        />
                      }
                    />
                  </Attachment>
                  <p className="px-1.5 pt-1.5 pb-0.5">
                    Signed up for this —{" "}
                    <a
                      href="https://luma.com/lc-blr-2026"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      luma.com/lc-blr-2026
                    </a>
                  </p>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* a document */}
          <Message>
            <MessageAvatar>
              <Avatar className="size-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="secondary">
                <BubbleContent className="w-min p-1">
                  <FileAttachment
                    icon={FileTextIcon}
                    name="offsite-agenda.pdf"
                    meta="PDF · 1.2 MB"
                  />
                  <p className="px-1.5 pt-1.5 pb-0.5">
                    Agenda for Thursday — please add your topics by Wednesday.
                  </p>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* several files in one message */}
          <Message align="end">
            <MessageContent>
              <Bubble align="end">
                <BubbleContent className="flex flex-col gap-1 p-1">
                  <FileAttachment
                    icon={FileTextIcon}
                    name="meeting-notes.txt"
                    meta="TXT · 4 KB"
                    inverted
                  />
                  <FileAttachment
                    icon={FileSpreadsheetIcon}
                    name="budget-2027.xlsx"
                    meta="XLSX · 96 KB"
                    inverted
                  />
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </div>

      {/* Emoji reactions */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Emoji reactions (hover a message to react)</SectionTitle>
        <div className="flex flex-col gap-3">
          <Message>
            <MessageAvatar className="group-has-data-[slot=bubble-reactions]/message:mb-4">
              <Avatar className="size-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <ReactableBubble variant="secondary">
                The new onboarding flow is live in staging.
              </ReactableBubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <ReactableBubble defaultReactions={["👍", "👍", "🎉"]}>
                Nice — I&apos;ll run through it after lunch.
              </ReactableBubble>
            </MessageContent>
          </Message>
        </div>
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
