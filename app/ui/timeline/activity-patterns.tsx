"use client"

/**
 * The frappe espresso playground's Activity patterns (playground/activity),
 * built from our own components at the playground's measurements: a 788px
 * feed, a 28px rail 16 from the entry, entries 20 apart inside a month and
 * the months 16 apart, each folding away behind its own chip.
 *
 * Type is the playground's: its sizes carry their own line heights (14/18.9,
 * 13/17.55, 12/16.2, the 14/21 paragraph) at 0.02em, which our sizes alone
 * would set on a tighter 1.15.
 */
import * as React from "react"
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
  EyeOffIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIncomingIcon,
  PhoneMissedIcon,
  PhoneOutgoingIcon,
  ReplyAllIcon,
  ReplyIcon,
  VolumeXIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

/* ── Type ──────────────────────────────────────────────────────────────── */

const T_BASE = "text-[14px]/[18.9px] font-normal tracking-[0.02em]"
const T_BASE_MEDIUM = "text-[14px]/[18.9px] font-medium tracking-[0.015em]"
const T_P = "text-[14px]/[21px] font-normal tracking-[0.02em]"
const T_SM = "text-[13px]/[17.55px] font-normal tracking-[0.02em]"
const T_XS = "text-[12px]/[16.2px] font-normal tracking-[0.02em]"

/* ── Faces ─────────────────────────────────────────────────────────────── */

/** The playground's twelve faces, picked by a sum over the name. */
function faceFor(name: string) {
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return `/images/activity/face-${(sum % 12) + 1}.png`
}

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

function Face({
  name,
  size,
  className,
}: {
  name: string
  size: "sm" | "default" | "lg"
  className?: string
}) {
  return (
    <Avatar size={size} className={className}>
      <AvatarImage src={faceFor(name)} alt={name} />
      <AvatarFallback>{initialsOf(name)}</AvatarFallback>
    </Avatar>
  )
}

/**
 * 20px faces overlapping by 4, each ringed in the card's colour so the one in
 * front cuts a clean edge out of the one behind. Later faces sit in front.
 */
