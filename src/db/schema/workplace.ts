import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const organization = sqliteTable(
    "organization",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        slug: text("slug").unique(),
        logo: text("logo"),
        createdAt: integer("createdAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
        metadata: text("metadata"), // JSON stored as text in SQLite
    },
    (t) => [index("slugIdx").on(t.slug)],
);

export const member = sqliteTable(
    "member",
    {
        id: text("id").primaryKey(),
        organizationId: text("organizationId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        role: text("role").notNull(),
        createdAt: integer("createdAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
    },
    (t) => [
        index("orgUserIdx").on(t.organizationId, t.userId), // Composite index
    ],
);

export const invitation = sqliteTable(
    "invitation",
    {
        id: text("id").primaryKey(),
        email: text("email").notNull(),
        organizationId: text("organizationId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        role: text("role"),
        status: text("status").notNull(),
        expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
        createdAt: integer("createdAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
        inviterId: text("inviter_id")
            .notNull()
            .references(() => user.id),
    },
    (t) => [
        index("orgEmailIdx").on(t.organizationId, t.email), // Composite index
    ],
);

export const space = sqliteTable(
    "space",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        logo: text("logo").notNull(),
        description: text("description"),
        createdBy: text("createdBy")
            .notNull()
            .references(() => user.id),
        createdAt: integer("createdAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
        deletedAt: integer("deletedAt", { mode: "timestamp" }),
    },
    (t) => [index("workplaceIdIdx").on(t.workplaceId)],
);

export const workspaceSettings = sqliteTable(
    "workspaceSettings",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        defaultSpaceId: text("defaultSpaceId").references(() => space.id),
        allowMemberInvitations: integer("allowMemberInvitations", {
            mode: "boolean",
        }).default(true),
        activityLogsEnabled: integer("activityLogsEnabled", {
            mode: "boolean",
        }).default(true),
        createdAt: integer("createdAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" })
            .defaultNow()
            .notNull(),
    },
    (t) => [index("settings_workplaceId_idx").on(t.workplaceId)],
);
