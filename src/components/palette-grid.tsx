"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useThemeStore } from "@/lib/store";
import type { ThemeColorName } from "@/lib/types";
import { cn } from "@/lib/utils";

const colorGroups: { name: string; colors: ThemeColorName[] }[] = [
	{ name: "Base", colors: ["background", "foreground"] },
	{ name: "Brand", colors: ["primary", "primary-foreground"] },
	{ name: "Secondary", colors: ["secondary", "secondary-foreground"] },
	{ name: "Muted", colors: ["muted", "muted-foreground"] },
	{ name: "Accent", colors: ["accent", "accent-foreground"] },
	{ name: "Destructive", colors: ["destructive", "destructive-foreground"] },
	{
		name: "Surface",
		colors: ["card", "card-foreground", "popover", "popover-foreground"],
	},
	{ name: "UI", colors: ["border", "input", "ring"] },
];

export function PaletteGrid() {
	const { config } = useThemeStore();
	const { resolvedTheme } = useTheme();
	const [copied, setCopied] = useState<string | null>(null);

	const currentMode = (resolvedTheme === "dark" ? "dark" : "light") as
		| "light"
		| "dark";
	const colors = config[currentMode];

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(text);
		setTimeout(() => setCopied(null), 2000);
	};

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{colorGroups.map((group) => (
				<div key={group.name} className="space-y-3">
					<h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">
						{group.name}
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{group.colors.map((colorName) => (
							<div
								key={colorName}
								className="group relative flex flex-col gap-2 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-md"
							>
								<div
									className="w-full aspect-video rounded-lg shadow-inner ring-1 ring-black/5 flex items-center justify-center overflow-hidden"
									style={{ backgroundColor: colors[colorName] }}
								>
									<button
										onClick={() => copyToClipboard(colors[colorName])}
										className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:scale-110 active:scale-95"
									>
										{copied === colors[colorName] ? (
											<Check className="w-4 h-4 text-emerald-500" />
										) : (
											<Copy className="w-4 h-4" />
										)}
									</button>
								</div>
								<div className="flex flex-col gap-0.5 px-1">
									<span className="text-[10px] font-bold uppercase tracking-wider truncate">
										{colorName.replace("-", " ")}
									</span>
									<span className="text-[10px] font-mono text-muted-foreground truncate">
										{colors[colorName]}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
