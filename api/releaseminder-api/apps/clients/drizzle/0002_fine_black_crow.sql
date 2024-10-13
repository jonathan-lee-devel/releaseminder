ALTER TABLE "custom_hostnames" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_roles" ALTER COLUMN "parent_organization" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_roles" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subdomains" ALTER COLUMN "parent_organization" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subdomains" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subdomains" ADD CONSTRAINT "subdomains_subdomain_unique" UNIQUE("subdomain");