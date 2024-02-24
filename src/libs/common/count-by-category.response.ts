import { ApiProperty } from '@nestjs/swagger';

export class CountByCategoryResponse {
  @ApiProperty()
  category: string;
  @ApiProperty()
  count: number;
}
