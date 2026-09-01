"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  Heart,
  ThumbsUp,
  Smile,
  Flame,
  Zap,
  Sparkles,
  CircleDot,
  Crown,
} from "lucide-react"
import { PreviewCard, PreviewGrid } from "./preview-card"
import { Rating, RatingButton } from "@/components/ui/rating"

export default function RatingPreview() {
  const [value, setValue] = React.useState(3)

  return (
    <PreviewGrid>
      <PreviewCard label="Default">
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Heart">
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Heart}
              className="data-filled:text-rose-500"
            />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Controlled (Thumbs Up)">
        <div className="flex items-center gap-3">
          <Rating value={value} onValueChange={setValue}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                key={i}
                icon={ThumbsUp}
                className="data-filled:text-blue-500"
              />
            ))}
          </Rating>
          <span className="text-sm text-muted-foreground">
            Rated {value} of 5
          </span>
        </div>
      </PreviewCard>

      <PreviewCard label="Sizes (Smile)">
        <div className="flex flex-col items-center gap-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Rating key={size} size={size} defaultValue={4}>
              {Array.from({ length: 5 }).map((_, i) => (
                <RatingButton
                  key={i}
                  icon={Smile}
                  className="data-filled:text-yellow-500"
                />
              ))}
            </Rating>
          ))}
        </div>
      </PreviewCard>

      <PreviewCard label="Custom Max 10 (Flame)">
        <Rating defaultValue={7} max={10}>
          {Array.from({ length: 10 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Flame}
              className="data-filled:text-orange-500"
            />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Read-only (Zap)">
        <Rating value={4} readOnly>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Zap}
              className="data-filled:text-amber-400"
            />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Disabled (Sparkles)">
        <Rating value={3} disabled>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Sparkles}
              className="data-filled:text-purple-500"
            />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Mixed Icons (empty vs filled)">
        <Rating defaultValue={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              emptyIcon={CircleDot}
              filledIcon={Crown}
              className="data-filled:text-emerald-500"
            />
          ))}
        </Rating>
      </PreviewCard>

      <PreviewCard label="Form Integration (Heart)">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            toast(`Rating: ${data.get("rating")}`)
          }}
          className="flex flex-col items-center gap-3"
        >
          <Rating name="rating" defaultValue={0} required>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                key={i}
                icon={Heart}
                className="data-filled:text-rose-500"
              />
            ))}
          </Rating>
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          >
            Submit
          </button>
        </form>
      </PreviewCard>
    </PreviewGrid>
  )
}
