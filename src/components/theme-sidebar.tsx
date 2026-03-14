"use client";

import { useThemeStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { ColorPicker } from "./color-picker";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Moon, Sun, Monitor, RotateCcw, 
  Palette, Layers, Zap, Brush, 
  AlertTriangle, Check, ShieldAlert,
  Type
} from "lucide-react";
import { ThemeColorName } from "@/lib/types";
import { defaultThemes } from "@/lib/themes";
import { getContrastRatio } from "@/lib/color-utils";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const fonts = [
  "Inter",
  "Geist Sans",
  "Outfit",
  "JetBrains Mono",
  "Lora",
  "Space Mono",
  "Playfair Display",
  "Work Sans",
  "Crimson Text",
  "Quicksand",
  "Roboto",
  "Montserrat"
];

const colorGroups: { name: string; colors: ThemeColorName[]; icon: any }[] = [
  { name: "Base", colors: ["background", "foreground"], icon: Layers },
  { name: "Brand", colors: ["primary", "primary-foreground"], icon: Zap },
  { name: "Secondary", colors: ["secondary", "secondary-foreground"], icon: Brush },
  { name: "Muted", colors: ["muted", "muted-foreground"], icon: Brush },
  { name: "Accent", colors: ["accent", "accent-foreground"], icon: Palette },
  { name: "Destructive", colors: ["destructive", "destructive-foreground"], icon: AlertTriangle },
  { name: "Surface", colors: ["card", "card-foreground", "popover", "popover-foreground"], icon: Layers },
  { name: "UI", colors: ["border", "input", "ring"], icon: Monitor },
];

export function ThemeSidebar() {
  const { config, updateColor, setRadius, setFont, applyPreset, reset } = useThemeStore();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Prevent hydration mismatch for next-themes
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-80 border-r border-border bg-card p-6 opacity-0" />;

  const currentMode = (resolvedTheme === "dark" ? "dark" : "light") as "light" | "dark";
  const currentColors = config[currentMode];

  const contrast = getContrastRatio(currentColors.primary, currentColors["primary-foreground"]);
  const isContrastOk = contrast >= 4.5;
  const isHighContrast = contrast >= 7;

  return (
    <aside className="w-[380px] h-full overflow-y-auto border-r border-border bg-card flex flex-col scrollbar-thin">
      <div className="p-6 border-b border-border space-y-4 shrink-0 px-6 sticky top-0 bg-card/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">Theme Designer</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={reset} title="Reset to Defaults" className="hover:bg-destructive/10 hover:text-destructive transition-colors">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex p-1 bg-muted/50 rounded-lg w-full ring-1 ring-border/50">
          <Button
            variant={theme === "light" ? "default" : "ghost"}
            size="sm"
            className={cn("flex-1 rounded-md h-8 text-xs font-medium transition-all", theme === "light" && "shadow-sm")}
            onClick={() => setTheme("light")}
          >
            <Sun className="w-3.5 h-3.5 mr-1.5" />
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "ghost"}
            size="sm"
            className={cn("flex-1 rounded-md h-8 text-xs font-medium transition-all", theme === "dark" && "shadow-sm")}
            onClick={() => setTheme("dark")}
          >
            <Moon className="w-3.5 h-3.5 mr-1.5" />
            Dark
          </Button>
          <Button
            variant={theme === "system" ? "default" : "ghost"}
            size="sm"
            className={cn("flex-1 rounded-md h-8 text-xs font-medium transition-all", theme === "system" && "shadow-sm")}
            onClick={() => setTheme("system")}
          >
            <Monitor className="w-3.5 h-3.5 mr-1.5" />
            Auto
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            Presets
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(defaultThemes).map(([key, preset]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 px-3 justify-start bg-muted/30 border-transparent hover:border-primary/50 transition-all",
                  config.name === preset.name && "border-primary bg-primary/5 ring-1 ring-primary/20"
                )}
                onClick={() => applyPreset(key)}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2 shadow-inner" 
                  style={{ backgroundColor: preset[currentMode].primary }}
                />
                <span className="text-xs truncate font-medium">{preset.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="sticky top-[104px] bg-card/95 backdrop-blur-sm z-10 py-2 -mx-2 px-2 flex items-center gap-2">
            <Type className="w-3.5 h-3.5 text-primary" />
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              Typography
            </h3>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Font Family</Label>
            <Select value={config.font} onValueChange={(val) => val && setFont(val)}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((f) => (
                  <SelectItem key={f} value={f} className="text-xs">
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Border Radius</Label>
            <span className="text-[10px] text-primary px-1.5 py-0.5 bg-primary/10 rounded font-mono font-bold leading-none">{config.radius}rem</span>
          </div>
          <Slider
            defaultValue={[config.radius]}
            value={[config.radius]}
            max={1.5}
            min={0}
            step={0.125}
            onValueChange={(val) => setRadius(Array.isArray(val) ? val[0] : val)}
            className="py-2"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              Primary Contrast
            </h3>
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold",
              isHighContrast ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
              isContrastOk ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
              "bg-destructive/10 text-destructive"
            )}>
              {isHighContrast ? <Check className="w-3 h-3" /> : 
               isContrastOk ? <Check className="w-3 h-3 opacity-70" /> : 
               <AlertTriangle className="w-3 h-3" />}
              {contrast.toFixed(2)}:1
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed italic">
            Contrast between primary and its foreground. Goal: 4.5+
          </p>
        </div>

        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4 pt-4 border-t border-border/50 first:border-0 first:pt-0">
            <div className="sticky top-[104px] bg-card/95 backdrop-blur-sm z-10 py-2 -mx-2 px-2 flex items-center gap-2">
              <group.icon className="w-3.5 h-3.5 text-primary" />
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                {group.name}
              </h3>
            </div>
            <div className="space-y-1">
              {group.colors.map((colorName) => (
                <ColorPicker
                  key={colorName}
                  label={colorName}
                  value={currentColors[colorName]}
                  onChange={(val) => updateColor(currentMode, colorName, val)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
