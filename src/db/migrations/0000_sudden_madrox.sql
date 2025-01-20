CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`password` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_userIdIdx` ON `account` (`userId`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expiresAt` integer NOT NULL,
	`token` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` text NOT NULL,
	`activeOrganizationId` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `session_userIdIdx` ON `session` (`userId`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer DEFAULT false NOT NULL,
	`image` text,
	`isOnboarded` integer DEFAULT false NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_emailIdx` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `invitation` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`organizationId` text NOT NULL,
	`role` text,
	`status` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`inviter_id` text NOT NULL,
	FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`inviter_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `orgEmailIdx` ON `invitation` (`organizationId`,`email`);--> statement-breakpoint
CREATE TABLE `member` (
	`id` text PRIMARY KEY NOT NULL,
	`organizationId` text NOT NULL,
	`userId` text NOT NULL,
	`role` text NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `orgUserIdx` ON `member` (`organizationId`,`userId`);--> statement-breakpoint
CREATE TABLE `organization` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text,
	`logo` text,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`metadata` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organization_slug_unique` ON `organization` (`slug`);--> statement-breakpoint
CREATE INDEX `slugIdx` ON `organization` (`slug`);--> statement-breakpoint
CREATE TABLE `space` (
	`id` text PRIMARY KEY NOT NULL,
	`workplaceId` text NOT NULL,
	`name` text NOT NULL,
	`logo` text NOT NULL,
	`description` text,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `workplaceIdIdx` ON `space` (`workplaceId`);--> statement-breakpoint
CREATE TABLE `workspaceSettings` (
	`id` text PRIMARY KEY NOT NULL,
	`workplaceId` text NOT NULL,
	`defaultSpaceId` text,
	`allowMemberInvitations` integer DEFAULT true,
	`activityLogsEnabled` integer DEFAULT true,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`defaultSpaceId`) REFERENCES `space`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `settings_workplaceId_idx` ON `workspaceSettings` (`workplaceId`);--> statement-breakpoint
CREATE TABLE `discardedMemory` (
	`id` text PRIMARY KEY NOT NULL,
	`originalMemoryId` text NOT NULL,
	`spaceId` text NOT NULL,
	`memoryType` text NOT NULL,
	`content` text NOT NULL,
	`metadata` text,
	`discardedBy` text NOT NULL,
	`discardedAt` integer NOT NULL,
	`expirationAt` integer NOT NULL,
	FOREIGN KEY (`originalMemoryId`) REFERENCES `memory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`discardedBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `discardedMemory_spaceIdIdx` ON `discardedMemory` (`spaceId`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`memoryId` text NOT NULL,
	`filePath` text NOT NULL,
	`fileType` text NOT NULL,
	`fileSize` integer,
	`extractedText` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`memoryId`) REFERENCES `memory`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `memoryIdIdx` ON `media` (`memoryId`);--> statement-breakpoint
CREATE TABLE `memory` (
	`id` text PRIMARY KEY NOT NULL,
	`spaceId` text NOT NULL,
	`memoryType` text NOT NULL,
	`content` text NOT NULL,
	`metadata` text,
	`extractedText` text,
	`vectorId` text,
	`createdBy` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `spaceIdIdx` ON `memory` (`spaceId`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`workplaceId` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `workplaceTagIdx` ON `tags` (`workplaceId`,`name`);--> statement-breakpoint
CREATE TABLE `auditLog` (
	`id` text PRIMARY KEY NOT NULL,
	`workplaceId` text NOT NULL,
	`userId` text NOT NULL,
	`action` text NOT NULL,
	`targetType` text NOT NULL,
	`targetId` text NOT NULL,
	`details` text,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `auditLog_workplaceIdIdx` ON `auditLog` (`workplaceId`);--> statement-breakpoint
CREATE INDEX `auditLog_userIdIdx` ON `auditLog` (`userId`);--> statement-breakpoint
CREATE TABLE `errorLog` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`workplaceId` text,
	`errorMessage` text NOT NULL,
	`stackTrace` text,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `errorLog_userIdIdx` ON `errorLog` (`userId`);--> statement-breakpoint
CREATE TABLE `searchLog` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`workplaceId` text NOT NULL,
	`searchQuery` text NOT NULL,
	`searchResult` text NOT NULL,
	`resultCount` integer NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `searchLog_userIdIdx` ON `searchLog` (`userId`);--> statement-breakpoint
CREATE TABLE `notification` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`workplaceId` text NOT NULL,
	`notificationType` text NOT NULL,
	`content` text NOT NULL,
	`read` integer DEFAULT false NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `notification_userIdIdx` ON `notification` (`userId`);--> statement-breakpoint
CREATE INDEX `notification_workplaceIdIdx` ON `notification` (`workplaceId`);--> statement-breakpoint
CREATE TABLE `notificationSettings` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`marketingEmails` integer DEFAULT false,
	`securityEmails` integer DEFAULT true,
	`inAppReminders` integer DEFAULT true,
	`browserNotifications` integer DEFAULT true,
	`appNotifications` integer DEFAULT true,
	`desktopNotifications` integer DEFAULT true,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `notificationSettings_userIdIdx` ON `notificationSettings` (`userId`);--> statement-breakpoint
CREATE TABLE `billing` (
	`id` text PRIMARY KEY NOT NULL,
	`workplaceId` text NOT NULL,
	`userId` text NOT NULL,
	`planId` text NOT NULL,
	`planType` text NOT NULL,
	`spacesLimit` integer NOT NULL,
	`storageLimit` integer,
	`startDate` integer NOT NULL,
	`endDate` integer,
	`billingStatus` text NOT NULL,
	`autoRenew` integer NOT NULL,
	`paymentMethod` text,
	`payerInfo` text,
	`billingHistory` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `billing_workplaceIdIdx` ON `billing` (`workplaceId`);--> statement-breakpoint
CREATE INDEX `billing_userIdIdx` ON `billing` (`userId`);--> statement-breakpoint
CREATE TABLE `plan` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`planType` text NOT NULL,
	`description` text,
	`maxSpaces` integer NOT NULL,
	`storageLimit` integer,
	`price` integer,
	`durationCycle` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`workplaceId` text NOT NULL,
	`planId` text NOT NULL,
	`billingStatus` text NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`workplaceId`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subscription_workplaceIdIdx` ON `subscription` (`workplaceId`);--> statement-breakpoint
CREATE TABLE `dataAndSecuritySettings` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`twoFactorEnabled` integer DEFAULT false,
	`googleConnection` integer,
	`exportDataRequestedAt` integer,
	`dataRetentionPolicy` integer DEFAULT 30,
	`accountDeactivatedAt` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plugin` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`pluginType` text NOT NULL,
	`pluginStatus` text NOT NULL,
	`description` text,
	`version` text,
	`downloadUrl` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);--> statement-breakpoint
CREATE TABLE `personalization` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`responses` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `personalization_userIdIdx` ON `personalization` (`userId`);