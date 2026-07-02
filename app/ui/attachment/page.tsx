import {
  DownloadIcon,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  MusicIcon,
  TriangleAlertIcon,
  XIcon,
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
import { Spinner } from "@/components/ui/spinner"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function AttachmentPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Basic (icon + title + description + remove)</SectionTitle>
        <Attachment>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove sales-dashboard.pdf">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>

      {/* Image variant */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Image media variant</SectionTitle>
        <Attachment>
          <AttachmentMedia variant="image">
            {/* biome-ignore lint/performance/noImgElement: showcase only */}
            <img
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&dpr=2&q=80"
              alt="Cover"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>cover-art.png</AttachmentTitle>
            <AttachmentDescription>PNG · 840 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download cover-art.png">
              <DownloadIcon />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove cover-art.png">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>

      {/* States */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>States</SectionTitle>
        <div className="flex flex-col gap-3">
          <Attachment state="idle">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Drop a file to attach</AttachmentTitle>
              <AttachmentDescription>
                idle · dashed border
              </AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="uploading">
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>report-q3.pdf</AttachmentTitle>
              <AttachmentDescription>Uploading · 62%</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="processing">
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>keynote.mov</AttachmentTitle>
              <AttachmentDescription>Processing…</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="error">
            <AttachmentMedia>
              <TriangleAlertIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>archive.zip</AttachmentTitle>
              <AttachmentDescription>
                Upload failed · retry
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove archive.zip">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="done">
            <AttachmentMedia>
              <FileSpreadsheetIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>budget.xlsx</AttachmentTitle>
              <AttachmentDescription>Done · 128 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Download budget.xlsx">
                <DownloadIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </div>

      {/* Sizes */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Sizes (default · sm · xs)</SectionTitle>
        <div className="flex flex-col gap-3">
          {(["default", "sm", "xs"] as const).map((size) => (
            <Attachment key={size} size={size}>
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>proposal.docx</AttachmentTitle>
                <AttachmentDescription>size = {size}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove proposal.docx">
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </div>
      </div>

      {/* Size: lg */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Size: lg (large card — w-35 × h-47.5)</SectionTitle>
        <AttachmentGroup>
          {[
            {
              src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=320&dpr=2&q=80",
              name: "cat.jpg",
              meta: "JPG · 2.1 MB",
            },
            {
              src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=320&dpr=2&q=80",
              name: "landscape.jpg",
              meta: "JPG · 3.4 MB",
            },
            {
              src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=320&dpr=2&q=80",
              name: "pup.jpg",
              meta: "JPG · 1.8 MB",
            },
          ].map((file) => (
            <Attachment key={file.name} size="lg" orientation="vertical">
              <AttachmentMedia variant="image">
                {/* biome-ignore lint/performance/noImgElement: showcase only */}
                <img src={file.src} alt={file.name} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>{file.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${file.name}`}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </AttachmentGroup>
      </div>

      {/* Size: lg with icon media (title + description stay visible) */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Size: lg with icon media (caption visible)</SectionTitle>
        <AttachmentGroup>
          {[
            { Icon: FileTextIcon, name: "whitepaper.pdf", meta: "PDF · 5.2 MB" },
            { Icon: FileSpreadsheetIcon, name: "budget.xlsx", meta: "XLSX · 96 KB" },
            { Icon: FileArchiveIcon, name: "assets.zip", meta: "ZIP · 18 MB" },
          ].map((file) => (
            <Attachment key={file.name} size="lg" orientation="vertical">
              <AttachmentMedia>
                <file.Icon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>{file.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${file.name}`}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </AttachmentGroup>
      </div>

      {/* Audio media variant */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Audio media variant (media-chrome player)</SectionTitle>
        <Attachment className="w-full max-w-sm">
          <AttachmentMedia variant="audio">
            <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
          </AttachmentMedia>
        </Attachment>
      </div>

      {/* Video media variant */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Video media variant (media-chrome player)</SectionTitle>
        <Attachment orientation="vertical" className="w-80 p-0">
          <AttachmentMedia variant="video">
            {/* biome-ignore lint/a11y/useMediaCaption: showcase only */}
            <video
              playsInline
              poster="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=640&dpr=2&q=80"
              src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            />
          </AttachmentMedia>
        </Attachment>
      </div>

      {/* Link media variant */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Link media variant (rich preview)</SectionTitle>
        <Attachment
          orientation="vertical"
          className="w-72 has-data-[slot=attachment-content]:w-72"
        >
          <AttachmentMedia variant="link">
            {/* biome-ignore lint/performance/noImgElement: showcase only */}
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=640&dpr=2&q=80"
              alt="Event cover"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GlobeIcon className="size-3.5" />
              <span className="truncate text-xs">luma.com</span>
            </div>
            <AttachmentTitle className="mt-0.5 whitespace-normal">
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
      </div>

      {/* Vertical orientation */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Vertical orientation (media on top)</SectionTitle>
        <AttachmentGroup>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              {/* biome-ignore lint/performance/noImgElement: showcase only */}
              <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&dpr=2&q=80"
                alt="Headphones"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>headphones.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 1.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove headphones.jpg">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment orientation="vertical">
            <AttachmentMedia>
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>mockup.fig</AttachmentTitle>
              <AttachmentDescription>Figma · 4.0 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove mockup.fig">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>

      {/* Clickable (trigger) */}
      <div className="flex max-w-sm flex-col gap-4">
        <SectionTitle>Clickable card (AttachmentTrigger)</SectionTitle>
        <Attachment>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>press-release.pdf</AttachmentTitle>
            <AttachmentDescription>Click to preview</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download press-release.pdf">
              <DownloadIcon />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger
            render={<a href="#" aria-label="Preview press-release.pdf" />}
          />
        </Attachment>
      </div>

      {/* Group */}
      <div className="flex max-w-lg flex-col gap-4">
        <SectionTitle>Group (horizontally scrollable, snapping)</SectionTitle>
        <AttachmentGroup>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>brief.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 320 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove brief.pdf">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment>
            <AttachmentMedia>
              <FileSpreadsheetIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>metrics.xlsx</AttachmentTitle>
              <AttachmentDescription>XLSX · 96 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove metrics.xlsx">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment>
            <AttachmentMedia>
              <MusicIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>voice-memo.m4a</AttachmentTitle>
              <AttachmentDescription>Audio · 3.1 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove voice-memo.m4a">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment>
            <AttachmentMedia>
              <FileArchiveIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>assets.zip</AttachmentTitle>
              <AttachmentDescription>ZIP · 18 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove assets.zip">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>
    </div>
  )
}
