import {
    pgTable,
    text,
    timestamp,
    json,
    integer,
    index,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { organization, space } from "./workplace";
import { memoryTypeEnum } from "./enums";

export const memory = pgTable(
    "memory",
    {
        id: text("id").primaryKey(),
        spaceId: text("spaceId")
            .notNull()
            .references(() => space.id, { onDelete: "cascade" }),
        type: memoryTypeEnum("type").notNull(),
        content: json("content").notNull(),
        metadata: json("metadata"),
        extractedText: text("extractedText"),
        vectorId: text("vectorId"),
        createdBy: text("createdBy")
            .notNull()
            .references(() => user.id),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
        deletedAt: timestamp("deletedAt"),
    },
    (t) => [index("spaceIdIdx").on(t.spaceId)],
);

export const media = pgTable(
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
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [index("memoryIdIdx").on(t.memoryId)],
);

export const tags = pgTable(
    "tags",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [index("workplaceTagIdx").on(t.workplaceId, t.name)],
);

export const discardedMemory = pgTable(
    "discardedMemory",
    {
        id: text("id").primaryKey(),
        originalMemoryId: text("originalMemoryId")
            .notNull()
            .references(() => memory.id),
        spaceId: text("spaceId")
            .notNull()
            .references(() => space.id, { onDelete: "cascade" }),
        type: memoryTypeEnum("type").notNull(),
        content: json("content").notNull(),
        metadata: json("metadata"),
        discardedBy: text("discardedBy")
            .notNull()
            .references(() => user.id),
        discardedAt: timestamp("discardedAt").defaultNow().notNull(),
        expirationAt: timestamp("expirationAt").notNull(),
    },
    (t) => [index("discardedMemory_spaceIdIdx").on(t.spaceId)],
);
