"use client"

import * as React from "react"
import { FileText, FileSpreadsheet, Download, TriangleAlert, X } from "lucide-react"

import { PreviewCard, PreviewGrid } from "./preview-card"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"

export default function AttachmentPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="File">
        <Attachment className="w-full max-w-sm">
          <AttachmentMedia>
            <FileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove">
              <X />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </PreviewCard>

      <PreviewCard label="Image">
        <Attachment className="w-full max-w-sm">
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
            <AttachmentAction aria-label="Download">
              <Download />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove">
              <X />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {(["default", "sm", "xs"] as const).map((size) => (
            <Attachment key={size} size={size}>
              <AttachmentMedia>
                <FileText />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>proposal.docx</AttachmentTitle>
                <AttachmentDescription>size = {size}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                  <X />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="States">
        <div className="flex w-full max-w-sm flex-col gap-3">
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
              <TriangleAlert />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>archive.zip</AttachmentTitle>
              <AttachmentDescription>Upload failed</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </PreviewCard>

      <PreviewCard label="Vertical (media on top)">
        <AttachmentGroup>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&dpr=2&q=80"
                alt="Headphones"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>headphones.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 1.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <FileSpreadsheet />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>budget.xlsx</AttachmentTitle>
              <AttachmentDescription>XLSX · 320 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </PreviewCard>
    </PreviewGrid>
  )
}
