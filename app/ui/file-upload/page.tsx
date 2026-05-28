"use client"

import * as React from "react"
import { CloudUploadIcon, UploadIcon, X } from "lucide-react"
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

/** Renders items from the FileUpload store. Use inside a <FileUpload> tree. */
function Items({
  variant = "linear",
  fillItem = false,
}: {
  variant?: "linear" | "circular" | "fill"
  fillItem?: boolean
}) {
  const files = useFileUpload((state) =>
    Array.from(state.files.values()).map((f) => f.file)
  )

  return (
    <>
      {files.map((file) => (
        <FileUploadItem
          key={file.name + file.size + file.lastModified}
          value={file}
          className={fillItem ? "relative overflow-hidden" : undefined}
        >
          <FileUploadItemPreview />
          <FileUploadItemMetadata />
          <FileUploadItemProgress variant={variant} />
          <FileUploadItemDelete asChild>
            <Button variant="ghost" size="icon-xs">
              <X />
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

export default function FileUploadPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Basic Dropzone */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Basic Dropzone</SectionTitle>
        <FileUpload multiple>
          <FileUploadDropzone>
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                Any file, multiple allowed
              </p>
            </div>
          </FileUploadDropzone>
          <FileUploadList>
            <Items />
          </FileUploadList>
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
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Drop images here</p>
            <p className="text-xs text-muted-foreground">
              PNG / JPG / GIF — up to 2 MB each, max 3 files
            </p>
          </FileUploadDropzone>
          <FileUploadList>
            <Items />
          </FileUploadList>
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
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Drop files to upload</p>
            <p className="text-xs text-muted-foreground">
              Fake upload simulates ~2s per file
            </p>
          </FileUploadDropzone>
          <FileUploadList>
            <Items variant="linear" />
          </FileUploadList>
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
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Drop files to upload</p>
          </FileUploadDropzone>
          <FileUploadList>
            <Items variant="circular" />
          </FileUploadList>
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
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Drop files to upload</p>
          </FileUploadDropzone>
          <FileUploadList>
            <Items variant="fill" fillItem />
          </FileUploadList>
        </FileUpload>
      </div>

      {/* Single File */}
      <div className="flex max-w-md flex-col gap-4">
        <SectionTitle>Single File</SectionTitle>
        <FileUpload maxFiles={1}>
          <FileUploadDropzone>
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Drop a single file</p>
          </FileUploadDropzone>
          <FileUploadList>
            <Items />
          </FileUploadList>
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
            <CloudUploadIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Disabled dropzone</p>
            <p className="text-xs text-muted-foreground">
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
        <CloudUploadIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">Drop files here</p>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem
            key={file.name + file.size + file.lastModified}
            value={file}
          >
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon-xs">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-medium">{files.length}</span> file
        {files.length === 1 ? "" : "s"}
      </p>
    </FileUpload>
  )
}
