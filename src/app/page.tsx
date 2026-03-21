import { ThemePreview } from "@/components/theme-preview";
import { ThemeSidebar } from "@/components/theme-sidebar";

export default function Home() {
	return (
		<main className="flex h-screen overflow-hidden bg-background">
			<ThemeSidebar />
			<ThemePreview />
		</main>
	);
}
