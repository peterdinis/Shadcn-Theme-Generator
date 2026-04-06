import { ThemePreview } from "@/components/theme-preview";
import { ThemeSidebar } from "@/components/theme-sidebar";

export default function Home() {
	return (
		<main className="flex min-h-0 flex-col overflow-hidden bg-background md:h-screen md:flex-row">
			<ThemeSidebar />
			<ThemePreview />
		</main>
	);
}
