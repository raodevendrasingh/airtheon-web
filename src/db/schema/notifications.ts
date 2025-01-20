import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { organization } from "./workplace";
import { notificationTypeEnum } from "./enums";

export const notification = sqliteTable(
    "notification",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        type: text("notificationType", {
            enum: notificationTypeEnum,
        }).notNull(),
        content: text("content").notNull(),
        read: integer("read", { mode: "boolean" }).notNull().default(false),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [
        index("notification_userIdIdx").on(t.userId),
        index("notification_workplaceIdIdx").on(t.workplaceId),
    ],
);

export const notificationSettings = sqliteTable(
    "notificationSettings",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        marketingEmails: integer("marketingEmails", {
            mode: "boolean",
        }).default(false),
        securityEmails: integer("securityEmails", { mode: "boolean" }).default(
            true,
        ),
        inAppReminders: integer("inAppReminders", { mode: "boolean" }).default(
            true,
        ),
        browserNotifications: integer("browserNotifications", {
            mode: "boolean",
        }).default(true),
        appNotifications: integer("appNotifications", {
            mode: "boolean",
        }).default(true),
        desktopNotifications: integer("desktopNotifications", {
            mode: "boolean",
        }).default(true),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("notificationSettings_userIdIdx").on(t.userId)],
);
