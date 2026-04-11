/**
 * Canonical site URL for metadata, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://your-domain.com).
 */
export function getSiteUrl(): string {
	const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (fromEnv) {
		return fromEnv.replace(/\/$/, "");
	}
	const vercel = process.env.VERCEL_URL?.trim();
	if (vercel) {
		const host = vercel.startsWith("http") ? vercel : `https://${vercel}`;
		return host.replace(/\/$/, "");
	}
	return "http://localhost:3000";
}
