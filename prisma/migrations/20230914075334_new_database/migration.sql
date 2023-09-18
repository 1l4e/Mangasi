-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "safe" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "manga" ADD COLUMN     "safe" BOOLEAN NOT NULL DEFAULT true;
