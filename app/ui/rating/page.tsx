"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Star,
  Heart,
  ThumbsUp,
  Smile,
  Flame,
  Zap,
  Sparkles,
  CircleDot,
  Crown,
} from "lucide-react"
import { Rating, RatingButton } from "@/components/ui/rating"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function RatingPage() {
  const [value, setValue] = useState(3)

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default — Star */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default (Star)</SectionTitle>
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} icon={Star} />
          ))}
        </Rating>
      </div>

      {/* Heart */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Heart</SectionTitle>
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Heart}
              className="data-filled:text-rose-500"
            />
          ))}
        </Rating>
      </div>

      {/* Controlled — Thumbs Up */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Controlled (Thumbs Up)</SectionTitle>
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
      </div>

      {/* Sizes — Smile */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes (Smile)</SectionTitle>
        <div className="flex flex-col gap-3">
          <Rating defaultValue={4}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                key={i}
                icon={Smile}
                size={16}
                className="data-filled:text-yellow-500"
              />
            ))}
          </Rating>
          <Rating defaultValue={4}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                key={i}
                icon={Smile}
                size={24}
                className="data-filled:text-yellow-500"
              />
            ))}
          </Rating>
          <Rating defaultValue={4}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                key={i}
                icon={Smile}
                size={32}
                className="data-filled:text-yellow-500"
              />
            ))}
          </Rating>
        </div>
      </div>

      {/* Custom Max — Flame */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Custom Max 10 (Flame)</SectionTitle>
        <Rating defaultValue={7} max={10}>
          {Array.from({ length: 10 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Flame}
              className="data-filled:text-orange-500"
            />
          ))}
        </Rating>
      </div>

      {/* Read-only — Zap */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Read-only (Zap)</SectionTitle>
        <Rating value={4} readOnly>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Zap}
              className="data-filled:text-amber-400"
            />
          ))}
        </Rating>
      </div>

      {/* Disabled — Sparkles */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled (Sparkles)</SectionTitle>
        <Rating value={3} disabled>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton
              key={i}
              icon={Sparkles}
              className="data-filled:text-purple-500"
            />
          ))}
        </Rating>
      </div>

      {/* Different empty/filled icons */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Mixed Icons (empty vs filled)</SectionTitle>
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
      </div>

      {/* Form integration — Heart */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Form Integration (Heart)</SectionTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            toast(`Rating: ${data.get("rating")}`)
          }}
          className="flex flex-col items-start gap-3"
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
      </div>
    </div>
  )
}
