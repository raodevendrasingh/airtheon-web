import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
    id: serial("id").primaryKey(),
    email: text("email").unique().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
