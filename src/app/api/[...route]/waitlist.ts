import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getDrizzleDb } from "@/db/drizzle";
import { waitlist } from "@/db/schema/waitlist";
import { waitlistSchema } from "@/lib/auth-schema";
import arcjet, { validateEmail } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        validateEmail({
            mode: "DRY_RUN",
            block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        }),
    ],
});

const app = new Hono<{ Bindings: CloudflareEnv }>();

app.post("/", zValidator("json", waitlistSchema), async (c) => {
    try {
        const { email } = c.req.valid("json");

        const decision = await aj.protect(c.req.raw, { email });

        if (decision.isDenied()) {
            return c.json(
                {
                    success: false,
                    message: "Invalid or disposable email address",
                },
                403,
            );
        }

        const db = getDrizzleDb();

        await db.insert(waitlist).values({
            email: email,
            createdAt: new Date(),
        });

        return c.json(
            {
                success: true,
                message: "Added to waitlist successfully",
            },
            201,
        );
    } catch (error: any) {
        console.log("error: ", error);
        // Handle unique constraint violation
        if (error.includes("UNIQUE constraint failed")) {
            return c.json(
                {
                    success: false,
                    message: "Email already exists in waitlist",
                },
                400,
            );
        }

        return c.json(
            {
                success: false,
                message: error,
            },
            500,
        );
    }
});

export default app;
