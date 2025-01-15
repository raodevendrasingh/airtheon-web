import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { user } from "./user";
import { organization } from "./workplace";
import { notificationTypeEnum } from "./enums";

export const notification = pgTable(
    "notification",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        type: notificationTypeEnum("type").notNull(),
        content: text("content").notNull(),
        read: boolean("read").notNull().default(false),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [
        index("notification_userIdIdx").on(t.userId),
        index("notification_workplaceIdIdx").on(t.workplaceId),
    ],
);

export const notificationSettings = pgTable(
    "notificationSettings",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        marketingEmails: boolean("marketingEmails").default(false),
        securityEmails: boolean("securityEmails").default(true),
        inAppReminders: boolean("inAppReminders").default(true),
        browserNotifications: boolean("browserNotifications").default(true),
        appNotifications: boolean("appNotifications").default(true),
        desktopNotifications: boolean("desktopNotifications").default(true),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [index("notificationSettings_userIdIdx").on(t.userId)],
);
