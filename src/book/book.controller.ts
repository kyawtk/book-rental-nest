import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookEntity } from "./entities/book.entity";
import { FindAllBooksQueryDto } from "./dto/find-all-books-query-dto";
import { User } from "src/user/auth/decorators/user.decorator";

@ApiTags("Books")
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiCreatedResponse({ type: BookEntity })
  @ApiBody({ type: CreateBookDto })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiNotFoundResponse()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "sortBy", required: false, enum: ["price", "bookName"] })
  @ApiQuery({ name: "sortOrder", required: false, enum: ["asc", "desc"] })
  @Get()
  findAll(@Query() query: FindAllBooksQueryDto) {
    return this.bookService.findAll(query);
  }

  @ApiOkResponse({ type: BookEntity })
  @ApiNotFoundResponse()
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @User() user) {
    console.log(user);
    return this.bookService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}
