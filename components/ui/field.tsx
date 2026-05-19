"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 leading-base font-medium tracking-normal data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-0 has-[>[data-slot=field-content]]:[&>[role=switch]]:-mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-base tracking-normal",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        // base styles (always applied)
        "group/field-label peer/field-label flex w-fit items-start gap-2 leading-base tracking-normal transition-colors outline-none group-data-[disabled=true]/field:opacity-50 not-has-[>[data-slot=field]]:[&_[data-slot=checkbox]]:mt-0 not-has-[>[data-slot=field]]:[&_[data-slot=radio-group-item]]:mt-0 not-has-[>[data-slot=field]]:[&_[data-slot=switch]]:-mt-px",
        // choice card layout (when wrapping a Field)
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:px-1.5 has-[>[data-slot=field]]:py-1.75 *:data-[slot=field]:p-1.5",
        // interactive styles only when wrapping a Field (choice card)
        "has-[>[data-slot=field]]:group-data-[disabled=true]/field:pointer-events-none",
        "has-[>[data-slot=field]]:hover:bg-muted has-[>[data-slot=field]]:active:bg-accent has-[>[data-slot=field]]:has-[:focus-visible]:bg-secondary has-[>[data-slot=field]]:has-[:focus-visible]:shadow-3xs",
        // checkbox hover/active from FieldLabel (choice card only)
        "has-[>[data-slot=field]]:[&:hover_[data-slot=checkbox][data-unchecked]]:shadow-sm",
        "has-[>[data-slot=field]]:[&:hover_[data-slot=checkbox][data-checked]]:bg-primary/86 has-[>[data-slot=field]]:[&:hover_[data-slot=checkbox][data-checked]]:shadow-sm",
        "has-[>[data-slot=field]]:[&:active_[data-slot=checkbox][data-checked]]:bg-primary/74",
        // radio hover/active from FieldLabel (choice card only)
        "has-[>[data-slot=field]]:[&:hover_[data-slot=radio-group-item][data-unchecked]]:shadow-md",
        "has-[>[data-slot=field]]:[&:hover_[data-slot=radio-group-item][data-checked]]:bg-primary/86 has-[>[data-slot=field]]:[&:hover_[data-slot=radio-group-item][data-checked]]:shadow-md",
        "has-[>[data-slot=field]]:[&:active_[data-slot=radio-group-item][data-unchecked]]:bg-secondary has-[>[data-slot=field]]:[&:active_[data-slot=radio-group-item][data-unchecked]]:shadow-none",
        "has-[>[data-slot=field]]:[&:active_[data-slot=radio-group-item][data-checked]]:bg-primary/74",
        // switch hover/active from FieldLabel (choice card only)
        "has-[>[data-slot=field]]:[&:hover_[data-slot=switch][data-unchecked]]:bg-popover-foreground",
        "has-[>[data-slot=field]]:[&:hover_[data-slot=switch][data-checked]]:bg-primary/86",
        "has-[>[data-slot=field]]:[&:active_[data-slot=switch][data-unchecked]]:bg-card-foreground",
        "has-[>[data-slot=field]]:[&:active_[data-slot=switch][data-checked]]:bg-primary/74",
        // switch thumb stretch on FieldLabel press (works for choice card AND simple label)
        "[&:active_[data-slot=switch][data-size=sm]_[data-slot=switch-thumb]]:w-[15px]",
        "[&:active_[data-slot=switch][data-size=default]_[data-slot=switch-thumb]]:w-[18px]",
        "[&:active_[data-slot=switch][data-size=sm][data-checked]_[data-slot=switch-thumb]]:left-[8px]",
        "[&:active_[data-slot=switch][data-size=default][data-checked]_[data-slot=switch-thumb]]:left-[10px]",
        // suppress child focus ring when FieldLabel has focus-within (choice card only)
        "has-[>[data-slot=field]]:[&:has(:focus-visible)_[data-slot=checkbox]]:ring-0 has-[>[data-slot=field]]:[&:has(:focus-visible)_[data-slot=radio-group-item]]:ring-0 has-[>[data-slot=field]]:[&:has(:focus-visible)_[data-slot=switch]]:ring-0",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-base font-medium tracking-normal group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "pt-1 text-left text-sm leading-lg font-normal tracking-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(
        "pt-1 text-sm leading-base font-normal tracking-normal text-destructive",
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
