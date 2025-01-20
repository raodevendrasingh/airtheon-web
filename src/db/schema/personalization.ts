import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const personalization = sqliteTable(
    "personalization",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        responses: text("responses").notNull(),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("personalization_userIdIdx").on(t.userId)],
);
