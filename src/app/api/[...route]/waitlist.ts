import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { waitlist } from "@/db/schema/waitlist";
import { waitlistSchema } from "@/lib/authSchema";
import arcjet, { validateEmail } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        validateEmail({
            mode: "LIVE",
            block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        }),
    ],
});

const app = new Hono();

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
        // Handle unique constraint violation
        if (error.code === "23505") {
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
                message: "Failed to add to waitlist",
            },
            500,
        );
    }
});

export default app;
