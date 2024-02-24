import { ApiProperty } from '@nestjs/swagger';

export class CountByGenderResponse {
  @ApiProperty()
  gender: string;
  @ApiProperty()
  count: number;
}
