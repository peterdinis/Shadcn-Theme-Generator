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
	saveCustomTheme: (name: string) => void;
	deleteCustomTheme: (name: string) => void;
	customThemes: ThemeConfig[];
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
				const state = useThemeStore.getState();
				const preset =
					defaultThemes[presetKey] ||
					state.customThemes.find((t) => t.name === presetKey);
				if (preset) {
					set({ config: preset });
				}
			},
			saveCustomTheme: (name) => {
				set((state) => {
					const existingIndex = state.customThemes.findIndex(
						(t) => t.name === name,
					);
					const newTheme = { ...state.config, name };
					if (existingIndex >= 0) {
						const newThemes = [...state.customThemes];
						newThemes[existingIndex] = newTheme;
						return { customThemes: newThemes, config: newTheme };
					}
					return {
						customThemes: [...state.customThemes, newTheme],
						config: newTheme,
					};
				});
			},
			deleteCustomTheme: (name) => {
				set((state) => ({
					customThemes: state.customThemes.filter((t) => t.name !== name),
				}));
			},
			customThemes: [],
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
