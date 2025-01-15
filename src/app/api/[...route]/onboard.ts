import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { onboardingFormSchema } from "@/lib/app-schema";
import { personalization, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

const app = new Hono();

app.post("/", zValidator("json", onboardingFormSchema), async (c) => {
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

        await db.insert(personalization).values({
            id: crypto.randomUUID(),
            userId: userId,
            responses: body.responses,
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
