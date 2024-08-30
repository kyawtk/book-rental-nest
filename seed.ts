import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create languages
  const english = await prisma.language.create({
    data: {
      name: "English",
    },
  });

  const spanish = await prisma.language.create({
    data: {
      name: "Spanish",
    },
  });

  // Create authors
  const author1 = await prisma.author.create({
    data: {
      authorName: "George Orwell",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      authorName: "Gabriel García Márquez",
    },
  });

  // Create categories
  const fiction = await prisma.category.create({
    data: {
      categoryName: "Fiction",
    },
  });

  const drama = await prisma.category.create({
    data: {
      categoryName: "Drama",
    },
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      bookName: "1984",
      authorId: author1.authorId,
      bookCoverUrl: "https://example.com/1984-cover.jpg",
      price: 9.99,
      languageId: english.languageId,
      categories: {
        connect: [{ categoryId: fiction.categoryId }],
      },
    },
  });

  const book2 = await prisma.book.create({
    data: {
      bookName: "One Hundred Years of Solitude",
      authorId: author2.authorId,
      bookCoverUrl: "https://example.com/one-hundred-years-cover.jpg",
      price: 12.99,
      languageId: spanish.languageId,
      categories: {
        connect: [{ categoryId: drama.categoryId }],
      },
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      phone: "1234567890",
      email: "johndoe@example.com",
      password: "password123", // Note: Hash passwords in production
      role: "User",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      phone: "0987654321",
      email: "admin@example.com",
      password: "adminpassword", // Note: Hash passwords in production
      role: "Admin",
    },
  });

  // Create book rentals
  await prisma.bookRental.create({
    data: {
      rentedById: user1.userId,
      bookId: book1.bookId,
    },
  });

  await prisma.bookRental.create({
    data: {
      rentedById: user1.userId,
      bookId: book2.bookId,
    },
  });

  console.log("Database has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
