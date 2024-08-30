import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { CreateAuthorDto } from "./dto/create-author.dto";

@Injectable()
export class AuthorService {
  constructor(private prisma: DatabaseService) {}
  async create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: {
        authorName: createAuthorDto.authorName,
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
