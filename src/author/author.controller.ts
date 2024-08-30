import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthorService } from "./author.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthorEntity } from "./entities/author.entity";

@ApiTags("Authors")
@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiCreatedResponse({ type: AuthorEntity })
  @ApiBody({ type: CreateAuthorDto })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorService.remove(+id);
  }
}
