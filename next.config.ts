import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/legal/:path*",
                    has: [
                        {
                            type: "host",
                            value: "help.localhost:3000",
                        },
                    ],
                    destination: "/legal/:path*",
                },
            ],
            afterFiles: [],
            fallback: [],
        };
    },
};

if (process.env.NODE_ENV === "development") {
    (async () => {
        await setupDevPlatform({
            persist: true,
        });
    })();
}

export default nextConfig;
