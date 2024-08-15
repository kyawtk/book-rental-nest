import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
@Injectable()
export class BookService {
  constructor(private prisma: DatabaseService) {}
  create(createBookDto: CreateBookDto) {
    return false;
  }

  async findAll() {
    return this.prisma.book.findMany({ include: { author: true } });
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
    return this.prisma.book.update({
      where: { bookId: id },
      data: {
        bookName: updateBookDto.bookName,
        bookCoverUrl: updateBookDto.bookCoverUrl,
        timesRented: updateBookDto.timesRented,
        author: {
          connect: { authorId: updateBookDto.author }, // assuming 'author' is the author ID
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
