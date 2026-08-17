"use client"

import * as React from "react"

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
import { Badge } from "@/components/ui/badge"
import { PreviewCard, PreviewGrid } from "./preview-card"

const INVOICES = [
  { id: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV-003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV-004", status: "Paid", method: "Credit Card", amount: "$450.00" },
]

export default function TablePreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Basic">
        <div className="w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="With badges">
        <div className="w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Paid"
                          ? "default"
                          : row.status === "Pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="With footer">
        <div className="w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">$1,200.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="With caption">
        <div className="w-full max-w-md">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.slice(0, 3).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
