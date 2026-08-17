"use client"

import * as React from "react"
import { ArrowUpToLineIcon, Trash, UploadIcon } from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
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

function Items() {
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
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <FileUploadItemMetadata />
            <FileUploadItemProgress />
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

export default function FileUploadPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Dropzone">
        <FileUpload multiple className="w-full max-w-md">
          <FileUploadDropzone className="min-w-0">
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
      </PreviewCard>

      <PreviewCard label="Trigger button">
        <FileUpload multiple maxFiles={5} className="w-full max-w-md">
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
      </PreviewCard>
    </PreviewGrid>
  )
}
