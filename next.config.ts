import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	cacheComponents: true,
	experimental: {
		cssChunking: true
	}
};

export default nextConfig;
