-- AlterTable
ALTER TABLE "auth_methods" ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "provider_id" DROP NOT NULL;
