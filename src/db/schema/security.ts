import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const dataAndSecuritySettings = sqliteTable("dataAndSecuritySettings", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    twoFactorEnabled: integer("twoFactorEnabled", { mode: "boolean" }).default(
        false,
    ),
    googleConnection: integer("googleConnection", { mode: "boolean" }),
    exportDataRequestedAt: integer("exportDataRequestedAt", {
        mode: "timestamp",
    }),
    dataRetentionPolicy: integer("dataRetentionPolicy").default(30),
    accountDeactivatedAt: integer("accountDeactivatedAt", {
        mode: "timestamp",
    }),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});
