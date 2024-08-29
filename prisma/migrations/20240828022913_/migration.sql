/*
  Warnings:

  - You are about to drop the column `rented_by` on the `book_rentals` table. All the data in the column will be lost.
  - You are about to drop the column `rented_by` on the `books` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rentedById` to the `book_rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book_rentals" DROP CONSTRAINT "book_rentals_rented_by_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_rented_by_fkey";

-- AlterTable
ALTER TABLE "book_rentals" DROP COLUMN "rented_by",
ADD COLUMN     "rentedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "rented_by";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'User';

-- CreateTable
CREATE TABLE "_BookRented" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookRented_AB_unique" ON "_BookRented"("A", "B");

-- CreateIndex
CREATE INDEX "_BookRented_B_index" ON "_BookRented"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- AddForeignKey
ALTER TABLE "book_rentals" ADD CONSTRAINT "book_rentals_rentedById_fkey" FOREIGN KEY ("rentedById") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookRented" ADD CONSTRAINT "_BookRented_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookRented" ADD CONSTRAINT "_BookRented_B_fkey" FOREIGN KEY ("B") REFERENCES "book_rentals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
