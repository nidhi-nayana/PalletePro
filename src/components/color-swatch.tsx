"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getContrastColor } from "@/lib/colors"; // Import the contrast color function


interface ColorSwatchProps {
  color: string;
  className?: string;
}

export function ColorSwatch({ color, className }: ColorSwatchProps) {
  const { toast } = useToast();
  const textColor = getContrastColor(color); // Get contrast color

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color)
      .then(() => {
        toast({
          title: "Copied!",
          description: `${color} copied to clipboard.`,
          duration: 2000,
        });
      })
      .catch(err => {
        console.error("Failed to copy color: ", err);
        toast({
          title: "Error",
          description: "Failed to copy color.",
          variant: "destructive",
          duration: 2000,
        });
      });
  };

  return (
    <div
      className={cn(
        "relative group rounded-lg shadow-md overflow-hidden aspect-square flex flex-col justify-end p-4 transition-all duration-300 ease-in-out hover:shadow-lg",
        className
      )}
      style={{ backgroundColor: color }}
    >
       <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 p-2 rounded -m-2 mb-2">
         <span
            className="font-mono text-sm font-medium"
            style={{ color: textColor }} // Apply contrast color
          >
           {color.toUpperCase()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-7 w-7"
             style={{ color: textColor }} // Apply contrast color to button icon
             aria-label={`Copy color ${color}`}
          >
            <Copy className="h-4 w-4" />
          </Button>
       </div>
    </div>
  );
}
