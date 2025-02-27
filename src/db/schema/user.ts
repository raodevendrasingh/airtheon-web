import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const user = sqliteTable(
    "user",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        email: text("email").notNull().unique(),
        emailVerified: integer("emailVerified", { mode: "boolean" })
            .notNull()
            .default(false),
        image: text("image"),
        isOnboarded: integer("isOnboarded", { mode: "boolean" })
            .notNull()
            .default(false),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("user_emailIdx").on(t.email)],
);

export const session = sqliteTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
        token: text("token").notNull().unique(),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
        ipAddress: text("ipAddress"),
        userAgent: text("userAgent"),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        activeOrganizationId: text("activeOrganizationId"),
    },
    (t) => [index("session_userIdIdx").on(t.userId)],
);

export const account = sqliteTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("accountId").notNull(),
        providerId: text("providerId").notNull(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("accessToken"),
        refreshToken: text("refreshToken"),
        idToken: text("idToken"),
        accessTokenExpiresAt: integer("accessTokenExpiresAt", {
            mode: "timestamp",
        }),
        refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
            mode: "timestamp",
        }),
        scope: text("scope"),
        password: text("password"),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("account_userIdIdx").on(t.userId)],
);

export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
