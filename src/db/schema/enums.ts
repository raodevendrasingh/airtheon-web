import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("roleEnum", ["admin", "member", "guest"]);
export const memoryTypeEnum = pgEnum("memoryTypeEnum", [
    "note",
    "url",
    "file",
    "message",
]);
export const actionEnum = pgEnum("actionEnum", ["create", "update", "delete"]);
export const statusEnum = pgEnum("statusEnum", [
    "pending",
    "accepted",
    "rejected",
]);
export const planTypeEnum = pgEnum("planTypeEnum", ["free", "pro", "premium"]);
export const notificationTypeEnum = pgEnum("notificationTypeEnum", [
    "reminder",
    "update",
    "alert",
]);
export const durationCycleEnum = pgEnum("durationCycleEnum", [
    "monthly",
    "yearly",
    "lifetime",
]);
export const billingStatusEnum = pgEnum("billingStatusEnum", [
    "active",
    "cancelled",
    "expired",
    "pending",
]);
export const pluginTypeEnum = pgEnum("pluginTypeEnum", [
    "browser_extension",
    "mobile_app",
]);
export const pluginStatusEnum = pgEnum("pluginStatusEnum", [
    "available",
    "coming_soon",
]);
