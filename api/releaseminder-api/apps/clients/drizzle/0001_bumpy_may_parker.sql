ALTER TABLE "custom_hostnames" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "organization_roles" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subdomains" ADD COLUMN "created_by" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_hostnames" ADD CONSTRAINT "custom_hostnames_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_roles" ADD CONSTRAINT "organization_roles_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subdomains" ADD CONSTRAINT "subdomains_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
