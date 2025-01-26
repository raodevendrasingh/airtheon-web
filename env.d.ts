import { DrizzleD1Database } from "drizzle-orm/d1";

declare global {
    interface CloudflareEnv {
        NODE_ENV: string;
        NEXT_PUBLIC_BASE_DOMAIN: string;
        NEXT_PUBLIC_HELP_DOMAIN: string;
        NEXT_PUBLIC_HELP_URL: string;
        NEXT_PUBLIC_BASE_URL: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        CLOUDFLARE_ACCOUNT_ID: string;
        CLOUDFLARE_DATABASE_ID: string;
        CLOUDFLARE_D1_TOKEN: string;
        CLOUDFLARE_R2_PUBLIC_BUCKET_URL: string;
        CLOUDFLARE_R2_API_KEY: string;
        CLOUDFLARE_R2_ACCESS_KEY_ID: string;
        CLOUDFLARE_R2_SECRET_ACCESS_KEY: string;
        BETTER_AUTH_SECRET: string;
        RESEND_API_KEY: string;
        DATABASE_URL: string;
        ARCJET_KEY: string;
        ARCJET_ENV: string;
        DB: D1Database;
        R2: R2Bucket;
    }
    interface Process {
        env: {
            DATABASE_ID: string;
            ACCOUNT_ID: string;
            TOKEN: string;
            NODE_ENV: string;
        };
    }

    var process: Process;
}
