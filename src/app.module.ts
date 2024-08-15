import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { BookModule } from "./book/book.module";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [BookModule, UserModule, DatabaseModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
