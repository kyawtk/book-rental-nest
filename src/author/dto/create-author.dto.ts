import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  books: string[];
}
