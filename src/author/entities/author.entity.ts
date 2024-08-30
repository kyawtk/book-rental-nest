import { ApiProperty } from "@nestjs/swagger";

export class AuthorEntity {
  @ApiProperty({ example: "1" })
  authorId: string;
  @ApiProperty({ example: "John Doe" })
  authorName: string;
  @ApiProperty({ example: ["1", "2", "3"] })
  books?: string[];
}
