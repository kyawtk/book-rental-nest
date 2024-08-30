/*
  Warnings:

  - You are about to drop the `_BookRented` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rentedById,bookId]` on the table `book_rentals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookId` to the `book_rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_id` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookRented" DROP CONSTRAINT "_BookRented_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookRented" DROP CONSTRAINT "_BookRented_B_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- AlterTable
ALTER TABLE "book_rentals" ADD COLUMN     "bookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "language_id" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_BookRented";

-- DropEnum
DROP TYPE "mpaa_rating";

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "_BookToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_name_key" ON "categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCategory_AB_unique" ON "_BookToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCategory_B_index" ON "_BookToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "book_rentals_rentedById_bookId_key" ON "book_rentals"("rentedById", "bookId");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("author_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_rentals" ADD CONSTRAINT "book_rentals_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
