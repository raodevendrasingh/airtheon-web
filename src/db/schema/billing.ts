import {
    pgTable,
    text,
    timestamp,
    boolean,
    json,
    integer,
    index,
} from "drizzle-orm/pg-core";
import { organization } from "./workplace";
import { user } from "./user";
import { durationCycleEnum, planTypeEnum, billingStatusEnum } from "./enums";

export const plan = pgTable("plan", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: planTypeEnum("type").notNull(),
    description: text("description"),
    maxSpaces: integer("maxSpaces").notNull(),
    storageLimit: integer("storageLimit"),
    price: integer("price"),
    billingCycle: durationCycleEnum("billingCycle").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const subscription = pgTable(
    "subscription",
    {
        id: text("id").primaryKey(),
        workplaceId: text("workplaceId")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        planId: text("planId").notNull(),
        status: billingStatusEnum("status").notNull(),
        startDate: timestamp("startDate").notNull(),
        endDate: timestamp("endDate"),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [index("subscription_workplaceIdIdx").on(t.workplaceId)],
);

export const billing = pgTable(
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
        currentPlanType: planTypeEnum("currentPlanType")
            .notNull()
            .default("free"),
        spacesLimit: integer("spacesLimit").notNull(),
        storageLimit: integer("storageLimit"),
        startDate: timestamp("startDate").notNull(),
        endDate: timestamp("endDate"),
        status: billingStatusEnum("status").notNull(),
        autoRenew: boolean("autoRenew").notNull(),
        paymentMethod: text("paymentMethod"),
        payerInfo: json("payerInfo"),
        billingHistory: json("billingHistory"),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    },
    (t) => [
        index("billing_workplaceIdIdx").on(t.workplaceId),
        index("billing_userIdIdx").on(t.userId),
    ],
);