function AvatarStack({
  people,
  initials = [],
  className,
}: {
  people: string[]
  initials?: string[]
  className?: string
}) {
  return (
    <div className={cn("flex shrink-0 items-center -space-x-1", className)}>
      {people.map((person) => (
        <Face
          key={person}
          name={person}
          size="sm"
          className="ring-2 ring-card"
        />
      ))}
      {initials.map((letter) => (
        <Avatar key={letter} size="sm" className="ring-2 ring-card">
          <AvatarFallback className="text-[13px] leading-[17.55px]! text-accent-foreground">
            {letter}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}

/* ── The file's own line icons ─────────────────────────────────────────── */

type ActivityIconName =
  | "calendar"
  | "time"
  | "play"
  | "notes"
  | "pause"
  | "volume"
  | "dots"
  | "play-16"

/** The call card's and player's glyphs, as the Espresso file draws them. */
const ICONS: Record<ActivityIconName, { box: number; d: string }> = {
  calendar: {
    box: 12,
    d: "M8.8252 0.354492C9.10129 0.354492 9.32511 0.578422 9.3252 0.854492V1.66211C9.32517 1.69319 9.32088 1.72342 9.31543 1.75293C9.53104 1.79317 9.7148 1.84951 9.88184 1.93457C10.3521 2.17426 10.735 2.55701 10.9746 3.02734C11.2469 3.56208 11.2471 4.26228 11.2471 5.66211V7.26172C11.2471 8.66166 11.2471 9.36272 10.9746 9.89746L10.8779 10.0693C10.6377 10.4608 10.2933 10.7796 9.88184 10.9893C9.3471 11.2616 8.64692 11.2617 7.24707 11.2617H4.75391L3.82715 11.2578C3.14966 11.2472 2.6935 11.2095 2.32812 11.0791L2.11914 10.9893C1.70767 10.7796 1.36324 10.4608 1.12305 10.0693L1.02637 9.89746C0.753901 9.36272 0.753906 8.66167 0.753906 7.26172V5.66211C0.753906 4.43704 0.754002 3.74772 0.936523 3.23633L1.02637 3.02734C1.23601 2.6159 1.55488 2.27144 1.94629 2.03125L2.11914 1.93457C2.286 1.84957 2.46928 1.79317 2.68457 1.75293C2.67914 1.72347 2.67581 1.69312 2.67578 1.66211V0.854492C2.67587 0.578422 2.89969 0.354492 3.17578 0.354492C3.45167 0.35473 3.6757 0.578569 3.67578 0.854492V1.66211C3.67578 1.66434 3.67484 1.66672 3.6748 1.66895C3.98177 1.66173 4.33684 1.66211 4.75391 1.66211H7.24707C7.66373 1.66211 8.01842 1.66174 8.3252 1.66895V0.854492C8.32528 0.578569 8.54931 0.354731 8.8252 0.354492ZM1.75391 5.66211V7.26172C1.75391 7.97784 1.75426 8.45566 1.78418 8.82227C1.81319 9.17711 1.86456 9.34047 1.91699 9.44336C2.06081 9.72546 2.2911 9.95488 2.57324 10.0986C2.67619 10.151 2.83886 10.2025 3.19336 10.2314C3.56005 10.2614 4.03745 10.2617 4.75391 10.2617H7.24707C7.9634 10.2617 8.44096 10.2614 8.80762 10.2314C9.16257 10.2024 9.3258 10.1511 9.42871 10.0986C9.7107 9.95487 9.94022 9.72535 10.084 9.44336C10.1364 9.34046 10.1878 9.17712 10.2168 8.82227C10.2467 8.45566 10.2471 7.97786 10.2471 7.26172V5.66211C10.2471 5.56765 10.2462 5.47707 10.2461 5.39062H1.75488C1.7548 5.47707 1.75391 5.56765 1.75391 5.66211ZM4.75391 2.66211C4.03744 2.66211 3.56005 2.66243 3.19336 2.69238C2.8388 2.72135 2.67619 2.77283 2.57324 2.8252C2.29101 2.96901 2.0608 3.19921 1.91699 3.48145C1.86465 3.5844 1.81313 3.7472 1.78418 4.10156C1.7769 4.19075 1.77178 4.2865 1.76758 4.39062H10.2334C10.2292 4.2865 10.2241 4.19075 10.2168 4.10156C10.1878 3.7472 10.1363 3.5844 10.084 3.48145C9.94024 3.19933 9.71078 2.96902 9.42871 2.8252C9.3258 2.77276 9.16256 2.72139 8.80762 2.69238C8.44096 2.66245 7.96338 2.66211 7.24707 2.66211H4.75391Z",
  },
  time: {
    box: 12,
    d: "M6 0.5625C9.00305 0.5625 11.4375 2.99695 11.4375 6C11.4375 9.00305 9.00305 11.4375 6 11.4375C2.99695 11.4375 0.5625 9.00305 0.5625 6C0.5625 2.99695 2.99695 0.5625 6 0.5625ZM6 1.5625C3.54924 1.5625 1.5625 3.54924 1.5625 6C1.5625 8.45076 3.54924 10.4375 6 10.4375C8.45076 10.4375 10.4375 8.45076 10.4375 6C10.4375 3.54924 8.45076 1.5625 6 1.5625ZM5.99902 2.5C6.27501 2.5 6.49974 2.72407 6.5 3V5.5H9C9.27603 5.50007 9.49992 5.72397 9.5 6C9.49994 6.27605 9.27605 6.49993 9 6.5H6.25C5.83593 6.4999 5.5001 6.16407 5.5 5.75V3C5.50012 2.72428 5.7234 2.50053 5.99902 2.5Z",
  },
  play: {
    box: 12,
    d: "M3.28125 1.8464C3.61382 1.70276 4.01214 1.73364 4.30957 1.92648L9.54688 5.32101C9.79382 5.48132 9.93945 5.73371 9.93945 6.0007C9.93915 6.26752 9.79381 6.51928 9.54688 6.67941L4.30957 10.0739C4.01222 10.2667 3.61377 10.2975 3.28125 10.154C2.94879 10.0103 2.73848 9.71654 2.73828 9.39523V2.60519C2.73834 2.28375 2.94867 1.99015 3.28125 1.8464ZM3.73828 9.24191C3.75597 9.23943 3.76562 9.23505 3.76562 9.23507L8.75586 5.99972L3.76562 2.76535C3.76561 2.76536 3.7559 2.76098 3.73828 2.75851V9.24191Z",
  },
  notes: {
    box: 12,
    d: "M6.99707 0.75C7.69213 0.750068 8.35613 1.0395 8.8291 1.54883L10.2051 3.03027C10.4641 3.30929 10.6521 3.6419 10.7617 4H10.873V8.75C10.873 10.1306 9.75365 11.2499 8.37305 11.25H3.62305C2.24233 11.25 1.12305 10.1307 1.12305 8.75V3.25C1.12305 1.86929 2.24233 0.75 3.62305 0.75H6.99707ZM3.62305 1.75C2.79462 1.75 2.12305 2.42157 2.12305 3.25V8.75C2.12305 9.57843 2.79462 10.25 3.62305 10.25H8.37305C9.20136 10.2499 9.87305 9.57835 9.87305 8.75V5H8.5C7.67174 5 7.00026 4.3282 7 3.5V1.75H3.62305ZM8.25 8.125C8.52614 8.125 8.75 8.34886 8.75 8.625C8.75 8.90114 8.52614 9.125 8.25 9.125H3.75C3.47386 9.125 3.25 8.90114 3.25 8.625C3.25 8.34886 3.47386 8.125 3.75 8.125H8.25ZM8.25 6.25C8.52614 6.25 8.75 6.47386 8.75 6.75C8.75 7.02614 8.52614 7.25 8.25 7.25H3.75C3.47386 7.25 3.25 7.02614 3.25 6.75C3.25 6.47386 3.47386 6.25 3.75 6.25H8.25ZM8 3.5C8.00026 3.77592 8.22402 4 8.5 4H9.68066C9.62295 3.89673 9.55436 3.79897 9.47266 3.71094L8.09668 2.22949C8.06602 2.19648 8.03322 2.16563 8 2.13574V3.5Z",
  },
  pause: {
    box: 16,
    d: "M4.5 2C5.88071 2 7 3.11929 7 4.5V11.5C7 12.8807 5.88071 14 4.5 14C3.11929 14 2 12.8807 2 11.5V4.5C2 3.11929 3.11929 2 4.5 2ZM11.5 2C12.8807 2 14 3.11929 14 4.5V11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5V4.5C9 3.11929 10.1193 2 11.5 2ZM4.5 3C3.67157 3 3 3.67157 3 4.5V11.5C3 12.3284 3.67157 13 4.5 13C5.32843 13 6 12.3284 6 11.5V4.5C6 3.67157 5.32843 3 4.5 3ZM11.5 3C10.6716 3 10 3.67157 10 4.5V11.5C10 12.3284 10.6716 13 11.5 13C12.3284 13 13 12.3284 13 11.5V4.5C13 3.67157 12.3284 3 11.5 3Z",
  },
  volume: {
    box: 16,
    d: "M9.48438 1.58905C9.6371 1.48312 9.83623 1.47084 10.001 1.55683C10.1658 1.6431 10.2695 1.81413 10.2695 2.00019V14.0002C10.2695 14.1862 10.1658 14.3573 10.001 14.4435C9.83623 14.5295 9.6371 14.5173 9.48438 14.4113L4.89648 11.2277H2.69336C2.25999 11.2277 1.83694 11.0682 1.51953 10.7746C1.20104 10.4799 1.01377 10.0717 1.01367 9.63691V6.36347C1.01377 5.92863 1.20104 5.52048 1.51953 5.22577C1.83694 4.93218 2.25999 4.77265 2.69336 4.77265H4.89648L9.48438 1.58905ZM5.33691 5.68378C5.25322 5.74184 5.15362 5.77265 5.05176 5.77265H2.69336C2.50113 5.77265 2.3232 5.84359 2.19824 5.95917C2.07473 6.07344 2.01377 6.22002 2.01367 6.36347V9.63691C2.01377 9.78035 2.07473 9.92694 2.19824 10.0412C2.3232 10.1568 2.50113 10.2277 2.69336 10.2277H5.05176L5.12793 10.2336C5.20267 10.2451 5.27424 10.2731 5.33691 10.3166L9.26953 13.0441V2.95526L5.33691 5.68378ZM12.5156 4.13105C12.6983 3.92434 13.0147 3.90458 13.2217 4.0871C13.7766 4.57665 14.2209 5.17921 14.5254 5.8537C14.8299 6.5283 14.9883 7.26005 14.9883 8.00019C14.9883 8.7403 14.8298 9.47208 14.5254 10.1467C14.2209 10.8211 13.7766 11.4237 13.2217 11.9133C13.0147 12.0958 12.6983 12.0762 12.5156 11.8693C12.333 11.6622 12.3525 11.3459 12.5596 11.1633C13.0082 10.7675 13.3681 10.2808 13.6143 9.73554C13.8604 9.19022 13.9883 8.59848 13.9883 8.00019C13.9883 7.40192 13.8604 6.81013 13.6143 6.26483C13.3681 5.71964 13.0082 5.2328 12.5596 4.8371C12.3526 4.65442 12.333 4.33809 12.5156 4.13105Z",
  },
  dots: {
    box: 16,
    d: "M3 6.5C3.82843 6.5 4.5 7.17157 4.5 8C4.5 8.82843 3.82843 9.5 3 9.5C2.17157 9.5 1.5 8.82843 1.5 8C1.5 7.17157 2.17157 6.5 3 6.5ZM8 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5ZM13 6.5C13.8284 6.5 14.5 7.17157 14.5 8C14.5 8.82843 13.8284 9.5 13 9.5C12.1716 9.5 11.5 8.82843 11.5 8C11.5 7.17157 12.1716 6.5 13 6.5Z",
  },
  "play-16": {
    box: 16,
    d: "M4.37402 2.46088C4.81749 2.26924 5.34848 2.31114 5.74512 2.5683L12.7285 7.09467C13.0581 7.30836 13.2519 7.6438 13.252 7.99994C13.252 8.35614 13.0581 8.6915 12.7285 8.90522L5.74512 13.4326C5.34846 13.6897 4.81749 13.7307 4.37402 13.539C3.93053 13.3473 3.65039 12.955 3.65039 12.5263V3.47358C3.65039 3.04493 3.93053 2.65258 4.37402 2.46088ZM5.20117 3.40717C5.09252 3.33672 4.91509 3.31636 4.77051 3.37885C4.70564 3.40692 4.67266 3.44104 4.65918 3.4599C4.64672 3.47734 4.65034 3.48156 4.65039 3.47358V12.5263C4.65026 12.5188 4.64704 12.5229 4.65918 12.54C4.67266 12.5588 4.70571 12.593 4.77051 12.621C4.91509 12.6835 5.09252 12.6632 5.20117 12.5927L12.1846 8.06635L12.2295 8.03022C12.2395 8.01977 12.2458 8.01134 12.249 8.0058C12.255 7.99554 12.253 7.99403 12.2529 7.99994C12.2529 8.00594 12.2547 8.00496 12.249 7.99506C12.2426 7.98389 12.2243 7.95928 12.1846 7.93354L5.20117 3.40717Z",
  },
}

function ActivityIcon({
  name,
  className,
}: {
  name: ActivityIconName
  className?: string
}) {
  const icon = ICONS[name]
  return (
    <svg
      viewBox={`0 0 ${icon.box} ${icon.box}`}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.d} />
    </svg>
  )
}

/** The attachments' file marks, traced from the Espresso file. */
function FileIcon({ type }: { type: "zip" | "pdf" | "doc" }) {
  const shadowId = React.useId()
  return (
    <svg
      className="size-4 shrink-0"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {type === "zip" ? (
        <>
          <rect
            x="2.5"
            y="2.5"
            width="27"
            height="27"
            rx="2.5"
            fill="var(--border)"
            stroke="var(--border)"
          />
          <g filter={`url(#${shadowId})`}>
            <path
              d="M16 20H20V22.5C20 24.7091 18.2091 26.5 16 26.5C13.7909 26.5 12 24.7091 12 22.5V18H16V20ZM16 21.5C15.1716 21.5 14.5 22.1716 14.5 23C14.5 23.8284 15.1716 24.5 16 24.5C16.8284 24.5 17.5 23.8284 17.5 23C17.5 22.1716 16.8284 21.5 16 21.5ZM20 18H16V16H20V18ZM16 16H12V14H16V16ZM20 14H16V12H20V14ZM16 12H12V10H16V12ZM20 10H16V8H20V10ZM16 8H12V6H16V8ZM20 6H16V4H20V6ZM16 4H12V2H16V4Z"
              fill="var(--accent-foreground)"
            />
          </g>
          <defs>
            <filter
              id={shadowId}
              x="12"
              y="2"
              width="8"
              height="25.5"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.5" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend in2="shape" result="innerShadow" />
            </filter>
          </defs>
        </>
      ) : type === "pdf" ? (
        <path
          className="fill-red-500 dark:fill-red-400"
          d="M24 2C27.3137 2 30 4.68629 30 8V24C30 27.3137 27.3137 30 24 30H8C4.68629 30 2 27.3137 2 24V8C2 4.68629 4.68629 2 8 2H24ZM14.8945 6C14.3431 6.00027 13.8913 6.24378 13.5898 6.70508C12.6942 8.07566 13.3908 10.938 14.2891 13.0586C13.8705 14.2401 13.3489 15.5143 12.7734 16.7559C12.1244 18.1565 11.4827 19.4305 10.8652 20.5449C9.10171 21.3793 6.28895 22.9298 6.02148 24.4395C5.94437 24.8769 6.07348 25.2785 6.39453 25.5996C6.65637 25.8614 6.97938 26 7.32812 26C8.04602 26 9.26867 25.5136 11.6172 21.3555C12.9708 20.7346 14.457 20.1775 15.9258 19.7422C16.9931 19.4262 18.0617 19.1779 19.1055 19.0039C20.8262 20.0601 22.8264 20.7363 24.25 20.7363C25.8236 20.7361 25.9856 19.8449 25.998 19.5723C26.0149 19.199 25.882 18.8534 25.6133 18.5723C25.0424 17.9749 23.878 17.6719 22.1543 17.6719C21.2965 17.6719 20.3486 17.7499 19.334 17.9023C18.3072 17.2251 17.4587 16.4269 16.873 15.5859C16.3228 14.7966 15.8348 13.9323 15.4199 13.0156C16.5437 9.72437 16.7629 7.56148 16.0703 6.58789C15.7963 6.20322 15.3889 6 14.8945 6ZM9.86328 22.2402C8.23856 24.7977 7.48147 24.9472 7.32812 24.9473C7.27767 24.9473 7.21936 24.9359 7.13867 24.8555C7.05277 24.769 7.04417 24.7049 7.05859 24.623C7.14577 24.1302 8.04887 23.2544 9.86328 22.2402ZM14.9336 14.416C15.2607 15.0362 15.6209 15.6293 16.0098 16.1875C16.49 16.877 17.1202 17.5377 17.8652 18.1348L17.7598 18.1504L17.8047 18.1797C17.083 18.3325 16.3542 18.5169 15.627 18.7324C14.5645 19.0472 13.4926 19.4239 12.4648 19.8418L12.498 19.7832L12.4551 19.8027C12.8736 18.9943 13.3002 18.1222 13.7285 17.1973C14.1523 16.2828 14.5478 15.3497 14.8965 14.4473L14.9102 14.4805L14.9336 14.416ZM22.1543 18.7246C24.1449 18.7246 24.7217 19.1633 24.8516 19.2988C24.9397 19.391 24.9491 19.4652 24.9453 19.5371C24.9253 19.5682 24.7495 19.6835 24.25 19.6836C23.4685 19.6836 22.2322 19.3976 20.9023 18.7773C21.3396 18.7423 21.7577 18.7246 22.1543 18.7246ZM14.8945 7.05273C15.0702 7.05273 15.1488 7.11044 15.2109 7.19727C15.5196 7.63122 15.5407 8.97142 14.8086 11.4629C14.1318 9.43349 14.0977 7.85473 14.4727 7.28125C14.5771 7.12146 14.7033 7.05295 14.8945 7.05273Z"
        />
      ) : (
        <path
          fill="var(--color-blue-500)"
          d="M24 2C27.3137 2 30 4.68629 30 8V24C30 27.3137 27.3137 30 24 30H8C4.68629 30 2 27.3137 2 24V8C2 4.68629 4.68629 2 8 2H24ZM9 20V22H19V20H9ZM9 15V17H23V15H9ZM9 10V12H23V10H9Z"
        />
      )}
    </svg>
  )
}

/* ── The feed, its runs and its entries ────────────────────────────────── */

/**
 * Stacks runs of entries and the month chips between them, and carries the
 * hairline down the rail: from the first thing in the feed (a chip's bottom
 * edge or a mark's middle) to the last (a mark's middle, never past it, or a
 * chip's top edge). Where those fall depends on how tall the entries are, so
 * it is measured; a chip is opaque and positioned, so it paints over the
 * line.
 */
function ActivityFeed({
  gap = 16,
  children,
}: {
  gap?: number
  children: React.ReactNode
}) {
  const feed = React.useRef<HTMLDivElement>(null)
  const rail = React.useRef<HTMLDivElement>(null)
  const [line, setLine] = React.useState({ top: 0, height: 0 })

  React.useEffect(() => {
    const el = feed.current
    if (!el) return

    const measure = () => {
      // Only what is drawn counts: a mark in a folded run is clipped by the
      // run, and counts while its middle is showing.
      const nodes = [
        ...el.querySelectorAll("[data-rail-mark], [data-rail-cap]"),
      ]
        .map((node) => {
          const box = node.getBoundingClientRect()
          const clip = node.closest("[data-clip]")?.getBoundingClientRect()
          const middle = box.top + box.height / 2
          const showing = clip
            ? middle >= clip.top && middle <= clip.bottom
            : box.height > 0
          return { cap: node.hasAttribute("data-rail-cap"), box, showing }
        })
        .filter((node) => node.showing)

      if (nodes.length < 2) {
        setLine({ top: 0, height: 0 })
        return
      }
      const centre = (box: DOMRect) => box.top + box.height / 2
      const head = nodes[0]
      const tail = nodes[nodes.length - 1]
      const top = head.cap ? head.box.bottom : centre(head.box)
      const bottom = tail.cap ? tail.box.top : centre(tail.box)
      const base = el.getBoundingClientRect()
      setLine({ top: top - base.top, height: Math.max(0, bottom - top) })
    }

    // Several things can move the marks at once, so the work is coalesced.
    let pending = false
    const remeasure = () => {
      if (pending) return
      pending = true
      setTimeout(() => {
        pending = false
        measure()
      })
    }

    measure()
    const sizes = new ResizeObserver(remeasure)
    sizes.observe(el)
    // A fold is a style change, not always a size change; the line's own
    // style changes are ignored or this would never settle.
    const changes = new MutationObserver((records) => {
      if (records.every((record) => record.target === rail.current)) return
      remeasure()
    })
    changes.observe(el, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
      subtree: true,
    })
    // The fold animates: follow it to the end.
    el.addEventListener("transitionend", remeasure)
    window.addEventListener("resize", remeasure)
    return () => {
      sizes.disconnect()
      changes.disconnect()
      el.removeEventListener("transitionend", remeasure)
      window.removeEventListener("resize", remeasure)
    }
  }, [])

  return (
    <div ref={feed} className="relative flex flex-col" style={{ gap }}>
      <div
        ref={rail}
        aria-hidden="true"
        className="pointer-events-none absolute left-[13.5px] w-0 border-l border-border-soft"
        style={{
          top: line.top,
          height: line.height,
          display: line.height ? undefined : "none",
        }}
      />
      {children}
    </div>
  )
}

/**
 * A month's entries, and its fold: the row grows from 0fr to 1fr, and the
 * negative margin takes the feed's own gap back on the way out.
 */
function ActivityRun({
  gap = 20,
  open = true,
  feedGap = 16,
  children,
}: {
  gap?: number
  open?: boolean
  feedGap?: number
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,margin-top,opacity] duration-200 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
      style={{ marginTop: open ? undefined : -feedGap }}
    >
      {/* 3px more clip, taken back out of the layout, so a focus ring on the
          last thing in the run isn't sliced off. */}
      <div data-clip="" className="-mb-[3px] overflow-hidden pb-[3px]">
        <div className="flex flex-col" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** 28px rail, 16px gap, and the rest of the row is the entry itself. */
function ActivityEntry({
  icon: Icon,
  iconClass,
  person,
  dot,
  offset,
  children,
}: {
  icon?: LucideIcon
  iconClass?: string
  person?: string
  dot?: boolean
  /** How far down the mark sits; an icon entry centres on its 32px header. */
  offset?: number
  children: React.ReactNode
}) {
  const padTop = offset ?? (Icon ? 2 : 0)
  return (
    <div className="flex gap-4">
      <div className="w-7 shrink-0" style={{ paddingTop: padTop }}>
        <div
          data-rail-mark=""
          className="relative flex size-7 items-center justify-center rounded-full bg-background"
        >
          {person ? (
            <Face name={person} size="lg" />
          ) : dot ? (
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-amber-500"
            />
          ) : Icon ? (
            <Icon
              aria-hidden="true"
              className={cn("size-4", iconClass || "text-accent-foreground")}
            />
          ) : null}
        </div>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

/** 24px of content in a fixed 32px row: face, who and what, then when. */
function EntryHeader({
  name,
  action,
  time,
  metaIcon: MetaIcon,
}: {
  name: string
  action: string
  time: string
  metaIcon?: LucideIcon
}) {
  return (
    <div className="flex h-8 items-center gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Face name={name} size="default" />
        <p className={cn("truncate text-accent-foreground", T_BASE)}>
          <span className={cn("text-secondary-foreground", T_BASE_MEDIUM)}>
            {name}
          </span>{" "}
          {action}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {MetaIcon ? (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Visibility"
            className="text-accent-foreground"
          >
            <MetaIcon />
          </Button>
        ) : null}
        <span className={cn("text-accent-foreground", T_SM)}>{time}</span>
      </div>
    </div>
  )
}

/** The month a section belongs to, and the control that folds it away. */
function MonthChip({
  label,
  open,
  onOpenChange,
}: {
  label: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const Chevron = open ? ChevronUpIcon : ChevronDownIcon
  return (
    <Button
      data-rail-cap=""
      variant="outline"
      size="xs"
      aria-expanded={open}
      className={cn(
        // the playground's outline is a real 1px border, which the chip's
        // width includes; filled, so the rail line stops at its edges
        // rather than showing through it
        "relative gap-1 self-start rounded-full border border-border bg-background px-1.5 text-foreground shadow-none! hover:bg-input",
        T_XS
      )}
      onClick={() => onOpenChange(!open)}
    >
      {label}
      <Chevron className="size-3.5" />
    </Button>
  )
}

/** A comment: the bubble hugs its text, grey rather than on a card. */
function CommentBubble({ mention, text }: { mention: string; text: string }) {
  return (
    <div className="w-fit rounded-xl bg-input px-3 py-[7.5px]">
      <p className={cn("text-muted-foreground", T_P)}>
        <span className="font-medium text-secondary-foreground">{mention}</span>
        {text}
      </p>
    </div>
  )
}

type Part = { text: string; strong?: boolean }

/** One change on one 28px line: the sentence left, the date right. */
function ChangeRow({ parts, time }: { parts: Part[]; time: string }) {
  return (
    <div className="flex h-7 items-center gap-4">
      <p className={cn("min-w-0 flex-1 truncate text-accent-foreground", T_BASE)}>
        {parts.map((part, index) =>
          part.strong ? (
            <span
              key={index}
              className={cn("text-secondary-foreground", T_BASE_MEDIUM)}
            >
              {part.text}
            </span>
          ) : (
            <span key={index}>{part.text}</span>
          )
        )}
      </p>
      <span className={cn("shrink-0 text-accent-foreground", T_SM)}>
        {time}
      </span>
    </div>
  )
}

/** "Show 5+ activities…": shut to begin with, the list grows out of it. */
function ChangeGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={open}
        className={cn(
          "flex h-7 cursor-pointer items-center gap-2 self-start text-secondary-foreground",
          T_BASE
        )}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Hide" : "Show"} {label}
        <ChevronsUpDownIcon
          aria-hidden="true"
          className="size-4 text-accent-foreground"
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-0.5 pt-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Cards ─────────────────────────────────────────────────────────────── */

type Attachment = { name: string; meta: string; type: "zip" | "pdf" | "doc" }

function EmailCard({
  name,
  address,
  to,
  subject,
  time,
  body,
  attachments = [],
  preview,
  reply,
  thread,
  quotedFrom,
  quoted,
  quoteFolded,
}: {
  name: string
  address: string
  to?: string
  subject?: string
  time: string
  body: string
  attachments?: Attachment[]
  preview?: boolean
  reply?: boolean
  thread?: boolean
  quotedFrom?: string
  quoted?: string
  quoteFolded?: boolean
}) {
  const [quoteOpen, setQuoteOpen] = React.useState(!quoteFolded)
  const action = "text-accent-foreground"
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-border-soft bg-card px-3 pt-1.5",
        preview ? "gap-0 pb-2.5" : "gap-3.5 pb-3"
      )}
    >
      <div className="flex flex-col">
        <div className="flex h-7 items-center gap-2">
          <p className="flex min-w-0 items-baseline gap-1.5">
            <span className={cn("text-secondary-foreground", T_BASE_MEDIUM)}>
              {name}
            </span>
            <span className={cn("truncate text-accent-foreground", T_BASE)}>
              &lt;{address}&gt;
            </span>
          </p>
          {/* the last action pulled out by the card's side less its top */}
          <div className="-mr-1.5 ml-auto flex shrink-0 items-center gap-1">
            <span className={cn("mr-1 text-accent-foreground", T_SM)}>
              {time}
            </span>
            <Button variant="ghost" size="icon-sm" aria-label="Reply" className={action}>
              <ReplyIcon />
            </Button>
            {!preview ? (
              <Button variant="ghost" size="icon-sm" aria-label="Reply all" className={action}>
                <ReplyAllIcon />
              </Button>
            ) : null}
            <Button variant="ghost" size="icon-sm" aria-label="More" className={action}>
              <EllipsisIcon />
            </Button>
          </div>
        </div>

        {!preview ? (
          <div className="-mt-0.5 flex flex-col gap-1">
            <p className={cn("truncate text-accent-foreground", T_BASE)}>
              To: {to}
            </p>
            <p className={cn("truncate text-accent-foreground", T_BASE)}>
              Subject:{" "}
              <span className="text-secondary-foreground">{subject}</span>
            </p>
          </div>
        ) : null}
      </div>

      {!preview ? <Separator className="bg-border-soft" /> : null}

      <p
        className={cn(
          "whitespace-pre-line text-secondary-foreground",
          preview ? cn("-mt-0.5", T_BASE) : T_P
        )}
      >
        {body}
      </p>

      {attachments.length ? (
        <div className="flex gap-2">
          {attachments.map((file) => (
            <div
              key={file.name}
              className="flex min-w-0 flex-1 flex-col gap-[5px] rounded-lg bg-secondary px-2 py-1.5"
            >
              <p className={cn("truncate text-secondary-foreground", T_BASE_MEDIUM)}>
                {file.name}
              </p>
              <p
                className={cn(
                  "flex items-center gap-1.5 text-secondary-foreground",
                  T_XS
                )}
              >
                <FileIcon type={file.type} />
                {file.meta}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {reply ? (
        <Button
          variant="secondary"
          size="sm"
          className={cn("self-start text-foreground", T_BASE)}
        >
          <ReplyIcon />
          Reply
        </Button>
      ) : null}

      {/* the "…" that folds the quoted thread: filled while it shows */}
      {thread || quoted ? (
        <Button
          variant={quoteOpen && quoted ? "secondary" : "ghost"}
          size="xs"
          aria-label={quoteOpen ? "Hide quoted text" : "Show quoted text"}
          aria-expanded={quoted ? quoteOpen : undefined}
          className="h-4 w-7 min-w-0 self-start rounded-md p-0"
          onClick={() => setQuoteOpen((o) => !o)}
        >
          <EllipsisIcon className="size-4! text-muted-foreground" />
        </Button>
      ) : null}

      {quoted ? (
        <div
          aria-hidden={!quoteOpen || undefined}
          className={cn(
            "grid transition-[grid-template-rows,margin-top,opacity] duration-200 ease-out motion-reduce:transition-none",
            quoteOpen
              ? "grid-rows-[1fr] opacity-100"
              : "-mt-3.5 grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 border-l border-border-soft pl-3.5">
              <p className={cn("text-secondary-foreground", T_P)}>{quotedFrom}</p>
              <p className={cn("whitespace-pre-line text-secondary-foreground", T_P)}>
                {quoted}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

type CallFact = { icon: ActivityIconName; label: string }

/** The recording, open: play, scrubber, elapsed, volume, more. */
function CallRecording({
  duration = 1968,
  start = 15,
}: {
  duration?: number
  start?: number
}) {
  const [elapsed, setElapsed] = React.useState(start)
  const [playing, setPlaying] = React.useState(false)
  const [muted, setMuted] = React.useState(false)

  // No audio behind it: the clock is the playback, at 30x so the bar moves.
  React.useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setElapsed((e) => {
        const next = Math.min(duration, e + 0.1 * 30)
        if (next >= duration) setPlaying(false)
        return next
      })
    }, 100)
    return () => clearInterval(timer)
  }, [playing, duration])

  const clock = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={playing ? "Pause" : "Play"}
        className="text-foreground"
        onClick={() => setPlaying((p) => !p)}
      >
        <ActivityIcon name={playing ? "pause" : "play-16"} className="size-4" />
      </Button>
      <Slider
        className="flex-1"
        step={0.1}
        aria-label="Playback position"
        value={[(elapsed / duration) * 100]}
        onValueChange={(value) => {
          const percent = Array.isArray(value) ? value[0] : value
          setElapsed((percent / 100) * duration)
        }}
      />
      <span className={cn("shrink-0 text-muted-foreground tabular-nums", T_SM)}>
        {clock(elapsed)} / {clock(duration)}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={muted ? "Unmute" : "Mute"}
        className="text-foreground"
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? <VolumeXIcon /> : <ActivityIcon name="volume" className="size-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="More"
        className="-mr-0.5 text-foreground"
      >
        <ActivityIcon name="dots" className="size-4" />
      </Button>
    </div>
  )
}

function CallCard({
  title,
  status,
  facts = [],
  actions = [],
  people = [],
  initials = [],
  player,
}: {
  title: string
  status?: string
  facts?: CallFact[]
  actions?: CallFact[]
  people?: string[]
  initials?: string[]
  player?: boolean
}) {
  // Text that ends the card carries 2.5px of line box past its baseline;
  // pulled back so it bottoms out where a box would.
  const tailTrim = player || facts.length || actions.length ? "" : "-mb-[2.5px]"
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border-soft bg-card px-3 pt-2.5 pb-[13px]">
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <div className={cn("flex min-w-0 flex-1 flex-col gap-[2px]", tailTrim)}>
            <p className={cn("text-secondary-foreground", T_BASE_MEDIUM)}>
              {title}
            </p>
            {status ? (
              <p className={cn("text-red-500 dark:text-red-400", T_BASE)}>{status}</p>
            ) : null}
          </div>
          <AvatarStack people={people} initials={initials} />
        </div>

        {facts.length || actions.length ? (
          <div className="flex items-center gap-[5px]">
            {facts.map((fact) => (
              <Badge
                key={fact.label}
                variant="secondary"
                size="lg"
                className={cn("text-muted-foreground", T_SM, "leading-[14.95px]")}
              >
                <ActivityIcon name={fact.icon} className="size-3" />
                {fact.label}
              </Badge>
            ))}
            {actions.map((act) => (
              <Button
                key={act.label}
                variant="secondary"
                size="xs"
                className={cn(
                  "gap-1 rounded-full px-2 text-muted-foreground [&_svg]:size-3!",
                  T_SM
                )}
              >
                <ActivityIcon name={act.icon} className="size-3" />
                {act.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      {player ? <CallRecording /> : null}
    </div>
  )
}

function EventCard({
  title,
  time,
  badge,
  people = [],
  initials = [],
}: {
  title: string
  time: string
  badge?: string
  people?: string[]
  initials?: string[]
}) {
  return (
    <div className="flex gap-2 rounded-xl border border-border-soft bg-card p-2.5">
      {/* the amber bar down the left, the full height of the content */}
      <div className="w-0.5 shrink-0 self-stretch rounded-full bg-amber-500" />
      <div className="flex min-w-0 flex-1 gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {badge ? (
            <Badge
              variant="secondary"
              size="md"
              className={cn("self-start bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200", T_XS, "leading-[13.8px]")}
            >
              <MailIcon />
              {badge}
            </Badge>
          ) : null}
          {/* trims the line box under the last baseline, so the foot reads 10 */}
          <div className="-mb-[2.5px] flex flex-col gap-2">
            <p className={cn("truncate text-secondary-foreground", T_BASE_MEDIUM)}>
              {title}
            </p>
            <p className={cn("text-muted-foreground", T_BASE)}>{time}</p>
          </div>
        </div>
        <AvatarStack className="self-start" people={people} initials={initials} />
      </div>
    </div>
  )
}

/* ── Default ───────────────────────────────────────────────────────────── */

const attachments: Attachment[] = [
  { name: "Satoshi.zip", meta: "Zip · 5.4 MB", type: "zip" },
  { name: "Bose.PDF", meta: "PDF · 44MB", type: "pdf" },
  { name: "Supply_Update.doc", meta: "Doc · 9.8 MB", type: "doc" },
]

const openingMail = `Hi Good morning,
We hope this message finds you well.

We are writing to inform you about recent updates to our inventory package that may affect your current and future orders. We've expanded our inventory with new items including Bose. These additions are now available for ordering and can be viewed on our Bose

Thanks & Regards
Templeton Peck`

const turnoverMail = `I think it could be. We should also consider our inventory turnover ratio. If we're holding onto items for too long, it ties up our capital. We need a balance between having enough stock and not overstocking.

Thanks & Regards
Shariq Ansari`

const jitMail = `Absolutely. I also think we should integrate a Just-In-Time (JIT) approach. It's risky but can save a lot of storage costs if done correctly.`

const quotedFrom =
  "On June 26, 2024 at 3:56 PM GMT+5:30 shariq@frappe.io wrote:"

const lastWeek: { time: string; parts: Part[] }[] = [
  {
    time: "12 Jun",
    parts: [
      { text: "Significa Well", strong: true },
      { text: " updated deal status value from " },
      { text: "Prospecting", strong: true },
      { text: " to " },
      { text: "Qualified", strong: true },
    ],
  },
  {
    time: "19 Jun",
    parts: [
      { text: "Gleb Kuznetsov", strong: true },
      { text: " created a " },
      { text: "task", strong: true },
    ],
  },
  {
    time: "19 Jun",
    parts: [
      { text: "Zhenya Rynzhuk", strong: true },
      { text: " added a " },
      { text: "note", strong: true },
    ],
  },
  {
    time: "20 Jun",
    parts: [
      { text: "Shariq Ansari", strong: true },
      { text: " updated status from " },
      { text: "Contacted", strong: true },
      { text: " to " },
      { text: "Qualified", strong: true },
    ],
  },
  {
    time: "20 Jun",
    parts: [
      { text: "Timeless", strong: true },
      { text: " updated stage from " },
      { text: "hot", strong: true },
      { text: " to " },
      { text: "cold", strong: true },
    ],
  },
]

const timelessChanges: { time: string; parts: Part[] }[] = [
  {
    time: "20 Jun",
    parts: [
      { text: "Timeless", strong: true },
      { text: " updated " },
      { text: "Territory", strong: true },
      { text: " to " },
      { text: "India", strong: true },
    ],
  },
  {
    time: "20 Jun",
    parts: [
      { text: "Timeless", strong: true },
      { text: " added " },
      { text: "Lead source", strong: true },
      { text: " as " },
      { text: "Referral", strong: true },
    ],
  },
]

export function ActivityDefaultPattern() {
  const [june, setJune] = React.useState(true)
  const [may, setMay] = React.useState(true)

  return (
    <ActivityFeed gap={16}>
      <MonthChip label="June" open={june} onOpenChange={setJune} />

      <ActivityRun open={june}>
        <ActivityEntry person="Templeton Peck" offset={10}>
          <EmailCard
            name="Templeton Peck"
            address="templeton@frappe.io"
            to="Jonathan Higgins, sandeep@timeless.co, +4"
            subject="Package update"
            time="3d ago"
            body={openingMail}
            attachments={attachments}
          />
        </ActivityEntry>

        <ActivityEntry person="Eric Gallagher" offset={10}>
          <EmailCard
            preview
            name="Eric Gallagher"
            address="ericgallagher@frappe.io"
            time="18 Jun"
            body="Hi, I placed an order last week. I spoke with Marisa at the time. When will it be delivered?"
          />
        </ActivityEntry>

        <ActivityEntry icon={MessageCircleIcon}>
          <div className="flex flex-col gap-1">
            <EntryHeader
              name="Sanny Woven"
              action="added a comment"
              time="27 Jun"
              metaIcon={EyeOffIcon}
            />
            <CommentBubble
              mention="@Sandra Bass"
              text=", Great teamwork, everyone. Let’s catch up with our findings."
            />
          </div>
        </ActivityEntry>

        <ActivityEntry dot>
          <ChangeGroup label="5+ activities from last week">
            {lastWeek.map((change, index) => (
              <ChangeRow key={index} parts={change.parts} time={change.time} />
            ))}
          </ChangeGroup>
        </ActivityEntry>

        <ActivityEntry icon={MessageCircleIcon}>
          <div className="flex flex-col gap-1">
            <EntryHeader
              name="James Bennett"
              action="added a comment"
              time="20 Jun"
              metaIcon={EyeOffIcon}
            />
            <CommentBubble
              mention="@Eleanor Pena"
              text=", Yeah, I’ve noticed that too. I think we need better forecasting. We often end up with either too much stock or not enough. Maybe we should look into some advanced forecasting software?"
            />
          </div>
        </ActivityEntry>

        <ActivityEntry person="Shariq Ansari" offset={10}>
          <EmailCard
            reply
            name="Shariq Ansari"
            address="shariq@frappe.io"
            to="Jonathan Higgins, sandeep@timeless.co, +4"
            subject="Package update"
            time="18 Jun"
            body={turnoverMail}
          />
        </ActivityEntry>

        <ActivityEntry dot>
          <ChangeRow
            time=""
            parts={[
              { text: "Shariq Ansari", strong: true },
              { text: " added " },
              { text: "Annual Revenue", strong: true },
              { text: " as " },
              { text: "45,00,000.00", strong: true },
            ]}
          />
        </ActivityEntry>

        <ActivityEntry person="Sally Potter" offset={10}>
          <EmailCard
            name="Sally Potter"
            address="shariq@frappe.io"
            to="Shariq Ansari"
            subject="Package update"
            time="19 Jun"
            body={jitMail}
            thread
            quotedFrom={quotedFrom}
            quoted={turnoverMail}
            quoteFolded
          />
        </ActivityEntry>

        <ActivityEntry dot>
          <ChangeGroup label="2+ changes from Timeless">
            {timelessChanges.map((change, index) => (
              <ChangeRow key={index} parts={change.parts} time={change.time} />
            ))}
          </ChangeGroup>
        </ActivityEntry>
      </ActivityRun>

      <MonthChip label="May" open={may} onOpenChange={setMay} />

      <ActivityRun open={may}>
        <ActivityEntry icon={PhoneMissedIcon} iconClass="text-red-500 dark:text-red-400">
          <div className="flex flex-col gap-1.5">
            <EntryHeader
              name="Brian Robinson"
              action="has reached out to you."
              time="14 May"
            />
            <CallCard
              title="Inbound Call"
              status="Missed call"
              people={["Emily Taylor", "Brian Robinson"]}
            />
          </div>
        </ActivityEntry>

        <ActivityEntry icon={PhoneOutgoingIcon}>
          <div className="flex flex-col gap-1.5">
            <EntryHeader name="Sammy Well" action="created an call" time="16 May" />
            <CallCard
              title="Outbound Call"
              facts={[
                { icon: "calendar", label: "May 16, Friday" },
                { icon: "time", label: "32:48" },
              ]}
              actions={[
                { icon: "play", label: "Listen" },
                { icon: "notes", label: "Note" },
              ]}
              people={["Sammy Well", "Eleanor Pena"]}
            />
          </div>
        </ActivityEntry>

        <ActivityEntry icon={PhoneOutgoingIcon}>
          <div className="flex flex-col gap-1.5">
            <EntryHeader name="Sammy Well" action="created an call" time="16 May" />
            <CallCard
              player
              title="Outbound call"
              facts={[
                { icon: "calendar", label: "May 18, Wednesday" },
                { icon: "time", label: "32:48" },
              ]}
              actions={[{ icon: "play", label: "Listen" }]}
              people={["Emily Taylor", "Sammy Well", "Eleanor Pena"]}
              initials={["N"]}
            />
          </div>
        </ActivityEntry>

        <ActivityEntry person="Sally Potter" offset={10}>
          <EmailCard
            name="Sally Potter"
            address="shariq@frappe.io"
            to="Shariq Ansari"
            subject="Package update"
            time="19 Jun"
            body={jitMail}
            thread
            quotedFrom={quotedFrom}
            quoted={turnoverMail}
          />
        </ActivityEntry>
      </ActivityRun>
    </ActivityFeed>
  )
}

/* ── Call log ──────────────────────────────────────────────────────────── */

const calls: {
  name: string
  action: string
  time: string
  icon: LucideIcon
  iconClass?: string
  title: string
  status?: string
  facts?: CallFact[]
  actions?: CallFact[]
  people: string[]
  initials?: string[]
}[] = [
  {
    name: "Brian Robinson",
    action: "has reached out to you",
    time: "18 May",
    icon: PhoneMissedIcon,
    iconClass: "text-red-500 dark:text-red-400",
    title: "Inbound Call",
    status: "Missed call",
    people: ["Emily Taylor", "Brian Robinson"],
  },
  {
    name: "Sammy Well",
    action: "created an call",
    time: "18 May",
    icon: PhoneOutgoingIcon,
    title: "Outbound Call",
    facts: [
      { icon: "calendar", label: "Jun 27, Friday" },
      { icon: "time", label: "32:48" },
    ],
    actions: [
      { icon: "play", label: "Listen" },
      { icon: "notes", label: "Notes" },
    ],
    people: ["Sammy Well", "Emily Taylor"],
  },
  {
    name: "Emily Taylor",
    action: "has reached out to you.",
    time: "18 May",
    icon: PhoneIncomingIcon,
    iconClass: "text-red-500 dark:text-red-400",
    title: "Inbound Call",
    status: "Rejected",
    people: ["Sammy Well", "Brian Robinson"],
  },
  {
    name: "Eleanor Pena",
    action: "created a call",
    time: "18 May",
    icon: PhoneOutgoingIcon,
    title: "Outbound Call",
    facts: [
      { icon: "calendar", label: "May 18, Wednesday" },
      { icon: "time", label: "32:48" },
    ],
    actions: [{ icon: "play", label: "Listen" }],
    people: ["Eleanor Pena"],
    initials: ["N"],
  },
]

export function ActivityCallLogPattern() {
  return (
    <ActivityFeed>
      <ActivityRun>
        {calls.map((call) => (
          <ActivityEntry
            key={call.name + call.title + call.time}
            icon={call.icon}
            iconClass={call.iconClass}
          >
            <div className="flex flex-col gap-1.5">
              <EntryHeader name={call.name} action={call.action} time={call.time} />
              <CallCard
                title={call.title}
                status={call.status}
                facts={call.facts}
                actions={call.actions}
                people={call.people}
                initials={call.initials}
              />
            </div>
          </ActivityEntry>
        ))}
      </ActivityRun>
    </ActivityFeed>
  )
}

/* ── Events ────────────────────────────────────────────────────────────── */

const juneInvites = [
  {
    name: "Sally Potter",
    title: "Frappe + Timeless Weekly Call",
    people: ["Sammy Well", "Emily Taylor", "Eleanor Pena"],
    initials: ["N"],
  },
  {
    name: "Faris Ansari",
    title: "Inventory Innovation Call",
    people: ["Brian Robinson", "Faris Ansari"],
  },
  {
    name: "Eleanor Pena",
    title: "Order Flow Discussion",
    people: ["Eleanor Pena", "Emily Taylor", "Sanny Woven"],
  },
]

export function ActivityEventsPattern() {
  const [jun, setJun] = React.useState(true)
  return (
    <ActivityFeed gap={20}>
      {/* what hasn't happened yet is called out before the first entry */}
      <Badge
        data-rail-cap=""
        variant="secondary"
        size="lg"
        className={cn(
          "relative self-start bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200",
          T_SM,
          "leading-[14.95px]"
        )}
      >
        Upcoming
      </Badge>

      <ActivityRun>
        <ActivityEntry icon={CalendarIcon}>
          <div className="flex flex-col gap-1.5">
            <EntryHeader
              name="Brian Robinson"
              action="is invited you to an Event"
              time="In 2 days"
            />
            <EventCard
              title="Supply Chain Sync"
              time="2:30 PM - 3:00 PM"
              badge="Awaiting response"
              people={["Sally Potter"]}
              initials={["N"]}
            />
          </div>
        </ActivityEntry>
      </ActivityRun>

      <MonthChip label="Jun" open={jun} onOpenChange={setJun} />

      <ActivityRun open={jun} feedGap={20}>
        {juneInvites.map((invite) => (
          <ActivityEntry key={invite.title} icon={CalendarIcon}>
            <div className="flex flex-col gap-1.5">
              <EntryHeader
                name={invite.name}
                action="was invited you to an event"
                time="18 May"
              />
              <EventCard
                title={invite.title}
                time="2:30pm-3:00 pm"
                people={invite.people}
                initials={invite.initials}
              />
            </div>
          </ActivityEntry>
        ))}
      </ActivityRun>
    </ActivityFeed>
  )
}
