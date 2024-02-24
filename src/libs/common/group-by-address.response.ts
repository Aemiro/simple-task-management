import { ApiProperty } from '@nestjs/swagger';

export class GroupByAddressResponse {
  @ApiProperty()
  address: string;
  @ApiProperty()
  count: number;
}
