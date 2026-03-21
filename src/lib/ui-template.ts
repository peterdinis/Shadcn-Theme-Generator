export type UiTemplate = "radix" | "base";

export type ScaffoldTemplate =
	| "next"
	| "vite"
	| "start"
	| "react-router"
	| "astro"
	| "laravel";

export const SCAFFOLD_TEMPLATES: { value: ScaffoldTemplate; label: string }[] = [
	{ value: "next", label: "Next.js" },
	{ value: "vite", label: "Vite" },
	{ value: "start", label: "TanStack Start" },
	{ value: "react-router", label: "React Router" },
	{ value: "astro", label: "Astro" },
	{ value: "laravel", label: "Laravel" },
];

export const UI_TEMPLATE_META: Record<
	UiTemplate,
	{
		label: string;
		shortLabel: string;
		packageName: string;
		componentsJsonStyle: string;
		cliBaseFlag: UiTemplate;
		docsPath: string;
	}
> = {
	base: {
		label: "Base UI",
		shortLabel: "Base UI",
		packageName: "@base-ui/react",
		componentsJsonStyle: "base-nova",
		cliBaseFlag: "base",
		docsPath: "https://ui.shadcn.com/docs/cli",
	},
	radix: {
		label: "Radix UI",
		shortLabel: "Radix",
		packageName: "radix-ui",
		componentsJsonStyle: "new-york",
		cliBaseFlag: "radix",
		docsPath: "https://ui.shadcn.com/docs/cli",
	},
};

export function getShadcnInitCommand(opts: {
	uiTemplate: UiTemplate;
	scaffoldTemplate: ScaffoldTemplate;
}): string {
	const base = UI_TEMPLATE_META[opts.uiTemplate].cliBaseFlag;
	return `npx shadcn@latest init -t ${opts.scaffoldTemplate} --base ${base} -y`;
}

export function getComponentsJsonStub(opts: {
	uiTemplate: UiTemplate;
}): string {
	const style = UI_TEMPLATE_META[opts.uiTemplate].componentsJsonStyle;
	return `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "${style}",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}`;
}
