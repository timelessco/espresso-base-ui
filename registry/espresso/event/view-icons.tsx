/**
 * The view switcher's glyphs — Espresso's own, traced from the frappe espresso
 * playground. All `currentColor`, so the tab's ink carries them.
 */
export function DayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="18 12 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "size-4 shrink-0"}
      aria-hidden="true"
    >
      <path
        d="M34 24C36.2091 24 38 25.7909 38 28C38 30.2091 36.2091 32 34 32C31.7909 32 30 30.2091 30 28C30 25.7909 31.7909 24 34 24ZM34 26C32.8954 26 32 26.8954 32 28C32 29.1046 32.8954 30 34 30C35.1046 30 36 29.1046 36 28C36 26.8954 35.1046 26 34 26Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function WeekIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="158 12 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "size-4 shrink-0"}
      aria-hidden="true"
    >
      <path
        d="M164 24C166.209 24 168 25.7909 168 28C168 30.2091 166.209 32 164 32C161.791 32 160 30.2091 160 28C160 25.7909 161.791 24 164 24ZM174 24C176.209 24 178 25.7909 178 28C178 30.2091 176.209 32 174 32C171.791 32 170 30.2091 170 28C170 25.7909 171.791 24 174 24ZM184 24C186.209 24 188 25.7909 188 28C188 30.2091 186.209 32 184 32C181.791 32 180 30.2091 180 28C180 25.7909 181.791 24 184 24ZM184 26C182.895 26 182 26.8954 182 28C182 29.1046 182.895 30 184 30C185.105 30 186 29.1046 186 28C186 26.8954 185.105 26 184 26ZM164 26C162.895 26 162 26.8954 162 28C162 29.1046 162.895 30 164 30C165.105 30 166 29.1046 166 28C166 26.8954 165.105 26 164 26ZM174 26C172.895 26 172 26.8954 172 28C172 29.1046 172.895 30 174 30C175.105 30 176 29.1046 176 28C176 26.8954 175.105 26 174 26Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function MonthIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="320 12 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "size-4 shrink-0"}
      aria-hidden="true"
    >
      <path
        d="M330 30C332.209 30 334 31.7909 334 34C334 36.2091 332.209 38 330 38C327.791 38 326 36.2091 326 34C326 31.7909 327.791 30 330 30ZM342 30C344.209 30 346 31.7909 346 34C346 36.2091 344.209 38 342 38C339.791 38 338 36.2091 338 34C338 31.7909 339.791 30 342 30ZM330 32C328.895 32 328 32.8954 328 34C328 35.1046 328.895 36 330 36C331.105 36 332 35.1046 332 34C332 32.8954 331.105 32 330 32ZM342 32C340.895 32 340 32.8954 340 34C340 35.1046 340.895 36 342 36C343.105 36 344 35.1046 344 34C344 32.8954 343.105 32 342 32ZM330 18C332.209 18 334 19.7909 334 22C334 24.2091 332.209 26 330 26C327.791 26 326 24.2091 326 22C326 19.7909 327.791 18 330 18ZM342 18C344.209 18 346 19.7909 346 22C346 24.2091 344.209 26 342 26C339.791 26 338 24.2091 338 22C338 19.7909 339.791 18 342 18ZM330 20C328.895 20 328 20.8954 328 22C328 23.1046 328.895 24 330 24C331.105 24 332 23.1046 332 22C332 20.8954 331.105 20 330 20ZM342 20C340.895 20 340 20.8954 340 22C340 23.1046 340.895 24 342 24C343.105 24 344 23.1046 344 22C344 20.8954 343.105 20 342 20Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AgendaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "size-4 shrink-0"}
      aria-hidden="true"
    >
      <circle cx="7" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="9" width="12" height="2" rx="1" fill="currentColor" />
      <circle cx="7" cy="22" r="3" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="21" width="12" height="2" rx="1" fill="currentColor" />
    </svg>
  )
}
