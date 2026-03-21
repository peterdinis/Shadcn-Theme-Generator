export type ThemeColorName =
	| "background"
	| "foreground"
	| "card"
	| "card-foreground"
	| "popover"
	| "popover-foreground"
	| "primary"
	| "primary-foreground"
	| "secondary"
	| "secondary-foreground"
	| "muted"
	| "muted-foreground"
	| "accent"
	| "accent-foreground"
	| "destructive"
	| "destructive-foreground"
	| "border"
	| "input"
	| "ring";

export type ThemeColors = Record<ThemeColorName, string>;

export interface ThemeConfig {
	name: string;
	light: ThemeColors;
	dark: ThemeColors;
	radius: number;
	font: string;
}
