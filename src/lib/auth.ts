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
