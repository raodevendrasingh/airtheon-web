import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { organization } from "./workplace";

export const auditLog = sqliteTable(
    "auditLog",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        userId: text("userId")
            .notNull()
            .references(() => user.id),
        action: text("action").notNull(),
        targetType: text("targetType").notNull(),
        targetId: text("targetId").notNull(),
        details: text("details"),
        timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
    },
    (t) => [
        index("auditLog_workplaceIdIdx").on(t.workplaceId),
        index("auditLog_userIdIdx").on(t.userId),
    ],
);

export const searchLog = sqliteTable(
    "searchLog",
    {
        id: text("id").primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => user.id),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        searchQuery: text("searchQuery").notNull(),
        searchResult: text("searchResult").notNull(),
        resultCount: integer("resultCount").notNull(),
        timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("searchLog_userIdIdx").on(t.userId)],
);

export const errorLog = sqliteTable(
    "errorLog",
    {
        id: text("id").primaryKey(),
        userId: text("userId").references(() => user.id),
        workplaceId: text("workplaceId").references(() => organization.id),
        errorMessage: text("errorMessage").notNull(),
        stackTrace: text("stackTrace"),
        timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("errorLog_userIdIdx").on(t.userId)],
);
