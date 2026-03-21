"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatOklch, hexToOklch, oklchToHex } from "@/lib/color-utils";

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
		<div className="flex items-center justify-between gap-3 rounded-md py-1.5 pl-1 pr-0 transition-colors hover:bg-muted/40">
			<Label
				className="min-w-0 flex-1 truncate text-xs font-medium capitalize text-foreground"
				title={displayLabel}
			>
				{displayLabel}
			</Label>
			<div className="flex shrink-0 items-center gap-2">
				<Input
					type="text"
					value={formatOklch(value)}
					onChange={(e) => onChange(e.target.value)}
					className="h-8 w-[min(100%,9.5rem)] text-[11px] font-mono"
					aria-label={`OKLCH value for ${displayLabel}`}
					spellCheck={false}
				/>
				<div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border shadow-sm">
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
