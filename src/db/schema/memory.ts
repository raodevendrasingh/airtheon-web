import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { organization, space } from "./workplace";
import { memoryTypeEnum } from "./enums";

export const memory = sqliteTable(
    "memory",
    {
        id: text("id").primaryKey(),
        spaceId: text("spaceId")
            .notNull()
            .references(() => space.id, { onDelete: "cascade" }),
        type: text("memoryType", { enum: memoryTypeEnum }).notNull(),
        content: text("content").notNull(),
        metadata: text("metadata"),
        extractedText: text("extractedText"),
        vectorId: text("vectorId"),
        createdBy: text("createdBy")
            .notNull()
            .references(() => user.id),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
        deletedAt: integer("deletedAt", { mode: "timestamp" }),
    },
    (t) => [index("spaceIdIdx").on(t.spaceId)],
);

export const media = sqliteTable(
    "media",
    {
        id: text("id").primaryKey(),
        memoryId: text("memoryId")
            .notNull()
            .references(() => memory.id, { onDelete: "cascade" }),
        filePath: text("filePath").notNull(),
        fileType: text("fileType").notNull(),
        fileSize: integer("fileSize"),
        extractedText: text("extractedText"),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("memoryIdIdx").on(t.memoryId)],
);

export const tags = sqliteTable(
    "tags",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("workplaceTagIdx").on(t.workplaceId, t.name)],
);

export const discardedMemory = sqliteTable(
    "discardedMemory",
    {
        id: text("id").primaryKey(),
        originalMemoryId: text("originalMemoryId")
            .notNull()
            .references(() => memory.id),
        spaceId: text("spaceId")
            .notNull()
            .references(() => space.id, { onDelete: "cascade" }),
        type: text("memoryType", { enum: memoryTypeEnum }).notNull(),
        content: text("content").notNull(),
        metadata: text("metadata"),
        discardedBy: text("discardedBy")
            .notNull()
            .references(() => user.id),
        discardedAt: integer("discardedAt", { mode: "timestamp" }).notNull(),
        expirationAt: integer("expirationAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("discardedMemory_spaceIdIdx").on(t.spaceId)],
);
