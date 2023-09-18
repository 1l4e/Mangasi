-- CreateTable
CREATE TABLE "collection" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "chapters" JSONB NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "sourceId" INTEGER NOT NULL,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0),

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "personal_access_tokens" (
    "id" SERIAL NOT NULL,
    "tokenable_type" VARCHAR(255) NOT NULL,
    "tokenable_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "token" VARCHAR(64) NOT NULL,
    "abilities" TEXT,
    "last_used_at" TIMESTAMP(0),
    "expires_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "selector" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "safe" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_collectionTomanga" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "manga_slug_key" ON "manga"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "manga_slug_sourceId_key" ON "manga"("slug", "sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "personal_access_tokens_token_unique" ON "personal_access_tokens"("token");

-- CreateIndex
CREATE INDEX "personal_access_tokens_tokenable_type_tokenable_id_index" ON "personal_access_tokens"("tokenable_type", "tokenable_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_collectionTomanga_AB_unique" ON "_collectionTomanga"("A", "B");

-- CreateIndex
CREATE INDEX "_collectionTomanga_B_index" ON "_collectionTomanga"("B");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_author_id_foreign" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manga" ADD CONSTRAINT "manga_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collectionTomanga" ADD CONSTRAINT "_collectionTomanga_A_fkey" FOREIGN KEY ("A") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collectionTomanga" ADD CONSTRAINT "_collectionTomanga_B_fkey" FOREIGN KEY ("B") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
