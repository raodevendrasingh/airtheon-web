import {
    sqliteTable,
    text,
    integer,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable(
    "user",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        email: text("email").notNull(),
        emailVerified: integer("email_verified", { mode: "timestamp" }),
        image: text("image"),
        createdAt: integer("created_at", { mode: "timestamp" }),
        updatedAt: integer("updated_at", { mode: "timestamp" }),
    },
    (table) => ({
        idIndex: uniqueIndex("idIndex").on(table.id),
    }),
);
