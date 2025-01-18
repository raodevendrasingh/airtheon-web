import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";
import { env } from "@/env";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env");

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

if (env.NODE_ENV === "development") {
    await setupDevPlatform();
}

export default nextConfig;
