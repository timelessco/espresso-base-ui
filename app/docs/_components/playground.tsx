"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CodeBlock } from "./doc"

// A frappe-style interactive playground: live preview on a dotted canvas,
// prop controls below, and the generated code underneath. Pages declare the
// controls and how values map to a preview + code string.

export type PlaygroundControl =
  | { type: "text"; defaultValue: string }
  | { type: "options"; options: readonly string[]; defaultValue: string }
  | { type: "boolean"; defaultValue: boolean }

export type PlaygroundValues = Record<string, string | boolean>

export function DocPlayground({
  controls,
  renderPreview,
  renderCode,
}: {
  controls: Record<string, PlaygroundControl>
  renderPreview: (values: PlaygroundValues) => React.ReactNode
  renderCode: (values: PlaygroundValues) => string
}) {
  const [values, setValues] = React.useState<PlaygroundValues>(() =>
    Object.fromEntries(
      Object.entries(controls).map(([key, control]) => [
        key,
        control.defaultValue,
      ])
    )
  )

  const setValue = (key: string, value: string | boolean) =>
    setValues((current) => ({ ...current, [key]: value }))

  const entries = Object.entries(controls)
  const fieldControls = entries.filter(([, c]) => c.type !== "boolean")
  const booleanControls = entries.filter(([, c]) => c.type === "boolean")

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-soft">
      {/* Preview on a dotted canvas */}
      <div className="flex items-center justify-center border-b border-border-soft bg-[radial-gradient(var(--color-border-soft)_1px,transparent_1px)] [background-size:14px_14px] p-8 sm:p-12">
        {renderPreview(values)}
      </div>

      {/* Controls */}
      <div className="grid gap-x-12 gap-y-4 border-b border-border-soft p-5 md:grid-cols-[1fr_auto]">
        <div className="flex min-w-0 flex-col gap-3">
          {fieldControls.map(([key, control]) => (
            <div
              key={key}
              className="grid grid-cols-[6.5rem_1fr] items-center gap-3"
            >
              <span className="truncate font-mono text-sm text-muted-foreground">
                {key}
              </span>
              {control.type === "text" ? (
                <Input
                  size="sm"
                  value={values[key] as string}
                  onChange={(event) => setValue(key, event.target.value)}
                />
              ) : control.type === "options" ? (
                <Tabs
                  value={values[key] as string}
                  onValueChange={(value) => setValue(key, value as string)}
                >
                  <TabsList size="sm">
                    {control.options.map((option) => (
                      <TabsTrigger key={option} value={option}>
                        {option}
                      </TabsTrigger>
                    ))}
                    <TabsIndicator />
                  </TabsList>
                </Tabs>
              ) : null}
            </div>
          ))}
        </div>
        {booleanControls.length > 0 && (
          <div className="flex flex-col gap-4 md:min-w-52">
            {booleanControls.map(([key]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {key}
                </span>
                <Switch
                  size="sm"
                  checked={values[key] as boolean}
                  onCheckedChange={(checked) => setValue(key, checked)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generated code */}
      <CodeBlock code={renderCode(values)} className="rounded-none border-0" />
    </div>
  )
}
