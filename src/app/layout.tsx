import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeInjector } from "@/components/theme-injector";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
	title: "Hyper-Premium Shadcn UI Theme Generator | Tailwind v3 & v4",
	description:
		"The ultimate developer tool for generating, previewing, and exporting Shadcn UI themes. Supports Tailwind v3 and v4, 20+ presets, and custom Google Fonts.",
	keywords: [
		"shadcn ui",
		"theme generator",
		"tailwind v4",
		"tailwind v3",
		"css variables",
		"design system",
		"nextjs",
		"frontend tools",
	],
	authors: [{ name: "Peter Dinis" }],
	openGraph: {
		title: "Hyper-Premium Shadcn UI Theme Generator",
		description:
			"Generate and preview Shadcn UI themes dynamically with Tailwind v4 support.",
		type: "website",
		url: "https://theme-generator.example.com",
		siteName: "Shadcn Theme Generator",
	},
	twitter: {
		card: "summary_large_image",
		title: "Shadcn UI Theme Generator",
		description: "The ultimate tool for Shadcn UI themes.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ThemeInjector />
					{children}
					<ScrollToTop />
				</ThemeProvider>
			</body>
		</html>
	);
}
