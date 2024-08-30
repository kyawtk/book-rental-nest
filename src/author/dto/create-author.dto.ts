import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authorName: string;
}
