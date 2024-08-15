import { Prisma } from "@prisma/client";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  bookName: string;
  bookCoverUrl: string;

  @IsNumber()
  timesRented: number;

  @IsString()
  @IsNotEmpty()
  author: number;

  @IsString()
  rentedBy_: string;
}
