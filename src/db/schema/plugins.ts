import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { pluginStatusEnum, pluginTypeEnum } from "./enums";

export const plugin = sqliteTable("plugin", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: text("pluginType", { enum: pluginTypeEnum }).notNull(),
    status: text("pluginStatus", { enum: pluginStatusEnum }).notNull(),
    description: text("description"),
    version: text("version"),
    downloadUrl: text("downloadUrl"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});
