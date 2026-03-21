"use client";

import { Check, Copy, FileCode, Info, Zap } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ExportDialog() {
	const { config } = useThemeStore();
	const [copied, setCopied] = useState(false);
	const [version, setVersion] = useState<"v3" | "v4">("v4");

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

				<div className="p-10 space-y-10">
					<div className="flex items-end justify-between">
						<div className="space-y-3">
							<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
								<div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,1)]" />
								<span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
									Version {version.toUpperCase()}
								</span>
							</div>
							<DialogTitle className="text-5xl font-black tracking-[-0.05em] text-white">
								Export <span className="text-zinc-500">Theme</span>
							</DialogTitle>
							<DialogDescription className="text-base text-zinc-400 font-medium max-w-md leading-relaxed">
								Your production-ready CSS variables are ready. Optimized for
								performance and readability.
							</DialogDescription>
						</div>

						<div className="flex h-11 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
							<button
								onClick={() => setVersion("v4")}
								className={cn(
									"px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
									version === "v4"
										? "bg-white text-black shadow-xl scale-[1.02]"
										: "text-zinc-500 hover:text-zinc-300",
								)}
							>
								v4
							</button>
							<button
								onClick={() => setVersion("v3")}
								className={cn(
									"px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
									version === "v3"
										? "bg-white text-black shadow-xl scale-[1.02]"
										: "text-zinc-500 hover:text-zinc-300",
								)}
							>
								v3
							</button>
						</div>
					</div>

					<div className="relative group">
						{/* Glossy Window Header */}
						<div className="flex items-center justify-between px-6 py-4 rounded-t-[24px] bg-white/5 border-x border-t border-white/10 border-b-0 backdrop-blur-xl">
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
						<div className="p-8 bg-black/60 border-x border-white/10 border-b rounded-b-[24px] relative min-h-[300px] max-h-[450px] overflow-auto scrollbar-thin">
							<pre className="text-[13px] font-mono leading-relaxed antialiased selection:bg-primary/30 selection:text-white">
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

					<div className="flex items-center gap-6">
						<Button
							onClick={handleCopy}
							className="h-16 flex-1 rounded-[24px] bg-white text-black hover:bg-zinc-200 text-lg font-black tracking-tight shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] group"
						>
							{copied ? (
								<>
									<Check className="w-6 h-6 mr-3 text-emerald-600 animate-in zoom-in spin-in duration-500" />
									<span>Config Copied</span>
								</>
							) : (
								<>
									<Copy className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
									<span>Copy Everything</span>
								</>
							)}
						</Button>

						<div className="h-16 flex flex-col justify-center px-8 rounded-[24px] bg-white/5 border border-white/10 shrink-0">
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
				<div className="px-10 py-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
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
