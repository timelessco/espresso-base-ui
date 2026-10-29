"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as React from "react"

import { cn } from "@/lib/utils"

const colorSwatchVariants = cva(
  "relative flex items-center justify-center rounded-full bg-clip-padding outline-2 outline-offset-0 outline-transparent transition-[outline-color,outline-offset] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[selected=true]:outline-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50",
  {
    variants: {
      size: {
        default: "size-8",
        sm: "size-6",
        lg: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function getIsCssColor(v: string): boolean {
  try {
    return typeof CSS !== "undefined" && typeof CSS.supports === "function"
      ? CSS.supports("color", v)
      : true
  } catch {
    return false
  }
}

function getHasAlpha(v: string): boolean {
  const s = v.trim().toLowerCase()

  if (s === "transparent") return true

  if (/^#(?:[0-9a-f]{4}|[0-9a-f]{8})$/i.test(s)) return true

  if (/\b(?:rgba|hsla)\s*\(/i.test(s)) return true

  if (
    /\b(?:rgb|hsl|lab|lch|oklab|oklch|color)\s*\([^)]*\/\s*[\d.]+%?\s*\)/i.test(
      s
    )
  ) {
    return true
  }

  return false
}

interface ColorSwatchProps
  extends
    useRender.ComponentProps<"div">,
    VariantProps<typeof colorSwatchVariants> {
  color?: string
  disabled?: boolean
  selected?: boolean
  withoutTransparency?: boolean
}

function ColorSwatch({
  color,
  size = "default",
  render,
  disabled = false,
  selected = false,
  withoutTransparency = false,
  className,
  style,
  children,
  ...props
}: ColorSwatchProps) {
  const colorValue = color?.trim()

  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const backgroundStyle = React.useMemo<React.CSSProperties>(() => {
    if (!colorValue) {
      return {
        background:
          "linear-gradient(to bottom right, transparent calc(50% - 1px), var(--destructive) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat",
      }
    }

    if (isMounted && !getIsCssColor(colorValue)) {
      return { backgroundColor: "transparent" }
    }

    if (!withoutTransparency && getHasAlpha(colorValue)) {
      return {
        background: `linear-gradient(${colorValue}, ${colorValue}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 10px 10px`,
      }
    }

    return { backgroundColor: colorValue }
  }, [colorValue, withoutTransparency, isMounted])

  const ariaLabel = !colorValue
    ? "No color selected"
    : `Color swatch: ${colorValue}`

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        role: "img",
        "aria-label": ariaLabel,
        "aria-disabled": disabled || undefined,
        // @ts-expect-error data attributes
        "data-disabled": disabled ? "" : undefined,
        "data-selected": selected || undefined,
        "data-slot": "color-swatch",
        className: cn(colorSwatchVariants({ size }), className),
        style: {
          ...backgroundStyle,
          forcedColorAdjust: "none",
          // A colour's ring is that colour; no colour's is the foreground.
          ...(selected
            ? { outlineColor: colorValue || "var(--foreground)" }
            : null),
          ...style,
        },
        children: children ?? (
          <Check
            aria-hidden="true"
            className={cn(
              "size-1/2 drop-shadow-sm transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              // White on a colour; on no colour, the foreground.
              colorValue ? "text-white" : "text-foreground",
              selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
            strokeWidth={3}
          />
        ),
      },
      props
    ),
  })
}

export { ColorSwatch }
