import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { pluginStatusEnum, pluginTypeEnum } from "./enums";

export const plugin = pgTable("plugin", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: pluginTypeEnum("type").notNull(),
    status: pluginStatusEnum("status").notNull(),
    description: text("description"),
    version: text("version"),
    downloadUrl: text("downloadUrl"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
