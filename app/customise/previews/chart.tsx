"use client"

import ChartPage from "../../ui/chart/page"

// Reuse the exact charts from the /ui/chart showcase page so the customise
// preview stays in sync with it.
export default function ChartPreview() {
  return (
    <div className="h-full overflow-y-auto bg-[#f3f3f3] dark:bg-[#2b2b2b]">
      <ChartPage />
    </div>
  )
}
