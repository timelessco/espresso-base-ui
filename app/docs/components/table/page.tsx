"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
} from "../../_components/doc"
import {
  DocPlayground,
  type PlaygroundValues,
} from "../../_components/playground"

const playgroundRows = [
  { invoice: "INV001", method: "Credit Card", amount: 250 },
  { invoice: "INV002", method: "PayPal", amount: 150 },
  { invoice: "INV003", method: "Bank Transfer", amount: 350 },
  { invoice: "INV004", method: "Credit Card", amount: 450 },
  { invoice: "INV005", method: "PayPal", amount: 200 },
]

const money = (amount: number) => `$${amount.toFixed(2)}`

function tablePlaygroundCode(v: PlaygroundValues) {
  const rows = playgroundRows.slice(0, Number(v.rows))
  const total = rows.reduce((sum, row) => sum + row.amount, 0)

  const lines = [
    `<Table>`,
    `  <TableHeader>`,
    `    <TableRow>`,
    `      <TableHead className="w-[100px]">Invoice</TableHead>`,
    `      <TableHead>Method</TableHead>`,
    `      <TableHead className="text-right">Amount</TableHead>`,
    `    </TableRow>`,
    `  </TableHeader>`,
    `  <TableBody>`,
  ]
  rows.forEach((row, index) => {
    const selected = Boolean(v.selectedRow) && index === 0
    lines.push(
      `    <TableRow${selected ? ` data-state="selected"` : ""}>`,
      `      <TableCell className="font-medium">${row.invoice}</TableCell>`,
      `      <TableCell>${row.method}</TableCell>`,
      `      <TableCell className="text-right">${money(row.amount)}</TableCell>`,
      `    </TableRow>`
    )
  })
  lines.push(`  </TableBody>`)
  if (v.footer) {
    lines.push(
      `  <TableFooter>`,
      `    <TableRow>`,
      `      <TableCell colSpan={2}>Total</TableCell>`,
      `      <TableCell className="text-right">${money(total)}</TableCell>`,
      `    </TableRow>`,
      `  </TableFooter>`
    )
  }
  lines.push(`</Table>`)
  return lines.join("\n")
}

function TablePlaygroundPreview(v: PlaygroundValues) {
  const rows = playgroundRows.slice(0, Number(v.rows))
  const total = rows.reduce((sum, row) => sum + row.amount, 0)

  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.invoice}
              data-state={
                Boolean(v.selectedRow) && index === 0 ? "selected" : undefined
              }
            >
              <TableCell className="font-medium">{row.invoice}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell className="text-right">{money(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {Boolean(v.footer) && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">{money(total)}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
]

export default function TableDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Table"
        description="Styled wrappers around the native HTML table elements. The root scrolls horizontally on overflow, and rows support hover and selected states."
      />

      <DocSection title="Playground">
        <DocPlayground
          controls={{
            rows: {
              type: "options",
              options: ["3", "5"],
              defaultValue: "3",
            },
            footer: { type: "boolean", defaultValue: false },
            selectedRow: { type: "boolean", defaultValue: false },
          }}
          renderPreview={TablePlaygroundPreview}
          renderCode={tablePlaygroundCode}
        />
      </DocSection>

      <DocSection title="Preview">
        <DocProse>
          Compose the native table anatomy: <code>TableHeader</code> with{" "}
          <code>TableHead</code> cells, <code>TableBody</code> with{" "}
          <code>TableRow</code> and <code>TableCell</code>, and an optional{" "}
          <code>TableCaption</code> rendered below the table.
        </DocProse>
        <DocExample
          code={`
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
        >
          <div className="w-full max-w-xl">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.method}</TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="table" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`}
        />
        <CodeBlock
          code={`
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Sandeep</TableCell>
      <TableCell>sandeepk@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        />
      </DocSection>

      <DocSection title="With footer">
        <DocProse>
          Add a <code>TableFooter</code> after the body for summary rows – it
          gets a top border, medium weight, and cells can span columns with the
          native <code>colSpan</code>.
        </DocProse>
        <DocExample
          code={`
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$400.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        >
          <div className="w-full max-w-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">$400.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="Selected rows">
        <DocProse>
          Set <code>data-state="selected"</code> on a <code>TableRow</code> to
          give it a persistent <code>bg-muted</code> highlight – pair it with a
          checkbox column when building selectable lists.
        </DocProse>
        <DocExample
          code={`
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead className="text-right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell className="font-medium">Wireless Mouse</TableCell>
      <TableCell className="text-right">$29.99</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Mechanical Keyboard</TableCell>
      <TableCell className="text-right">$149.99</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">USB-C Hub</TableCell>
      <TableCell className="text-right">$49.99</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <div className="w-full max-w-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow data-state="selected">
                  <TableCell className="font-medium">Wireless Mouse</TableCell>
                  <TableCell className="text-right">$29.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Mechanical Keyboard
                  </TableCell>
                  <TableCell className="text-right">$149.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">USB-C Hub</TableCell>
                  <TableCell className="text-right">$49.99</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <DocProse>
          Every part is a thin wrapper around its native HTML element (
          <code>table</code>, <code>thead</code>, <code>tbody</code>,{" "}
          <code>tfoot</code>, <code>tr</code>, <code>th</code>, <code>td</code>,{" "}
          <code>caption</code>) – each accepts <code>className</code> plus all
          standard props of that element, so <code>colSpan</code>,{" "}
          <code>rowSpan</code> and friends work as usual. There are no variant
          props.
        </DocProse>
        <PartsTable
          rows={[
            {
              part: "Table",
              description:
                'The table element (data-slot="table"), wrapped in a scroll container div (data-slot="table-container") that handles horizontal overflow.',
            },
            {
              part: "TableHeader",
              description:
                'thead (data-slot="table-header") – header rows keep a soft bottom border and are excluded from hover highlighting.',
            },
            {
              part: "TableBody",
              description:
                'tbody (data-slot="table-body") – removes the border from the last row.',
            },
            {
              part: "TableFooter",
              description:
                'tfoot (data-slot="table-footer") with a top border and medium font weight, for totals and summary rows.',
            },
            {
              part: "TableRow",
              description:
                'tr (data-slot="table-row") – soft bottom border, bg-secondary hover highlight with rounded end cells, and a bg-muted state via data-state="selected".',
            },
            {
              part: "TableHead",
              description:
                'th (data-slot="table-head") – left-aligned, whitespace-nowrap header cell in accent-foreground; trailing padding is dropped when it contains a checkbox.',
            },
            {
              part: "TableCell",
              description:
                'td (data-slot="table-cell") – muted, ellipsis-truncated body cell; trailing padding is dropped when it contains a checkbox.',
            },
            {
              part: "TableCaption",
              description:
                'caption (data-slot="table-caption") – muted description rendered below the table (caption-bottom).',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling hooks">
        <DocProse>
          Because the parts are semantic table elements, screen readers get the
          native table roles for free. Each part exposes a{" "}
          <code>data-slot</code> attribute (<code>table-container</code>,{" "}
          <code>table</code>, <code>table-header</code>, <code>table-body</code>
          , <code>table-footer</code>, <code>table-row</code>,{" "}
          <code>table-head</code>, <code>table-cell</code>,{" "}
          <code>table-caption</code>) for CSS overrides. Hover styling is
          applied only on devices that support hover, borders around a hovered
          row fade out for a card-like highlight, and rows containing an
          expanded trigger (<code>aria-expanded</code>) get a subtle{" "}
          <code>bg-muted/50</code> tint.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
