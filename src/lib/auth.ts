import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { config } from "dotenv";
import { emailOTP, openAPI } from "better-auth/plugins";
import { account, session, user, verification } from "@/db/schema";
import { sendVerificationEmail } from "@/actions/send-verification-email";

config({ path: ".env.local" });

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: user,
            account: account,
            session: session,
            verification: verification,
        },
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                default: "user",
                enum: ["user", "admin"],
                description: "User role",
                input: false,
            },
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    plugins: [
        openAPI(),
        emailOTP({
            otpLength: 6,
            expiresIn: 10 * 60, // 10 minutes
            sendVerificationOnSignUp: true,
            async sendVerificationOTP({ email, otp, type }) {
                try {
                    if (type === "email-verification") {
                        await sendVerificationEmail({ email, otp });
                    } else {
                        console.log("Password reset not implemented yet");
                    }
                } catch (error) {
                    console.error("Failed to send email:", error);
                    throw error;
                }
            },
        }),
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});

export type Session = typeof auth.$Infer.Session;
