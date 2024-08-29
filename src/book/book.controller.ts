import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookEntity } from "./entities/book.entity";

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
  @Get()
  findAll(@Req() request) {
    console.log(request.user);
    return this.bookService.findAll();
  }

  @ApiOkResponse({ type: BookEntity })
  @ApiNotFoundResponse()
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
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
