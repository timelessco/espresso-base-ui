import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"

function BreadcrumbEllipsisIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 8C4.5 8.82843 3.82843 9.5 3 9.5C2.17157 9.5 1.5 8.82843 1.5 8C1.5 7.17157 2.17157 6.5 3 6.5C3.82843 6.5 4.5 7.17157 4.5 8ZM8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5ZM13 9.5C13.8284 9.5 14.5 8.82843 14.5 8C14.5 7.17157 13.8284 6.5 13 6.5C12.1716 6.5 11.5 7.17157 11.5 8C11.5 8.82843 12.1716 9.5 13 9.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Breadcrumb({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<"nav"> & {
  size?: "sm" | "md"
}) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      data-size={size}
      className={cn("group/breadcrumb", className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-0.5 text-base leading-base tracking-normal wrap-break-word text-accent-foreground group-data-[size=md]/breadcrumb:text-lg [&>[data-slot=breadcrumb-separator]:has(+*>[data-slot=breadcrumb-page])]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "flex h-7 items-center rounded-md px-2 transition-colors outline-none group-data-[size=md]/breadcrumb:px-[5px] hover:bg-muted hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-transparent active:text-foreground active:ring-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "flex h-7 items-center px-2 font-normal text-foreground group-data-[size=md]/breadcrumb:px-[5px]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "[&>svg]:size-3 group-data-[size=md]/breadcrumb:[&>svg]:size-4",
        className
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon className="stroke-[2]" />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-7 items-center justify-center rounded-md transition-colors outline-none group-data-[size=md]/breadcrumb:size-5 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-muted active:text-foreground group-data-[size=md]/breadcrumb:[&>svg]:size-4",
        className
      )}
      {...props}
    >
      <BreadcrumbEllipsisIcon />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

/**
 * Changelog — compared to shadcn base-ui breadcrumb (npx shadcn@latest add breadcrumb)
 *
 * Breadcrumb (Root):
 *   Before: No size prop. Plain <nav> with aria-label.
 *   After:  Added size prop: "sm" (default) | "md".
 *           Added data-size attribute and group/breadcrumb for child selectors.
 *
 * BreadcrumbList:
 *   Before: gap-1.5, text-sm, text-muted-foreground.
 *   After:  gap-0.5, text-base (14px) for sm, text-lg (16px) for md.
 *           Changed text-muted-foreground to text-accent-foreground.
 *           Added leading-base, tracking-normal.
 *           Added last separator color matching: last separator before BreadcrumbPage gets text-foreground.
 *
 * BreadcrumbLink:
 *   Before: Only transition-colors hover:text-foreground.
 *   After:  Added h-7, rounded-md, px-2 (sm) / px-[5px] (md).
 *           Added hover:bg-muted hover:text-secondary-foreground.
 *           Added focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring.
 *           Added active:bg-transparent active:text-foreground.
 *
 * BreadcrumbPage:
 *   Before: Only font-normal text-foreground.
 *   After:  Added h-7, px-2 (sm) / px-[5px] (md) to match BreadcrumbLink alignment.
 *
 * BreadcrumbSeparator:
 *   Before: [&>svg]:size-3.5.
 *   After:  [&>svg]:size-3 (sm), [&>svg]:size-4 (md).
 *
 * BreadcrumbEllipsis:
 *   Before: flex size-5, [&>svg]:size-4. Used MoreHorizontalIcon.
 *   After:  size-7 (sm), size-5 (md). Uses EllipsisIcon.
 *           Added hover/focus/active styles matching BreadcrumbLink.
 *           Icon size: [&>svg]:size-4 for md.
 */
