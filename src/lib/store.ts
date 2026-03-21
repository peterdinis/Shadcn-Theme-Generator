import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultThemes } from "./themes";
import type { ThemeColorName, ThemeConfig } from "./types";
import type { ScaffoldTemplate, UiTemplate } from "./ui-template";

interface ThemeState {
	config: ThemeConfig;
	setConfig: (config: ThemeConfig) => void;
	updateColor: (
		mode: "light" | "dark",
		colorName: ThemeColorName,
		value: string,
	) => void;
	setRadius: (radius: number) => void;
	setFont: (font: string) => void;
	applyPreset: (presetKey: string) => void;
	reset: () => void;
	uiTemplate: UiTemplate;
	setUiTemplate: (t: UiTemplate) => void;
	scaffoldTemplate: ScaffoldTemplate;
	setScaffoldTemplate: (t: ScaffoldTemplate) => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			config: defaultThemes.zinc,
			setConfig: (config) => set({ config }),
			updateColor: (mode, colorName, value) =>
				set((state) => ({
					config: {
						...state.config,
						[mode]: {
							...state.config[mode],
							[colorName]: value,
						},
					},
				})),
			setRadius: (radius) =>
				set((state) => ({
					config: {
						...state.config,
						radius,
					},
				})),
			setFont: (font) =>
				set((state) => ({
					config: {
						...state.config,
						font,
					},
				})),
			applyPreset: (presetKey) => {
				const preset = defaultThemes[presetKey];
				if (preset) {
					set({ config: preset });
				}
			},
			reset: () => set({ config: defaultThemes.zinc }),
			uiTemplate: "base",
			setUiTemplate: (uiTemplate) => set({ uiTemplate }),
			scaffoldTemplate: "next",
			setScaffoldTemplate: (scaffoldTemplate) => set({ scaffoldTemplate }),
		}),
		{
			name: "theme-generator-storage",
		},
	),
);
