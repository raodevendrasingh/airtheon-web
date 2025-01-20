import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { organization } from "./workplace";
import { user } from "./user";
import { durationCycleEnum, planTypeEnum, billingStatusEnum } from "./enums";

export const plan = sqliteTable("plan", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: text("planType", { enum: planTypeEnum }).notNull(),
    description: text("description"),
    maxSpaces: integer("maxSpaces").notNull(),
    storageLimit: integer("storageLimit"),
    price: integer("price"),
    billingCycle: text("durationCycle", { enum: durationCycleEnum }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const subscription = sqliteTable(
    "subscription",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        planId: text("planId").notNull(),
        status: text("billingStatus", { enum: billingStatusEnum }).notNull(),
        startDate: integer("startDate", { mode: "timestamp" }).notNull(),
        endDate: integer("endDate", { mode: "timestamp" }),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [index("subscription_workplaceIdIdx").on(t.workplaceId)],
);

export const billing = sqliteTable(
    "billing",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        userId: text("userId")
            .notNull()
            .references(() => user.id),
        currentPlanId: text("planId").notNull(),
        currentPlanType: text("planType", { enum: planTypeEnum }).notNull(),
        spacesLimit: integer("spacesLimit").notNull(),
        storageLimit: integer("storageLimit"),
        startDate: integer("startDate", { mode: "timestamp" }).notNull(),
        endDate: integer("endDate", { mode: "timestamp" }),
        status: text("billingStatus", { enum: billingStatusEnum }).notNull(),
        autoRenew: integer("autoRenew", { mode: "boolean" }).notNull(),
        paymentMethod: text("paymentMethod"),
        payerInfo: text("payerInfo"),
        billingHistory: text("billingHistory"),
        createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
        updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    },
    (t) => [
        index("billing_workplaceIdIdx").on(t.workplaceId),
        index("billing_userIdIdx").on(t.userId),
    ],
);
