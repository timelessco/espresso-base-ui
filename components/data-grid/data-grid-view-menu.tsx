"use client";

import { useDirection } from "@radix-ui/react-direction";
import type { Table } from "@tanstack/react-table";
import { Check, Settings2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui-radix/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui-radix/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui-radix/popover";
import { cn } from "@/lib/utils";

interface DataGridViewMenuProps<TData>
  extends React.ComponentProps<typeof PopoverContent> {
  table: Table<TData>;
  disabled?: boolean;
}

export function DataGridViewMenu<TData>({
  table,
  disabled,
  className,
  ...props
}: DataGridViewMenuProps<TData>) {
  const dir = useDirection();

  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide(),
        ),
    [table],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          role="combobox"
          dir={dir}
          variant="secondary"
          size="sm"
          className="ms-auto hidden h-7 font-normal focus-visible:border-transparent focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:shadow-3xs focus-visible:ring-0 lg:flex"
          disabled={disabled}
        >
          <Settings2 className="text-muted-foreground" />
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent
        dir={dir}
        className={cn("w-44 p-0", className)}
        {...props}
      >
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  onSelect={() =>
                    column.toggleVisibility(!column.getIsVisible())
                  }
                >
                  <span className="truncate">
                    {column.columnDef.meta?.label ?? column.id}
                  </span>
                  <Check
                    className={cn(
                      "ms-auto size-4 shrink-0",
                      column.getIsVisible() ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
