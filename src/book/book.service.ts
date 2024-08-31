import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { FindAllBooksQueryDto } from "./dto/find-all-books-query-dto";
@Injectable()
export class BookService {
  constructor(private prisma: DatabaseService) {}
  async create(createBookDto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        bookName: createBookDto.bookName,
        bookCoverUrl: createBookDto.bookCoverUrl || null,
        author: {
          connect: { authorId: createBookDto.author },
        },
      },
    });
    return book;
    // const book = await this.prisma.book.create({ data: { ...createBookDto } });
  }

  async findAll(query: FindAllBooksQueryDto) {
    const { page, limit, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;
    const take = limit;

    const [books, totalBooks] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take,
        include: { author: true },
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prisma.book.count(),
    ]);

    return {
      data: books,
      total: totalBooks,
      page,
      lastPage: Math.ceil(totalBooks / limit),
    };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { bookId: id },
      include: { author: true },
    });
    if (!book) throw new NotFoundException("Nothing found");
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    // return this.prisma.book.update({
    //   where: { bookId: id },
    //   data: {
    //     bookName: updateBookDto.bookName,
    //     bookCoverUrl: updateBookDto.bookCoverUrl,
    //     timesRented: updateBookDto.timesRented,
    //     author: {
    //       connect: { authorId: updateBookDto.author }, // assuming 'author' is the author ID
    //     },
    //   },
    // });
    return [];
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { bookId: id } });
  }
}
