import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getDrizzleDb } from "@/db/drizzle";
import { onboardingFormSchema } from "@/lib/app-schema";
import { personalization, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { user as users } from "@/db/schema/user";

const app = new Hono<{ Bindings: CloudflareEnv }>()
    .get("/status", async (c) => {
        const userId = c.req.query("userId");

        if (!userId) {
            return c.json({ error: "User ID is required" }, 400);
        }

        const db = getDrizzleDb();

        const user = await db
            .select({ isOnboarded: users.isOnboarded })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        return c.json({
            isOnboarded: user.length > 0 ? user[0].isOnboarded : false,
        });
    })
    .post("/", zValidator("json", onboardingFormSchema), async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: c.req.raw.headers,
            });

            const userId = session?.user?.id;

            if (!userId) {
                return c.json(
                    {
                        success: false,
                        message: "Invalid session",
                    },
                    401,
                );
            }

            const body = c.req.valid("json");

            const db = getDrizzleDb();

            await db.insert(personalization).values({
                id: crypto.randomUUID(),
                userId: userId,
                responses: JSON.stringify(body.responses),
                createdAt: new Date(),
            });

            await db
                .update(user)
                .set({ isOnboarded: true })
                .where(eq(user.id, userId));

            return c.json(
                {
                    success: true,
                    message: "User onboarded successfully",
                },
                200,
            );
        } catch (error: any) {
            return c.json(
                {
                    success: false,
                    message: error.message,
                },
                500,
            );
        }
    });

export default app;
