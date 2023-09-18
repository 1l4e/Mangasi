-- AlterTable
ALTER TABLE "source" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'normal';

-- CreateTable
CREATE TABLE "bookmark" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "readed" JSONB NOT NULL,
    "reading" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
