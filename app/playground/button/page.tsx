"use client"

import { useMemo, useState, type ReactNode } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

/* -------------------------------------------------------------------------- */
/*  Playground registry                                                        */
/*                                                                            */
/*  Each component declares its controls (the props you can tweak) and a       */
/*  render function. Add new components by appending to `components` below.     */
/* -------------------------------------------------------------------------- */

type ControlOption = {
  label: string
  value: string | boolean
}

type Control = {
  /** key in the props state object */
  prop: string
  /** label shown above the group in the right sidebar */
  label: string
  options: ControlOption[]
}

type PlaygroundComponent = {
  id: string
  name: string
  controls: Control[]
  /** initial value for each control prop */
  defaults: Record<string, string | boolean>
  render: (props: Record<string, string | boolean>) => ReactNode
}

const buttonConfig: PlaygroundComponent = {
  id: "button",
  name: "Button",
  defaults: {
    variant: "default",
    size: "default",
    content: "text",
  },
  controls: [
    {
      prop: "variant",
      label: "Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Destructive", value: "destructive" },
        { label: "Link", value: "link" },
      ],
    },
    {
      prop: "size",
      label: "Size",
      options: [
        { label: "xs", value: "xs" },
        { label: "sm", value: "sm" },
        { label: "Default", value: "default" },
        { label: "lg", value: "lg" },
        { label: "xl", value: "xl" },
        { label: "2xl", value: "2xl" },
        { label: "Icon xs", value: "icon-xs" },
        { label: "Icon sm", value: "icon-sm" },
        { label: "Icon", value: "icon" },
        { label: "Icon lg", value: "icon-lg" },
        { label: "Icon xl", value: "icon-xl" },
        { label: "Icon 2xl", value: "icon-2xl" },
      ],
    },
    {
      prop: "content",
      label: "Content",
      options: [
        { label: "Text", value: "text" },
        { label: "Icon only", value: "icon" },
        { label: "Icon + Text", value: "both" },
      ],
    },
  ],
  render: (props) => {
    const content = props.content as string
    return (
      <Button variant={props.variant as never} size={props.size as never}>
        {content !== "text" && <Star />}
        {content !== "icon" && "Button"}
      </Button>
    )
  },
}

const components: PlaygroundComponent[] = [buttonConfig]

/* -------------------------------------------------------------------------- */

export default function ButtonPlaygroundPage() {
  const [activeId] = useState(components[0].id)
  const active = useMemo(
    () => components.find((c) => c.id === activeId)!,
    [activeId]
  )

  const [props, setProps] = useState<Record<string, string | boolean>>(
    active.defaults
  )

  const setProp = (prop: string, value: string | boolean) =>
    setProps((prev) => ({ ...prev, [prop]: value }))

  return (
    <div className="flex h-full min-h-0 w-full">
      {/* Center — live component preview */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center overflow-auto p-10">
          {active.render(props)}
        </div>
      </div>

      {/* Right — props panel */}
      <aside className="scrollbar-hide flex w-72 shrink-0 flex-col overflow-y-auto border-l border-border bg-transparent">
        <div className="flex flex-col gap-6 px-4 py-5">
          {active.controls.map((control) => (
            <div key={control.prop} className="flex flex-col gap-2">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {control.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {control.options.map((option) => {
                  const isActive = props[control.prop] === option.value
                  return (
                    <Button
                      key={String(option.value)}
                      variant={isActive ? "default" : "secondary"}
                      size="xs"
                      onClick={() => setProp(control.prop, option.value)}
                    >
                      {option.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
