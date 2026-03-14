import { ThemeSidebar } from "@/components/theme-sidebar";
import { ThemePreview } from "@/components/theme-preview";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <ThemeSidebar />
      <ThemePreview />
    </main>
  );
}
