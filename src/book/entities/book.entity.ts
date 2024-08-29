import { ApiProperty } from "@nestjs/swagger";

export class BookEntity {
  @ApiProperty({ example: 1 })
  bookId: number;

  @ApiProperty({ example: "The Great Gatsby" })
  bookName: string;

  @ApiProperty({ example: "https://example.com/cover.jpg", nullable: true })
  bookCoverUrl: string | null;

  @ApiProperty({ example: 10 })
  timesRented: number;

  @ApiProperty({ example: 1 })
  authorId: number;

  @ApiProperty({ example: null, nullable: true })
  rentedBy: number | null;
}
