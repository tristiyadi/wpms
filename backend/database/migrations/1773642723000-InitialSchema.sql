-- Ensure uuid-ossp extension is enabled for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Initial Migration: Create Wellness Packages Table
CREATE TABLE IF NOT EXISTS "wellness_packages" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" character varying(255) NOT NULL,
    "description" text,
    "price" integer NOT NULL,
    "duration_minutes" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_wellness_packages" PRIMARY KEY ("id")
);
