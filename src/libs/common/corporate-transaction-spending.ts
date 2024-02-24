import { ApiProperty } from '@nestjs/swagger';

export class TransactionTotalResponse {
  @ApiProperty()
  total: number;
}
