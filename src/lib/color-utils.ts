import { formatCss, formatHex, oklch, wcagContrast } from "culori";

// Ensure color string is valid before converting
export function parseColor(color: string) {
	try {
		return oklch(color);
	} catch {
		return null;
	}
}

// Get the contrast ratio to determine foreground color if needed automatically
export function getContrastRatio(color1: string, color2: string) {
	return wcagContrast(color1, color2);
}

// Optional utility to format OKLCH manually if culori format differs
export function formatOklch(color: string) {
	const parsed = parseColor(color);
	if (!parsed) return color;
	const l = parsed.l !== undefined ? parsed.l.toFixed(3) : 0;
	const c = parsed.c !== undefined ? parsed.c.toFixed(3) : 0;
	const h = parsed.h !== undefined ? parsed.h.toFixed(3) : 0;
	return `oklch(${l} ${c} ${h})`;
}

export function oklchToHex(color: string): string {
	const parsed = parseColor(color);
	if (!parsed) return "#000000";
	return formatHex(parsed);
}

export function hexToOklch(hex: string): string {
	const parsed = oklch(hex);
	if (!parsed) return "oklch(0 0 0)";
	const l = parsed.l !== undefined ? parsed.l.toFixed(3) : 0;
	const c = parsed.c !== undefined ? parsed.c.toFixed(3) : 0;
	const h = parsed.h !== undefined ? parsed.h.toFixed(3) : 0;
	return `oklch(${l} ${c} ${h})`;
}
