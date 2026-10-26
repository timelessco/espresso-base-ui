"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEventContext } from "./context"
import { useNow } from "./hooks"
import { daysList, monthList, parseDate } from "./utils"

/** The red line at the current time, inside today's column. */
export function EventTimeMarker({ date }: { date: Date | string }) {
  const { config } = useEventContext("EventTimeMarker")
  const now = useNow()

  if (parseDate(date) !== parseDate(now)) return null

  const minuteHeight = config.hourHeight / 60
  const top = (now.getHours() * 60 + now.getMinutes()) * minuteHeight

  const hours = now.getHours()
  const twelve = hours % 12 || 12
  const label = `${daysList[now.getDay()]}, ${monthList[now.getMonth()].slice(0, 3)} ${now.getDate()}, ${now.getFullYear()} ${twelve}:${String(now.getMinutes()).padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`

  return (
    <div className="absolute w-full px-px" style={{ top: `${top}px` }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<div className="current-time" />} />
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
