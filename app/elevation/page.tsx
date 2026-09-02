"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const options = [
  { label: "Pick an option", value: null },
  { label: "Option one", value: "one" },
  { label: "Option two", value: "two" },
  { label: "Option three", value: "three" },
]

function OptionsSelect() {
  return (
    <Select items={options}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function ElevationPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Elevation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm leading-lg text-muted-foreground">
            Surfaces stack with elevation shadows – cards sit on the page,
            popovers float above them. Pick an option to see the select popup
            layer over this card.
          </p>
          <OptionsSelect />
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger
          render={<Button variant="outline">Open dialog</Button>}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Elevation in a dialog</DialogTitle>
          </DialogHeader>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Elevation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm leading-lg text-muted-foreground">
                Inside a dialog the same card sits one layer higher – the
                select popup still needs to render above everything here.
              </p>
              <OptionsSelect />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  )
}
