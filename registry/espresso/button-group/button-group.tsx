import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type ButtonGroupContextValue = {
  size?: "sm" | "default" | "lg" | null
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({})

const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:hover:relative *:hover:z-10 *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "flex-col",
      },
      detached: {
        true: "",
        false: "",
      },
      wrapLayout: {
        true: "flex-wrap justify-center",
        false: "",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        detached: false,
        className:
          "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:-ml-px",
      },
      {
        orientation: "vertical",
        detached: false,
        className:
          "*:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:-mt-px",
      },
      { detached: true, size: "sm", className: "gap-1" },
      { detached: true, size: "default", className: "gap-1.5" },
      { detached: true, size: "lg", className: "gap-1.5" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      detached: false,
      wrapLayout: false,
      size: "default",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  detached,
  wrapLayout,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  const contextValue = React.useMemo(() => ({ size }), [size])
  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        data-detached={detached || undefined}
        data-wrap={wrapLayout || undefined}
        data-size={size ?? "default"}
        className={cn(buttonGroupVariants({ orientation, detached, wrapLayout, size }), className)}
        {...props}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupContext,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
