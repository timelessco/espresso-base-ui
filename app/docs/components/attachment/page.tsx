"use client"

import {
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
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
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

const stateMediaIcons = {
  done: FileTextIcon,
  idle: FileTextIcon,
  uploading: Spinner,
  processing: Spinner,
  error: TriangleAlertIcon,
} as const

const stateMediaIconNames = {
  done: "FileTextIcon",
  idle: "FileTextIcon",
  uploading: "Spinner",
  processing: "Spinner",
  error: "TriangleAlertIcon",
} as const

function attachmentPlaygroundCode(v: PlaygroundValues) {
  const state = v.state as keyof typeof stateMediaIconNames
  const attrs = [
    state !== "done" ? ` state="${state}"` : "",
    v.orientation !== "horizontal" ? ` orientation="${v.orientation}"` : "",
  ].join("")

  const lines = [
    `<Attachment${attrs}>`,
    `  <AttachmentMedia>`,
    `    <${stateMediaIconNames[state]} />`,
    `  </AttachmentMedia>`,
    `  <AttachmentContent>`,
    `    <AttachmentTitle>${v.title}</AttachmentTitle>`,
    `    <AttachmentDescription>${v.description}</AttachmentDescription>`,
    `  </AttachmentContent>`,
  ]
  if (v.removable) {
    lines.push(
      `  <AttachmentActions>`,
      `    <AttachmentAction aria-label="Remove ${v.title}">`,
      `      <XIcon />`,
      `    </AttachmentAction>`,
      `  </AttachmentActions>`
    )
  }
  lines.push(`</Attachment>`)
  return lines.join("\n")
}

function AttachmentPlaygroundPreview(v: PlaygroundValues) {
  const state = v.state as keyof typeof stateMediaIcons
  const MediaIcon = stateMediaIcons[state]

  return (
    <Attachment
      state={state}
      orientation={v.orientation as "horizontal" | "vertical"}
    >
      <AttachmentMedia>
        <MediaIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{v.title}</AttachmentTitle>
        <AttachmentDescription>{v.description}</AttachmentDescription>
      </AttachmentContent>
      {Boolean(v.removable) && (
        <AttachmentActions>
          <AttachmentAction aria-label={`Remove ${v.title}`}>
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      )}
    </Attachment>
  )
}

export default function AttachmentDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Attachment"
        description="A file chip for uploads, previews and link cards. Composes media, title and actions through upload states in horizontal or vertical orientation."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            title: { type: "text", defaultValue: "sales-dashboard.pdf" },
            description: { type: "text", defaultValue: "PDF · 2.4 MB" },
            state: {
              type: "options",
              options: ["done", "idle", "uploading", "processing", "error"],
              defaultValue: "done",
            },
            orientation: {
              type: "options",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
            },
            removable: { type: "boolean", defaultValue: true },
          }}
          renderPreview={AttachmentPlaygroundPreview}
          renderCode={attachmentPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          The default layout is a horizontal chip: an{" "}
          <code>AttachmentMedia</code> square, an <code>AttachmentContent</code>{" "}
          block with title and description, and trailing buttons in{" "}
          <code>AttachmentActions</code>.
        </DocProse>
        <DocExample
          code={`
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
</Attachment>`}
        >
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
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="attachment" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
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
} from "@/components/ui/attachment"`}
        />
        <CodeBlock
          code={`
