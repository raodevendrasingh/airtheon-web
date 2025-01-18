import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_BASE_DOMAIN: z.string().min(1),
        NEXT_PUBLIC_HELP_DOMAIN: z.string().min(1),
        NEXT_PUBLIC_BASE_URL: z.string().url(),
        NEXT_PUBLIC_APP_URL: z.string().url(),
    },
    server: {
        BETTER_AUTH_SECRET: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        RESEND_API_KEY: z.string().min(1),
        DATABASE_URL: z.string().url(),
        ARCJET_KEY: z.string().min(1),
        CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
        CLOUDFLARE_R2_PUBLIC_BUCKET_URL: z.string().url(),
        CLOUDFLARE_R2_API_KEY: z.string().min(1),
        CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().min(1),
        CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().min(1),
    },
    shared: {
        NODE_ENV: z.enum(["development", "production"]),
    },
    runtimeEnv: {
        NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN!,
        NEXT_PUBLIC_HELP_DOMAIN: process.env.NEXT_PUBLIC_HELP_DOMAIN!,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
        DATABASE_URL: process.env.DATABASE_URL!,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
        RESEND_API_KEY: process.env.RESEND_API_KEY!,
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID!,
        CLOUDFLARE_R2_PUBLIC_BUCKET_URL:
            process.env.CLOUDFLARE_R2_PUBLIC_BUCKET_URL!,
        CLOUDFLARE_R2_API_KEY: process.env.CLOUDFLARE_R2_API_KEY!,
        CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        CLOUDFLARE_R2_SECRET_ACCESS_KEY:
            process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        ARCJET_KEY: process.env.ARCJET_KEY!,
        NODE_ENV: process.env.NODE_ENV!,
    },
    onValidationError: (error) => {
        console.error("❌ Invalid environment variables:", error);
        throw new Error("Invalid environment variables");
    },
});
