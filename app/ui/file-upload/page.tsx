"use client"

import * as React from "react"
import { ArrowUpToLineIcon, Trash, UploadIcon, X } from "lucide-react"
import { toast } from "sonner"
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
import { Button } from "@/components/ui/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B"
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${sizes[i]}`
}

/** Renders items from the FileUpload store. Use inside a <FileUpload> tree. */
function Items({
  variant = "linear",
  fillItem = false,
}: {
  variant?: "linear" | "circular" | "fill"
  fillItem?: boolean
}) {
  const fileStates = useFileUpload((state) => Array.from(state.files.values()))

  return (
    <>
      {fileStates.map((fs) => (
        <FileUploadItem
          key={fs.file.name + fs.file.size + fs.file.lastModified}
          value={fs.file}
          className={
            fillItem ? "relative items-start overflow-hidden" : "items-start"
          }
        >
          <FileUploadItemPreview />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <FileUploadItemMetadata>
              <p className="truncate text-base font-medium text-foreground">
                {fs.file.name}
              </p>
              <p className="pt-1.5 text-sm text-secondary-foreground">
                {formatBytes(fs.file.size)} • {Math.round(fs.progress)}%
              </p>
              {fs.error && (
                <p className="text-sm text-destructive">{fs.error}</p>
              )}
            </FileUploadItemMetadata>
            <FileUploadItemProgress variant={variant} />
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

/** Square thumbnail tiles — used by the horizontal orientation example. */
function TileItems() {
  const fileStates = useFileUpload((state) => Array.from(state.files.values()))

  return (
    <>
      {fileStates.map((fs) => (
        <div
          key={fs.file.name + fs.file.size + fs.file.lastModified}
          className="flex w-15 shrink-0 flex-col gap-1.5"
        >
          <FileUploadItem value={fs.file}>
            <FileUploadItemPreview />
            <FileUploadItemDelete asChild>
              <Button variant="secondary" size="icon-sm">
                <X className="size-2.5" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
          <p className="w-full truncate text-center text-xs text-accent-foreground">
            {fs.file.name}
          </p>
        </div>
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

export default function FileUploadPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic Dropzone */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Basic Dropzone</SectionTitle>
        <FileUpload multiple>
          <FileUploadDropzone>
            <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
            <div className="flex flex-col items-center gap-1 pt-2 text-center">
              <p className="text-base font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-accent-foreground">
                Any file, multiple allowed
              </p>
            </div>
            <FileUploadList>
              <Items />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* With Trigger Button */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>With Trigger Button</SectionTitle>
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
            <Items />
          </FileUploadList>
        </FileUpload>
      </div>

      {/* With Validation */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>With Validation (images, max 2 MB)</SectionTitle>
        <FileUpload
          accept="image/*"
          maxFiles={3}
          maxSize={2 * 1024 * 1024}
          multiple
          onFileReject={(file, message) =>
            toast.error(`${file.name}: ${message}`)
          }
        >
          <FileUploadDropzone>
            <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
            <p className="pt-2 text-base font-medium text-foreground">
              Drop images here
            </p>
            <p className="text-sm text-accent-foreground">
              PNG / JPG / GIF — up to 2 MB each, max 3 files
            </p>
            <FileUploadList>
              <Items />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* Simulated Upload — Linear */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Simulated Upload (Linear)</SectionTitle>
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
              <Items variant="linear" />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* Simulated Upload — Circular */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Simulated Upload (Circular)</SectionTitle>
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
            <FileUploadList>
              <Items variant="circular" />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* Simulated Upload — Fill */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Simulated Upload (Fill)</SectionTitle>
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
            <FileUploadList>
              <Items variant="fill" fillItem />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* Horizontal Orientation */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Horizontal Orientation</SectionTitle>
        <FileUpload accept="image/*" multiple>
          <FileUploadDropzone>
            <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
            <p className="pt-2 text-base font-medium text-foreground">
              Drop images to add to the strip
            </p>
            <p className="text-sm text-accent-foreground">
              Scrolls horizontally when overflowing
            </p>
            <FileUploadList orientation="horizontal">
              <TileItems />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* Single File */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Single File</SectionTitle>
        <FileUpload maxFiles={1}>
          <FileUploadDropzone>
            <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
            <p className="pt-2 text-base font-medium text-foreground">
              Drop a single file
            </p>
            <FileUploadList>
              <Items />
            </FileUploadList>
          </FileUploadDropzone>
        </FileUpload>
      </div>

      {/* Controlled */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Controlled</SectionTitle>
        <ControlledExample />
      </div>

      {/* Disabled */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <FileUpload disabled multiple>
          <FileUploadDropzone>
            <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
            <p className="pt-2 text-base font-medium text-foreground">
              Disabled dropzone
            </p>
            <p className="text-sm text-accent-foreground">
              Cannot accept files in this state
            </p>
          </FileUploadDropzone>
        </FileUpload>
      </div>
    </div>
  )
}

function ControlledExample() {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <FileUpload multiple value={files} onValueChange={setFiles}>
      <FileUploadDropzone>
        <ArrowUpToLineIcon className="size-6 stroke-1 text-muted-foreground" />
        <p className="pt-2 text-base font-medium text-foreground">
          Drop files here
        </p>
        <FileUploadList>
          <Items />
        </FileUploadList>
      </FileUploadDropzone>
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-medium">{files.length}</span> file
        {files.length === 1 ? "" : "s"}
      </p>
    </FileUpload>
  )
}
