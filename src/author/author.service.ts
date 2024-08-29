import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { CreateAuthorDto } from "./dto/create-author.dto";

@Injectable()
export class AuthorService {
  constructor(private prisma: DatabaseService) {}
  async create(createAuthorDto: CreateAuthorDto) {
    let books = [];

    // Only populate books if there are any
    if (createAuthorDto.books && createAuthorDto.books.length > 0) {
      books = createAuthorDto.books.map((book) => {
        return { bookId: book }; // Assuming book is already the ID
      });
    }

    return this.prisma.author.create({
      data: {
        authorName: createAuthorDto.authorName,
        books: {
          connect: books.length > 0 ? books : undefined, // Connect only if books array is not empty
        },
      },
      include: {
        books: true, // Include all books in the returned object
      },
    });
  }

  async findAll() {
    return this.prisma.author.findMany({
      include: {
        books: { select: { bookId: true, bookName: true } },

        // Include all posts in the returned object
      },
    });
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { authorId: id },
      include: { books: true },
    });
    if (!author) throw new NotFoundException();
    return author;
  }

  update(id: number, updateAuthorDto: Prisma.AuthorUpdateInput) {
    return this.prisma.author.update({
      data: updateAuthorDto,
      where: { authorId: id },
    });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { authorId: id } });
  }
}
