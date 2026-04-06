"use client";

import { Check, Copy, FileCode } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useThemeStore } from "@/lib/store";
import {
	getShadcnInitCommand,
	UI_TEMPLATE_META,
} from "@/lib/ui-template";
import { cn } from "@/lib/utils";

export function ExportDialog() {
	const { config, uiTemplate, scaffoldTemplate } = useThemeStore();
	const [copied, setCopied] = useState(false);
	const [copiedInit, setCopiedInit] = useState(false);
	const [version, setVersion] = useState<"v3" | "v4">("v4");

	const initCommand = getShadcnInitCommand({
		uiTemplate,
		scaffoldTemplate,
	});

	const getCssString = (v: "v3" | "v4") => {
		if (v === "v4") {
			let css = `@theme {\n`;
			const mapVars = (mode: "light" | "dark") => {
				let str = "";
				Object.entries(config[mode]).forEach(([k, val]) => {
					str += `  --${k}: ${val};\n`;
				});
				return str;
			};
			css += `  /* Base variables */\n`;
			css += mapVars("light");
			css += `\n  --radius: ${config.radius}rem;\n\n`;
			css += `  @variant dark (&:where(.dark, .dark *));\n\n`;
			css += `  .dark {\n`;
			css += mapVars("dark")
				.split("\n")
				.map((l) => `    ${l}`)
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

	const cssString = getCssString(version);

	const handleCopy = () => {
		navigator.clipboard.writeText(cssString);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleCopyInit = () => {
		navigator.clipboard.writeText(initCommand);
		setCopiedInit(true);
		setTimeout(() => setCopiedInit(false), 2000);
	};

	// Helper to "highlight" the code for premium feel
	const highlightCode = (code: string) => {
		return code.split("\n").map((line, i) => {
			if (line.includes("/*"))
				return (
					<span key={i} className="text-zinc-500 italic">
						{line}
						{"\n"}
					</span>
				);
			if (line.includes(": ")) {
				const [prop, val] = line.split(": ");
				return (
					<span key={i}>
						<span className="text-blue-400">{prop}</span>
						<span className="text-zinc-400">: </span>
						<span className="text-emerald-400">{val}</span>
						{"\n"}
					</span>
				);
			}
			if (
				line.includes("@theme") ||
				line.includes("@layer") ||
				line.includes("@variant")
			) {
				return (
					<span key={i} className="text-purple-400 font-bold">
						{line}
						{"\n"}
					</span>
				);
			}
			return (
				<span key={i} className="text-zinc-300">
					{line}
					{"\n"}
				</span>
			);
		});
	};

	return (
		<Dialog>
			<DialogTrigger render={<Button />}>Export Theme</DialogTrigger>
			<DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-zinc-950/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] rounded-[32px]">
				{/* Animated Accent Line */}
				<div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

				<div className="p-6 md:p-10 space-y-6 md:space-y-10 max-h-[85vh] overflow-y-auto overflow-x-hidden md:max-h-none">
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<div className="space-y-3">
							<div className="flex flex-wrap items-center gap-2">
								<div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1">
									<div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,1)]" />
									<span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
										CSS {version.toUpperCase()}
									</span>
								</div>
								<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
									<span className="text-[10px] font-bold tracking-wide text-zinc-400">
										{UI_TEMPLATE_META[uiTemplate].label} · {scaffoldTemplate}
									</span>
								</div>
							</div>
							<DialogTitle className="text-3xl md:text-5xl font-black tracking-[-0.05em] text-white">
								Export <span className="text-zinc-500">Theme</span>
							</DialogTitle>
							<DialogDescription className="text-sm md:text-base text-zinc-400 font-medium max-w-md leading-relaxed">
								Your production-ready CSS variables are ready. Optimized for
								performance and readability.
							</DialogDescription>
						</div>

						<div className="flex h-11 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
							<button
								type="button"
								onClick={() => setVersion("v4")}
								className={cn(
									"rounded-xl px-6 text-[11px] font-black tracking-widest uppercase transition-all duration-300",
									version === "v4"
										? "scale-[1.02] bg-white text-black shadow-xl"
										: "text-zinc-500 hover:text-zinc-300",
								)}
							>
								v4
							</button>
							<button
								type="button"
								onClick={() => setVersion("v3")}
								className={cn(
									"rounded-xl px-6 text-[11px] font-black tracking-widest uppercase transition-all duration-300",
									version === "v3"
										? "scale-[1.02] bg-white text-black shadow-xl"
										: "text-zinc-500 hover:text-zinc-300",
								)}
							>
								v3
							</button>
						</div>
					</div>

					<div className="relative group">
						{/* Glossy Window Header */}
						<div className="hidden sm:flex items-center justify-between px-6 py-4 rounded-t-[24px] bg-white/5 border-x border-t border-white/10 border-b-0 backdrop-blur-xl">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-zinc-800" />
								<div className="w-3 h-3 rounded-full bg-zinc-800" />
								<div className="w-3 h-3 rounded-full bg-zinc-800" />
							</div>
							<div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 ring-1 ring-white/5">
								<FileCode className="w-3 h-3 text-zinc-500" />
								<span className="text-[10px] font-mono text-zinc-400 tracking-wider">
									globals.css
								</span>
							</div>
							<div className="w-12" /> {/* alignment spacer */}
						</div>

						{/* Simulated Editor */}
						<div className="p-4 sm:p-8 bg-black/60 sm:border-x border-y sm:border-t-0 border-white/10 rounded-xl sm:rounded-none sm:rounded-b-[24px] relative min-h-[300px] max-h-[350px] md:max-h-[450px] overflow-auto scrollbar-thin">
							<pre className="text-[11px] sm:text-[13px] font-mono leading-relaxed antialiased selection:bg-primary/30 selection:text-white">
								<code style={{ fontFamily: "'JetBrains Mono', monospace" }}>
									{highlightCode(cssString)}
								</code>
							</pre>

							{/* Bottom Fade */}
							<div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
						</div>

						{/* Hover Floating Copy (Sleek) */}
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-1/2 pointer-events-none scale-90 group-hover:scale-100">
							<div className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)]">
								Click code to copy
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
						<Button
							type="button"
							onClick={handleCopy}
							className="group h-16 flex-1 rounded-[24px] bg-white text-lg font-black tracking-tight text-black shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] transition-all hover:bg-zinc-200 active:scale-[0.98]"
						>
							{copied ? (
								<>
									<Check className="mr-3 size-6 animate-in text-emerald-600 duration-500 zoom-in spin-in" />
									<span>CSS copied</span>
								</>
							) : (
								<>
									<Copy className="mr-3 size-5 transition-transform group-hover:rotate-12" />
									<span>Copy CSS</span>
								</>
							)}
						</Button>

						<Button
							type="button"
							variant="outline"
							onClick={handleCopyInit}
							className="h-16 flex-1 rounded-[24px] border-white/20 bg-white/5 text-sm font-bold text-white hover:bg-white/10"
						>
							{copiedInit ? (
								<>
									<Check className="mr-2 size-5 text-emerald-400" />
									Init command copied
								</>
							) : (
								<>
									<Copy className="mr-2 size-4 opacity-80" />
									Copy shadcn init
								</>
							)}
						</Button>

						<div className="flex h-auto min-h-16 shrink-0 flex-col justify-center rounded-[24px] border border-white/10 bg-white/5 px-6 sm:px-8">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
								<span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
									System Ready
								</span>
							</div>
							<span className="text-[10px] text-zinc-600 font-bold">
								{config.name}
							</span>
						</div>
					</div>
				</div>

				{/* Premium Footer */}
				<div className="px-6 md:px-10 py-5 bg-white/[0.02] border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 hidden sm:flex">
					<div className="flex items-center gap-4">
						<div className="flex -space-x-2">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="w-6 h-6 rounded-full border border-black bg-zinc-800"
								/>
							))}
						</div>
						<span className="text-[10px] font-bold text-zinc-500 tracking-wide">
							Used by 1,240+ developers
						</span>
					</div>
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<div className="w-1 h-1 rounded-full bg-zinc-700" />
							<span className="text-[9px] font-black text-zinc-600 uppercase">
								Optimized
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-1 h-1 rounded-full bg-zinc-700" />
							<span className="text-[9px] font-black text-zinc-600 uppercase">
								Verified
							</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
