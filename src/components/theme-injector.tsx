"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/store";

export function ThemeInjector() {
	const { config } = useThemeStore();

	useEffect(() => {
		// If it's a Google Font, we might need to load it.
		// For this simple demo, we'll assume common ones or system fonts.
		// We'll inject a style tag for the font-family.
		const fontName = config.font || "Inter";
		const fontStack = `${fontName}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
		document.documentElement.style.setProperty("--font-sans", fontStack);
	}, [config.font]);

	const getCssVars = (mode: "light" | "dark") => {
		return Object.entries(config[mode])
			.map(([k, v]) => `  --${k}: ${v};`)
			.join("\n");
	};

	const styleString = `
    :root {
${getCssVars("light")}
      --radius: ${config.radius}rem;
      --font-family: ${config.font};
    }
    .dark {
${getCssVars("dark")}
    }
    body {
      font-family: var(--font-family), ui-sans-serif, system-ui, sans-serif;
    }
  `;

	return (
		<>
			<link
				href={`https://fonts.googleapis.com/css2?family=${config.font?.replace(/\s+/g, "+")}:wght@400;500;600;700;800;900&display=swap`}
				rel="stylesheet"
			/>
			<style dangerouslySetInnerHTML={{ __html: styleString }} />
		</>
	);
}
