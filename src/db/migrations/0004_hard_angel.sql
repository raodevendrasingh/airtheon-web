CREATE TABLE "personalization" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"responses" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "personalization" ADD CONSTRAINT "personalization_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "personalization_userIdIdx" ON "personalization" USING btree ("userId");