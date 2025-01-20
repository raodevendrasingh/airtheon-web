export const roleEnum = ["owner", "admin", "member"] as const;
export const memoryTypeEnum = ["note", "url", "file", "message"] as const;
export const actionEnum = ["create", "update", "delete"] as const;
export const statusEnum = ["pending", "accepted", "rejected"] as const;
export const planTypeEnum = ["free", "pro", "premium"] as const;
export const notificationTypeEnum = ["reminder", "update", "alert"] as const;
export const durationCycleEnum = ["monthly", "yearly", "lifetime"] as const;
export const billingStatusEnum = [
    "active",
    "cancelled",
    "expired",
    "pending",
] as const;
export const pluginTypeEnum = ["browser_extension", "mobile_app"] as const;
export const pluginStatusEnum = ["available", "coming_soon"] as const;
