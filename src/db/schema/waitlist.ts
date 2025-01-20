import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const waitlist = sqliteTable("waitlist", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").unique().notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});
