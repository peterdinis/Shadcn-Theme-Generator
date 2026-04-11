import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
	"Shadcn UI Theme Generator — preview and export themes for Tailwind v3 and v4";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				background:
					"linear-gradient(145deg, #0c0c0c 0%, #1a1a1a 45%, #262626 100%)",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontFamily:
					'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 20,
					alignItems: "center",
					padding: 48,
				}}
			>
				<div
					style={{
						fontSize: 58,
						fontWeight: 700,
						color: "#fafafa",
						textAlign: "center",
						lineHeight: 1.1,
						letterSpacing: "-0.02em",
					}}
				>
					Shadcn UI Theme Generator
				</div>
				<div
					style={{
						fontSize: 26,
						color: "#a3a3a3",
						textAlign: "center",
						maxWidth: 900,
					}}
				>
					Preview and export themes · Tailwind v3 & v4 · CSS variables
				</div>
			</div>
		</div>,
		{ ...size },
	);
}
