import { pgTable, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { user } from "./user";

export const personalization = pgTable(
    "personalization",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        responses: jsonb("responses").notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (t) => [index("personalization_userIdIdx").on(t.userId)],
);
