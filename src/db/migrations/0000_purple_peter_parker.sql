CREATE TYPE "public"."actionEnum" AS ENUM('create', 'update', 'delete');--> statement-breakpoint
CREATE TYPE "public"."billingStatusEnum" AS ENUM('active', 'cancelled', 'expired', 'pending');--> statement-breakpoint
CREATE TYPE "public"."durationCycleEnum" AS ENUM('monthly', 'yearly', 'lifetime');--> statement-breakpoint
CREATE TYPE "public"."memoryTypeEnum" AS ENUM('note', 'url', 'file', 'message');--> statement-breakpoint
CREATE TYPE "public"."notificationTypeEnum" AS ENUM('reminder', 'update', 'alert');--> statement-breakpoint
CREATE TYPE "public"."planTypeEnum" AS ENUM('free', 'pro', 'premium');--> statement-breakpoint
CREATE TYPE "public"."pluginStatusEnum" AS ENUM('available', 'coming_soon');--> statement-breakpoint
CREATE TYPE "public"."pluginTypeEnum" AS ENUM('browser_extension', 'mobile_app');--> statement-breakpoint
CREATE TYPE "public"."roleEnum" AS ENUM('owner', 'admin', 'member');--> statement-breakpoint
CREATE TYPE "public"."statusEnum" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"activeOrganizationId" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"isOnboarded" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"organizationId" text NOT NULL,
	"role" text,
	"status" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"inviter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"metadata" json,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "space" (
	"id" text PRIMARY KEY NOT NULL,
	"workplaceId" text NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"description" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "workspaceSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"workplaceId" text NOT NULL,
	"defaultSpaceId" text,
	"allowMemberInvitations" boolean DEFAULT true,
	"activityLogsEnabled" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discardedMemory" (
	"id" text PRIMARY KEY NOT NULL,
	"originalMemoryId" text NOT NULL,
	"spaceId" text NOT NULL,
	"type" "memoryTypeEnum" NOT NULL,
	"content" json NOT NULL,
	"metadata" json,
	"discardedBy" text NOT NULL,
	"discardedAt" timestamp DEFAULT now() NOT NULL,
	"expirationAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"memoryId" text NOT NULL,
	"filePath" text NOT NULL,
	"fileType" text NOT NULL,
	"fileSize" integer,
	"extractedText" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "memory" (
	"id" text PRIMARY KEY NOT NULL,
	"spaceId" text NOT NULL,
	"type" "memoryTypeEnum" NOT NULL,
	"content" json NOT NULL,
	"metadata" json,
	"extractedText" text,
	"vectorId" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"workplaceId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auditLog" (
	"id" text PRIMARY KEY NOT NULL,
	"workplaceId" text NOT NULL,
	"userId" text NOT NULL,
	"action" text NOT NULL,
	"targetType" text NOT NULL,
	"targetId" text NOT NULL,
	"details" json,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "errorLog" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"workplaceId" text,
	"errorMessage" text NOT NULL,
	"stackTrace" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "searchLog" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workplaceId" text NOT NULL,
	"searchQuery" text NOT NULL,
	"searchResult" json NOT NULL,
	"resultCount" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workplaceId" text NOT NULL,
	"type" "notificationTypeEnum" NOT NULL,
	"content" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notificationSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"marketingEmails" boolean DEFAULT false,
	"securityEmails" boolean DEFAULT true,
	"inAppReminders" boolean DEFAULT true,
	"browserNotifications" boolean DEFAULT true,
	"appNotifications" boolean DEFAULT true,
	"desktopNotifications" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing" (
	"id" text PRIMARY KEY NOT NULL,
	"workplaceId" text NOT NULL,
	"userId" text NOT NULL,
	"planId" text NOT NULL,
	"currentPlanType" "planTypeEnum" DEFAULT 'free' NOT NULL,
	"spacesLimit" integer NOT NULL,
	"storageLimit" integer,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp,
	"status" "billingStatusEnum" NOT NULL,
	"autoRenew" boolean NOT NULL,
	"paymentMethod" text,
	"payerInfo" json,
	"billingHistory" json,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "planTypeEnum" NOT NULL,
	"description" text,
	"maxSpaces" integer NOT NULL,
	"storageLimit" integer,
	"price" integer,
	"billingCycle" "durationCycleEnum" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"workplaceId" text NOT NULL,
	"planId" text NOT NULL,
	"status" "billingStatusEnum" NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dataAndSecuritySettings" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"twoFactorEnabled" boolean DEFAULT false,
	"googleConnection" boolean,
	"exportDataRequestedAt" timestamp,
	"dataRetentionPolicy" integer DEFAULT 30,
	"accountDeactivatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plugin" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "pluginTypeEnum" NOT NULL,
	"status" "pluginStatusEnum" NOT NULL,
	"description" text,
	"version" text,
	"downloadUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "personalization" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"responses" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviter_id_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "space" ADD CONSTRAINT "space_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "space" ADD CONSTRAINT "space_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaceSettings" ADD CONSTRAINT "workspaceSettings_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaceSettings" ADD CONSTRAINT "workspaceSettings_defaultSpaceId_space_id_fk" FOREIGN KEY ("defaultSpaceId") REFERENCES "public"."space"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discardedMemory" ADD CONSTRAINT "discardedMemory_originalMemoryId_memory_id_fk" FOREIGN KEY ("originalMemoryId") REFERENCES "public"."memory"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discardedMemory" ADD CONSTRAINT "discardedMemory_spaceId_space_id_fk" FOREIGN KEY ("spaceId") REFERENCES "public"."space"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discardedMemory" ADD CONSTRAINT "discardedMemory_discardedBy_user_id_fk" FOREIGN KEY ("discardedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_memoryId_memory_id_fk" FOREIGN KEY ("memoryId") REFERENCES "public"."memory"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memory" ADD CONSTRAINT "memory_spaceId_space_id_fk" FOREIGN KEY ("spaceId") REFERENCES "public"."space"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memory" ADD CONSTRAINT "memory_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auditLog" ADD CONSTRAINT "auditLog_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auditLog" ADD CONSTRAINT "auditLog_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "errorLog" ADD CONSTRAINT "errorLog_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "errorLog" ADD CONSTRAINT "errorLog_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "searchLog" ADD CONSTRAINT "searchLog_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "searchLog" ADD CONSTRAINT "searchLog_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notificationSettings" ADD CONSTRAINT "notificationSettings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing" ADD CONSTRAINT "billing_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing" ADD CONSTRAINT "billing_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dataAndSecuritySettings" ADD CONSTRAINT "dataAndSecuritySettings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personalization" ADD CONSTRAINT "personalization_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userIdIdx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "session_userIdIdx" ON "session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "user_emailIdx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "orgEmailIdx" ON "invitation" USING btree ("organizationId","email");--> statement-breakpoint
CREATE INDEX "orgUserIdx" ON "member" USING btree ("organizationId","userId");--> statement-breakpoint
CREATE INDEX "slugIdx" ON "organization" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "workplaceIdIdx" ON "space" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "settings_workplaceId_idx" ON "workspaceSettings" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "discardedMemory_spaceIdIdx" ON "discardedMemory" USING btree ("spaceId");--> statement-breakpoint
CREATE INDEX "memoryIdIdx" ON "media" USING btree ("memoryId");--> statement-breakpoint
CREATE INDEX "spaceIdIdx" ON "memory" USING btree ("spaceId");--> statement-breakpoint
CREATE INDEX "workplaceTagIdx" ON "tags" USING btree ("workplaceId","name");--> statement-breakpoint
CREATE INDEX "auditLog_workplaceIdIdx" ON "auditLog" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "auditLog_userIdIdx" ON "auditLog" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "errorLog_userIdIdx" ON "errorLog" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "searchLog_userIdIdx" ON "searchLog" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "notification_userIdIdx" ON "notification" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "notification_workplaceIdIdx" ON "notification" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "notificationSettings_userIdIdx" ON "notificationSettings" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "billing_workplaceIdIdx" ON "billing" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "billing_userIdIdx" ON "billing" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "subscription_workplaceIdIdx" ON "subscription" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "personalization_userIdIdx" ON "personalization" USING btree ("userId");