import {
    pgTable,
    text,
    timestamp,
    boolean,
    json,
    index,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const organization = pgTable(
    "organization",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        slug: text("slug").unique(),
        logo: text("logo"),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        metadata: json("metadata"),
    },
    (t) => [index("slugIdx").on(t.slug)],
);

export const member = pgTable(
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
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (t) => [
        index("orgUserIdx").on(t.organizationId, t.userId), // Composite index
    ],
);

export const invitation = pgTable(
    "invitation",
    {
        id: text("id").primaryKey(),
        email: text("email").notNull(),
        organizationId: text("organizationId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        role: text("role"),
        status: text("status").notNull(),
        expiresAt: timestamp("expiresAt").notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        inviterId: text("inviter_id")
            .notNull()
            .references(() => user.id),
    },
    (t) => [
        index("orgEmailIdx").on(t.organizationId, t.email), // Composite index
    ],
);

export const space = pgTable(
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
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
        deletedAt: timestamp("deletedAt"),
    },
    (t) => [index("workplaceIdIdx").on(t.workplaceId)],
);

export const workspaceSettings = pgTable(
    "workspaceSettings",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        defaultSpaceId: text("defaultSpaceId").references(() => space.id),
        allowMemberInvitations: boolean("allowMemberInvitations").default(true),
        activityLogsEnabled: boolean("activityLogsEnabled").default(true),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [index("settings_workplaceId_idx").on(t.workplaceId)],
);
