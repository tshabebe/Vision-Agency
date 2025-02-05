ALTER TABLE "artOrder" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "artOrder" ALTER COLUMN "status" SET DEFAULT 'order';--> statement-breakpoint
ALTER TABLE "artOrder" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "upload_file" DROP COLUMN IF EXISTS "alt";