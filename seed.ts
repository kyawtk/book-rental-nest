import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed Authors
  const authors = [];
  for (let i = 0; i < 10; i++) {
    const author = await prisma.author.create({
      data: {
        authorName: faker.person.fullName(),
      },
    });
    authors.push(author);
  }

  // Seed Books
  const books = [];
  for (let i = 0; i < 50; i++) {
    const book = await prisma.book.create({
      data: {
        bookName: faker.lorem.words(3),
        authorId: authors[Math.floor(Math.random() * authors.length)].authorId,
        bookCoverUrl: faker.image.url(),
        timesRented: faker.number.int({ min: 0, max: 100 }),
      },
    });
    books.push(book);
  }

  // Seed Users
  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }

  // Seed Book Rentals
  for (let i = 0; i < 200; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const rentedBooks = [];
    const numberOfBooks = faker.number.int({ min: 1, max: 5 });

    for (let j = 0; j < numberOfBooks; j++) {
      rentedBooks.push({ bookId: books[Math.floor(Math.random() * books.length)].bookId });
    }

    await prisma.bookRental.create({
      data: {
        rentedById: randomUser.userId,
        rentedBooks: {
          connect: rentedBooks,
        },
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
