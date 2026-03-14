import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeConfig, ThemeColorName } from "./types";
import { defaultThemes } from "./themes";

interface ThemeState {
  config: ThemeConfig;
  setConfig: (config: ThemeConfig) => void;
  updateColor: (
    mode: "light" | "dark",
    colorName: ThemeColorName,
    value: string
  ) => void;
  setRadius: (radius: number) => void;
  setFont: (font: string) => void;
  applyPreset: (presetKey: string) => void;
  reset: () => void;
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
    }),
    {
      name: "theme-generator-storage",
    }
  )
);
