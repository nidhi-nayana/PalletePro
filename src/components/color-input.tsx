"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  className?: string;
}

export function ColorInput({ id, label, value, onChange, onRemove, className }: ColorInputProps) {
  const [inputValue, setInputValue] = React.useState(value);

  // Update internal state when the prop value changes
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
     // Basic hex color validation
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

   const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };


  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
       <Input
        type="color"
        id={`${id}-picker`}
        value={value}
        onChange={handleColorPickerChange}
        className="w-10 h-10 p-1 rounded-md border cursor-pointer"
        aria-label={`${label} color picker`}
      />
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1 rounded-md shadow-sm focus:ring-accent focus:border-accent"
        placeholder="#RRGGBB"
        maxLength={7}
        aria-label={label}
      />
       <Button variant="ghost" size="sm" onClick={onRemove} aria-label={`Remove ${label}`}>
         X
       </Button>
    </div>
  );
}
