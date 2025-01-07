import {
    pgTable,
    text,
    timestamp,
    json,
    integer,
    index,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { organization } from "./workplace";

export const auditLog = pgTable(
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
        details: json("details"),
        timestamp: timestamp("timestamp").defaultNow().notNull(),
    },
    (t) => [
        index("auditLog_workplaceIdIdx").on(t.workplaceId),
        index("auditLog_userIdIdx").on(t.userId),
    ],
);

export const searchLog = pgTable(
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
        searchResult: json("searchResult").notNull(),
        resultCount: integer("resultCount").notNull(),
        timestamp: timestamp("timestamp").defaultNow().notNull(),
    },
    (t) => [index("searchLog_userIdIdx").on(t.userId)],
);

export const errorLog = pgTable(
    "errorLog",
    {
        id: text("id").primaryKey(),
        userId: text("userId").references(() => user.id),
        workplaceId: text("workplaceId").references(() => organization.id),
        errorMessage: text("errorMessage").notNull(),
        stackTrace: text("stackTrace"),
        timestamp: timestamp("timestamp").defaultNow().notNull(),
    },
    (t) => [index("errorLog_userIdIdx").on(t.userId)],
);
