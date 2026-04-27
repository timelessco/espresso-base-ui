"use client"

import * as React from "react"
import { Star, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type RatingContextValue = {
  value: number
  hoverValue: number
  max: number
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
      readOnly,
      disabled,
      setValue,
      setHoverValue,
    }),
    [value, hoverValue, max, readOnly, disabled, setValue]
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
  size?: number
  icon?: LucideIcon
  filledIcon?: LucideIcon
  emptyIcon?: LucideIcon
}

function RatingButton({
  index: indexProp,
  size = 24,
  icon,
  filledIcon,
  emptyIcon,
  className,
  ...props
}: RatingButtonProps) {
  const { value, hoverValue, readOnly, disabled, setValue, setHoverValue } =
    useRating()

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

  const FilledIcon = filledIcon ?? icon ?? Star
  const EmptyIcon = emptyIcon ?? icon ?? Star
  const Icon = isFilled ? FilledIcon : EmptyIcon

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
        "cursor-pointer rounded-sm text-muted-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring data-filled:text-amber-500",
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
      <Icon
        size={size}
        strokeWidth={1}
        fill={isFilled ? "currentColor" : "none"}
        className="transition-transform"
      />
    </button>
  )
}

export { Rating, RatingButton, type RatingProps, type RatingButtonProps }
