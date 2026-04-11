import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeInjector } from "@/components/theme-injector";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const siteUrl = getSiteUrl();

const siteTitle = "Shadcn UI Theme Generator | Tailwind v3 & v4";
const siteDescription =
	"Generate, preview, and export Shadcn UI themes with live previews. Supports Tailwind v3 and v4, 20+ presets, custom fonts, and copy-paste CSS variables for your design system.";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "Shadcn UI Theme Generator",
	description: siteDescription,
	url: siteUrl,
	applicationCategory: "DeveloperApplication",
	operatingSystem: "Web",
	author: {
		"@type": "Person",
		name: "Peter Dinis",
	},
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD",
	},
} as const;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: siteTitle,
		template: "%s | Shadcn UI Theme Generator",
	},
	description: siteDescription,
	keywords: [
		"shadcn ui",
		"shadcn theme",
		"theme generator",
		"tailwind v4",
		"tailwind v3",
		"css variables",
		"design tokens",
		"design system",
		"next.js",
		"react",
	],
	authors: [{ name: "Peter Dinis" }],
	creator: "Peter Dinis",
	category: "technology",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: siteTitle,
		description: siteDescription,
		type: "website",
		url: siteUrl,
		siteName: "Shadcn UI Theme Generator",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: siteTitle,
		description: siteDescription,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
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
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD for SEO
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
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
