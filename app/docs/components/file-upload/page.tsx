"use client"

import { ArrowUpToLineIcon, Trash, UploadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
  useFileUpload,
} from "@/components/ui/file-upload"
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

/** Renders the current files from the FileUpload store as list items. */
function FilesList({
  progress,
}: {
  progress?: "linear" | "circular" | "fill"
}) {
  const fileStates = useFileUpload((state) => Array.from(state.files.values()))

  return (
    <>
      {fileStates.map((fs) => (
        <FileUploadItem
          key={fs.file.name + fs.file.size + fs.file.lastModified}
          value={fs.file}
          className="items-start"
        >
          <FileUploadItemPreview />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <FileUploadItemMetadata />
            {progress && <FileUploadItemProgress variant={progress} />}
          </div>
          <FileUploadItemDelete asChild>
            <Button variant="ghost" size="icon-sm" className="size-6">
              <Trash />
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </>
  )
}

function fakeUpload(
  file: File,
  onProgress: (file: File, p: number) => void,
  onSuccess: (file: File) => void
) {
  return new Promise<void>((resolve) => {
    let progress = 0
    const tick = () => {
      progress += Math.random() * 18 + 6
      if (progress >= 100) {
        onProgress(file, 100)
        onSuccess(file)
        resolve()
      } else {
        onProgress(file, progress)
        setTimeout(tick, 250)
      }
    }
    setTimeout(tick, 200)
  })
}

function fileUploadPlaygroundCode(v: PlaygroundValues) {
  const attrs = [
    v.accept ? ` accept="${v.accept}"` : "",
    v.multiple ? " multiple" : "",
    v.disabled ? " disabled" : "",
  ].join("")

  return [
    `<FileUpload${attrs}>`,
    `  <FileUploadDropzone>`,
    `    <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />`,
    `    <p className="pt-2 text-base font-medium text-foreground">`,
    `      Drop files here or click to upload`,
    `    </p>`,
    `    <FileUploadList>`,
    `      <FilesList />`,
    `    </FileUploadList>`,
    `  </FileUploadDropzone>`,
    `</FileUpload>`,
  ].join("\n")
}

function FileUploadPlaygroundPreview(v: PlaygroundValues) {
  return (
    <div className="w-full max-w-sm">
      <FileUpload
        key={[v.accept, v.multiple, v.disabled].join("|")}
        accept={(v.accept as string) || undefined}
        multiple={Boolean(v.multiple)}
        disabled={Boolean(v.disabled)}
      >
        <FileUploadDropzone>
          <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
          <p className="pt-2 text-base font-medium text-foreground">
            Drop files here or click to upload
          </p>
          <FileUploadList>
            <FilesList />
          </FileUploadList>
        </FileUploadDropzone>
      </FileUpload>
    </div>
  )
}

export default function FileUploadDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="File Upload"
        description="A headless file picker with drag-and-drop, paste, validation and upload progress. Composes a dropzone or trigger button with a file list."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            accept: { type: "text", defaultValue: "image/*" },
            multiple: { type: "boolean", defaultValue: true },
            disabled: { type: "boolean", defaultValue: false },
          }}
          renderPreview={FileUploadPlaygroundPreview}
          renderCode={fileUploadPlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          <code>FileUploadDropzone</code> accepts click, drop, paste and
          keyboard activation. Render accepted files inside{" "}
          <code>FileUploadList</code> by reading the store with{" "}
          <code>useFileUpload</code> and mapping to <code>FileUploadItem</code>.
        </DocProse>
        <DocExample
          code={`
<FileUpload multiple>
  <FileUploadDropzone>
    <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
    <p className="pt-2 text-base font-medium text-foreground">
      Drop files here or click to upload
    </p>
    <p className="text-sm text-accent-foreground">
      Any file, multiple allowed
    </p>
    <FileUploadList>
      <FilesList /> {/* maps useFileUpload state to FileUploadItem */}
    </FileUploadList>
  </FileUploadDropzone>
</FileUpload>`}
        >
          <div className="w-full max-w-md">
            <FileUpload multiple>
              <FileUploadDropzone>
                <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
                <p className="pt-2 text-base font-medium text-foreground">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-accent-foreground">
                  Any file, multiple allowed
                </p>
                <FileUploadList>
                  <FilesList />
                </FileUploadList>
              </FileUploadDropzone>
            </FileUpload>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="file-upload" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
  useFileUpload,
} from "@/components/ui/file-upload"`}
        />
        <CodeBlock
          code={`
function Files() {
  const fileStates = useFileUpload((state) => Array.from(state.files.values()))
  return (
    <>
      {fileStates.map((fs) => (
        <FileUploadItem key={fs.file.name} value={fs.file}>
          <FileUploadItemPreview />
          <FileUploadItemMetadata />
          <FileUploadItemDelete asChild>
            <Button variant="ghost" size="icon-sm">
              <Trash />
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </>
  )
}

<FileUpload multiple onValueChange={setFiles}>
  <FileUploadDropzone>
    <p>Drop files here</p>
    <FileUploadList>
      <Files />
    </FileUploadList>
  </FileUploadDropzone>
</FileUpload>`}
        />
      </DocSection>

      <DocSection title="Trigger button">
        <DocProse>
          Skip the dropzone entirely: <code>FileUploadTrigger</code> opens the
          file picker from any button, and <code>FileUploadClear</code> removes
          every file (it only renders while files are present).
        </DocProse>
        <DocExample
          code={`
<FileUpload multiple maxFiles={5}>
  <div className="flex items-center gap-2">
    <FileUploadTrigger asChild>
      <Button variant="outline" size="sm">
        <UploadIcon />
        Browse files
      </Button>
    </FileUploadTrigger>
    <FileUploadClear asChild>
      <Button variant="ghost" size="sm">
        Clear all
      </Button>
    </FileUploadClear>
  </div>
  <FileUploadList>
    <FilesList />
  </FileUploadList>
</FileUpload>`}
        >
          <div className="w-full max-w-md">
            <FileUpload multiple maxFiles={5}>
              <div className="flex items-center gap-2">
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UploadIcon />
                    Browse files
                  </Button>
                </FileUploadTrigger>
                <FileUploadClear asChild>
                  <Button variant="ghost" size="sm">
                    Clear all
                  </Button>
                </FileUploadClear>
              </div>
              <FileUploadList>
                <FilesList />
              </FileUploadList>
            </FileUpload>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Validation">
        <DocProse>
          <code>accept</code>, <code>maxFiles</code> and <code>maxSize</code>{" "}
          reject non-conforming files, briefly flagging the dropzone invalid;
          handle rejections in <code>onFileReject</code> (or run custom checks
          in <code>onFileValidate</code>).
        </DocProse>
        <DocExample
          code={`
<FileUpload
  accept="image/*"
  maxFiles={3}
  maxSize={2 * 1024 * 1024}
  multiple
  onFileReject={(file, message) => toast.error(file.name + ": " + message)}
>
  <FileUploadDropzone>
    <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
    <p className="pt-2 text-base font-medium text-foreground">
      Drop images here
    </p>
    <p className="text-sm text-accent-foreground">
      PNG / JPG / GIF – up to 2 MB each, max 3 files
    </p>
    <FileUploadList>
      <FilesList />
    </FileUploadList>
  </FileUploadDropzone>
</FileUpload>`}
        >
          <div className="w-full max-w-md">
            <FileUpload
              accept="image/*"
              maxFiles={3}
              maxSize={2 * 1024 * 1024}
              multiple
              onFileReject={(file, message) =>
                toast.error(file.name + ": " + message)
              }
            >
              <FileUploadDropzone>
                <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
                <p className="pt-2 text-base font-medium text-foreground">
                  Drop images here
                </p>
                <p className="text-sm text-accent-foreground">
                  PNG / JPG / GIF – up to 2 MB each, max 3 files
                </p>
                <FileUploadList>
                  <FilesList />
                </FileUploadList>
              </FileUploadDropzone>
            </FileUpload>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Upload progress">
        <DocProse>
          Pass <code>onUpload</code> to start uploading as soon as files are
          accepted – report per-file progress through the provided callbacks and{" "}
          <code>FileUploadItemProgress</code> renders it as a{" "}
          <code>linear</code> bar, a <code>circular</code> ring or a{" "}
          <code>fill</code> overlay.
        </DocProse>
        <DocExample
          code={`
<FileUpload
  multiple
  onUpload={async (files, { onProgress, onSuccess, onError }) => {
    await Promise.all(
      files.map((file) => uploadToServer(file, onProgress, onSuccess))
    )
  }}
>
  <FileUploadDropzone>
    <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
    <p className="pt-2 text-base font-medium text-foreground">
      Drop files to upload
    </p>
    <FileUploadList>
      {/* items render <FileUploadItemProgress variant="linear" /> */}
      <FilesList progress="linear" />
    </FileUploadList>
  </FileUploadDropzone>
</FileUpload>`}
        >
          <div className="w-full max-w-md">
            <FileUpload
              multiple
              onUpload={async (files, { onProgress, onSuccess }) => {
                await Promise.all(
                  files.map((f) => fakeUpload(f, onProgress, onSuccess))
                )
              }}
            >
              <FileUploadDropzone>
                <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
                <p className="pt-2 text-base font-medium text-foreground">
                  Drop files to upload
                </p>
                <p className="text-sm text-accent-foreground">
                  Fake upload simulates ~2s per file
                </p>
                <FileUploadList>
                  <FilesList progress="linear" />
                </FileUploadList>
              </FileUploadDropzone>
            </FileUpload>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          <code>FileUpload</code> is fully composable: the root owns the file
          store and a visually hidden <code>input type="file"</code>, and every
          part supports <code>asChild</code> to merge onto your own element.
          Files work controlled (<code>value</code> + <code>onValueChange</code>
          ) or uncontrolled (<code>defaultValue</code>).
        </DocProse>
        <PropsTable
          title="FileUpload"
          rows={[
            {
              prop: "value",
              type: "File[]",
              defaultValue: "–",
              description: "Controlled list of files.",
            },
            {
              prop: "defaultValue",
              type: "File[]",
              defaultValue: "–",
              description: "Initial files when uncontrolled.",
            },
            {
              prop: "onValueChange",
              type: "(files: File[]) => void",
              defaultValue: "–",
              description:
                "Called with the full file list whenever it changes.",
            },
            {
              prop: "onAccept",
              type: "(files: File[]) => void",
              defaultValue: "–",
              description:
                "Called once per selection with all files that passed validation.",
            },
            {
              prop: "onFileAccept",
              type: "(file: File) => void",
              defaultValue: "–",
              description: "Called for each accepted file.",
            },
            {
              prop: "onFileReject",
              type: "(file: File, message: string) => void",
              defaultValue: "–",
              description:
                "Called for each rejected file with the rejection reason.",
            },
            {
              prop: "onFileValidate",
              type: "(file: File) => string | null | undefined",
              defaultValue: "–",
              description:
                "Custom validator – return a message to reject the file.",
            },
            {
              prop: "onUpload",
              type: "(files, { onProgress, onSuccess, onError }) => Promise<void> | void",
              defaultValue: "–",
              description:
                "Upload handler run for accepted files; drive item progress via the callbacks.",
            },
            {
              prop: "accept",
              type: "string",
              defaultValue: "–",
              description:
                'Accepted types as a comma-separated list of MIME types, wildcards ("image/*") or extensions.',
            },
            {
              prop: "maxFiles",
              type: "number",
              defaultValue: "–",
              description: "Maximum number of files; extras are rejected.",
            },
            {
              prop: "maxSize",
              type: "number",
              defaultValue: "–",
              description: "Maximum size per file in bytes.",
            },
            {
              prop: "multiple",
              type: "boolean",
              defaultValue: "false",
              description: "Allow selecting more than one file.",
            },
            {
              prop: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Disables the input, dropzone, trigger and clear parts.",
            },
            {
              prop: "invalid",
              type: "boolean",
              defaultValue: "false",
              description: "Marks the upload invalid (styles the dropzone).",
            },
            {
              prop: "required",
              type: "boolean",
              defaultValue: "false",
              description: "Marks the hidden file input as required.",
            },
            {
              prop: "name",
              type: "string",
              defaultValue: "–",
              description: "Name of the hidden file input for form submission.",
            },
            {
              prop: "label",
              type: "string",
              defaultValue: '"File upload"',
              description:
                "Screen-reader label announced for the hidden file input.",
            },
            {
              prop: "dir",
              type: '"ltr" | "rtl"',
              defaultValue: "–",
              description: "Reading direction, inherited by all parts.",
            },
            {
              prop: "asChild",
              type: "boolean",
              defaultValue: "false",
              description: "Merge root props onto the child element.",
            },
          ]}
        />
        <PropsTable
          title="FileUploadList"
          rows={[
            {
              prop: "orientation",
              type: '"vertical" | "horizontal"',
              defaultValue: '"vertical"',
              description:
                "Stack items vertically or lay them out as a wrapping row of tiles. Reflected as data-orientation.",
            },
            {
              prop: "forceMount",
              type: "boolean",
              defaultValue: "false",
              description: "Render the list even while it has no files.",
            },
          ]}
        />
        <PropsTable
          title="FileUploadItem"
          rows={[
            {
              prop: "value",
              type: "File",
              defaultValue: "–",
              description:
                "The file this item represents; state is looked up in the store.",
            },
          ]}
        />
        <PropsTable
          title="FileUploadItemProgress"
          rows={[
            {
              prop: "variant",
              type: '"linear" | "circular" | "fill"',
              defaultValue: '"linear"',
              description:
                "Progress rendering – bar, SVG ring, or a translucent fill over the item.",
            },
            {
              prop: "size",
              type: "number",
              defaultValue: "40",
              description: "Diameter of the circular variant in pixels.",
            },
            {
              prop: "forceMount",
              type: "boolean",
              defaultValue: "false",
              description: "Keep rendering after progress reaches 100.",
            },
          ]}
        />
        <PropsTable
          title="FileUploadItemMetadata"
          rows={[
            {
              prop: "size",
              type: '"default" | "sm"',
              defaultValue: '"default"',
              description:
                "Typography scale of the default name + size rendering; pass children to fully replace it.",
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "FileUploadDropzone",
              description:
                'Click / drag-and-drop / paste target (data-slot="file-upload-dropzone"). Exposes data-dragging, data-invalid and data-disabled.',
            },
            {
              part: "FileUploadTrigger",
              description:
                'Button that opens the file picker (data-slot="file-upload-trigger").',
            },
            {
              part: "FileUploadList",
              description:
                'role="list" container for items; hidden until files exist (data-slot="file-upload-list").',
            },
            {
              part: "FileUploadItem",
              description:
                'role="listitem" card for one file with an sr-only status line (data-slot="file-upload-item").',
            },
            {
              part: "FileUploadItemPreview",
              description:
                'Thumbnail – an object-URL image for image files, else a type-matched file icon (data-slot="file-upload-preview"). Accepts a render prop override.',
            },
            {
              part: "FileUploadItemMetadata",
              description:
                'File name, formatted size and any error message (data-slot="file-upload-metadata").',
            },
            {
              part: "FileUploadItemProgress",
              description:
                'role="progressbar" bound to the file\'s upload progress (data-slot="file-upload-progress").',
            },
            {
              part: "FileUploadItemDelete",
              description:
                'Button that removes its file from the store (data-slot="file-upload-item-delete").',
            },
            {
              part: "FileUploadClear",
              description:
                'Button that removes all files; renders only while files exist unless forceMount (data-slot="file-upload-clear").',
            },
            {
              part: "useFileUpload",
              description:
                "Selector hook over the store state ({ files, dragOver, invalid }) – use it inside FileUpload to render the item list.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility & styling hooks">
        <DocProse>
          The real <code>input type="file"</code> stays in the tree (visually
          hidden) so forms and assistive tech see a native control, labelled via{" "}
          <code>aria-labelledby</code> from the <code>label</code> prop. The
          dropzone is a focusable <code>role="region"</code> that opens the
          picker on Enter or Space and reflects <code>aria-invalid</code> and{" "}
          <code>aria-disabled</code>; items announce name, size and upload
          status through <code>aria-describedby</code> and progress uses a
          proper <code>role="progressbar"</code>.
        </DocProse>
        <DocProse>
          For styling, every part carries a <code>data-slot</code> attribute,
          and the dropzone additionally exposes <code>data-dragging</code> while
          a drag hovers it, plus <code>data-invalid</code> and{" "}
          <code>data-disabled</code> – target these from CSS for custom drop
          states.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
