"use client";

import { Check, Copy, Download, Info, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CodePreview() {
	const { config, setConfig } = useThemeStore();
	const [copied, setCopied] = useState<string | null>(null);
	const [version, setVersion] = useState<"v3" | "v4">("v4");

	const getCss = (v: "v3" | "v4") => {
		if (v === "v4") {
			let css = `@theme {\n`;
			const mapVars = (mode: "light" | "dark") => {
				return Object.entries(config[mode])
					.map(([k, val]) => `  --${k}: ${val};`)
					.join("\n");
			};

			css += `  /* Base variables */\n`;
			css += mapVars("light");
			css += `\n  --radius: ${config.radius}rem;\n\n`;
			css += `  /* Dark mode overrides */\n`;
			css += `  @variant dark (&:where(.dark, .dark *));\n`;
			css += `  @media (prefers-color-scheme: dark) {\n`;
			css += `    :root {\n`;
			css += mapVars("dark")
				.split("\n")
				.map((line) => `    ${line}`)
				.join("\n");
			css += `\n    }\n`;
			css += `  }\n\n`;
			css += `  .dark {\n`;
			css += mapVars("dark")
				.split("\n")
				.map((line) => `    ${line}`)
				.join("\n");
			css += `\n  }\n`;
			css += `}`;
			return css;
		}

		const getVars = (mode: "light" | "dark") => {
			return Object.entries(config[mode])
				.map(([k, v]) => `    --${k}: ${v};`)
				.join("\n");
		};

		return `@layer base {\n  :root {\n${getVars("light")}\n    --radius: ${config.radius}rem;\n  }\n\n  .dark {\n${getVars("dark")}\n  }\n}`;
	};

	const getJson = () => JSON.stringify(config, null, 2);

	const copyToClipboard = (text: string, id: string) => {
		navigator.clipboard.writeText(text);
		setCopied(id);
		setTimeout(() => setCopied(null), 2000);
	};

	const downloadJson = () => {
		const blob = new Blob([getJson()], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `theme-${config.name.toLowerCase()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const json = JSON.parse(event.target?.result as string);
				setConfig(json);
			} catch (err) {
				alert("Invalid theme JSON");
			}
		};
		reader.readAsText(file);
	};

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
					Export / Import
				</h3>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={downloadJson}
						className="h-8 gap-2"
					>
						<Download className="w-3.5 h-3.5" />
						Download JSON
					</Button>
					<div className="relative">
						<input
							type="file"
							accept=".json"
							onChange={importJson}
							className="absolute inset-0 opacity-0 cursor-pointer w-full"
							title="Import JSON"
						/>
						<Button
							variant="outline"
							size="sm"
							className="h-8 gap-2 cursor-pointer pointer-events-none"
						>
							<Upload className="w-3.5 h-3.5" />
							Import JSON
						</Button>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-1">
							<Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
								CSS Variables
							</Label>
							<div className="flex items-center gap-1 mt-1">
								<Button
									onClick={() => setVersion("v4")}
									variant={version === "v4" ? "secondary" : "ghost"}
									size="sm"
									className="h-6 text-[9px] px-2 font-black uppercase tracking-widest"
								>
									v4
								</Button>
								<Button
									onClick={() => setVersion("v3")}
									variant={version === "v3" ? "secondary" : "ghost"}
									size="sm"
									className="h-6 text-[9px] px-2 font-black uppercase tracking-widest"
								>
									v3
								</Button>
							</div>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => copyToClipboard(getCss(version), "css")}
							className="h-8 gap-2"
						>
							{copied === "css" ? (
								<Check className="w-3.5 h-3.5 text-emerald-500" />
							) : (
								<Copy className="w-3.5 h-3.5" />
							)}
							{copied === "css" ? "Copied" : "Copy CSS"}
						</Button>
					</div>
					<pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 text-[10px] font-mono overflow-auto max-h-[400px] border border-zinc-800 shadow-xl">
						{getCss(version)}
					</pre>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
							Theme JSON
						</Label>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => copyToClipboard(getJson(), "json")}
							className="h-8 gap-2"
						>
							{copied === "json" ? (
								<Check className="w-3.5 h-3.5 text-emerald-500" />
							) : (
								<Copy className="w-3.5 h-3.5" />
							)}
							{copied === "json" ? "Copied" : "Copy JSON"}
						</Button>
					</div>
					<pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 text-[10px] font-mono overflow-auto max-h-[400px] border border-zinc-800 shadow-xl">
						{getJson()}
					</pre>
				</div>
			</div>
		</div>
	);
}
