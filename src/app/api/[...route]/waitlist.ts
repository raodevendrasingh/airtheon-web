import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { waitlist } from "@/db/schema/waitlist";
import { waitlistSchema } from "@/lib/authSchema";

const app = new Hono();

app.post("/", zValidator("json", waitlistSchema), async (c) => {
    try {
        const { email } = c.req.valid("json");

        await db.insert(waitlist).values({
            email: email,
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
