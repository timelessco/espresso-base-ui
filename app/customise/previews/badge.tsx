"use client"

import * as React from "react"
import { Diamond } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PreviewCard, PreviewGrid } from "./preview-card"

export default function BadgePreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Variants">
        <Badge variant="default">default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge variant="ghost">ghost</Badge>
        <Badge variant="link">link</Badge>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <Badge size="default">default</Badge>
        <Badge size="md">medium</Badge>
        <Badge size="lg">large</Badge>
      </PreviewCard>

      <PreviewCard label="Sizes x Variants">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">default</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="default">default</Badge>
              <Badge variant="secondary" size="default">secondary</Badge>
              <Badge variant="destructive" size="default">destructive</Badge>
              <Badge variant="outline" size="default">outline</Badge>
              <Badge variant="ghost" size="default">ghost</Badge>
              <Badge variant="link" size="default">link</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">md</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="md">default</Badge>
              <Badge variant="secondary" size="md">secondary</Badge>
              <Badge variant="destructive" size="md">destructive</Badge>
              <Badge variant="outline" size="md">outline</Badge>
              <Badge variant="ghost" size="md">ghost</Badge>
              <Badge variant="link" size="md">link</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">lg</span>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" size="lg">default</Badge>
              <Badge variant="secondary" size="lg">secondary</Badge>
              <Badge variant="destructive" size="lg">destructive</Badge>
              <Badge variant="outline" size="lg">outline</Badge>
              <Badge variant="ghost" size="lg">ghost</Badge>
              <Badge variant="link" size="lg">link</Badge>
            </div>
          </div>
        </div>
      </PreviewCard>

      <PreviewCard label="With Icon Start">
        <Badge variant="default"><Diamond data-icon="inline-start" />default</Badge>
        <Badge variant="secondary"><Diamond data-icon="inline-start" />secondary</Badge>
        <Badge variant="destructive"><Diamond data-icon="inline-start" />destructive</Badge>
        <Badge variant="outline"><Diamond data-icon="inline-start" />outline</Badge>
        <Badge variant="ghost"><Diamond data-icon="inline-start" />ghost</Badge>
        <Badge variant="link"><Diamond data-icon="inline-start" />link</Badge>
      </PreviewCard>

      <PreviewCard label="With Icon End">
        <Badge variant="default">default<Diamond data-icon="inline-end" /></Badge>
        <Badge variant="secondary">secondary<Diamond data-icon="inline-end" /></Badge>
        <Badge variant="destructive">destructive<Diamond data-icon="inline-end" /></Badge>
        <Badge variant="outline">outline<Diamond data-icon="inline-end" /></Badge>
        <Badge variant="ghost">ghost<Diamond data-icon="inline-end" /></Badge>
        <Badge variant="link">link<Diamond data-icon="inline-end" /></Badge>
      </PreviewCard>

      <PreviewCard label="As Link">
        <Badge variant="default" render={<a href="#" />}>default</Badge>
        <Badge variant="secondary" render={<a href="#" />}>secondary</Badge>
        <Badge variant="destructive" render={<a href="#" />}>destructive</Badge>
        <Badge variant="outline" render={<a href="#" />}>outline</Badge>
        <Badge variant="ghost" render={<a href="#" />}>ghost</Badge>
        <Badge variant="link" render={<a href="#" />}>link</Badge>
      </PreviewCard>

      <PreviewCard label="Color Badges">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-blue-600 text-blue-100"><Diamond data-icon="inline-start" />Blue</Badge>
            <Badge className="bg-blue-600 text-blue-100">Blue<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-blue-600 text-blue-100">Blue</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-green-600 text-green-100"><Diamond data-icon="inline-start" />Green</Badge>
            <Badge className="bg-green-600 text-green-100">Green<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-green-600 text-green-100">Green</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-amber-600 text-amber-100"><Diamond data-icon="inline-start" />Amber</Badge>
            <Badge className="bg-amber-600 text-amber-100">Amber<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-amber-600 text-amber-100">Amber</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-violet-600 text-violet-100"><Diamond data-icon="inline-start" />Violet</Badge>
            <Badge className="bg-violet-600 text-violet-100">Violet<Diamond data-icon="inline-end" /></Badge>
            <Badge className="bg-violet-600 text-violet-100">Violet</Badge>
          </div>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
