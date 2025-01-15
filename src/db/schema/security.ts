import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const dataAndSecuritySettings = pgTable("dataAndSecuritySettings", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    twoFactorEnabled: boolean("twoFactorEnabled").default(false),
    googleConnection: boolean("googleConnection"),
    exportDataRequestedAt: timestamp("exportDataRequestedAt"),
    dataRetentionPolicy: integer("dataRetentionPolicy").default(30),
    accountDeactivatedAt: timestamp("accountDeactivatedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
