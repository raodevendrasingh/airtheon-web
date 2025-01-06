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

export default nextConfig;