<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>report.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 1.1 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove report.pdf">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`}
        />
      </DocSection>

      <DocSection title="Media variants">
        <DocProse>
          <code>AttachmentMedia</code> takes a <code>variant</code>:{" "}
          <code>icon</code> (default), <code>image</code> for a thumbnail,{" "}
          <code>video</code> and <code>audio</code> for embedded media-chrome
          players, and <code>link</code> for a rich link-preview card.
        </DocProse>
        <DocExample
          code={`
<Attachment>
  <AttachmentMedia variant="image">
    <img src="/path/to/cover.png" alt="Cover" />
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
</Attachment>`}
        >
          <Attachment>
            <AttachmentMedia variant="image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
        </DocExample>
      </DocSection>

      <DocSection title="States">
        <DocProse>
          <code>state</code> reflects the upload lifecycle: <code>idle</code>{" "}
          draws a dashed drop target, <code>uploading</code> and{" "}
          <code>processing</code> shimmer the title (pair them with a{" "}
          <code>Spinner</code> in the media slot), <code>error</code> tints the
          media and description red, and <code>done</code> (the default) is the
          resting card.
        </DocProse>
        <DocExample
          code={`
<Attachment state="uploading">
  <AttachmentMedia>
    <Spinner />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>report-q3.pdf</AttachmentTitle>
    <AttachmentDescription>Uploading · 62%</AttachmentDescription>
  </AttachmentContent>
</Attachment>

<Attachment state="error">
  <AttachmentMedia>
    <TriangleAlertIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>archive.zip</AttachmentTitle>
    <AttachmentDescription>Upload failed · retry</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove archive.zip">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`}
        >
          <div className="flex flex-col gap-3">
            <Attachment state="uploading">
              <AttachmentMedia>
                <Spinner />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>report-q3.pdf</AttachmentTitle>
                <AttachmentDescription>Uploading · 62%</AttachmentDescription>
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
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Sizes and orientation">
        <DocProse>
          <code>size</code> scales the chip (<code>xs</code>, <code>sm</code>,{" "}
          <code>default</code>, plus a large <code>lg</code> card meant for
          vertical galleries), and <code>orientation="vertical"</code> stacks
          the media above the caption.
        </DocProse>
        <DocExample
          code={`
<Attachment size="sm">
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>proposal.docx</AttachmentTitle>
    <AttachmentDescription>size = sm</AttachmentDescription>
  </AttachmentContent>
</Attachment>

<Attachment orientation="vertical">
  <AttachmentMedia>
    <FileSpreadsheetIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>budget.xlsx</AttachmentTitle>
    <AttachmentDescription>XLSX · 96 KB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`}
        >
          <div className="flex flex-wrap items-start gap-4">
            <Attachment size="sm">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>proposal.docx</AttachmentTitle>
                <AttachmentDescription>size = sm</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment orientation="vertical">
              <AttachmentMedia>
                <FileSpreadsheetIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>budget.xlsx</AttachmentTitle>
                <AttachmentDescription>XLSX · 96 KB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Clickable card">
        <DocProse>
          <code>AttachmentTrigger</code> overlays an invisible full-card button
          (or link, via <code>render</code>) so the whole chip is clickable
          while <code>AttachmentActions</code> stays independently interactive
          above it.
        </DocProse>
        <DocExample
          code={`
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
</Attachment>`}
        >
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
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>Attachment</code> is a compound component. The root sets state,
          size and orientation as data attributes, and every part styles itself
          off those via group selectors – so a single prop change on the root
          restyles the whole card. All parts accept <code>className</code> plus
          the standard props of the element they render.
        </DocProse>
        <PropsTable
          title="Attachment"
          rows={[
            {
              prop: "state",
              type: '"idle" | "uploading" | "processing" | "error" | "done"',
              defaultValue: '"done"',
              description:
                "Upload lifecycle. idle draws a dashed border, uploading/processing shimmer the title, error tints media and description in destructive colors.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "default" | "lg"',
              defaultValue: '"default"',
              description:
                "Chip scale. lg is a fixed-footprint card (140 × 190) intended for vertical orientation; it hides actions and, with image media, goes full-bleed.",
            },
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description:
                "horizontal places media beside the caption; vertical stacks media on top and floats actions over the top-right corner.",
            },
          ]}
        />
        <PropsTable
          title="AttachmentMedia"
          rows={[
            {
              prop: "variant",
              type: '"icon" | "image" | "video" | "audio" | "link"',
              defaultValue: '"icon"',
              description:
                "What the media slot renders. icon centers an svg; image shows a cropped thumbnail; video/audio wrap a plain <video>/<audio> child in a media-chrome player; link renders a rich-preview banner.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "AttachmentMedia",
              description:
                'Leading media square (data-slot="attachment-media", data-variant reflects the variant prop).',
            },
            {
              part: "AttachmentContent",
              description:
                'Caption column that holds title and description (data-slot="attachment-content").',
            },
            {
              part: "AttachmentTitle",
              description:
                'Truncated file name (data-slot="attachment-title"). Shimmers while the root state is uploading or processing.',
            },
            {
              part: "AttachmentDescription",
              description:
                'Muted meta line – type, size, progress (data-slot="attachment-description"). Turns destructive in the error state.',
            },
            {
              part: "AttachmentActions",
              description:
                'Trailing action cluster (data-slot="attachment-actions"). Kept above AttachmentTrigger so its buttons stay clickable.',
            },
            {
              part: "AttachmentAction",
              description:
                'A Button preset to variant="ghost" size="icon-xs" (data-slot="attachment-action"). Accepts all Button props.',
            },
            {
              part: "AttachmentTrigger",
              description:
                'Invisible full-card overlay button (data-slot="attachment-trigger"). Use render to swap in an <a> or router link.',
            },
            {
              part: "AttachmentGroup",
              description:
                'Horizontal, snap-scrolling row of attachments (data-slot="attachment-group"). With lg cards it fans them into a rotated pile instead.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          Give every <code>AttachmentAction</code> and{" "}
          <code>AttachmentTrigger</code> an <code>aria-label</code> that names
          the file, since their visible content is icon-only. The root exposes{" "}
          <code>data-slot="attachment"</code> along with <code>data-state</code>
          , <code>data-size</code> and <code>data-orientation</code>, and every
          part carries its own <code>data-slot</code> – target these from CSS
          for app-level overrides. Keyboard focus anywhere inside the card
          lights up a ring on the root via <code>focus-within</code>.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
