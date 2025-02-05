import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getDrizzleDb } from "@/db/drizzle";
import { waitlist } from "@/db/schema/waitlist";
import { waitlistSchema } from "@/lib/auth-schema";

const app = new Hono<{ Bindings: CloudflareEnv }>().post(
    "/",
    zValidator("json", waitlistSchema),
    async (c) => {
        try {
            const { email } = c.req.valid("json");

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
            if (error) {
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
    },
);

export default app;
