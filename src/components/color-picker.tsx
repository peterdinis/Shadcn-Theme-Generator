"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { oklchToHex, hexToOklch, formatOklch } from "@/lib/color-utils";

interface ColorPickerProps {
  label: string;
  value: string; // The oklch string
  onChange: (val: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const hexValue = oklchToHex(value);

  // Parse label to be more readable
  const displayLabel = label.replace("-", " ");

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <Label className="text-sm font-medium capitalize truncate" title={displayLabel}>
        {displayLabel}
      </Label>
      <div className="flex items-center gap-2 shrink-0">
        <Input
          type="text"
          value={formatOklch(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-36 h-8 text-[11px] font-mono"
        />
        <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border shadow-sm shrink-0">
          <input
            type="color"
            value={hexValue}
            onChange={(e) => onChange(hexToOklch(e.target.value))}
            className="absolute inset-[-10px] w-12 h-12 opacity-0 cursor-pointer"
            title={`Pick color for ${displayLabel}`}
          />
          <div
            className="w-full h-full pointer-events-none"
            style={{ backgroundColor: hexValue }}
          />
        </div>
      </div>
    </div>
  );
}
