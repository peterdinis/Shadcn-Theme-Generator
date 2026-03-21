"use client";

import type { LucideIcon } from "lucide-react";
import {
	AlertTriangle,
	Brush,
	Check,
	ChevronRight,
	Layers,
	Monitor,
	Moon,
	Palette,
	RotateCcw,
	Search,
	Sun,
	Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getContrastRatio } from "@/lib/color-utils";
import { useThemeStore } from "@/lib/store";
import { defaultThemes } from "@/lib/themes";
import type { ThemeColorName } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./color-picker";

const fonts = [
	"Inter",
	"Geist Sans",
	"Outfit",
	"JetBrains Mono",
	"Lora",
	"Space Mono",
	"Playfair Display",
	"Work Sans",
	"Crimson Text",
	"Quicksand",
	"Roboto",
	"Montserrat",
	"DM Sans",
	"Manrope",
	"Newsreader",
	"Plus Jakarta Sans",
	"Syne",
];

const colorGroups: {
	name: string;
	colors: ThemeColorName[];
	icon: LucideIcon;
}[] = [
	{ name: "Base", colors: ["background", "foreground"], icon: Layers },
	{ name: "Brand", colors: ["primary", "primary-foreground"], icon: Zap },
	{
		name: "Secondary",
		colors: ["secondary", "secondary-foreground"],
		icon: Brush,
	},
	{ name: "Muted", colors: ["muted", "muted-foreground"], icon: Palette },
	{ name: "Accent", colors: ["accent", "accent-foreground"], icon: Palette },
	{
		name: "Destructive",
		colors: ["destructive", "destructive-foreground"],
		icon: AlertTriangle,
	},
	{
		name: "Surface",
		colors: ["card", "card-foreground", "popover", "popover-foreground"],
		icon: Layers,
	},
	{ name: "UI", colors: ["border", "input", "ring"], icon: Monitor },
];

