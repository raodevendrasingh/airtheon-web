"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { user as users } from "@/db/schema/user";

export async function checkUserOnboarding(userId: string) {
    const user = await db
        .select({ isOnboarded: users.isOnboarded })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    if (user.length > 0) {
        return user[0].isOnboarded;
    }

    return false;
}
