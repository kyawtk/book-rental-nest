import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  bookName: string;
  bookCoverUrl: string;

  @ApiProperty()
  @IsNumber()
  timesRented: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  author: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  rentedBy_: string;
}
