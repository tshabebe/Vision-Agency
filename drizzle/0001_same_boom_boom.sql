CREATE TABLE IF NOT EXISTS "upload_file" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"artUrl" varchar(256) NOT NULL,
	"alt" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