export function ThemeSidebar() {
	const { config, updateColor, setRadius, setFont, applyPreset, reset } =
		useThemeStore();
	const { theme, setTheme, resolvedTheme } = useTheme();

	const [mounted, setMounted] = useState(false);
	const [presetQuery, setPresetQuery] = useState("");
	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(colorGroups.map((g) => [g.name, true])),
	);

	useEffect(() => setMounted(true), []);

	const filteredPresets = useMemo(() => {
		const q = presetQuery.trim().toLowerCase();
		return Object.entries(defaultThemes).filter(([, preset]) =>
			q ? preset.name.toLowerCase().includes(q) : true,
		);
	}, [presetQuery]);

	const setAllGroupsOpen = (open: boolean) => {
		setOpenGroups(Object.fromEntries(colorGroups.map((g) => [g.name, open])));
	};

	if (!mounted)
		return (
			<div className="h-48 w-full shrink-0 border-border bg-card opacity-0 md:h-full md:w-[380px] md:border-r" />
		);

	const currentMode = (resolvedTheme === "dark" ? "dark" : "light") as
		| "light"
		| "dark";
	const currentColors = config[currentMode];

	const contrast = getContrastRatio(
		currentColors.primary,
		currentColors["primary-foreground"],
	);
	const isContrastOk = contrast >= 4.5;
	const isHighContrast = contrast >= 7;

	return (
		<aside
			className={cn(
				"flex h-[min(44vh,420px)] w-full shrink-0 flex-col overflow-hidden border-b border-border bg-card md:h-full md:w-[min(100%,400px)] md:max-w-[400px] md:border-r md:border-b-0",
			)}
		>
			<header className="z-20 shrink-0 space-y-3 border-b border-border bg-card/90 px-4 py-4 backdrop-blur-md md:px-5">
				<div className="flex items-center justify-between gap-2">
					<div className="flex min-w-0 items-center gap-2">
						<div className="shrink-0 rounded-lg bg-primary/10 p-1.5 text-primary">
							<Palette className="size-5" />
						</div>
						<div className="min-w-0">
							<h2 className="truncate text-base font-bold tracking-tight">
								Theme Designer
							</h2>
							<p className="truncate text-[11px] text-muted-foreground">
								{config.name}
							</p>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={reset}
						title="Reset to Zinc default"
						className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
						aria-label="Reset theme to Zinc default"
					>
						<RotateCcw className="size-4" />
					</Button>
				</div>
			</header>

			<div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 pb-8 md:px-5">
				<Card size="sm" className="border-border/70 bg-muted/15 shadow-none">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm">Appearance</CardTitle>
						<CardDescription className="text-xs leading-relaxed">
							Controls the app preview (light, dark, or system).
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex w-full gap-1 rounded-lg bg-muted/50 p-1 ring-1 ring-border/50">
							<Button
								variant={theme === "light" ? "default" : "ghost"}
								size="sm"
								className={cn(
									"h-8 flex-1 rounded-md text-xs font-medium",
									theme === "light" && "shadow-sm",
								)}
								onClick={() => setTheme("light")}
							>
								<Sun className="mr-1 size-3.5" />
								Light
							</Button>
							<Button
								variant={theme === "dark" ? "default" : "ghost"}
								size="sm"
								className={cn(
									"h-8 flex-1 rounded-md text-xs font-medium",
									theme === "dark" && "shadow-sm",
								)}
								onClick={() => setTheme("dark")}
							>
								<Moon className="mr-1 size-3.5" />
								Dark
							</Button>
							<Button
								variant={theme === "system" ? "default" : "ghost"}
								size="sm"
								className={cn(
									"h-8 flex-1 rounded-md text-xs font-medium",
									theme === "system" && "shadow-sm",
								)}
								onClick={() => setTheme("system")}
							>
								<Monitor className="mr-1 size-3.5" />
								Auto
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card size="sm" className="border-border/70 bg-muted/15 shadow-none">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm">Presets</CardTitle>
						<CardDescription className="text-xs leading-relaxed">
							Start from a curated palette, then fine-tune tokens below.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="relative">
							<Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search presets…"
								value={presetQuery}
								onChange={(e) => setPresetQuery(e.target.value)}
								className="h-9 pl-8 text-xs"
								aria-label="Filter theme presets"
							/>
						</div>
						<div className="max-h-[200px] space-y-1.5 overflow-y-auto pr-0.5 scrollbar-thin">
							{filteredPresets.length === 0 ? (
								<p className="py-6 text-center text-xs text-muted-foreground">
									No presets match “{presetQuery}”.
								</p>
							) : (
								filteredPresets.map(([key, preset]) => (
									<Button
										key={key}
										variant="outline"
										size="sm"
										className={cn(
											"h-9 w-full justify-start border-transparent bg-background/60 px-3 hover:border-primary/40",
											config.name === preset.name &&
												"border-primary bg-primary/5 ring-1 ring-primary/20",
										)}
										onClick={() => applyPreset(key)}
									>
										<span
											className="mr-2 size-3 shrink-0 rounded-full shadow-inner ring-1 ring-black/5"
											style={{
												backgroundColor: preset[currentMode].primary,
											}}
											aria-hidden
										/>
										<span className="truncate text-xs font-medium">
											{preset.name}
										</span>
									</Button>
								))
							)}
						</div>
					</CardContent>
				</Card>

				<Card size="sm" className="border-border/70 bg-muted/15 shadow-none">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm">Typography & shape</CardTitle>
						<CardDescription className="text-xs leading-relaxed">
							Font loads from Google Fonts when you pick a family.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-5">
						<div className="space-y-2">
							<Label
								htmlFor="font-family"
								className="text-xs font-medium text-muted-foreground"
							>
								Font family
							</Label>
							<Select
								value={config.font}
								onValueChange={(val) => val && setFont(val)}
							>
								<SelectTrigger
									id="font-family"
									className="h-9 w-full max-w-none text-xs"
								>
									<SelectValue placeholder="Select a font" />
								</SelectTrigger>
								<SelectContent className="max-h-56">
									{fonts.map((f) => (
										<SelectItem key={f} value={f} className="text-xs">
											{f}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-3">
							<div className="flex items-center justify-between gap-2">
								<Label
									htmlFor="radius-slider"
									className="text-xs font-medium text-muted-foreground"
								>
									Corner radius
								</Label>
								<span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none text-primary">
									{config.radius}rem
								</span>
							</div>
							<Slider
								id="radius-slider"
								aria-label="Border radius in rem"
								value={[config.radius]}
								max={1.5}
								min={0}
								step={0.125}
								onValueChange={(val) =>
									setRadius(Array.isArray(val) ? val[0] : val)
								}
							/>
						</div>

						<div className="rounded-lg border border-border/60 bg-background/40 p-3">
							<div className="mb-1 flex items-center justify-between gap-2">
								<span className="text-[11px] font-semibold text-foreground">
									Primary contrast
								</span>
								<div
									className={cn(
										"flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
										isHighContrast
											? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
											: isContrastOk
												? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
												: "bg-destructive/10 text-destructive",
									)}
								>
									{isContrastOk ? (
										<Check className="size-3" />
									) : (
										<AlertTriangle className="size-3" />
									)}
									{contrast.toFixed(2)}:1
								</div>
							</div>
							<p className="text-[10px] leading-relaxed text-muted-foreground">
								Ratio between primary and primary-foreground. Aim for at least
								4.5:1 for text.
							</p>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-2">
					<div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
						<h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
							Color tokens
						</h3>
						<div className="flex gap-1">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="h-7 text-[10px] font-medium"
								onClick={() => setAllGroupsOpen(true)}
							>
								Expand all
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="h-7 text-[10px] font-medium"
								onClick={() => setAllGroupsOpen(false)}
							>
								Collapse all
							</Button>
						</div>
					</div>

					<div className="space-y-2">
						{colorGroups.map((group) => {
							const isOpen = openGroups[group.name];
							return (
								<div
									key={group.name}
									className="overflow-hidden rounded-xl border border-border/60 bg-muted/10"
								>
									<button
										type="button"
										onClick={() =>
											setOpenGroups((o) => ({
												...o,
												[group.name]: !o[group.name],
											}))
										}
										className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-muted/50"
										aria-expanded={isOpen}
									>
										<ChevronRight
											className={cn(
												"size-4 shrink-0 text-muted-foreground transition-transform",
												isOpen && "rotate-90",
											)}
										/>
										<group.icon className="size-3.5 shrink-0 text-primary" />
										<span className="min-w-0 flex-1 truncate">
											{group.name}
										</span>
										<span className="shrink-0 tabular-nums text-[10px] text-muted-foreground">
											{group.colors.length}
										</span>
									</button>
									{isOpen ? (
										<div className="space-y-0 border-t border-border/50 px-2 pb-2 pt-1">
											{group.colors.map((colorName) => (
												<ColorPicker
													key={colorName}
													label={colorName}
													value={currentColors[colorName]}
													onChange={(val) =>
														updateColor(currentMode, colorName, val)
													}
												/>
											))}
										</div>
									) : null}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</aside>
	);
}
