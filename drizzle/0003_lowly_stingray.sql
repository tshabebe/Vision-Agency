ALTER TABLE "artOrder" ADD COLUMN "user_id" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artOrder" ADD CONSTRAINT "artOrder_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
