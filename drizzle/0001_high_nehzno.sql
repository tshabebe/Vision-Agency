ALTER TABLE "artOrder" DROP CONSTRAINT "artOrder_art_id_upload_file_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artOrder" ADD CONSTRAINT "artOrder_art_id_upload_file_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."upload_file"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
