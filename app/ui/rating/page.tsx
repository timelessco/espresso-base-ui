"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Rating, RatingButton } from "@/components/ui/rating"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

export default function RatingPage() {
  const [value, setValue] = useState(3)

  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} />
          ))}
        </Rating>
      </div>

      {/* Controlled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Controlled</SectionTitle>
        <div className="flex items-center gap-3">
          <Rating value={value} onValueChange={setValue}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} />
            ))}
          </Rating>
          <span className="text-sm text-muted-foreground">
            Rated {value} of 5
          </span>
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Sizes</SectionTitle>
        <div className="flex flex-col gap-3">
          <Rating defaultValue={4}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} size={16} />
            ))}
          </Rating>
          <Rating defaultValue={4}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} size={24} />
            ))}
          </Rating>
          <Rating defaultValue={4}>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton key={i} size={32} />
            ))}
          </Rating>
        </div>
      </div>

      {/* Custom max */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Custom Max (10)</SectionTitle>
        <Rating defaultValue={7} max={10}>
          {Array.from({ length: 10 }).map((_, i) => (
            <RatingButton key={i} />
          ))}
        </Rating>
      </div>

      {/* Read-only */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Read-only</SectionTitle>
        <Rating value={4} readOnly>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} />
          ))}
        </Rating>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled</SectionTitle>
        <Rating value={3} disabled>
          {Array.from({ length: 5 }).map((_, i) => (
            <RatingButton key={i} />
          ))}
        </Rating>
      </div>

      {/* Form integration */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Form Integration</SectionTitle>
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
              <RatingButton key={i} />
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
