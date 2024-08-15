/*
  Warnings:

  - The primary key for the `authors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `author_id` column on the `authors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `book_id` column on the `books` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `author_id` on the `books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- AlterTable
ALTER TABLE "authors" DROP CONSTRAINT "authors_pkey",
DROP COLUMN "author_id",
ADD COLUMN     "author_id" SERIAL NOT NULL,
ADD CONSTRAINT "authors_pkey" PRIMARY KEY ("author_id");

-- AlterTable
ALTER TABLE "books" DROP CONSTRAINT "books_pkey",
DROP COLUMN "book_id",
ADD COLUMN     "book_id" SERIAL NOT NULL,
DROP COLUMN "author_id",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("book_id");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("author_id") ON DELETE RESTRICT ON UPDATE CASCADE;
