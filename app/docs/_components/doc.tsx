import * as React from "react"

import { cn } from "@/lib/utils"

// Shared building blocks for component documentation pages, modeled on the
// frappe-ui docs anatomy: H1 + intro, sectioned live examples with prose and
// code, then an API reference with props tables.

function DocPage({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12">
      {children}
    </article>
  )
}

function DocHeader({
  title,
  description,
}: {
  title: string
  description: React.ReactNode
}) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="text-base leading-loose text-muted-foreground">
        {description}
      </p>
    </header>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function DocSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={slugify(title)}
      data-doc-section=""
      data-doc-title={title}
      className="flex scroll-mt-6 flex-col gap-3"
    >
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function DocProse({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-loose text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-foreground">
      {children}
    </p>
  )
}

// A live preview card with the example code below it.
function DocExample({
  children,
  code,
  className,
}: {
  children: React.ReactNode
  code?: string
  className?: string
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-soft">
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-3 bg-background p-6 sm:p-10",
          className
        )}
      >
        {children}
      </div>
      {code && (
        <CodeBlock code={code} className="rounded-none border-x-0 border-b-0" />
      )}
    </div>
  )
}

function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre
      className={cn(
        "scrollbar-hide overflow-x-auto rounded-xl border border-border-soft bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground",
        className
      )}
    >
      <code>{code.trim()}</code>
    </pre>
  )
}

// Installation command for a registry component (shadcn-style docs section).
function DocInstall({ name }: { name: string }) {
  return (
    <CodeBlock
      code={`npx shadcn@latest add https://espresso-base-ui.vercel.app/r/${name}.json`}
    />
  )
}

type PropRow = {
  prop: string
  type: string
  defaultValue?: string
  description: string
}

function PropsTable({ title, rows }: { title?: string; rows: PropRow[] }) {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <h3 className="font-mono text-base font-medium text-foreground">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto rounded-xl border border-border-soft">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-soft bg-muted/40 text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Default</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.prop}
                className="border-b border-border-soft last:border-b-0"
              >
                <td className="px-4 py-3 font-mono text-foreground">
                  {row.prop}
                </td>
                <td className="px-4 py-3 font-mono text-muted-foreground">
                  {row.type}
                </td>
                <td className="px-4 py-3 font-mono text-muted-foreground">
                  {row.defaultValue ?? "–"}
                </td>
                <td className="px-4 py-3 leading-relaxed text-muted-foreground">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Table describing a component's exported parts (anatomy), for compound
// components where most parts just take children + className.
type PartRow = { part: string; description: string }

function PartsTable({ rows }: { rows: PartRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border-soft">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-soft bg-muted/40 text-muted-foreground">
            <th className="px-4 py-2.5 font-medium">Component</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.part}
              className="border-b border-border-soft last:border-b-0"
            >
              <td className="px-4 py-3 font-mono whitespace-nowrap text-foreground">
                {row.part}
              </td>
              <td className="px-4 py-3 leading-relaxed text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export {
  DocPage,
  DocHeader,
  DocSection,
  DocProse,
  DocExample,
  DocInstall,
  CodeBlock,
  PropsTable,
  PartsTable,
}
