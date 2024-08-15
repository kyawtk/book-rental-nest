-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "mpaa_rating" AS ENUM ('G', 'PG', 'PG-13', 'R', 'NC-17');

-- CreateTable
CREATE TABLE "books" (
    "book_id" TEXT NOT NULL,
    "book_name" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "book_cover_url" TEXT,
    "times_rented" INTEGER NOT NULL DEFAULT 0,
    "rented_by" INTEGER,

    CONSTRAINT "books_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "authors" (
    "author_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "book_rentals" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rented_by" TEXT NOT NULL,

    CONSTRAINT "book_rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "languages" (
    "language_id" SERIAL NOT NULL,
    "name" CHAR(20) NOT NULL,
    "last_update" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("language_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("author_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_rented_by_fkey" FOREIGN KEY ("rented_by") REFERENCES "book_rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_rentals" ADD CONSTRAINT "book_rentals_rented_by_fkey" FOREIGN KEY ("rented_by") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
