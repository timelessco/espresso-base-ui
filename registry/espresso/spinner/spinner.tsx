import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("shrink-0 animate-spin", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-3.5",
      lg: "size-4",
      xl: "size-5",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Spinner({
  className,
  size,
  track = false,
  ...props
}: React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants> & {
    track?: boolean
  }) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <g clipPath="url(#spinner_clip)">
        {track && (
          <path
            d="M17.3594 14.2499C16.8013 15.2166 16.0582 16.0639 15.1726 16.7434C14.2871 17.4229 13.2763 17.9214 12.1981 18.2103C11.1199 18.4992 9.99537 18.5729 8.88868 18.4272C7.782 18.2815 6.71485 17.9192 5.74816 17.3611C4.78147 16.803 3.93417 16.0599 3.25465 15.1744C2.57513 14.2888 2.07669 13.278 1.78779 12.1998C1.49889 11.1216 1.42518 9.9971 1.57088 8.89041C1.71658 7.78373 2.07883 6.71657 2.63694 5.74988C3.19506 4.7832 3.93812 3.9359 4.82369 3.25638C5.70926 2.57686 6.72 2.07842 7.7982 1.78952C8.8764 1.50061 10.0009 1.42691 11.1076 1.57261C12.2143 1.7183 13.2815 2.08055 14.2482 2.63867C15.2149 3.19679 16.0621 3.93985 16.7417 4.82542C17.4212 5.71099 17.9196 6.72173 18.2085 7.79993C18.4974 8.87813 18.5711 10.0027 18.4254 11.1094C18.2797 12.2161 17.9175 13.2832 17.3594 14.2499Z"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        <g clipPath="url(#spinner_arc_clip)">
          <g transform="matrix(0.0102 -0.0017 0.0017 0.0102 10 10)">
            <foreignObject x="-1168.52" y="-1168.52" width="2337.04" height="2337.04">
              <div
                // @ts-expect-error xmlns required for Figma foreignObject
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  background:
                    "conic-gradient(from 90deg, transparent 0deg, currentColor 260.571deg, transparent 359.525deg)",
                  height: "100%",
                  width: "100%",
                }}
              />
            </foreignObject>
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="spinner_arc_clip">
          <path d="M19.5 10C19.5 9.44772 19.0523 9 18.5 9C17.9477 9 17.5 9.44772 17.5 10L19.5 10ZM14.25 17.3612L14.75 18.2272L14.25 17.3612ZM5.75 17.3612L5.25 18.2272L5.75 17.3612ZM2.63878 14.25L3.50481 13.75L2.63878 14.25ZM1.5 10L0.5 10L1.5 10ZM2.63878 5.75L1.77276 5.25L2.63878 5.75ZM6.25 3.50481C6.72829 3.22867 6.89217 2.61708 6.61603 2.13878C6.33988 1.66049 5.72829 1.49662 5.25 1.77276L6.25 3.50481ZM17.5 10C17.5 11.3165 17.1535 12.6099 16.4952 13.75L18.2272 14.75C19.061 13.3058 19.5 11.6676 19.5 10L17.5 10ZM16.4952 13.75C15.8369 14.8901 14.8901 15.8369 13.75 16.4952L14.75 18.2272C16.1942 17.3934 17.3934 16.1942 18.2272 14.75L16.4952 13.75ZM13.75 16.4952C12.6099 17.1535 11.3165 17.5 10 17.5L10 19.5C11.6676 19.5 13.3058 19.061 14.75 18.2272L13.75 16.4952ZM10 17.5C8.68347 17.5 7.39014 17.1535 6.25 16.4952L5.25 18.2272C6.69418 19.061 8.3324 19.5 10 19.5L10 17.5ZM6.25 16.4952C5.10986 15.8369 4.16307 14.8901 3.50481 13.75L1.77276 14.75C2.60656 16.1942 3.80582 17.3934 5.25 18.2272L6.25 16.4952ZM3.50481 13.75C2.84655 12.6099 2.5 11.3165 2.5 10L0.5 10C0.5 11.6676 0.938959 13.3058 1.77276 14.75L3.50481 13.75ZM2.5 10C2.5 8.68347 2.84655 7.39014 3.50481 6.25L1.77276 5.25C0.938959 6.69418 0.5 8.3324 0.5 10L2.5 10ZM3.50481 6.25C4.16307 5.10985 5.10986 4.16307 6.25 3.50481L5.25 1.77276C3.80582 2.60656 2.60656 3.80582 1.77276 5.25L3.50481 6.25Z" />
        </clipPath>
        <clipPath id="spinner_clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Spinner, spinnerVariants }

// ## Spinner Changelog
//
// ### Added
// - CVA-based `spinnerVariants`
// - Size variants (`sm`, `default`, `lg`, `xl`) — sm: size-3, default: size-3.5, lg: size-4, xl: size-5
// - `track` boolean prop — when true, renders a static background ring at 25% opacity
// - Custom inline SVG with conic-gradient arc (replaces lucide `Loader2Icon`)
// - `currentColor` support — both arc and track inherit text color (e.g. `className="text-blue-500"`)
// - `data-slot="spinner"` attribute
// - Exported `spinnerVariants`
//
// ### Changed
// - Replaced `Loader2Icon` from lucide with inline SVG using conic-gradient inside `foreignObject`
// - Default size changed from `size-4` to `size-3.5` (via `default` variant)
//
// ### Removed
// - `lucide-react` dependency

