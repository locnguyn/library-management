"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface ComboBoxProps {
  items: any[];
  type: string;
  onSelect: (value: string) => void;
}

export function ComboBox({ items, type, onSelect }: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full col-span-3 justify-between"
        >
          {value
            ? items.find((item) => item._id === value)?.name ||
              items.find((item) => item._id === value)?.title ||
              "Selected"
            : `Select ${type}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full col-span-3 p-0">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item._id}
                  value={item._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.name || item.title}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item._id ? "opacity-100" : "opacity-0"
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
