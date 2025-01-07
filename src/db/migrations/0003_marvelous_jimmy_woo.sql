ALTER TABLE "space" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "workspaceSettings" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "tags" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "auditLog" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "errorLog" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "searchLog" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "notification" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "billing" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "subscription" RENAME COLUMN "workspaceId" TO "workplaceId";--> statement-breakpoint
ALTER TABLE "space" DROP CONSTRAINT "space_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaceSettings" DROP CONSTRAINT "workspaceSettings_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "auditLog" DROP CONSTRAINT "auditLog_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "errorLog" DROP CONSTRAINT "errorLog_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "searchLog" DROP CONSTRAINT "searchLog_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "notification" DROP CONSTRAINT "notification_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "billing" DROP CONSTRAINT "billing_workspaceId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_workspaceId_organization_id_fk";
--> statement-breakpoint
DROP INDEX "workspaceIdIdx";--> statement-breakpoint
DROP INDEX "settings_workspaceId_idx";--> statement-breakpoint
DROP INDEX "workspaceTagIdx";--> statement-breakpoint
DROP INDEX "auditLog_workspaceIdIdx";--> statement-breakpoint
DROP INDEX "notification_workspaceIdIdx";--> statement-breakpoint
DROP INDEX "billing_workspaceIdIdx";--> statement-breakpoint
DROP INDEX "subscription_workspaceIdIdx";--> statement-breakpoint
ALTER TABLE "space" ADD CONSTRAINT "space_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaceSettings" ADD CONSTRAINT "workspaceSettings_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auditLog" ADD CONSTRAINT "auditLog_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "errorLog" ADD CONSTRAINT "errorLog_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "searchLog" ADD CONSTRAINT "searchLog_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing" ADD CONSTRAINT "billing_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_workplaceId_organization_id_fk" FOREIGN KEY ("workplaceId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workplaceIdIdx" ON "space" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "settings_workplaceId_idx" ON "workspaceSettings" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "workplaceTagIdx" ON "tags" USING btree ("workplaceId","name");--> statement-breakpoint
CREATE INDEX "auditLog_workplaceIdIdx" ON "auditLog" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "notification_workplaceIdIdx" ON "notification" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "billing_workplaceIdIdx" ON "billing" USING btree ("workplaceId");--> statement-breakpoint
CREATE INDEX "subscription_workplaceIdIdx" ON "subscription" USING btree ("workplaceId");