DROP TABLE "art";--> statement-breakpoint
ALTER TABLE "artOrder" RENAME COLUMN "artUrl" TO "art_id";--> statement-breakpoint
ALTER TABLE "artOrder" ADD COLUMN "status" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artOrder" ADD CONSTRAINT "artOrder_art_id_upload_file_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."upload_file"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
