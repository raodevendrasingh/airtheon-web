import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

if (process.env.NODE_ENV === "development") {
    (async () => {
        await setupDevPlatform({
            persist: true,
        });
    })();
}

export default nextConfig;
