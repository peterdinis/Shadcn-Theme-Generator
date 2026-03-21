"use client";

import type { ChangeEvent } from "react";
import { Check, Copy, Download, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useThemeStore } from "@/lib/store";
import {
	getComponentsJsonStub,
	getShadcnInitCommand,
	SCAFFOLD_TEMPLATES,
	UI_TEMPLATE_META,
	type ScaffoldTemplate,
} from "@/lib/ui-template";

export function CodePreview() {
	const {
		config,
		setConfig,
		uiTemplate,
		scaffoldTemplate,
		setScaffoldTemplate,
	} = useThemeStore();
	const [copied, setCopied] = useState<string | null>(null);
	const [version, setVersion] = useState<"v3" | "v4">("v4");

	const initCommand = getShadcnInitCommand({
		uiTemplate,
		scaffoldTemplate,
	});
	const componentsStub = getComponentsJsonStub({ uiTemplate });

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

	const importJson = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const json = JSON.parse(event.target?.result as string);
				setConfig(json);
			} catch {
				alert("Invalid theme JSON");
			}
		};
		reader.readAsText(file);
	};

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
					Export / Import
				</h3>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={downloadJson}
						className="h-8 gap-2"
					>
						<Download className="size-3.5" />
						Download JSON
					</Button>
					<div className="relative">
						<input
							type="file"
							accept=".json"
							onChange={importJson}
							className="absolute inset-0 w-full cursor-pointer opacity-0"
							title="Import JSON"
						/>
						<Button
							variant="outline"
							size="sm"
							className="pointer-events-none h-8 gap-2 cursor-pointer"
						>
							<Upload className="size-3.5" />
							Import JSON
						</Button>
					</div>
				</div>
			</div>

			<Card size="sm" className="border-border/70 bg-muted/10 shadow-none">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm">Shadcn CLI template</CardTitle>
					<CardDescription className="text-xs leading-relaxed">
						Matches{" "}
						<a
							href={UI_TEMPLATE_META[uiTemplate].docsPath}
							target="_blank"
							rel="noreferrer"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							shadcn init
						</a>{" "}
						(<strong>{UI_TEMPLATE_META[uiTemplate].label}</strong>
						). Framework is only for the{" "}
						<code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
							-t
						</code>{" "}
						flag; your theme CSS still applies the same way.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-end">
						<div className="min-w-0 flex-1 space-y-2">
							<Label
								htmlFor="scaffold-template"
								className="text-xs font-medium text-muted-foreground"
							>
								Framework template (
								<code className="font-mono text-[10px]">-t</code>)
							</Label>
							<Select
								value={scaffoldTemplate}
								onValueChange={(v) =>
									v && setScaffoldTemplate(v as ScaffoldTemplate)
								}
							>
								<SelectTrigger id="scaffold-template" className="h-9 w-full text-xs">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{SCAFFOLD_TEMPLATES.map((t) => (
										<SelectItem key={t.value} value={t.value} className="text-xs">
											{t.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex shrink-0 flex-wrap gap-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="h-9 gap-2"
								onClick={() => copyToClipboard(initCommand, "init")}
							>
								{copied === "init" ? (
									<Check className="size-3.5 text-emerald-500" />
								) : (
									<Copy className="size-3.5" />
								)}
								Copy init command
							</Button>
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="h-9 gap-2"
								onClick={() => copyToClipboard(componentsStub, "cj")}
							>
								{copied === "cj" ? (
									<Check className="size-3.5 text-emerald-500" />
								) : (
									<Copy className="size-3.5" />
								)}
								Copy components.json stub
							</Button>
						</div>
					</div>
					<pre className="max-h-32 overflow-auto rounded-xl border border-border bg-zinc-950 p-3 font-mono text-[10px] text-zinc-300">
						{initCommand}
					</pre>
					<p className="text-[10px] leading-relaxed text-muted-foreground">
						After{" "}
						<code className="rounded bg-muted px-1 font-mono">init</code>, set{" "}
						<code className="rounded bg-muted px-1 font-mono">style</code> to{" "}
						<code className="rounded bg-muted px-1 font-mono">
							{UI_TEMPLATE_META[uiTemplate].componentsJsonStyle}
						</code>{" "}
						if the CLI does not match your choice, then paste the CSS from this
						page into your globals.
					</p>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-1">
							<Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
								CSS Variables
							</Label>
							<div className="mt-1 flex items-center gap-1">
								<Button
									type="button"
									onClick={() => setVersion("v4")}
									variant={version === "v4" ? "secondary" : "ghost"}
									size="sm"
									className="h-6 px-2 text-[9px] font-black tracking-widest uppercase"
								>
									v4
								</Button>
								<Button
									type="button"
									onClick={() => setVersion("v3")}
									variant={version === "v3" ? "secondary" : "ghost"}
									size="sm"
									className="h-6 px-2 text-[9px] font-black tracking-widest uppercase"
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
								<Check className="size-3.5 text-emerald-500" />
							) : (
								<Copy className="size-3.5" />
							)}
							{copied === "css" ? "Copied" : "Copy CSS"}
						</Button>
					</div>
					<pre className="max-h-[400px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[10px] text-zinc-300 shadow-xl">
						{getCss(version)}
					</pre>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
							Theme JSON
						</Label>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => copyToClipboard(getJson(), "json")}
							className="h-8 gap-2"
						>
							{copied === "json" ? (
								<Check className="size-3.5 text-emerald-500" />
							) : (
								<Copy className="size-3.5" />
							)}
							{copied === "json" ? "Copied" : "Copy JSON"}
						</Button>
					</div>
					<pre className="max-h-[400px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[10px] text-zinc-300 shadow-xl">
						{getJson()}
					</pre>
				</div>
			</div>
		</div>
	);
}
