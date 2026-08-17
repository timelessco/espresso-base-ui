"use client"

import * as React from "react"
import { Star, Heart } from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Rating, RatingButton } from "@/components/ui/rating"

export default function RatingPreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Default (Star)">
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} icon={Star} />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Heart">
        <Rating defaultValue={4}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Heart}
              className="data-filled:text-rose-500"
            />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Sizes">
        <div className="flex flex-col items-center gap-3">
          <Rating defaultValue={3}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} icon={Star} size={16} />
            ))}
          </Rating>
          <Rating defaultValue={3}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} icon={Star} size={28} />
            ))}
          </Rating>
        </div>
      </PreviewCard>

      <PreviewCard label="Read only">
        <Rating defaultValue={4} readOnly>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} icon={Star} />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Disabled">
        <Rating defaultValue={2} disabled>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} icon={Star} />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Max 10">
        <Rating defaultValue={7} max={10}>
          {Array.from({ length: 10 }).map((_, i) => (
            <RatingButton key={i} icon={Star} size={18} />
          ))}
        </Rating>
      </PreviewCard>
    </PreviewGrid>
  )
}
