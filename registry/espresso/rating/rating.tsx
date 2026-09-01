"use client"

import * as React from "react"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// public/images/svg/rating-star.svg, inlined with currentColor so the
// empty/filled colors come from the button's text color.
function RatingStarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.3576 3.17328C13.6491 2.68902 14.3513 2.68895 14.6427 3.17328L18.2394 9.15082L25.0363 10.7241C25.5868 10.8518 25.8033 11.5199 25.4328 11.9467L20.8595 17.2153L21.4631 24.1645C21.5119 24.7277 20.9435 25.1409 20.423 24.9204L14.0002 22.1987L7.57634 24.9204C7.05588 25.1407 6.48743 24.7276 6.5363 24.1645L7.13982 17.2153L2.56658 11.9467C2.1962 11.5198 2.41337 10.8516 2.96404 10.7241L9.75994 9.15082L13.3576 3.17328Z"
        fill="currentColor"
      />
    </svg>
  )
}

type RatingSize = "xs" | "sm" | "md" | "lg"

const ratingSizeClasses: Record<RatingSize, string> = {
  xs: "[&_svg]:size-4",
  sm: "[&_svg]:size-5",
  md: "[&_svg]:size-6",
  lg: "[&_svg]:size-7",
}

type RatingContextValue = {
  value: number
  hoverValue: number
  max: number
  size: RatingSize
  readOnly: boolean
  disabled: boolean
  setValue: (value: number) => void
  setHoverValue: (value: number) => void
}

const RatingContext = React.createContext<RatingContextValue | null>(null)

function useRating() {
  const ctx = React.useContext(RatingContext)
  if (!ctx) {
    throw new Error("Rating components must be used within <Rating>")
  }
  return ctx
}

type RatingProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  max?: number
  size?: RatingSize
  readOnly?: boolean
  disabled?: boolean
  name?: string
  required?: boolean
}

function Rating({
  defaultValue = 0,
  value: controlledValue,
  onValueChange,
  max = 5,
  size = "md",
  readOnly = false,
  disabled = false,
  name,
  required,
  className,
  children,
  ...props
}: RatingProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue)
  const [hoverValue, setHoverValue] = React.useState(0)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = React.useCallback(
    (next: number) => {
      if (readOnly || disabled) return
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange, readOnly, disabled]
  )

  const ctx = React.useMemo<RatingContextValue>(
    () => ({
      value,
      hoverValue,
      max,
      size,
      readOnly,
      disabled,
      setValue,
      setHoverValue,
    }),
    [value, hoverValue, max, size, readOnly, disabled, setValue]
  )

  return (
    <RatingContext.Provider value={ctx}>
      <div
        role={readOnly ? "img" : "radiogroup"}
        aria-label={readOnly ? `Rated ${value} out of ${max}` : "Rating"}
        aria-readonly={readOnly || undefined}
        aria-disabled={disabled || undefined}
        data-slot="rating"
        data-value={value}
        data-size={size}
        data-readonly={readOnly || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "inline-flex items-center gap-1",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onMouseLeave={() => setHoverValue(0)}
        {...props}
      >
        {children}
        {name && (
          <input
            type="hidden"
            name={name}
            value={value}
            required={required}
          />
        )}
      </div>
    </RatingContext.Provider>
  )
}

type RatingButtonProps = Omit<React.ComponentProps<"button">, "value"> & {
  index?: number
  icon?: LucideIcon
  filledIcon?: LucideIcon
  emptyIcon?: LucideIcon
}

function RatingButton({
  index: indexProp,
  icon,
  filledIcon,
  emptyIcon,
  className,
  ...props
}: RatingButtonProps) {
  const {
    value,
    hoverValue,
    size,
    readOnly,
    disabled,
    setValue,
    setHoverValue,
  } = useRating()

  // Auto-index if not provided — use sibling count via ref trick
  const ref = React.useRef<HTMLButtonElement>(null)
  const [autoIndex, setAutoIndex] = React.useState(0)

  React.useEffect(() => {
    if (indexProp !== undefined) return
    const el = ref.current
    if (!el || !el.parentElement) return
    const siblings = Array.from(
      el.parentElement.querySelectorAll("[data-slot=rating-button]")
    )
    setAutoIndex(siblings.indexOf(el) + 1)
  }, [indexProp])

  const index = indexProp ?? autoIndex
  const displayValue = hoverValue > 0 ? hoverValue : value
  const isFilled = index > 0 && index <= displayValue

  const usesDefaultIcon = !icon && !filledIcon && !emptyIcon
  const CustomIcon = isFilled
    ? (filledIcon ?? icon)
    : (emptyIcon ?? icon)

  return (
    <button
      ref={ref}
      type="button"
      role={readOnly ? undefined : "radio"}
      aria-checked={readOnly ? undefined : index === value}
      aria-label={`${index} star${index === 1 ? "" : "s"}`}
      data-slot="rating-button"
      data-index={index}
      data-filled={isFilled || undefined}
      disabled={disabled}
      className={cn(
        "cursor-pointer rounded-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring data-filled:text-amber-500 [&_svg]:shrink-0",
        ratingSizeClasses[size],
        // solid default star sits on a light gray; outline custom icons on muted
        usesDefaultIcon
          ? "not-data-filled:text-[#e2e2e2] dark:not-data-filled:text-[#343434]"
          : "text-muted-foreground",
        readOnly && "cursor-default",
        className
      )}
      onMouseEnter={() => !readOnly && setHoverValue(index)}
      onFocus={() => !readOnly && setHoverValue(index)}
      onClick={() => setValue(index)}
      onKeyDown={(e) => {
        if (readOnly) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setValue(index)
        }
      }}
      {...props}
    >
      {CustomIcon ? (
        <CustomIcon
          strokeWidth={1}
          fill={isFilled ? "currentColor" : "none"}
          className="transition-transform"
        />
      ) : (
        <RatingStarIcon className="transition-transform" />
      )}
    </button>
  )
}

export { Rating, RatingButton, type RatingProps, type RatingButtonProps }
